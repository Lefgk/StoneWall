'use client'

import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Audits } from './components/Audits'
import { Footer } from './components/Footer'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0E0E0E]" />
    )
  }

  return (
    <main className="min-h-screen bg-[#0E0E0E]">
      <Header />
      <Hero />
      <Services />
      <Audits />
      <Footer />
    </main>
  )
}
