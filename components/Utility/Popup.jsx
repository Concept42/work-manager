import React from 'react'

export const Popup = ({ children }) => {
  return (
    <div>
      <div className='flex w-full h-full fixed justify-center items-center  bg-black  opacity-60'></div>
      <div className='flex w-full h-full fixed justify-center items-center '>
        <div className='flex flex-col min-w-[550px]  bg-secondary text-font text-[20px] font-bold p-5 rounded-2xl '>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Popup
