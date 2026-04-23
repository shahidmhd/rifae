import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import ProfileSection from '@/components/ProfileSection'
import ReelGrid from '@/components/ReelGrid'
import ServicesSection from '@/components/ServicesSection'
import ContactSection from '@/components/ContactSection'
import reelsData from '@/data/reels.json'

/* Client-only components */
const Hero3D = dynamic(() => import('@/components/Hero3D'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full bg-[#0a0a0f] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-red-600 border-t-transparent animate-spin" />
        <p className="text-gray-600 text-xs uppercase tracking-widest">Loading scene…</p>
      </div>
    </div>
  ),
})

const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), { ssr: false })
const BackToTop      = dynamic(() => import('@/components/BackToTop'),      { ssr: false })

/* Section divider */
function Divider() {
  return (
    <div className="max-w-5xl mx-auto px-5">
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
    </div>
  )
}

export default function Home() {
  return (
    <main className="bg-[#0a0a0f] min-h-screen">
      <ScrollProgress />
      <Navbar />
      <Hero3D />
      <ProfileSection />
      <ReelGrid reels={reelsData} />
      <Divider />
      <ServicesSection />
      <Divider />
      <ContactSection />
      <BackToTop />

      {/* Footer */}
      <footer className="mt-20 py-10 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center text-xs">
              🎬
            </div>
            <span
              className="text-gray-500 text-sm"
              style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
            >
              muhammed__rifaee
            </span>
          </div>
          <p className="text-gray-700 text-xs text-center">
            © {new Date().getFullYear()} · Movie Review Reels · All rights reserved
          </p>
          <a
            href="https://www.instagram.com/muhammed__rifaee/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-red-400 transition-colors duration-200 text-xs uppercase tracking-widest"
          >
            Instagram ↗
          </a>
        </div>
      </footer>
    </main>
  )
}
