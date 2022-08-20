import React from 'react'
import Image from 'next/image'
import Logo from '../../Assets/WORK.png'
import Button from '@mui/material/Button'

function Navigation() {
  return (
    <div>
      <div className='flex flex-col h-screen items-center justify-center  '>
        <ul className='flex flex-col fixed items-start gap-8 text-[]'>
          <h1>WORK MANAGER</h1>
          <li>Dashboard</li>

          <li>Radni nalozi</li>
          <li>Kupci</li>
          <li>Zaposlenici</li>
        </ul>
      </div>
    </div>
  )
}
export default Navigation
