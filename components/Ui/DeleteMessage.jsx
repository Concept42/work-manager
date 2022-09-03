import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleUserPopup } from '../../slices/themeSlice'
import WarningIcon from '@mui/icons-material/Warning'
import {
  deleteUser,
  deleteUserState,
  setUserInit,
} from '../../slices/userSlice'

function DeleteMessage(props) {
  const handleDeleteCustomer = props.handleDeleteCustomer
  const dispatch = useDispatch()
  const customerContext = useSelector((state) => state.customerContext)
  const userContext = useSelector((state) => state.userContext)

  const cancelDelete = () => {
    dispatch(handleUserPopup(''))
  }
  const handleDeleteUser = () => {
    dispatch(deleteUserState())
    dispatch(deleteUser(userContext.deleteUserId))
    dispatch(handleUserPopup(''))
    dispatch(setUserInit())
  }

  return (
    <>
      {handleDeleteCustomer ? (
        <div>
          <h1 className='text-[20px] font-bold  text-font'>Izbriši stranku</h1>
          <p className='text-[16px] text-fontGray font-normal mb-10'></p>
          <div className='flex w-full justify-end  text-font'>
            <button
              onClick={cancelDelete}
              className='flex px-4 py-6 rounded-2xl text-[14px] font-semibold text-buttonText  hover:bg-primary hover:bg-opacity-40'
            >
              Odustani
            </button>
            <button
              onClick={props.handleDeleteCustomer}
              className='flex bg-accent px-4 py-6 rounded-2xl text-[14px] font-semibold text-buttonText  hover:opacity-70'
            >
              Izbriši
            </button>
          </div>
        </div>
      ) : (
        <div className='flex flex-col w-full h-full justify-center items-center gap-10'>
          <div className='text-[90px]'>
            <WarningIcon fontSize='inherit' />
          </div>

          <p>Are your sure that you want to delete this user?</p>
          <div className='flex justify-end gap-4'>
            <button onClick={cancelDelete} className='btn btn-outline btn-md'>
              Cancel
            </button>
            <button onClick={handleDeleteUser} className='btn btn-info btn-md'>
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default DeleteMessage
