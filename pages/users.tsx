import React, { useState, useEffect } from 'react'
import UsersList from '../components/LIsts/UsersList'
import { useAppSelector } from '../utils/hooks'
import AddButton from '../components/Ui/AddButton'
import { Modal } from '../components/Ui/Modal'
import type { User } from '../slices/DbTypes'

const Users: React.FC = () => {
  const popupHandler = useAppSelector((state) => state.themeContext.popupHandler)
  const contextUsers: User[] = useAppSelector((state) => state.userContext.users)

  const [handleOpen, setHandleOpen] = useState<string>('')

  useEffect(() => {
    setHandleOpen(popupHandler)
  }, [popupHandler])

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
                {contextUsers.map((singleUser: User, index: number) => {
                  return <UsersList key={index} singleUser={singleUser} index={index} />
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
