'use client'

import { useState } from 'react'

export default function QuestionForm() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  return (
    <section className="bg-white/60 border border-sky-100 shadow-md backdrop-blur-xl rounded-2xl p-8 max-w-3xl mx-auto z-10 relative">
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

      <button className="mt-4 px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium">
        Evaluate Answer
      </button>
    </section>
  )
}
