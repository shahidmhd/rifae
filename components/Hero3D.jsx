'use client'

import { useRef, Suspense, useEffect, useState, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars, Preload } from '@react-three/drei'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/* ─── Module-level mouse state (shared between React and Three.js) ─────────── */
const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }

/* ─── Poster configurations ──────────────────────────────────────────────── */
const POSTERS = [
  { pos: [-4.2, 1.0, -5],  rot: [0,  0.35,  0.04],  color: '#e50914', speed: 1.2, delay: 0 },
  { pos: [ 3.5,-0.8, -4],  rot: [0, -0.25, -0.03],  color: '#f5c518', speed: 1.5, delay: 0.4 },
  { pos: [-1.2, 2.8, -7],  rot: [0.04, 0.1,  0],    color: '#4a9eff', speed: 1.0, delay: 0.8 },
  { pos: [ 5.8, 1.2, -6],  rot: [0,  -0.4,  0.05],  color: '#9b59b6', speed: 1.8, delay: 0.2 },
  { pos: [-5.5,-1.5, -6],  rot: [0,   0.5, -0.05],  color: '#2ecc71', speed: 1.3, delay: 0.6 },
  { pos: [ 1.8,-2.2, -4],  rot: [0.03,-0.15, 0],    color: '#e67e22', speed: 1.6, delay: 1.0 },
  { pos: [ 4.0, 3.5, -9],  rot: [-0.05, 0.2, 0],    color: '#1abc9c', speed: 0.9, delay: 0.3 },
  { pos: [-3.0,-3.0, -7],  rot: [0.05, 0.3, 0.05],  color: '#e74c3c', speed: 1.4, delay: 0.7 },
  { pos: [ 0.5, 0.2,-10],  rot: [0,    0,   0],      color: '#3498db', speed: 1.1, delay: 0.5 },
  { pos: [-7.0, 0.5, -8],  rot: [0,   0.6, -0.06],  color: '#f39c12', speed: 1.0, delay: 0.9 },
]

/* ─── Floating movie poster ────────────────────────────────────────────────── */
function Poster({ pos, rot, color, speed, delay }) {
  const mesh = useRef()

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.elapsedTime + delay
    mesh.current.rotation.y = rot[1] + Math.sin(t * 0.28) * 0.06
    mesh.current.rotation.x = rot[0] + Math.cos(t * 0.18) * 0.025
  })

  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={0.9} position={pos}>
      <group ref={mesh} rotation={rot}>
        <mesh>
          <planeGeometry args={[1.35, 1.95]} />
          <meshStandardMaterial
            color={color} emissive={color} emissiveIntensity={0.55}
            roughness={0.1} metalness={0.85} transparent opacity={0.72}
          />
        </mesh>
        <mesh position={[0, 0, 0.003]}>
          <planeGeometry args={[1.15, 1.7]} />
          <meshBasicMaterial color={color} transparent opacity={0.12} />
        </mesh>
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[1.7, 2.35]} />
          <meshBasicMaterial color={color} transparent opacity={0.07} />
        </mesh>
      </group>
    </Float>
  )
}

