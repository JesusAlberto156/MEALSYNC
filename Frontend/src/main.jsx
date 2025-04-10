//____________IMPORT/EXPORT____________
// Hooks de React
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom'
// Componentes de React externos

// Servicios

// Rutas
import { PrivateRouteAdministration } from './routers/Administration';
import { PrivateRouteKitchen } from './routers/Kitchen';
// Contextos
import { AppProviders } from './contexts/AppProviders';
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados

// Componentes personalizados
import Index_Main from './pages/Indexs/Main';
import Login from './pages/general/Login';
import Home from './pages/general/Home';
import Index_Administration from './pages/Indexs/Administration';
import Users from './pages/administration/Users';
import TableUsers from './components/tables/TableUsers';
import Users_Add from './components/modals/users/UsersAdd';
import Users_View from './components/modals/users/UsersView';
import TablePermissions from './components/tables/TablePermissions';
import Permissions_Add from './components/modals/permissions/PermissionsAdd';
import Permissions_Edit from './components/modals/permissions/PermissionsEdit';
import Permissions_Super_Administrator from './components/modals/permissions/PermissionsSuperAdministrator';
import TableStatus from './components/tables/TableStatus';
import Status_Add from './components/modals/status/StatusAdd';
import Status_Enable from './components/modals/status/StatusEnable';
import Suppliers from './pages/administration/Suppliers';
import Inventory from './pages/administration/Inventory';
import Menus from './pages/administration/Menus';
import Record from './pages/administration/Record';
import Index_Kitchen from './pages/Indexs/Kitchen';
import Error from './pages/Error';
import Loading from './pages/Loading';
//____________IMPORT/EXPORT____________

const router = createHashRouter([
  {
    path:'/',
    element:<Loading/>
  },
  {
    path:'/',
    element: <Index_Main/>,
    children: [
      {
        path: '/',
        element: <PrivateRouteAdministration/>,
        children: [
          {
            path: 'Administration',
            element: <Index_Administration/>,
            children: [
              {
                path: 'Home',
                element: <Home/>
              },
              {
                path: 'Users',
                element: <Users/>,
                children: [
                  {
                    path: 'Principal',
                    element: <TableUsers/>,
                    children: [
                      {
                        path: 'Add',
                        element: <Users_Add/>
                      },

                      {
                        path: 'View',
                        element: <Users_View/>
                      },
                    ]
                  },
                  {
                    path: 'Permissions',
                    element: <TablePermissions/>,
                    children: [
                      {
                        path: 'Add',
                        element: <Permissions_Add/>
                      },
                      {
                        path: 'Edit',
                        element: <Permissions_Edit/>
                      },
                      {
                        path: 'Enable',
                        element: <Permissions_Super_Administrator/>
                      },
                    ]
                  },
                  {
                    path: 'Status',
                    element: <TableStatus/>,
                    children: [
                      {
                        path: 'Add',
                        element: <Status_Add/>
                      },
                      {
                        path: 'Enable',
                        element: <Status_Enable/>
                      },
                    ]
                  },
                ]
              },
              {
                path: 'Suppliers',
                element: <Suppliers/>
              },
              {
                path: 'Inventory',
                element: <Inventory/>
              },
              {
                path: 'Menus',
                element: <Menus/>
              },
              {
                path: 'Record',
                element: <Record/>
              }
            ]
          },
        ]
      },
      {
        path: '/',
        element: <PrivateRouteKitchen/>,
        children: [
          {
            path: 'Kitchen',
            element: <Index_Kitchen/>,
            children: [
              {
                path: 'Home',
                element: <Home/>
              },
            ]
          },
        ]
      },
      {
        path: 'Login',
        element: <Login/>
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