'use client';
// app/page.tsx
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import HowToUse from '@/components/HowToUse'
import Footer from '@/components/Footer'
import QuestionForm from '@/components/QuestionForm'
import ContactForm from '@/components/ContactForm'

export default function Home() {
  return (
    <main className="bg-white text-gray-900">
      <Navbar />
      <Hero />
      <HowToUse />
      <section id="demo" className="py-16 px-4">
        <QuestionForm />
      </section>
      <ContactForm />
      <Footer />
    </main>
  )
}