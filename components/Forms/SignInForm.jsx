import React from 'react'

function SignInForm() {
  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      <form
        onSubmit={() => {
          signIn()
        }}
        className='flex flex-col border-solid border-2 border-black min-h-fit min-w-fit py-28 px-20 space-y-8 items-center'
      >
        <h1 className='flex justify-center text-[26px]'>Login</h1>
        <input
          className='border-solid border-2 '
          type='text'
          name='userName'
          placeholder='User Name'
        />
        <input
          className='border-solid border-2'
          type='password'
          name='password'
          placeholder='Password'
        />
        <button type='submit' className='border-solid border-2 h-10 w-28'>
          Log in
        </button>
      </form>
    </div>
  )
}

export default SignInForm
