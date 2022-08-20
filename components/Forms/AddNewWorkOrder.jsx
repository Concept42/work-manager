import React, { useState, useEffect } from 'react'

export default function AddNewCustomer({ listCustomer, listUser, listStatus }) {
  const [newWorkOrder, setNewWorkOrder] = useState({
    title: '',
    discription: '',
    statusFlag: 'U izradi',
    customerId: '',
    userId: '',
  })

  const users = listUser
  const customer = listCustomer

  const handleChange = (e) => {
    setNewWorkOrder((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
    console.log(newWorkOrder)
  }

  const handleSubmit = async (e) => {
    const response = await fetch(`/api/customer/addWorkOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newWorkOrder.title,
        discription: newWorkOrder.discription,
        statusFlag: newWorkOrder.statusFlag,
        customerId: newWorkOrder.customerId,
        userId: newWorkOrder.userId,
      }),
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center'>
        <div className='flex justify-center'>
          <h1 className='text-xl mb-4 p-2'>Dodaj novi work Order</h1>
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

        <div>
          <span>Stranka: </span>
          <select name='customerId' onChange={handleChange}>
            <option>Odaberi stranku</option>
            {customer.map((customer) => {
              return (
                <option key={customer.id} value={customer.id}>
                  {customer.firstName}
                </option>
              )
            })}
          </select>
          <div>
            <span>Korisnik: </span>
            <select name='userId' onChange={handleChange} defaultValue=''>
              <option>Odaberi korisnikaaa</option>
              {users.length > 0 &&
                users.map((user) => {
                  return (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  )
                })}
            </select>
          </div>
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
