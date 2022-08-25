import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../slices/userSlice'

export default function Test() {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.userContext)
  console.log('Global:users', users)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  return (
    <div>
      Hello
      {/* <ul>
        {users.map((user) => (
          <li key={users.id}>user.name</li>
        ))}
      </ul> */}
    </div>
  )
}
