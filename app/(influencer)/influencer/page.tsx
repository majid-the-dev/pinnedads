
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import { DashNav } from './components/DashboardNav'
import DashBoard from './components/DashBoard';
import Link from 'next/link';
import Settings from './components/Settings';
import Topup from './components/Topup';
import Support from './components/Support';
import Logout from './components/Logout';
import Campaigns from './components/Campaigns';

const page = async({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {

    const session = await getServerSession(authOptions)
    const page = typeof searchParams.p === 'string' ? searchParams.p : 'dashboard' ;

    if(!session){
        return(
          <div className='flex flex-col items-center justify-center gap-4 h-screen'>
            <h1>Sign In to Access page</h1>
            <Link href={'/influencer-login'} className='bg-black text-white rounded-md px-4 py-1'>Sign In</Link>
          </div>
        )
      }
    
  return (
    <div className='flex flex-col items-center justify-start w-full h-[100vh]'>
    <DashNav/>
    <div className='w-full h-full grid grid-cols-8 items-start'>
        <div className='h-full col-span-2 flex flex-col items-start justify-between border border-black'>
            <ul className='h-full flex flex-col items-start justify-start w-full'>
                <Link href={`/influencer?p=dashboard`} scroll={false} className='border-b border-black pl-14 w-full py-4'>INFLUENCER DASHBOARD</Link>
                <Link href={`/influencer?p=campaigns`} scroll={false} className='border-b border-black pl-14 w-full py-4'>PINS</Link>
                <Link href={`/influencer?p=settings`} scroll={false} className='border-b border-black pl-14 w-full py-4'>ACCOUNT SETTINGS</Link>
                <Link href={`/influencer?p=topup`} scroll={false} className='border-b border-black pl-14 w-full py-4'>EARNINGS</Link>
                <Link href={`/influencer?p=support`} scroll={false} className='border-b border-black pl-14 w-full py-4'>SUPPORT</Link>
            </ul>
            <Logout/>
        </div>
        <div className='col-span-6 h-full'>
            {page === 'dashboard' && <DashBoard/>}
            {page === 'campaigns' && <Campaigns/>}
            {page === 'settings' && <Settings/>}
            {page === 'topup' && <Topup/>}
            {page === 'support' && <Support/>}
        </div>
    </div>
    </div>
  )

   
}

export default page