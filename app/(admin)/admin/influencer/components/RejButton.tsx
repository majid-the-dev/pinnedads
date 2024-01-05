"use client"

import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Influencer } from "@prisma/client";
import { useRouter } from 'next/navigation';

interface RejButtonProps {
    influencer: Influencer;
  }

const RejButton: React.FC<RejButtonProps> = ({ influencer })  => {

  const router = useRouter();
  const data = {
    followers: 500,
    status: "rejected"
    }
  

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
      <button className='bg-red-400 px-2 py-1 border border-black rounded-md text-xs text-white' onClick={onSubmit}>Approve</button>
    )
}

export default RejButton