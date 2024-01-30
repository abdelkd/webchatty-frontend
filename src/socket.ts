import { io } from 'socket.io-client'
import { env } from '../env'

const URL = import.meta.env.PROD
  ? env.VITE_API_URL
  : 'http://localhost:3000';

export const socket = io(URL, {
  autoConnect: false,
})
