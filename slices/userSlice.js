import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const initialState = {
  userForm: {
    id: '',
    name: '',
    email: '',
    role: '',
  },
  deleteComponentId: '',
  deleteUserId: '',
  editMode: false,
  users: [],
  status: '',
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
      state.status = 'loading'
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.users = action.payload
      state.error = ''
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  },

  reducers: {
    updateUserForm: (state, action) => {
      const { id, name, email, role, editMode } = action.payload
      state.userForm = { id, name, email, role }
      state.editMode = editMode
    },
    addNewUser: (state, action) => {
      state.users.push(action.payload)
    },

    deleteUserState: (state) => {
      state.users.splice(state.deleteComponentId, 1)
    },
    setDeleteComponentId: (state, action) => {
      state.deleteComponentId = action.payload
    },
    setDeleteUserId: (state, action) => {
      state.deleteUserId = action.payload
    },
    updateUser: (state, action) => {
      state.users[state.deleteComponentId] = action.payload
    },
  },
})

export const users = (state) => state.userContext.users
export const getUsersStatus = (state) => state.userContext.status
export const getDeleteId = (state) => state.userContext.deleteId

export const {
  updateUserForm,
  deleteId,
  deleteUserState,
  setDeleteComponentId,
  setDeleteUserId,
  addNewUser,
  updateUser,
} = userSlice.actions
export default userSlice.reducer
