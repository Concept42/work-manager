import { useState, useEffect, useRef } from 'react'
import UsersList from '../components/LIsts/UsersList'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import AddNewUser from '../components/Forms/AddNewUser'
import useOutsideClick from '../utils/useOutsideClick'
import Loading from '../components/Ui/Loading'
import Popup from '../components/Utility/Popup'
import { useSelector, useDispatch } from 'react-redux'
import { handleUserPopup } from '../slices/themeSlice'

function Users() {
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [handleOpen, setHandleOpen] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [updatedUser, setUpdatedUser] = useState([])

  const themeContext = useSelector((state) => state.themeContext)
  const dispatch = useDispatch()

  const fetchUsersData = async () => {
    const response = await fetch(`/api/customer/getUserData`)
    const result = await response.json()
    setUsers(result)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchUsersData()
    setHandleOpen(themeContext.popupHandler)
  }, [themeContext.popupHandler])

  const handleAddOpenPopup = () => {
    dispatch(handleUserPopup('ADD'))
  }

  return (
    <div>
      {!isLoading ? (
        <>
          <div>
            {handleOpen === 'ADD' ? (
              <Popup>
                <h1 className='mb-10'>Dodaj novog zaposlenika</h1>
                <AddNewUser rolesList={roles} />
              </Popup>
            ) : (
              ''
            )}
          </div>
          <div>
            {handleOpen === 'EDIT' ? (
              <Popup>
                <h1 className='mb-10'>Izmjeni zaposlenika</h1>
                <AddNewUser updatedUser={updatedUser} rolesList={roles} />
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
