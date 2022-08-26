import React from 'react'
import moment from 'moment'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import GradingIcon from '@mui/icons-material/Grading'
import { useSelector, useDispatch } from 'react-redux'
import { setDetailWorkOrder } from '../../slices/customerSlice'
import { handleUserPopup } from '../../slices/themeSlice'

function CustomerWorkOrderList(props) {
  const workOrder = props.singleWorkOrder
  const dispatch = useDispatch()

  const handleDetail = () => {
    dispatch(setDetailWorkOrder(workOrder))
    dispatch(handleUserPopup('DETAIL'))
  }
  return (
    <div>
      <ul className='grid grid-cols-7 border-solid border-[1px] border-gray-700 py-10'>
        <li className='flex justify-center'>{props.ListId + 1}</li>
        <li className='flex justify-center'>
          {moment(workOrder.createdAt).format('Do MMMM YYYY, h:mm')}
        </li>
        <li className='flex justify-center'>
          {moment(workOrder.updatedAt).format('Do MMMM YYYY, h:mm')}
        </li>
        <li className='flex justify-center'>{workOrder.title}</li>
        <li className='flex justify-center'>
          {workOrder.statusFlag === 'U izradi' ? (
            <FiberManualRecordIcon color='warning' />
          ) : (
            ''
          )}
          {workOrder.statusFlag === 'Prekinuto' ? (
            <FiberManualRecordIcon color='error' />
          ) : (
            ''
          )}
          {workOrder.statusFlag === 'Završeno' ? (
            <FiberManualRecordIcon color='success' />
          ) : (
            ''
          )}
          {workOrder.statusFlag}
        </li>
        <li className='flex justify-center'>{workOrder.userId}</li>
        <li className='flex justify-center'>
          {/* DETALJI */}
          <div
            onClick={handleDetail}
            className='flex items-center justify-center w-8 h-8 hover:bg-blue-gray-800 rounded-xl cursor-pointer'
          >
            <GradingIcon />
          </div>
        </li>
      </ul>
    </div>
  )
}

export default CustomerWorkOrderList