/* ─── Camera rig with mouse parallax ──────────────────────────────────────── */
function CameraRig() {
  useFrame(({ camera, clock }) => {
    const t = clock.elapsedTime
    const baseDriftX = Math.sin(t * 0.12) * 0.3
    const baseDriftY = Math.cos(t * 0.09) * 0.15
    const targetX = baseDriftX + mouse.x * 1.4
    const targetY = baseDriftY + mouse.y * 0.8
    camera.position.x += (targetX - camera.position.x) * 0.04
    camera.position.y += (targetY - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return null
}

/* ─── Scene ─────────────────────────────────────────────────────────────── */
function Scene() {
  return (
    <>
      <CameraRig />
      <Stars radius={90} depth={65} count={2800} factor={3.5} saturation={0} fade speed={0.4} />
      <ambientLight intensity={0.18} />
      <pointLight position={[5, 5, 4]}  color="#e50914" intensity={4} />
      <pointLight position={[-5,-3, 2]} color="#4a9eff" intensity={3} />
      <pointLight position={[0,  3, 5]} color="#f5c518" intensity={2} />
      <pointLight position={[0,  0, 8]} color="#ffffff" intensity={0.5} />
      {POSTERS.map((p, i) => <Poster key={i} {...p} />)}
    </>
  )
}

/* ─── Typing roles animation ─────────────────────────────────────────────── */
const ROLES = [
  'Flutter Developer',
  'Photographer',
  'UI/UX Designer',
  'Cyber Security',
  'Digital Creator',
  'Traveler',
]

function TypingRole() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const full = ROLES[roleIdx]
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          if (text.length < full.length) {
            setText(full.slice(0, text.length + 1))
          } else {
            setTimeout(() => setDeleting(true), 1600)
          }
        } else {
          if (text.length > 0) {
            setText(text.slice(0, -1))
          } else {
            setDeleting(false)
            setRoleIdx((i) => (i + 1) % ROLES.length)
          }
        }
      },
      deleting ? 38 : 78
    )
    return () => clearTimeout(timeout)
  }, [text, deleting, roleIdx])

  return (
    <span className="text-red-400 font-medium">
      {text}
      <span className="inline-block w-0.5 h-[1em] bg-red-400 ml-0.5 align-middle animate-pulse" />
    </span>
  )
}

/* ─── Film strip decoration ──────────────────────────────────────────────── */
function FilmStrip({ side }) {
  const cls = side === 'left'
    ? 'left-0 top-0 bottom-0'
    : 'right-0 top-0 bottom-0'
  return (
    <div className={`absolute ${cls} w-7 opacity-[0.07] hidden lg:flex flex-col gap-1.5 py-4 px-1`}>
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className="w-full aspect-[3/4] bg-white rounded-[2px] flex-shrink-0" />
      ))}
    </div>
  )
}

