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
import '../src/components/styled/Animations.css'
import '../src/components/styled/Alerts.css'
import '../src/components/styled/Shadows.css'
import 'animate.css';

// Componentes personalizados
import Index_Main from './pages/Indexs/Main';
import Error from './pages/Error';
import Loading from './pages/Loading';
import Login from './pages/general/Login';
import Out_Login from './components/modals/General/OutLogin';
import Index_Administration from './pages/Indexs/Administration';
import Home_Administration from './pages/administration/Home';
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
import Suppliers_Chart from './components/charts/Suppliers';
import Observations_Chart from './components/charts/Observations';
import Table_Suppliers from './components/tables/Suppliers';
import Table_Observations from './components/tables/Observations';
import Inventory from './pages/administration/Inventory';
import Table_Inventory from './components/tables/Inventory';
import Table_Ingredients from './components/tables/Ingredients';
import Menus from './pages/administration/Menus';
import Record from './pages/administration/Record';
import Table_Record_Invetory from './components/tables/RecordInventory';
import Table_Record_Suppliers from './components/tables/RecordSuppliers';
import Table_General from './components/tables/General';
import Index_Kitchen from './pages/Indexs/Kitchen';
import Home_Kitchen from './pages/kitchen/Home';
//____________IMPORT/EXPORT____________

const router = createHashRouter([
  {
    path:'/',
    element:<Loading/>
  },
  {
    path: '/Login',
    element: <Login/>
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
                element: <Home_Administration/>
              },
              {
                path: 'Users',
                element: <Users/>,
                children: [
                  {
                    path: 'Users',
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
                element: <Suppliers/>,
                children: [
                  {
                    path: 'Suppliers',
                    element: <Suppliers_Chart/>
                  },
                  {
                    path: 'Observations',
                    element: <Observations_Chart/>
                  }
                ]
              },
              {
                path: 'Inventory',
                element: <Inventory/>,
                children: [
                  {
                    path: 'Inventory',
                    element: <Table_Inventory/>,
                  },
                  {
                    path: 'Ingredients',
                    element: <Table_Ingredients/>,
                  },
                ]
              },
              {
                path: 'Menus',
                element: <Menus/>
              },
              {
                path: 'Record',
                element: <Record/>,
                children: [
                  {
                    path: 'General',
                    element: <Table_General/>
                  },
                  {
                    path: 'Inventory',
                    element: <Table_Record_Invetory/>
                  },
                  {
                    path: 'Suppliers',
                    element: <Table_Record_Suppliers/>
                  },
                ]
              }
            ]
          },
          {
            path: 'Administration/Out_Login',
            element: <Out_Login/>
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
                element: <Home_Kitchen/>
              },
            ]
          },
          {
            path: 'Kitchen/Out_Login',
            element: <Out_Login/>
          },
        ]
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