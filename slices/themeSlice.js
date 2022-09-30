import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  popupHandler: '',
  openSidebar: true,
  detailsPopupHandler: '',
}

export const themeSlice = createSlice({
  name: 'themeContext',
  initialState,
  reducers: {
    handleUserPopup: (state, action) => {
      state.popupHandler = action.payload
    },
    handleDetailsPopup: (state, action) => {
      state.detailsPopupHandler = action.payload
    },
    cancelButton: (state) => {
      state.popupHandler = !state.popupHandler
    },
    openSidebar: (state) => {
      state.openSidebar = !state.openSidebar
    },
  },
})

export const { handleUserPopup, cancelButton, openSidebar, handleDetailsPopup } = themeSlice.actions
export default themeSlice.reducer
