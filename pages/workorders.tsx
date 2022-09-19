import React, { useState, useEffect } from "react";
import AddButton from "../components/Ui/AddButton";
import Modal from "../components/Ui/Modal";
import { useAppSelector } from "../utils/hooks";
import Loader from "../components/Ui/Loader";
import SearchIcon from "@mui/icons-material/Search";
import { WorkOrders } from "../slices/DbTypes";
import WorkOrderList from "../components/LIsts/WorkOrderList";

const WorkOrders: React.FC = () => {
  const contextWorkOrders: WorkOrders[] = useAppSelector(
    (state) => state.workOrderContext.workOrders
  );
  console.log(contextWorkOrders);
  const handleOpen = useAppSelector((state) => state.themeContext.popupHandler);

  const [isLoading, setIsLoading] = useState<string>("");
  return (
    <>
      <div>
        <section>{handleOpen !== "" ? <Modal /> : ""}</section>
        <section className="flex flex-col border-solid border-2 bg-white rounded-lg shadow-md py-10 w-full">
          <div className="flex justify-between pr-10 pb-16">
            <div className="flex relative ml-10 items-center justify-end  ">
              <SearchIcon className="absolute mr-2" />
              <input
                className="w-[300px] h-full input rounded-full"
                type="text"
                placeholder="Search"
                // onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
              />
            </div>
            <AddButton add={"customer"} />
          </div>
          <div className="flex w-full h-full  justify-end">
            <select className="mr-10 mb-2 select w-36">
              <option disabled>Sort by</option>
              <option value="asc">Asc: Name</option>
              <option value="dsc">Dsc: Name</option>
            </select>
          </div>
          <div className="overflow-x-auto w-full px-10 ">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Created</th>
                  <th>Updated</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {isLoading === "loading" ? (
                  <Loader />
                ) : (
                  contextWorkOrders &&
                  contextWorkOrders.map(
                    (workOrders: WorkOrders, index: number) => {
                      return (
                        <WorkOrderList
                          key={index}
                          workOrders={workOrders}
                          index={index}
                        />
                      );
                    }
                  )
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
};
export default WorkOrders;
