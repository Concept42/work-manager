import { useState, useEffect, useRef } from 'react'
import UsersList from '../components/LIsts/UsersList'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import AddNewUser from '../components/Forms/AddNewUser'
import useOutsideClick from '../utils/useOutsideClick'
import Loading from '../components/Ui/Loading'
import Popup from '../components/Utility/Popup'
import { useSelector } from 'react-redux'

function Users() {
  const contextUser = useSelector((state) => state.userContext)
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [handleOpen, setHandleOpen] = useState(false)
  const [handleUpdateOpen, setHandleUpdateOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [updatedUser, setUpdatedUser] = useState([])

  const ref = useRef()

  const fetchUsersData = async () => {
    const response = await fetch(`/api/customer/getUserData`)
    const result = await response.json()
    setUsers(result)
    setIsLoading(false)
  }

  useOutsideClick(ref, () => {
    setHandleOpen(false)
  })

  const cancelButton = () => {
    setHandleOpen(false)
  }
  const cancelUpdateButton = () => {
    setHandleUpdateOpen(false)
  }

  useEffect(() => {
    fetchUsersData()
    if (contextUser.editMode === true) {
      setUpdatedUser({
        id: contextUser.id,
        name: contextUser.name,
        email: contextUser.email,
        role: contextUser.role,
        editMode: contextUser.editMode,
      })
      setHandleUpdateOpen(true)
      console.log('fetched Users', users)
      console.log('updatedUser', updatedUser)
    }
  }, [contextUser.editMode])

  const handleOpenPopup = () => {
    setHandleOpen(!handleOpen)
  }

  return (
    <div>
      {!isLoading ? (
        <>
          <div>
            {handleOpen ? (
              <Popup>
                <h1 className='mb-10'>Dodaj novog zaposlenika</h1>
                <AddNewUser cancelButton={cancelButton} rolesList={roles} />
              </Popup>
            ) : (
              ''
            )}
          </div>
          <div>
            {handleUpdateOpen ? (
              <Popup>
                <h1 className='mb-10'>Izmjeni zaposlenika</h1>
                <AddNewUser
                  updatedUser={updatedUser}
                  cancelUpdateButton={cancelUpdateButton}
                  rolesList={roles}
                />
              </Popup>
            ) : (
              ''
            )}
          </div>
          <div className='px-16 py-10'>
            <section>
              <div className='flex justify-between'>
                <h1 className='text-[24px] font-extrabold text-font'>
                  Zaposlenici
                </h1>
                <Fab onClick={handleOpenPopup} color='primary' aria-label='add'>
                  <AddIcon />
                </Fab>
              </div>
            </section>
            <section className='mt-10'>
              <div className='flex w-full justify-between text-font'>
                <span className='flex flex-[5] ml-4'>Zaposlenik</span>
                <span className='flex flex-[1]'>Role</span>
                <span className='flex flex-[1]'>Akcije</span>
              </div>
              {users.length > 0 &&
                users.map((oneUser, id) => {
                  return (
                    <UsersList
                      key={id}
                      singleUser={oneUser}
                      handleOpenPopup={handleOpenPopup}
                    />
                  )
                })}
            </section>
          </div>
        </>
      ) : (
        <div className='flex w-screen h-screen justify-center items-center'>
          <Loading />
        </div>
      )}
    </div>
  )
}

export default Users
