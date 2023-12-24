import getCurrentInfluencer from '@/actions/get-current-influencer';

const DashBoardIntro = async() => {

  const currentUser = await getCurrentInfluencer();

  return (
    <div className='w-full flex flex-none h-auto items-center justify-between'>
        <h1>Hello {currentUser?.fname},</h1>
        <div className='border border-black rounded-xl px-3 py-1'>0.00</div>
    </div>
  )
}

export default DashBoardIntro