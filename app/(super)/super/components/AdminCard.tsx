"use client";

import { Admin, Pin } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface AdminCardProps {
  data: Admin;
}

const AdminCard: React.FC<AdminCardProps> = ({ data }) => {
    
  const [isMounted, setIsMounted] = useState(false);
  

  useEffect(() => {
    setIsMounted(true);
  }, [data]);

  if (!isMounted) {
    return null;
  }

  return (
    <Link href={`/super/${data.id}`} className="w-full flex flex-col gap-3 border border-black rounded-md px-3 py-2">
      <h1 className="font-semibold text-xl">{data?.fname} {data?.lname}</h1>
      <p>{data.admin === true ? "Approved" : "Not Approved"}</p> 
    </Link>
  );
};

export default AdminCard;
