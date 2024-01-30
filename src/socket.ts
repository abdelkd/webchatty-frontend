import { io } from 'socket.io-client'

const URL = process.env.NODE_ENV === 'production' 
  ? process.env.SOCKET_URL as string
  : 'http://localhost:3000';

export const socket = io("https://webchatty.onrender.com/", {
  autoConnect: false,
})
