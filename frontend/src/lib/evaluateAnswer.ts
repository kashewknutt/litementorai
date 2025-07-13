// lib/evaluateAnswer.ts
import { EvaluationResult } from '@/types'

export async function evaluateAnswer(
  question: string,
  answer: string
): Promise<EvaluationResult> {
  const prompt = `
You are an academic evaluator. Evaluate this student's answer.

Question: ${question}

Student Answer: ${answer}

Provide the following JSON response:
{
  "feedback": "A short paragraph on clarity, logic, and completeness",
  "suggestions": [
    {
      "title": "Fix Structure",
      "description": "Break your points into clear sections and paragraphs."
    },
    {
      "title": "Add Facts",
      "description": "Support your argument with at least one statistic or fact."
    },
    {
      "title": "Improve Flow",
      "description": "Use better transitions between ideas to guide the reader."
    }
  ],
  "score": {
    "clarity": 7,
    "logic": 6,
    "completeness": 5,
    "difficulty": "Medium"
  }
}`.trim()

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'google/gemma-3n-e2b-it:free',
      messages: [{ role: 'user', content: prompt }]
    })
  })

  const data = await response.json()
  let raw = data.choices?.[0]?.message?.content || ''
  raw = raw.replace(/```json|```/g, '').trim()

  try {
    return JSON.parse(raw)
  } catch {
    return {
      feedback: raw,
      suggestions: [],
      score: {
        clarity: 0,
        logic: 0,
        completeness: 0,
        difficulty: 'Unknown'
      }
    }
  }
}
