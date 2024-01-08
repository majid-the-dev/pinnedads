"use client";

import { Influencer } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CopySet from "./Copy";

interface UserCardProps {
  influencer: Influencer;
  classname: string;
}

const UserCard: React.FC<UserCardProps> = ({ influencer, classname }) => {
    
  const [isMounted, setIsMounted] = useState(false);
  

  useEffect(() => {
    setIsMounted(true);
  }, [influencer]);

  if (!isMounted) {
    return null;
  }

  return (
    <Link href={`/admin/influencer/${influencer.id}`} className="w-full flex flex-col gap-3 border border-black rounded-md px-3 py-2">
    <h1 className="font-semibold text-xl">{influencer.fname} {influencer.lname}</h1>
    <p>@{influencer.instagram}</p>
    <div className='w-full text-sm flex items-center justify-between'>
        <Link
          href={influencer.link? influencer.link: ''}
          className='text-sm text-blue-500'
          target={"_blank"}
        >
        {influencer.link? influencer?.link.slice(0,50): ''}</Link> 
        <CopySet data={influencer.link}/></div>
  </Link>
  );
};

export default UserCard;
