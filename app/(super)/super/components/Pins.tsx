import { GoDotFill } from "react-icons/go";
import getUserCampaigns from "@/actions/get-user-campaigns";
import CampaignCard from "./CampaignCard";
import getPins from "@/actions/get-pins";
import getCampaignsById from "@/actions/get-campaign-by-params";
import Link from "next/link";
import Logout from "./Logout";
import { DashNav } from "./DashboardNav";

const SuperDash = async() => {

    const pins = await getPins();

  if(!pins){
    return(
      <div className="flex flex-col items-center justify-center h-[100vh] gap-6">
      <div>No Session</div>
      <Link href='/admin-signup' className='bg-black px-3 py-1 text-white rounded-md'>Sign Up</Link>
      <Link href='/admin-login' className='bg-black px-3 py-1 text-white rounded-md'>Login</Link>
      <Logout />
      </div>)
  }

  return (
    <div className="w-full flex flex-col h-full p-4 items-center justify-start gap-2">
      <DashNav/>
    <div className="w-full flex items-center gap-2">
      <GoDotFill className="text-green-500" />
      <h1>active campaigns</h1>
    </div>
    <div className="grid grid-cols-3 w-full items-center gap-3">
    {pins.map((pin: any) => (
          <CampaignCard
            key={pin.id}
            data={pin}
          />
        ))}
    </div>    
  </div>
  )
}

export default SuperDash