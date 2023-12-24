import React from 'react'
import DashBoardIntro from './DashBoardIntro'
import Active from './Active'
import Pins from './Pins';



const DashBoard = () => {
  return (
    <div className='flex flex-col gap-5 h-full items-center py-4 px-4 border border-black'>
        <DashBoardIntro/>
        <Active />
        <Pins />
    </div>
  )
}

export default DashBoard