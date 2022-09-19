import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../utils/hooks";
import { handleUserPopup } from "../../slices/themeSlice";
import {
  addNewWorkOrder,
  updateWorkOrderForm,
  setEditMode,
} from "../../slices/workOrderSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { workOrderSchema } from "../Forms/FormValidate";

interface FormInputs {
  id: string;
  title: string;
  discription: string;
  statusFlag: string;
  customerId: string;
  userId: string;
}

export default function AddNewCustomer() {
  const dispatch = useAppDispatch();
  const editMode = useAppSelector((state) => state.workOrderContext.editMode);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(workOrderSchema),
  });

  const cancel = () => {
    dispatch(handleUserPopup(""));
    dispatch(
      updateWorkOrderForm({
        id: "",
        createdAt: "",
        updatedAt: "",
        title: "",
        discription: "",
        statusFlag: "",
      })
    );
    dispatch(setEditMode(false));
  };

  const onSubmit = handleSubmit(async (data) => {
    if (Object.keys(errors).length === 0) {
      dispatch(addNewWorkOrder(data));
      cancel();
      const response = await fetch(`/api/customer/addWorkOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          discription: data.discription,
          statusFlag: data.statusFlag,
        }),
      });
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col min-w-[500px]  text-font items-start "
    >
      <div className="flex flex-col w-full h-full justify-between gap-8">
        <div className="form-control w-full max-w-2xl">
          <input
            className={
              errors.title
                ? "input input-bordered input-error w-full max-w-lg"
                : "input input-bordered w-full max-w-lg"
            }
            {...register("title")}
            type="text"
            placeholder="Title*"
            name="title"
          />
          {errors.title && (
            <p className="text-error pt-2 ">{errors.title.message}</p>
          )}
        </div>
        <div className="form-control w-full max-w-2xl">
          <input
            className={
              errors.discription
                ? "input input-bordered input-error w-full max-w-lg"
                : "input input-bordered w-full max-w-lg"
            }
            {...register("discription")}
            type="text"
            placeholder="Discription*"
            name="discription"
          />
          {errors.discription && (
            <p className="text-error pt-2 ">{errors.discription.message}</p>
          )}
        </div>

        <div className="form-control w-full max-w-lg">
          <select
            {...register("statusFlag")}
            className={
              errors.statusFlag
                ? "select select-bordered input-error "
                : "select select-bordered"
            }
            id="statusFlag"
            name="statusFlag"
          >
            <option disabled>Choose status</option>
            <option value="In progress">In progress</option>
            <option value="Finished">Finished</option>
            <option value="Canceled">Canceled</option>
          </select>
          {errors.statusFlag && (
            <p className="text-error pt-2">{errors.statusFlag.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-4">
          {!editMode ? (
            <>
              <button onClick={cancel} className="btn btn-outline btn-md">
                Cancel
              </button>
              <button type="submit" className="btn btn-info btn-md">
                Add
              </button>
            </>
          ) : (
            <>
              „
              <div className="flex gap-4 w-full justify-end">
                <button onClick={cancel} className="btn btn-outline btn-md">
                  Cancel
                </button>
                <button
                  // onClick={handleUpdateData}
                  className="btn btn-info btn-md"
                >
                  Update
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
