import React from 'react'
import DashBoardIntro from './DashBoardIntro'
import Active from './Active'
import Pins from './Pins';
import getCurrentInfluencer from '@/actions/get-current-influencer';
import Link from 'next/link';



const DashBoard = async() => {

  const currentUser = await getCurrentInfluencer();

  if(!currentUser?.instaVerified){
    return(
      <div className='flex flex-col items-center justify-center gap-5 h-full'>Please verify your Instagram
        <Link href={`/influencer?p=settings`} scroll={false} className='border border-black py-2 px-2 rounded-md'>VERIFY INSTAGRAM</Link>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-5 h-full items-center py-4 px-4 border border-black'>
        <DashBoardIntro/>
        <Active />
        <Pins />
    </div>
  )
}

export default DashBoard