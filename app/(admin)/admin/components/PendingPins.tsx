import { Pin } from "@prisma/client";
import CampaignCard from "./CampaignCard";

interface PinProps {
    pins: Pin[] | null;
}

const PendingPins: React.FC<PinProps> = ({ pins }) =>  {

    if(!pins){
        return(
          <div className="flex flex-col items-center justify-center gap-6">
          <div>No Pending Pins</div>
          </div>)
      }

  return (
    <div className="w-full">
        <div className="grid grid-cols-3 w-full items-center gap-3">
    {pins.map((pin: any) => (
          <CampaignCard
            key={pin.id}
            data={pin}
            classname="text-orange-400"
          />
        ))}
    </div>  
    </div>
  )
}

export default PendingPins