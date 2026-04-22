'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CONTACT_LINKS = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email',
    value: 'muhammedrifaee@gmail.com',
    href: 'mailto:muhammedrifaee@gmail.com',
    accent: '#e50914',
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    label: 'Instagram',
    value: '@muhammed__rifaee',
    href: 'https://www.instagram.com/muhammed__rifaee/',
    accent: '#e84393',
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    ),
    label: 'Portfolio',
    value: 'muhammad-rifaee.vercel.app',
    href: 'https://muhammad-rifaee-github-io.vercel.app',
    accent: '#4a9eff',
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
      </svg>
    ),
    label: 'Location',
    value: 'India 🇮🇳',
    href: null,
    accent: '#f5c518',
  },
]

const SUBJECTS = [
  'Flutter Development',
  'UI/UX Design',
  'Photography',
  'Reels / Video Editing',
  'Cyber Security',
  'Collaboration',
  'Other',
]

/* Replace YOUR_FORM_ID with your Formspree form ID after signing up at formspree.io */
const FORMSPREE_URL = 'https://formspree.io/f/xbjvygje'

function InputField({ label, name, type = 'text', placeholder, value, onChange, required }) {
  return (
    <div className="group">
      <label className="block text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-1.5 font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-600 outline-none transition-all duration-300 focus:border-red-500/50 focus:shadow-lg focus:shadow-red-500/10"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
        onFocus={(e) => {
          e.target.style.border = '1px solid rgba(229,9,20,0.4)'
          e.target.style.background = 'rgba(229,9,20,0.04)'
        }}
        onBlur={(e) => {
          e.target.style.border = '1px solid rgba(255,255,255,0.07)'
          e.target.style.background = 'rgba(255,255,255,0.04)'
        }}
      />
    </div>
  )
}

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: SUBJECTS[0], message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-20 px-5 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(229,9,20,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-red mb-5">
            <span className="w-1 h-1 rounded-full bg-red-400" />
            <span className="text-red-300 text-[9px] font-bold uppercase tracking-[0.25em]">Reach out</span>
          </span>
          <h2
            className="text-3xl md:text-4xl font-black text-white mb-3"
            style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
          >
            Get in Touch
          </h2>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            Got a project in mind? Let&apos;s build something great together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Left: Contact info ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-2 flex flex-col gap-3"
          >
            {CONTACT_LINKS.map(({ icon, label, value, href, accent }) => (
              <div
                key={label}
                className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}25` }}
                >
                  {icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-0.5">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="text-gray-300 text-sm font-medium truncate block hover:text-white transition-colors duration-200"
                      style={{ '--hover-color': accent }}
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-gray-300 text-sm font-medium">{value}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Availability badge */}
            <div
              className="mt-2 p-4 rounded-xl"
              style={{ background: 'rgba(46,204,113,0.06)', border: '1px solid rgba(46,204,113,0.15)' }}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                <div>
                  <p className="text-green-400 text-xs font-semibold">Available for work</p>
                  <p className="text-gray-600 text-[11px] mt-0.5">Open to freelance & collaborations</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Form ────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-3"
          >
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <AnimatePresence mode="wait">
                {status === 'sent' ? (
                  /* ── Success state ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mb-5"
                    >
                      <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
                    <p className="text-gray-500 text-sm mb-6">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                    <button
                      onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: SUBJECTS[0], message: '' }) }}
                      className="text-red-400 text-xs underline underline-offset-4 hover:text-red-300 transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  /* ── Form ── */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField
                        label="Your name"
                        name="name"
                        placeholder="Muhammed"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                      <InputField
                        label="Email address"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Subject select */}
                    <div>
                      <label className="block text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-1.5 font-medium">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all duration-300 appearance-none"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.07)',
                        }}
                        onFocus={(e) => {
                          e.target.style.border = '1px solid rgba(229,9,20,0.4)'
                          e.target.style.background = 'rgba(229,9,20,0.04)'
                        }}
                        onBlur={(e) => {
                          e.target.style.border = '1px solid rgba(255,255,255,0.07)'
                          e.target.style.background = 'rgba(255,255,255,0.04)'
                        }}
                      >
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s} style={{ background: '#111118' }}>{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-1.5 font-medium">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell me about your project..."
                        className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-600 outline-none resize-none transition-all duration-300"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.07)',
                        }}
                        onFocus={(e) => {
                          e.target.style.border = '1px solid rgba(229,9,20,0.4)'
                          e.target.style.background = 'rgba(229,9,20,0.04)'
                        }}
                        onBlur={(e) => {
                          e.target.style.border = '1px solid rgba(255,255,255,0.07)'
                          e.target.style.background = 'rgba(255,255,255,0.04)'
                        }}
                      />
                    </div>

                    {/* Error banner */}
                    {status === 'error' && (
                      <motion.p
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5"
                      >
                        Something went wrong. Please try again or email directly.
                      </motion.p>
                    )}

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      whileHover={status !== 'sending' ? { y: -2 } : {}}
                      whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
                      className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{
                        background: status === 'sending'
                          ? 'rgba(229,9,20,0.4)'
                          : 'linear-gradient(135deg, #e50914 0%, #c0060f 100%)',
                        boxShadow: status !== 'sending' ? '0 8px 32px rgba(229,9,20,0.25)' : 'none',
                      }}
                    >
                      {status === 'sending' ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </>
                      )}
                    </motion.button>


                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
