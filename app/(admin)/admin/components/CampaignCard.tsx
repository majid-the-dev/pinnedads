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
    <Link href={`/admin/${data.id}`} className="w-full flex flex-col gap-3 border border-black rounded-md px-3 py-2">
    <h1 className="font-semibold text-xl">{data?.follower} followers</h1>
    <p>@{data?.link.slice(0,15)}</p>
    <p className={`${classname}`}>{data.status}</p> 
  </Link>
  );
};

export default CampaignCard;
