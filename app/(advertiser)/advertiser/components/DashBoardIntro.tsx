import getCurrentUser from '@/actions/get-current-user'

const DashBoardIntro = async() => {

  const currentUser = await getCurrentUser();

  return (
    <div className='w-full flex flex-none h-auto items-center justify-between'>
        <h1>Hello {currentUser?.fname},</h1>
        <div className='border border-black rounded-xl px-3 py-1'>0.00</div>
    </div>
  )
}

export default DashBoardIntro