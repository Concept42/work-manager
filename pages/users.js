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
  return (
    <div>
      <h1> Ime: {contacts.firstName}</h1>
    </div>
  )
}

export default Users
