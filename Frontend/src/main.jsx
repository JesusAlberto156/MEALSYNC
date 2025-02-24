import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './components/styled/Backgrounds.css'
import "react-toastify/dist/ReactToastify.css";

import CreateAccounts from './pages/CreateAccounts'
import Login from './pages/Login'

import { createHashRouter, RouterProvider } from 'react-router-dom'

const router = createHashRouter([
  {
    path:'/',
    element:<Login/>
  },
  {
    path:'/Login',
    element:<Login/>
  },
  {
    path:'/CreateAccounts',
    element:<CreateAccounts/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
