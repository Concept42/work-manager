import React, { useState, useEffect } from 'react'
import UsersList from '../components/LIsts/UsersList'
import { useAppSelector } from '../utils/hooks'
import AddButton from '../components/Ui/AddButton'
import Modal from '../components/Ui/Modal'
import type { User } from '../slices/DbTypes'
import Loader from '../components/Ui/Loader'
import SearchBar from '../components/Ui/SearchBar'
import useSearch from '../utils/useSearch'

const Users: React.FC = () => {
  const popupHandler = useAppSelector((state) => state.themeContext.popupHandler)
  const contextUsers: User[] = useAppSelector((state) => state.userContext.users)
  const handleLoading = useAppSelector((state) => state.userContext.status)
  const { setSearchQuery, search } = useSearch()
  const [handleOpen, setHandleOpen] = useState<string>('')
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState<string>('')

  useEffect(() => {
    setUsers(contextUsers)
  }, [contextUsers])

  useEffect(() => {
    setIsLoading(handleLoading)
    setHandleOpen(popupHandler)
  }, [popupHandler, handleLoading])

  return (
    <>
      <div>
        <section>{handleOpen !== '' ? <Modal /> : ''}</section>
        <section className='flex flex-col border-solid border-2 bg-white rounded-lg shadow-md py-10 w-full'>
          <div className='flex justify-between pr-10 pb-16'>
            <SearchBar setSearchQuery={setSearchQuery} />
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
                  users &&
                  search(users)?.map((singleUser: User, index: number) => {
                    return <UsersList key={index} singleUser={singleUser} index={index} />
                  })
                )}
                {}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  )
}

export default Users
