import React, { useState, useEffect } from 'react'
import UsersList from '../components/LIsts/UsersList'
import { useAppSelector, useAppDispatch } from '../utils/hooks'
import AddButton from '../components/Ui/AddButton'
import Modal from '../components/Ui/Modal'
import type { User } from '../slices/DbTypes'
import Loader from '../components/Ui/Loader'
import { fetchUsersToState } from '../slices/userSlice'
import { trpc } from '../utils/trpc'
import Toast from '../components/Ui/Toast'

const Users: React.FC = () => {
  const popupHandler = useAppSelector((state) => state.themeContext.popupHandler)
  const contextUsers: User[] = useAppSelector((state) => state.userContext.users)
  const handleLoading = useAppSelector((state) => state.userContext.status)
  const [handleOpen, setHandleOpen] = useState<string>('')
  const [isLoading, setIsLoading] = useState<string>('')
  const dispatch = useAppDispatch()

  const { data } = trpc.useQuery(['users.getUsersData'])
  console.log(data)

  useEffect(() => {
    // dispatch(fetchUsersToState(data))
  })

  useEffect(() => {
    setIsLoading(handleLoading)
    setHandleOpen(popupHandler)
  }, [handleLoading, popupHandler, dispatch, contextUsers])

  return (
    <>
      <div>
        <section>{handleOpen !== '' ? <Modal /> : ''}</section>
        <section className='flex flex-col border-solid border-2 bg-white rounded-lg shadow-md py-10 w-full'>
          <div className='flex justify-end pr-10 pb-10'>
            <AddButton add={'user'} />
          </div>
          <div className='overflow-x-auto w-full px-10 '>
            <table className='table w-full'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading === 'loading' ? (
                  <Loader />
                ) : (
                  contextUsers &&
                  contextUsers?.map((singleUser: User, index: number) => {
                    return <UsersList key={index} singleUser={singleUser} index={index} />
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
        <Toast />
      </div>
    </>
  )
}

export default Users
