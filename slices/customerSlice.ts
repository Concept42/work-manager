import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import type { Customer, WorkOrders } from './DbTypes'

export interface CustomerState {
  sortedCustomers: Customer[]
  sortType: string
  customerForm: Customer
  customers: Customer[]
  deleteCustomerComponentId: number
  deleteCustomerId: string
  error: string
  status: string
  detailCustomer: Customer[]
  editMode: boolean
}

export type EditMode = {
  editCustomerMode: boolean
}

export const initialState: CustomerState = {
  customers: [],
  sortedCustomers: [],

  customerForm: {
    id: '',
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    adress: '',
    city: '',
    oib: null,
    phoneNumber: null,
  },

  deleteCustomerComponentId: null,
  deleteCustomerId: '',
  error: '',
  status: '',
  detailCustomer: [],
  editMode: false,
  sortType: '',
}

export const fetchCustomers = createAsyncThunk('user/fetchCustomers', async () => {
  const response = await fetch(`/api/customer/getCustomerData`)
  const result = await response.json()
  return result
})

export const deleteCustomer = createAsyncThunk('user/deleteUser', async (id: string) => {
  const response = await fetch(`/api/customer/deleteCustomer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })
})

export const customerSlice = createSlice({
  name: 'customerContext',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCustomers.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchCustomers.fulfilled, (state, action: PayloadAction<Customer[]>) => {
      state.status = 'succeeded'
      state.customers = action.payload
      state.sortedCustomers = state.customers.sort((a, b) => {
        if (state.sortType === 'asc') {
          const isReversed = state.sortType === 'asc' ? 1 : -1
          return isReversed * a.firstName.localeCompare(b.firstName)
        }
        if (state.sortType === 'dsc') {
          const isReversed = state.sortType === 'dsc' ? -1 : 1
          return isReversed * a.firstName.localeCompare(b.firstName)
        }
      })
      state.error = ''
    })
    builder.addCase(fetchCustomers.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.error.message
    })
  },

  reducers: {
    setDetailCustomer: (state, action: PayloadAction<Customer>) => {
      state.detailCustomer.push(action.payload)
    },
    getSortedCustomers: (state) => {
      state.sortedCustomers = state.customers.sort((a, b) => {
        const isReversed = state.sortType === 'asc' ? 1 : -1
        return isReversed * a.firstName.localeCompare(b.firstName)
      })
    },
    setSortType: (state, action: PayloadAction<string>) => {
      state.sortType = action.payload
    },
    addNewCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload)
    },
    deleteCustomerState: (state) => {
      state.customers.splice(state.deleteCustomerComponentId, 1)
    },
    setDeleteCustomerComponentId: (state, action) => {
      state.deleteCustomerComponentId = action.payload
    },
    setDeleteCustomerId: (state, action) => {
      state.deleteCustomerId = action.payload
    },
    setCustomerEditMode: (state, action: PayloadAction<boolean>) => {
      state.editMode = action.payload
    },
    updateCustomerForm: (state, action: PayloadAction<Customer>) => {
      const { id, firstName, lastName, companyName, email, adress, city, oib, phoneNumber } = action.payload
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
    },
    updateCustomer: (state, action) => {
      state.customers[state.deleteCustomerComponentId] = action.payload
    },
    setCustomerInit: (state) => {
      state.deleteCustomerComponentId = null
      state.deleteCustomerId = ''
    },
  },
})

export const customersList = (state: RootState) => state.customerContext.customers
export const updatedCustomer = (state: RootState) => state.customerContext.customerForm

export const {
  setDetailCustomer,
  addNewCustomer,
  deleteCustomerState,
  setDeleteCustomerComponentId,
  setDeleteCustomerId,
  updateCustomerForm,
  updateCustomer,
  setCustomerEditMode,
  setSortType,
  getSortedCustomers,
  setCustomerInit,
} = customerSlice.actions
export default customerSlice.reducer
