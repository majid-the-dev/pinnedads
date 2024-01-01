"use client"

import axios from 'axios';
import toast from 'react-hot-toast';
import { Campaign, Pin } from "@prisma/client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DisButton from './DisApproveButton';
import Button from './ApproveButton';

interface FeedBackProps {
    data: Pin;
    campaign: Campaign;
  }
  

const Feedback: React.FC<FeedBackProps> = ({ data, campaign }) => {
     
    const [res, setRes] = useState({
        message: ""
    })

  return (
    <div> 
      <textarea name='message'
      value={res.message} 
      onChange={(e) => setRes({...res,[e.target.name]:e.target.value})} className='rounded-md'></textarea>
      <div className='flex items-center justify-center gap-5'>
      <DisButton data={data} campaign={campaign} />  <Button data={data} campaign={campaign}/>
      </div>
    </div>
  )
}

export default Feedback