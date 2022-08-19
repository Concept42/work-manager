import { useState, useEffect } from 'react'
import UsersList from '../components/LIsts/UsersList'

function Users() {
  const [users, setUsers] = useState([])

  const fetchUsersData = async () => {
    const response = await fetch(`/api/customer/getUserData`)
    const result = await response.json()
    setUsers(result)
  }

  useEffect(() => {
    fetchUsersData()
  }, [])

  return (
    <div>
      {/* Work order List */}
      <section>
        {users.length > 0 &&
          users.map((oneUser, id) => {
            return <UsersList key={id} singleUser={oneUser} />
          })}
      </section>
    </div>
  )
}

export default Users
