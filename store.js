import { configureStore } from '@reduxjs/toolkit'
import userPopupFormReducer from './slices/popupSlice'
import userReducer from './slices/userSlice'
import themeReducer from './slices/themeSlice'
import customerReducer from './slices/customerSlice'

export const store = configureStore({
  reducer: {
    userPopupForm: userPopupFormReducer,
    userContext: userReducer,
    themeContext: themeReducer,
    customerContext: customerReducer,
  },
})
