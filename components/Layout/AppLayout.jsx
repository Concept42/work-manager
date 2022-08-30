import React from 'react'

import { useSession } from 'next-auth/react'
import Topbar from '../Ui/Topbar'
import { useSelector } from 'react-redux'

const AppLayout = ({ children }) => {
  const openSidebar = useSelector((state) => state.themeContext.openSidebar)
  const { data: session } = useSession()

  return (
    <div className='flex flex-col'>
      <div className='sticky top-0 w-full h-16 '>
        <Topbar />
      </div>
      <div className='flex h-screen '>
        {openSidebar ? (
          <div className='flex-[1] max-w-[350px] bg-white '>SideBar</div>
        ) : (
          ''
        )}

        <div className='flex-[6] px-7 py-16 '>
          <div className=' w-full h-full'>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default AppLayout
