import React, { useState } from 'react'

export default function AddNewCustomer() {
  const [newWorkOrder, setNewWorkOrder] = useState({
    id: '',
    createdAt: '',
    updatedAt: '',
    title: '',
    discription: '',
    statusFlag: '',
    customerId: '',
    userId: '',
  })
  const handleChange = (e) => {
    setNewWorkOrder((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
    console.log(newWorkOrder)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`/api/customer/addWorkOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: newWorkOrder.id,
        createdAt: newWorkOrder.createdAt,
        updatedAt: newWorkOrder.updatedAt,
        title: newWorkOrder.title,
        discription: newWorkOrder.discription,
        statusFlag: newWorkOrder.statusFlag,
        customerId: newWorkOrder.customerId,
        userId: newWorkOrder.userId,
      }),
    })
    const result = await response.json()
    setNewWorkOrder({
      id: '',
      createdAt: '',
      updatedAt: '',
      title: '',
      discription: '',
      statusFlag: '',
      customerId: '',
      userId: '',
    })
    console.log('newWorkORder', result)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center'>
        <div className='flex justify-center'>
          <h1 className='text-xl mb-4 p-2'>Dodaj novi work Order</h1>
        </div>
        <div className='flex flex-col items-start pb-2'>
          <label className='flex p-2'>Kreirano: </label>
          <input
            onChange={handleChange}
            className='border-solid border-2 w-96 h-12'
            type='time'
            name='createdAt'
          />
        </div>
        <div className='flex flex-col items-start pb-2'>
          <label className='flex p-2'>Updatano: </label>
          <input
            onChange={handleChange}
            className='border-solid border-2 w-96 h-12'
            type='time'
            name='updatedAt'
          />
        </div>
        <div className='flex flex-col items-start pb-2'>
          <label className='flex p-2'>Naslov:</label>
          <input
            onChange={handleChange}
            className='border-solid border-2 w-96 h-12 '
            type='text'
            name='title'
          />
        </div>
        <div className='flex flex-col items-start pb-2'>
          <label className='flex p-2'>Opis:</label>
          <input
            onChange={handleChange}
            className='border-solid border-2 w-96 h-12 '
            type='text'
            name='discription'
          />
        </div>
        <div className='flex flex-col items-start pb-2'>
          <label className='flex p-2'>Status</label>
          <input
            onChange={handleChange}
            className='border-solid border-2 w-96 h-12 '
            type='text'
            name='statusFlag'
          />
        </div>
        <div className='flex flex-col items-start pb-2'>
          <label className='flex p-2'>Stranka</label>
          <input
            onChange={handleChange}
            className='border-solid border-2 w-96 h-12 '
            type='text'
            name='customerId'
          />
        </div>
        <div className='flex flex-col items-start pb-2'>
          <label className='flex p-2'>Zadužena osoba:</label>
          <input
            onChange={handleChange}
            className='border-solid border-2 w-96 h-12 '
            type='text'
            name='userId'
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
