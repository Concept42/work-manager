import type { WorkOrders } from "../../slices/DbTypes";

interface Props {
  workOrders?: WorkOrders;
  index?: number;
}

function WorkOrderList(props: Props) {
  const workOrders = props.workOrders;
  const componentId = props.index;

  return (
    <>
      <tr>
        <th>
          <div className="w-6 h-7 justify-center items-center hover:bg-slate-400 cursor-pointer"></div>
        </th>

        <td>{workOrders?.createdAt}</td>
        <td>{workOrders?.updatedAt}</td>
        <td>{workOrders?.title}</td>
        <td>{workOrders?.discription}</td>
        <td>{workOrders?.statusFlag}</td>
      </tr>
    </>
  );
}

export default WorkOrderList;