/* ─── Hero text (scroll-driven parallax) ────────────────────────────────── */
function HeroContent() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const rawY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const rawOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0])
  const rawScale = useTransform(scrollYProgress, [0, 0.45], [1, 0.92])
  const y = useSpring(rawY, { stiffness: 80, damping: 20 })
  const opacity = useSpring(rawOpacity, { stiffness: 80, damping: 20 })
  const scale = useSpring(rawScale, { stiffness: 80, damping: 20 })
  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.16 } } }
  const item = {
    hidden:  { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] } },
  }

  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ y, opacity, scale }}
      className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center"
    >
      {/* "NOW PLAYING" badge */}
      <motion.div variants={item} className="mb-5">
        <span className="inline-flex items-center gap-2.5 px-4 py-1 rounded-sm glass-red"
          style={{ borderRadius: '2px', letterSpacing: '0.22em' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          <span className="text-red-300 text-[9px] font-bold uppercase">Now Playing</span>
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
        </span>
      </motion.div>

      {/* Name */}
      <motion.h1
        variants={item}
        className="leading-[0.9] mb-4"
        style={{
          fontFamily: 'var(--font-cinzel), Cinzel, serif',
          fontSize: 'clamp(2.8rem, 9vw, 6rem)',
          fontWeight: 900,
        }}
      >
        <span className="text-white block tracking-tight">muhammed</span>
        <span
          className="block"
          style={{
            background: 'linear-gradient(135deg, #e50914 0%, #ff6b35 45%, #f5c518 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 30px rgba(229,9,20,0.4))',
          }}
        >
          rifaee
        </span>
      </motion.h1>

      {/* Typing role */}
      <motion.p
        variants={item}
        className="text-gray-500 text-sm md:text-base mb-6 min-h-[1.5rem]"
      >
        <TypingRole />
      </motion.p>

      {/* Mini stats row */}
      <motion.div
        variants={item}
        className="flex items-center gap-6 md:gap-8 mb-8 text-center"
      >
        {[
          { value: '139', label: 'Posts' },
          { value: '9K', label: 'Followers' },
          { value: '4.5K', label: 'Following' },
        ].map(({ value, label }, i) => (
          <div key={label} className="flex items-center gap-6 md:gap-8">
            {i > 0 && <div className="w-px h-6 bg-white/10" />}
            <div>
              <div className="text-white font-bold text-lg leading-none">{value}</div>
              <div className="text-gray-600 text-[9px] uppercase tracking-[0.18em] mt-0.5">{label}</div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* CTA buttons */}
      <motion.div variants={item} className="flex items-center gap-3 flex-wrap justify-center mb-8">
        <a
          href="#reels"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-semibold tracking-wide hover:from-red-500 hover:to-orange-500 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/30 hover:-translate-y-0.5"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5.14v13.72L19 12 8 5.14z" />
          </svg>
          Watch Reels
        </a>
        <a
          href="https://www.instagram.com/muhammed__rifaee/"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-gray-300 text-xs font-medium hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          Instagram
        </a>
        <a
          href="https://muhammad-rifaee-github-io.vercel.app"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-gray-300 text-xs font-medium hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Portfolio
        </a>
      </motion.div>

      {/* Cinema ticket */}
      <motion.div variants={item}>
        <div
          className="inline-flex items-center gap-3 px-4 py-2 rounded-sm opacity-50 hover:opacity-80 transition-opacity duration-300"
          style={{
            background: 'repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(229,9,20,0.08) 6px, rgba(229,9,20,0.08) 7px)',
            border: '1px solid rgba(229,9,20,0.2)',
          }}
        >
          <span className="text-red-500 text-[9px]">🎟</span>
          <span className="text-gray-500 text-[9px] uppercase tracking-[0.25em]">ADMIT ONE</span>
          <div className="w-px h-3 bg-gray-700" />
          <span className="text-gray-600 text-[9px] tracking-wider">muhammed__rifaee</span>
          <div className="w-px h-3 bg-gray-700" />
          <span className="text-gray-700 text-[9px]">2024</span>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        variants={item}
        className="absolute bottom-8 flex flex-col items-center gap-2.5"
      >
        <span className="text-gray-700 text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-gray-700/50 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-gray-600" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Main export ─────────────────────────────────────────────────────────── */
export default function Hero3D() {
  const [mounted, setMounted] = useState(false)
  const [spot, setSpot] = useState({ x: 50, y: 50 })
  const [active, setActive] = useState(true)

  useEffect(() => setMounted(true), [])

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 2
    mouse.x = x
    mouse.y = y
    setSpot({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
    setActive(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    mouse.x = 0
    mouse.y = 0
    setActive(false)
  }, [])

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-[#0a0a0f]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D canvas */}
      <div className="absolute inset-0">
        {mounted && (
          <Canvas
            camera={{ position: [0, 0, 7], fov: 52 }}
            gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
            dpr={[1, 1.5]}
          >
            <color attach="background" args={['#0a0a0f']} />
            <fog attach="fog" args={['#0a0a0f', 10, 22]} />
            <Suspense fallback={null}>
              <Scene />
              <Preload all />
            </Suspense>
          </Canvas>
        )}
      </div>

      {/* Cursor spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(500px circle at ${spot.x}% ${spot.y}%, rgba(229,9,20,0.055), transparent 60%)`,
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 85% 75% at 50% 50%, transparent 25%, rgba(10,10,15,0.65) 100%)' }}
      />
      <div className="absolute inset-x-0 bottom-0 h-48 pointer-events-none bg-gradient-to-t from-[#0a0a0f] to-transparent" />
      <div className="absolute inset-y-0 left-0 w-28 pointer-events-none bg-gradient-to-r from-[#0a0a0f] to-transparent" />
      <div className="absolute inset-y-0 right-0 w-28 pointer-events-none bg-gradient-to-l from-[#0a0a0f] to-transparent" />

      {/* Film strip decorations */}
      <FilmStrip side="left" />
      <FilmStrip side="right" />

      {/* Content */}
      <HeroContent />
    </section>
  )
}
