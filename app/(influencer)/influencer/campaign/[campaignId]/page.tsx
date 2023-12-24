import getCampaignsById from '@/actions/get-campaign-by-id';
import React, { useState } from 'react'
import { DashNav } from '../../components/DashboardNav';
import axios from 'axios';
import Form from './components/Form';
import CopySet from './components/Copy';
import getCurrentInfluencer from '@/actions/get-current-influencer';
import Link from 'next/link';

interface IParams {
    campaignId?: string;
  }

const page = async ({ params }: { params: IParams }) => {

    const campaign = await getCampaignsById(params)
    const influencer = await getCurrentInfluencer()
    

    if (!campaign) {
        return (
        <div className='my-24'>
          <div>
            <h1>No Campaign</h1>
          </div>
        </div>
        );
      }

      if (!influencer) {
        return (
        <div className='my-24'>
          <div className='flex flex-col items-center justify-center gap-4'>
            <h1>Please Signup</h1>
            <Link href='/influencer-signup' className='border border-black rounded-md px-3 py-1' >Sign up</Link>
          </div>
        </div>
        );
      }

  return (
    <div className='w-full flex flex-col items-center gap-4'>
        <DashNav/>
        <div className='flex flex-col w-[60%] items-center gap-4 border border-black rounded-md py-2 px-2'>
        <h1>{campaign.name}</h1>
        <p>@{campaign.instagram}</p>
        <ol className='lg:w-[50%] w-[90%] flex flex-col items-center '>
          <li className='w-full text-sm flex items-center justify-between'>{campaign.adtext?.adtext1}
          <CopySet data={campaign.adtext?.adtext1}/>
          </li>
          {campaign.adtext?.adtext2 === "" ? null : <li className='w-full text-sm flex items-center justify-between'>{campaign.adtext?.adtext2}
          <CopySet data={campaign.adtext?.adtext2}/>
          </li>}
          {campaign.adtext?.adtext3 === "" ? null : <li className='w-full text-sm flex items-center justify-between'>{campaign.adtext?.adtext3}
          <CopySet data={campaign.adtext?.adtext3}/>
          </li>}
          {campaign.adtext?.adtext4 === "" ? null : <li className='w-full text-sm flex items-center justify-between'>{campaign.adtext?.adtext4}
          <CopySet data={campaign.adtext?.adtext4}/>
          </li>}
        </ol>
       <Form campaignId={params.campaignId} influencer={influencer}/>
        </div>
    </div>
  )
}

export default page