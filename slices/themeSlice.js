import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  popupHandler: '',
  openSidebar: false,
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
    openSidebar: (state) => {
      state.openSidebar = !state.openSidebar
    },
  },
})

export const { handleUserPopup, cancelButton, openSidebar } = themeSlice.actions
export default themeSlice.reducer
