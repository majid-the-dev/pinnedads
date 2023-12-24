'use client';

import Link from "next/link";
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import prisma from '@/libs/prismadb';

const LoginPage = () => {
    const session = useSession()
    const router = useRouter()
    const [data, setData] = useState({
            email: '',
            password: '',
            userType: 'influencer'
            })

            useEffect(() => {
              if (session?.status === 'authenticated') {
                 router.push(`/influencer`) 
              }
          })

            const authUser = async (e: any) => {
                e.preventDefault()
                signIn('credentials',
                 {...data, redirect: false
                })
                .then((callback) => {
                    if (callback?.error) {
                        toast.error(callback.error)
                    }

                    if(callback?.ok && !callback?.error) {
                        toast.success('Logged in successfully!')
                        setData({email: '',
                        password: '', userType: 'influencer'})
                        router.push(`/influencer`)
                    }
                } )
            }
    

    const handleChange=(e: { target: { id: any; value: any; }; })=>{
        setData({...data,[e.target.id]:e.target.value})
    }


  return (
    <div className="p-16 flex flex-col items-center justify-center">
      <Link href='/'>Pinned Ads</Link>
        <form onSubmit={authUser} className="w-full lg:w-[50%] flex flex-col items-center justify-start gap-8">
        <div className="">
        <h1>Login</h1>
            <p className="mt-2 text-center text-sm text-gray-600 ">
            Dont have an account yet? -
            <Link href='/influencer-signup' className="font-medium hover:text-purple-500">
                Signup
            </Link>
            </p>
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
        <input type="hidden" name="userType" value="influencer" />
          <Link href='/forgot-password' className="text-xs font-medium text-black hover:text-purple-500">
                Forgot Password?
            </Link>
          <div className=''>
          <button type='submit' className='w-full bg-black
           text-white text-xs leading-[30px] rounded-lg px-4 py-1'>Login</button>
          </div>
        </form>
        </div>
  )
}

export default LoginPage