import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const initialState = {
  customers: [],
  error: '',
  isLoading: false,
  detailWorkOrder: [],
}

export const fetchCustomers = createAsyncThunk(
  'user/fetchCustomers',
  async () => {
    const response = await fetch(`/api/customer/getCustomerData`)
    const result = await response.json()
    return result
  }
)

// export const deleteUser = createAsyncThunk('user/deleteUser', async (id) => {
//   const response = await fetch(`/api/customer/deleteUser`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ id }),
//   })
// })

export const customerSlice = createSlice({
  name: 'customerContext',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCustomers.pending, (state) => {
      state.isLoading = false
    })
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      state.isLoading = false
      state.customers = action.payload
      state.error = ''
    })
    builder.addCase(fetchCustomers.rejected, (state, action) => {
      state.isLoading = false
      state.customers = []
      state.error = action.error.message
    })
  },

  reducers: {
    setDetailWorkOrder: (state, action) => {
      state.detailWorkOrder = action.payload
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

export const { setDetailWorkOrder } = customerSlice.actions
export default customerSlice.reducer
