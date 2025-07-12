// components/QuestionForm.tsx
'use client'

import { evaluateAnswer, EvaluationResult } from '@/lib/evaluateAnswer'
import { useState } from 'react'

export default function QuestionForm() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState<EvaluationResult | null>(null)
  const [loading, setLoading] = useState(false)
  // const [openAiKey, setOpenAiKey] = useState('')

  const handleEvaluate = async () => {
    if (!question || !answer) return
    setLoading(true)
    const res = await evaluateAnswer(question, answer)
    setResult(res)
    setLoading(false)
  }

  return (
    <section id="demo" className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-ovo text-gray-800 mb-4">Try It Yourself</h2>
        <p className="text-lg font-outfit text-gray-600 mb-8">
          Paste your question and answer below. We&apos;ll give you clear AI feedback — free and private.
        </p>
        <form className="space-y-6">
          <div className="grid gap-6">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              placeholder="Enter your academic question"
              className="p-3 border border-gray-300 rounded-md w-full"
            />
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={6}
              required
              placeholder="Paste your answer here"
              className="p-3 border border-gray-300 rounded-md w-full"
            ></textarea>

            {/* <div className="relative">
              <input
                type="text"
                value={openAiKey}
                onChange={(e) => setOpenAiKey(e.target.value)}
                placeholder="Optional: Your OpenAI API Key"
                className="p-3 border border-gray-300 rounded-md w-full"
              />
              <div className="absolute right-3 top-3 group">
                <Info size={18} className="text-gray-400" />
                <div className="absolute top-6 right-0 w-64 bg-white text-sm text-gray-700 p-3 border border-gray-300 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  Your key is never stored or sent to our backend. This connects directly to OpenAI. No hidden charges.
                </div>
              </div>
            </div> */}
          </div>

          <button
            type="button"
            onClick={handleEvaluate}
            disabled={loading}
            className={`w-full py-3 rounded-xl font-medium text-white transition-all text-lg ${loading ? 'bg-sky-300 cursor-not-allowed' : 'bg-sky-500 hover:bg-sky-600'}`}
          >
            {loading ? 'Evaluating Answer...' : 'Evaluate Answer'}
          </button>

          {result && (
            <div className="mt-10 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm text-left">
              <h4 className="text-xl font-medium text-gray-800 mb-3">Feedback</h4>
              <p className="text-gray-700 mb-5 whitespace-pre-wrap">{result.feedback}</p>
              <h5 className="text-lg font-medium text-gray-800 mb-2">Suggestions for Improvement</h5>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                {result.suggestions.map((s: string, i: number) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
