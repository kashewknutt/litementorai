// types/index.ts
export interface EvaluationResult {
  feedback: string
  suggestions: {
    title: string
    description: string
  }[]
  score: {
    clarity: number
    logic: number
    completeness: number
    difficulty: string
  }
}