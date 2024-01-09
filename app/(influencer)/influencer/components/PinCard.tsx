"use client";

import { Pin } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GoPin } from "react-icons/go";

interface PinCardProps {
  data: Pin;
}

const PinCard: React.FC<PinCardProps> = ({ data }) => {
    
  const [isMounted, setIsMounted] = useState(false);
  const link = data?.link.slice(0, 25)

  useEffect(() => {
    setIsMounted(true);
  }, [data]);

  if (!isMounted) {
    return null;
  }

  return (
    <Link href={`/influencer/campaign/${data.id}`} className="w-full flex items-center justify-between border border-black rounded-md px-3 py-2">
      <div className="flex flex-col px-2 py-1">
      <h1 className="text-xs">{link}</h1>
      <p className=" text-xs">Approved:{data?.status === "accepted" ? 'True' : 'False'}</p>
      </div>
      <button className="bg-black rounded-lg p-2 text-white"><GoPin/></button>
    </Link>
  );
};

export default PinCard;
