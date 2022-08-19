import { useState, useEffect } from 'react'
import moment from 'moment'

function WorkOrderList(props) {
  const [workOrders, setWorkOrders] = useState([])
  const [editMode, setEditMode] = useState(false)

  const customer = props.singleCustomer

  useEffect(() => {
    let newWorkOrders = []
    if (workOrders.length === 0) {
      customer.workOrders.map((workOrder) => {
        let result = {
          id: workOrder.id,
          createdAt: workOrder.createdAt,
          updatedAt: workOrder.updatedAt,
          title: workOrder.title,
          discription: workOrder.discription,
          statusFlag: workOrder.statusFlag,
          customerId: workOrder.customerId,
          userId: workOrder.userId,
        }
        newWorkOrders.push(result)
        setWorkOrders(newWorkOrders)
      })
    }
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

  const handleChange = async (e) => {
    setSingleCustomer((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
    console.log(singleCustomer)
  }

  const handleEditCustomer = async () => {
    setEditMode(true)
  }

  const handleUpdateData = async (e) => {
    e.preventDefault()

    const response = await fetch(`/api/customer/updateCustomerData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: singleCustomer.id,
        firstName: singleCustomer.firstName,
        lastName: singleCustomer.lastName,
        companyName: singleCustomer.companyName,
        email: singleCustomer.email,
        adress: singleCustomer.adress,
        city: singleCustomer.city,
        oib: singleCustomer.oib,
        phoneNumber: singleCustomer.phoneNumber,
      }),
    })
    setEditMode(false)
    const json = await response.json()
  }
  return (
    <div>
      {!editMode ? (
        <ul key={customer.id}>
          <li>ID: {customer.id}</li>
          <li>Ime: {customer.firstName}</li>
          <li>Prezime: {customer.lastName}</li>
          <li>Ime tvrtke: {customer.companyName}</li>
          <li>Email: {customer.email}</li>
          <li>Adresa: {customer.adress}</li>
          <li>Grad: {customer.city}</li>
          <li>OIB: {customer.oib}</li>
          <li>Broj Telefona: {customer.phoneNumber}</li>
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
          <div>
            <h1 className='text-[2rem]'>Work Orders</h1>
            {workOrders &&
              workOrders.map((singleWorkOrder, id) => {
                return (
                  <ul key={id}>
                    <li className='text-[30px]'>ID: {singleWorkOrder.id}</li>
                    <li>Kreirano: {singleWorkOrder.createdAt}</li>
                    <li>Završeno: {singleWorkOrder.updatedAt}</li>
                    <li>Naslov: {singleWorkOrder.title}</li>
                    <li>Opis: {singleWorkOrder.discription}</li>
                    <li>Status: {singleWorkOrder.statusFlag}</li>
                  </ul>
                )
              })}
          </div>
        </ul>
      ) : (
        <form onSubmit={handleUpdateData}>
          <div>
            <h3>ID: {singleCustomer.id}</h3>
          </div>
          <div>
            <span>Ime: </span>
            <input
              value={singleCustomer.firstName}
              onChange={handleChange}
              name='firstName'
            />
          </div>
          <div>
            <span>Prezime: </span>
            <input
              value={singleCustomer.lastName}
              onChange={handleChange}
              name='lastName'
            />
          </div>
          <div>
            <span>Ime Tvrtke: </span>
            <input
              value={singleCustomer.companyName}
              onChange={handleChange}
              name='companyName'
            />
          </div>
          <div>
            <span>Email: </span>
            <input
              value={singleCustomer.email}
              onChange={handleChange}
              name='email'
            />
          </div>
          <div>
            <span>Adresa: </span>
            <input
              value={singleCustomer.adress}
              onChange={handleChange}
              name='adress'
            />
          </div>
          <div>
            <span>Grad: </span>
            <input
              value={singleCustomer.city}
              onChange={handleChange}
              name='city'
            />
          </div>
          <div>
            <span>OIB: </span>
            <input
              value={singleCustomer.oib}
              onChange={handleChange}
              name='oib'
            />
          </div>
          <div>
            <span>Broj Telefona: </span>
            <input
              value={singleCustomer.phoneNumber}
              onChange={handleChange}
              name='phoneNumber'
            />
          </div>
          <button
            type='submit'
            className='border-solid border-2 border-red-500'
          >
            Update
          </button>
        </form>
      )}
    </div>
  )
}

export default WorkOrderList
