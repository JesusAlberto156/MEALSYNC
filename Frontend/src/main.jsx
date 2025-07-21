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
import '../src/components/styled/Global.css'
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
import Supplier_Add from './components/modals/Suppliers/suppliers/Add';
import Supplier_Edit from './components/modals/Suppliers/suppliers/Edit';
import Supplier_Delete from './components/modals/Suppliers/suppliers/Delete';
import Table_Supplier_Observations from './components/tables/suppliers/observations';
import Supplier_Observation_View from './components/modals/Suppliers/observations/View';
import Table_Supply_Categories from './components/tables/suppliers/categories';
import Supply_Category_Add from './components/modals/Suppliers/supplyCategories/Add';
import Supply_Category_Edit from './components/modals/Suppliers/supplyCategories/Edit';
import Supply_Category_Delete from './components/modals/Suppliers/supplyCategories/Delete';
import Table_Supply_Types from './components/tables/suppliers/supplyTypes';
import Supply_Type_Add from './components/modals/Suppliers/supplyTypes/Add';
import Supply_Type_Edit from './components/modals/Suppliers/supplyTypes/Edit';
import Count_Supply_Type_Add from './components/modals/Suppliers/supplyTypes/CountAdd';
import Supply_Type_Details from './components/modals/Suppliers/supplyTypes/Detail';
import Supply_Type_Delete from './components/modals/Suppliers/supplyTypes/Delete';
import Table_Supplies from './components/tables/suppliers/supplies';
import Supply_Add from './components/modals/Suppliers/supplies/Add';
import Supply_Edit from './components/modals/Suppliers/supplies/Edit';
import Supply_Delete from './components/modals/Suppliers/supplies/Delete';

import Table_Purchases from './components/tables/warehouse/Purchases';
import Table_Sales from './components/tables/warehouse/Sales';
import Table_Menus from './components/tables/menus/Menus';
import Menu_Add from './components/modals/Menus/Menus/Add';
import Table_Breakfasts from './components/tables/menus/Breakfast';
import Table_Lunchs from './components/tables/menus/Lunch';
import Table_Dinners from './components/tables/menus/Dinner';
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
            element: <Supplier_Add/>,
          },
          {
            path: 'Administration/Index/Suppliers/Suppliers/Edit',
            element: <Supplier_Edit/>,
          },
          {
            path: 'Administration/Index/Suppliers/Suppliers/Delete',
            element: <Supplier_Delete/>,
          },
          {
            path: 'Administration/Index/Suppliers/Observations/View',
            element: <Supplier_Observation_View/>,
          },
          {
            path: 'Administration/Index/Suppliers/Supply/Categories/Add',
            element: <Supply_Category_Add/>,
          },
          {
            path: 'Administration/Index/Suppliers/Supply/Categories/Edit',
            element: <Supply_Category_Edit/>,
          },
          {
            path: 'Administration/Index/Suppliers/Supply/Categories/Delete',
            element: <Supply_Category_Delete/>,
          },
          {
            path: 'Administration/Index/Suppliers/Supply/Types/Add',
            element: <Supply_Type_Add/>,
          },
          {
            path: 'Administration/Index/Suppliers/Supply/Types/Edit',
            element: <Supply_Type_Edit/>,
          },
          {
            path: 'Administration/Index/Suppliers/Supply/Types/Count/Add',
            element: <Count_Supply_Type_Add/>,
          },
          {
            path: 'Administration/Index/Suppliers/Supply/Types/Delete',
            element: <Supply_Type_Delete/>,
          },
          {
            path: 'Administration/Index/Suppliers/Supply/Types/Detail',
            element: <Supply_Type_Details/>,
          },
          {
            path: 'Administration/Index/Suppliers/Supplies/Add',
            element: <Supply_Add/>,
          },
          {
            path: 'Administration/Index/Suppliers/Supplies/Edit',
            element: <Supply_Edit/>,
          },
          {
            path: 'Administration/Index/Suppliers/Supplies/Delete',
            element: <Supply_Delete/>,
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
            path: 'Administration/Index/Menus/Menus/Add',
            element: <Menu_Add/>,
          },
          {
            path: 'Administration/Index/Menus/Menus/Edit',
          },
          {
            path: 'Administration/Index/Menus/Menus/Delete',
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
                    path: 'Supplies/Supply/Categories',
                    element: <Table_Supply_Categories/>
                  },
                  {
                    path: 'Supplies/Supply/Types',
                    element: <Table_Supply_Types/>
                  },
                  {
                    path: 'Supplies/Supplies',
                    element: <Table_Supplies/>
                  },
                  {
                    path: 'Warehouse/Purchases',
                    element: <Table_Purchases/>
                  },
                  {
                    path: 'Warehouse/Sales',
                    element: <Table_Sales/>
                  },
                  {
                    path: 'Menus/Menus',
                    element: <Table_Menus/>
                  },
                  {
                    path: 'Menus/Dishes',
                    element: <Table_Breakfasts/>
                  },
                  {
                    path: 'Menus/Side/Dishes',
                    element: <Table_Lunchs/>
                  },
                  {
                    path: 'Menus/Drinks',
                    element: <Table_Dinners/>
                  }
                ]
              },
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