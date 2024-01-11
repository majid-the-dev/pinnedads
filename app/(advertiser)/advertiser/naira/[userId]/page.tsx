'use client';

import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";

interface IParams {
  userId: string;
}

const page = ({ params }: { params: IParams}) => {

  const router = useRouter()
  const [pinValid, setPinValid] = useState(true);
  const [dailyPins, setDailyPins] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [adText, setAdText] = useState(false);
  const [adText2, setAdText2] = useState(false);
  const [adText3, setAdText3] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isSelected, setIsSelected] = useState(false);
  const maxSelections = 3;
  const [price, setPrice] = useState({
    top:1100,
    bottom:800,
    ftop: 2500,
    fbottom: 500,
  });
  const [data, setData] = useState({
    name: "",
    instagram: "",
    adtext: "",
    adtext1: "",
    adtext2: "",
    adtext3: "",
    rewrite: false,
    pinprice: null,
    pins: null,
    price: 0,
    daily: null,
    audience: ""
  });

  
  const handleChange = (e: { target: { id: any; value: any } }) => {
    setData({ ...data, [e.target.id]: e.target.value });

  };

  const handleCheck = (event: { target: { checked: any; }; }) => {
    setData({
      ...data,
      rewrite: event.target.checked, // Set to true when checked, false when unchecked
    });
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    if (selectedOptions.includes(selectedValue)) {
      // If already selected, remove it
      setSelectedOptions(selectedOptions.filter((option) => option !== selectedValue));
      setIsSelected(false)
    }else if(selectedOptions.length == 2){
      setSelectedOptions([...selectedOptions, selectedValue]);
      setIsSelected(true)
    } else {
      // If not selected, add it (if not exceeding maxSelections)
      if (selectedOptions.length < maxSelections) {
        setSelectedOptions([...selectedOptions, selectedValue]);
      }
    }

    setData({...data, audience: selectedOptions.join(', ')})
  };

  function generateDataset() {
    const dataset = [];
    let priceBottom = 800;
    let priceTop = 1100;
    let followerBottom = 500;
    let followerTop = 2500;
  
    while (priceTop <= 100000) {
      if(priceTop<=10000){
      dataset.push({ bottom: priceBottom, top: priceTop, fbottom: followerBottom, ftop: followerTop });
      priceBottom += 300;  // Adjust this increment as needed
      priceTop = priceBottom + 300;  // Assuming a constant difference between bottom and top
      followerBottom += 2000;
      followerTop = followerBottom + 2000;
      }else{
      dataset.push({ bottom: priceBottom, top: priceTop, fbottom: followerBottom, ftop: followerTop });
  
      // Update values for the next iteration
      priceBottom += 100;  // Adjust this increment as needed
      priceTop = priceBottom + 100;  // Assuming a constant difference between bottom and top
      followerBottom += 2000;
      followerTop = followerBottom + 2000;
      }
    }
  
    return dataset;
  }
  
  // Example usage
  const myDataset = generateDataset();
  

  function findRangeForNumber( number: number) {
    for (const { bottom, top, fbottom, ftop } of myDataset) {
      if (number >= bottom && number <= top) {
        setPrice({top: top, bottom: bottom, ftop:ftop, fbottom: fbottom})
      }
    }
  
    // Handle cases where the number doesn't fall within any range
    return null;
  }

  function getPrice( number: number) {
    let totalPrice = data.pinprice ? number * data.pinprice : 0;
    setData({...data, price: totalPrice})
  }
  
  

  useEffect(() => {
    // Run this effect whenever data.pin changes
    setPinValid(data.pinprice ? data.pinprice >= 800 && data.pinprice <= 100000 : true);

    findRangeForNumber( data.pinprice? data.pinprice : 800);

    getPrice( data.pins? data.pins : 0)

    setDailyPins( data.daily && data.pins? Number(data.daily) <= Number(data.pins) : true)
   
  }, [data.pinprice, data.pins, data.daily]);


  const createCampaign = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    setIsLoading(true)
    try {
        // Call your POST function with form data
        const response = await axios.post(`/api/create-campaign/${params.userId}`, data);
        toast.success("Campaign has been created!");
        setData({name: "",instagram: "",adtext: "",adtext1: "",adtext2: "",adtext3: "",rewrite:false, pinprice: null,pins: null, price: 0, daily: null, audience: ""})
        router.push(`/advertiser`)
      } catch (error) {
        console.error('Error creating campaign:', error);
        toast.error('Something went wrong.');
      }
      // router.push('/login')
      setIsLoading(false)
 }

  return (
    <div className="w-full p-16 flex flex-col gap-10 items-center justify-center">
      <div className='font-semibold text-3xl'>PinnedAds</div>
      <form onSubmit={createCampaign}  className="flex flex-col w-full lg:w-[50%] items-center justify-start gap-8">
        <h1>Create Naira Campaign</h1>
        <input
            onChange={handleChange}
            value={data.name}
            id="name"
            name="name"
            type="name"
            required
            className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
            placeholder="Campaign name"
          />
        <div className="w-full flex items-center justify-center gap-1">
          <input
          onChange={handleChange}
          value={data.instagram}
          id="instagram"
          name="instagram"
          type="instagram"
          required
            className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
            placeholder="Instagram handle"
          />
        </div>
        <div className='w-full flex flex-col items-start gap-2'>
        <input
        onChange={handleChange}
        value={data.adtext}
        id="adtext"
        name="adtext"
        type="name"
        required
          className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
          placeholder="Adtext"
        /> 
        { adText? <input
        onChange={handleChange}
        value={data.adtext1}
        id="adtext1"
        name="adtext1"
        type="name"
        required
          className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
          placeholder="Adtext"
        />  : null}
        { adText2? <input
        onChange={handleChange}
        value={data.adtext2}
        id="adtext2"
        name="adtext2"
        type="name"
        required
          className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
          placeholder="Adtext"
        />  : null}
        { adText3? <input
        onChange={handleChange}
        value={data.adtext3}
        id="adtext3"
        name="adtext3"
        type="name"
        required
          className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
          placeholder="Adtext"
        />  : null}
        { !adText? <button type='button' onClick={() => setAdText(true)} className='border border-black rounded-full p-2 text-xs'>+ Add Ad Text</button> : null}
        { adText && !adText2? <button type='button' onClick={() => setAdText2(true)} className='border border-black rounded-full p-2 text-xs'>+ Add Ad Text</button> : null}
        { adText && adText2 && !adText3? <button type='button' onClick={() => setAdText3(true)} className='border border-black rounded-full p-2 text-xs'>+ Add Ad Text</button> : null}
        <label className="flex items-center space-x-2">
      <input
        id="rewrite"
        name="rewrite"
        type="checkbox"
        checked={Boolean(data.rewrite)}
        onChange={handleCheck}
        className="form-checkbox h-4 w-4 text-indigo-600"
      />
      <span className="text-gray-700">Allow Rewrite?</span>
    </label>
        </div>
       <div className='mb-4 w-full'>
       <label htmlFor="options" className="w-full block text-sm font-medium text-gray-700">
        Select exactly 3 options:
        </label>
        <select 
        id="options"
        name="options"
        onChange={handleSelect} 
        className="rounded-md grid grid-cols-2 w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
        multiple={true} >
          <option value="" disabled hidden>
          Select 3 Audience
        </option>
        <option value="Fashion" style={{ backgroundColor: selectedOptions.includes('Fashion') ? '#c3e6cb' : 'transparent' }}>Fashion</option>
        <option value="Music" style={{ backgroundColor: selectedOptions.includes('Music') ? '#c3e6cb' : 'transparent' }}>Music</option>
        <option value="Art" style={{ backgroundColor: selectedOptions.includes('Art') ? '#c3e6cb' : 'transparent' }}>Art</option>
        <option value="Politics" style={{ backgroundColor: selectedOptions.includes('Politics') ? '#c3e6cb' : 'transparent' }}>Politics</option>
        <option value="Movies" style={{ backgroundColor: selectedOptions.includes('Movies') ? '#c3e6cb' : 'transparent' }}>Movies</option>
        <option value="Sports" style={{ backgroundColor: selectedOptions.includes('Sports') ? '#c3e6cb' : 'transparent' }}>Sports</option>
        <option value="Food" style={{ backgroundColor: selectedOptions.includes('Food') ? '#c3e6cb' : 'transparent' }}>Food</option>
        <option value="Lifestyle" style={{ backgroundColor: selectedOptions.includes('Lifestyle') ? '#c3e6cb' : 'transparent' }}>Lifestyle</option>
        </select>
        {!isSelected && (
            <p className="text-red-500 text-xs">Select 3 Audiences</p>
          )}
       </div>
        <div className="mb-4 w-full">
        <input
        onChange={handleChange}
        value={data.pinprice === null ? '' : data.pinprice}
        id="pinprice"
        name="pinprice"
        type="number"
        required
        className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
        placeholder="price per pinned post min. 800 max. 100,000"
        /> 
        {!pinValid && (
            <p className="text-red-500 text-xs">Value from 800 to 100,000</p>
          )}
          {pinValid && (
            <p className="text-gray-300 text-xs">You get Instagram users with following range up to {price.ftop}</p>
          )}
        </div>
      <div className='mb-2 w-full flex flex-col items-start gap-2'>  
        <input
        onChange={handleChange}
        value={data.pins === null ? '' : data.pins}
        id="pins"
        name="pins"
        type="number"
        required
        className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
        placeholder="How many pins do you want"
        /> 
        <p className="text-black text-xs">That will cost N{data.price}</p></div>
        <div className="mb-4 w-full">
        <input
        onChange={handleChange}
        value={data.daily === null ? '' : data.daily}
        id="daily"
        name="daily"
        type="number"
        className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
        placeholder="Would you like to have a specific number of pins a day?"
        /> 
        {!dailyPins && (
            <p className="text-red-500 text-xs">Value can't be above your pins</p>
          )}</div>
        <button type='submit' disabled={isLoading || !isSelected} className="rounded-md relative block w-full px-3 py-2 border border-gray-300 bg-black text-gray-200 sm:text-sm disabled:bg-gray-500">
          Create campaign
        </button>
      </form>
    </div>
  );
};

export default page