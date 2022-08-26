import { useState, useEffect } from 'react'
import DotMenu from '../Ui/DotMenu'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CustomerWorkOrderList from './CustomerWorkOrderList'

function CustomerList(props) {
  const singleCustomer = props.singleCustomer

  const [open, setOpen] = useState()
  const [workOrders, setWorkOrders] = useState([])

  const theme = {
    rotate: { transform: 'rotate(90deg)' },
  }

  useEffect(() => {
    if (workOrders.length === 0) {
      setWorkOrders(singleCustomer.workOrders)
    }
    console.log('WorkOrders:', workOrders)
  }, [])

  // const handleDeleteCustomer = async (id) => {
  //   const response = await fetch(`/api/customer/deleteCustomerData`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ id }),
  //   })
  // }

  // const handleChange = async (e) => {
  //   setSingleCustomer((prev) => {
  //     return {
  //       ...prev,
  //       [e.target.name]: e.target.value,
  //     }
  //   })
  //   console.log(singleCustomer)
  // }

  // const handleEditCustomer = async () => {
  //   setEditMode(true)
  // }

  // const handleUpdateData = async (e) => {
  //   e.preventDefault()

  //   const response = await fetch(`/api/customer/updateCustomerData`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       id: singleCustomer.id,
  //       firstName: singleCustomer.firstName,
  //       lastName: singleCustomer.lastName,
  //       companyName: singleCustomer.companyName,
  //       email: singleCustomer.email,
  //       adress: singleCustomer.adress,
  //       city: singleCustomer.city,
  //       oib: singleCustomer.oib,
  //       phoneNumber: singleCustomer.phoneNumber,
  //     }),
  //   })
  //   setEditMode(false)
  //   const json = await response.json()
  // }
  const openWorkOrders = () => {
    setOpen(!open)
  }
  return (
    <>
      {/* Single Customer List */}
      <section>
        <ul
          key={singleCustomer.id}
          className='grid grid-cols-9  min-h-[80px] w-full  mt-5  bg-secondary rounded-xl items-center text-fontGray font-normal'
        >
          <li className='flex justify-center'>
            <div className='flex  w-10 h-10 items-center justify-center hover:bg-blue-gray-800 rounded-full'>
              <ArrowForwardIcon
                sx={open ? theme.rotate : ''}
                onClick={openWorkOrders}
              />
            </div>
          </li>
          <li className='flex justify-center'>{singleCustomer.companyName}</li>
          <li className='flex justify-center'>
            {singleCustomer.firstName + '  ' + singleCustomer.lastName}
          </li>
          <li className='flex justify-center'>{singleCustomer.oib}</li>
          <li className='flex justify-center'>{singleCustomer.email}</li>
          <li className='flex justify-center'>{singleCustomer.adress}</li>
          <li className='flex justify-center'>{singleCustomer.city}</li>
          <li className='flex justify-center'>{singleCustomer.phoneNumber}</li>
          <li className='flex justify-center'>
            {' '}
            <div>
              <DotMenu />
            </div>
          </li>
        </ul>
      </section>
      {open ? (
        <section>
          <div className='flex flex-col justify-center w-full m-auto bg-secondary rounded-xl  text-fontGray font-normal'>
            <h1 className='flex justify-center text-[20px] py-20'>
              Radni nalozi
            </h1>
            <ul className='grid grid-cols-7 pb-8 '>
              <li className='flex justify-center'>Broj</li>
              <li className='flex justify-center'>Kreirano</li>
              <li className='flex justify-center'>Ažurirano</li>
              <li className='flex justify-center'>Naslov</li>
              <li className='flex justify-center'>Status</li>
              <li className='flex justify-center'>Zaposlenik</li>
              <li className='flex justify-center'>Detalji</li>
            </ul>
            {workOrders.map((singleWorkOrder, id) => {
              return (
                <CustomerWorkOrderList
                  key={id}
                  ListId={id}
                  singleWorkOrder={singleWorkOrder}
                />
              )
            })}
          </div>
        </section>
      ) : (
        ''
      )}
    </>
  )
}

export default CustomerList
