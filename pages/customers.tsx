import { useState, useEffect, ChangeEvent } from 'react'
import CustomerList from '../components/LIsts/CustomerList'
import {
  customersList,
  deleteCustomerState,
  deleteCustomer,
  setSortType,
  fetchCustomers,
} from '../slices/customerSlice'
import { useAppSelector, useAppDispatch } from '../utils/hooks'
import { cancelButton } from '../slices/themeSlice'
import type { Customer } from '../slices/DbTypes'
import Modal from '../components/Ui/Modal'
import AddButton from '../components/Ui/AddButton'
import Loader from '../components/Ui/Loader'
import useSearch from '../utils/useSearch'
import SearchBar from '../components/Ui/SearchBar'

const Customers: React.FC = () => {
  const popupHandler = useAppSelector((state) => state.themeContext.popupHandler)
  const handleLoading = useAppSelector((state) => state.userContext.status)
  const contextCustomers: Customer[] = useAppSelector(customersList)

  const { setSearchQuery, search } = useSearch()
  const [handleOpen, setHandleOpen] = useState<string>('')
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isLoading, setIsLoading] = useState<string>('')

  useEffect(() => {
    setCustomers(contextCustomers)
  }, [contextCustomers])

  useEffect(() => {
    setIsLoading(handleLoading)
    setHandleOpen(popupHandler)
  }, [popupHandler, handleLoading])

  // const handleDeleteCustomer = () => {
  //   dispatch(deleteCustomerState())
  //   dispatch(cancelButton())
  //   dispatch(deleteCustomer(deleteId))
  // }

  return (
    <>
      <div>
        <section>{handleOpen !== '' ? <Modal /> : ''}</section>
        <section className='flex flex-col border-solid border-2 bg-white rounded-lg shadow-md py-10 w-full'>
          <div className='flex justify-between pr-10 pb-16'>
            <SearchBar setSearchQuery={setSearchQuery} />
            <AddButton add={'customer'} />
          </div>
          {/* <div className='flex w-full h-full  justify-end'>
            <select onChange={handleChange} className='mr-10 mb-2 select w-36'>
              <option disabled>Sort by</option>
              <option value='asc'>Asc: Name</option>
              <option value='dsc'>Dsc: Name</option>
            </select>
          </div> */}

          <div className='overflow-x-auto w-full px-10 '>
            <table className='table w-full'>
              <thead>
                <tr>
                  <th>WorkList</th>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>OIB</th>
                  <th>Phone Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading === 'loading' ? (
                  <Loader />
                ) : (
                  customers &&
                  search(customers).map((singleCustomer: Customer, index: number) => {
                    console.log(singleCustomer)
                    return <CustomerList key={index} singleCustomer={singleCustomer} index={index} />
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  )
}

export default Customers
