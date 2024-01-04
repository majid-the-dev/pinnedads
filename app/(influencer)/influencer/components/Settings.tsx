import getCurrentInfluencer from '@/actions/get-current-influencer';
import Link from 'next/link';
import SubmitInstaForm from './SubmitInstaForm';

const Settings = async () => {

  const currentUser = await getCurrentInfluencer();


  if (!currentUser) {
    return (
    <div className='my-24'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <h1>Please Signup</h1>
        <Link href='/influencer-signup' className='border border-black rounded-md px-3 py-1' >Sign up</Link>
      </div>
    </div>
    );
  }

  if(!currentUser?.instaVerified){
    return(
      <div className='flex flex-col items-center justify-center gap-5 h-full'>
        <h1>Please verify your Instagram by pinning a comment and submitting the link here</h1>
        <SubmitInstaForm influencer={currentUser}/>
      </div>
    )
  }

  return (
    <div>Settings</div>
  )
}

export default Settings