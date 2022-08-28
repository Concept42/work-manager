import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const initialState = {
  customers: [],
  deleteComponentId: '',
  deleteCustomerId: '',
  error: '',
  status: '',
  detailWorkOrder: [],
  editMode: false,
}

export const fetchCustomers = createAsyncThunk(
  'user/fetchCustomers',
  async () => {
    const response = await fetch(`/api/customer/getCustomerData`)
    const result = await response.json()
    return result
  }
)

export const deleteCustomer = createAsyncThunk(
  'user/deleteUser',
  async (id) => {
    const response = await fetch(`/api/customer/deleteCustomer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
  }
)

export const customerSlice = createSlice({
  name: 'customerContext',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCustomers.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.customers = action.payload
      state.error = ''
    })
    builder.addCase(fetchCustomers.rejected, (state, action) => {
      state.status = 'failed'
      state.customers = []
      state.error = action.error.message
    })
  },

  reducers: {
    setDetailWorkOrder: (state, action) => {
      state.detailWorkOrder = action.payload
    },
    addNewCustomer: (state, action) => {
      state.customers.push(action.payload)
    },
    deleteCustomerState: (state) => {
      state.customers.splice(state.deleteComponentId, 1)
    },
    setDeleteCustomerComponentId: (state, action) => {
      state.deleteComponentId = action.payload
    },
    setDeleteCustomerId: (state, action) => {
      state.deleteCustomerId = action.payload
    },
    // updateUserForm: (state, action) => {
    //   const { id, name, email, role, editMode } = action.payload
    //   state.id = id
    //   ;(state.name = name), (state.email = email), (state.role = role)
    //   state.editMode = editMode
    // },
    // deleteCustomerState: (state, action) => {
    //   state.deleteId = action.payload
    //   state.users = state.users.filter((user) => user.id !== state.deleteId)
    // },
  },
})

export const customersList = (state) => state.customerContext.customers

export const {
  setDetailWorkOrder,
  addNewCustomer,
  deleteCustomerState,
  setDeleteCustomerComponentId,
  setDeleteCustomerId,
} = customerSlice.actions
export default customerSlice.reducer
