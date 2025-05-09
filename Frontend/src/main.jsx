//____________IMPORT/EXPORT____________
// Hooks de React
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom'
// Rutas
import { PrivateRouteAdministration } from './routers/Administration';
import { PrivateRouteKitchen } from './routers/Kitchen';
// Contextos
import { AppProviders } from './contexts/AppProviders';
// Estilos personalizados
import '../src/components/styled/Alerts.css';
import '../src/components/styled/animations/Rolls.css';
import '../src/components/styled/animations/Shadows.css';
import '../src/components/styled/animations/Pulsates.css';
import '../src/components/styled/animations/Slides.css';
import '../src/components/styled/animations/Puffs.css';
import '../src/components/styled/animations/Bounces.css';
import '../src/components/styled/animations/Rotates.css';
import 'animate.css';
// Componentes personalizados
import Index_Main from './pages/Indexs/Main';
import Error from './pages/general/Error';
import Loading from './pages/general/Loading';
import Login from './pages/general/Login';
import Out_Login from './components/modals/general/OutLogin';
import Index_Administration from './pages/Indexs/Administration';
import Home_Administration from './pages/administration/Home';
import Users from './pages/administration/Users';
import Table_Users from './components/tables/users/Users';
import User_Add from './components/modals/users/users/Add';
import User_Permissions_Add from './components/modals/users/users/PermissionsAdd';
import User_Edit from './components/modals/users/users/Edit';
import User_View from './components/modals/users/users/View';
import Table_Permissions from './components/tables/users/Permissions';
import Permissions_Add from './components/modals/users/permissions/Add';
import Permissions_Edit from './components/modals/users/permissions/Edit';
import Permissions_Enable from './components/modals/users/permissions/Enable';
import Table_Status from './components/tables/users/Status';
import Status_Add from './components/modals/users/status/Add';
import Status_Enable from './components/modals/users/status/Enable';
import Suppliers from './pages/administration/Suppliers';
import Chart_Suppliers from './components/charts/suppliers/Suppliers';
import Suppliers_Add from './components/modals/Suppliers/suppliers/Add';
import Suppliers_Edit from './components/modals/Suppliers/suppliers/Edit';
import Suppliers_Details from './components/modals/Suppliers/suppliers/Details';
import Observations_Chart from './components/charts/Observations';
import Inventory from './pages/administration/Inventory';
import Menus from './pages/administration/Menus';
import Record from './pages/administration/Record';
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
            path: 'Administration/Users/Users/Add',
            element: <User_Add/>,
          },
          {
            path: 'Administration/Users/Users/Add/Permissions',
            element: <User_Permissions_Add/>,
          },
          {
            path: 'Administration/Users/Users/Edit',
            element: <User_Edit/>,
          },
          {
            path: 'Administration/Users/Users/View',
            element: <User_View/>,
          },
          {
            path: 'Administration/Users/Permissions/Add',
            element: <Permissions_Add/>,
          },
          {
            path: 'Administration/Users/Permissions/Edit',
            element: <Permissions_Edit/>,
          },
          {
            path: 'Administration/Users/Permissions/Enable',
            element: <Permissions_Enable/>,
          },
          {
            path: 'Administration/Users/Status/Add',
            element: <Status_Add/>,
          },
          {
            path: 'Administration/Users/Status/Enable',
            element: <Status_Enable/>,
          },
          {
            path: 'Administration/Suppliers/Suppliers/Add',
            element: <Suppliers_Add/>,
          },
          {
            path: 'Administration/Suppliers/Suppliers/Edit',
            element: <Suppliers_Edit/>,
          },
          {
            path: 'Administration/Suppliers/Suppliers/Details',
            element: <Suppliers_Details/>,
          },
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
                    element: <Table_Users/>,
                  },
                  {
                    path: 'Permissions',
                    element: <Table_Permissions/>,
                  },
                  {
                    path: 'Status',
                    element: <Table_Status/>,
                  },
                ]
              },
              {
                path: 'Suppliers',
                element: <Suppliers/>,
                children: [
                  {
                    path: 'Suppliers',
                    element: <Chart_Suppliers/>
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