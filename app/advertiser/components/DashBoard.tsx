import React from 'react'
import DashBoardIntro from './DashBoardIntro'
import Active from './Active'
import Audience from './Audience'

const DashBoard = () => {
  return (
    <div className='flex flex-col h-full items-center py-4 px-4 border border-black'>
        <DashBoardIntro/>
        <Active/>
        <Audience/>
    </div>
  )
}

export default DashBoard