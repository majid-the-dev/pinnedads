"use client";

import { Campaign, Influencer, Pin } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GoPin } from "react-icons/go";
import getCurrentInfluencer from '@/actions/get-current-influencer';
import { SafeInfluencer } from "@/types";

interface CampaignCardProps {
  data: Campaign;
  influencer: SafeInfluencer | null;
  pin: Pin[]
}

const CampaignCard: React.FC<CampaignCardProps> = ({ data, influencer, pin }) => {
    
  const [isMounted, setIsMounted] = useState(false);
  const [isTarget, setIsTarget] = useState(false);
  const isPresent = pin.some(link => link.instagram === influencer?.instagram);
  const target = pin.find(link => link.instagram === influencer?.instagram);

  useEffect(() => {
    setIsMounted(true);
  }, [data]);

  if (!isMounted) {
    return null;
  }

  function timeAgoLessThanDay(date: Date ): boolean {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
    // Define the time intervals in seconds
    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'day', seconds: 86400 },
    ];
  
    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count < 1) {
        return interval.label === 'day' && count < 1; // Return true if less than a day
      }
    }
  
    return false; // Default return value
  }
  
  function displayPinnedAtTime(pinnedAt: Date): JSX.Element | null {
    if (timeAgoLessThanDay(pinnedAt)) {
      return <p className="text-xs">Pinned today</p>;
    }
    return null;
  }
  

  return (
    <Link href={`/influencer/campaign/${data.id}`} className="w-full flex items-center justify-between border border-black rounded-md px-3 py-2">
      <div className="flex flex-col px-2 py-1">
      <h1 className="font-semibold text-xl">{data?.name}</h1>
      <p className=" text-xs">@{data?.instagram}</p>
      {isPresent? <p className="text-xs text-blue-400">pinned</p>: null}
      </div>
      <button className="bg-black rounded-lg p-2 text-white"><GoPin/></button>
    </Link>
  );
};

export default CampaignCard;
