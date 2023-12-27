"use client"

import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import { Admin } from "@prisma/client";
import { useRouter } from 'next/navigation';

interface CampaignCardProps {
    data: Admin;
  }

const DisButton: React.FC<CampaignCardProps> = ({ data })  => {

  const router = useRouter();
  const dat = {
    approved: false
    }

    const onSubmit = async () => {
        try {
          await axios.patch(`/api/admin/${data.id}`, dat);
          router.refresh();
          router.push(`/super`);
          toast.success("Disapproved");
        } catch (error: any) {
          toast.error(`Something went wrong. ${error}`);
        } finally {
        }
      };

  return (
    <button className='bg-red-400 px-2 py-1 border border-black rounded-md text-xs' onClick={onSubmit}>Disapprove</button>
  )
}

export default DisButton