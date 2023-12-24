import React from 'react'

const Audience = () => {
  return (
    <div className='w-full flex flex-col flex-auto h-full items-start justify-start gap-4'>
        <h1>popular audience categories</h1>
        <div className='w-full grid grid-cols-4 items-center gap-2'>
            <div className='col-span-1 border border-black px-2 py-1'>Fashion</div>
            <div className='col-span-1 border border-black px-2 py-1'>Music</div>
            <div className='col-span-1 border border-black px-2 py-1'>Art</div>
            <div className='col-span-1 border border-black px-2 py-1'>Politics</div>
            <div className='col-span-1 border border-black px-2 py-1'>Movies</div>
            <div className='col-span-1 border border-black px-2 py-1'>Sports</div>
            <div className='col-span-1 border border-black px-2 py-1'>Food</div>
            <div className='col-span-1 border border-black px-2 py-1'>Lifestyle</div>
        </div>
    </div>
  )
}

export default Audience