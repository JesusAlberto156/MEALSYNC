//____________IMPORT/EXPORT____________
// Hooks de React
import { useState,useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,SidebarContext } from "../../contexts/ViewsProvider";
import { LoggedTypeContext,LoggedUserContext,LoggedPermissionsContext } from "../../contexts/SessionProvider";
// Hooks personalizados
import { HandleSidebarView,HandleNavbarView } from "../../hooks/Views";
//__________ICONOS__________
// Icono para el inicio
import { IoHome } from "react-icons/io5";
// Iconos para las opciones del cocinero
import { FaHospitalUser } from "react-icons/fa6";
import { IoNutrition } from "react-icons/io5";
// Icono para la opción de doctor
import { FaUserDoctor } from "react-icons/fa6";
// Iconos para la parte administrativa
import { FaCircleUser } from "react-icons/fa6";
import { GiHandTruck } from "react-icons/gi";
import { FaWarehouse } from "react-icons/fa";
import { MdOutlineMenuBook } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
//__________ICONOS__________
//__________IMAGENES__________
import Super_Administrator from '../imgs/Super-Administrator.jpg';
import Administrator from '../imgs/Administrator.jpg';
import Chef from '../imgs/Chef.avif';
import Storekeeper from '../imgs/Storekeeper.jpg';
import Cook from '../imgs/Cook.jpg';
import Nutritionist from '../imgs/Nutritionist.jpg';
import Doctor from '../imgs/Doctor.webp';
//__________IMAGENES__________
// Estilos personalizados
import { Container_Column_White_Height_100_Center,Container_Column_80_Center,Container_Row_100_Center } from "../styled/Containers";
import { Icon_Image_Black_90,Icon_White_18 } from "../styled/Icons";
import { Text_Title_22_Center,Text_Span_16_Left } from "../styled/Text";
import { Button_Icon_Blue_200 } from '../styled/Buttons';
//____________IMPORT/EXPORT____________

