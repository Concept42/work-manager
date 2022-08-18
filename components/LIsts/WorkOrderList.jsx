import { useState, useEffect } from 'react'
import moment from 'moment'

function WorkOrderList(props) {
  const [singleWorkOrder, setSingleWorkOrder] = useState([])
  const [users, setUsers] = useState(props.users)
  const [editMode, setEditMode] = useState(false)

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
    if (editMode) {
    }
  }, [])

  const handleChange = async (e) => {
    setSingleWorkOrder((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
    console.log(singleWorkOrder)
  }

  const handleEditWorkOrder = async () => {
    setEditMode(true)
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
            updatedAt:
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
              onClick={() => handleEditWorkOrder({})}
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
              {moment(singleWorkOrder.updatedAt).format(
                'DD-MMM-YYYY, h:mm:ss'
              )}{' '}
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
            <h3 className=''>statusFlag: {singleWorkOrder.statusFlag} </h3>
            <h3>
              customer:{' '}
              <input
                value={singleWorkOrder.customer}
                onChange={handleChange}
                name='customer'
              />
            </h3>
            <h3>
              user:
              <select name='userName' onChange={handleChange}>
                {users.length > 0 &&
                  users.map((userName, id) => {
                    return (
                      <option key={id} value={userName.firstName}>
                        {userName.firstName}
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
