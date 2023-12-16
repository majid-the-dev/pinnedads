import React from 'react'
import Container from '../components/Container'
import { DashNav } from './components/DashboardNav'
import { IoIosLogOut } from "react-icons/io";
import DashBoard from './components/DashBoard';
import Link from 'next/link';
import Settings from './components/Settings';
import Topup from './components/Topup';
import Support from './components/Support';

const page = ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {

    const page = typeof searchParams.p === 'string' ? searchParams.p : 'dashboard' ;

  return (
    <div className='flex flex-col items-center justify-start w-full h-[100vh]'>
    <DashNav/>
    <div className='w-full h-full grid grid-cols-8 items-start'>
        <div className='h-full col-span-2 flex flex-col items-start justify-between border border-black'>
            <ul className='h-full flex flex-col items-start justify-start w-full'>
                <Link href={`/advertiser?p=dashboard`} scroll={false} className='border-b border-black pl-14 w-full py-4'>DASHBOARD</Link>
                <Link href={`/advertiser?p=settings`} scroll={false} className='border-b border-black pl-14 w-full py-4'>ACCOUNT SETTINGS</Link>
                <Link href={`/advertiser?p=topup`} scroll={false} className='border-b border-black pl-14 w-full py-4'>TOPUP ACCOUNT</Link>
                <Link href={`/advertiser?p=support`} scroll={false} className='border-b border-black pl-14 w-full py-4'>SUPPORT</Link>
            </ul>
            <div className='pl-14 w-full py-4 flex items-center gap-3'>
                <h1>LOGOUT</h1>
                <IoIosLogOut/>
            </div>
        </div>
        <div className='col-span-6 h-full'>
            {page === 'dashboard' && <DashBoard/>}
            {page === 'settings' && <Settings/>}
            {page === 'topup' && <Topup/>}
            {page === 'support' && <Support/>}
        </div>
    </div>
    </div>
  )
}

export default page