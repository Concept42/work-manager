import Card from "./Card";
import CloseIcon from "@mui/icons-material/Close";
import { Customer, WorkOrders } from "../../slices/DbTypes";
import { handleUserPopup } from "../../slices/themeSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { useEffect, useState } from "react";

interface Props {
  singleCustomer?: Customer;
  customerWorkOrders?: WorkOrders[];
}

type workOrder = WorkOrders[];

export default function WorkDetailModal(props: Props) {
  const [workOrders, setWorkOrders] = useState<workOrder>([]);
  const singleCustomer = props.singleCustomer;
  const detailCustomer = useAppSelector(
    (state) => state.customerContext.detailCustomer
  );
  const popupHandler = useAppSelector(
    (state) => state.themeContext.popupHandler
  );
  const dispatch = useAppDispatch();
  console.log(detailCustomer);

  useEffect(() => {
    setWorkOrders(singleCustomer.workOrders);
  }, [singleCustomer]);

  const handleClick = () => {
    setWorkOrders(singleCustomer.workOrders);
    dispatch(handleUserPopup(""));
  };

  return (
    <>
      <div className=" w-screen h-screen bg-gray-200 opacity-50 fixed left-0 top-0 z-20"></div>
      <div className="flex flex-col justify-start items-center min-w-[80%] min-h-[80%] fixed top-[10%] left-[10%]   bg-white opacity-100 z-50 rounded-2xl p-10 ">
        <div
          onClick={handleClick}
          className="absolute right-0 top-0 text-[50px] "
        >
          <CloseIcon fontSize="inherit" />
        </div>
        <h1 className="text-[36px]">
          {singleCustomer?.companyName} - Work Orders
        </h1>
        <div className="grid grid-cols-4 gap-10 p-10">
          {workOrders?.map((singleWorkOrder, index) => {
            return <Card key={index} singleWorkOrder={singleWorkOrder} />;
          })}
        </div>
      </div>
    </>
  );
}
