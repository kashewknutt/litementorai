// components/Navbar.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-sky-100 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link href="#" className="text-2xl font-ovo text-sky-600">LiteMentor</Link>
        <div className="hidden md:flex space-x-6 font-outfit text-gray-700">
          <Link href="#how" className="hover:text-sky-500">How It Works</Link>
          <Link href="#demo" className="hover:text-sky-500">Try Demo</Link>
          <Link href="#contact" className="hover:text-sky-500">Contact</Link>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          <span className="material-icons">menu</span>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden flex flex-col items-start px-4 pb-4 space-y-2 font-outfit">
          <Link href="#how" className="hover:text-sky-500">How It Works</Link>
          <Link href="#demo" className="hover:text-sky-500">Try Demo</Link>
          <Link href="#contact" className="hover:text-sky-500">Contact</Link>
        </div>
      )}
    </nav>
  )
}