import React, { useState } from 'react'

export default function AddNewUser() {
  const [newUser, setNewUser] = useState({
    id: '',
    name: '',
    role: '',
  })

  const handleChange = (e) => {
    setNewUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
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
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
      }),
    })
    const result = await response.json()
    setNewUser({
      id: '',
      firstName: '',
      lastName: '',
      role: '',
    })
    console.log(result)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center'>
        <div className='flex justify-center'>
          <h1 className='text-xl mb-4 p-2'>Dodaj novi kontakt</h1>
        </div>
        <div className='flex flex-col items-start pb-2'>
          <label className='flex p-2'>Ime i Prezime</label>
          <input
            onChange={handleChange}
            className='border-solid border-2 w-96 h-12'
            type='text'
            name='name'
          />
        </div>
        <div className='flex flex-col items-start pb-2'>
          <label className='flex p-2'>Role</label>
          <input
            onChange={handleChange}
            className='border-solid border-2 w-96 h-12 '
            type='text'
            name='role'
          />
        </div>
        <button
          type='submit'
          className='flex border-solid border-4 border-black h-12 w-24 justify-center items-center mt-4 '
        >
          Dodaj
        </button>
      </form>
    </div>
  )
}
