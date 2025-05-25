"use client"

import React, { Suspense } from 'react'
import { Heart } from "@deemlol/next-icons";
import { AlertTriangle } from "@deemlol/next-icons";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const Page = () => {

  return (
    <Suspense fallback={<div className='text-white'>Loading...</div>}>
      <PageContent />
    </Suspense>
  )
}

const PageContent = () => {

  const searchParams = useSearchParams()
  const status = searchParams.get('status')

  return (
    <div className='bg-[#0a0c0e] w-full h-[100vh] flex flex-row justify-center items-center'>
      {status === 'open'
      ? <div className='bg-[#0e1725] text-white border-4 border-red-400 rounded-2xl py-22 px-28 flex flex-col items-center justify-between'>
        <AlertTriangle size={56} color="white" />
        <h1 className='text-4xl font-bold mt-12'>Something went wrong!</h1>
        <Link className='mt-4 text-blue-400' href="/">Return to Homepage</Link>
      </div>
      : <div className='bg-[#0e1725] text-white border-4 border-emerald-700 rounded-2xl py-22 px-28 flex flex-col items-center justify-between'>
        <Heart size={56} color="white"/>
        <h1 className='text-4xl font-bold mt-12'>Thank you for helping us!</h1>
        <Link className='mt-4 text-blue-400' href='/' >Return to Homepage</Link>
      </div>}
    </div>
  )
}

export default Page