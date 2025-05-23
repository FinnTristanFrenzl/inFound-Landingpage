import React from 'react';
import ProgressBar from './ProgressBar';
import { UUID } from 'crypto';

const FeatureCard = ({title, description, goal, current, feature_id}: {title: string, description: string, goal: number, current: number, feature_id: UUID}) => {

  return (
    <form action={`/checkout?id=${feature_id}`} method='GET' className='border-white text-center bg-[#0e1725] border-4 flex-1 px-6 py-10 sm:px-8 sm:py-12 md:px-10 md:py-16 rounded-2xl flex flex-col gap-4 hover:border-[#0e1725] hover:bg-white hover:text-[#0e1725] transition-all duration-200 text-white'>
        <h1 className='mb-3 text-2xl sm:text-3xl font-bold underline'>{title}</h1>
        <p className='text-sm sm:text-base font-medium'>
            {description}
        </p>

        <ProgressBar current={current} goal={goal} />

        <button type='submit' className='bg-white shadow-lg shadow-[#0e1725]/40 text-black font-bold py-2 px-4 w-full sm:w-[60%] md:w-[40%] rounded-2xl hover:bg-[#063d75] hover:text-white active:opacity-80 transition-all duration-150'>
            Fund it!
        </button>
    </form>
  );
};

export default FeatureCard;
