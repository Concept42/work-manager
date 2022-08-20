import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

function TestHeader() {
  const { status } = useSession()

  return (
    <div className='flex grow-0 w-full h-[100px] bg-red-300 justify-end items-center'>
      {status === 'authenticated' ? (
        <button
          className='border-solid border-2 p-4'
          onClick={() => {
            signOut({
              callbackUrl: 'http://localhost:3000/',
            })
          }}
        >
          Logout
        </button>
      ) : (
        <button
          className='border-solid border-2 p-4'
          onClick={() => {
            signIn({
              callbackUrl: 'http://localhost:3000/workorders',
            })
          }}
        >
          Sign in
        </button>
      )}
    </div>
  )
}

export default TestHeader
