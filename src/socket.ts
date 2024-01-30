import { io } from 'socket.io-client'
import { env } from '../env'

const URL = process.env.NODE_ENV === 'production' 
  ? env.PUBLIC_API_URL
  : 'http://localhost:3000';

export const socket = io(URL, {
  autoConnect: false,
})
