import { useAppSelector, useAppDispatch } from '../../utils/hooks'
import { updateUserForm, addNewUser, updateUser, setEditMode, setUserInit, updatedUser } from '../../slices/userSlice'
import { handleUserPopup } from '../../slices/themeSlice'
import { useEffect, useState } from 'react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userSchema } from '../Forms/FormValidate'

interface FormInputs {
  id: string
  name: string
  email: string
  role: string
  password: string
}

const AddNewUser: React.FC = () => {
  const editMode = useAppSelector((state) => state.userContext.editMode)
  const globalUser = useAppSelector(updatedUser)
  const dispatch = useAppDispatch()

  const [user, setUser] = useState<FormInputs>({
    id: '',
    name: '',
    email: '',
    role: '',
    password: '',
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      id: globalUser.id,
      name: globalUser.name,
      email: globalUser.email,
      role: globalUser.role,
      password: globalUser.password,
    },
    resolver: yupResolver(userSchema),
  })

  useEffect(() => {
    if (editMode) {
      setUser({
        id: globalUser.id,
        name: globalUser.name,
        email: globalUser.email,
        role: globalUser.role,
        password: globalUser.password,
      })
    }
  }, [globalUser.id, globalUser.name, globalUser.email, globalUser.role, editMode])

  const onSubmit = handleSubmit(async (data) => {
    if (Object.keys(errors).length === 0) {
      dispatch(addNewUser(data))
      cancel()
      const response = await fetch(`/api/customer/addUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
          password: data.password,
        }),
      })
    }
  })

  const handleUpdateData = handleSubmit(async (data) => {
    if (Object.keys(errors).length === 0) {
      dispatch(updateUser(data))
      cancel()

      const response = await fetch(`/api/customer/updateUserData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
          password: data.password,
        }),
      })
    }
  })

  const cancel = () => {
    dispatch(handleUserPopup(''))
    dispatch(
      updateUserForm({
        id: '',
        name: '',
        email: '',
        role: '',
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
              errors.name ? 'input input-bordered input-error w-full max-w-lg' : 'input input-bordered w-full max-w-lg'
            }
            {...register('name')}
            type='text'
            placeholder='Ime i prezime*'
            name='name'
          />
          {errors.name && <p className='text-error pt-2 '>{errors.name.message}</p>}
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
              errors.password
                ? 'input input-bordered input-error w-full max-w-lg'
                : 'input input-bordered w-full max-w-lg'
            }
            {...register('password')}
            type='password'
            placeholder='Password*'
            name='password'
          />
          {errors.password && <p className='text-error pt-2 '>{errors.password.message}</p>}
        </div>
        <div className='form-control w-full max-w-lg'>
          <select
            {...register('role')}
            className={errors.role ? 'select select-bordered input-error ' : 'select select-bordered'}
            id='role'
            name='role'
          >
            <option disabled>Odaberi ulogu</option>
            <option value='USER'>Korisnik</option>
            <option value='ADMIN'>Administrator</option>
          </select>
          {errors.role && <p className='text-error pt-2'>{errors.role.message}</p>}
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
            ''
          )}
        </div>
        {editMode ? (
          <div className='flex gap-4 w-full justify-end'>
            <button onClick={cancel} className='btn btn-outline btn-md'>
              Odustani
            </button>
            <button onClick={handleUpdateData} className='btn btn-info btn-md'>
              Update
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </form>
  )
}
export default AddNewUser
