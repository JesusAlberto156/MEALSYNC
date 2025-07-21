//____________IMPORT/EXPORT____________
// Hooks de React
import { useState,useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { SidebarContext,SidebarViewContext } from "../../contexts/ViewsProvider";
import { LoggedTypeContext,LoggedUserContext,LoggedPermissionsContext } from "../../contexts/SessionProvider";
import { ActionBlockContext } from "../../contexts/VariablesProvider";
// Hooks personalizados
import { HandleSidebarView,HandleNavbarView } from "../../hooks/Views";
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
import Super_Administrator from '../imgs/Super-Administrator.jpg';
import Administrator from '../imgs/Administrator.jpg';
import Chef from '../imgs/Chef.avif';
import Storekeeper from '../imgs/Storekeeper.jpg';
import Cook from '../imgs/Cook.jpg';
import Nutritionist from '../imgs/Nutritionist.jpg';
import Doctor from '../imgs/Doctor.webp';
//__________IMAGENES__________
// Estilos personalizados
import { Container_Sidebar_Column_Black,Container_Sidebar_Column,Container_Row_100_Center } from "../styled/Containers";
import { Icon_20 } from "../styled/Icons";
import { Image_Sidebar_White } from '../styled/Imgs';
import { Text_Fade_Title_20_White } from "../styled/Text";
import { Button_Text_Blue_200 } from '../styled/Buttons';
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
        <Container_Sidebar_Column>
          <Container_Row_100_Center>
            <Image_Sidebar_White src={profileImage}/>
          </Container_Row_100_Center>
          <Container_Row_100_Center>
            <Text_Fade_Title_20_White>{isLoggedUser.nombre || 'Desconocido'}</Text_Fade_Title_20_White>
          </Container_Row_100_Center> 
          <Container_Row_100_Center>
            <Button_Text_Blue_200 
              disabled={isActionBlock}
              style={{
                backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentSView === 'Inicio' ? 'rgb(12, 54, 109)' : '',
              }}
              onClick={() => {
                handleSidebarView('Inicio');
                sessionStorage.setItem('Ruta',isLoggedType === 'Cocinero' || isLoggedType === 'Nutriólogo' || isLoggedType === 'Médico' ? '/Kitchen/Home' : '/Administration/Home');
                navigate(isLoggedType === 'Cocinero' || isLoggedType === 'Nutriólogo' || isLoggedType === 'Médico' ? '/Kitchen/Home' : '/Administration/Home',{ replace: true });
              }}
            >
              Inicio<Icon_20><IoHome/></Icon_20>
            </Button_Text_Blue_200>
          </Container_Row_100_Center>
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
              <Container_Row_100_Center>
                <Button_Text_Blue_200 
                  disabled={isActionBlock}
                  style={{
                    backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentSView === 'Usuarios' ? 'rgb(12, 54, 109)' : '',
                  }}
                  onClick={() => {
                    handleSidebarView('Usuarios');
                    handleNavbarView('Usuarios');
                    sessionStorage.setItem('Ruta','/Administration/Index/Users/Users');
                    navigate('/Administration/Index/Users/Users',{ replace: true });
                  }}
                >
                  Usuarios<Icon_20><FaCircleUser/></Icon_20>
                </Button_Text_Blue_200>
              </Container_Row_100_Center>
              <Container_Row_100_Center>
                <Button_Text_Blue_200
                  disabled={isActionBlock}
                  style={{
                    backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentSView === 'Proveedores' ? 'rgb(12, 54, 109)' : '',
                  }}
                  onClick={() => {
                    handleSidebarView('Proveedores');
                    handleNavbarView('Proveedores');
                    sessionStorage.setItem('Ruta','/Administration/Index/Suppliers/Suppliers');
                    navigate('/Administration/Index/Suppliers/Suppliers',{ replace: true });
                  }}
                >
                  Proveedores<Icon_20><GiHandTruck/></Icon_20>
                </Button_Text_Blue_200>
              </Container_Row_100_Center>
              <Container_Row_100_Center>
                <Button_Text_Blue_200
                  disabled={isActionBlock}
                  style={{
                    backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentSView === 'Insumos' ? 'rgb(12, 54, 109)' : '',
                  }}
                  onClick={() => {
                    handleSidebarView('Insumos');
                    handleNavbarView('Categorias por insumo');
                    sessionStorage.setItem('Ruta','/Administration/Index/Supplies/Supply/Categories');
                    navigate('/Administration/Index/Supplies/Supply/Categories',{ replace: true });
                  }}
                >
                  Insumos<Icon_20><FaBox/></Icon_20>
                </Button_Text_Blue_200>
              </Container_Row_100_Center>
              <Container_Row_100_Center>
                <Button_Text_Blue_200
                  disabled={isActionBlock}
                  style={{
                    backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentSView === 'Extras' ? 'rgb(12, 54, 109)' : '',
                  }}
                  onClick={() => {
                    handleSidebarView('Extras');
                    handleNavbarView('Categorias de limpieza');
                    sessionStorage.setItem('Ruta','/Administration/Index/Extras/Cleaning/Categories');
                    navigate('/Administration/Index/Extras/Cleaning/Categories',{ replace: true });
                  }}
                >
                  Extras<Icon_20><GiLiquidSoap/><FaBroom/><GiMoneyStack/></Icon_20>
                </Button_Text_Blue_200>
              </Container_Row_100_Center>
              <Container_Row_100_Center>
                <Button_Text_Blue_200 
                  disabled={isActionBlock}
                  style={{
                    backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentSView === 'Inventario' ? 'rgb(12, 54, 109)' : '',
                  }}
                  onClick={() => {
                    handleSidebarView('Inventario');
                    handleNavbarView('Pedidos de insumo');
                    sessionStorage.setItem('Ruta','/Administration/Index/Warehouse/Supply/Orders');
                    navigate('/Administration/Index/Warehouse/Supply/Orders',{ replace: true });
                  }}
                >
                  Inventario<Icon_20><FaWarehouse/></Icon_20>
                </Button_Text_Blue_200>
              </Container_Row_100_Center>
              <Container_Row_100_Center>
                <Button_Text_Blue_200 
                  disabled={isActionBlock}
                  style={{
                    backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentSView === 'Menus' ? 'rgb(12, 54, 109)' : '',
                  }}
                  onClick={() => {
                    handleSidebarView('Menus');
                    handleNavbarView('Menus');
                    sessionStorage.setItem('Ruta','/Administration/Index/Menus/Menus');
                    navigate('/Administration/Index/Menus/Menus',{ replace: true });
                  }}
                >
                  Menús<Icon_20><MdOutlineMenuBook/></Icon_20>
                </Button_Text_Blue_200>
              </Container_Row_100_Center> 
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
              <Container_Row_100_Center>
                <Button_Text_Blue_200
                  disabled={isActionBlock}
                  style={{
                    backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentSView === 'Proveedores' ? 'rgb(12, 54, 109)' : '',
                  }}
                  onClick={() => {
                    handleSidebarView('Proveedores');
                    handleNavbarView('Proveedores');
                    sessionStorage.setItem('Ruta','/Administration/Index/Suppliers/Suppliers');
                    navigate('/Administration/Index/Suppliers/Suppliers',{ replace: true });
                  }}
                >
                  Proveedores<Icon_20><GiHandTruck/></Icon_20>
                </Button_Text_Blue_200>
              </Container_Row_100_Center>
              <Container_Row_100_Center>
                <Button_Text_Blue_200
                  disabled={isActionBlock}
                  style={{
                    backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentSView === 'Insumos' ? 'rgb(12, 54, 109)' : '',
                  }}
                  onClick={() => {
                    handleSidebarView('Insumos');
                    handleNavbarView('Categorias por insumo');
                    sessionStorage.setItem('Ruta','/Administration/Index/Supplies/Supply/Categories');
                    navigate('/Administration/Index/Supplies/Supply/Categories',{ replace: true });
                  }}
                >
                  Insumos<Icon_20><FaBox/></Icon_20>
                </Button_Text_Blue_200>
              </Container_Row_100_Center>
              <Container_Row_100_Center>
                <Button_Text_Blue_200
                  disabled={isActionBlock}
                  style={{
                    backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentSView === 'Extras' ? 'rgb(12, 54, 109)' : '',
                  }}
                  onClick={() => {
                    handleSidebarView('Extras');
                    handleNavbarView('Categorias de limpieza');
                    sessionStorage.setItem('Ruta','/Administration/Index/Extras/Cleaning/Categories');
                    navigate('/Administration/Index/Extras/Cleaning/Categories',{ replace: true });
                  }}
                >
                  Extras<Icon_20><GiLiquidSoap/><FaBroom/><GiMoneyStack/></Icon_20>
                </Button_Text_Blue_200>
              </Container_Row_100_Center>
              <Container_Row_100_Center>
                <Button_Text_Blue_200 
                  disabled={isActionBlock}
                  style={{
                    backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentSView === 'Inventario' ? 'rgb(12, 54, 109)' : '',
                  }}
                  onClick={() => {
                    handleSidebarView('Inventario');
                    handleNavbarView('Pedidos de insumo');
                    sessionStorage.setItem('Ruta','/Administration/Index/Warehouse/Supply/Orders');
                    navigate('/Administration/Index/Warehouse/Supply/Orders',{ replace: true });
                  }}
                >
                  Inventario<Icon_20><FaWarehouse/></Icon_20>
                </Button_Text_Blue_200>
              </Container_Row_100_Center>
            </>
          ):(
            <></>
          )}
          {isLoggedType === 'Almacenista' ? (
            <>
              
            </>
          ):(
            <></>
          )}
        </Container_Sidebar_Column>
      </Container_Sidebar_Column_Black>
    </>
  );
}