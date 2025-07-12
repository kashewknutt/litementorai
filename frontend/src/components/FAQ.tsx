// components/FAQ.tsx
'use client'

export default function FAQ() {
  return (
    <section id="faq" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-ovo text-gray-800 mb-10">Frequently Asked Questions</h2>
        <div className="space-y-8 text-center md:text-left font-outfit text-gray-700">
          <div>
            <h4 className="text-xl font-semibold mb-2">Is LiteMentor completely free to use?</h4>
            <p>Yes! By default, we use free-tier LLM providers like Gemma through OpenRouter. You can also plug in your own OpenAI key for more advanced usage.</p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-2">What happens to my data?</h4>
            <p>We don’t store any of your questions, answers, or OpenAI keys. Everything runs in your browser unless you opt to use the fallback backend in future phases.</p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-2">Can I use this for other subjects?</h4>
            <p>Yes! LiteMentor works well for essays, open-ended answers, or explanations across subjects like history, science, philosophy, and languages.</p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-2">What if the AI gives wrong feedback?</h4>
            <p>This is an early-stage tool. While LLMs are quite reliable, they’re not perfect. Treat the feedback as helpful guidance — not an official grade.</p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-2">Can I contribute or customize this?</h4>
            <p>Absolutely. It’s open source! Check the GitHub repo and feel free to fork, star, or suggest ideas via issues or pull requests.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
