// app/layout.tsx

import '../globals.css'
import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "inFound.app",
  description: "Find Profitable Saas Ideas from Real Reddit Posts",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Analytics />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
