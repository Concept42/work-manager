import React, { useState, useEffect } from "react";
import AddButton from "../components/Ui/AddButton";
import Modal from "../components/Ui/Modal";
import { useAppSelector } from "../utils/hooks";

const WorkOrders: React.FC = () => {
  const handle = useAppSelector((state) => state.themeContext.popupHandler);
  return (
    <>
      <section>{handle !== "" ? <Modal /> : ""}</section>
      <section className="flex flex-col border-solid border-2 bg-white rounded-lg shadow-md py-10 w-full">
        <div className="flex justify-end pr-10 pb-10">
          <AddButton add={"workOrder"} />
        </div>
      </section>
    </>
  );
};
export default WorkOrders;
