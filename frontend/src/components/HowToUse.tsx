// components/HowToUse.tsx
export default function HowToUse() {
  return (
    <section id="how" className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-ovo mb-8 text-gray-800">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10 text-left font-outfit text-gray-700">
          <div>
            <div className="text-2xl mb-2">1️⃣ Ask a Question</div>
            <p>Enter any academic question you’re exploring — history, science, philosophy, etc.</p>
          </div>
          <div>
            <div className="text-2xl mb-2">2️⃣ Write Your Answer</div>
            <p>Paste or type your response just like you would in an exam or essay.</p>
          </div>
          <div>
            <div className="text-2xl mb-2">3️⃣ Get Feedback</div>
            <p>AI evaluates your answer and gives feedback on clarity, completeness, and logic.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
