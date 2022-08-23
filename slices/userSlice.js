import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  id: '',
  name: '',
  email: '',
  role: '',
  editMode: false,
}

export const userSlice = createSlice({
  name: 'userContext',
  initialState,
  reducers: {
    updateUserForm: (state, action) => {
      const { id, name, email, role, editMode } = action.payload
      state.id = id
      ;(state.name = name), (state.email = email), (state.role = role)
      state.editMode = editMode
    },
  },
})

export const { updateUserForm } = userSlice.actions
export default userSlice.reducer
