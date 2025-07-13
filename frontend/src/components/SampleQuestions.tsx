// components/SampleQuestions.tsx
'use client'

interface SampleQuestionsProps {
  onSelect: (question: string) => void
}

const sampleQuestions = [
  'What were the causes of the French Revolution?',
  "Explain Newton's first law of motion.",
  'How does photosynthesis work?',
  'What is the significance of the Treaty of Versailles?',
  'Describe the water cycle and its stages.',
]

export default function SampleQuestions({ onSelect }: SampleQuestionsProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Try one of these:</h3>
      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
        {sampleQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => onSelect(q)}
            className="text-sm px-4 py-2 border border-sky-200 bg-white hover:bg-sky-50 rounded-full text-gray-700 transition"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  )
}