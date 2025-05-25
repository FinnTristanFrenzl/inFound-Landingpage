"use client"

import React, { FormEvent, useState } from 'react'
import { PlusSquare } from "@deemlol/next-icons";
import { supabase } from '@/supabaseClient/supabase';
import { Check } from "@deemlol/next-icons";


type suggestion = {
    title: string,
    description: string
}

const SuggestFeature = () => {

    const [isClicked, setIsClicked] = useState(false)
    const [isOver, setIsOver] = useState(false)
    const [formdata, setFormdata] = useState<suggestion>({title: '', description: ''})
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handlesubmit = async (e: FormEvent) => {
        e.preventDefault()
        const {error} = await supabase.from('landing_suggested_features').insert({title: formdata.title, description: formdata.description})

        if(error) {
            throw new Error('Error submitting')
        }
        setFormdata({title: '', description: ''})
        setIsSubmitted(true)
        setTimeout(() => {
            setIsSubmitted(false)
        }, 2000);
    }

  return (
    <div onMouseEnter={() => setIsOver(true)} onMouseLeave={() => setIsOver(false)} className={!isClicked 
        ? 'border-white text-center bg-[#0e1725] border-4 flex-1 px-6 py-10 sm:px-8 sm:py-12 md:px-10 md:py-16 rounded-2xl flex flex-col gap-4 hover:border-[#0e1725] hover:bg-white hover:text-[#0e1725] transition-all duration-200 text-white'
        : 'border-white text-center bg-[#0e1725] border-4 flex-1 px-6 py-10 sm:px-8 sm:py-12 md:px-10 md:py-16 rounded-2xl flex flex-col gap-4 transition-all duration-200 text-white'}>
        {!isClicked ? <div onClick={() => setIsClicked(!isClicked)} className='flex flex-col gap-12 items-center justify-center size-full'>
            <h1 className='mb-3 text-2xl sm:text-3xl font-bold underline'>Or suggest your own feature!</h1>
            <PlusSquare size={100} color={isOver ? '#0e1725' : 'white'} />
        </div> : 
        !isSubmitted
        ? <form onSubmit={(e) => handlesubmit(e)} className='size-full flex flex-col gap-4'>
            <input required value={formdata.title} onChange={(e) => setFormdata({...formdata, title: e.target.value})} id='title' maxLength={30} className='bg-[#0e1725] border-white border-3 text-white rounded-2xl py-3 px-3 text-lg font-bold w-full outline-none' type="text" placeholder='Add title...'/>
            <textarea required value={formdata.description} onChange={(e) => setFormdata({...formdata, description: e.target.value})} maxLength={300} className='bg-[#0e1725] border-white border-3 text-white rounded-2xl py-3 px-3 text-lg font-bold w-full h-full outline-none' name="desc" id="desc" placeholder='Add description...' style={{resize: 'none'}}></textarea>
            <button type='submit' className='bg-white shadow-lg hover:opacity-80 text-black font-bold py-2 px-4 w-full sm:w-[60%] md:w-[40%] rounded-2xl active:opacity-60 transition-all duration-200'>
                Submit!
            </button>
        </form>
        : 
        <div className='flex flex-col gap-12 items-center justify-center size-full'>
            <h1 className='mb-3 text-2xl sm:text-3xl font-bold underline'>Thank you!</h1>
            <Check size={48} color="#FFFFFF" />
        </div>}
    </div>
  )
}

export default SuggestFeature