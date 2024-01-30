import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatReducer";


export const store = configureStore({
  reducer: {
    chat: chatReducer
  },
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch