export interface EvaluationResult {
  feedback: string
  suggestions: string[]
}

export async function evaluateAnswer(
  question: string,
  answer: string
): Promise<EvaluationResult> {
  const prompt = `
You are an academic evaluator. Evaluate this student's answer.

Question: ${question}

Student Answer: ${answer}

Give clear feedback (clarity, logic, completeness), and a 3-point improvement summary.

Respond in this format:
{
  "feedback": "...",
  "suggestions": ["...", "...", "..."]
}
`.trim()

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemma-3n-e2b-it:free",
      messages: [{ role: "user", content: prompt }],
    }),
  })

  const data = await response.json()
  let raw = data.choices?.[0]?.message?.content || ""

  // ✅ Remove markdown code block formatting
  raw = raw.replace(/```json|```/g, "").trim()

  try {
    return JSON.parse(raw)
  } catch {
    return {
      feedback: raw,
      suggestions: [],
    }
  }
}
