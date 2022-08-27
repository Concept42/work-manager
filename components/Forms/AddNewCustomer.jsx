import React, { useState } from 'react'
import { Input } from '@material-tailwind/react'
import { useSelector, useDispatch } from 'react-redux'
import { cancelButton } from '../../slices/themeSlice'
import { addNewCustomer } from '../../slices/customerSlice'
import { v4 as uuidv4 } from 'uuid'

export default function AddNewCustomer() {
  const contextUser = useSelector((state) => state.userContext)
  const dispatch = useDispatch()

  const [newCustomer, setNewCustomer] = useState({
    id: '',
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    adress: '',
    city: '',
    oib: '',
    phoneNumber: '',
  })

  const handleChange = (e) => {
    setNewCustomer((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
    console.log(newCustomer)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newId = uuidv4()
    setNewCustomer((prev) => {
      return {
        ...prev,
        id: newId,
      }
    })
    cancel()
    dispatch(addNewCustomer(newCustomer))
    const response = await fetch(`/api/customer/addCustomer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: newCustomer.firstName,
        lastName: newCustomer.lastName,
        companyName: newCustomer.companyName,
        email: newCustomer.email,
        adress: newCustomer.adress,
        city: newCustomer.city,
        oib: newCustomer.oib,
        phoneNumber: newCustomer.phoneNumber,
      }),
    })

    setNewCustomer({
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      adress: '',
      city: '',
      oib: '',
      phoneNumber: '',
    })
  }
  const cancel = () => {
    dispatch(cancelButton())
  }

  return (
    <div className='flex flex-col min-w-[500px]  text-font items-start '>
      <div className='flex flex-col w-full h-full justify-between gap-8'>
        <div>
          <Input
            className='flex h-14 '
            label='Ime*'
            variant='outlined'
            onChange={handleChange}
            type='text'
            name='firstName'
            value={newCustomer.firstName}
          />
        </div>
        <div>
          <Input
            className='flex h-14'
            label='Prezime*'
            variant='outlined'
            onChange={handleChange}
            type='text'
            name='lastName'
            value={newCustomer.lastName}
          />
        </div>
        <div>
          <Input
            className='flex h-14'
            label='Ime tvrtke*'
            variant='outlined'
            onChange={handleChange}
            type='text'
            name='companyName'
            value={newCustomer.companyName}
          />
        </div>
        <div>
          <Input
            className='flex h-14'
            label='OIB*'
            variant='outlined'
            onChange={handleChange}
            type='text'
            name='oib'
            value={newCustomer.oib}
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
            value={newCustomer.email}
          />
        </div>
        <div>
          <Input
            className='flex h-14'
            label='Adresa*'
            variant='outlined'
            onChange={handleChange}
            type='text'
            name='adress'
            value={newCustomer.adress}
          />
        </div>
        <div>
          <Input
            className='flex h-14'
            label='Grad*'
            variant='outlined'
            onChange={handleChange}
            type='text'
            name='city'
            value={newCustomer.city}
          />
        </div>
        <div>
          <Input
            className='flex h-14'
            label='Broj telefona*'
            variant='outlined'
            onChange={handleChange}
            type='text'
            name='phoneNumber'
            value={newCustomer.phoneNumber}
          />
        </div>

        <div className='flex justify-end gap-4'>
          {!contextUser.editMode ? (
            <>
              <button
                onClick={cancel}
                className='flex px-4 py-6 rounded-2xl text-[14px] font-semibold text-buttonText  hover:bg-primary hover:bg-opacity-40'
              >
                Odustani
              </button>
              <button
                onClick={handleSubmit}
                className='flex bg-accent px-4 py-6 rounded-2xl text-[14px] font-semibold text-buttonText  hover:opacity-70'
              >
                Dodaj
              </button>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
      {contextUser.editMode ? (
        <div className='flex gap-4 w-full justify-end'>
          <button
            onClick={cancel}
            className='flex px-4 py-6 rounded-2xl text-[14px] font-semibold text-buttonText  hover:bg-primary hover:bg-opacity-40'
          >
            Odustani
          </button>
          <button
            onClick={handleUpdateData}
            className='flex bg-accent px-4 py-6 rounded-2xl text-[14px] font-semibold text-buttonText  hover:opacity-70'
          >
            Update
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
