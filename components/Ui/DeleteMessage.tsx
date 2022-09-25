import React from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { handleUserPopup } from '../../slices/themeSlice'
import WarningIcon from '@mui/icons-material/Warning'
import { deleteUser, deleteUserState, setUserInit } from '../../slices/userSlice'
import { deleteCustomerState, deleteCustomer, setCustomerInit } from '../../slices/customerSlice'

interface Props {
  handleDeleteCustomer?: (data) => void
}

function DeleteMessage(props: Props) {
  const dispatch = useAppDispatch()
  const customerContext = useAppSelector((state) => state.customerContext)
  const userContext = useAppSelector((state) => state.userContext)
  const handle = useAppSelector((state) => state.themeContext.popupHandler)

  const cancelDelete = () => {
    dispatch(handleUserPopup(''))
  }
  const handleDeleteUser = () => {
    dispatch(deleteUserState())
    dispatch(deleteUser(userContext.deleteUserId))
    dispatch(handleUserPopup(''))
    dispatch(setUserInit())
  }
  const handleDeleteCustomer = () => {
    dispatch(deleteCustomerState())
    dispatch(deleteCustomer(customerContext.deleteCustomerId))
    dispatch(handleUserPopup(''))
    dispatch(setCustomerInit())
  }

  return (
    <>
      {handle === 'DELETE USER' ? (
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
      ) : (
        ''
      )}
      {handle === 'DELETE CUSTOMER' ? (
        <div className='flex flex-col w-full h-full justify-center items-center gap-10'>
          <div className='text-[90px]'>
            <WarningIcon fontSize='inherit' />
          </div>
          <p>Are your sure that you want to delete this customer?</p>
          <div className='flex justify-end gap-4'>
            <button onClick={cancelDelete} className='btn btn-outline btn-md'>
              Cancel
            </button>
            <button onClick={handleDeleteCustomer} className='btn btn-info btn-md'>
              Delete
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default DeleteMessage
