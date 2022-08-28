import Avatar from '@mui/material/Avatar'
import DotMenu from '../Ui/DotMenu'

function UsersList(props) {
  const oneUser = props.singleUser
  const componentId = props.index

  return (
    <div className='flex w-full h-24 justify-between items-center bg-secondary rounded-xl my-5 text-fontGray font-normal'>
      <li className='flex flex-[5] ml-6 gap-4 '>
        <Avatar className='z-0' src={oneUser?.image} alt='' />
        <div>
          <h3 className='text-font font-bold'>{oneUser?.name}</h3>
          <h3 className='text-fontGray'>{oneUser?.email}</h3>
        </div>
      </li>
      <li className='flex flex-[1]'>{oneUser?.role}</li>
      <li className='flex flex-[1]'>
        <div>
          <DotMenu singleUser={oneUser} index={componentId} />
        </div>
      </li>
    </div>
  )
}
export default UsersList
