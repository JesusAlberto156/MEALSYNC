//____________IMPORT/EXPORT____________
// Hooks de React
import { useState,useContext,useEffect } from "react";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
// Contextos
import { TextFieldsSearchOrdersContext } from "../../../contexts/FormsProvider";
import { SidebarContext,SidebarViewContext } from "../../../contexts/ViewsProvider";
import { LoggedTypeContext,LoggedUserContext,LoggedPermissionsContext } from "../../../contexts/SessionProvider";
import { ActionBlockContext } from "../../../contexts/VariablesProvider";
// Hooks personalizados
import { HandleSidebarView,HandleNavbarView } from "../../../hooks/Views";
import { FilteredRecordsMenuTypesKitchen,FilteredRecordsMenuTypesNutritionist,FilteredRecordsMenuTypesDoctor } from "../../../hooks/orders/Forms";
//__________ICONOS__________
// Icono para el inicio
import { IoHome } from "react-icons/io5";
// Iconos para la parte administrativa
import { FaCircleUser } from "react-icons/fa6";
import { GiHandTruck } from "react-icons/gi";
import { FaBox } from "react-icons/fa";
import { GiLiquidSoap } from "react-icons/gi";
import { FaBroom } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { FaWarehouse } from "react-icons/fa";
import { MdOutlineMenuBook } from "react-icons/md";
//__________ICONOS__________
//__________IMAGENES__________
import Super_Administrator from '../../imgs/Super-Administrator.jpg';
import Administrator from '../../imgs/Administrator.jpg';
import Chef from '../../imgs/Chef.avif';
import Storekeeper from '../../imgs/Storekeeper.jpg';
import Cook from '../../imgs/Cook.jpg';
import Nutritionist from '../../imgs/Nutritionist.jpg';
import Doctor from '../../imgs/Doctor.webp';
//__________IMAGENES__________
// Estilos personalizados
import { Container_Sidebar_Column_Black,Container_Sidebar_Column,Container_Row_100_Center } from "../../styled/Containers";
import { Icon_20 } from "../../styled/Icons";
import { Image_Sidebar_White } from '../../styled/Imgs';
import { Text_Title_20_Black } from "../../styled/Text";
import { Button_Text_Blue_200 } from '../../styled/Buttons';
// Componentes personalizados
import { Side_Bar_Button } from "./Buttons";
//____________IMPORT/EXPORT____________

