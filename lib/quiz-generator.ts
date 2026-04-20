/**
 * Generates an automated set of quiz questions based on the course and module title.
 * This is a rule-based generator that creates context-relevant questions.
 */
export function generateAutomatedQuiz(courseTitle: string, moduleTitle: string) {
  const rawQuestions = [
    {
      id: "q1",
      question: `What is the primary focus of the "${moduleTitle}" module in the "${courseTitle}" course?`,
      options: [
        { id: "correct", text: `To understand the core principles of ${moduleTitle}` },
        { id: "wrong1", text: "To memorize historical dates only" },
        { id: "wrong2", text: "To avoid practical applications" },
        { id: "wrong3", text: "None of the above" }
      ],
      correctOptionId: "correct",
      explanation: `This module is specifically designed to provide a deep understanding of ${moduleTitle} within the broader context of ${courseTitle}.`
    },
    {
      id: "q2",
      question: `How does "${moduleTitle}" contribute to the overall goals of "${courseTitle}"?`,
      options: [
        { id: "wrong1", text: "It is an optional, unrelated topic" },
        { id: "correct", text: `It provides foundational knowledge required for ${courseTitle} mastery` },
        { id: "wrong2", text: "It replaces the need for other modules" },
        { id: "wrong3", text: "It is primarily for entertainment" }
      ],
      correctOptionId: "correct",
      explanation: `Each module, including ${moduleTitle}, is a critical building block in the comprehensive ${courseTitle} curriculum.`
    },
    {
      id: "q3",
      question: `Which of the following best describes a key outcome after completing the "${moduleTitle}" section?`,
      options: [
        { id: "wrong1", text: "Increased confusion about the subject" },
        { id: "correct", text: "Ability to apply theoretical concepts to real-world scenarios" },
        { id: "wrong2", text: "Decreased interest in learning more" },
        { id: "wrong3", text: "No change in skill level" }
      ],
      correctOptionId: "correct",
      explanation: "Our courses focus on practical, actionable knowledge that can be applied immediately."
    }
  ];

  // Map back to a, b, c, d IDs for consistency but in random order
  return rawQuestions.map(q => {
    const shuffled = [...q.options].sort(() => Math.random() - 0.5);
    const optionsWithIds = shuffled.map((opt, idx) => ({
      id: String.fromCharCode(97 + idx), // a, b, c, d
      text: opt.text,
      originalId: opt.id
    }));
    
    const correctId = optionsWithIds.find(o => o.originalId === "correct")?.id || "a";
    
    return {
      ...q,
      options: optionsWithIds.map(({ id, text }) => ({ id, text })),
      correctOptionId: correctId
    };
  });
}
