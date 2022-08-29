import React from 'react'
import MainContainer from './MainContainer'
import Sidebar from '../Layout/Sidebar'
import Application from '../Layout/Application'
import { useSession } from 'next-auth/react'
import Topbar from '../Ui/Topbar'

const AppLayout = ({ children }) => {
  const { data: session } = useSession()
  return (
    <div className='flex flex-col'>
      <div className='sticky top-0 w-full h-16 '>
        <Topbar />
      </div>
      <div className='flex h-screen'>
        <div className='flex-[1] bg-white'>SideBar</div>
        <div className='flex-[6] px-7 py-16 '>
          <div className=' w-full h-full'>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default AppLayout
