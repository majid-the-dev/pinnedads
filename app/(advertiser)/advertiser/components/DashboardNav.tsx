"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiUser } from "react-icons/ci";
import React, { useCallback, useState } from "react";
import useCampaignModal from "@/hooks/useCampaignModal";

export function DashNav() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const campaignModal = useCampaignModal();


    function onCampaign() {
        campaignModal.onOpen();
    }


    return(
        <nav className="w-full px-14 py-6 flex items-center justify-between border border-black">
        <Link href='/'>
        PINNED ADS
        </Link>
        <div className="flex items-center justify-start gap-7">
            <div onClick={onCampaign} className="cursor-pointer text-xs py-1 px-3 rounded-lg border border-black">ADD CAMPAIGN +</div>
            <CiUser className="w-7 h-7 border border-black rounded-full p-1"/>
        </div>
        </nav>
    )
};