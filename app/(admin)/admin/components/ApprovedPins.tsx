import { Pin } from "@prisma/client";
import CampaignCard from "./CampaignCard";
import { GoDotFill } from "react-icons/go";

interface PinProps {
    pins: Pin[] | null;
}

const ApprovedPins: React.FC<PinProps> = ({ pins }) =>  {

    if(!pins){
        return(
          <div className="flex flex-col items-center justify-center h-[100vh] gap-6">
          <div>No Approved Pins</div>
          </div>)
      }

  return (
    <div className="w-full flex flex-col h-full p-4 items-center justify-start gap-2">
    <div className="w-full flex items-center gap-2">
      <GoDotFill className="text-green-500" />
      <h1>active campaigns</h1>
    </div>
    <div className="grid grid-cols-3 w-full items-center gap-3">
    {pins.map((pin: any) => (
          <CampaignCard
            key={pin.id}
            data={pin}
            classname="text-red-400"
          />
        ))}
    </div>    
  </div>
  )
}

export default ApprovedPins

