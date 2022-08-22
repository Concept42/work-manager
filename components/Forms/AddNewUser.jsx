import React, { useState } from 'react'
import { Input } from '@material-tailwind/react'
import { Select, Option } from '@material-tailwind/react'

export default function AddNewUser(props) {
  const [newUser, setNewUser] = useState({
    id: '',
    name: '',
    email: '',
    role: '',
  })
  const [singleUser, setSingleUser] = useState(props.singleUser)

 
  const handleChange = (e) => {
    setNewUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
    console.log(newUser)
  }
  const handleRoleChange = (e) => {
    setNewUser((prev) => {
      return { ...prev, role: e }
    })
    console.log(newUser)
  }

  const handleSubmit = async (e) => {
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
    props.cancelButton
  }

  return (
    <div className='flex flex-col min-w-[500px]  text-font items-start '>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col w-full h-full justify-between gap-8'
      >
        <div>
          <Input
            className='flex h-14 '
            label='Ime i prezime*'
            variant='outlined'
            onChange={handleChange}
            type='text'
            name='name'
          />
        </div>
        <div>
          <Input
            className='flex h-14'
            label='Email*'
            variant='outlined'
            onChange={handleChange}
            type='email'
            name='email'
          />
        </div>

        <Select
          id='role'
          label='Role'
          onChange={handleRoleChange}
          className='h-14'
        >
          <Option value='USER'>USER</Option>
          <Option value='ADMIN'>ADMIN</Option>
        </Select>

        <div className='flex justify-end gap-4'>
          <button
            onClick={props.cancelButton}
            className='flex px-4 py-6 rounded-2xl text-[14px] font-semibold text-buttonText  hover:bg-primary hover:bg-opacity-40'
          >
            Odustani
          </button>
          <button
            type='submit'
            className='flex bg-accent px-4 py-6 rounded-2xl text-[14px] font-semibold text-buttonText  hover:opacity-70'
          >
            Dodaj
          </button>
        </div>
      </form>
    </div>
  )
}
