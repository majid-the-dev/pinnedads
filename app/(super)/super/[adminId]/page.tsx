
import React from 'react'
import { DashNav } from '../components/DashboardNav';
import getPinsById from '@/actions/get-pins-by-id';
import getCampaignById from '@/actions/get-campaign-by-id';
import Link from 'next/link';
import Button from '../components/ApproveButton';
import DisButton from '../components/DisApproveButton';
import getAdminById from '@/actions/get-admin-by-id';

interface IParams {
    adminId: string;
  }

const page = async ({ params }: { params: IParams }) => {

    const admin = await getAdminById(params);

    if (!admin) {
        return (
        <div className='my-24'>
          <div>
            <h1>No Admin</h1>
          </div>
        </div>
        );
      }

  return (
    <div className='flex flex-col items-center gap-4'>
        <DashNav/>
        <div className='w-[90%] lg:w-[70%] flex flex-col items-center gap-4 border border-black rounded-md py-2 px-2'>
        <h1 className="font-semibold text-xl">Admin</h1>
        <h1>{admin.fname}</h1>
        {admin.admin === true ? <h1 className='text-xs text-green-500'>Confirmed</h1> : <h1 className='text-xs text-red-500'>Not confirmed</h1>}
        {admin.admin === true ? <DisButton data={admin} /> : <Button data={admin} />}
      </div>
    </div>
  )
}

export default page