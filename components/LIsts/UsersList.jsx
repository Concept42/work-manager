import Avatar from '@mui/material/Avatar'
import DotMenu from '../Ui/DotMenu'

function UsersList(props) {
  const oneUser = props.singleUser
  const componentId = props.index

  return (
    <>
      <tr>
        <th>{componentId + 1}</th>
        <td>
          <Avatar src={oneUser.image} />
        </td>
        <td>{oneUser.name}</td>
        <td>{oneUser.role}</td>
        <td>
          <DotMenu singleUser={oneUser} index={componentId} />
        </td>
      </tr>
    </>
  )
}
export default UsersList
