import React, { useState, useEffect } from 'react'
import UsersList from '../components/LIsts/UsersList'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import AddNewUser from '../components/Forms/AddNewUser'
import Loading from '../components/Ui/Loading'
import Popup from '../components/Utility/Popup'
import { useAppSelector, useAppDispatch } from '../utils/hooks'
import { handleUserPopup, cancelButton } from '../slices/themeSlice'
import { deleteUser, deleteUserState } from '../slices/userSlice'
import { users, getUsersStatus } from '../slices/userSlice'
import DeleteMessage from '../components/Ui/DeleteMessage'
import AddButton from '../components/Ui/AddButton'
import { Modal } from '../components/Ui/Modal'

const Users: React.FC = () => {
  const popupHandler = useAppSelector(
    (state) => state.themeContext.popupHandler
  )
  const contextUsers = useAppSelector(users)
  const deleteId = useAppSelector((state) => state.userContext.deleteUserId)
  const contextUsersStatus = useAppSelector(getUsersStatus)
  const dispatch = useAppDispatch()

  const [handleOpen, setHandleOpen] = useState('')

  useEffect(() => {
    setHandleOpen(popupHandler)
  }, [popupHandler])

  const handleDeleteUser = () => {
    dispatch(deleteUserState())
    dispatch(cancelButton())
    dispatch(deleteUser(deleteId))
  }

  return (
    <>
      <div>
        <section>{handleOpen !== '' ? <Modal /> : ''}</section>
        <section className='flex flex-col border-solid border-2 bg-white rounded-lg shadow-md py-10 w-full'>
          <div className='flex justify-end pr-10 pb-10'>
            <AddButton />
          </div>
          <div className='overflow-x-auto w-full px-10 '>
            <table className='table w-full'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contextUsers.map((singleUser, index) => {
                  return (
                    <UsersList
                      key={index}
                      singleUser={singleUser}
                      index={index}
                    />
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  )
}

export default Users
