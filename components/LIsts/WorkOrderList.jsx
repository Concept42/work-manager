import { useState, useEffect } from 'react'

function WorkOrderList(props) {
  const [singleWorkOrder, setSingleWorkOrder] = useState([])

  useEffect(() => {
    setSingleWorkOrder({
      id: props.singleWorkOrder.id,
      createdAt: props.singleWorkOrder.createdAt,
      updatedAt: props.singleWorkOrder.updatedAt,
      title: props.singleWorkOrder.title,
      discription: props.singleWorkOrder.discription,
      statusFlag: props.singleWorkOrder.statusFlag,
      customerId: props.singleWorkOrder.customerId,
      customer: props.singleWorkOrder.customer.firstName,
      userId: props.singleWorkOrder.userId,
      userName: props.singleWorkOrder.user.firstName,
    })
  }, [])

  return (
    <ul key={singleWorkOrder.id}>
      <li>ID: {singleWorkOrder.id}</li>
      <li>createdAt: {singleWorkOrder.createdAt}</li>
      <li>updatedAt: {singleWorkOrder.updatedAt}</li>
      <li>title: {singleWorkOrder.title}</li>
      <li>statusFlag: {singleWorkOrder.statusFlag}</li>
      <li>customer: {singleWorkOrder.customer}</li>
      {/* <li>customerId: {singleWorkOrder.customerId}</li> */}
      <li>user: {singleWorkOrder.userName}</li>
      {/* <li>userId: {singleWorkOrder.userId}</li> */}
    </ul>
  )
}

export default WorkOrderList