// Componente para navegar entre las paginas en el lateral
export default function Side_Bar() {
  // Constantes con el valor de los contextos 
  const [isSidebar] = useContext(SidebarContext);
  const [isLoggedType] = useContext(LoggedTypeContext);
  const [isLoggedUser] = useContext(LoggedUserContext);
  const [isLoggedPermissions] = useContext(LoggedPermissionsContext);
  const [isActionBlock] = useContext(ActionBlockContext);
  const [currentSView] = useContext(SidebarViewContext);
  const [isTextFieldsSearchOrders,setIsTextFieldsSearchOrders] = useContext(TextFieldsSearchOrdersContext);
  // Constantes con el valor de los useState
  const [profileImage, setProfileImage] = useState('');
  // UseEffect con la imagen del usuario
  useEffect(() => {
    if(isLoggedPermissions.superadministrador){
      return setProfileImage(Super_Administrator);
    }
    if(isLoggedType === 'Administrador'){
      return setProfileImage(Administrator);
    }
    if(isLoggedType === 'Chef'){
      return setProfileImage(Chef);  
    }
    if(isLoggedType === 'Almacenista'){
      return setProfileImage(Storekeeper);  
    }
    if(isLoggedType === 'Cocinero'){
      return setProfileImage(Cook);  
    }
    if(isLoggedType === 'Nutriólogo'){
      return setProfileImage(Nutritionist);  
    }
    if(isLoggedType === 'Médico'){
      return setProfileImage(Doctor);  
    }
  },[isLoggedPermissions]);
  // Constantes con la funcionalidad de los hooks
  const filteredRecordsMenuTypesKitchen = FilteredRecordsMenuTypesKitchen();
  const filteredRecordsMenuTypesNutritionist = FilteredRecordsMenuTypesNutritionist();
  const filteredRecordsMenuTypesDoctor = FilteredRecordsMenuTypesDoctor();
  const navigate = useNavigate();
  const handleSidebarView = HandleSidebarView();
  const handleNavbarView = HandleNavbarView();
  // Estructura del componente
  return (
    <>
      <Container_Sidebar_Column_Black className={isSidebar ? 'slide-in-container-left' : 'slide-out-container-left'}>
        <Container_Sidebar_Column>
          <Container_Row_100_Center>
            <Image_Sidebar_White src={profileImage}/>
          </Container_Row_100_Center>
          <Container_Row_100_Center>
            <Text_Title_20_Black>{isLoggedUser.nombre || 'Desconocido'}</Text_Title_20_Black>
          </Container_Row_100_Center> 
          {isLoggedType !== 'Médico' ? (
            <Side_Bar_Button
              title="Inicio"
              viewSidebar="Inicio"
              text="Inicio"
              icon={<IoHome/>}
              route={isLoggedType === 'Cocinero' || isLoggedType === 'Nutriólogo' || isLoggedType === 'Médico' ? '/Kitchen/Home' : '/Administration/Home'}
            />
          ):(
            <></>
          )}
          {isLoggedType === 'Nutriólogo' ? (
            <>
              {isLoggedPermissions.superadministrador ? (
                <Side_Bar_Button
                  title="Menús"
                  viewSidebar="Menus"
                  viewNavbar="Menus"
                  text="Menús"
                  icon={<MdOutlineMenuBook/>}
                  route="/Kitchen/Index/Menus/Menus"
                />
              ):(
                <></>
              )}
            </>
          ):(
            <></>
          )}
          {isLoggedType === 'Cocinero' ? (
            <>
              <Container_Row_100_Center>
                {isActionBlock || filteredRecordsMenuTypesKitchen.length === 0 ? (
                  <>
                    <Button_Text_Blue_200 disabled>
                      Pedidos<Icon_20><MdOutlineMenuBook/></Icon_20>
                    </Button_Text_Blue_200>
                  </>
                ):(
                  <Tooltip title='Pedidos' placement="right">
                    <Button_Text_Blue_200 
                      style={{
                        backgroundColor: currentSView === 'Pedidos' ? 'rgb(12, 54, 109)' : '',
                      }}
                      onClick={() => {
                        setIsTextFieldsSearchOrders(prev => ({
                          ...prev,
                          idtipo: filteredRecordsMenuTypesKitchen[0]?.idtipo,
                        }))
                        handleSidebarView('Pedidos');
                        handleNavbarView(filteredRecordsMenuTypesKitchen[0]?.nombre);
                        sessionStorage.setItem('Ruta','/Kitchen/Index/Orders/Kitchen');
                        navigate('/Kitchen/Index/Orders/Kitchen',{ replace: true });
                      }}
                  >
                      Pedidos<Icon_20><MdOutlineMenuBook/></Icon_20>
                    </Button_Text_Blue_200>
                  </Tooltip>
                )}
              </Container_Row_100_Center>
            </>
          ):(
            <></>
          )}
          {isLoggedType === 'Nutriólogo' ? (
            <>
              <Container_Row_100_Center>
                {isActionBlock || filteredRecordsMenuTypesNutritionist.length === 0 ? (
                  <>
                    <Button_Text_Blue_200 disabled>
                      Pedidos<Icon_20><MdOutlineMenuBook/></Icon_20>
                    </Button_Text_Blue_200>
                  </>
                ):(
                  <Tooltip title='Pedidos' placement="right">
                    <Button_Text_Blue_200 
                      style={{
                        backgroundColor: currentSView === 'Pedidos' ? 'rgb(12, 54, 109)' : '',
                      }}
                      onClick={() => {
                        setIsTextFieldsSearchOrders(prev => ({
                          ...prev,
                          idtipo: filteredRecordsMenuTypesNutritionist[0]?.idtipo,
                        }))
                        handleSidebarView('Pedidos');
                        handleNavbarView(filteredRecordsMenuTypesNutritionist[0]?.nombre);
                        sessionStorage.setItem('Ruta','/Kitchen/Index/Orders/Nutritionist');
                        navigate('/Kitchen/Index/Orders/Nutritionist',{ replace: true });
                      }}
                  >
                      Pedidos<Icon_20><MdOutlineMenuBook/></Icon_20>
                    </Button_Text_Blue_200>
                  </Tooltip>
                )}
              </Container_Row_100_Center>
            </>
          ):(
            <></>
          )}
          {isLoggedType === 'Médico' ? (
            <>
              <Container_Row_100_Center>
                {isActionBlock || filteredRecordsMenuTypesDoctor.length === 0 ? (
                  <>
                    <Button_Text_Blue_200 disabled>
                      Pedidos<Icon_20><MdOutlineMenuBook/></Icon_20>
                    </Button_Text_Blue_200>
                  </>
                ):(
                  <Tooltip title='Pedidos' placement="right">
                    <Button_Text_Blue_200 
                      style={{
                        backgroundColor: currentSView === 'Pedidos' ? 'rgb(12, 54, 109)' : '',
                      }}
                      onClick={() => {
                        setIsTextFieldsSearchOrders(prev => ({
                          ...prev,
                          idtipo: filteredRecordsMenuTypesDoctor[0]?.idtipo,
                        }))
                        handleSidebarView('Pedidos');
                        handleNavbarView(filteredRecordsMenuTypesDoctor[0]?.nombre);
                        sessionStorage.setItem('Ruta','/Kitchen/Index/Orders/Doctor');
                        navigate('/Kitchen/Index/Orders/Doctor',{ replace: true });
                      }}
                  >
                      Pedidos<Icon_20><MdOutlineMenuBook/></Icon_20>
                    </Button_Text_Blue_200>
                  </Tooltip>
                )}
              </Container_Row_100_Center>
            </>
          ):(
            <></>
          )}
          {isLoggedType === 'Administrador' ? (
            <>
              <Side_Bar_Button
                title="Usuarios"
                viewSidebar="Usuarios"
                viewNavbar="Usuarios"
                text="Usuarios"
                icon={<FaCircleUser/>}
                route="/Administration/Index/Users/Users"
              />
              <Side_Bar_Button
                title="Proveedores"
                viewSidebar="Proveedores"
                viewNavbar="Proveedores"
                text="Proveedores"
                icon={<GiHandTruck/>}
                route="/Administration/Index/Suppliers/Suppliers"
              />
              <Side_Bar_Button
                title="Insumos"
                viewSidebar="Insumos"
                viewNavbar="Categorias por insumo"
                text="Insumos"
                icon={<FaBox/>}
                route="/Administration/Index/Supplies/Supply/Categories"
              />
              <Side_Bar_Button
                title="Extras"
                viewSidebar="Extras"
                viewNavbar="Categorias de limpieza"
                text="Extras"
                icon={<><GiLiquidSoap/><FaBroom/><GiMoneyStack/></>}
                route="/Administration/Index/Extras/Cleaning/Categories"
              />
              <Side_Bar_Button
                title="Inventario"
                viewSidebar="Inventario"
                viewNavbar="Pedidos de almacen"
                text="Inventario"
                icon={<FaWarehouse/>}
                route="/Administration/Index/Warehouse/Orders"
              />
              <Side_Bar_Button
                title="Menús"
                viewSidebar="Menus"
                viewNavbar="Menus"
                text="Menús"
                icon={<MdOutlineMenuBook/>}
                route="/Administration/Index/Menus/Menus"
              />
              <Container_Row_100_Center>
                <Button_Text_Blue_200 
                  disabled={isActionBlock}
                  onClick={() => {
                    const win = window.open('', '_blank');
                    win.document.write('<html><body><p>Ticket de prueba</p></body></html>');
                    win.document.close();
                    win.print();
                  }}
                >
                  Imprimir<Icon_20><MdOutlineMenuBook/></Icon_20>
                </Button_Text_Blue_200>
              </Container_Row_100_Center>          
            </>
          ):(
            <></>
          )}
          {isLoggedType === 'Chef' ? (
            <>
              <Side_Bar_Button
                title="Proveedores"
                viewSidebar="Proveedores"
                viewNavbar="Proveedores"
                text="Proveedores"
                icon={<GiHandTruck/>}
                route="/Administration/Index/Suppliers/Suppliers"
              />
              <Side_Bar_Button
                title="Insumos"
                viewSidebar="Insumos"
                viewNavbar="Categorias por insumo"
                text="Insumos"
                icon={<FaBox/>}
                route="/Administration/Index/Supplies/Supply/Categories"
              />
              <Side_Bar_Button
                title="Extras"
                viewSidebar="Extras"
                viewNavbar="Categorias de limpieza"
                text="Extras"
                icon={<><GiLiquidSoap/><FaBroom/><GiMoneyStack/></>}
                route="/Administration/Index/Extras/Cleaning/Categories"
              />
              <Side_Bar_Button
                title="Inventario"
                viewSidebar="Inventario"
                viewNavbar="Pedidos de almacen"
                text="Inventario"
                icon={<FaWarehouse/>}
                route="/Administration/Index/Warehouse/Orders"
              />
              <Side_Bar_Button
                title="Menús"
                viewSidebar="Menus"
                viewNavbar="Menus"
                text="Menús"
                icon={<MdOutlineMenuBook/>}
                route="/Administration/Index/Menus/Menus"
              />
            </>
          ):(
            <></>
          )}
          {isLoggedType === 'Almacenista' ? (
            <>
              <Side_Bar_Button
                title="Proveedores"
                viewSidebar="Proveedores"
                viewNavbar="Proveedores"
                text="Proveedores"
                icon={<GiHandTruck/>}
                route="/Administration/Index/Suppliers/Suppliers"
              />
              <Side_Bar_Button
                title="Insumos"
                viewSidebar="Insumos"
                viewNavbar="Categorias por insumo"
                text="Insumos"
                icon={<FaBox/>}
                route="/Administration/Index/Supplies/Supply/Categories"
              />
              <Side_Bar_Button
                title="Extras"
                viewSidebar="Extras"
                viewNavbar="Categorias de limpieza"
                text="Extras"
                icon={<><GiLiquidSoap/><FaBroom/><GiMoneyStack/></>}
                route="/Administration/Index/Extras/Cleaning/Categories"
              />
              <Side_Bar_Button
                title="Inventario"
                viewSidebar="Inventario"
                viewNavbar="Pedidos de almacen"
                text="Inventario"
                icon={<FaWarehouse/>}
                route="/Administration/Index/Warehouse/Orders"
              />
              <Side_Bar_Button
                title="Menús"
                viewSidebar="Menus"
                viewNavbar="Platillos"
                text="Menús"
                icon={<MdOutlineMenuBook/>}
                route="/Administration/Index/Menus/Dishes"
              />
            </>
          ):(
            <></>
          )}
        </Container_Sidebar_Column>
      </Container_Sidebar_Column_Black>
    </>
  );
}