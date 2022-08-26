import { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import DotMenu from '../Ui/DotMenu'
import Popup from '../Utility/Popup'

function UsersList(props) {
  const singleUser = props.singleUser
  // const [singleUser, setSingleUser] = useState([])
  const [workOrders, setWorkOrders] = useState([])

  useEffect(() => {
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
    // if (singleUser.length === 0) {
    //   setSingleUser(props.singleUser)
    // }
  })

  return (
    <>
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
            <DotMenu singleUser={singleUser} />
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
    </>
  )
}

export default UsersList
