import { GoDotFill } from "react-icons/go";
import CampaignCard from "./CampaignCard";
import getCampaigns from "@/actions/get-campaigns";
import getCurrentInfluencer from '@/actions/get-current-influencer';

const Campaigns = async() => {

  const campaigns = await getCampaigns();
  const influencer = await getCurrentInfluencer()

  if(!campaigns){
    return(
      <div>null active campaings</div>
    )
  }

  return (
    <div className="w-full flex flex-col h-full p-4 items-center justify-start gap-2">
    <div className="w-full flex items-center gap-2">
      <GoDotFill className="text-green-500" />
      <h1>active campaigns</h1>
    </div>
    <div className="grid grid-cols-3 w-full items-center gap-3">
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

export default Campaigns