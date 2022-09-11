import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import type { User } from './DbTypes'

export interface UserState {
  userForm: User
  deleteComponentId: number
  deleteUserId: string
  editMode: boolean
  users: User[]
  status: string
  error: string
}

export type EditMode = {
  editMode: boolean
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
    password: '',
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
  name: 'User',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.status = 'fulfilled'
      state.users = action.payload
      state.error = ''
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.error.message
    })
  },

  reducers: {
    updateUserForm: (state, action: PayloadAction<User>) => {
      const { id, name, email, role, workOrders, accounts, sessions, image, password } = action.payload
      state.userForm = {
        id,
        name,
        email,
        role,
        workOrders,
        accounts,
        sessions,
        image,
        password,
      }
    },
    addNewUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload)
    },
    setEditMode: (state, action: PayloadAction<boolean>) => {
      state.editMode = action.payload
    },

    deleteUserState: (state) => {
      state.users.splice(state.deleteComponentId, 1)
    },
    setComponentId: (state, action: PayloadAction<number>) => {
      state.deleteComponentId = action.payload
    },
    setUserId: (state, action) => {
      state.deleteUserId = action.payload
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.users.splice(state.deleteComponentId, 1, action.payload)
    },
    setUserInit: (state) => {
      state.deleteUserId = ''
      state.deleteComponentId = null
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload
    },
  },
})

export const popupHandler = (state: RootState) => state.themeContext.popupHandler
export const contextUsers = (state: RootState) => state.userContext.users
export const updatedUser = (state: RootState) => state.userContext.userForm

export const {
  updateUserForm,
  setEditMode,
  deleteUserState,
  setComponentId,
  setUserId,
  addNewUser,
  updateUser,
  setUserInit,
  setIsLoading,
} = userSlice.actions
export default userSlice.reducer
