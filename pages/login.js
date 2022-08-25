import React from 'react'
import { signIn } from 'next-auth/react'

function login() {
  return (
    <div>
      <button onClick={() => signIn()}>Login</button>
    </div>
  )
}

export default login
