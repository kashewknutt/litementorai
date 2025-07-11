import Hero from '@/components/Hero'
import QuestionForm from '@/components/QuestionForm'
import HowToUse from '@/components/HowToUse'
import BackgroundBlobs from '@/components/BackgroundBlobs'

export default function Home() {
  return (
    <main className="relative min-h-screen px-6 md:px-20 bg-white">
      <BackgroundBlobs />
      <Hero />
      <QuestionForm />
      <HowToUse />
    </main>
  )
}
