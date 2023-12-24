import Image from 'next/image'
import Link from 'next/link'
import Header from './components/Header'

export default function Home() {
  return (
    <div className='flex flex-col items-start justify-start gap-10'>
    <Header/>
    <main className="w-full flex items-center justify-center gap-16 p-24">
      <div className='flex flex-col items-center justify-start gap-8 border border-black rounded-md p-16'>
        <h1>ADVERTISER</h1>
        <Link href='/advertiser-signup' className='bg-black px-3 py-1 text-white rounded-md'>Sign Up</Link>
        <Link href='/advertiser-login' className='bg-black px-3 py-1 text-white rounded-md'>Login</Link>
      </div>
      <div className='flex flex-col items-center justify-start gap-8 border border-black rounded-md p-16'>
        <h1>PinnedAds Influencer</h1>
        <Link href='/influencer-signup' className='bg-black px-3 py-1 text-white rounded-md'>Sign Up</Link>
        <Link href='/influencer-login' className='bg-black px-3 py-1 text-white rounded-md'>Login</Link>
      </div>
    </main>
    </div>
  )
}
