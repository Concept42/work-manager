import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const initialState = {
  id: '',
  deleteId: '',
  name: '',
  email: '',
  role: '',
  editMode: false,
  users: [],
  isLoading: false,
  error: '',
}

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await fetch(`/api/customer/getUserData`)
  const result = await response.json()
  return result
})

export const deleteUser = createAsyncThunk('user/deleteUser', async (id) => {
  const response = await fetch(`/api/customer/deleteUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })
})

export const userSlice = createSlice({
  name: 'userContext',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = false
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false
      state.users = action.payload
      state.error = ''
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false
      state.users = []
      state.error = action.error.message
    })
  },

  reducers: {
    updateUserForm: (state, action) => {
      const { id, name, email, role, editMode } = action.payload
      state.id = id
      ;(state.name = name), (state.email = email), (state.role = role)
      state.editMode = editMode
    },
    deleteId: (state, action) => {
      state.deleteId = action.payload
      state.users.splice()
    },
  },
})

export const { updateUserForm, deleteId } = userSlice.actions
export default userSlice.reducer