// Componente para navegar entre las paginas en el lateral
export default function Side_Bar() {
  // Constantes con el valor de los contextos 
  const [themeMode] = useContext(ThemeModeContext);
  const [isSidebar] = useContext(SidebarContext);
  const [isLoggedType] = useContext(LoggedTypeContext);
  const [isLoggedUser] = useContext(LoggedUserContext);
  const [isLoggedPermissions] = useContext(LoggedPermissionsContext);
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
  const navigate = useNavigate();
  const handleSidebarView = HandleSidebarView();
  const handleNavbarView = HandleNavbarView();
  // Estructura del componente
  return (
    <>
      <Container_Column_White_Height_100_Center ThemeMode={themeMode} className={isSidebar ? 'slide-in-container-left' : 'slide-out-container-left'}>
        <Container_Column_80_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
          <Container_Row_100_Center>
            <Icon_Image_Black_90 ThemeMode={themeMode} src={profileImage}/>
          </Container_Row_100_Center>
          <Container_Row_100_Center>
            <Text_Title_22_Center ThemeMode={themeMode}>{isLoggedUser.nombre || 'Desconocido...'}</Text_Title_22_Center>
          </Container_Row_100_Center>
          <Tooltip title='Inicio' placement="right">
            <Button_Icon_Blue_200 ThemeMode={themeMode} className='pulsate-buttom' onClick={() => {
              handleSidebarView('Inicio');
              sessionStorage.setItem('Ruta',isLoggedType === 'Cocinero' || isLoggedType === 'Nutriólogo' || isLoggedType === 'Médico' ? '/Kitchen/Home' : '/Administration/Home');
              navigate(isLoggedType === 'Cocinero' || isLoggedType === 'Nutriólogo' || isLoggedType === 'Médico' ? '/Kitchen/Home' : '/Administration/Home',{ replace: true });
            }}>
              <Text_Span_16_Left>Inicio</Text_Span_16_Left><Icon_White_18><IoHome/></Icon_White_18>
            </Button_Icon_Blue_200>
          </Tooltip>
          {isLoggedType === 'Cocinero' ? (
            <></>
          ):(
            <></>
          )}
          {isLoggedType === 'Nutriólogo' ? (
            <></>
          ):(
            <></>
          )}
          {isLoggedType === 'Médico' ? (
            <></>
          ):(
            <></>
          )}
          {isLoggedType === 'Administrador' ? (
            <>
              <Tooltip title='Usuarios' placement="right">
                <Button_Icon_Blue_200 ThemeMode={themeMode} className='pulsate-buttom' onClick={() => {
                  handleSidebarView('Usuarios');
                  handleNavbarView('Usuarios');
                  sessionStorage.setItem('Ruta','/Administration/Index/Users/Users');
                  navigate('/Administration/Index/Users/Users',{ replace: true });
                }}>
                  <Text_Span_16_Left>Usuarios</Text_Span_16_Left><Icon_White_18><FaCircleUser/></Icon_White_18>
                </Button_Icon_Blue_200>
              </Tooltip>
              <Tooltip title='Proveedores' placement="right">
                <Button_Icon_Blue_200 ThemeMode={themeMode} className='pulsate-buttom' onClick={() => {
                  handleSidebarView('Proveedores');
                  handleNavbarView('Proveedores');
                  sessionStorage.setItem('Ruta','/Administration/Index/Suppliers/Suppliers');
                  navigate('/Administration/Index/Suppliers/Suppliers',{ replace: true });
                }}>
                  <Text_Span_16_Left>Proveedores</Text_Span_16_Left><Icon_White_18><GiHandTruck/></Icon_White_18>
                </Button_Icon_Blue_200>
              </Tooltip>
              <Tooltip title='Inventario' placement="right">
                <Button_Icon_Blue_200 ThemeMode={themeMode} className='pulsate-buttom' onClick={() => {
                  handleSidebarView('Inventario');
                  handleNavbarView('Pedidos de insumo');
                  sessionStorage.setItem('Ruta','/Administration/Index/Warehouse/Supply/Orders');
                  navigate('/Administration/Index/Warehouse/Supply/Orders',{ replace: true });
                }}>
                  <Text_Span_16_Left>Inventario</Text_Span_16_Left><Icon_White_18><FaWarehouse/></Icon_White_18>
                </Button_Icon_Blue_200>
              </Tooltip>
              <Tooltip title='Menús' placement="right">
                <Button_Icon_Blue_200 ThemeMode={themeMode} className='pulsate-buttom' onClick={() => {
                  handleSidebarView('Menus');
                  handleNavbarView('Menus');
                  sessionStorage.setItem('Ruta','/Administration/Index/Menus');
                  navigate('/Administration/Index/Menus',{ replace: true });
                }}>
                  <Text_Span_16_Left>Menús</Text_Span_16_Left><Icon_White_18><MdOutlineMenuBook/></Icon_White_18>
                </Button_Icon_Blue_200>
              </Tooltip>
              <Tooltip title='Historial' placement="right">
                <Button_Icon_Blue_200 ThemeMode={themeMode} className='pulsate-buttom' onClick={() => {
                  
                }}>
                  <Text_Span_16_Left>Historial</Text_Span_16_Left><Icon_White_18><FaHistory/></Icon_White_18>
                </Button_Icon_Blue_200>
              </Tooltip>
            </>
          ):(
            <></>
          )}
          {isLoggedType === 'Chef' ? (
            <>
              <Tooltip title='Proveedores' placement="right">
                <Button_Icon_Blue_200 ThemeMode={themeMode} className='pulsate-buttom' onClick={() => {
                  handleSidebarView('Proveedores');
                  handleNavbarView('Proveedores');
                  sessionStorage.setItem('Ruta','/Administration/Index/Suppliers/Suppliers');
                  navigate('/Administration/Index/Suppliers/Suppliers',{ replace: true });
                }}>
                  <Text_Span_16_Left>Proveedores</Text_Span_16_Left><Icon_White_18><GiHandTruck/></Icon_White_18>
                </Button_Icon_Blue_200>
              </Tooltip>
              <Tooltip title='Inventario' placement="right">
                <Button_Icon_Blue_200 ThemeMode={themeMode} className='pulsate-buttom' onClick={() => {
                  handleSidebarView('Inventario');
                  handleNavbarView('Pedidos de insumo');
                  sessionStorage.setItem('Ruta','/Administration/Index/Warehouse/Supply/Orders');
                  navigate('/Administration/Index/Warehouse/Supply/Orders',{ replace: true });
                }}>
                  <Text_Span_16_Left>Inventario</Text_Span_16_Left><Icon_White_18><FaWarehouse/></Icon_White_18>
                </Button_Icon_Blue_200>
              </Tooltip>
            </>
          ):(
            <></>
          )}
          {isLoggedType === 'Almacenista' ? (
            <>
              <Tooltip title='Proveedores' placement="right">
                <Button_Icon_Blue_200 ThemeMode={themeMode} className='pulsate-buttom' onClick={() => {
                  handleSidebarView('Proveedores');
                  handleNavbarView('Proveedores');
                  sessionStorage.setItem('Ruta','/Administration/Index/Suppliers/Suppliers');
                  navigate('/Administration/Index/Suppliers/Suppliers',{ replace: true });
                }}>
                  <Text_Span_16_Left>Proveedores</Text_Span_16_Left><Icon_White_18><GiHandTruck/></Icon_White_18>
                </Button_Icon_Blue_200>
              </Tooltip>
              <Tooltip title='Inventario' placement="right">
                <Button_Icon_Blue_200 ThemeMode={themeMode} className='pulsate-buttom' onClick={() => {
                  handleSidebarView('Inventario');
                  handleNavbarView('Pedidos de insumo');
                  sessionStorage.setItem('Ruta','/Administration/Index/Warehouse/Supply/Orders');
                  navigate('/Administration/Index/Warehouse/Supply/Orders',{ replace: true });
                }}>
                  <Text_Span_16_Left>Inventario</Text_Span_16_Left><Icon_White_18><FaWarehouse/></Icon_White_18>
                </Button_Icon_Blue_200>
              </Tooltip>
            </>
          ):(
            <></>
          )}
        </Container_Column_80_Center>
      </Container_Column_White_Height_100_Center>
    </>
  );
}