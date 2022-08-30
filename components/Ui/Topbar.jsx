import React, { useState } from 'react'
import Image from 'next/image'
import { openSidebar } from '../../slices/themeSlice'
import { useDispatch } from 'react-redux'
import { useSession } from 'next-auth/react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

function Topbar() {
  const { status, data } = useSession()
  const dispatch = useDispatch()

  const handleOpen = () => {
    dispatch(openSidebar())
  }
  return (
    <div className='flex w-screen h-full items-center bg-white'>
      <div className='flex flex-[1] max-w-[427px] justify-between items-center   '>
        <h1 className='flex w-[85%] justify-center '>WORK MANAGER</h1>
        <div className='flex' onClick={handleOpen}>
          <label tabIndex='0' className='btn btn-ghost btn-circle'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h7'
              />
            </svg>
          </label>
        </div>
      </div>
      <div className='flex flex-[5] w-screen justify-end'>
        <div className='flex h-full bg-yellow-400'>
          <div className='avatar'>
            <div className='w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
              <Image src={data.user.image} alt='Slika' />
            </div>
          </div>
          <div className='dropdown'>
            <label tabIndex='0' className='flex px-2'>
              {data.user.name}
              <ArrowDropDownIcon />
            </label>
            <ul
              tabIndex='0'
              className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52'
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar
