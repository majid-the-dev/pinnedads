import { Pin } from "@prisma/client";
import CampaignCard from "./CampaignCard";
import Link from "next/link";
import Logout from "./Logout";

interface PinProps {
    pins: Pin[] | null;
}

const RejectedPins: React.FC<PinProps> = ({ pins }) =>  {

    if(!pins){
        return(
          <div className="flex flex-col items-center justify-center  gap-6">
          <div>No Rejected Pins</div>
          </div>)
      }

  return (
    <div className="w-full">
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

export default RejectedPins

