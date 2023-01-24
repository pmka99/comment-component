import { configureStore } from '@reduxjs/toolkit'
import commentSlices from './commentSlices'

const store = configureStore({
  reducer: {
    comment:commentSlices
  },
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch


export default store