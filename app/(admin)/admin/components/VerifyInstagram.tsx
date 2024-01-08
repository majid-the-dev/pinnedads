import getPendingInfluencer from '@/actions/get-pending-influencer'
import React from 'react'
import UserCard from './UserCard'
import { Influencer } from "@prisma/client";

const VerifyInstagram = async() => {

  const influencers = await getPendingInfluencer()

  if(!influencers || influencers.length<1){
    return(
      <div className="flex flex-col items-center justify-center h-[100vh] gap-6">
      <div>No Pending Influencers</div>
      </div>)
  }

  return (
    <div className="w-full p-4">
        <div className="grid grid-cols-3 w-full items-center gap-3">
    {influencers.map((influencer: Influencer) => (
          <UserCard
            key={influencer.id}
            influencer={influencer}
            classname="text-orange-400"
          />
        ))}
    </div>  
    </div>
  )
}

export default VerifyInstagram