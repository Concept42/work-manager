import { useEffect, useState } from 'react'
import DotMenu from '../Ui/DotMenu'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useAppSelector, useAppDispatch } from '../../utils/hooks'
import ArticleIcon from '@mui/icons-material/Article';

import { Customer, WorkOrders } from '../../slices/DbTypes'
import WorkDetailModal from '../Ui/WorkDetailModal'
import { handleDetailsPopup } from '../../slices/themeSlice'
import { setDetailCustomer } from '../../slices/customerSlice'
import Link from 'next/link'


interface Props {
  singleCustomer?: Customer
  index?: number
}

export default function CustomerList(props: Props) {

  const singleCustomer = props.singleCustomer
  const index = props.index

 
  return (
    <>
      <tr>
        <th>
          <Link
            href={"/customers/" + singleCustomer.id}
          >
            <button className="btn w-fit text-white p-2">
  <ArticleIcon/>
  
</button>
          </Link>
        </th>
        <td>{singleCustomer?.firstName}</td>
        <td>{singleCustomer?.lastName}</td>
        <td>{singleCustomer?.companyName}</td>
        <td>{singleCustomer?.email}</td>
        <td>{singleCustomer?.adress}</td>
        <td>{singleCustomer?.city}</td>
        <td>{singleCustomer?.oib}</td>
        <td>{singleCustomer?.phoneNumber}</td>
        <td>
          <DotMenu singleCustomer={singleCustomer} customerIndex={index} />
        </td>
      </tr>
    </>
  )
}
