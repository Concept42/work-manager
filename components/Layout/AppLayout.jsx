import React from 'react'
import { useSession } from 'next-auth/react'
import Topbar from '../Ui/Topbar'
import { useSelector } from 'react-redux'
import Sidebar from '../Ui/Sidebar'

const AppLayout = ({ children }) => {
  const openSidebar = useSelector((state) => state.themeContext.openSidebar)
  const { data: session } = useSession()

  return (
    <div className='flex flex-col'>
      {/* TOPBAR */}
      <div className='sticky top-0 w-full h-16 '>
        <Topbar />
      </div>
      {/* SIDEBAR */}
      <div className='flex h-screen '>
        {openSidebar ? (
          <div className=' left-0 top-16 h-full min-w-[250px] bg-white '>
            <Sidebar />
          </div>
        ) : (
          ''
        )}
        {/* APP */}
        <div className='flex-[6] px-7 py-16 '>
          <div className=' w-full h-full'>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default AppLayout
