import React from 'react'
import Topbar from '../Ui/Topbar'

const Application = ({ children }) => {
  return (
    <div className='flex flex-col bg-primary font-nunito '>
      <Topbar />
      {children}
    </div>
  )
}

export default Application
