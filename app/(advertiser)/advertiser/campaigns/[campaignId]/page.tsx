import getCampaignsById from '@/actions/get-campaign-by-id';
import React from 'react'
import { DashNav } from '../../components/DashboardNav';
import Link from 'next/link';

interface IParams {
    campaignId?: string;
  }

const page = async ({ params }: { params: IParams }) => {

    const campaign = await getCampaignsById(params)

    if (!campaign) {
        return (
        <div className='my-24'>
          <div>
            <h1>No Campaign</h1>
          </div>
        </div>
        );
      }

      if (!campaign.links) {
        return (
        <div className='my-24'>
          <div>
            <h1>No Campaign</h1>
          </div>
        </div>
        );
      }

  return (
    <div className='flex flex-col items-center gap-4'>
        <DashNav/>
        <div className='flex flex-col items-center gap-4 border border-black rounded-md py-2 px-2'>
        <h1 className="font-semibold text-xl">Report</h1>
        <h1>{campaign.name}</h1>
      <p>@{campaign.instagram}</p>
      <div className="w-full border border-black rounded-md px-2 py-1">
        <p className="w-full text-center text-xs">
          {campaign.pinned} out of {campaign.pins} pinned
        </p>
      </div>
      <ul className='flex flex-col items-start justify-start gap-4 text-xs text-blue-600'>
      {campaign.links.map((pin: any) => (
        <Link
          href={pin.link}
          key={pin.id}
          className=''
        >
        {pin.completed === false? null: pin.link.slice(0,20)}</Link> 
      ))}
      </ul>
        </div>
    </div>
  )
}

export default page