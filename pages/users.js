import { useState, useEffect } from 'react'
import UsersList from '../components/LIsts/UsersList'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import AddNewUser from '../components/Forms/AddNewUser'
import Loading from '../components/Ui/Loading'
import Popup from '../components/Utility/Popup'
import { useSelector, useDispatch } from 'react-redux'
import { handleUserPopup, cancelButton } from '../slices/themeSlice'
import { deleteUser, deleteUserState } from '../slices/userSlice'
import { users, getUsersStatus } from '../slices/userSlice'
import DeleteMessage from '../components/Ui/DeleteMessage'

function Users() {
  const themeContext = useSelector((state) => state.themeContext)
  const contextUsers = useSelector(users)
  const deleteId = useSelector((state) => state.userContext.deleteUserId)
  const contextUsersStatus = useSelector(getUsersStatus)
  const dispatch = useDispatch()

  const [handleOpen, setHandleOpen] = useState('')

  useEffect(() => {
    setHandleOpen(themeContext.popupHandler)
  }, [themeContext.popupHandler])

  const handleAddOpenPopup = () => {
    dispatch(handleUserPopup('ADD'))
  }
  const handleDeleteUser = () => {
    dispatch(deleteUserState())
    dispatch(cancelButton())
    dispatch(deleteUser(deleteId))
  }

  return (
    <div>
      <>
        <div>
          {handleOpen === 'ADD' ? (
            <Popup>
              <h1 className='mb-10'>Dodaj novog zaposlenika</h1>
              <AddNewUser />
            </Popup>
          ) : (
            ''
          )}
        </div>
        <div>
          {handleOpen === 'DELETE' ? (
            <Popup>
              <DeleteMessage handleDeleteUser={handleDeleteUser} />
            </Popup>
          ) : (
            ''
          )}
        </div>
        <div>
          {handleOpen === 'EDIT' ? (
            <Popup>
              <h1 className='mb-10'>Izmjeni zaposlenika</h1>
              <AddNewUser />
            </Popup>
          ) : (
            ''
          )}
        </div>
        <div className='px-16 py-10'>
          <section>
            <div className='flex justify-between '>
              <h1 className='text-[24px] font-extrabold text-font'>
                Zaposlenici
              </h1>
              <Fab
                onClick={handleAddOpenPopup}
                color='primary'
                aria-label='add'
              >
                <AddIcon />
              </Fab>
            </div>
          </section>
          <section className='mt-10 bg-white'>
            {/* Table header */}
            <div className='flex w-full justify-between text-font '>
              <span className='flex flex-[5] ml-4'>Zaposlenik</span>
              <span className='flex flex-[1]'>Role</span>
              <span className='flex flex-[1]'>Akcije</span>
            </div>
            <ul>
              {contextUsers.map((singleUser, index) => {
                return (
                  <UsersList
                    key={index}
                    singleUser={singleUser}
                    index={index}
                  />
                )
              })}
            </ul>
          </section>
        </div>
      </>
    </div>
  )
}

export default Users
