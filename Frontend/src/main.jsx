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
import Index_Main from './pages/indexs/Main';
import Error from './pages/general/Error';
import Loading from './pages/general/Loading';
import Login from './pages/general/Login';
import Out_Login from './components/modals/general/OutLogin';
import Index_Administration from './pages/indexs/Administration';
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
import Table_Suppliers from './components/tables/suppliers/Suppliers';
import Supplier_Add from './components/modals/Suppliers/suppliers/Add';
import Supplier_Edit from './components/modals/Suppliers/suppliers/Edit';
import Supplier_Delete from './components/modals/Suppliers/suppliers/Delete';
import Table_Supplier_Observations from './components/tables/suppliers/Observations';
import Supplier_Observation_View from './components/modals/Suppliers/observations/View';
import Table_Supply_Categories from './components/tables/supplies/Categories';
import Supply_Category_Add from './components/modals/supplies/supplyCategories/Add';
import Supply_Category_Edit from './components/modals/supplies/supplyCategories/Edit';
import Supply_Category_Delete from './components/modals/supplies/supplyCategories/Delete';
import Table_Supply_Types from './components/tables/supplies/SupplyTypes';
import Supply_Type_Add from './components/modals/supplies/supplyTypes/Add';
import Supply_Type_Edit from './components/modals/supplies/supplyTypes/Edit';
import Count_Supply_Type_Add from './components/modals/supplies/supplyTypes/CountAdd';
import Supply_Type_Details from './components/modals/supplies/supplyTypes/Detail';
import Supply_Type_Delete from './components/modals/supplies/supplyTypes/Delete';
import Table_Supplies from './components/tables/supplies/Supplies';
import Supply_Add from './components/modals/supplies/supplies/Add';
import Supply_Edit from './components/modals/supplies/supplies/Edit';
import Supply_Delete from './components/modals/supplies/supplies/Delete';
import Supply_Details from './components/modals/supplies/supplies/Detail';
import Table_Cleaning_Categories from './components/tables/extras/CleaningCategories';
import Cleaning_Category_Add from './components/modals/extras/cleaningCategories/Add';
import Cleaning_Category_Edit from './components/modals/extras/cleaningCategories/Edit';
import Cleaning_Category_Delete from './components/modals/extras/cleaningCategories/Delete';
import Table_Cleaning_Types from './components/tables/extras/CleaningTypes';
import Cleaning_Type_Add from './components/modals/extras/cleaningTypes/Add';
import Cleaning_Type_Edit from './components/modals/extras/cleaningTypes/Edit';
import Cleaning_Type_Delete from './components/modals/extras/cleaningTypes/Delete';
import Count_Cleaning_Type_Add from './components/modals/extras/cleaningTypes/CountAdd';
import Cleaning_Type_Details from './components/modals/extras/cleaningTypes/Detail';
import Table_Cleaning_Supplies from './components/tables/extras/CleaningSupplies';
import Cleaning_Supply_Add from './components/modals/extras/cleaningSupplies/Add';
import Cleaning_Supply_Edit from './components/modals/extras/cleaningSupplies/Edit';
import Cleaning_Supply_Delete from './components/modals/extras/cleaningSupplies/Delete';
import Cleaning_Supply_Details from './components/modals/extras/cleaningSupplies/Detail';
import Table_Fixed_Expenses from './components/tables/extras/FixedExpenses';
import Fixed_Expense_Add from './components/modals/extras/fixedExpenses/Add';
import Fixed_Expense_Edit from './components/modals/extras/fixedExpenses/Edit';
import Fixed_Expense_Delete from './components/modals/extras/fixedExpenses/Delete';
import Table_Orders from './components/tables/warehouse/Orders';
import Warehouse_Order_Add from './components/modals/warehouse/orders/Add';
import Warehouse_Order_Delete from './components/modals/warehouse/orders/Delete';
import Warehouse_Order_Verification_Add from './components/modals/warehouse/orders/verification/Add';
import Warehouse_Order_Verification_Edit from './components/modals/warehouse/orders/verification/Edit';
import Warehouse_Order_Details from './components/modals/warehouse/orders/Detail';
import Warehouse_Order_End from './components/modals/warehouse/orders/End';
import Table_Purchases from './components/tables/warehouse/Purchases';
import Warehouse_Fixed_Expense_Add from './components/modals/warehouse/fixedExpenses/Add';
import Table_Sales from './components/tables/warehouse/Sales';
import Warehouse_Cleaning_Supply_Add from './components/modals/warehouse/cleaning/Add';
import Warehouse_Supply_Add from './components/modals/warehouse/supplies/Add';
import Table_Reports from './components/tables/warehouse/Reports';
import Table_Menus from './components/tables/menus/Menus';
import Menu_Add from './components/modals/menus/menus/Add';
import Menu_Edit from './components/modals/menus/menus/Edit';
import Menu_Delete from './components/modals/menus/menus/Delete';
import Table_Dishes from './components/tables/menus/Dishes';
import Dish_Add from './components/modals/menus/dishes/Add';
import Dish_Details from './components/modals/menus/dishes/Detail';
import Dish_Edit from './components/modals/menus/dishes/Edit';
import Dish_Delete from './components/modals/menus/dishes/Delete';
import Table_Side_Dishes from './components/tables/menus/SideDishes';
import Side_Dish_Add from './components/modals/menus/sideDishes/Add';
import Side_Dish_Details from './components/modals/menus/sideDishes/Detail';
import Side_Dish_Edit from './components/modals/menus/sideDishes/Edit';
import Side_Dish_Delete from './components/modals/menus/sideDishes/Delete';
import Table_Drinks from './components/tables/menus/Drinks';
import Drink_Add from './components/modals/menus/drinks/Add';
import Drink_Details from './components/modals/menus/drinks/Detail';
import Drink_Edit from './components/modals/menus/drinks/Edit';
import Drink_Delete from './components/modals/menus/drinks/Delete';
import Index_Kitchen from './pages/indexs/Kitchen';
import Home_Kitchen from './pages/kitchen/Home';
import Kitchen_Index from './pages/kitchen/Index';
import Kitchen_Orders from './pages/kitchen/KitchenOrders';
import Order_Kitchen_Add from './components/modals/orders/kitchen/Add';
import Nutritionist_Orders from './pages/kitchen/NutritionistOrders';
import Doctor_Orders from './pages/kitchen/DoctorOrders';
import Alert_Medico from './components/modals/general/AlertDoctor';
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
            path: 'Administration/Index/Supplies/Supply/Categories/Add',
            element: <Supply_Category_Add/>,
          },
          {
            path: 'Administration/Index/Supplies/Supply/Categories/Edit',
            element: <Supply_Category_Edit/>,
          },
          {
            path: 'Administration/Index/Supplies/Supply/Categories/Delete',
            element: <Supply_Category_Delete/>,
          },
          {
            path: 'Administration/Index/Supplies/Supply/Types/Add',
            element: <Supply_Type_Add/>,
          },
          {
            path: 'Administration/Index/Supplies/Supply/Types/Edit',
            element: <Supply_Type_Edit/>,
          },
          {
            path: 'Administration/Index/Supplies/Supply/Types/Count/Add',
            element: <Count_Supply_Type_Add/>,
          },
          {
            path: 'Administration/Index/Supplies/Supply/Types/Delete',
            element: <Supply_Type_Delete/>,
          },
          {
            path: 'Administration/Index/Supplies/Supply/Types/Detail',
            element: <Supply_Type_Details/>,
          },
          {
            path: 'Administration/Index/Supplies/Supplies/Add',
            element: <Supply_Add/>,
          },
          {
            path: 'Administration/Index/Supplies/Supplies/Edit',
            element: <Supply_Edit/>,
          },
          {
            path: 'Administration/Index/Supplies/Supplies/Delete',
            element: <Supply_Delete/>,
          },
          {
            path: 'Administration/Index/Supplies/Supplies/Detail',
            element: <Supply_Details/>,
          },
          {
            path: 'Administration/Index/Extras/Cleaning/Categories/Add',
            element: <Cleaning_Category_Add/>,
          },
          {
            path: 'Administration/Index/Extras/Cleaning/Categories/Edit',
            element: <Cleaning_Category_Edit/>,
          },
          {
            path: 'Administration/Index/Extras/Cleaning/Categories/Delete',
            element: <Cleaning_Category_Delete/>,
          },
          {
            path: 'Administration/Index/Extras/Cleaning/Types/Add',
            element: <Cleaning_Type_Add/>,
          }, 
          {
            path: 'Administration/Index/Extras/Cleaning/Types/Edit',
            element: <Cleaning_Type_Edit/>,
          }, 
          {
            path: 'Administration/Index/Extras/Cleaning/Types/Delete',
            element: <Cleaning_Type_Delete/>,
          }, 
          {
            path: 'Administration/Index/Extras/Cleaning/Types/Count/Add',
            element: <Count_Cleaning_Type_Add/>,
          },         
          {
            path: 'Administration/Index/Extras/Cleaning/Types/Detail',
            element: <Cleaning_Type_Details/>,
          },
          {
            path: 'Administration/Index/Extras/Cleaning/Supplies/Add',
            element: <Cleaning_Supply_Add/>,
          },
          {
            path: 'Administration/Index/Extras/Cleaning/Supplies/Edit',
            element: <Cleaning_Supply_Edit/>,
          },
          {
            path: 'Administration/Index/Extras/Cleaning/Supplies/Delete',
            element: <Cleaning_Supply_Delete/>,
          },
          {
            path: 'Administration/Index/Extras/Cleaning/Supplies/Detail',
            element: <Cleaning_Supply_Details/>,
          },
          {
            path: 'Administration/Index/Extras/Fixed/Expenses/Add',
            element: <Fixed_Expense_Add/>,
          },
          {
            path: 'Administration/Index/Extras/Fixed/Expenses/Edit',
            element: <Fixed_Expense_Edit/>,
          },
          {
            path: 'Administration/Index/Extras/Fixed/Expenses/Delete',
            element: <Fixed_Expense_Delete/>,
          },
          {
            path: 'Administration/Index/Warehouse/Orders/Add',
            element: <Warehouse_Order_Add/>,
          },
          {
            path: 'Administration/Index/Warehouse/Orders/Delete',
            element: <Warehouse_Order_Delete/>,
          },
          {
            path: 'Administration/Index/Warehouse/Orders/Verification/Add',
            element: <Warehouse_Order_Verification_Add/>,
          },
          {
            path: 'Administration/Index/Warehouse/Orders/Verification/Edit',
            element: <Warehouse_Order_Verification_Edit/>,
          },
          {
            path: 'Administration/Index/Warehouse/Orders/Detail',
            element: <Warehouse_Order_Details/>,
          },
          {
            path: 'Administration/Index/Warehouse/Orders/End',
            element: <Warehouse_Order_End/>,
          },
          {
            path: 'Administration/Index/Warehouse/Purchases/Fixed/Expanses/Add',
            element: <Warehouse_Fixed_Expense_Add/>,
          },
          {
            path: 'Administration/Index/Warehouse/Sales/Supplies/Add',
            element: <Warehouse_Supply_Add/>,
          },
          {
            path: 'Administration/Index/Warehouse/Sales/Cleaning/Supplies/Add',
            element: <Warehouse_Cleaning_Supply_Add/>,
          },
          {
            path: 'Administration/Index/Menus/Menus/Add',
            element: <Menu_Add/>,
          },
          {
            path: 'Administration/Index/Menus/Menus/Edit',
            element: <Menu_Edit/>,
          },
          {
            path: 'Administration/Index/Menus/Menus/Delete',
            element: <Menu_Delete/>,
          },
          {
            path: 'Administration/Index/Menus/Dishes/Add',
            element: <Dish_Add/>,
          },
          {
            path: 'Administration/Index/Menus/Dishes/Detail',
            element: <Dish_Details/>,
          },
          {
            path: 'Administration/Index/Menus/Dishes/Edit',
            element: <Dish_Edit/>,
          },
          {
            path: 'Administration/Index/Menus/Dishes/Delete',
            element: <Dish_Delete/>,
          },
          {
            path: 'Administration/Index/Menus/Side/Dishes/Add',
            element: <Side_Dish_Add/>,
          },
          {
            path: 'Administration/Index/Menus/Side/Dishes/Detail',
            element: <Side_Dish_Details/>,
          },
          {
            path: 'Administration/Index/Menus/Side/Dishes/Edit',
            element: <Side_Dish_Edit/>,
          },
          {
            path: 'Administration/Index/Menus/Side/Dishes/Delete',
            element: <Side_Dish_Delete/>,
          },
          {
            path: 'Administration/Index/Menus/Drinks/Add',
            element: <Drink_Add/>,
          },
          {
            path: 'Administration/Index/Menus/Drinks/Detail',
            element: <Drink_Details/>,
          },
          {
            path: 'Administration/Index/Menus/Drinks/Edit',
            element: <Drink_Edit/>,
          },
          {
            path: 'Administration/Index/Menus/Drinks/Delete',
            element: <Drink_Delete/>,
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
                    path: 'Extras/Cleaning/Categories',
                    element: <Table_Cleaning_Categories/>,
                  },
                  {
                    path: 'Extras/Cleaning/Types',
                    element: <Table_Cleaning_Types/>,
                  },
                  {
                    path: 'Extras/Cleaning/Supplies',
                    element: <Table_Cleaning_Supplies/>,
                  },
                  {
                    path: 'Extras/Fixed/Expenses',
                    element: <Table_Fixed_Expenses/>,
                  },
                  {
                    path: 'Warehouse/Orders',
                    element: <Table_Orders/>,
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
                    path: 'Warehouse/Reports',
                    element: <Table_Reports/>
                  },
                  {
                    path: 'Menus/Menus',
                    element: <Table_Menus/>
                  },
                  {
                    path: 'Menus/Dishes',
                    element: <Table_Dishes/>,
                  },
                  {
                    path: 'Menus/Side/Dishes',
                    element: <Table_Side_Dishes/>,
                  },
                  {
                    path: 'Menus/Drinks',
                    element: <Table_Drinks/>,
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
            path: 'Kitchen/Index/Menus/Menus/Add',
            element: <Menu_Add/>,
          },
          {
            path: 'Kitchen/Index/Menus/Menus/Edit',
            element: <Menu_Edit/>,
          },
          {
            path: 'Kitchen/Index/Menus/Menus/Delete',
            element: <Menu_Delete/>,
          },
          {
            path: 'Kitchen/Index/Menus/Dishes/Add',
            element: <Dish_Add/>,
          },
          {
            path: 'Kitchen/Index/Menus/Dishes/Detail',
            element: <Dish_Details/>,
          },
          {
            path: 'Kitchen/Index/Menus/Dishes/Edit',
            element: <Dish_Edit/>,
          },
          {
            path: 'Kitchen/Index/Menus/Dishes/Delete',
            element: <Dish_Delete/>,
          },
          {
            path: 'Kitchen/Index/Menus/Side/Dishes/Add',
            element: <Side_Dish_Add/>,
          },
          {
            path: 'Kitchen/Index/Menus/Side/Dishes/Detail',
            element: <Side_Dish_Details/>,
          },
          {
            path: 'Kitchen/Index/Menus/Side/Dishes/Edit',
            element: <Side_Dish_Edit/>,
          },
          {
            path: 'Kitchen/Index/Menus/Side/Dishes/Delete',
            element: <Side_Dish_Delete/>,
          },
          {
            path: 'Kitchen/Index/Menus/Drinks/Add',
            element: <Drink_Add/>,
          },
          {
            path: 'Kitchen/Index/Menus/Drinks/Detail',
            element: <Drink_Details/>,
          },
          {
            path: 'Kitchen/Index/Menus/Drinks/Edit',
            element: <Drink_Edit/>,
          },
          {
            path: 'Kitchen/Index/Menus/Drinks/Delete',
            element: <Drink_Delete/>,
          },
          {
            path: 'Kitchen/Index/Orders/Kitchen/Add',
            element: <Order_Kitchen_Add/>,
          },
          {
            path: 'Kitchen/Index/Verification',
            element: <Alert_Medico/>,
          },
          {
            path: 'Kitchen',
            element: <Index_Kitchen/>,
            children: [
              {
                path: 'Home',
                element: <Home_Kitchen/>
              },
              {
                path: 'Index',
                element: <Kitchen_Index/>,
                children: [
                  {
                    path: 'Menus/Menus',
                    element: <Table_Menus/>
                  },
                  {
                    path: 'Menus/Dishes',
                    element: <Table_Dishes/>,
                  },
                  {
                    path: 'Menus/Side/Dishes',
                    element: <Table_Side_Dishes/>,
                  },
                  {
                    path: 'Menus/Drinks',
                    element: <Table_Drinks/>,
                  },
                  {
                    path: 'Orders/Kitchen',
                    element: <Kitchen_Orders/>,
                  },
                  {
                    path: 'Orders/Nutritionist',
                    element: <Nutritionist_Orders/>,
                  },
                  {
                    path: 'Orders/Doctor',
                    element: <Doctor_Orders/>,
                  },
                ]
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