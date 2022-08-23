import { configureStore } from '@reduxjs/toolkit'
import userPopupFormReducer from './slices/popupSlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    userPopupForm: userPopupFormReducer,
    userContext: userReducer,
  },
})
