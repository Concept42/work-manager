import { useState, useEffect } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CustomerList from '../components/LIsts/CustomerList'
import AddNewCustomer from '../components/Forms/AddNewCustomer'
import SearchBar from '../components/Ui/SearchBar'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { customersList } from '../slices/customerSlice'
import { useSelector, useDispatch } from 'react-redux'
import Popup from '../components/Utility/Popup'
import WorkOrderDetail from '../components/LIsts/WorkOrderDetail'
import DotMenu from '../components/Ui/DotMenu'

function Customers({ customers }) {
  const themeContext = useSelector((state) => state.themeContext)
  const contextCustomers = useSelector(customersList)

  const [localCustomers, setLocalCustomers] = useState(customers)
  const [handleOpen, setHandleOpen] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    setHandleOpen(themeContext.popupHandler)
  }, [themeContext.popupHandler])

  let RenderCustomers = () => {
    const customerList = contextCustomers.map((oneCustomer, index) => (
      <li
        key={index}
        className='grid grid-cols-9  min-h-[80px] w-full  mt-5  bg-secondary rounded-xl items-center text-fontGray font-normal'
      >
        <li className='flex justify-center'>
          {/* <div className='flex  w-10 h-10 items-center justify-center hover:bg-blue-gray-800 rounded-full'>
            <ArrowForwardIcon
              sx={open ? theme.rotate : ''}
              onClick={openWorkOrders}
            />
          </div> */}
        </li>
        <li className='flex justify-center'>{oneCustomer.companyName}</li>
        <li className='flex justify-center'>
          {oneCustomer.firstName + '  ' + oneCustomer.lastName}
        </li>
        <li className='flex justify-center'>{oneCustomer.oib}</li>
        <li className='flex justify-center'>{oneCustomer.email}</li>
        <li className='flex justify-center'>{oneCustomer.adress}</li>
        <li className='flex justify-center'>{oneCustomer.city}</li>
        <li className='flex justify-center'>{oneCustomer.phoneNumber}</li>
        <li className='flex justify-center'>
          {' '}
          <div>
            <DotMenu />
          </div>
        </li>
      </li>
    ))
    return customerList
  }
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
        </section>
        <ul>
          <RenderCustomers />
        </ul>
      </div>
    </>
  )
}

export default Customers
