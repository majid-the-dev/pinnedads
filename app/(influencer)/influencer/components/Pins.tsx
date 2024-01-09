import getInfluencerPins from '@/actions/get-influencer-pins'
import React from 'react'
import PinCard from './PinCard'



const Pins = async () => {

  const pins = await getInfluencerPins();
  
  if(!pins){
    return(
      <div>null active campaings</div>
    )
  }

  return (
    <div className='w-full flex flex-col flex-auto h-full items-start justify-start gap-4'>
        <h1>Pins</h1>
        <div className='w-full grid grid-cols-4 items-center gap-2'>
        {pins.map((pin: any) => (
            <PinCard
              key={pin.id}
              data={pin}
            />
          ))}
        </div>
    </div>
  )
}

export default Pins