import Avatar from "@mui/material/Avatar";
import DotMenu from "../Ui/DotMenu";
import type { User } from "../../slices/DbTypes";

interface Props {
  singleUser: User;
  index: number;
}

export default function UsersList(props: Props) {
  const oneUser = props.singleUser;
  const componentId = props.index;

  return (
    <>
      <tr>
        <th>{componentId + 1}</th>
        <td>
          <Avatar src={oneUser?.image} />
        </td>
        <td>{oneUser?.name}</td>
        <td>{oneUser?.email}</td>
        <td>{oneUser?.role}</td>
        <td>
          <DotMenu singleUser={oneUser} index={componentId} />
        </td>
      </tr>
    </>
  );
}
