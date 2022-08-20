import { useState, useEffect } from 'react'

function WorkOrderList(props) {
  const [workOrders, setWorkOrders] = useState([])
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

  return (
    <div>
      <h1 className='text-[50px]'>Korisnik</h1>
      <ul key={singleUser.id}>
        <li>ID: {singleUser.id}</li>
        <li>Ime: {singleUser.name}</li>
        <li>Role: {singleUser.role}</li>
      </ul>
      <div>
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
      </div>
    </div>
  )
}

export default WorkOrderList
