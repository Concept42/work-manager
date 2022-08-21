import React from 'react'

const Application = ({ children }) => {
  return (
    <div className='flex flex-col px-16 py-10  bg-primary font-nunito '>
      {children}
    </div>
  )
}

export default Application
