import React, { useEffect, useState } from 'react'
import { Input } from '@material-tailwind/react'
import { useAppSelector, useAppDispatch } from '../../utils/hooks'
import { handleUserPopup } from '../../slices/themeSlice'
import {
  addNewCustomer,
  updateCustomer,
  updateCustomerForm,
  updatedCustomer,
  setEditMode,
} from '../../slices/customerSlice'
import { v4 as uuidv4 } from 'uuid'
import { useForm } from 'react-hook-form'
import { customerSchema } from '../Forms/FormValidate'
import { yupResolver } from '@hookform/resolvers/yup'

interface CustomerFormInputs {
  id: string
  firstName: string
  lastName: string
  companyName: string
  email: string
  adress: string
  city: string
  oib: number
  phoneNumber: number
}

const AddNewCustomer: React.FC = () => {
  const editMode = useAppSelector((state) => state.userContext.editMode)
  const globalCustomer = useAppSelector(updatedCustomer)
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormInputs>({
    defaultValues: {
      id: globalCustomer.id,
      firstName: globalCustomer.firstName,
      lastName: globalCustomer.lastName,
      companyName: globalCustomer.companyName,
      email: globalCustomer.email,
      adress: globalCustomer.adress,
      city: globalCustomer.city,
      oib: globalCustomer.oib,
      phoneNumber: globalCustomer.phoneNumber,
    },
    resolver: yupResolver(customerSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    if (Object.keys(errors).length === 0) {
      dispatch(addNewCustomer(data))
      cancel()
      const response = await fetch(`/api/customer/addCustomer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          companyName: data.companyName,
          email: data.email,
          adress: data.adress,
          city: data.city,
          oib: data.oib,
          phoneNumber: data.phoneNumber,
        }),
      })
    }
  })

  const handleUpdateData = handleSubmit(async (data) => {
    if (Object.keys(errors).length === 0) {
      dispatch(updateCustomer(data))
      cancel()

      const response = await fetch(`/api/customer/updateCustomerData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          companyName: data.companyName,
          email: data.email,
          adress: data.adress,
          city: data.city,
          oib: data.oib,
          phoneNumber: data.phoneNumber,
        }),
      })
    }
  })

  const cancel = () => {
    dispatch(handleUserPopup(''))
    dispatch(
      updateCustomerForm({
        id: '',
        firstName: '',
        lastName: '',
        companyName: '',
        email: '',
        adress: '',
        city: '',
        oib: null,
        phoneNumber: null,
      }),
    )
    dispatch(setEditMode(false))
  }

  return (
    <form onSubmit={onSubmit} className='flex flex-col min-w-[500px]  text-font items-start '>
      <div className='flex flex-col w-full h-full justify-between gap-8'>
        <div className='form-control w-full max-w-2xl'>
          <input
            className={
              errors.firstName
                ? 'input input-bordered input-error w-full max-w-lg'
                : 'input input-bordered w-full max-w-lg'
            }
            {...register('firstName')}
            type='text'
            placeholder='First Name*'
            name='firstName'
          />
          {errors.firstName && <p className='text-error pt-2 '>{errors.firstName.message}</p>}
        </div>
        <div className='form-control w-full max-w-2xl'>
          <input
            className={
              errors.lastName
                ? 'input input-bordered input-error w-full max-w-lg'
                : 'input input-bordered w-full max-w-lg'
            }
            {...register('lastName')}
            type='text'
            placeholder='Last Name*'
            name='lastName'
          />
          {errors.lastName && <p className='text-error pt-2 '>{errors.lastName.message}</p>}
        </div>
        <div className='form-control w-full max-w-2xl'>
          <input
            className={
              errors.companyName
                ? 'input input-bordered input-error w-full max-w-lg'
                : 'input input-bordered w-full max-w-lg'
            }
            {...register('companyName')}
            type='text'
            placeholder='Company*'
            name='companyName'
          />
          {errors.companyName && <p className='text-error pt-2 '>{errors.companyName.message}</p>}
        </div>
        <div className='form-control w-full max-w-2xl'>
          <input
            className={
              errors.email ? 'input input-bordered input-error w-full max-w-lg' : 'input input-bordered w-full max-w-lg'
            }
            {...register('email')}
            type='email'
            placeholder='Email*'
            name='email'
          />
          {errors.email && <p className='text-error pt-2 '>{errors.email.message}</p>}
        </div>
        <div className='form-control w-full max-w-2xl'>
          <input
            className={
              errors.adress
                ? 'input input-bordered input-error w-full max-w-lg'
                : 'input input-bordered w-full max-w-lg'
            }
            {...register('adress')}
            type='text'
            placeholder='Address*'
            name='adress'
          />
          {errors.adress && <p className='text-error pt-2 '>{errors.adress.message}</p>}
        </div>
        <div className='form-control w-full max-w-2xl'>
          <input
            className={
              errors.city ? 'input input-bordered input-error w-full max-w-lg' : 'input input-bordered w-full max-w-lg'
            }
            {...register('city')}
            type='text'
            placeholder='City*'
            name='city'
          />
          {errors.city && <p className='text-error pt-2 '>{errors.city.message}</p>}
        </div>
        <div className='form-control w-full max-w-2xl'>
          <input
            className={
              errors.oib ? 'input input-bordered input-error w-full max-w-lg' : 'input input-bordered w-full max-w-lg'
            }
            {...register('oib')}
            type='text'
            placeholder='Oib*'
            name='oib'
          />
          {errors.oib && <p className='text-error pt-2 '>{errors.oib.message}</p>}
        </div>
        <div className='form-control w-full max-w-2xl'>
          <input
            className={
              errors.phoneNumber
                ? 'input input-bordered input-error w-full max-w-lg'
                : 'input input-bordered w-full max-w-lg'
            }
            {...register('phoneNumber')}
            type='text'
            placeholder='Phone Number*'
            name='phoneNumber'
          />
          {errors.phoneNumber && <p className='text-error pt-2 '>{errors.phoneNumber.message}</p>}
        </div>

        <div className='flex justify-end gap-4'>
          {!editMode ? (
            <>
              <button onClick={cancel} className='btn btn-outline btn-md'>
                Odustani
              </button>
              <button type='submit' className='btn btn-info btn-md'>
                Dodaj
              </button>
            </>
          ) : (
            <>
              <div className='flex gap-4 w-full justify-end'>
                <button onClick={cancel} className='btn btn-outline btn-md'>
                  Odustani
                </button>
                <button onClick={handleUpdateData} className='btn btn-info btn-md'>
                  Update
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </form>
  )
}
export default AddNewCustomer
