import getCampaignsById from '@/actions/get-campaign-by-id';
import React from 'react'
import { DashNav } from '../../components/DashboardNav';

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
      <div>
      {campaign.links.length == 0 ? <h1>No links yet</h1> : campaign.links[0].influencerId}
      </div>
        </div>
    </div>
  )
}

export default page