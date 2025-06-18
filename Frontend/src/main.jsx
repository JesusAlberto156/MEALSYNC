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
import Table_Suppliers from './components/tables/suppliers/suppliers';
import Suppliers_Add from './components/modals/Suppliers/suppliers/Add';
import Suppliers_Edit from './components/modals/Suppliers/suppliers/Edit';
import Supplier_Delete from './components/modals/Suppliers/suppliers/Delete';
import Table_Supplier_Observations from './components/tables/suppliers/observations';
import Supplier_Observations_View from './components/modals/Suppliers/observations/View';
import Table_Supply_Categories from './components/tables/suppliers/categories';
import Table_Supply_Types from './components/tables/suppliers/supplyTypes';
import Table_Supplies from './components/tables/suppliers/supplies';
import Table_Supply_Orders from './components/tables/warehouse/SupplyOrders';
import Table_Purchases from './components/tables/warehouse/Purchases';
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
            path: 'Administration/Index/Users/Users/Add',
            element: <User_Add/>,
          },
          {
            path: 'Administration/Index/Users/Users/Add/Permissions',
            element: <User_Permissions_Add/>,
          },
          {
            path: 'Administration/Index/Users/Users/Edit',
            element: <User_Edit/>,
          },
          {
            path: 'Administration/Index/Users/Users/View',
            element: <User_View/>,
          },
          {
            path: 'Administration/Index/Users/Users/Delete',
            element: <User_Delete/>,
          },
          {
            path: 'Administration/Index/Users/Permissions/Add',
            element: <Permissions_Add/>,
          },
          {
            path: 'Administration/Index/Users/Permissions/Edit',
            element: <Permissions_Edit/>,
          },
          {
            path: 'Administration/Index/Users/Permissions/Enable',
            element: <Permissions_Enable/>,
          },
          {
            path: 'Administration/Index/Users/Status/Add',
            element: <Status_Add/>,
          },
          {
            path: 'Administration/Index/Users/Status/Enable',
            element: <Status_Enable/>,
          },
          {
            path: 'Administration/Index/Suppliers/Suppliers/Add',
            element: <Suppliers_Add/>,
          },
          {
            path: 'Administration/Index/Suppliers/Suppliers/Edit',
            element: <Suppliers_Edit/>,
          },
          {
            path: 'Administration/Index/Suppliers/Suppliers/Delete',
            element: <Supplier_Delete/>,
          },
          {
            path: 'Administration/Index/Suppliers/Observations/View',
            element: <Supplier_Observations_View/>,
          },
          {
            path: 'Administration/Index/Suppliers/Supply/Categories/Add',
          },
          {
            path: 'Administration/Index/Suppliers/Supply/Categories/Edit',
          },
          {
            path: 'Administration/Index/Suppliers/Supply/Categories/Delete',
          },
          {
            path: 'Administration/Index/Suppliers/Supply/Types/Add',
          },
          {
            path: 'Administration/Index/Suppliers/Supply/Types/Edit',
          },
          {
            path: 'Administration/Index/Suppliers/Supply/Types/Count/Edit',
          },
          {
            path: 'Administration/Index/Suppliers/Supply/Types/Delete',
          },
          {
            path: 'Administration/Index/Suppliers/Supply/Types/Detail',
          },
          {
            path: 'Administration/Index/Suppliers/Supplies/Add',
          },
          {
            path: 'Administration/Index/Suppliers/Supplies/Edit',
          },
          {
            path: 'Administration/Index/Suppliers/Supplies/Delete',
          },
          {
            path: 'Administration/Index/Warehouse/Supply/Orders/Add',
          },
          {
            path: 'Administration/Index/Warehouse/Supply/Orders/Edit',
          },
          {
            path: 'Administration/Index/Warehouse/Supply/Orders/State/Edit',
          },
          {
            path: 'Administration/Index/Warehouse/Supply/Orders/Observation/View',
          },
          {
            path: 'Administration/Index/Warehouse/Supply/Orders/Observation/Add',
          },
          {
            path: 'Administration/Index/Warehouse/Supply/Orders/Delete',
          },
          {
            path: 'Administration/Index/Warehouse/Sales/Add',
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
                    path: 'Users/Users',
                    element: <Table_Users/>,
                  },
                  {
                    path: 'Users/Permissions',
                    element: <Table_Permissions/>,
                  },
                  {
                    path: 'Users/Status',
                    element: <Table_Status/>,
                  },
                  {
                    path: 'Suppliers/Suppliers',
                    element: <Table_Suppliers/>
                  },
                  {
                    path: 'Suppliers/Observations',
                    element: <Table_Supplier_Observations/>
                  },
                  {
                    path: 'Suppliers/Supply/Categories',
                    element: <Table_Supply_Categories/>
                  },
                  {
                    path: 'Suppliers/Supply/Types',
                    element: <Table_Supply_Types/>
                  },
                  {
                    path: 'Suppliers/Supplies',
                    element: <Table_Supplies/>
                  },
                  {
                    path: 'Warehouse/Supply/Orders',
                    element: <Table_Supply_Orders/>
                  },
                  {
                    path: 'Warehouse/Purchases',
                    element: <Table_Purchases/>
                  }
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