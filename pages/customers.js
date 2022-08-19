import { useState, useEffect } from 'react'
import CustomerList from '../components/LIsts/CustomerList'
import AddNewCustomer from '../components/Forms/AddNewCustomer'

function Customers() {
  const [customers, setCustomers] = useState([])

  const fetchCustomerData = async () => {
    const response = await fetch(`/api/customer/getCustomerData`)
    const result = await response.json()
    setCustomers(result)
  }

  useEffect(() => {
    fetchCustomerData()
  }, [])

  return (
    <div>
      {/* Customers  List */}
      <section>
        {customers.map((oneCustomer, id) => {
          return <CustomerList key={id} singleCustomer={oneCustomer} />
        })}
      </section>
      <section>
        <AddNewCustomer />
      </section>
    </div>
  )
}

export default Customers
