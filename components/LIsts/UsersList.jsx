import Avatar from '@mui/material/Avatar'
import DotMenu from '../Ui/DotMenu'

function UsersList(props) {
  const oneUser = props.singleUser
  const componentId = props.index

  return (
    <tr className='text-[14px]'>
      <th className='border-solid border-x-[1px] border-gray-300 font-normal'>
        {oneUser?.name}
      </th>
      <td className='border-solid border-x-[1px] border-gray-300 font-normal'>
        {oneUser?.email}
      </td>
      <td className='border-solid border-x-[1px] border-gray-300 font-normal'>
        {oneUser?.role}
      </td>
      <td className='border-solid border-x-[1px] border-gray-300 font-normal'>
        <DotMenu singleUser={oneUser} index={componentId} />
      </td>
    </tr>
    // <div className='flex w-full h-24 justify-between items-center bg-secondary rounded-xl my-5 text-fontGray font-normal'>
    //   <li className='flex flex-[5] ml-6 gap-4 '>
    //     <Avatar className='z-0' src={oneUser?.image} alt='' />
    //     <div>
    //       <h3 className='text-font font-bold'>{oneUser?.name}</h3>
    //       <h3 className='text-fontGray'>{oneUser?.email}</h3>
    //     </div>
    //   </li>
    //   <li className='flex flex-[1]'>{oneUser?.role}</li>
    //   <li className='flex flex-[1]'>
    //     <div>
    //
    //     </div>
    //   </li>
    // </div>
  )
}
export default UsersList
