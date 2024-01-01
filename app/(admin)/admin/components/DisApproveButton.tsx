"use client"

import React, { useState } from 'react'
import { Campaign, Pin } from "@prisma/client";
import { useRouter } from 'next/navigation';

interface CampaignCardProps {
    data: Pin;
    campaign: Campaign;
    onClick: ()=>void;
  }

const DisButton: React.FC<CampaignCardProps> = ({ data, campaign, onClick })  => {

  const router = useRouter();

  return (
    <div>
    <button className='bg-red-400 px-2 py-1 border border-black rounded-md text-xs' onClick={onClick}>Disapprove</button>
    </div>

  )
}

export default DisButton