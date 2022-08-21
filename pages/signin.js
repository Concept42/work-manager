import React from 'react'
import { signIn } from 'next-auth/react'

function Signin() {
  return (
    <div className='flex justify-center w-screen h-screen items-center'>
      <button
        className='border-solid border-2 p-4'
        onClick={() => {
          signIn({
            callbackUrl: 'http://localhost:3000/',
          })
        }}
      >
        Sign in
      </button>
    </div>
  )
}

export default Signin
