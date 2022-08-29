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

        <section className='  border-solid border-2 bg-white rounded-lg shadow-md px-10 pb-10'>
          <div>
            <table className='table w-full'>
              <thead className=''>
                <tr className=''>
                  <th className='border-solid border-r-[1px] border-gray-300 text-[14px] font-medium'>
                    Ime i prezime
                  </th>
                  <th className='border-solid border-r-[1px] border-gray-300 text-[14px] font-medium '>
                    Email
                  </th>
                  <th className='border-solid border-r-[1px] border-gray-300 text-[14px] font-medium'>
                    Role
                  </th>
                  <th className='text-[14px] font-medium'>Akcije</th>
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
          {/* <div className='flex w-full justify-between text-font '>
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
            </ul> */}
        </section>
      </>
    </div>
  )
}

export default Users
