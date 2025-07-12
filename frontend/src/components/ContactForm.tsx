// components/ContactForm.tsx
'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [result, setResult] = useState('')

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setResult('Sending...')

    const formData = new FormData(event.currentTarget)
    formData.append('access_key', 'e94d618d-82c6-4a05-b640-7506934cf26f')

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    if (data.success) {
      setResult('Message sent successfully!')
      event.currentTarget.reset()
    } else {
      setResult('Something went wrong. Please try again.')
    }
  }

  return (
    <section id="contact" className="bg-[url('/paint-splash-light.png')] bg-cover bg-center py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-ovo text-gray-800 mb-4">Like the Developer?</h2>
        <p className="text-lg font-outfit text-gray-600 mb-8">
          Open to project-based collaborations, freelancing, and contract work in AI/UX/frontend. Let’s build something amazing together.
        </p>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input name="name" required placeholder="Your Name" className="p-3 border border-gray-300 rounded-md w-full" />
            <input name="email" type="email" required placeholder="Your Email" className="p-3 border border-gray-300 rounded-md w-full" />
          </div>
          <textarea name="message" rows={5} required placeholder="Your Message" className="w-full p-3 border border-gray-300 rounded-md"></textarea>
          <button type="submit" className="bg-sky-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-sky-700">
            Send Message
          </button>
          {result && <p className="text-gray-500 mt-2">{result}</p>}
        </form>
      </div>
    </section>
  )
}
