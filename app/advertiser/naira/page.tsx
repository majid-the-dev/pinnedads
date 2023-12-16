'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const page = () => {

  const initialTop = 800;
  const initialBottom = 500;
  const [pinValid, setPinValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [adText, setAdText] = useState(false);
  const [adText2, setAdText2] = useState(false);
  const [adText3, setAdText3] = useState(false);
  const [price, setPrice] = useState({
    top:1100,
    bottom:800,
    ftop: 2500,
    fbottom: 500,
  });
  const [bottomRange, setBottomRange] = useState(800);
  const [data, setData] = useState({
    name: "",
    instagram: "",
    adtext: "",
    adtext1: "",
    adtext2: "",
    adtext3: "",
    rewrite: false,
    pin: null,
    price: null,
    daily: null
  });

  
  const handleChange = (e: { target: { id: any; value: any } }) => {
    setData({ ...data, [e.target.id]: e.target.value });

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
      priceBottom += 200;  // Adjust this increment as needed
      priceTop = priceBottom + 200;  // Assuming a constant difference between bottom and top
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
    
  }
  
  

  useEffect(() => {
    // Run this effect whenever data.pin changes
    setPinValid(data.pin ? data.pin >= 800 && data.pin <= 100000 : true);

    findRangeForNumber( data.pin? data.pin : 800);
   
  }, [data.pin]);


  const registerUser = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    setIsLoading(true)
    try {
        // Call your POST function with form data
        const response = await axios.post('/api/register', data);
        toast.success("User has been registered!");
        setData({name: "",instagram: "",adtext: "",adtext1: "",adtext2: "",adtext3: "",rewrite:false, pin: null, price: null, daily: null})
      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error('Something went wrong.');
      }
      // router.push('/login')
      setIsLoading(false)
 }

  return (
    <div className="w-full p-16 flex flex-col gap-10 items-center justify-center">
      <div className='font-semibold text-3xl'>PinnedAds</div>
      <form onSubmit={registerUser}  className="flex flex-col w-full lg:w-[50%] items-center justify-start gap-8">
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
        checked={data.rewrite}
        onChange={handleChange}
        className="form-checkbox h-4 w-4 text-indigo-600"
      />
      <span className="text-gray-700">Allow Rewrite?</span>
    </label>
        </div>
        <div className="mb-4 w-full">
        <input
        onChange={handleChange}
        value={data.pin === null ? '' : data.pin}
        id="pin"
        name="pin"
        type="number"
        required
        className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
        placeholder="price per pinned post min. 800 max. 100,000"
        /> 
        {!pinValid && (
            <p className="text-red-500 text-xs">Value from 800 to 100,000</p>
          )}
          {pinValid && (
            <p className="text-gray-300 text-xs">You get Instagram users with following range {price.fbottom} to {price.ftop}</p>
          )}
        </div>
        <input
        onChange={handleChange}
        value={data.price === null ? '' : data.price}
        id="price"
        name="price"
        type="number"
        required
        className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
        placeholder="How many pins do you want"
        /> 
        <p className="text-red-500 text-xs">Value from 800 to 100,000</p>
        <input
        onChange={handleChange}
        value={data.daily === null ? '' : data.daily}
        id="daily"
        name="daily"
        type="number"
        className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
        placeholder="Would you like to have a specific number of pins a day?"
        /> 
        <button type='submit' disabled={isLoading} className="rounded-md relative block w-full px-3 py-2 border border-gray-300 bg-black text-gray-200 sm:text-sm disabled:bg-gray-500">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default page