
import React from 'react'
import { DashNav } from '../components/DashboardNav';
import getPinsById from '@/actions/get-pins-by-id';
import getCampaignById from '@/actions/get-campaign-by-id';
import Link from 'next/link';
import DisButton from '../components/DisApproveButton';
import CopySet from '../components/Copy';
import Button from '../components/Button';

interface IParams {
    pinId: string;
  }

const page = async ({ params }: { params: IParams }) => {

    const pin = await getPinsById(params);
    const campaign = await getCampaignById(pin?.campaignId)

    if (!pin || !campaign) {
        return (
        <div className='my-24'>
          <div>
            <h1>No Pin or No Campaign</h1>
          </div>
        </div>
        );
      }

  return (
    <div className='flex flex-col items-center gap-4'>
        <DashNav/>
        <div className='w-[90%] lg:w-[70%] flex flex-col items-center gap-4 border border-black rounded-md py-2 px-2'>
        <h1 className="font-semibold text-xl">Report</h1>
        <h1>{pin.follower} Followers</h1>
        <div className="w-full border border-black rounded-md px-2 py-1">
      <ol className='lg:w-[50%] w-[90%] flex flex-col items-center '>
          <li className='w-full text-sm flex items-center justify-between'>{campaign?.adtext?.adtext1}
          </li>
          {campaign?.adtext?.adtext2 === "" ? null : <li className='w-full text-sm flex items-center justify-between'>{campaign?.adtext?.adtext2}
          </li>}
          {campaign?.adtext?.adtext3 === "" ? null : <li className='w-full text-sm flex items-center justify-between'>{campaign?.adtext?.adtext3}
          </li>}
          {campaign?.adtext?.adtext4 === "" ? null : <li className='w-full text-sm flex items-center justify-between'>{campaign?.adtext?.adtext4}
          </li>}
        </ol>
        <div>{campaign?.rewrite === true ? <h1 className='text-xs text-green-500'>Allow rewrite</h1> : <h1 className='text-xs text-red-500'>No rewrite</h1>}</div>
        <div className='w-full text-sm flex items-center justify-between'>
        <Link
          href={pin.link}
          key={pin.id}
          className='text-sm text-blue-500'
          target={"_blank"}
        >
        {pin.link.slice(0,50)}</Link> 
        <CopySet data={pin.link}/></div>
         <p className='text-sm text-green-400'>{pin.status}</p> 
      </div>
      <div className='flex items-center justify-center gap-5'>
      <Button pin={pin} campaign={campaign}/>
      </div>
      </div>
    </div>
  )
}

export default page