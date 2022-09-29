import React from 'react'
import WorkOrderList from '../LIsts/WorkOrderList'
import { WorkOrders } from '../../slices/DbTypes'
import moment from 'moment'

const WorkorderDetails = ({ workOrder }) => {
  return (
    <>
      <div className='flex flex-col overflow-x-auto w-full h-full px-10  '>
        <div className='flex justify-between items-center '>
          <h1>{workOrder.title}</h1>
          <h3>{moment(workOrder.createdAt).format('Do MMMM YYYY, h:mm')}</h3>
        </div>
        <div></div>
      </div>
    </>
  )
}
export default WorkorderDetails
