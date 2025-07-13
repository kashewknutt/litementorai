'use client'

import { useEffect, useState } from 'react'
import SampleQuestions from './SampleQuestions'
import { Info, Clock, ChevronRight, Star, ChevronDown } from 'lucide-react'
import Toast from './Toast'
import { EvaluationResult } from '@/types'
import { evaluateAnswer } from '@/lib/evaluateAnswer'

interface HistoryItem {
  question: string
  answer: string
  feedback: string
  suggestions: { title: string; description: string }[]
  score: {
    clarity: number
    logic: number
    completeness: number
    difficulty: string
  }
}

export default function QuestionForm() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState<EvaluationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [openAiKey, setOpenAiKey] = useState('')
  const [location, setLocation] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [rubricLoadingTextIndex, setRubricLoadingTextIndex] = useState(0)
  const [loadingStage, setLoadingStage] = useState<'idle' | 'rubric' | 'evaluating'>('idle')
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [selectedHistoryIndex, setSelectedHistoryIndex] = useState<number | null>(null)
  const [rubricInfo, setRubricInfo] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const rubricTexts = [
    'Fetching education board expectations...',
    'Analyzing regional evaluation style...',
    'Applying rubric-based metrics...'
  ]

  const evalTexts = [
    'Evaluating clarity and logic...',
    'Identifying improvement points...',
    'Scoring your answer...'
  ]

  useEffect(() => {
    const saved = localStorage.getItem('lite-mentor-history')
    if (saved) setHistory(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('lite-mentor-history', JSON.stringify(history))
  }, [history])

  useEffect(() => {
    let interval: any
    if (loadingStage === 'rubric') {
      interval = setInterval(() => {
        setRubricLoadingTextIndex((prev) => (prev + 1) % rubricTexts.length)
      }, 2000)
    } else if (loadingStage === 'evaluating') {
      interval = setInterval(() => {
        setRubricLoadingTextIndex((prev) => (prev + 1) % evalTexts.length)
      }, 2000)
    }
    return () => clearInterval(interval)
  }, [loadingStage])

  const handleEvaluate = async () => {
    if (!question || !answer) return
    setLoading(true)
    try {
      if (location == '') {
        setLoadingStage('evaluating')
        const res = await evaluateAnswer(question, answer)
        setResult(res)
        setToastMessage('Evaluation complete!')
        setHistory((prev) => [{ question, answer, ...res }, ...prev.slice(0, 9)])
        setSelectedHistoryIndex(null)
        setLoading(false)
        setLoadingStage('idle')
      } else {
        setLoadingStage('rubric')
        const rubricRes = await fetch("http://127.0.0.1:8000/rubric-info", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ location }),
        })
        const { rubric } = await rubricRes.json()
        setRubricInfo(rubric)
        setLoadingStage('evaluating')

        const evalRes = await fetch("http://127.0.0.1:8000/evaluate-rubric", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question, answer, rubric, rubric_details: rubric })
        })
        const data = await evalRes.json()

        if ('error' in data) throw new Error(data.error)

        setResult(data)
        setToastMessage('Evaluation complete!')
        setHistory((prev) => [{ question, answer, ...data }, ...prev.slice(0, 9)])
        setSelectedHistoryIndex(null)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
      setLoadingStage('idle')
    }
  }

  useEffect(() => {
    setRubricInfo(null)
  }, [question, location])

  const handleHistoryClick = (index: number) => {
    const item = history[index]
    setQuestion(item.question)
    setAnswer(item.answer)
    setResult({
      feedback: item.feedback,
      suggestions: item.suggestions,
      score: item.score
    })
    setSelectedHistoryIndex(index)
  }

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  return (
    <section id="demo" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <SampleQuestions onSelect={(q) => setQuestion(q)} />
          <h2 className="text-3xl font-ovo text-gray-800 mb-3">Evaluate Your Answer</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get instant AI feedback on your academic responses. Free, private, and secure.
          </p>
        </div>

        <div className="text-right mb-4">
          <button
            type="button"
            onClick={() => setShowAdvanced((prev) => !prev)}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            Additional Preferences
            <ChevronDown size={14} className={`transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showAdvanced && (
          <div className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
            <label className="block text-sm font-medium text-gray-700 mb-1">Board / Region / City</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. CBSE Delhi or Bavaria"
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        )}

        {rubricInfo && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm p-4 rounded-lg mb-6">
            <h4 className="font-medium mb-2">📘 Regional Grading Rubric Info</h4>
            <p className="whitespace-pre-wrap leading-relaxed">{rubricInfo}</p>
          </div>
        )}

        {loading && (
          <div className="text-center mb-6 text-sky-700 font-medium animate-pulse">
            {loadingStage === 'rubric'
              ? rubricTexts[rubricLoadingTextIndex]
              : evalTexts[rubricLoadingTextIndex]}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-4 sticky top-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={16} className="text-gray-500" />
                <h3 className="font-medium text-gray-800 text-sm">Recent Questions</h3>
              </div>
              {history.length === 0 ? (
                <p className="text-gray-500 text-sm">No evaluations yet</p>
              ) : (
                <div className="space-y-2">
                  {history.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleHistoryClick(idx)}
                      className={`w-full text-left p-3 rounded-md text-sm transition-all hover:bg-white hover:shadow-sm ${
                        selectedHistoryIndex === idx ? 'bg-sky-50 border border-sky-200' : 'bg-white border border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-gray-700 leading-relaxed">
                          {truncateText(item.question, 60)}
                        </span>
                        <ChevronRight size={14} className="text-gray-400 mt-1 flex-shrink-0" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                  <input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                    placeholder="Enter your academic question"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Answer</label>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    rows={4}
                    required
                    placeholder="Paste your answer here"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all resize-none"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">OpenAI API Key (Optional)</label>
                  <input
                    type="password"
                    value={openAiKey}
                    onChange={(e) => setOpenAiKey(e.target.value)}
                    placeholder="sk-..."
                    className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                  />
                  <div className="absolute right-3 top-9 group">
                    <Info size={16} className="text-gray-400 cursor-help" />
                    <div className="absolute top-6 right-0 w-64 bg-gray-900 text-white text-xs p-3 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      Your key connects directly to OpenAI. Never stored or sent to our servers.
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleEvaluate}
                  disabled={loading || !question || !answer}
                  className={`w-full py-3 rounded-md font-medium text-white transition-all ${
                    loading || !question || !answer ? 'bg-gray-300 cursor-not-allowed' : 'bg-sky-500 hover:bg-sky-600 hover:shadow-md'
                  }`}
                >
                  {loading ? 'Evaluating...' : 'Evaluate Answer'}
                </button>
              </form>

              {result && (
                <div className="mt-8 pt-6 border-t border-gray-200 space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-3">Feedback</h4>
                    <div className="bg-gray-50 rounded-md p-4">
                      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{result.feedback}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-3">Suggestions</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {result.suggestions.map((s, i) => (
                        <div key={i} className="bg-sky-50 rounded-lg p-4 border border-sky-100">
                          <h5 className="text-sky-700 font-semibold mb-1">{s.title}</h5>
                          <p className="text-gray-700 text-sm">{s.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-3">AI Scorecard</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-white border border-gray-200 rounded-md p-4">
                        <p className="text-gray-800 mb-2 font-medium">Clarity</p>
                        <div className="flex items-center gap-1">
                          {[...Array(result.score.clarity)].map((_, i) => (
                            <Star key={i} size={16} className="text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-md p-4">
                        <p className="text-gray-800 mb-2 font-medium">Logic</p>
                        <div className="flex items-center gap-1">
                          {[...Array(result.score.logic)].map((_, i) => (
                            <Star key={i} size={16} className="text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-md p-4">
                        <p className="text-gray-800 mb-2 font-medium">Completeness</p>
                        <div className="flex items-center gap-1">
                          {[...Array(result.score.completeness)].map((_, i) => (
                            <Star key={i} size={16} className="text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-md p-4">
                        <p className="text-gray-800 mb-2 font-medium">Estimated Difficulty</p>
                        <p className="text-sm font-medium text-sky-700">
                          {result.score.difficulty}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {toastMessage && <Toast message={toastMessage} />}
    </section>
  )
}