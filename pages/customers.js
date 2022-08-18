import { useState, useEffect } from 'react'
import CustomerList from '../components/LIsts/CustomerList'
import AddNewCustomer from '../components/Forms/AddNewCustomer'

function Customers() {
  const [workOrders, setWorkOrders] = useState([])
  const [users, setUsers] = useState([])
  const [customers, setCustomers] = useState([])
  const [status, setStatus] = useState([])

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
  const fetchStatusData = async () => {
    const response = await fetch(`/api/customer/getStatusData`)
    const result = await response.json()
    setStatus(result)
  }

  useEffect(() => {
    fetchWorkOrderData()
    fetchUsersData()
    fetchCustomerData()
    fetchStatusData()
    console.log('workORders: ', workOrders)
    console.log('users: ', users)
  }, [])

  return (
    <div>
      {/* Customers  List */}
      <section>
        {customers.map((oneCustomer, id) => {
          return (
            <CustomerList key={id} users={users} singleCustomer={oneCustomer} />
          )
        })}
      </section>
      <section>
        <AddNewCustomer />
      </section>
    </div>
  )
}

export default Customers
