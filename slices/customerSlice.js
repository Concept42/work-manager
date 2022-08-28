import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const initialState = {
  customers: [],
  customerForm: {
    id: '',
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    adress: '',
    city: '',
    oib: '',
    phoneNumber: '',
  },

  deleteCustomerComponentId: '',
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
      state.deleteCustomerComponentId = action.payload
    },
    setDeleteCustomerId: (state, action) => {
      state.deleteCustomerId = action.payload
    },
    updateCustomerForm: (state, action) => {
      const {
        id,
        firstName,
        lastName,
        companyName,
        email,
        adress,
        city,
        oib,
        phoneNumber,
        editMode,
      } = action.payload
      state.customerForm = {
        id,
        firstName,
        lastName,
        companyName,
        email,
        adress,
        city,
        oib,
        phoneNumber,
      }
      state.editMode = editMode
    },
    updateCustomer: (state, action) => {
      state.customers[state.deleteCustomerComponentId] = action.payload
    },
  },
})

export const customersList = (state) => state.customerContext.customers

export const {
  setDetailWorkOrder,
  addNewCustomer,
  deleteCustomerState,
  setDeleteCustomerComponentId,
  setDeleteCustomerId,
  updateCustomerForm,
  updateCustomer,
} = customerSlice.actions
export default customerSlice.reducer
