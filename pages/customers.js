import CustomerList from '../components/LIsts/CustomerList'
import AddNewCustomer from '../components/Forms/AddNewCustomer'

function Customers() {
  return (
    <div>
      <CustomerList />
      {/* Add new contact form component */}
      <div className='flex mt-32 justify-center'>
        <AddNewCustomer />
      </div>
    </div>
  )
}

export default Customers
