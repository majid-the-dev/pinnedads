"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { countries } from "@/public/data/country-list";
import { useState } from "react";
import Link from "next/link";

const page = () => {
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });

 

  const handleChange = (e: { target: { id: any; value: any } }) => {
    setData({ ...data, [e.target.id]: e.target.value});

    if (e.target.id === 'cpassword') {
        setPasswordMatch(data.password === e.target.value);
      }

      // if (data.country === '') {
      //   setIsLoading(true);
      // }else{
      //   setIsLoading(false)
      // }
  };

  const registerUser = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    setIsLoading(true)
    try {
        // Call your POST function with form data
        const response = await axios.post('/api/register', data);
        toast.success("User has been registered!");
        setData({fname: "",lname: "",email: "", password: "",cpassword: ""})
      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error(`Something went wrong. ${error}`);
      }
      // router.push('/login')
      setIsLoading(false)
 }

  return (
    <div className="p-16 flex flex-col items-center justify-center">
      <Link href='/'>Pinned Ads</Link>
      <form onSubmit={registerUser}  className="flex flex-col items-center justify-start gap-8">
        <h1>Sign Up</h1>
        <div className="w-full flex items-center justify-center gap-8">
          <input
            onChange={handleChange}
            value={data.fname}
            id="fname"
            name="fname"
            type="name"
            required
            className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
            placeholder="Fisrtname"
          />
          <input
          onChange={handleChange}
          value={data.lname}
          id="lname"
          name="lname"
          type="name"
          required
            className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
            placeholder="Lastname"
          />
        </div>
        <input
        onChange={handleChange}
        value={data.email}
        id="email"
        name="email"
        type="email"
        required
          className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
          placeholder="Email"
        />
        <input
        onChange={handleChange}
        value={data.password}
        id="password"
        name="password"
        type="password"
        required
          className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
          placeholder="Password"
        />
        <div className="mb-4 w-full">
        <input
        onChange={handleChange}
        value={data.cpassword}
        id="cpassword"
        name="cpassword"
        type="password"
        required
          className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
          placeholder="Confirm Password"
        />
         {!passwordMatch && (
            <p className="text-red-500 text-xs">Password and Confirm Password must match.</p>
          )}
          </div>
        <button type='submit' disabled={!passwordMatch || isLoading} className="rounded-md relative block w-full px-3 py-2 border border-gray-300 bg-black text-gray-200 sm:text-sm disabled:bg-gray-500">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default page;