'use client';

import { Campaign, Pin } from "@prisma/client";
import AppButton from './ApproveButton';
import DisButton from './DisApproveButton';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface ButtonProps {
    pin: Pin;
    campaign: Campaign;
}

const Button: React.FC<ButtonProps> = ({ pin, campaign })  => {

   const [isClicked, setIsClicked] = useState(false);
   const router = useRouter();
   const [data, setData] = useState({
    account: false,
    rewrite: false,
    handle: false,
    misspelt: false
  });

  const onSubmit = async () => {
    let dat = {
        message: 'Wrong: ',
        status: 'rejected'
        };
    for (const [key, value] of Object.entries(data)) {
      if (value) {
        dat.message += `${key}, `;
      }
    }
    // Remove trailing comma and space
    dat.message = dat.message.slice(0, -2);
    try {
      await axios.patch(`/api/${pin.id}/${campaign.id}`, dat);
      router.refresh();
      router.push(`/admin`);
      toast.success("Disapproved");
      setData({account: false, rewrite: false, handle: false, misspelt: false})
    } catch (error: any) {
      toast.error(`Something went wrong. ${error}`);
    } finally {
    }
  };


  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setData({ ...data, [id]: checked });
  };

  return (
    <div className="flex flex-col items-center justify-start gap-4">

        {!isClicked? 
        <div className="flex items-center justify-center gap-5">
        <DisButton data={pin} campaign={campaign} onClick={()=>setIsClicked(!isClicked)}/>  <AppButton pin={pin} campaign={campaign}/>
        </div>: null}
        
       
        {isClicked? 
         <div className="flex flex-col items-start gap-4 text-sm">
            <IoIosArrowRoundBack onClick={()=>setIsClicked(false)}/>
         <label className="flex items-center space-x-2">
           <input
             id="account"
             name="account"
             type="checkbox"
             checked={Boolean(data.account)}
             onChange={handleCheck}
             className="form-checkbox h-4 w-4 text-indigo-600"
           />
           <span className="text-gray-700">Wrong IG Account</span>
         </label> 
             <label className="flex items-center space-x-2">
           <input
             id="rewrite"
             name="rewrite"
             type="checkbox"
             checked={Boolean(data.rewrite)}
             onChange={handleCheck}
             className="form-checkbox h-4 w-4 text-indigo-600"
           />
           <span className="text-gray-700">Did Not Allow Rewrite</span>
         </label> 
         <label className="flex items-center space-x-2">
           <input
             id="handle"
             name="handle"
             type="checkbox"
             checked={Boolean(data.handle)}
             onChange={handleCheck}
             className="form-checkbox h-4 w-4 text-indigo-600"
           />
           <span className="text-gray-700">No Handle</span>
         </label> 
         <label className="flex items-center space-x-2">
           <input
             id="misspelt"
             name="misspelt"
             type="checkbox"
             checked={Boolean(data.misspelt)}
             onChange={handleCheck}
             className="form-checkbox h-4 w-4 text-indigo-600"
           />
           <span className="text-gray-700">Misspelt Handle</span>
         </label> 
         <div>
    <button className='bg-red-400 px-2 py-1 border border-black rounded-md text-xs' onClick={onSubmit}>Send Review</button>
    </div> 
             </div>
    : null}
    </div>
  )
}

export default Button