import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Lobby from './screens/Lobby.jsx'
import { SocketProvider } from './context/SocketProvider.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Lobby></Lobby>
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SocketProvider>
      <RouterProvider router={router} />
    </SocketProvider>
  </React.StrictMode>,
)
