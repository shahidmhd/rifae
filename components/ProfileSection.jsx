'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import reelsData from '@/data/reels.json'

/* ─── Animated counter hook ──────────────────────────────────────────────── */
function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          const start = performance.now()
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
            else setCount(target)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, started])

  return { count, ref }
}

/* ─── Single stat with count-up ─────────────────────────────────────────── */
function AnimatedStat({ raw, suffix = '', label }) {
  const { count, ref } = useCountUp(raw)
  const display = count >= 1000
    ? `${(count / 1000).toFixed(count % 100 === 0 ? 0 : 1)}K`
    : count.toString()

  return (
    <div ref={ref} className="text-center md:text-left group cursor-default">
      <div className="text-2xl md:text-3xl font-black text-white leading-none tabular-nums transition-all duration-200 group-hover:text-red-400">
        {display}{suffix}
      </div>
      <div className="text-[10px] text-gray-600 uppercase tracking-[0.2em] mt-1">{label}</div>
    </div>
  )
}

/* ─── Bio roles ──────────────────────────────────────────────────────────── */
const BIO_ROLES = [
  { icon: '📱', label: 'Flutter Developer' },
  { icon: '📷', label: 'Photographer' },
  { icon: '🎨', label: 'UI/UX Designer' },
  { icon: '🌍', label: 'Traveler' },
  { icon: '🛡️', label: 'Cyber Security' },
  { icon: '🎬', label: 'Digital Creator' },
]

/* ─── Link button ────────────────────────────────────────────────────────── */
function LinkChip({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-gray-400 text-[11px] font-medium hover:bg-white/10 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
    >
      {icon}
      <span>{label}</span>
    </a>
  )
}

/* ─── Profile image with fallback ────────────────────────────────────────── */
function ProfileAvatar() {
  const [imgErr, setImgErr] = useState(false)

  return (
    <div className="relative flex-shrink-0">
      {/* Animated conic-gradient ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-[-4px] rounded-full"
        style={{ background: 'conic-gradient(from 0deg, #e50914, #ff6b35, #f5c518, #4a9eff, #9b59b6, #e50914)' }}
      />
      {/* White gap ring */}
      <div className="absolute inset-[-2px] rounded-full bg-[#0f0f17]" />
      {/* Photo container */}
      <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden bg-[#1a1a2e]">
        {!imgErr ? (
          <Image
            src="/profile.jpg"
            alt="muhammed__rifaee"
            fill
            className="object-cover"
            onError={() => setImgErr(true)}
          />
        ) : (
          /* Fallback: styled initials */
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #1a0a0f 0%, #2a1020 50%, #0a0a1f 100%)' }}
          >
            <span
              className="text-3xl md:text-4xl font-black select-none"
              style={{
                fontFamily: 'var(--font-cinzel), Cinzel, serif',
                background: 'linear-gradient(135deg, #e50914, #f5c518)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              MR
            </span>
          </div>
        )}
      </div>
      {/* Verified-style dot */}
      <div className="absolute bottom-1.5 right-1.5 w-5 h-5 rounded-full bg-red-500 border-2 border-[#0f0f17] flex items-center justify-center shadow-lg shadow-red-500/40">
        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
      </div>
    </div>
  )
}

/* ─── Main export ─────────────────────────────────────────────────────────── */
export default function ProfileSection() {
  return (
    <section
      id="about"
      className="relative py-20 px-5 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #0d0d14 50%, #0a0a0f 100%)' }}
    >
      {/* Background ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(229,9,20,0.04) 0%, transparent 65%)' }}
      />

      <div className="max-w-4xl mx-auto">

        {/* ── Profile row ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col md:flex-row items-center gap-10 md:gap-14"
        >
          {/* Photo */}
          <ProfileAvatar />

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            {/* Name row */}
            <div className="flex items-center justify-center md:justify-start gap-3 mb-0.5">
              <h2
                className="text-2xl md:text-3xl font-bold text-white"
                style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
              >
                muhammed__rifaee
              </h2>
            </div>

            {/* Full display name */}
            <p className="text-gray-500 text-sm mb-1 tracking-wide">MUH. RIFAEE 🤍</p>

            {/* Badge */}
            <div className="flex items-center justify-center md:justify-start mb-5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm glass-red">
                <span className="text-[9px] text-red-400 uppercase tracking-[0.2em] font-semibold">Digital Creator</span>
              </span>
            </div>

            {/* Stats row — animated counters */}
            <div className="flex items-center justify-center md:justify-start gap-7 md:gap-10 mb-7">
              <AnimatedStat raw={139}  label="Posts" />
              <div className="w-px h-8 bg-white/[0.06]" />
              <AnimatedStat raw={9009} label="Followers" />
              <div className="w-px h-8 bg-white/[0.06]" />
              <AnimatedStat raw={4485} label="Following" />
            </div>

            {/* Bio roles grid */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-6">
              {BIO_ROLES.map(({ icon, label }) => (
                <motion.span
                  key={label}
                  whileHover={{ scale: 1.06, y: -2 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-gray-300 text-[11px] font-medium cursor-default select-none"
                >
                  <span className="text-sm">{icon}</span>
                  {label}
                </motion.span>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-7">
              <LinkChip
                href="https://muhammad-rifaee-github-io.vercel.app"
                icon={
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                }
                label="muhammad-rifaee.vercel.app"
              />
              <LinkChip
                href="https://www.threads.net/@muhammed__rifaee"
                icon={
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 192 192">
                    <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.232c8.248.054 14.473 2.452 18.502 7.13 2.932 3.405 4.893 8.11 5.864 14.05-7.314-1.244-15.224-1.626-23.68-1.141-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.742C35.236 139.966 29.808 120.682 29.605 96c.203-24.682 5.63-43.966 16.133-57.317C56.954 24.425 74.204 17.11 97.013 16.94c22.975.17 40.526 7.52 52.171 21.847 5.71 7.026 10.015 15.86 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 10.646 125.202 1.205 97.07 1h-.255C68.758 1.205 47.08 10.68 32.427 28.23 19.435 43.982 12.75 66.376 12.513 95.923v.154c.237 29.547 6.922 51.941 19.914 67.693C47.08 181.32 68.758 190.795 96.815 191h.255c24.817-.18 42.237-6.672 56.525-21.062 19.264-19.363 18.648-43.541 12.314-58.402-4.534-10.568-13.195-19.083-24.372-24.548ZM97.55 142.734c-10.428.588-21.287-4.098-21.845-14.141-.404-7.555 5.367-15.984 22.552-16.971 1.972-.113 3.905-.17 5.8-.17 6.259 0 12.14.606 17.483 1.763-1.99 24.875-13.497 28.84-23.99 29.519Z"/>
                  </svg>
                }
                label="@muhammed__rifaee"
              />
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
              <a
                href="https://www.instagram.com/muhammed__rifaee/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-semibold transition-all duration-300 hover:from-red-500 hover:to-orange-500 hover:shadow-xl hover:shadow-red-500/30 hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Follow
              </a>
              <a
                href="#reels"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass text-gray-300 text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
              >
                Watch Reels
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── Divider ──────────────────────────────────────────────── */}
        <div className="mt-16 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>
    </section>
  )
}
