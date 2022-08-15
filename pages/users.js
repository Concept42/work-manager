import { PrismaClient } from '@prisma/client'
import React, { useState, useEffect } from 'react'

const prisma = new PrismaClient()

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
    console.log(contacts)
  }, [])

  const users = contacts.map((user, index) => (
    <li key={index}>
      <span>Naziv tvrtke: {user.companyName}</span>
      <span>Ime: {user.firstName}</span>
      <span>Prezime: {user.lastName}</span>
      <span>Oib: {user.oib}</span>
      <span>Email: {user.email}</span>
      <span>Adresa: {user.adress}</span>
      <span>Grad: {user.city}</span>
      <span>Broj Telefona: {user.phoneNumber}</span>
    </li>
  ))

  return (
    <div>
      <ul>{users}</ul>
    </div>
  )
}

export default Users
