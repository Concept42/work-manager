import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import type { User } from './DbTypes'

interface UserState {
  userForm: User
  deleteComponentId: number
  deleteUserId: string
  editMode: boolean
  users: User[]
  status: string
  error: string
}

export const initialState: UserState = {
  userForm: {
    id: '',
    name: '',
    email: '',
    role: '',
    workOrders: [],
    accounts: [],
    sessions: [],
    image: '',
  },
  deleteComponentId: null,
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

export const deleteUser = createAsyncThunk('user/deleteUser', async (id: string) => {
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
    updateUserForm: (state: RootState, action: PayloadAction<User>) => {
      const { id, name, email, role, workOrders, accounts, sessions, image } = action.payload
      state.userForm = {
        id,
        name,
        email,
        role,
        workOrders,
        accounts,
        sessions,
        image,
      }
    },
    addNewUser: (state, action) => {
      state.users.push(action.payload)
    },
    setEditMode: (state, action: PayloadAction<boolean>) => {
      state.editMode = action.payload
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
      state.users.splice(state.deleteComponentId, 1, action.payload)
    },
    setUserInit: (state) => {
      state.deleteUserId = ''
      state.deleteComponentId = null
    },
  },
})

export const popupHandler = (state: RootState) => state.themeContext.popupHandler
export const contextUsers = (state: RootState) => state.userContext.users

export const {
  updateUserForm,
  setEditMode,
  deleteUserState,
  setDeleteComponentId,
  setDeleteUserId,
  addNewUser,
  updateUser,
  setUserInit,
} = userSlice.actions
export default userSlice.reducer
