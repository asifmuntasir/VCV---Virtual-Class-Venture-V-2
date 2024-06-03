import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Lobby from './screens/Lobby.jsx'
import { SocketProvider } from './context/SocketProvider.jsx'
import Room from './screens/Room.jsx'
import Layout from '../src/Layout/Layout.jsx'
import Home from '../src/pages/Home/Home.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout></Layout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/meeting',
        element: <Lobby></Lobby>
      },
      {
        path: '/room/:roomId',
        element: <Room></Room>
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SocketProvider>
      <RouterProvider router={router}>

      </RouterProvider>
    </SocketProvider>
  </React.StrictMode>,
)
