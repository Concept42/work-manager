import { NearMe } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { User, WorkOrders, Customer } from '../slices/DbTypes'

interface FormObject {
  id?: string
  name?: string
  email?: string
  role?: string
  workOrders?: WorkOrders[]
  accounts?: []
  sessions?: []
  image?: string
  firstName?: string
  lastName?: string
  companyName?: string
  adress?: string
  city?: string
  oib?: string
  phoneNumber?: number
  createdAt: string
  updatedAt: string
  title: string
  discription: string
  statusFlag: string
  customer?: Customer[]
  user: User[]
}

const useForm = () => {
  const [state, setState] = useState<FormObject>()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
    console.log(state)
  }
  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    const newId = uuidv4()
    setState((prev) => {
      return { ...prev, role: e.target.value, id: newId }
    })
  }

  return [state, handleChange, handleRoleChange]
}

export default useForm
