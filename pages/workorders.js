import { useState, useEffect } from 'react'
import AddNewWorkOrder from '../components/Forms/AddNewWorkOrder'
import WorkOrderList from '../components/LIsts/WorkOrderList'

function WorkOrders() {
  const [workOrders, setWorkOrders] = useState([])
  const [users, setUsers] = useState([])
  const [customers, setCustomers] = useState([])

  const fetchWorkOrderData = async () => {
    const response = await fetch(`/api/customer/getOrderData`)
    const result = await response.json()
    setWorkOrders(result)
  }

  const fetchUsersData = async () => {
    const response = await fetch(`/api/customer/getUserData`)
    const result = await response.json()
    setUsers(result)
  }
  const fetchCustomerData = async () => {
    const response = await fetch(`/api/customer/getCustomerData`)
    const result = await response.json()
    setCustomers(result)
  }

  useEffect(() => {
    fetchWorkOrderData()
    fetchUsersData()
    fetchCustomerData()
    console.log('workORders: ', workOrders)
    console.log('users: ', users)
  }, [])

  return (
    <div>
      {/* Work order List */}
      <section>
        {workOrders.length > 0 &&
          workOrders.map((oneWorkOrder, id) => {
            return (
              <WorkOrderList
                key={id}
                singleWorkOrder={oneWorkOrder}
                users={users}
                customers={customers}
              />
            )
          })}
      </section>
      <section>
        <AddNewWorkOrder listCustomer={customers} listUser={users} />
      </section>
    </div>
  )
}

export default WorkOrders
