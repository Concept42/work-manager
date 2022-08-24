import { configureStore } from '@reduxjs/toolkit'
import userPopupFormReducer from './slices/popupSlice'
import userReducer from './slices/userSlice'
import themeReducer from './slices/themeSlice'

export const store = configureStore({
  reducer: {
    userPopupForm: userPopupFormReducer,
    userContext: userReducer,
    themeContext: themeReducer,
  },
})
