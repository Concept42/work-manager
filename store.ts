import { configureStore } from '@reduxjs/toolkit'
import User from './slices/userSlice'
import themeReducer from './slices/themeSlice'
import customerReducer from './slices/customerSlice'

export const store = configureStore({
  reducer: {
    userContext: User,
    themeContext: themeReducer,
    customerContext: customerReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
