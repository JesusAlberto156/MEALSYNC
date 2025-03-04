import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './components/styled/Backgrounds.css'
import "react-toastify/dist/ReactToastify.css";

import Login from './pages/Login'
import Menu from './pages/Menu';
import Administration from './pages/Administration';
import Warehouse from './pages/Warehouse';

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
    path:'/Menu',
    element:<Menu/>
  },
  {
    path:'/Administration',
    element:<Administration/>
  },
  {
    path:'/Warehouse',
    element:<Warehouse/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)