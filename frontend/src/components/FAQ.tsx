// components/FAQ.tsx
'use client'

import { useState } from 'react'

const faqs = [
  {
    question: 'Is LiteMentor completely free to use?',
    answer: 'Yes! By default, we use free-tier LLM providers like Gemma through OpenRouter. You can also plug in your own OpenAI key for more advanced usage.',
  },
  {
    question: 'What happens to my data?',
    answer: 'We don’t store any of your questions, answers, or OpenAI keys. Everything runs in your browser unless you opt to use the fallback backend in future phases.',
  },
  {
    question: 'Can I use this for other subjects?',
    answer: 'Yes! LiteMentor works well for essays, open-ended answers, or explanations across subjects like history, science, philosophy, and languages.',
  },
  {
    question: 'What if the AI gives wrong feedback?',
    answer: 'This is an early-stage tool. While LLMs are quite reliable, they’re not perfect. Treat the feedback as helpful guidance — not an official grade.',
  },
  {
    question: 'Can I contribute or customize this?',
    answer: 'Absolutely. It’s open source! Check the GitHub repo and feel free to fork, star, or suggest ideas via issues or pull requests.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-ovo text-gray-800 mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4 text-left font-outfit text-gray-700">
          {faqs.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggle(index)}
                className="w-full text-left px-5 py-4 bg-white hover:bg-sky-50 focus:outline-none transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-800">{item.question}</span>
                  <span className="text-sky-500 text-xl">{openIndex === index ? '−' : '+'}</span>
                </div>
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 text-gray-600 transition-all duration-300 ease-in-out">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}