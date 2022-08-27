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
import {
  fetchUsers,
  deleteId,
  deleteUser,
  deleteUserState,
} from '../slices/userSlice'
import { users, getUsersStatus } from '../slices/userSlice'
import DeleteMessage from '../components/Ui/DeleteMessage'
import Avatar from '@mui/material/Avatar'
import DotMenu from '../components/Ui/DotMenu'

// export async function getServerSideProps() {
//   const res = await fetch(`http://localhost:3000/api/customer/getUserData`)
//   const users = await res.json()

//   return {
//     props: { users },
//   }
// }

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

  let RenderUsers = () => {
    const userList = contextUsers.map((oneUser, index) => (
      <li
        key={index}
        className='flex w-full h-24 justify-between items-center bg-secondary rounded-xl my-5 text-fontGray font-normal'
      >
        <li className='flex flex-[5] ml-6 gap-4 '>
          <Avatar className='z-0' src={oneUser?.image} alt='' />
          <div>
            <h3 className='text-font font-bold'>{oneUser?.name}</h3>
            <h3 className='text-fontGray'>{oneUser?.email}</h3>
          </div>
        </li>
        <li className='flex flex-[1]'>{oneUser?.role}</li>
        <li className='flex flex-[1]'>
          <div>
            <DotMenu singleUser={oneUser} index={index} />
          </div>
        </li>
      </li>
    ))
    return userList
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
            <ul>
              <RenderUsers />
            </ul>
          </section>
        </div>
      </>
    </div>
  )
}

export default Users
