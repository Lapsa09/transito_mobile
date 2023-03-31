import { configureStore } from '@reduxjs/toolkit'
import { authReducer, IRootUser } from './userSlice'
import { selectReducer, ISelectRouter } from './selectsSlice'

export type IRootState = {
  user: IRootUser
  selects: ISelectRouter
}

export const store = configureStore({
  reducer: { user: authReducer, selects: selectReducer },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      ...getDefaultMiddleware(),
      serializableCheck: false,
    })
  },
})

export type AppDispatch = typeof store.dispatch
