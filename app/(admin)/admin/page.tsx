
import { DashNav } from './components/DashboardNav'
import Link from 'next/link';
import Support from './components/Support';
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import Logout from './components/Logout';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { signIn, useSession } from 'next-auth/react'
import usSession from '@/hooks/useSession';
import PinHome from './components/PinHome';

const page = ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {

    const page = typeof searchParams.p === 'string' ? searchParams.p : 'dashboard' ;
    
  return (
    <div className='flex flex-col items-center justify-start w-full h-[100vh]'>
    <DashNav/>
    <div className='w-full h-full grid grid-cols-8 items-start'>
        <div className='h-full col-span-2 flex flex-col items-start justify-between border border-black'>
            <ul className='h-full flex flex-col items-start justify-start w-full'>
                <Link href={`/advertiser?p=dashboard`} scroll={false} className='border-b border-black pl-14 w-full py-4'>DASHBOARD</Link>
                <Link href={`/advertiser?p=campaigns`} scroll={false} className='border-b border-black pl-14 w-full py-4'>CAMPAIGNS</Link>
                <Link href={`/advertiser?p=settings`} scroll={false} className='border-b border-black pl-14 w-full py-4'>ACCOUNT SETTINGS</Link>
                <Link href={`/advertiser?p=topup`} scroll={false} className='border-b border-black pl-14 w-full py-4'>TOPUP ACCOUNT</Link>
                <Link href={`/advertiser?p=support`} scroll={false} className='border-b border-black pl-14 w-full py-4'>SUPPORT</Link>
            </ul>
            <Logout/>
        </div>
        <div className='col-span-6 h-full'>
            {page === 'dashboard' && <PinHome/>}
            {page === 'support' && <Support/>}
        </div>
    </div>
    </div>
  )

   
}

export default page