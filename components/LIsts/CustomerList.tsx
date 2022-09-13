import { useState } from 'react'
import DotMenu from '../Ui/DotMenu'

import { Customer } from '../../slices/DbTypes'

interface Props {
  singleCustomer: Customer
  index: number
}

function CustomerList({ singleCustomer, index }: Props) {
  const [open, setOpen] = useState()
  const [workOrders, setWorkOrders] = useState([])

  return (
    <>
      <tr>
        <th>{index + 1}</th>

        <td>{singleCustomer?.firstName}</td>
        <td>{singleCustomer?.lastName}</td>
        <td>{singleCustomer?.companyName}</td>
        <td>{singleCustomer?.email}</td>
        <td>{singleCustomer?.adress}</td>
        <td>{singleCustomer?.city}</td>
        <td>{singleCustomer?.oib}</td>
        <td>{singleCustomer?.phoneNumber}</td>
        <td>
          <DotMenu singleCustomer={singleCustomer} index={index} />
        </td>
      </tr>
    </>
  )
}

export default CustomerList
