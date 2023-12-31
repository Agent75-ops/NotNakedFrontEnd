import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { router } from './router.jsx'
import { RouterProvider } from 'react-router-dom'
import UserState from './Contexts/user-state.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserState>
      <RouterProvider router={router}/>
    </UserState>
  </React.StrictMode> 
)
