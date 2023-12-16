'use client';

import { useState, useMemo } from "react";
import useCampaignModal from "@/hooks/useCampaignModal"
import Modal from "./Modal"
import Heading from "./Head";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";



const CampaignModal = () => {
    const router = useRouter();
    const campaignModal = useCampaignModal();

    const [isLoading, setIsLoading] = useState(false)
    const [isSelected, setIsSelected] = useState(false)
    const [isSelected2, setIsSelected2] = useState(false)
  
    function changeColor(divId : string){
      let selected = 'all'
      
      if(divId === 'naira'){
        setIsSelected(true)
        setIsSelected2(false)
      }
      else if(divId === 'dollar'){
        setIsSelected(false)
        setIsSelected2(true)
      } else{
        setIsSelected(false)
        setIsSelected2(false)
      }
    };

   
 


 
    function selectedCurrency(){
        if(isSelected){
          router.push('/advertiser/naira')
          setIsSelected(false)
          setIsSelected2(false)
        } else if(isSelected2){
          router.push('/advertiser/dollar')
          setIsSelected(false)
          setIsSelected2(false)
        } else {
          return null
        }  
        campaignModal.onClose()     
      }
   
      let bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Select your currency"
            subtitle="Naira or Dollar"
          />
        <div className="w-full grid grid-cols-2 gap-8 items-center">
        <div id="naira" onClick={() => changeColor('naira')} className= {`col-span-1 border rounded-xl h-44 flex items-center justify-center cursor-pointer ${isSelected? 'bg-black text-white hover:bg-black' : 'bg-white text-black hover:bg-gray-100'}`}>Naira</div>
        <div id="dollar" onClick={() => changeColor('dollar')} className={`col-span-1 border rounded-xl h-44 flex items-center justify-center cursor-pointer ${isSelected2? 'bg-black text-white hover:bg-black' : 'bg-white text-black hover:bg-gray-100'}`}>Dollar/BTC</div>
        </div>
        </div>
      )

  return (
    <Modal
    isOpen={campaignModal.isOpen}
    onClose={campaignModal.onClose}
    onSubmit={selectedCurrency}
    title="Create Campaign"
    body={bodyContent}
    />
  )
  
}

export default CampaignModal