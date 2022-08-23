import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userPopupHandle: false,
}

export const popupSlice = createSlice({
  name: 'userPopupForm',
  initialState,
  reducers: {
    handlePopupState: (state) => {
      state.userPopupHandle = !state.userPopupHandle
    },
  },
})

export const { handlePopupState } = popupSlice.actions
export default popupSlice.reducer
