'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SessionCard from './SessionCard'
import AnimatedSection from '@/components/ui/AnimatedSection'

interface Session {
  slug: string
  title: string
  date: string
  category: string
  image: string
}

interface SessionsContentProps {
  sessions: Session[]
  categories: string[]
}

export default function SessionsContent({ sessions, categories }: SessionsContentProps) {
  const [activeFilter, setActiveFilter] = useState('All')

  const filters = ['All', ...categories]

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return sessions
    return sessions.filter((s) => s.category === activeFilter)
  }, [activeFilter, sessions])

  return (
    <>
      {/* Filter Tabs */}
      <AnimatedSection>
        <div className="flex flex-wrap justify-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-5 py-2 font-sans text-sm transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-accent text-primary'
                  : 'border border-white/10 text-text-muted hover:border-accent/50 hover:text-text-primary'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </AnimatedSection>

      {/* Grid */}
      <div className="mt-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((session) => (
              <SessionCard key={session.slug} session={session} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="text-center font-sans text-text-muted py-12">
            No sessions in this category yet. Check back soon!
          </p>
        )}
      </div>
    </>
  )
}
