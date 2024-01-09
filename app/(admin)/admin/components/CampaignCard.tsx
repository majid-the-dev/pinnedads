"use client";

import { Pin } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface CampaignCardProps {
  data: Pin;
  classname: string;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ data, classname}) => {
    
  const [isMounted, setIsMounted] = useState(false);
  const date = data.pinnedAt

  function timeAgo(date: Date): string {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
    // Define the time intervals in seconds
    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
    ];
  
    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
      }
    }
  
    return 'just now';
  }
  

  useEffect(() => {
    setIsMounted(true);
  }, [data]);

  if (!isMounted) {
    return null;
  }

  if(data.status === "declined"){
    return null
  }

  return (
    <Link href={`/admin/${data.id}`} className="w-full flex flex-col gap-3 border border-black rounded-md px-3 py-2 text-sm">
    <h1 className="font-semibold text-xl">@{data.instagram}</h1>
    <p>{data?.follower} followers</p>
    <p>{data?.link.slice(0,15)}</p>
    <p>{timeAgo(date)}</p>
    <p className={`${classname}`}>{data.status}</p> 
  </Link>
  );
};

export default CampaignCard;
