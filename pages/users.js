import React, { useState, useEffect } from 'react'
import AddNewUser from '../components/Forms/AddNewUser'
import prisma from '../lib/db'

export async function getServerSideProps() {
  const contacts = await prisma.customer.findMany()

  return {
    props: {
      initialContacts: contacts,
    },
  }
}

function Users(props) {
  const [contacts, setContacts] = useState(props.initialContacts)

  useEffect(() => {
    setContacts(props.initialContacts)
  }, [])

  const users = contacts.map((user, index) => (
    <li
      className='flex justify-between mt-2 border-solid border-b-2 items-center h-8'
      key={index}
    >
      <span className='flex w-[12.5%]'>{user.companyName}</span>
      <span className='flex w-[12.5%]'>{user.firstName}</span>
      <span className='flex w-[12.5%]'>{user.lastName}</span>
      <span className='flex w-[12.5%]'>{user.oib}</span>
      <span className='flex w-[12.5%]'>{user.email}</span>
      <span className='flex w-[12.5%]'>{user.adress}</span>
      <span className='flex w-[12.5%]'>{user.city}</span>
      <span className='flex w-[12.5%]'>{user.phoneNumber}</span>
    </li>
  ))

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
