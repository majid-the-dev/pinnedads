
import { DashNav } from './components/DashboardNav'
import DashBoard from './components/DashBoard';
import Link from 'next/link';
import Settings from './components/Settings';
import Topup from './components/Topup';
import Support from './components/Support';
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import Logout from './components/Logout';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { signIn, useSession } from 'next-auth/react'
import usSession from '@/hooks/useSession';
import Campaigns from './components/Campaigns';

const page = async({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {

    const session = await getServerSession(authOptions)
    const page = typeof searchParams.p === 'string' ? searchParams.p : 'dashboard' ;

    if(!session){
        return(
          <div className='flex flex-col items-center justify-center gap-4 h-screen'>
            <h1>Sign In to Access page</h1>
            <Link href={'/advertiser-login'} className='bg-black text-white rounded-md px-4 py-1'>Sign In</Link>
          </div>
        )
      }
    
  return (
    <div className='flex flex-col items-center justify-start w-full h-[100vh]'>
    <DashNav/>
    <div className='w-full h-full grid grid-cols-8 items-start'>
        <div className='h-full col-span-2 flex flex-col items-start justify-between border border-black'>
            <ul className='h-full flex flex-col items-start justify-start w-full'>
                <Link href={`/advertiser?p=dashboard`} scroll={false} className='border-b border-black pl-14 w-full py-4'>ADVERTISER DASHBOARD</Link>
                <Link href={`/advertiser?p=campaigns`} scroll={false} className='border-b border-black pl-14 w-full py-4'>CAMPAIGNS</Link>
                <Link href={`/advertiser?p=settings`} scroll={false} className='border-b border-black pl-14 w-full py-4'>ACCOUNT SETTINGS</Link>
                <Link href={`/advertiser?p=topup`} scroll={false} className='border-b border-black pl-14 w-full py-4'>TOPUP ACCOUNT</Link>
                <Link href={`/advertiser?p=support`} scroll={false} className='border-b border-black pl-14 w-full py-4'>SUPPORT</Link>
            </ul>
            <Logout/>
        </div>
        <div className='col-span-6 h-full'>
            {page === 'dashboard' && <DashBoard/>}
            {page === 'campaigns' && <Campaigns/>}
            {page === 'settings' && <Settings/>}
            {page === 'topup' && <Topup/>}
            {page === 'support' && <Support/>}
        </div>
    </div>
    </div>
  )

   
}

export default page