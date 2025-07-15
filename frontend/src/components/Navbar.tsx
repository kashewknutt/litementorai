// components/Navbar.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-sky-100 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link href="#" className="text-2xl font-ovo text-sky-600">LiteMentor</Link>
        <div className="hidden md:flex space-x-6 font-outfit text-gray-700 items-center">
          <Link href="#how" className="hover:text-sky-500">How It Works</Link>
          <Link href="#demo" className="hover:text-sky-500">Try Demo</Link>
          <Link href="#faq" className="hover:text-sky-500">FAQ</Link>
          <Link href="#contact" className="hover:text-sky-500">Contact</Link>
          <a
          href="https://github.com/kashewknutt/reddit_persona_scrapper"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-8 py-2 border border-gray-300 rounded-lg transition duration-300 hover:bg-emerald-300/30 relative group"
          >
          <Image src="/github.svg" alt="GitHub" width={16} height={16} />
          <span className="text-sm text-gray-700">Star</span>
          <div className="w-8 h-4 bg-gray-300 text-white text-xs flex items-center justify-center rounded-full cursor-pointer group-hover:bg-gray-400">
            i
          </div>
          <div className="absolute bottom-[-80px] w-full left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
            It would mean a lot if you starred the repo on GitHub! Show your support!
          </div>
          </a>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          <span className="material-icons">menu</span>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden flex flex-col items-start px-4 pb-4 space-y-2 font-outfit">
          <Link href="#how" className="hover:text-sky-500">How It Works</Link>
          <Link href="#demo" className="hover:text-sky-500">Try Demo</Link>
          <Link href="#faq" className="hover:text-sky-500">FAQ</Link>
          <Link href="#contact" className="hover:text-sky-500">Contact</Link>
          <a
            href="https://github.com/kashewknutt/litementorai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-700 hover:underline"
          >
            <Image src="/github.svg" alt="GitHub" width={18} height={18} /> Star
          </a>
        </div>
      )}
    </nav>
  )
}