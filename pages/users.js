import { useState, useEffect, useRef } from 'react'
import UsersList from '../components/LIsts/UsersList'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import AddNewUser from '../components/Forms/AddNewUser'
import useOutsideClick from '../utils/useOutsideClick'
import Loading from '../components/Ui/Loading'
import Popup from '../components/Utility/Popup'
import { useSelector, useDispatch } from 'react-redux'
import { handleUserPopup, cancelButton } from '../slices/themeSlice'
import { fetchUsers, deleteId, deleteUser } from '../slices/userSlice'
import DeleteMessage from '../components/Ui/DeleteMessage'

function Users() {
  const themeContext = useSelector((state) => state.themeContext)
  const userContext = useSelector((state) => state.userContext)
  const users = useSelector((state) => state.userContext.users)
  const userId = useSelector((state) => state.userContext.deleteId)
  const loading = useSelector((state) => state.userContext.isLoading)
  const dispatch = useDispatch()

  const [handleOpen, setHandleOpen] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    dispatch(fetchUsers())
    setHandleOpen(themeContext.popupHandler)
    setIsLoading(false)
  }, [themeContext.popupHandler])

  const handleAddOpenPopup = () => {
    dispatch(handleUserPopup('ADD'))
  }
  const handleDeleteUser = () => {
    dispatch(deleteUser(userId))
    dispatch(deleteId(''))
    dispatch(cancelButton())
    dispatch(fetchUsers())
  }

  return (
    <div>
      {!isLoading ? (
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
              <div className='flex justify-between'>
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
            <section className='mt-10'>
              <div className='flex w-full justify-between text-font'>
                <span className='flex flex-[5] ml-4'>Zaposlenik</span>
                <span className='flex flex-[1]'>Role</span>
                <span className='flex flex-[1]'>Akcije</span>
              </div>
              {users.length > 0 &&
                users.map((oneUser, id) => {
                  return <UsersList key={id} singleUser={oneUser} />
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
