import React from 'react'
import Link from 'next/link'
import GridViewIcon from '@mui/icons-material/GridView'
import ListAltIcon from '@mui/icons-material/ListAlt'
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import { signOut, useSession } from 'next-auth/react'
import { Button } from '@mui/material'

function Navigation() {
  const { status } = useSession()

  return (
    <div>
      <div className='flex flex-col h-screen items-start ml-6 justify-start '>
        <ul className='flex flex-col fixed items-start gap-4'>
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
                Kupci
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
        <div className='flex flex-col h-screen fixed justify-end'>
          <Button
            variant='outlined'
            color='secondary'
            className=''
            onClick={() => {
              signOut({
                callbackUrl: 'http://localhost:3000/',
              })
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
export default Navigation
