import React, { useState, useEffect, useRef } from 'react'
import AddNewUser from '../components/Forms/AddNewUser'

function Users() {
  const [contacts, setContacts] = useState([])
  const [selectedUser, setSelectedUser] = useState({
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
  const [editMode, setEditMode] = useState(false)

  const theme = {
    focusList: 'flex w-[12.5%] border-solid border-2 border-black',
  }

  const fetchData = async () => {
    const response = await fetch(`/api/post/getData`)
    const result = await response.json()
    setContacts(result)
  }
  useEffect(() => {
    fetchData()
  }, [contacts])

  const handleDeleteCustomer = async (id) => {
    const response = await fetch(`/api/post/deleteData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
  }

  const handleEditData = async (
    id,
    firstName,
    lastName,
    companyName,
    email,
    adress,
    city,
    oib,
    phoneNumber
  ) => {
    setEditMode(true)
    console.log(editMode)
    setSelectedUser({
      id,
      firstName,
      lastName,
      companyName,
      email,
      adress,
      city,
      oib,
      phoneNumber,
    })
  }

  const handleUpdateData = async (e) => {
    e.preventDefault()
    const response = await fetch(`/api/post/updateData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: selectedUser.id,
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        companyName: selectedUser.companyName,
        email: selectedUser.email,
        adress: selectedUser.adress,
        city: selectedUser.city,
        oib: selectedUser.oib,
        phoneNumber: selectedUser.phoneNumber,
      }),
    })
    setSelectedUser({
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
    setEditMode(false)
    const json = await response.json()
    console.log(json)
  }

  const handleChange = async (e) => {
    setSelectedUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
    console.log(selectedUser)
  }

  const users = contacts.map(
    ({
      id,
      firstName,
      lastName,
      companyName,
      email,
      adress,
      city,
      oib,
      phoneNumber,
    }) => (
      <li
        className='flex justify-between mt-2 border-solid border-b-2 items-center h-8'
        key={id}
      >
        <span className='flex w-[12.5%]'>{companyName}</span>
        <span className='flex w-[12.5%]'>{firstName}</span>
        <span className='flex w-[12.5%]'>{lastName}</span>
        <span className='flex w-[12.5%]'>{oib}</span>
        <span className='flex w-[12.5%]'>{email}</span>
        <span className='flex w-[12.5%]'>{adress}</span>
        <span className='flex w-[12.5%]'>{city}</span>
        <span className='flex w-[12.5%]'>{phoneNumber}</span>
        <button
          className='border-solid border-2 border-black'
          onClick={() => handleDeleteCustomer(id)}
        >
          Delete
        </button>
        <button
          className='border-solid border-2 border-black'
          onClick={() =>
            handleEditData(
              id,
              firstName,
              lastName,
              companyName,
              email,
              adress,
              city,
              oib,
              phoneNumber
            )
          }
        >
          Edit
        </button>
      </li>
    )
  )
  const updateUsers = selectedUser.map(
    ({
      id,
      firstName,
      lastName,
      companyName,
      email,
      adress,
      city,
      oib,
      phoneNumber,
    }) => (
      <li
        className='flex justify-between mt-2 border-solid border-b-2 items-center h-8'
        key={id}
      >
        <input
          className={theme.focusList}
          value={selectedUser.companyName}
          autoFocus
          name='companyName'
          onChange={handleChange}
        ></input>
        <input
          className={theme.focusList}
          value={selectedUser.firstName}
          name='firstName'
          onChange={handleChange}
        ></input>
        <input
          className={theme.focusList}
          value={selectedUser.lastName}
          name='lastName'
          onChange={handleChange}
        ></input>
        <input
          className={theme.focusList}
          value={selectedUser.oib}
          name='oib'
          onChange={handleChange}
        ></input>
        <input
          className={theme.focusList}
          value={selectedUser.email}
          name='email'
          onChange={handleChange}
        ></input>
        <input
          className={theme.focusList}
          value={selectedUser.adress}
          name='adress'
          onChange={handleChange}
        ></input>
        <input
          className={theme.focusList}
          value={selectedUser.city}
          name='city'
          onChange={handleChange}
        ></input>
        <input
          className={theme.focusList}
          value={selectedUser.phoneNumber}
          name='phoneNumber'
          onChange={handleChange}
        ></input>
        <button
          className='border-solid border-2 border-black'
          onClick={() => handleDeleteCustomer(id)}
        >
          Delete
        </button>
        {editMode && !editMode === true ? (
          <button
            className='border-solid border-2 border-black'
            onClick={() =>
              handleEditData(
                id,
                firstName,
                lastName,
                companyName,
                email,
                adress,
                city,
                oib,
                phoneNumber
              )
            }
          >
            Edit
          </button>
        ) : (
          <button
            className='border-solid border-2 border-black'
            onClick={handleUpdateData}
          >
            Update
          </button>
        )}
      </li>
    )
  )

  const handleUpdate = async (e) => {
    handleUpdateData()
  }
  return (
    // UserList Section
    <div className=''>
      <div className='flex flex-col'>
        <div className='flex  justify-between mb-4 h-8 items-center'>
          <h3 className='flex w-[12.5%] '>Naziv tvrtke</h3>
          <h3 className='flex w-[12.5%] '>Ime</h3>
          <h3 className='flex w-[12.5%] '>Prezime</h3>
          <h3 className='flex w-[12.5%] '>Oib</h3>
          <h3 className='flex w-[12.5%] '>Email</h3>
          <h3 className='flex w-[12.5%] '>Adresa</h3>
          <h3 className='flex w-[12.5%] '>Grad</h3>
          <h3 className='flex w-[12.5%] '>Broj Telefona</h3>
          <h3 className='flex w-[12.5%] '>Options</h3>
        </div>
        <ul className='flex flex-col '>{!editMode ? users : updateUsers}</ul>
      </div>

      {/* Add new contact form component */}
      <div className='flex mt-32 justify-center'>
        <AddNewUser />
      </div>
    </div>
  )
}

export default Users
