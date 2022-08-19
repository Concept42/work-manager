import { useState, useEffect } from 'react'
import moment from 'moment'

// WORK ORDER MUST HAVE A CUSTOMER!!!!!

function WorkOrderList(props) {
  const [singleWorkOrder, setSingleWorkOrder] = useState([])
  const [updatedDate, setUpdatedDate] = useState('')
  const [editMode, setEditMode] = useState(false)

  const listUsers = props.users
  const listCustomers = props.customers
  const listStatus = props.statusFlag

  useEffect(() => {
    setSingleWorkOrder({
      id: props.singleWorkOrder.id,
      createdAt: props.singleWorkOrder.createdAt,
      updatedAt: props.singleWorkOrder.updatedAt,
      title: props.singleWorkOrder.title,
      discription: props.singleWorkOrder.discription,
      statusFlag: props.singleWorkOrder.statusFlag,
      customerId: props.singleWorkOrder.customerId,
      customer: props.singleWorkOrder.customer.firstName,
      userId: props.singleWorkOrder.userId,
      userName: props.singleWorkOrder.user.firstName,
    })
  }, [])

  const handleChange = async (e) => {
    newDate()
    setSingleWorkOrder((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
    console.log(singleWorkOrder, updatedDate)
  }

  const handleEditWorkOrder = async () => {
    setEditMode(true)
  }

  const newDate = async () => {
    let newDate = Date.now()
    let updatedDate = new Date(newDate)
    updatedDate.toISOString()
    setUpdatedDate(updatedDate)
  }

  const handleUpdateData = async (e) => {
    e.preventDefault()

    const response = await fetch(`/api/customer/updateWorkOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: singleWorkOrder.id,
        updatedAt: updatedDate,
        title: singleWorkOrder.title,
        discription: singleWorkOrder.discription,
        statusFlag: singleWorkOrder.statusFlag,
        customerId: singleWorkOrder.customerId,
        userId: singleWorkOrder.userId,
      }),
    })
    setEditMode(false)
    const json = await response.json()
  }

  const handleDeleteWorkOrder = async (id) => {
    const response = await fetch(`/api/customer/deleteWorkOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
  }

  return (
    <div>
      {!editMode ? (
        <ul key={singleWorkOrder.id}>
          <li>ID: {singleWorkOrder.id}</li>
          <li>
            createdAt:
            {moment(singleWorkOrder.createdAt).format('DD-MMM-YYYY, h:mm:ss')}
          </li>
          <li>
            updatedAt:{' '}
            {moment(singleWorkOrder.updatedAt).format('DD-MMM-YYYY, h:mm:ss')}
          </li>
          <li>title: {singleWorkOrder.title}</li>
          <li>discription: {singleWorkOrder.discription}</li>
          <li>statusFlag: {singleWorkOrder.statusFlag}</li>
          <li>customer: {singleWorkOrder.customer}</li>
          {/* <li>customerId: {singleWorkOrder.customerId}</li> */}
          <li>user: {singleWorkOrder.userName}</li>
          {/* <li>userId: {singleWorkOrder.userId}</li> */}
          <div>
            <button
              onClick={() => handleDeleteWorkOrder(singleWorkOrder.id)}
              className='border-solid border-2 border-red-500'
            >
              Delete
            </button>
            <button
              onClick={() => handleEditWorkOrder()}
              className='border-solid border-2 border-red-500'
            >
              Edit
            </button>
          </div>
        </ul>
      ) : (
        <form onSubmit={handleUpdateData}>
          <div>
            <h3 className=''>ID: {singleWorkOrder.id} </h3>
            <h3 className=''>
              createdAt:
              {moment(singleWorkOrder.createdAt).format(
                'DD-MMM-YYYY, h:mm:ss'
              )}{' '}
            </h3>
            <h3 className=''>
              updatedAt:
              {singleWorkOrder.updatedAt}
            </h3>
          </div>
          <div className=''>
            <h3>
              title:{' '}
              <input
                value={singleWorkOrder.title}
                onChange={handleChange}
                name='title'
              />
            </h3>
            <h3>
              discription:{' '}
              <input
                value={singleWorkOrder.discription}
                onChange={handleChange}
                name='discription'
              />
            </h3>

            <h3>
              Status:
              <select name='statusFlag' onChange={handleChange}>
                <option>Odaberi status</option>
                {listStatus &&
                  listStatus.map((status) => {
                    return (
                      <option key={status.id} value={status.status}>
                        {status.status}
                      </option>
                    )
                  })}
              </select>
            </h3>

            <h3>
              customer:
              <select name='customerId' onChange={handleChange}>
                <option>Odaberi stranku</option>
                {listCustomers &&
                  listCustomers.map((customer) => {
                    return (
                      <option key={customer.id} value={customer.id}>
                        {customer.firstName}
                      </option>
                    )
                  })}
              </select>
            </h3>
            <h3>
              user:
              <select name='userId' onChange={handleChange}>
                <option>Odaberi korisnika</option>
                {listUsers &&
                  listUsers.map((user) => {
                    return (
                      <option key={user.id} value={user.id}>
                        {user.firstName}
                      </option>
                    )
                  })}
              </select>
            </h3>
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
