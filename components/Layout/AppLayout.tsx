import React from 'react'
import { useSession } from 'next-auth/react'
import Topbar from '../Ui/Topbar'
import { useAppSelector } from '../../utils/hooks'
import Sidebar from '../Ui/Sidebar'

interface AppLayoutProps {
  children?: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const openSidebar = useAppSelector((state) => state.themeContext.openSidebar)
  const { data: session } = useSession()

  return (
    <div className='flex flex-col'>
      {!session ? (
        <div className='flex-[6] px-7 py-16 '>
          <div className=' w-full h-full'>{children}</div>
        </div>
      ) : (
        <>
          <div className='sticky top-0 w-full h-16 '>
            <Topbar />
          </div>

          <div className='flex h-screen '>
            {openSidebar ? (
              <div className=' left-0 top-16 h-full min-w-[250px] bg-white '>
                <Sidebar />
              </div>
            ) : (
              ''
            )}

            <div className='flex-[6] px-7 py-16 '>
              <div className=' w-full h-full'>{children}</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
