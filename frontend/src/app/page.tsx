export default function Home() {
  return (
    <main className="relative min-h-screen px-6 py-12 md:px-24 bg-white overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-72 h-72 bg-sky-100 rounded-full top-[-50px] left-[-50px] blur-3xl opacity-30" />
        <div className="absolute w-96 h-96 bg-violet-100 rounded-full bottom-[-100px] right-[-80px] blur-3xl opacity-25" />
        <div className="absolute w-64 h-64 bg-emerald-100 rounded-full top-1/2 left-1/3 blur-2xl opacity-10" />
      </div>

      <section className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-ovo text-gray-800 mb-6">
          Welcome to <span className="text-sky-500">LiteMentor</span>
        </h1>
        <p className="text-lg text-gray-600 font-outfit mb-10">
          A minimalist, multilingual AI study assistant — built to be free, private, and sleek.
        </p>
        <div className="bg-white/70 backdrop-blur-md shadow-md border border-sky-100 rounded-2xl px-6 py-8">
          <p className="text-gray-500 italic mb-2">Try a question below:</p>
          <textarea
            placeholder="Type your answer here..."
            className="w-full p-4 text-gray-700 bg-white border border-sky-100 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-sky-200"
            rows={6}
          ></textarea>
          <button className="mt-6 px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium transition-all">
            Evaluate Answer
          </button>
        </div>
      </section>
    </main>
  )
}
