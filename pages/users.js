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
    <div>
      {' '}
      {handleOpen ? (
        <div>
          <div className='flex w-full h-full fixed justify-center items-center  bg-black  opacity-60'></div>
          <div className='flex w-full h-full fixed justify-center items-center '>
            <div className='flex flex-col min-w-[650px] min-h-[800px] bg-secondary text-font text-[20px] font-bold p-5'>
              <h1>Add new User</h1>
              <AddNewUser />
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
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
              return <UsersList key={id} singleUser={oneUser} />
            })}
        </section>
      </div>
    </div>
  )
}

export default Users
