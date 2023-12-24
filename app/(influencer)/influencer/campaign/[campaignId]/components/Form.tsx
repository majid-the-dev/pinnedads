'use client';

import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Influencer } from '@prisma/client';
import { SafeInfluencer } from '@/types';
import { useRouter } from 'next/navigation';

interface FormProps {
  campaignId?: string;
  influencer: SafeInfluencer
}

const Form: React.FC<FormProps> = ({ campaignId, influencer })=> {

    const [data, setData] = useState({link: ""});
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const influencerId = influencer.id

  

    const reviewPin = async (e: { preventDefault: () => void; }) => {
      e.preventDefault()
      setIsLoading(true)
      try {
          // Call your POST function with form data
          await axios.post(`/api/link/${campaignId}/${influencerId}`, data);
          toast.success("Link is under review");
          setData({link: ""})
        } catch (error) {
          console.error('Error pinning link:', error);
          toast.error(`Something went wrong.${error}`);
        }
         router.push('/influencer')
        setIsLoading(false)
   }

  return (
    <form onSubmit={reviewPin} className="w-full lg:w-[50%] flex flex-col items-center justify-start gap-8">
    <input
    value={data.link} 
    onChange={(e) => setData({...data,[e.target.name]:e.target.value})}
    name="link"
    type="link"
    required
      className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
      placeholder="Link to Pin"
    />
      <div className=''>
      <button type='submit' className='w-full bg-black
       text-white text-xs leading-[30px] rounded-lg px-4 py-1'>Submit link</button>
      </div>
    </form>
  )
}

export default Form