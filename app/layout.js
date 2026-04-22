import { Inter, Cinzel } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const cinzel = Cinzel({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzel',
  weight: ['400', '600', '700', '900'],
})

export const metadata = {
  title: 'muhammed__rifaee | Movie Review Reels',
  description: 'Cinematic movie reviews in 60 seconds. Every story worth watching.',
  keywords: ['movie reviews', 'reels', 'cinema', 'film', 'instagram'],
  openGraph: {
    title: 'muhammed__rifaee | Movie Review Reels',
    description: 'Cinematic movie reviews in 60 seconds.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
      <body className={`${inter.className} bg-[#0a0a0f] text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}
