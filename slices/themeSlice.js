import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  popupHandler: '',
}

export const themeSlice = createSlice({
  name: 'themeContext',
  initialState,
  reducers: {
    handleUserPopup: (state, action) => {
      state.popupHandler = action.payload
    },
    cancelButton: (state) => {
      state.popupHandler = ''
    },
  },
})

export const { handleUserPopup, cancelButton } = themeSlice.actions
export default themeSlice.reducer
