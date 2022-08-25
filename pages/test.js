import React, { useEffect, useState } from 'react'

function Test() {
  const [user, setUser] = useState([])

  const email = 'marko42@gmail.com'

  const handleDeleteWorkOrder = async (email) => {
    const response = await fetch(`/api/customer/getUserData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
    const result = await response.json()
    setUser(result)
    console.log('USER: ', result)
  }

  useEffect(() => {
    console.log(user[0].email)
  })

  return (
    <div>
      <h1>Hello</h1>
      <button
        onClick={() => handleDeleteWorkOrder(email)}
        className='flex border-solid border-2'
      >
        FETCH
      </button>
    </div>
  )
}

export default Test
