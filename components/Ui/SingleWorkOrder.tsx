import React from 'react'
import WorkOrderList from '../LIsts/WorkOrderList'
import { WorkOrders } from '../../slices/DbTypes'
import moment from 'moment'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

const SingleWorkOrder = ({ workOrder }) => {
  return (
    <>
      <div className='flex flex-col overflow-x-auto w-full h-full px-10  gap-10'>
        <div className='flex justify-between items-center  '>
          <span>
            Status:{' '}
            <span className=''>
              {workOrder.statusFlag === 'In progress' ? <FiberManualRecordIcon color='warning' /> : ''}
              {workOrder.statusFlag === 'Canceled' ? <FiberManualRecordIcon color='error' /> : ''}
              {workOrder.statusFlag === 'Finished' ? <FiberManualRecordIcon color='success' /> : ''}
              {workOrder.statusFlag}
            </span>
          </span>

          <h3>{moment(workOrder.createdAt).format('Do MMMM YYYY, h:mm')}</h3>
        </div>
        <h1 className='flex text-2xl justify-center border-solid border-b-2'>Title: {workOrder.title}</h1>
        <h3>User: {workOrder.user.name}</h3>
        <h3>Discription: </h3>
        <p>{workOrder.discription} </p>
      </div>
    </>
  )
}
export default SingleWorkOrder
