import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Input } from '@material-tailwind/react'
import { useRouter } from 'next/router'

function Signin() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState({ email: '', password: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const res = signIn('credentials', {
      email: userInfo.email,
      password: userInfo.password,
      callbackUrl: `${window.location.origin}/`,
    })
  }

  const handleChange = (e) => {
    setUserInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
    console.log('SignIn res', userInfo)
  }

  return (
    <>
      <div className='flex w-screen h-screen justify-center items-start'>
        <div className='flex flex-col h-screen bg-secondary min-w-[500px] justify-start items-center pt-32'>
          <h1 className='flex my-12 text-[26px] text-font'>WORK MANAGER</h1>
          <h1 className='flex text-[26px] text-font'>Sign in</h1>
          <div className='flex flex-col gap-10 mt-11 w-[70%]'>
            <div>
              <Input
                className='flex h-14 '
                label='Email'
                variant='outlined'
                onChange={handleChange}
                type='email'
                name='email'
              />
            </div>
            <div>
              <Input
                className='flex h-14'
                label='Password'
                variant='outlined'
                onChange={handleChange}
                type='password'
                name='password'
              />
            </div>
            <button
              onClick={handleSubmit}
              className='flex justify-center bg-accent px-4 py-6 rounded-2xl text-[14px] font-semibold text-buttonText mt-8   hover:opacity-70'
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </>
    // <div className='flex justify-center items-center w-screen h-screen'>
    //   <form
    //     onSubmit={handleSubmit}
    //     className='flex flex-col border-solid border-2 border-black min-h-fit min-w-fit py-28 px-20 space-y-8 items-center'
    //   >
    //     <h1 className='flex justify-center text-[26px]'>Login</h1>
    //     <input
    //       className='border-solid border-2 '
    //       type='text'
    //       name='email'
    //       placeholder='Email'
    //       value={userInfo.email}
    //       onChange={handleChange}
    //     />
    //     <input
    //       className='border-solid border-2'
    //       type='password'
    //       name='password'
    //       placeholder='Password'
    //       onChange={handleChange}
    //     />
    //     <button type='submit' className='border-solid border-2 h-10 w-28'>
    //       Log in
    //     </button>
    //   </form>
    // </div>
  )
}

export default Signin
