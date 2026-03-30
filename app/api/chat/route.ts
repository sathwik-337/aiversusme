import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import axios from "axios";

export const runtime = "nodejs";

// Simple CSV parser that handles quoted fields with commas
function parseCSV(content: string) {
  const lines = content.split(/\r?\n/);
  const rows: string[][] = [];
  
  for (const line of lines) {
    if (!line.trim()) continue;
    
    const row: string[] = [];
    let currentField = "";
    let insideQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
       const char = line[i];
       if (char === '"') {
         if (insideQuotes && line[i+1] === '"') {
           // Escaped quote
           currentField += '"';
           i++;
         } else {
           insideQuotes = !insideQuotes;
         }
       } else if (char === ',' && !insideQuotes) {
         row.push(currentField.trim());
         currentField = "";
       } else {
         currentField += char;
       }
    }
    row.push(currentField.trim());
    rows.push(row);
  }
  
  if (rows.length === 0) return [];
  
  const headers = rows[0];
  return rows.slice(1).map(row => {
    const obj: Record<string, string> = {};
    headers.forEach((header, i) => {
      obj[header] = row[i] || "";
    });
    return obj;
  });
}

let cachedJobs: any[] | null = null;

function getJobs() {
  if (cachedJobs) return cachedJobs;
  
  try {
    const filePath = path.join(process.cwd(), "jobs.csv");
    const content = fs.readFileSync(filePath, "utf-8");
    cachedJobs = parseCSV(content);
    return cachedJobs;
  } catch (error) {
    console.error("Error reading CSV:", error);
    return [];
  }
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;
    const userMsgLower = lastMessage.toLowerCase().trim();
    
    // Special Greeting Handling
    if (userMsgLower === "hi" || userMsgLower === "hello") {
      return NextResponse.json({ 
        content: "hello, how can i help you?can you tell me a bit about yourself, like your interests or any areas you're considering for your career? This will help me guide you in the right direction" 
      });
    }

    const jobs = getJobs();
    
    // Simple relevance search
    const keywords = userMsgLower.split(/\s+/).filter((k: string) => k.length > 3);
    const relevantJobs = jobs.filter(job => {
      const text = `${job.title} ${job.description} ${job.synonyms}`.toLowerCase();
      return keywords.some((k: string) => text.includes(k));
    }).slice(0, 5);
    
    const context = relevantJobs.length > 0 
      ? "Job Database Context:\n" + 
        relevantJobs.map(j => `- Job: ${j.title}, Risk: ${j.risk_score}%, Salary: ${j.salary}, Demand: ${j.demand_level}. Details: ${j.description}`).join("\n")
      : "Provide general career guidance based on global market pulse.";

    const systemPrompt = `You are a High-End Career Consultant for "AI VS ME". 

STRICT RULES:
1. NO FORMATTING SYMBOLS: Do NOT use asterisks (**), hashtags, or any other markdown symbols in your response. Just plain text.
2. PRECISE & BALANCED: Your response should be informative but never too long or too short. 
3. REPLY TO EVERY QUERY: Always acknowledge the user's input and provide a helpful, data-driven answer.
4. TONE: Professional, high-end, and encouraging.
5. NO DEFLECTION: If a specific job is mentioned that is not in the context, provide a highly educated estimate based on the field.

CONTEXT:
${context}

User's Latest Query: ${lastMessage}`;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.slice(-3) // Reduced history for precision
        ],
        max_tokens: 400,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_CHATBOT_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    let reply = response.data.choices[0].message.content;
    // Post-processing to ensure no double asterisks left
    reply = reply.replace(/\*\*/g, "");

    return NextResponse.json({ content: reply });
  } catch (error: any) {
    console.error("Chat API error:", error.response?.data || error.message);
    return NextResponse.json({ error: "Failed to get response" }, { status: 500 });
  }
}
