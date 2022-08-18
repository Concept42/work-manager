import { useState, useEffect } from 'react'
import moment from 'moment'

function WorkOrderList(props) {
  const [singleCustomer, setSingleCustomer] = useState([])

  useEffect(() => {
    setSingleCustomer({
      id: props.singleCustomer.id,
      firstName: props.singleCustomer.firstName,
      lastName: props.singleCustomer.lastName,
      companyName: props.singleCustomer.companyName,
      email: props.singleCustomer.email,
      adress: props.singleCustomer.adress,
      city: props.singleCustomer.city,
      oib: props.singleCustomer.oib,
      phoneNumber: props.singleCustomer.phoneNumber,
    })
  }, [])

  const handleDeleteCustomer = async (id) => {
    const response = await fetch(`/api/customer/deleteCustomerData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
  }

  // const handleChange = async (e) => {
  //   newDate()
  //   setSingleWorkOrder((prev) => {
  //     return {
  //       ...prev,
  //       [e.target.name]: e.target.value,
  //     }
  //   })

  //   console.log(singleWorkOrder, updatedDate)
  // }

  // const handleEditWorkOrder = async () => {
  //   setEditMode(true)
  // }

  // const newDate = async () => {
  //   let newDate = Date.now()
  //   let updatedDate = new Date(newDate)
  //   updatedDate.toISOString()
  //   setUpdatedDate(updatedDate)
  // }
  // const handleUpdateData = async (e) => {
  //   e.preventDefault()

  //   const response = await fetch(`/api/customer/updateWorkOrder`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       id: singleWorkOrder.id,
  //       updatedAt: updatedDate,
  //       title: singleWorkOrder.title,
  //       discription: singleWorkOrder.discription,
  //       statusFlag: singleWorkOrder.statusFlag,
  //       customerId: singleWorkOrder.customerId,
  //       userId: singleWorkOrder.userId,
  //     }),
  //   })
  //   setEditMode(false)
  //   const json = await response.json()
  // }

  return (
    <div>
      <ul key={singleCustomer.id}>
        <li>ID: {singleCustomer.id}</li>
        <li>Ime: {singleCustomer.firstName}</li>
        <li>Prezime: {singleCustomer.lastName}</li>
        <li>Ime tvrtke: {singleCustomer.companyName}</li>
        <li>Email: {singleCustomer.email}</li>
        <li>Adresa: {singleCustomer.adress}</li>
        <li>Grad: {singleCustomer.city}</li>
        <li>OIB: {singleCustomer.oib}</li>
        <li>Broj Telefona: {singleCustomer.phoneNumber}</li>
        <div>
          <button
            onClick={() => handleDeleteCustomer(singleCustomer.id)}
            className='border-solid border-2 border-red-500'
          >
            Delete
          </button>
          <button
            onClick={() => handleEditCustomer()}
            className='border-solid border-2 border-red-500'
          >
            Edit
          </button>
        </div>
      </ul>
    </div>
  )
}

export default WorkOrderList
