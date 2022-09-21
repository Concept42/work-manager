import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { WorkOrders } from './DbTypes'


export interface WorkOrderState {
  workOrders: WorkOrders[]
  workOrderForm: WorkOrders
  componentId: number
  workOrderId: string
  editMode: boolean
  status: string
  error: string
}

export const initialState: WorkOrderState = {
  workOrders: [],
  workOrderForm: {
    id: "",
    createdAt: "",
    updatedAt: "",
    title: "",
    discription: "",
    statusFlag: "",
  },
  componentId: null,
  workOrderId: "",
  editMode: false,
  status: "",
  error: ""
}

export const fetchWorkOrders = createAsyncThunk('workOrder/fetchWorkOrders', async () => {
  const response = await fetch(`/api/customer/getOrderData`)
  const result = await response.json()
  return result
})

// export const deleteUser = createAsyncThunk('user/deleteUser', async (id: string) => {
//   const response = await fetch(`/api/customer/deleteWorkOrder`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ id }),
//   })
// })


export const workOrderSlice = createSlice({
  name: "WorkOrder",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchWorkOrders.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(fetchWorkOrders.fulfilled, (state, action: PayloadAction<WorkOrders[]>) => {
      state.status = "fulfilled"
      state.workOrders = action.payload
      state.error = ""
    })
    builder.addCase(fetchWorkOrders.rejected, (state, action) => {
      state.status = "rejected"
      state.error = action.error.message
    })
  },
  reducers: {
    addNewWorkOrder: (state, action: PayloadAction<WorkOrders>) => {
      state.workOrders.push(action.payload)
    },
    updateWorkOrderForm: (state, action: PayloadAction<WorkOrders>) => {
      const { id, createdAt, updatedAt, title, discription, statusFlag } = action.payload
      state.workOrderForm = {
        id,
        createdAt,
        updatedAt,
        title,
        discription,
        statusFlag,
      }
    },
    setEditMode: (state, action: PayloadAction<boolean>) => {
      state.editMode = action.payload
    },
  }
})

export const {
  addNewWorkOrder, updateWorkOrderForm, setEditMode
} = workOrderSlice.actions
export default workOrderSlice.reducer