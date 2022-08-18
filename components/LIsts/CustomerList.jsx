import { useState, useEffect } from 'react'
import moment from 'moment'

function WorkOrderList(props) {
  const [singleCustomer, setSingleCustomer] = useState([])
  const [editMode, setEditMode] = useState(false)

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
