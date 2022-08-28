import { useState, useEffect } from 'react'
import CustomerList from '../components/LIsts/CustomerList'
import AddNewCustomer from '../components/Forms/AddNewCustomer'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import {
  customersList,
  deleteCustomerState,
  deleteCustomer,
} from '../slices/customerSlice'
import { useSelector, useDispatch } from 'react-redux'
import Popup from '../components/Utility/Popup'
import WorkOrderDetail from '../components/LIsts/WorkOrderDetail'
import DeleteMessage from '../components/Ui/DeleteMessage'
import { handleUserPopup, cancelButton } from '../slices/themeSlice'

function Customers() {
  const themeContext = useSelector((state) => state.themeContext)
  const contextCustomers = useSelector(customersList)
  const deleteId = useSelector(
    (state) => state.customerContext.deleteCustomerId
  )
  const dispatch = useDispatch()

  const [handleOpen, setHandleOpen] = useState('')

  useEffect(() => {
    setHandleOpen(themeContext.popupHandler)
  }, [themeContext.popupHandler])

  const handleAddOpenPopup = () => {
    dispatch(handleUserPopup('ADD'))
  }
  const handleDeleteCustomer = () => {
    dispatch(deleteCustomerState())
    dispatch(cancelButton())
    dispatch(deleteCustomer(deleteId))
  }

  return (
    <>
      <div>
        {handleOpen === 'ADD' ? (
          <Popup>
            <h1 className='mb-10'>Dodaj novu stranku</h1>
            <AddNewCustomer />
          </Popup>
        ) : (
          ''
        )}
      </div>
      <div>
        {handleOpen === 'DELETE CUSTOMER' ? (
          <Popup>
            <DeleteMessage handleDeleteCustomer={handleDeleteCustomer} />
          </Popup>
        ) : (
          ''
        )}
      </div>
      <div>
        {handleOpen === 'EDIT CUSTOMER' ? (
          <Popup>
            <h1 className='mb-10'>Izmjeni stranku</h1>
            <AddNewCustomer />
          </Popup>
        ) : (
          ''
        )}
        {handleOpen === 'DETAIL' ? (
          <Popup>
            <WorkOrderDetail />
          </Popup>
        ) : (
          ''
        )}
      </div>
      <div className='px-16 py-10'>
        <section>
          <div className='flex justify-between'>
            <h1 className='text-[24px] font-extrabold text-font '>Stranke</h1>
            <Fab onClick={handleAddOpenPopup} color='primary' aria-label='add'>
              <AddIcon />
            </Fab>
          </div>
        </section>
        <section className='mt-10'>
          <div className='grid grid-cols-9  m-auto w-full  text-font'>
            <span className='flex justify-center'>Radni nalozi</span>
            <span className='flex justify-center'>Stranka</span>
            <span className='flex justify-center'>Ime i prezime</span>
            <span className='flex justify-center'>OIB</span>
            <span className='flex justify-center'>Email</span>
            <span className='flex justify-center'>Adresa</span>
            <span className='flex justify-center'>Grad</span>
            <span className='flex justify-center'>Tel</span>
            <span className='flex justify-center'>Akcije</span>
          </div>
        </section>
        <ul>
          {contextCustomers.map((singleCustomer, index) => {
            return (
              <CustomerList
                key={index}
                singleCustomer={singleCustomer}
                customerIndex={index}
              />
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default Customers
