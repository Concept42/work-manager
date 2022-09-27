import { useEffect, useState } from 'react'
import DotMenu from '../Ui/DotMenu'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useAppSelector, useAppDispatch } from '../../utils/hooks'
import LaunchIcon from '@mui/icons-material/Launch'

import { Customer, WorkOrders } from '../../slices/DbTypes'
import WorkDetailModal from '../Ui/WorkDetailModal'
import { handleDetailsPopup } from '../../slices/themeSlice'
import { setDetailCustomer } from '../../slices/customerSlice'


interface Props {
  singleCustomer?: Customer
  index?: number
}

export default function CustomerList(props: Props) {
  const [localSingleCustomer, setLocalSigleCustomer] = useState<Customer>()
  const singleCustomer = props.singleCustomer
  const customerWorkOrders = props.singleCustomer.workOrders
  const index = props.index
  const dispatch = useAppDispatch()
  const popupHandler = useAppSelector((state) => state.themeContext.detailsPopupHandler)

  useEffect(() => {
    setLocalSigleCustomer(singleCustomer)
  }, [singleCustomer])
  console.log('local:', localSingleCustomer)
  const handleClick = () => {
    dispatch(setDetailCustomer(singleCustomer))
    dispatch(handleDetailsPopup('WORKORDERS'))
  }
  return (
    <>
      <tr>
        {popupHandler !== '' ? <WorkDetailModal singleCustomer={localSingleCustomer} /> : ''}
        <th>
          <div
            className='w-6 h-7 justify-center items-center hover:bg-slate-400 cursor-pointer'
            onClick={handleClick}
            // onClick={() => console.log(singleCustomer)}
          >
            <LaunchIcon />
          </div>
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
