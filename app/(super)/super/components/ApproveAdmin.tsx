import getAdmins from '@/actions/get-admins'
import React from 'react'
import { GoDotFill } from 'react-icons/go';
import AdminCard from './AdminCard';

const ApproveAdmin = async () => {

    const admins = await getAdmins();

    if(!admins){
        return(
        <div>No admin</div>
        )
    }

  return (
    <div className="w-full flex flex-col h-full flex-auto items-center justify-start gap-2">
      <div className="w-full flex items-center gap-2">
        <GoDotFill className="text-green-500" />
        <h1>Active Admins</h1>
      </div>
      <div className="grid grid-cols-3 w-full items-center gap-3">
      {admins.map((admin: any) => (
            <AdminCard
              key={admin.id}
              data={admin}
            />
          ))}
      </div>    
    </div>
  )
}

export default ApproveAdmin