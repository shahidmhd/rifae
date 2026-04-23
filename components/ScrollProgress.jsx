'use client'

import { useScroll, useSpring, motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  const [pct, setPct] = useState(0)

  useEffect(() => {
    return scrollYProgress.on('change', (v) => setPct(Math.round(v * 100)))
  }, [scrollYProgress])

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[9999] h-[2px] origin-left pointer-events-none"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #e50914 0%, #ff6b35 50%, #f5c518 100%)',
          boxShadow: '0 0 8px rgba(229,9,20,0.6)',
        }}
      />
      {/* Percentage badge — appears after 5% scroll */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: pct > 5 ? 1 : 0, scale: pct > 5 ? 1 : 0.8 }}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center glass pointer-events-none"
        style={{ border: '1px solid rgba(229,9,20,0.25)' }}
      >
        <svg className="absolute inset-0" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(229,9,20,0.15)" strokeWidth="2" />
          <motion.circle
            cx="18" cy="18" r="15.9"
            fill="none" stroke="#e50914" strokeWidth="2"
            strokeDasharray="100 100"
            strokeDashoffset={100 - pct}
            strokeLinecap="round"
            style={{ rotate: -90, transformOrigin: '18px 18px' }}
          />
        </svg>
        <span className="text-[9px] font-bold text-white relative z-10">{pct}%</span>
      </motion.div>
    </>
  )
}
