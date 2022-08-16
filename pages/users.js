import React, { useState, useEffect } from 'react'
import AddNewUser from '../components/Forms/AddNewUser'

function Users() {
  const [contacts, setContacts] = useState([])

  const fetchData = async () => {
    const response = await fetch(`/api/post/getData`)
    const result = await response.json()
    setContacts(result)
  }
  useEffect(() => {
    fetchData()
  }, [])

  const handleDeleteCustomer = async (id) => {
    console.log(id)
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
      </li>
    )
  )

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
        <ul className='flex flex-col '>{users}</ul>
      </div>

      {/* Add new contact form component */}
      <div className='flex mt-32 justify-center'>
        <AddNewUser />
      </div>
    </div>
  )
}

export default Users
