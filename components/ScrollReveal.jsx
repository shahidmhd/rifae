'use client'

import { motion } from 'framer-motion'

const VARIANTS = {
  up:    { hidden: { opacity: 0, y: 60 },           visible: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -60 },          visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -70 },          visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 70 },           visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.75 },     visible: { opacity: 1, scale: 1 } },
  flip:  { hidden: { opacity: 0, rotateX: 80 },     visible: { opacity: 1, rotateX: 0 } },
  zoom:  { hidden: { opacity: 0, scale: 1.15 },     visible: { opacity: 1, scale: 1 } },
  rotate:{ hidden: { opacity: 0, rotate: -8, y: 30 }, visible: { opacity: 1, rotate: 0, y: 0 } },
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.75,
  className = '',
  margin = '-60px',
  once = true,
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={VARIANTS[direction]}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Split-text character reveal ───────────────────────────────────────── */
export function SplitText({ text, className = '', delay = 0, charDelay = 0.03 }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 28, rotateX: 40 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: delay + i * charDelay, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-block"
          style={{ perspective: '600px', transformOrigin: '50% 100%' }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </span>
  )
}

/* ─── Word-by-word reveal ────────────────────────────────────────────────── */
export function SplitWords({ text, className = '', delay = 0, wordDelay = 0.08 }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: delay + i * wordDelay, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
