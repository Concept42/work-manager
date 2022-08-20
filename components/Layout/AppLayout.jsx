import React from 'react'

const AppLayout = ({ children }) => {
  return (
    <div className='flex grow-0 h-screen w-screen bg-green-300 justify-center'>
      <div className='flex grow-1 h-screen w-80 bg-blue-300 fixed left-0 '>
        SideBar
      </div>
      {children}
    </div>
  )
}

export default AppLayout
