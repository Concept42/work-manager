import { Customer, WorkOrders } from '../../slices/DbTypes'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { handleDetailsPopup } from '../../slices/themeSlice'
import { useAppDispatch } from '../../utils/hooks'
import { setdetailWorkORder } from '../../slices/workOrderSlice'
import { SingleBed } from '@mui/icons-material'
interface Props {
  singleWorkOrder?: WorkOrders
  singleCustomer?: Customer
  key?: number
}

export default function Card(props: Props) {
  const workOrder = props.singleWorkOrder
  const dispatch = useAppDispatch()

  const handleDetails = () => {
    dispatch(handleDetailsPopup('DETAIL'))
    dispatch(setdetailWorkORder(workOrder))
  }

  console.log('singlework order', workOrder)
  return (
    <>
      <div>
        <div className='card w-96 bg-base-100 shadow-xl '>
          <figure className='px-10 '></figure>
          <div className='card-body items-center text-center'>
            <div className='flex w-full justify-end my-2'>
              {workOrder?.statusFlag === 'In progress' ? <FiberManualRecordIcon color='warning' /> : ''}
              {workOrder?.statusFlag === 'Canceled' ? <FiberManualRecordIcon color='error' /> : ''}
              {workOrder?.statusFlag === 'Finished' ? <FiberManualRecordIcon color='success' /> : ''}
            </div>
            <h2 className='card-title'>{workOrder?.title}</h2>
            <p className='my-5'>{workOrder?.discription}</p>
            <div className='card-actions'>
              <button onClick={handleDetails} className='btn btn-info text-white'>
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
