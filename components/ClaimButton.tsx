"use client"

import React from 'react'
import { Lock } from "@deemlol/next-icons";
import { Unlock } from "@deemlol/next-icons";
import claim from '@/app/utils/claim';

const ClaimButton = ({type, post_id}: {type: 'public' | 'private', post_id: string}) => {
  return (
    <>
        {type === 'public'
        ? (<button onClick={() => claim('public', post_id)} id='public' className='font-bold py-4 bg-[rgb(28,38,56)] px-4 rounded-lg text-white flex gap-2 items-center hover:opacity-80 transition-all duration-150'>
            <Unlock size={24} color="#ffffff" /> Claim Publicly
          </button>)
        : (<button onClick={() => claim('private', post_id)} id='private' className='font-bold py-4 bg-[rgb(28,38,56)] px-4 rounded-lg text-white flex gap-2 items-center hover:opacity-80 transition-all duration-150'>
            <Lock size={24} color="#ffffff" /> Claim Privately
          </button>)}
    </>
  )
}

export default ClaimButton