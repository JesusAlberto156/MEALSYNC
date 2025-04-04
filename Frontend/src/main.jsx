//____________IMPORT/EXPORT____________
// Hooks de React
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom'
// Componentes de React externos

// Servicios

// Rutas
import { PrivateRouteAdministration } from './routers/PrivateRouteAdministration';
import { PrivateRouteKitchen } from './routers/PrivateRouteKitchen';
// Contextos
import { AppProviders } from './contexts/AppProviders';
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados

// Componentes personalizados
import Login from './pages/Login';
import Kitchen from './pages/Kitchen';
import Administration from './pages/Administration';
import Error from './pages/Error';
import Loading from './pages/Loading';
//____________IMPORT/EXPORT____________

const router = createHashRouter([
  {
    path:'/',
    element:<Loading/>
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
        path:'Administration',
        element:<Administration/>
      },
    ]
  },
  {
    path:'/',
    element: <PrivateRouteKitchen/>,
    children: [
      {
        path:'Kitchen',
        element:<Kitchen/>
      },
    ]
  },
  {
    path:'*',
    element:<Error/>
  }
]);

createRoot(document.getElementById('root')).render(
  <AppProviders>
    <RouterProvider router={router}/>
  </AppProviders> 
)