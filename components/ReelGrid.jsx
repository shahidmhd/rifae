'use client'

import { motion } from 'framer-motion'
import ReelCard from './ReelCard'
import { SplitText } from './ScrollReveal'

/* Scrolling title ticker */
function Marquee({ items }) {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden py-4 border-y border-white/[0.04] mb-10">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-3 text-gray-700 text-xs uppercase tracking-[0.25em] font-medium flex-shrink-0">
            <span
              className="w-1 h-1 rounded-full flex-shrink-0"
              style={{ background: item.accent || '#e50914' }}
            />
            {item.title}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function ReelGrid({ reels }) {
  return (
    <section id="reels" className="py-6 px-5 max-w-5xl mx-auto">
      {/* Ticker */}
      <Marquee items={reels} />

      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center gap-3"
        >
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-0.5 h-5 rounded-full bg-red-500 origin-top"
          />
          <h2
            className="text-lg font-bold text-white tracking-wide overflow-hidden"
            style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
          >
            <SplitText text="Movie Reels" delay={0.1} charDelay={0.04} />
          </h2>
        </motion.div>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-gray-600 text-xs uppercase tracking-widest"
        >
          {reels.length} reviews
        </motion.span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {reels.map((reel, index) => (
          <ReelCard key={reel.id} reel={reel} index={index} />
        ))}
      </div>

      {/* Load more hint */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 text-center"
      >
        <a
          href="https://www.instagram.com/muhammed__rifaee/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-8 py-3 rounded-full glass text-gray-400 text-sm font-medium hover:bg-white/8 hover:text-white transition-all duration-300 hover:-translate-y-0.5 group"
        >
          <span>View all on Instagram</span>
          <svg
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </motion.div>
    </section>
  )
}
