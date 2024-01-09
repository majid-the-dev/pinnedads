import { GoDotFill } from "react-icons/go";
import getCampaigns from "@/actions/get-campaigns";
import CampaignCard from "./CampaignCard";
import getCurrentInfluencer from '@/actions/get-current-influencer';

interface IParams {
  userId: string;
}

const Active = async() => {

  const campaigns = await getCampaigns();
  const influencer = await getCurrentInfluencer()

  if(!campaigns || campaigns.length == 0){
    return(
      <div className="w-full flex flex-col items-start gap-4 p-2">
            <div className="w-full flex items-center gap-2">
            <GoDotFill className="text-green-500" />
             <h1>Active Campaigns</h1>
           </div>
          <div className="w-full flex flex-col items-center justify-center p-4 gap-6">
          <h1>No Active Campaigns</h1>
          </div>
          </div>
    )
  }
  
  return (
    <div className="w-full flex flex-col h-full flex-auto items-center justify-start gap-2">
      <div className="w-full flex items-center gap-2">
        <GoDotFill className="text-green-500" />
        <h1>Active Campaigns</h1>
      </div>
      <div className="grid grid-cols-3 w-full items-center gap-2">
      {campaigns.map((campaign: any) => (
            <CampaignCard
              key={campaign.id}
              data={campaign}
              influencer={influencer}
              pin={campaign.links}
            />
          ))}
      </div>    
    </div>
  )
}

export default Active