"use client";

import { Campaign } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface CampaignCardProps {
  data: Campaign;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ data }) => {
    
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [data]);

  if (!isMounted) {
    return null;
  }

  return (
    <Link href={`/advertiser/campaigns/${data.id}`} className="w-full flex flex-col gap-3 border border-black rounded-md px-3 py-2">
      <h1 className="font-semibold text-xl">{data?.name}</h1>
      <p>@{data?.instagram}</p>
      <div className="w-full border border-black rounded-md px-2 py-1">
        <p className="w-full text-center text-xs">
          {data?.pinned} out of {data?.pins} pinned
        </p>
      </div>
    </Link>
  );
};

export default CampaignCard;
