"use client"

import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Influencer } from "@prisma/client";
import { useRouter } from 'next/navigation';

interface ButtonProps {
    influencer: Influencer;
  }

const Button: React.FC<ButtonProps> = ({ influencer }) => {

  const router = useRouter();
  const [data, setData] = useState({followers: 500, status: "accepted"});
  const rej = {
    followers: 500,
    status: "rejected"
    }
  

    const onReject = async () => {
        try {
          await axios.patch(`/api/admin/influencer/${influencer.id}`, rej);
          router.refresh();
          router.push(`/admin`);
          toast.success("Rejected");
        } catch (error: any) {
          toast.error(`Something went wrong. ${error}`);
        } finally {
        }
      };

  const onSubmit = async () => {
    try {
      await axios.patch(`/api/admin/influencer/${influencer.id}`, data);
      router.refresh();
      router.push(`/admin`);
      toast.success("Approved");
    } catch (error: any) {
      toast.error(`Something went wrong. ${error}`);
    } finally {
    }
  };
  
  return (
    <form onSubmit={onSubmit} className="w-full lg:w-[50%] flex flex-col items-center justify-start gap-8">
    <input
    value={data.followers} 
    onChange={(e) => setData({...data,[e.target.name]:e.target.value})}
    name="followers"
    type="number"
    required
      className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
      placeholder="Followers"
    />
      <div className='flex items-center justify-center gap-3'>
      <button type="button" className='w-full bg-red-400 px-4 py-1 leading-[30px] rounded-lg text-xs text-white' onClick={onReject}>Reject</button>
      <button type='submit' className='w-full bg-green-400
       text-white text-xs leading-[30px] rounded-lg px-4 py-1'>Approve</button>
      </div>
    </form>
  )
}

export default Button