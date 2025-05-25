import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Award } from "@deemlol/next-icons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "inFound.app",
  description: "Find Profitable Saas Ideas from Real Reddit Posts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          {/* Navbar */}
        <div className='bg-[#0e1725] w-full h-16 flex items-center justify-between px-4 lg:px-40'>
          <h1 className='text-xl lg:text-2xl font-bold text-white'>
            <span className='text-[#4a7ece] underline'>in</span>Found
          </h1>
          <div className="text-white font-bold flex">
              <Award size={24} color="#FFFFFF" /> Fund A Feature is here! 
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
