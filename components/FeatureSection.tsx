"use client"

import React, { useEffect, useState } from 'react'
import SuggestFeature from './SuggestFeature'
import { supabase } from '@/supabaseClient/supabase'
import FeatureCard from './FeatureCard'


type Feature = {
    id: string,
    goal: number,
    current: number,
    title: string,
    description: string
}

const FeatureSection = () => {

    const [features, setFeatures] = useState<Feature[]>([])
    
    const fetchFeatrues = async () => {
        const {data, error} = await supabase.from('landing_features').select('*')
        if (error) return
        setFeatures(data as Feature[])
    }

    useEffect(() => {
        fetchFeatrues()
    }, [])
    
  return (
    <div className='mt-6 mb-12 w-full px-4 sm:px-0 flex flex-col md:flex-row flex-wrap justify-center gap-6'>
  {features && features.map((feature) => {
    return <FeatureCard key={feature.id} goal={feature.goal / 100} current={feature.current / 100} title={feature.title} description={feature.description} feature_id={feature.id}/>
  })}
  <SuggestFeature />
</div>
  )
}

export default FeatureSection