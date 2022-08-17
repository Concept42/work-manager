import { useState, useEffect } from 'react'
import AddNewWorkOrder from '../components/Forms/AddNewWorkOrder'
import WorkOrderList from '../components/LIsts/WorkOrderList'


function WorkOrders() {
  const [workOrders, setWorkOrders] = useState([])

  const fetchWorkOrderData = async () => {
    const response = await fetch(`/api/customer/getOrderData`)
    const result = await response.json()
    setWorkOrders(result)
  }

  useEffect(() => {
    fetchWorkOrderData()
    console.log('workORders: ', workOrders)
  }, [])

  return (
    <div>
      {workOrders.length > 0 &&
        workOrders.map((oneWorkOrder, id) => {
          return <WorkOrderList key={id} singleWorkOrder={oneWorkOrder} />
        })}
      <AddNewWorkOrder />
    </div>
  )
}

export default WorkOrders
