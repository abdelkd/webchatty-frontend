import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'

import Root from './routes/root';
import { store } from './services/state/store';
import { env } from '../env'

console.log(import.meta.env.VITE_API_URL)
console.log(env.VITE_API_URL)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
