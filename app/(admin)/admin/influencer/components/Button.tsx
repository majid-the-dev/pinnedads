"use client"

import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Influencer } from "@prisma/client";
import { useRouter } from 'next/navigation';

interface AppButtonProps {
    data: Influencer;
  }

const AppButton: React.FC<AppButtonProps> = ({ data })  => {

  const router = useRouter();
  

    const onSubmit = async () => {
        try {
          await axios.patch(`/api/influencer/${data.id}`);
          router.refresh();
          router.push(`/admin`);
          toast.success("Approved");
        } catch (error: any) {
          toast.error(`Something went wrong. ${error}`);
        } finally {
        }
      };

  return (
      <button className='bg-green-400 px-2 py-1 border border-black rounded-md text-xs text-white' onClick={onSubmit}>Approve</button>
    )
}

export default AppButton