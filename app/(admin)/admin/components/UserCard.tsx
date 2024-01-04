"use client";

import { Influencer } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface UserCardProps {
  data: Influencer;
  classname: string;
}

const UserCard: React.FC<UserCardProps> = ({ data, classname }) => {
    
  const [isMounted, setIsMounted] = useState(false);
  

  useEffect(() => {
    setIsMounted(true);
  }, [data]);

  if (!isMounted) {
    return null;
  }

  return (
    <Link href={`/admin/influencer/${data.id}`} className="w-full flex flex-col gap-3 border border-black rounded-md px-3 py-2">
    <h1 className="font-semibold text-xl">{data.fname} {data.lname}</h1>
    <p>@{data.instagram}</p>
    <p className={``}>{data.instaVerified == true ? "Verified" : "Not Verified"}</p> 
  </Link>
  );
};

export default UserCard;
