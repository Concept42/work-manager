import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cancelButton } from '../../slices/themeSlice'

function DeleteMessage(props) {
  const handleDeleteCustomer = props.handleDeleteCustomer
  const dispatch = useDispatch()
  const customerContext = useSelector((state) => state.customerContext)
  const userContext = useSelector((state) => state.userContext)

  const cancelDelete = () => {
    dispatch(cancelButton())
  }

  return (
    <>
      {handleDeleteCustomer ? (
        <div className='flex flex-col min-w-[300px] items-center '>
          <h1 className='text-[20px] font-bold  text-font my-10'>
            Izbriši stranku
          </h1>
          <p className='text-[16px] text-fontGray font-normal mb-10'>
            Da li ste sigurni da hoćete izbrisati stranku
          </p>
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
        <div className='flex flex-col min-w-[300px] items-center '>
          <h1 className='text-[20px] font-bold  text-font my-10'>
            Izbriši zaposlenika
          </h1>
          <p className='text-[16px] text-fontGray font-normal mb-10'>
            Da li ste sigurni da hoćete izbrisati zaposlenika
          </p>
          <div className='flex w-full justify-end  text-font'>
            <button
              onClick={cancelDelete}
              className='flex px-4 py-6 rounded-2xl text-[14px] font-semibold text-buttonText  hover:bg-primary hover:bg-opacity-40'
            >
              Odustani
            </button>
            <button
              onClick={props.handleDeleteUser}
              className='flex bg-accent px-4 py-6 rounded-2xl text-[14px] font-semibold text-buttonText  hover:opacity-70'
            >
              Izbriši
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default DeleteMessage
