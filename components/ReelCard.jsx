'use client'

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { motion } from 'framer-motion'

/* Color palettes per index for gradient poster backgrounds */
const PALETTES = [
  { from: '#1a0505', via: '#3d0a0a', to: '#200505' },   // deep red
  { from: '#05101a', via: '#0a2a3d', to: '#050e20' },   // deep blue
  { from: '#1a0d00', via: '#3d2200', to: '#200e00' },   // deep amber
  { from: '#001a10', via: '#003d25', to: '#001a10' },   // deep green
  { from: '#12051a', via: '#2d0a3d', to: '#120520' },   // deep purple
  { from: '#1a0810', via: '#3d1525', to: '#1a0810' },   // deep rose
  { from: '#051a18', via: '#0a3d38', to: '#051a18' },   // deep teal
  { from: '#1a1005', via: '#3d2a0a', to: '#1a1005' },   // deep gold
]

const PlayIcon = () => (
  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5.14v13.72L19 12 8 5.14z" />
  </svg>
)

const StarIcon = () => (
  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

export default function ReelCard({ reel, index }) {
  const [hovered, setHovered] = useState(false)
  const palette = PALETTES[index % PALETTES.length]
  const accent = reel.accent || '#e50914'

  return (
    <motion.a
      href={reel.reelLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch ${reel.title} reel on Instagram`}
      initial={{ opacity: 0, y: 50, scale: 0.88, rotateY: 12 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.65,
        delay: (index % 6) * 0.09,
        ease: [0.25, 0.46, 0.45, 0.94],
        rotateY: { duration: 0.8, ease: 'easeOut' },
      }}
      whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.25 } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative block rounded-2xl overflow-hidden cursor-pointer group shimmer-hover"
      style={{ aspectRatio: '9 / 16', perspective: '800px' }}
    >
      {/* ── Background gradient ──────────────────────────────────── */}
      <div
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
        style={{
          background: `linear-gradient(160deg, ${palette.from} 0%, ${palette.via} 50%, ${palette.to} 100%)`,
        }}
      />

      {/* Thumbnail image */}
      {reel.thumbnail && (
        <img
          src={reel.thumbnail}
          alt={reel.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}

      {/* Decorative noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '150px',
        }}
      />

      {/* Film strip top */}
      <div className="absolute top-0 inset-x-0 h-7 flex items-center px-1.5 gap-1 opacity-15">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex-1 h-5 bg-white rounded-sm" />
        ))}
      </div>

      {/* Main overlay: dark vignette */}
      <div
        className="absolute inset-0 transition-opacity duration-400"
        style={{
          background: hovered
            ? 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 100%)'
            : 'linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.92) 100%)',
        }}
      />

      {/* Accent color top stripe */}
      <div
        className="absolute top-0 inset-x-0 h-0.5 transition-opacity duration-300"
        style={{ background: accent, opacity: hovered ? 0.9 : 0.5 }}
      />

      {/* ── Center: Play button ──────────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={hovered ? { scale: 1.15 } : { scale: 1 }}
          transition={{ duration: 0.25 }}
          className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: hovered
              ? accent
              : 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(6px)',
            boxShadow: hovered ? `0 0 30px ${accent}80, 0 0 60px ${accent}30` : 'none',
          }}
        >
          <PlayIcon />
        </motion.div>
      </div>

      {/* ── Bottom content ───────────────────────────────────────── */}
      <div className="absolute bottom-0 inset-x-0 p-3.5 pb-4">
        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <StarIcon />
          <span className="text-yellow-400 text-[11px] font-bold">{reel.rating}</span>
          {reel.year && (
            <>
              <span className="text-gray-600 text-[11px]">·</span>
              <span className="text-gray-400 text-[11px]">{reel.year}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-sm leading-snug line-clamp-2 pr-8">
          {reel.title}
        </h3>

        {/* Genre */}
        {reel.genre && (
          <p className="text-gray-500 text-[10px] mt-0.5 line-clamp-1">{reel.genre}</p>
        )}

        {/* Instagram icon — appears on hover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 6 }}
          animate={hovered ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.7, y: 6 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-3.5 right-3.5 text-white/70"
        >
          <InstagramIcon />
        </motion.div>
      </div>

      {/* Border glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-500"
        style={{
          boxShadow: hovered ? `inset 0 0 0 1px ${accent}60, 0 0 40px ${accent}20` : 'inset 0 0 0 1px rgba(255,255,255,0.05)',
        }}
      />
    </motion.a>
  )
}
