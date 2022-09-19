import { useAppSelector } from "../../utils/hooks";
import AddNewUser from "../Forms/AddNewUser";
import DeleteMessage from "./DeleteMessage";
import type { RootState } from "../../store";

import React from "react";
import AddNewCustomer from "../Forms/AddNewCustomer";

const Modal: React.FC = () => {
  const handle = useAppSelector(
    (state: RootState) => state.themeContext.popupHandler
  );

  return (
    <>
      {handle !== "" ? (
        <>
          <div className="flex w-screen h-screen bg-gray-200 opacity-50 fixed top-0 left-0 z-20"></div>
          <div className=" fixed  min-w-[600px] min-h-[500px] top-[7%] left-[35%] items-center  bg-white opacity-100 z-50 rounded-2xl py-10">
            <div className="flex flex-col min-w-[600px] min-h-[500px] justify-center items-center gap-2">
              <h1 className="text-[24px]">
                {handle === "ADDUSER" ? "Add new user" : ""}
                {handle === "ADDCUSTOMER" ? "Add new customer" : ""}
                {handle === "EDIT" ? "Edit user" : ""}
                {handle === "EDITCUSTOMER" ? "Edit customer" : ""}
                {handle === "DELETE" ? "" : ""}
              </h1>
              {handle === "ADDUSER" ? <AddNewUser /> : ""}
              {handle === "ADDCUSTOMER" ? <AddNewCustomer /> : ""}
              {handle === "EDIT" ? <AddNewUser /> : ""}
              {handle === "EDITCUSTOMER" ? <AddNewCustomer /> : ""}
              {handle === "DELETE CUSTOMER" ? <DeleteMessage /> : ""}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};
export default Modal;
