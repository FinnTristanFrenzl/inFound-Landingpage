"use client"

import React, { useState } from 'react'
import { RiAccountCircleFill } from 'react-icons/ri'
import Image from 'next/image'
import LogoutButton from './LogOutButton'
import Link from 'next/link'
import { User } from '@supabase/supabase-js'

const ProfileIconSM = ({user, rankStyle, pb, inbox, requests, rankType}: {user?: User, rankStyle: string, pb: string, inbox: number, requests: number, rankType: string}) => {

    const [show, setShow] = useState<boolean>(false)

  return (
    <div className='relative flex flex-col items-center'>
        <button onClick={() => setShow(!show)} className='flex font-bold items-center pl-4 gap-3 text-white max-h-10 relative hover:opacity-80 active:opacity-60 transition-all duration-150'>
            <p className={rankStyle}>{user?.user_metadata.user_name || user?.user_metadata.display_name || user?.user_metadata.name}</p>
            {!pb
                ? <RiAccountCircleFill className='h-10 w-10' color='white'/>
                : <Image src={pb} height={40} width={40} alt='/' className='rounded-4xl max-h-10' />}
            {inbox + requests > 0 && (
                <div className='h-5 w-5 flex justify-center items-center rounded-full text-sm bg-red-500 absolute bottom-0 right-0 text-white'>
                {inbox + requests}
                </div>
            )}
        </button>
        
        <div onMouseLeave={() => setShow(false)} style={{visibility: show ? 'visible' : 'hidden'}} className='text-white min-w-44 z-1500 w-full py-6 rounded-2xl bg-[rgb(28,38,56)] absolute top-12 shadow-lg shadow-black'>
            <ul className='flex flex-col gap-4 font-bold text-white'>
                <Link href={'/'}><li className='px-6 hover:bg-[rgb(39,52,76)] py-2'>Home</li></Link>
                <Link href={'/dashboard'}><li className='px-6 hover:bg-[rgb(39,52,76)] py-2'>Dashboard</li></Link>
                <Link href={'/profile'}><li className='px-6 hover:bg-[rgb(39,52,76)] py-2'>Profile</li></Link>
                <Link href={'/profile/inbox'}>
                    <li className='px-6 hover:bg-[rgb(39,52,76)] py-2 flex items-center gap-3'>
                        Inbox {inbox > 0
                        ?   <div className='h-5 w-5 flex justify-center items-center rounded-full text-sm bg-red-500 text-white'>
                                {inbox}
                            </div>
                        : null}
                    </li>
                </Link>
                <Link href={'/profile/requests'}>
                    <li className='px-6 hover:bg-[rgb(39,52,76)] py-2 flex items-center gap-3'>
                        My requests {requests > 0
                        ?   <div className='h-5 w-5 flex justify-center items-center rounded-full text-sm bg-red-500 text-white'>
                                {requests}
                            </div>
                        : null}
                    </li>
                </Link>
                <Link href={'/pricing'}><li className='px-6 hover:bg-[rgb(39,52,76)] py-2'>{rankType ? 'Upgrade' : 'Pricing'}</li></Link>
                <li className='w-full'><LogoutButton style='px-6 hover:bg-[rgb(39,52,76)] py-2 w-full flex justify-start'/></li>
            </ul>
        </div>
    </div>
  )
}

export default ProfileIconSM