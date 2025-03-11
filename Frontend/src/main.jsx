import { createRoot } from 'react-dom/client'

import './components/styled/Backgrounds.css'
import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer } from "react-toastify";

import Login from './pages/Login'
import Menu from './pages/Menu';
import Administrator from './pages/Administrator';
import Error from './pages/Error';

import { createHashRouter, RouterProvider } from 'react-router-dom'

import { PrivateRouteAdministration } from './routers/PrivateRouteAdministration';
import { PrivateRouteKitchen } from './routers/PrivateRouteKitchen';
import { AppProviders } from './contexts/AppProviders';

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
    path:'/',
    element: <PrivateRouteAdministration/>,
    children: [
      {
        path:'Administrator',
        element:<Administrator/>
      },
    ]
  },
  {
    path:'/',
    element: <PrivateRouteKitchen/>,
    children: [
      {
        path:'Menu',
        element:<Menu/>
      },
    ]
  },
  {
    path:'*',
    errorElement:<Error/>
  }
]);

createRoot(document.getElementById('root')).render(
  <AppProviders>
    <RouterProvider router={router}/>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      closeOnClick
      pauseOnHover
      draggable
      pauseOnFocusLoss
      newestOnTop={false}
      hideProgressBar={false}
      rtl={false}
      transition={Bounce}
      limit={5}
    />
  </AppProviders> 
)