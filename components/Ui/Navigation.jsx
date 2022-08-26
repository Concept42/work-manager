import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import GridViewIcon from '@mui/icons-material/GridView'
import ListAltIcon from '@mui/icons-material/ListAlt'
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import LogoutIcon from '@mui/icons-material/Logout'
import { signOut, useSession } from 'next-auth/react'
import Avatar from '@mui/material/Avatar'

function Navigation() {
  const { status, data } = useSession()
  console.log(data)

  return (
    <div>
      <div className='flex flex-col h-screen items-start ml-6 justify-between fixed font-nunito font-normal'>
        <ul className='flex flex-col items-start gap-4'>
          <h1 className='flex my-12 text-[26px]'>WORK MANAGER</h1>
          <Link href='/'>
            <li className='flex h-16 w-60 items-center hover:border-solid hover:rounded-2xl hover:bg-primary cursor-pointer '>
              <div className='flex gap-4'>
                <GridViewIcon className='ml-6' />
                Dashboard
              </div>
            </li>
          </Link>
          <Link href='/workorders'>
            <li className='flex h-16 w-60 items-center hover:border-solid hover:rounded-2xl hover:bg-primary cursor-pointer '>
              <div className='flex gap-4'>
                <ListAltIcon className='ml-6' />
                Radni Nalozi
              </div>
            </li>
          </Link>
          <Link href='/customers'>
            <li className='flex h-16 w-60 items-center hover:border-solid hover:rounded-2xl hover:bg-primary cursor-pointer'>
              <div className='flex gap-4'>
                <SettingsAccessibilityIcon className='ml-6' />
                Stranke
              </div>
            </li>
          </Link>
          <Link href='/users'>
            <li className='flex h-16 w-60 items-center hover:border-solid hover:rounded-2xl hover:bg-primary cursor-pointer'>
              <div className='flex gap-4'>
                <PeopleAltIcon className='ml-6' />
                Zaposlenici
              </div>
            </li>
          </Link>
        </ul>
        <div className='flex flex-col items-center gap-6 '>
          <div
            onClick={() => {
              signOut({
                callbackUrl: 'http://localhost:3000/',
              })
            }}
            className='flex h-16 w-32 ml-11 justify-center items-center hover:border-solid hover:rounded-2xl hover:bg-primary cursor-pointer '
          >
            <div className='flex gap-4'>
              <LogoutIcon className='' />
              Logout
            </div>
          </div>
          <div className='flex items-center gap-6 mb-6 ml-8'>
            <Avatar src={data.user.image} />
            <h3>{data.user.name}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Navigation
