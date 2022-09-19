import { configureStore } from '@reduxjs/toolkit'
import User from './slices/userSlice'
import themeReducer from './slices/themeSlice'
import customerReducer from './slices/customerSlice'
import workOrderReducer from "./slices/workOrderSlice"

export const store = configureStore({
  reducer: {
    userContext: User,
    themeContext: themeReducer,
    customerContext: customerReducer,
    workOrderContext:workOrderReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
