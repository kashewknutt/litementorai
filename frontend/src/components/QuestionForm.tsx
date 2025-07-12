// components/QuestionForm.tsx
'use client'

import { evaluateAnswer, EvaluationResult } from '@/lib/evaluateAnswer'
import { useState } from 'react'

export default function QuestionForm() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState<EvaluationResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleEvaluate = async () => {
    if (!question || !answer) return
    setLoading(true)
    const res = await evaluateAnswer(question, answer)
    setResult(res)
    setLoading(false)
  }

  return (
    <section className="bg-white/80 border border-sky-100 shadow-md backdrop-blur-xl rounded-2xl p-8 max-w-3xl mx-auto z-10 relative">
      <label className="block mb-4">
        <span className="text-gray-700 font-medium">Enter your academic question:</span>
        <input
          type="text"
          placeholder="e.g. What caused the fall of the Roman Empire?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="mt-2 w-full p-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-300"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 font-medium">Your answer:</span>
        <textarea
          placeholder="Type your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="mt-2 w-full p-3 border border-sky-200 rounded-xl resize-none focus:ring-2 focus:ring-sky-300"
          rows={6}
        ></textarea>
      </label>

      <button
        onClick={handleEvaluate}
        disabled={loading}
        className={`mt-4 px-6 py-2 rounded-xl font-medium text-white transition-all ${loading ? 'bg-sky-300 cursor-not-allowed' : 'bg-sky-500 hover:bg-sky-600'}`}
      >
        {loading ? 'Evaluating...' : 'Evaluate Answer'}
      </button>

      {result && (
        <div className="mt-6 border p-4 rounded-xl bg-white/90 shadow">
          <p className="text-gray-700 font-medium mb-2">Feedback:</p>
          <p className="text-gray-600 mb-4 whitespace-pre-wrap">{result.feedback}</p>
          <p className="text-gray-700 font-medium mb-2">Suggestions:</p>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            {result.suggestions.map((s: string, i: number) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}