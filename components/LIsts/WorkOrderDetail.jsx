import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close'
import moment from 'moment'
import { cancelButton } from '../../slices/themeSlice'
import { setDetailWorkOrder } from '../../slices/customerSlice'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

function WorkOrderDetail() {
  const workOrderDetail = useSelector(
    (state) => state.customerContext.detailWorkOrder
  )
  const dispatch = useDispatch()

  const cancel = () => {
    dispatch(cancelButton())
    dispatch(setDetailWorkOrder([]))
  }

  return (
    <div className='flex flex-col w-[800px] h-full'>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <div className='flex text-[16px] gap-3'>
            <h1 className='flex text-[16px]'>Kreirano:</h1>
            {moment(workOrderDetail.createdAt).format('Do MMMM YYYY, h:mm')}
          </div>
          <div className='flex text-[16px] gap-3'>
            <h1 className='flex text-[16px]'>Ažurirano:</h1>
            {moment(workOrderDetail.updatedAt).format('Do MMMM YYYY, h:mm') ===
            'Invalid date'
              ? '-'
              : moment(workOrderDetail.updatedAt).format('Do MMMM YYYY, h:mm')}
          </div>
          <div className='flex items-center gap-3 text-[15px]'>
            <p>Status: </p>
            {workOrderDetail.statusFlag === 'U izradi' ? (
              <FiberManualRecordIcon color='warning' />
            ) : (
              ''
            )}
            {workOrderDetail.statusFlag === 'Prekinuto' ? (
              <FiberManualRecordIcon color='error' />
            ) : (
              ''
            )}
            {workOrderDetail.statusFlag === 'Završeno' ? (
              <FiberManualRecordIcon color='success' />
            ) : (
              ''
            )}
            {workOrderDetail.statusFlag}
          </div>
        </div>

        <div className='flex justify-end mb-10 hover:bg-blue-gray-800 rounded-xl cursor-pointer'>
          <div
            onClick={cancel}
            className='flex justify-center h-10 w-10 items-center hover:bg-blue-gray-800 rounded-xl cursor-pointer'
          >
            <CloseIcon />
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-start mt-11 gap-4'>
        <h1 className='flex justify-center text-[30px] pb-20'>
          {workOrderDetail.title}
        </h1>

        <div className='flex items-center gap-3 text-[15px]'>
          <p className='text-[20px]'>Opis: </p>

          {workOrderDetail.discription}
        </div>
      </div>
    </div>
  )
}

export default WorkOrderDetail
