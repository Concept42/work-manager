import type { WorkOrders } from '../../slices/DbTypes'
import moment from 'moment'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import AppsIcon from '@mui/icons-material/Apps'
import { customerSchema } from '../Forms/FormValidate'

interface Props {
  workOrders?: WorkOrders
  index?: number
}

function WorkOrderList(props: Props) {
  const workOrders = props.workOrders

  console.log('WorkOrders', workOrders)
  return (
    <>
      {workOrders ? (
        <tr>
          <td>{<AppsIcon />}</td>
          <td>{moment(workOrders.createdAt).format('Do MMMM YYYY, h:mm')}</td>
          {workOrders.customer ? 
           <td>{workOrders.customer?.companyName}</td> :"" }
          
          <td>{workOrders.title}</td>
          <td>{workOrders.discription}</td>
          {workOrders.user ? 
           <td>{workOrders.user?.name}</td> :"" }
          <td>
            {workOrders.statusFlag === 'In progress' ? <FiberManualRecordIcon color='warning' /> : ''}
            {workOrders.statusFlag === 'Canceled' ? <FiberManualRecordIcon color='error' /> : ''}
            {workOrders.statusFlag === 'Finished' ? <FiberManualRecordIcon color='success' /> : ''}
          </td>
        </tr>
      ) : (
        ''
      )}
    </>
  )
}

export default WorkOrderList
