import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUserForm, addNewUser, updateUser } from '../../slices/userSlice'
import { handleUserPopup } from '../../slices/themeSlice'
import { v4 as uuidv4 } from 'uuid'

export default function AddNewUser() {
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
        workOrders: contextUser.userForm.workOrders,
        accounts: contextUser.userForm.accounts,
        sessions: contextUser.userForm.sessions,
        image: contextUser.userForm.image,
      })
    }
  }, [contextUser.editMode])

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
    dispatch(addNewUser(newUser))
    cancel()
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
    cancel()
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
      workOrders: [],
      accounts: [],
      sessions: [],
      image: '',
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
    dispatch(handleUserPopup(''))
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
        <div className='form-control w-full max-w-2xl'>
          <input
            className='input input-bordered w-full max-w-lg'
            name='name'
            type='text'
            placeholder='Ime i prezime*'
            onChange={handleChange}
            value={newUser.name}
          />
        </div>
        <div className='form-control w-full max-w-2xl'>
          <input
            className='input input-bordered w-full max-w-lg'
            name='email'
            type='email'
            placeholder='Email*'
            onChange={handleChange}
            value={newUser.email}
          />
        </div>
        <div className='form-control w-full max-w-lg'>
          <select
            className='select select-bordered'
            id='role'
            name='role'
            onChange={handleRoleChange}
            defaultValue=''
          >
            <option disabled value=''>
              Odaberi ulogu
            </option>
            <option value='USER'>Korisnik</option>
            <option value='ADMIN'>Administrator</option>
          </select>
        </div>
        <div className='flex justify-end gap-4'>
          {!contextUser.editMode ? (
            <>
              <button onClick={cancel} className='btn btn-outline btn-md'>
                Odustani
              </button>
              <button onClick={handleSubmit} className='btn btn-info btn-md'>
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
  )
}
