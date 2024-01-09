import { Pin } from "@prisma/client";
import CampaignCard from "./CampaignCard";
import { GoDotFill } from "react-icons/go";

interface PinProps {
    pins: Pin[] | null;
}

const ApprovedPins: React.FC<PinProps> = ({ pins }) =>  {

    if(!pins || pins.length < 1){
        return(
          <div className="w-full flex flex-col items-start gap-4 p-2">
            <div className="w-full flex items-center gap-2">
            <GoDotFill className="text-green-500" />
             <h1>Active pins</h1>
           </div>
          <div className="w-full flex flex-col items-center justify-center p-4 gap-6">
          <h1>No Approved Pins</h1>
          </div>
          </div>)
      }

  return (
    <div className="w-full flex flex-col h-full p-2 items-center justify-start gap-2">
    <div className="w-full flex items-center gap-2">
      <GoDotFill className="text-green-500" />
      <h1>Active Pins</h1>
    </div>
    <div className="grid grid-cols-3 w-full items-center gap-3">
    {pins.map((pin: any) => (
          <CampaignCard
            key={pin.id}
            data={pin}
            classname="text-green-400"
          />
        ))}
    </div>    
  </div>
  )
}

export default ApprovedPins

