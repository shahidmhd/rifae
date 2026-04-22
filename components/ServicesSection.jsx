'use client'

import { motion } from 'framer-motion'

const SERVICES = [
  {
    id: '01',
    icon: '📱',
    title: 'Flutter Development',
    desc: 'Cross-platform mobile apps built with Flutter & Dart — smooth, fast, and pixel-perfect on iOS and Android.',
    accent: '#4a9eff',
    tags: ['Flutter', 'Dart', 'iOS', 'Android'],
  },
  {
    id: '02',
    icon: '🎨',
    title: 'UI / UX Design',
    desc: 'Intuitive interfaces crafted from wireframe to high-fidelity prototype. Clean, modern, and user-first.',
    accent: '#9b59b6',
    tags: ['Figma', 'Prototyping', 'Design Systems'],
  },
  {
    id: '03',
    icon: '📷',
    title: 'Photography',
    desc: 'Cinematic portraits, travel stories, and street photography. Every frame tells a story.',
    accent: '#f5c518',
    tags: ['Portrait', 'Travel', 'Street'],
  },
  {
    id: '04',
    icon: '🎬',
    title: 'Reels & Video Editing',
    desc: 'Short-form content that hooks in 3 seconds. Movie reviews, cinematic reels, and brand videos.',
    accent: '#e50914',
    tags: ['Reels', 'Editing', 'Storytelling'],
  },
  {
    id: '05',
    icon: '🛡️',
    title: 'Cyber Security',
    desc: 'Vulnerability assessments, ethical hacking, and security consulting to keep your systems safe.',
    accent: '#2ecc71',
    tags: ['Pentesting', 'VAPT', 'Consulting'],
  },
  {
    id: '06',
    icon: '🌐',
    title: 'Content Creation',
    desc: 'Growing your digital presence with strategy-backed content across Instagram, Threads, and the web.',
    accent: '#e67e22',
    tags: ['Instagram', 'Branding', 'Growth'],
  },
]

function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className="relative group rounded-2xl p-6 cursor-default overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl transition-all duration-500"
        style={{ background: service.accent, opacity: 0.6 }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 40px ${service.accent}10, 0 0 40px ${service.accent}08` }}
      />

      {/* Background number */}
      <div
        className="absolute right-4 top-3 text-6xl font-black leading-none select-none pointer-events-none transition-all duration-500 group-hover:opacity-100"
        style={{ color: service.accent, opacity: 0.04, fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
      >
        {service.id}
      </div>

      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
        transition={{ duration: 0.4 }}
        className="text-3xl mb-4 inline-block select-none"
      >
        {service.icon}
      </motion.div>

      {/* Title */}
      <h3 className="text-white font-bold text-lg mb-2 leading-snug group-hover:text-white transition-colors">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-gray-500 text-sm leading-relaxed mb-5">
        {service.desc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider transition-all duration-300 group-hover:border-opacity-40"
            style={{
              background: `${service.accent}12`,
              border: `1px solid ${service.accent}25`,
              color: service.accent,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom border reveal */}
      <div
        className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${service.accent}50, transparent)` }}
      />
    </motion.div>
  )
}

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 px-5">
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
            <span className="text-red-300 text-[9px] font-bold uppercase tracking-[0.25em]">What I do</span>
          </span>

          <h2
            className="text-3xl md:text-4xl font-black text-white mb-3"
            style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
          >
            Services
          </h2>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            From code to camera — a multidisciplinary creator at your service.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 text-sm mb-4">Interested in working together?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-semibold hover:from-red-500 hover:to-orange-500 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/30 hover:-translate-y-0.5"
          >
            Let&apos;s Talk
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  )
}
