// components/Hero.tsx
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-32 px-6 text-center bg-[url('/paint-splash-light.png')] bg-no-repeat bg-cover bg-center" id="home">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl font-ovo text-gray-900 mb-4"
      >
        Create Smarter Answers
      </motion.h1>
      <p className="text-lg text-gray-600 font-outfit max-w-xl mx-auto mb-8">
        An AI-powered assistant to help students write, improve, and understand academic answers across languages.
      </p>
      <a href="#demo" className="inline-block px-6 py-3 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition font-outfit">
        Try It Now
      </a>
    </section>
  )
}
