import React, { useEffect, useState } from 'react'
import { Input } from '@material-tailwind/react'
import { Select, Option } from '@material-tailwind/react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUserForm, addNewUser, updateUser } from '../../slices/userSlice'
import { cancelButton } from '../../slices/themeSlice'
import { v4 as uuidv4 } from 'uuid'

export default function AddNewUser(props) {
  const contextUser = useSelector((state) => state.userContext)
  const dispatch = useDispatch()

  const [newUser, setNewUser] = useState({
    id: '',
    name: '',
    email: '',
    role: '',
    workOrders: [],
    accounts: [],
    sessions: [],
    image: '',
  })

  useEffect(() => {
    if (contextUser.editMode === true) {
      setNewUser({
        id: contextUser.userForm.id,
        name: contextUser.userForm.name,
        email: contextUser.userForm.email,
        role: contextUser.userForm.role,
      })
    }
  }, [contextUser.editMode])

  const handleChange = (e) => {
    setNewUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleRoleChange = (e) => {
    setNewUser((prev) => {
      return { ...prev, role: e }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newId = uuidv4()
    setNewUser((prev) => {
      return {
        ...prev,
        id: newId,
      }
    })
    cancel()
    dispatch(addNewUser(newUser))
    const response = await fetch(`/api/customer/addUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      }),
    })

    setNewUser({
      id: '',
      name: '',
      email: '',
      role: '',
      workOrders: [],
      accounts: [],
      sessions: [],
      image: '',
    })
  }

  const handleUpdateData = async (e) => {
    e.preventDefault()
    dispatch(updateUser(newUser))
    dispatch(cancelButton())
    const response = await fetch(`/api/customer/updateUserData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      }),
    })
    setNewUser({
      id: '',
      name: '',
      email: '',
      role: '',
    })
    dispatch(
      updateUserForm({
        id: '',
        name: '',
        email: '',
        role: '',
        editMode: false,
      })
    )
  }

  const cancel = () => {
    dispatch(cancelButton())
    dispatch(
      updateUserForm({
        id: '',
        name: '',
        email: '',
        role: '',
        editMode: false,
      })
    )
  }

  return (
    <div className='flex flex-col min-w-[500px]  text-font items-start '>
      <div className='flex flex-col w-full h-full justify-between gap-8'>
        <div>
          <Input
            className='flex h-14 '
            label='Ime i prezime*'
            variant='outlined'
            onChange={handleChange}
            type='text'
            name='name'
            value={newUser.name}
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
            value={newUser.email}
          />
        </div>

        <Select
          id='role'
          label='Role'
          onChange={handleRoleChange}
          className='h-14'
          value={newUser.role}
        >
          <Option value='USER'>USER</Option>
          <Option value='ADMIN'>ADMIN</Option>
        </Select>

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
