import React from 'react'
import Navigation from '../Ui/Navigation'
import { useSession } from 'next-auth/react'

const Sidebar = () => {
  const { data: session } = useSession()

  return (
    <div className='bg-secondary text-font text-[16px] font-extralight'>
      <Navigation />
    </div>
  )
}

export default Sidebar
