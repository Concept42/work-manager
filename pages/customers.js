import { useState, useEffect } from 'react'
import CustomerList from '../components/LIsts/CustomerList'
import AddNewCustomer from '../components/Forms/AddNewCustomer'
import SearchBar from '../components/Ui/SearchBar'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { fetchCustomers } from '../slices/customerSlice'
import { useSelector, useDispatch } from 'react-redux'
import Popup from '../components/Utility/Popup'
import WorkOrderDetail from '../components/LIsts/WorkOrderDetail'

function Customers() {
  const customers = useSelector((state) => state.customerContext.customers)
  const themeContext = useSelector((state) => state.themeContext)

  const [localCustomers, setLocalCustomers] = useState(customers)
  const [handleOpen, setHandleOpen] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    if (localCustomers) {
      dispatch(fetchCustomers())
    }
    setHandleOpen(themeContext.popupHandler)
    setLocalCustomers(customers)
  }, [themeContext])

  return (
    <>
      <div>
        {handleOpen === 'DETAIL' ? (
          <Popup>
            {/* <h1 className='flex flex-col justify-center items-center'>
              Detalji Radnog Naloga
            </h1> */}
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
            <Fab color='primary' aria-label='add'>
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
          {localCustomers.length > 0 &&
            localCustomers.map((oneCustomer, id) => {
              return <CustomerList key={id} singleCustomer={oneCustomer} />
            })}
        </section>
      </div>
    </>
  )
}

export default Customers
