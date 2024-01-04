
import React from 'react'
import { DashNav } from '../components/DashboardNav';
import Link from 'next/link';
import CopySet from '../components/Copy';
import getInfluencerById from '@/actions/get-influencer-by-id';

interface IParams {
  influencerId: string;
  }

const page = async ({ params }: { params: IParams }) => {

    const influencer = await getInfluencerById(params);

    if (!influencer) {
        return (
        <div className='my-24'>
          <div>
            <h1>No Influencer</h1>
          </div>
        </div>
        );
      }

  return (
    <div className='flex flex-col items-center gap-4'>
        <DashNav/>
        <div className='w-[90%] lg:w-[70%] flex flex-col items-center gap-4 border border-black rounded-md py-2 px-2'>
        <h1 className="font-semibold text-xl">Report</h1>
        <h1>{influencer.fname} {influencer.lname}</h1>
        <div className="w-full border border-black rounded-md px-2 py-1">
         <div className='w-full text-sm flex items-center justify-between'>
        <Link
          href={influencer.link? influencer.link: ''}
          className='text-sm text-blue-500'
          target={"_blank"}
        >
        {influencer.link? influencer?.link.slice(0,50): ''}</Link> 
        <CopySet data={influencer.link}/></div>
         <p className='text-sm'>{influencer.instaVerified == true ? "Verified" : "Not Verified"}</p> 
      </div>
      <div className='flex items-center justify-center gap-5'>
      <button>Verify</button>
      </div>
      </div>
    </div>
  )
}

export default page