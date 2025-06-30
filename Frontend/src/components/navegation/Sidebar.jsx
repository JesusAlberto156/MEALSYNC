//____________IMPORT/EXPORT____________
// Hooks de React
import { useState,useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { SidebarContext } from "../../contexts/ViewsProvider";
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
import { Container_Sidebar_Column_Black } from "../styled/Containers";
import { Icon_20 } from "../styled/Icons";
import { Image_Sidebar_Black } from '../styled/Imgs';
import { Text_Fade_Title_20_White } from "../styled/Text";
import { Button_Icon_Blue_200 } from '../styled/Buttons';
//____________IMPORT/EXPORT____________

// Componente para navegar entre las paginas en el lateral
export default function Side_Bar() {
  // Constantes con el valor de los contextos 
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
      <Container_Sidebar_Column_Black className={isSidebar ? 'slide-in-container-left' : 'slide-out-container-left'}>
        <Image_Sidebar_Black src={profileImage}/>
        <Text_Fade_Title_20_White>{isLoggedUser.nombre || 'Desconocido...'}</Text_Fade_Title_20_White>
        <Tooltip title='Inicio' placement="right">
          <Button_Icon_Blue_200 onClick={() => {
            handleSidebarView('Inicio');
            sessionStorage.setItem('Ruta',isLoggedType === 'Cocinero' || isLoggedType === 'Nutriólogo' || isLoggedType === 'Médico' ? '/Kitchen/Home' : '/Administration/Home');
            navigate(isLoggedType === 'Cocinero' || isLoggedType === 'Nutriólogo' || isLoggedType === 'Médico' ? '/Kitchen/Home' : '/Administration/Home',{ replace: true });
          }}>
            Inicio<Icon_20><IoHome/></Icon_20>
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
              <Button_Icon_Blue_200 onClick={() => {
                handleSidebarView('Usuarios');
                handleNavbarView('Usuarios');
                sessionStorage.setItem('Ruta','/Administration/Index/Users/Users');
                navigate('/Administration/Index/Users/Users',{ replace: true });
              }}>
                Usuarios<Icon_20><FaCircleUser/></Icon_20>
              </Button_Icon_Blue_200>
            </Tooltip>
            <Tooltip title='Proveedores' placement="right">
              <Button_Icon_Blue_200 onClick={() => {
                handleSidebarView('Proveedores');
                handleNavbarView('Proveedores');
                sessionStorage.setItem('Ruta','/Administration/Index/Suppliers/Suppliers');
                navigate('/Administration/Index/Suppliers/Suppliers',{ replace: true });
              }}>
                Proveedores<Icon_20><GiHandTruck/></Icon_20>
              </Button_Icon_Blue_200>
            </Tooltip>
            <Tooltip title='Inventario' placement="right">
              <Button_Icon_Blue_200 onClick={() => {
                handleSidebarView('Inventario');
                handleNavbarView('Pedidos de insumo');
                sessionStorage.setItem('Ruta','/Administration/Index/Warehouse/Supply/Orders');
                navigate('/Administration/Index/Warehouse/Supply/Orders',{ replace: true });
              }}>
                Inventario<Icon_20><FaWarehouse/></Icon_20>
              </Button_Icon_Blue_200>
            </Tooltip>
            <Tooltip title='Menús' placement="right">
              <Button_Icon_Blue_200 onClick={() => {
                handleSidebarView('Menus');
                handleNavbarView('Menus');
                sessionStorage.setItem('Ruta','/Administration/Index/Menus');
                navigate('/Administration/Index/Menus',{ replace: true });
              }}>
                Menús<Icon_20><MdOutlineMenuBook/></Icon_20>
              </Button_Icon_Blue_200>
            </Tooltip>
            <Tooltip title='Historial' placement="right">
              <Button_Icon_Blue_200 onClick={() => {
                
              }}>
                Historial<Icon_20><FaHistory/></Icon_20>
              </Button_Icon_Blue_200>
            </Tooltip>
          </>
        ):(
          <></>
        )}
        {isLoggedType === 'Chef' ? (
          <>
            <Tooltip title='Proveedores' placement="right">
              <Button_Icon_Blue_200 onClick={() => {
                handleSidebarView('Proveedores');
                handleNavbarView('Proveedores');
                sessionStorage.setItem('Ruta','/Administration/Index/Suppliers/Suppliers');
                navigate('/Administration/Index/Suppliers/Suppliers',{ replace: true });
              }}>
                Proveedores<Icon_20><GiHandTruck/></Icon_20>
              </Button_Icon_Blue_200>
            </Tooltip>
            <Tooltip title='Inventario' placement="right">
              <Button_Icon_Blue_200 onClick={() => {
                handleSidebarView('Inventario');
                handleNavbarView('Pedidos de insumo');
                sessionStorage.setItem('Ruta','/Administration/Index/Warehouse/Supply/Orders');
                navigate('/Administration/Index/Warehouse/Supply/Orders',{ replace: true });
              }}>
                Inventario<Icon_20><FaWarehouse/></Icon_20>
              </Button_Icon_Blue_200>
            </Tooltip>
          </>
        ):(
          <></>
        )}
        {isLoggedType === 'Almacenista' ? (
          <>
            <Tooltip title='Proveedores' placement="right">
              <Button_Icon_Blue_200 onClick={() => {
                handleSidebarView('Proveedores');
                handleNavbarView('Proveedores');
                sessionStorage.setItem('Ruta','/Administration/Index/Suppliers/Suppliers');
                navigate('/Administration/Index/Suppliers/Suppliers',{ replace: true });
              }}>
                Proveedores<Icon_20><GiHandTruck/></Icon_20>
              </Button_Icon_Blue_200>
            </Tooltip>
            <Tooltip title='Inventario' placement="right">
              <Button_Icon_Blue_200 onClick={() => {
                handleSidebarView('Inventario');
                handleNavbarView('Pedidos de insumo');
                sessionStorage.setItem('Ruta','/Administration/Index/Warehouse/Supply/Orders');
                navigate('/Administration/Index/Warehouse/Supply/Orders',{ replace: true });
              }}>
                Inventario<Icon_20><FaWarehouse/></Icon_20>
              </Button_Icon_Blue_200>
            </Tooltip>
          </>
        ):(
          <></>
        )}
      </Container_Sidebar_Column_Black>
    </>
  );
}