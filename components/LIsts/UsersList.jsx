import { useState, useEffect } from 'react'

function UsersList() {
  const [users, setUsers] = useState([])

  const fetchData = async () => {
    debugger
    const response = await fetch(`/api/customer/getUserData`)
    const result = await response.json()
    setUsers(result)
  }
  useEffect(() => {
    fetchData()
    console.log(users)
  }, [])

  const usersList = users.map(({ id, firstName, lastName, role }) => (
    <li
      className='flex justify-between mt-2 border-solid border-b-2 items-center h-8'
      key={id}
    >
      <span className='flex w-[12.5%]'>{firstName}</span>
      <span className='flex w-[12.5%]'>{lastName}</span>
      <span className='flex w-[12.5%]'>{role}</span>
    </li>
  ))
  return (
    // UserList Section
    <div className=''>
      <div className='flex flex-col'>
        <div className='flex  justify-between mb-4 h-8 items-center'>
          <h3 className='flex w-[12.5%] '>Ime</h3>
          <h3 className='flex w-[12.5%] '>Prezime</h3>
          <h3 className='flex w-[12.5%] '>Role</h3>
        </div>
        <ul className='flex flex-col '>{usersList}</ul>
      </div>
    </div>
  )
}

export default UsersList
