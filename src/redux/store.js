import { configureStore } from '@reduxjs/toolkit'
import notesReducer from './reducers/notesReducer'
import userReducer from './reducers/userSlice'

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    user: userReducer
  }
})
