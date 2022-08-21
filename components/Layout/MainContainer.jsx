import React from 'react'

const MainContainer = ({ children }) => {
  return (
    <div className='grid grid-flow-col grid-cols-[300px_minmax(0,_1fr)] h-screen'>
      {children}
    </div>
  )
}

export default MainContainer
