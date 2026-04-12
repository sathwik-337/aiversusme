/**
 * Generates an automated set of quiz questions based on the course and module title.
 * This is a rule-based generator that creates context-relevant questions.
 */
export function generateAutomatedQuiz(courseTitle: string, moduleTitle: string) {
  const questions = [
    {
      id: "q1",
      question: `What is the primary focus of the "${moduleTitle}" module in the "${courseTitle}" course?`,
      options: [
        { id: "a", text: `To understand the core principles of ${moduleTitle}` },
        { id: "b", text: "To memorize historical dates only" },
        { id: "c", text: "To avoid practical applications" },
        { id: "d", text: "None of the above" }
      ],
      correctOptionId: "a",
      explanation: `This module is specifically designed to provide a deep understanding of ${moduleTitle} within the broader context of ${courseTitle}.`
    },
    {
      id: "q2",
      question: `How does "${moduleTitle}" contribute to the overall goals of "${courseTitle}"?`,
      options: [
        { id: "a", text: "It is an optional, unrelated topic" },
        { id: "b", text: `It provides foundational knowledge required for ${courseTitle} mastery` },
        { id: "c", text: "It replaces the need for other modules" },
        { id: "d", text: "It is primarily for entertainment" }
      ],
      correctOptionId: "b",
      explanation: `Each module, including ${moduleTitle}, is a critical building block in the comprehensive ${courseTitle} curriculum.`
    },
    {
      id: "q3",
      question: `Which of the following best describes a key outcome after completing the "${moduleTitle}" section?`,
      options: [
        { id: "a", text: "Increased confusion about the subject" },
        { id: "b", text: "Ability to apply theoretical concepts to real-world scenarios" },
        { id: "c", text: "Decreased interest in learning more" },
        { id: "d", text: "No change in skill level" }
      ],
      correctOptionId: "b",
      explanation: "Our courses focus on practical, actionable knowledge that can be applied immediately."
    }
  ];

  return questions;
}
