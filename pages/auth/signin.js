import React, { useState } from 'react'
import { signIn } from 'next-auth/react'

function Signin() {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const res = signIn('credentials', {
      email: userInfo.email,
      password: userInfo.password,
    })
  }

  const handleChange = (e) => {
    setUserInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
    console.log('SignIn res', userInfo)
  }

  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col border-solid border-2 border-black min-h-fit min-w-fit py-28 px-20 space-y-8 items-center'
      >
        <h1 className='flex justify-center text-[26px]'>Login</h1>
        <input
          className='border-solid border-2 '
          type='text'
          name='email'
          placeholder='Email'
          value={userInfo.email}
          onChange={handleChange}
        />
        <input
          className='border-solid border-2'
          type='password'
          name='password'
          placeholder='Password'
          onChange={handleChange}
        />
        <button type='submit' className='border-solid border-2 h-10 w-28'>
          Log in
        </button>
      </form>
    </div>
  )
}

export default Signin
