import { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import DeleteIcon from '@mui/icons-material/Delete'
import { Menu, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DotMenu from '../Ui/DotMenu'
import { relativeTimeRounding } from 'moment'

function WorkOrderList(props) {
  const [workOrders, setWorkOrders] = useState([])
  const [editMode, setEditMode] = useState(false)

  const singleUser = props.singleUser

  useEffect(() => {
    console.log(singleUser)
    let newWorkOrders = []
    if (workOrders.length === 0) {
      singleUser.workOrders.map((workOrder) => {
        let result = {
          id: workOrder.id,
          createdAt: workOrder.createdAt,
          updatedAt: workOrder.updatedAt,
          title: workOrder.title,
          discription: workOrder.discription,
          statusFlag: workOrder.statusFlag,
          customerId: workOrder.customerId,
          userId: workOrder.userId,
        }
        newWorkOrders.push(result)
        setWorkOrders(newWorkOrders)
      })
    }
  })

  const handleEditUser = async () => {
    setEditMode(true)
    console.log(editMode)
  }

  const handleUpdateData = async (e) => {
    const response = await fetch(`/api/customer/updateUserData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
    setEditMode(false)
    const json = await response.json()
  }

  const handleDeleteUser = async (id) => {
    const response = await fetch(`/api/customer/deleteUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
    window.location.reload(false)
  }

  return (
    <div>
      <ul
        className='flex w-full h-24 justify-between items-center bg-secondary rounded-xl my-5 text-fontGray font-normal'
        key={singleUser.id}
      >
        <li className='flex flex-[5] ml-6 gap-4 '>
          <Avatar className='z-0' src={singleUser.image} />
          <div>
            <h3 className='text-font font-bold'>{singleUser.name}</h3>
            <h3 className='text-fontGray'>{singleUser.email}</h3>
          </div>
        </li>
        <li className='flex flex-[1]'>{singleUser.role}</li>
        <li className='flex flex-[1]'>
          <div>
            <DotMenu
              handleEditUser={() => props.handleOpenPopup}
              handleDeleteUser={() => handleDeleteUser(singleUser.id)}
            />
          </div>
        </li>
      </ul>
      {/* <div>
        <h1 className='text-[50px]'>Lista poslova</h1>
        {workOrders.map((workOrder) => {
          return (
            <li key={workOrder.id}>
              <h3>ID posla: {workOrder.id}</h3>
              <h3 className='text-[20px]'>Naslov posla: {workOrder.title}</h3>
              <h3>Kreirano: {workOrder.createdAt}</h3>
              <h3>Završeno: {workOrder.updatedAt}</h3>
              <h3>Opis posla: {workOrder.discription}</h3>
              <h3>Stanje posla:{workOrder.statusFlag}</h3>
            </li>
          )
        })}
      </div> */}
    </div>
  )
}

export default WorkOrderList
