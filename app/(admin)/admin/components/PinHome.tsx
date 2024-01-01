import React from 'react'
import { Pin } from "@prisma/client";
import PendingPins from './PendingPins'
import ApprovedPins from './ApprovedPins'
import RejectedPins from './RejectedPins'
import getPendingPins from '@/actions/get-pending-pins';
import getApprovedPins from '@/actions/get-approved-pins';
import getRejectedPins from '@/actions/get-rejected-pins';


const PinHome = async () =>  {

  const pending = await getPendingPins();
  const approved = await getApprovedPins();
  const rejected = await getRejectedPins();

  return (
    <div className='flex flex-col gap-5 h-full items-center py-4 px-4 border border-black'>
      <PendingPins pins={pending}/>
      <ApprovedPins pins={approved}/>
      <RejectedPins pins={rejected}/>
    </div>
  )
}

export default PinHome