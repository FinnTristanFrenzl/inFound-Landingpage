// app/layout.tsx

import '../globals.css'
import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: "inFound.app",
  description: "Find Profitable Saas Ideas from Real Reddit Posts",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  
  const supabase = await createClient();
  
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }
  
  
  
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}