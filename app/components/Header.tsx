import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='py-10 px-16 flex items-center justify-between'>
        <Link href='/'>
        PINNED ADS
        </Link>
    </div>
  )
}

export default Header