import { WorkOrders } from '../../slices/DbTypes'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

interface Props {
  singleWorkOrder?: WorkOrders
  key?: number
}

export default function Card(props: Props) {
  const workOrder = props.singleWorkOrder
  return (
    <>
      <div className='card w-96 bg-base-100 shadow-xl '>
        <figure className='px-10 '></figure>
        <div className='card-body items-center text-center'>
          <div className='flex w-full justify-end my-2'>
            {workOrder?.statusFlag === 'U izradi' ? <FiberManualRecordIcon color='warning' /> : ''}
            {workOrder?.statusFlag === 'Prekinuto' ? <FiberManualRecordIcon color='error' /> : ''}
            {workOrder?.statusFlag === 'Završeno' ? <FiberManualRecordIcon color='success' /> : ''}
          </div>
          <h2 className='card-title'>{workOrder?.title}</h2>
          <p className='my-5'>{workOrder?.discription}</p>
          <div className='card-actions'>
            <button className='btn btn-info text-white'>Details</button>
          </div>
        </div>
      </div>
    </>
  )
}
