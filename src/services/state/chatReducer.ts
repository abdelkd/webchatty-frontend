import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Message } from "../../types"

type InitialState = {
  message: string,
  messages: Message[],
  roomId: null | string,
  isConnected: boolean,
}

const initialState: InitialState = {
  message: "",
  messages: [],
  roomId: null,
  isConnected: false,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    turnChatOn: (state) => {
      state.isConnected = true
    },
    turnChatOff: (state) => {
      state.isConnected = false
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload
    },
    setRoomId: (state, action: PayloadAction<string>) => {
      state.roomId = action.payload
    },
    addNewMessage: (state, action: PayloadAction<Message>) => {
      const { authorId, text, timeStamp } = action.payload

      const newMessage: Message = {
        text,
        timeStamp,
        authorId,
      }

      state.messages.unshift(newMessage)
    }
  },
})

export const { setMessage, addNewMessage, setRoomId, turnChatOn, turnChatOff } = chatSlice.actions

export default chatSlice.reducer