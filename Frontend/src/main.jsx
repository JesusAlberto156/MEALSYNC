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
import '../src/components/styled/animations/Fades.css'
import 'animate.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
// Componentes personalizados
import Index_Main from './pages/Indexs/Main';
import Error from './pages/general/Error';
import Loading from './pages/general/Loading';
import Login from './pages/general/Login';
import Out_Login from './components/modals/general/OutLogin';
import Index_Administration from './pages/Indexs/Administration';
import Administration_Home from './pages/administration/Home';
import Administration_Index from './pages/administration/Index';
import Table_Users from './components/tables/users/Users';
import User_Add from './components/modals/users/users/Add';
import User_Permissions_Add from './components/modals/users/users/PermissionsAdd';
import User_Edit from './components/modals/users/users/Edit';
import User_View from './components/modals/users/users/View';
import User_Delete from './components/modals/users/users/Delete';
import Table_Permissions from './components/tables/users/Permissions';
import Permissions_Add from './components/modals/users/permissions/Add';
import Permissions_Edit from './components/modals/users/permissions/Edit';
import Permissions_Enable from './components/modals/users/permissions/Enable';
import Table_Status from './components/tables/users/Status';
import Status_Add from './components/modals/users/status/Add';
import Status_Enable from './components/modals/users/status/Enable';
import Chart_Suppliers from './components/charts/suppliers/Suppliers';
import Suppliers_Add from './components/modals/Suppliers/suppliers/Add';
import Suppliers_Edit from './components/modals/Suppliers/suppliers/Edit';
import Suppliers_Details from './components/modals/Suppliers/suppliers/Details';
import Chart_Observations from './components/charts/suppliers/Observations';

import Table_Warehouse from './components/tables/warehouse/Warehouse';
import Warehouse_Add from './components/modals/warehouse/warehouse/Add';
import Table_Supplies from './components/tables/warehouse/Supplies';
import Supply_Add from './components/modals/warehouse/supplies/Add';
import Supply_Edit from './components/modals/warehouse/supplies/Edit';
import Table_Supply_Types from './components/tables/warehouse/SupplyTypes';
import Supply_Type_Add from './components/modals/warehouse/supplyTypes/Add';
import Supply_Type_Edit from './components/modals/warehouse/supplyTypes/Edit';
import Unit_Add from './components/modals/warehouse/units.jsx/Add';
import Unit_Edit from './components/modals/warehouse/units.jsx/Edit';

import Menus from './pages/administration/Menus';
import Record from './pages/administration/Record';
import Index_Kitchen from './pages/Indexs/Kitchen';
import Home_Kitchen from './pages/kitchen/Home';

import Prueba from '../src/formats/ComandaMedica';
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
    path: '/Prueba',
    element: <Prueba/>
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
            path: 'Administration/Users/Add',
            element: <User_Add/>,
          },
          {
            path: 'Administration/Users/Add/Permissions',
            element: <User_Permissions_Add/>,
          },
          {
            path: 'Administration/Users/Edit',
            element: <User_Edit/>,
          },
          {
            path: 'Administration/Users/View',
            element: <User_View/>,
          },
          {
            path: 'Administration/Users/Delete',
            element: <User_Delete/>,
          },
          {
            path: 'Administration/Permissions/Add',
            element: <Permissions_Add/>,
          },
          {
            path: 'Administration/Permissions/Edit',
            element: <Permissions_Edit/>,
          },
          {
            path: 'Administration/Permissions/Enable',
            element: <Permissions_Enable/>,
          },
          {
            path: 'Administration/Status/Add',
            element: <Status_Add/>,
          },
          {
            path: 'Administration/Status/Enable',
            element: <Status_Enable/>,
          },
          {
            path: 'Administration/Suppliers/Add',
            element: <Suppliers_Add/>,
          },
          {
            path: 'Administration/Suppliers/Edit',
            element: <Suppliers_Edit/>,
          },
          {
            path: 'Administration/Suppliers/Details',
            element: <Suppliers_Details/>,
          },
          {
            path: 'Administration/Warehouse/Add',
            element: <Warehouse_Add/>,
          },
          
          {
            path: 'Administration/Supplies/Add',
            element: <Supply_Add/>,
          },
          {
            path: 'Administration/Supplies/Edit',
            element: <Supply_Edit/>,
          },
          {
            path: 'Administration/Supply-Type/Add',
            element: <Supply_Type_Add/>,
          },
          {
            path: 'Administration/Supply-Type/Edit',
            element: <Supply_Type_Edit/>,
          },
          {
            path: 'Administration/Unit/Add',
            element: <Unit_Add/>,
          },
          {
            path: 'Administration/Unit/Edit',
            element: <Unit_Edit/>,
          },
          {
            path: 'Administration',
            element: <Index_Administration/>,
            children: [
              {
                path: 'Home',
                element: <Administration_Home/>
              },
              {
                path: 'Index',
                element: <Administration_Index/>,
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
                  {
                    path: 'Suppliers',
                    element: <Chart_Suppliers/>
                  },
                  {
                    path: 'Observations',
                    element: <Chart_Observations/>
                  },
                  {
                    path: 'Warehouse',
                    element: <Table_Warehouse/>
                  },
                  {
                    path: 'Supplies',
                    element: <Table_Supplies/>
                  },
                  {
                    path: 'Supply-Types',
                    element: <Table_Supply_Types/>
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