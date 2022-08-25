import React from 'react'
import { useDispatch } from 'react-redux'
import { cancelButton } from '../../slices/themeSlice'
import { deleteId, deleteUser } from '../../slices/userSlice'
import { useSelector } from 'react-redux'

function DeleteMessage() {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.userContext.deleteId)

  const cancelDelete = () => {
    dispatch(cancelButton())
  }

  const handleDeleteUser = () => {
    dispatch(deleteUser(userId))
    dispatch(deleteId(''))
    dispatch(cancelButton())
  }

  return (
    <div className='flex flex-col min-w-[300px] items-center '>
      <h1 className='text-[20px] font-bold  text-font my-10'>
        Izbriši zaposlenika
      </h1>
      <p className='text-[16px] text-fontGray font-normal mb-10'>
        Da li ste sigurni da hoćete izbrisati korisnika
      </p>
      <div className='flex w-full justify-end  text-font'>
        <button
          onClick={cancelDelete}
          className='flex px-4 py-6 rounded-2xl text-[14px] font-semibold text-buttonText  hover:bg-primary hover:bg-opacity-40'
        >
          Odustani
        </button>
        <button
          onClick={handleDeleteUser}
          className='flex bg-accent px-4 py-6 rounded-2xl text-[14px] font-semibold text-buttonText  hover:opacity-70'
        >
          Izbriši
        </button>
      </div>
    </div>
  )
}

export default DeleteMessage
