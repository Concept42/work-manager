import { useState, useEffect } from 'react'
import UsersList from '../components/LIsts/UsersList'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import AddNewUser from '../components/Forms/AddNewUser'

function Users() {
  const [users, setUsers] = useState([])
  const [handleOpen, setHandleOpen] = useState(false)

  const fetchUsersData = async () => {
    const response = await fetch(`/api/customer/getUserData`)
    const result = await response.json()
    setUsers(result)
  }

  useEffect(() => {
    fetchUsersData()
  }, [users])

  const handleOpenPopup = () => {
    setHandleOpen(!handleOpen)
  }

  return (
    <>
      <section>
        {handleOpen ? (
          <div className='flex w-screen border-solid border-2 h-screen justify-center items-center '>
            <AddNewUser />
          </div>
        ) : (
          ''
        )}
        <div className='flex justify-between'>
          <h1 className='text-[24px] font-extrabold  text-font'>Zaposlenici</h1>
          <Fab onClick={handleOpenPopup} color='primary' aria-label='add'>
            <AddIcon />
          </Fab>
        </div>
      </section>
      <section className='mt-10'>
        {users.length > 0 &&
          users.map((oneUser, id) => {
            return <UsersList key={id} singleUser={oneUser} />
          })}
      </section>
    </>
  )
}

export default Users
