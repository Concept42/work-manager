import React, { useState } from 'react'

export default function AddNewUser(props) {
  const [newUser, setNewUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    adress: '',
    city: '',
    oib: null,
    phoneNumber: null,
  })

  const handleChange = (e) => {
    setNewUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
    console.log(newUser)
  }

  return (
    <div>
      <form className='flex flex-col justify-center'>
        <div className='flex justify-center'>
          <h1 className='text-xl mb-4 p-2'>Dodaj novi kontakt</h1>
        </div>
        <div className='flex flex-col items-start pb-2'>
          <label className='flex p-2'>Ime</label>
          <input
            onChange={handleChange}
            className='border-solid border-2 w-96 h-12'
            type='text'
            name='firstName'
          />
        </div>
        <div className='flex flex-col items-start pb-2'>
          <label className='flex p-2'>Prezime</label>
          <input
            onChange={handleChange}
            className='border-solid border-2 w-96 h-12'
            type='text'
            name='lastName'
          />
        </div>
        <div className='flex flex-col items-start pb-2'>
          <label className='flex p-2'>Ime tvrtke</label>
          <input
            onChange={handleChange}
            className='border-solid border-2 w-96 h-12 '
            type='text'
            name='companyName'
          />
        </div>
        <div className='flex flex-col items-start pb-2'>
          <label className='flex p-2'>Oib</label>
          <input
            onChange={handleChange}
            className='border-solid border-2 w-96 h-12 '
            type='number'
            name='oib'
          />
        </div>

        <div className='flex flex-col items-start pb-2'>
          <label className='flex p-2'>Email</label>
          <input
            onChange={handleChange}
            className='border-solid border-2 w-96 h-12 '
            type='email'
            name='email'
          />
        </div>
        <div className='flex flex-col items-start pb-2'>
          <label className='flex p-2'>Adresa</label>
          <input
            onChange={handleChange}
            className='border-solid border-2 w-96 h-12 '
            type='text'
            name='adress'
          />
        </div>
        <div className='flex flex-col items-start pb-2'>
          <label className='flex p-2'>Grad</label>
          <input
            onChange={handleChange}
            className='border-solid border-2 w-96 h-12 '
            type='text'
            name='city'
          />
        </div>
        <div className='flex flex-col items-start pb-2'>
          <label className='flex p-2'>Broj telefona</label>
          <input
            onChange={handleChange}
            className='border-solid border-2 w-96 h-12 '
            type='tel'
            name='phoneNumber'
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
