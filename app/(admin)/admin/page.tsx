
import { DashNav } from './components/DashboardNav'
import Link from 'next/link';
import Support from './components/Support';
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import Logout from './components/Logout';
import PinHome from './components/PinHome';
import VerifyInstagram from './components/VerifyInstagram';
import PendingPins from './components/PendingPins';
import getPendingPins from '@/actions/get-pending-pins';
import ApprovedPins from './components/ApprovedPins';
import getApprovedPins from '@/actions/get-approved-pins';

const page = async({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {

  const session = await getServerSession(authOptions)
  const pending = await getPendingPins();
  const approved = await getApprovedPins();

  const page = typeof searchParams.p === 'string' ? searchParams.p : 'dashboard' ;

  if(!session){
    return(
      <div className='flex flex-col items-center justify-center gap-4 h-screen'>
        <h1>Sign In to Access page</h1>
        <Link href={'/admin-login'} className='bg-black text-white rounded-md px-4 py-1'>Sign In</Link>
      </div>
    )
  }
    
  return (
    <div className='flex flex-col items-center justify-start w-full h-[100vh]'>
    <DashNav/>
    <div className='w-full h-full grid grid-cols-8 items-start'>
        <div className='h-full col-span-2 flex flex-col items-start justify-between border border-black'>
            <ul className='h-full flex flex-col items-start justify-start w-full'>
                <Link href={`/admin?p=dashboard`} scroll={false} className='border-b border-black pl-14 w-full py-4'> ADMIN DASHBOARD</Link>
                <Link href={`/admin?p=pending`} scroll={false} className='border-b border-black pl-14 w-full py-4'>PENDING PINS</Link>
                <Link href={`/admin?p=running`} scroll={false} className='border-b border-black pl-14 w-full py-4'>RUNNING PINS</Link>
                <Link href={`/admin?p=verify`} scroll={false} className='border-b border-black pl-14 w-full py-4'>VERIFY INSTAGRAM</Link>
                <Link href={`/admin?p=settings`} scroll={false} className='border-b border-black pl-14 w-full py-4'>TOPUP ACCOUNT</Link>
            </ul>
            <Logout/>
        </div>
        <div className='col-span-6 h-full'>
            {page === 'dashboard' && <PinHome/>}
            {page === 'pending' && <PendingPins pins={pending}/>}
            {page === 'running' && <ApprovedPins pins={approved}/>}
            {page === 'verify' && <VerifyInstagram/>}
            {page === 'support' && <Support/>}
        </div>
    </div>
    </div>
  )

   
}

export default page