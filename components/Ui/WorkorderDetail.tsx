import React from 'react'
import WorkOrderList from '../LIsts/WorkOrderList'
import { WorkOrders } from '../../slices/DbTypes'

const WorkorderDetail = ({ workOrder }) => {
  return (
    <>
      <div className='overflow-x-auto w-full px-10 '>
        <table className='table w-full'>
          <thead>
            <tr>
              <th>Details</th>
              <th>Created</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {workOrder &&
              workOrder.workOrders?.map((workOrders: WorkOrders, index: number) => {
                return <WorkOrderList key={index} workOrders={workOrders} index={index} />
              })}
          </tbody>
        </table>
      </div>
    </>
  )
}
export default WorkorderDetail
