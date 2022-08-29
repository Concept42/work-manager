import React from 'react'
import Topbar from '../Ui/Topbar'

const Application = ({ children }) => {
  return (
    <div className=' flex flex-col '>
      <div className='flex'>
        <Topbar />
      </div>
      <div className='flex flex-col font-nunito w-full h-full'>{children}</div>
    </div>
  )
}

export default Application
