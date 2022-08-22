import React, { useState } from 'react'
import { Input } from '@material-tailwind/react'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'

export default function AddNewUser(props) {
  const [newUser, setNewUser] = useState({
    id: '',
    name: '',
    email: '',
    role: '',
  })

  const handleChange = (e) => {
    setNewUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
    console.log(newUser)
  }
  const handleRoleChange = (e) => {
    setNewUser((prev) => {
      return { ...prev, role: e.target.value }
    })
    console.log(newUser)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`/api/customer/addUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      }),
    })
    const result = await response.json()
    setNewUser({
      name: '',
      email: '',
      role: '',
    })
    console.log(result)
  }

  return (
    <div className='flex flex-col min-w-[500px]  text-font items-start '>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col w-full h-full justify-between gap-8'
      >
        <div className='flex flex-col items-start pb-2 text-font'>
          <Input
            className='flex h-14 '
            label='Ime i prezime*'
            variant='outlined'
            onChange={handleChange}
            type='text'
            name='name'
          />
        </div>
        <div className='flex flex-col items-start pb-2 text-font'>
          <Input
            className='flex h-14'
            label='Email*'
            variant='outlined'
            onChange={handleChange}
            type='email'
            name='email'
          />
        </div>
        <FormControl className='text-font'>
          <InputLabel variant='outlined' className='text-font' id='role'>
            Role
          </InputLabel>
          <Select
            onChange={handleRoleChange}
            labelId='role'
            id='role'
            label='Role'
            value={newUser.role}
            className='text-font'
          >
            <MenuItem>
              <em>Odaberi role</em>
            </MenuItem>
            <MenuItem value='USER'>USER</MenuItem>
            <MenuItem value='ADMIN'>ADMIN</MenuItem>
          </Select>
        </FormControl>

        <div className='flex justify-end'>
          <button
            type='submit'
            className='flex border-solid border-4 border-black h-12 w-24 justify-center items-center mt-4 '
          >
            Dodaj
          </button>
        </div>
      </form>
    </div>
  )
}
