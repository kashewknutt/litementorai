import { EvaluationResult } from "@/types"

export async function evaluateAnswer(
  question: string,
  answer: string
): Promise<EvaluationResult> {
  const response = await fetch("https://litementorai-365628037012.asia-south1.run.app/evaluate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ question, answer })
  })

  const data = await response.json()

  if ('error' in data) {
    throw new Error(data.error || 'Evaluation failed')
  }

  return data
}
