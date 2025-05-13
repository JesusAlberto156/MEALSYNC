//____________IMPORT/EXPORT____________
// Hooks de React
import { useState,useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,SidebarContext } from "../../contexts/ViewsProvider";
import { LoggedTypeContext,LoggedUserContext,LoggedPermissionsContext } from "../../contexts/SessionProvider";
import { PermissionsContext } from "../../contexts/UsersProvider";
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
// Estilos personalizados
import { Container_Column_White_Height_100_Center,Container_Column_Border_80_Center,Container_Row_100_Center } from "../styled/Containers";
import { Icon_Image_Black_90,Icon_White_18 } from "../styled/Icons";
import { Text_Title_22_Center,Text_Span_16_Left } from "../styled/Text";
import { Button_Icon_Blue_200 } from '../styled/Buttons';
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Componente para navegar entre las paginas en el lateral
export default function Side_Bar() {
  // Constantes con el valor de los contextos 
  const [themeMode] = useContext(ThemeModeContext);
  const [isSidebar] = useContext(SidebarContext);
  const [isLoggedType] = useContext(LoggedTypeContext);
  const [isLoggedUser] = useContext(LoggedUserContext);
  const [isLoggedPermissions] = useContext(LoggedPermissionsContext);
  const [isPermissions] = useContext(PermissionsContext);
  // Constantes con el valor de los useState
  const [profileImage, setProfileImage] = useState('');
  // UseEffect con la imagen del usuario
  useEffect(() => {
    if(isLoggedPermissions.superadministrador){
      return setProfileImage('https://blog.edipro.cl/wp-content/uploads/2020/02/cropped-superjefe.3-681x352.jpg');
    }
    if(isLoggedType === 'Administrator'){
      return setProfileImage('https://cmsresources.elempleo.com/co/assets/backend/styles/770x513/public/fotos/noticias/administradores-min.jpg');
    }
    if(isLoggedType === 'Chef'){
      return setProfileImage('https://img.freepik.com/foto-gratis/expertos-gastronomia-espalda-espalda-pie-cocina-profesional-restaurante-mientras-posan-camara-chefs-vistiendo-uniformes-cocina-mientras-estan-pie-cocina-gourmet-brazos-cruzados_482257-41991.jpg?t=st=1745432760~exp=1745436360~hmac=d779bdc838a09b980fee6122e72ca035cb0cd068ee322468866d9103be104733&w=740');
    }
    if(isLoggedType === 'Storekeeper'){
      return setProfileImage('https://previews.123rf.com/images/kzenon/kzenon1301/kzenon130100553/17620188-el-trabajo-en-equipo-de-trabajo-o-almacenista-con-esc%C3%A1ner-y-su-compa%C3%B1ero-de-trabajo-con-el.jpg');
    }
    if(isLoggedType === 'Cook'){
      return setProfileImage('https://chefejecutivo.com/wp-content/uploads/2022/05/food-truck-restaurantes.jpg');
    }
    if(isLoggedType === 'Nutritionist'){
      return setProfileImage('https://saludnutricional.com.mx/wp-content/uploads/2024/09/Diferencia-entre-nutriologo-CDMX-y-bariatra.jpg');
    }
    if(isLoggedType === 'Doctor'){
      return setProfileImage('https://staticnew-common-prod.topdoctors.mx/assets/imageCloud/home-page/doctor-main-banner.webp?width=375/height=300/format=avif');
    }
  },[isPermissions]);
  // Constantes con la funcionalidad de los hooks
  const navigate = useNavigate();
  const handleSidebarView = HandleSidebarView();
  const handleNavbarView = HandleNavbarView();
  // Estructura del componente
  return (
    <>
      <Container_Column_White_Height_100_Center ThemeMode={themeMode} className={isSidebar ? 'slide-in-container-left' : 'slide-out-container-left'}>
        <Container_Column_Border_80_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'} ThemeMode={themeMode}>
          <Container_Row_100_Center>
            <Icon_Image_Black_90 ThemeMode={themeMode} src={profileImage}/>
          </Container_Row_100_Center>
          <Container_Row_100_Center>
            <Text_Title_22_Center ThemeMode={themeMode}>{isLoggedUser.nombre}</Text_Title_22_Center>
          </Container_Row_100_Center>
          <Tooltip title='Inicio' placement="right">
            <Button_Icon_Blue_200 ThemeMode={themeMode} className='pulsate-buttom' onClick={() => {
              handleSidebarView('Home');
              sessionStorage.setItem('Route',isLoggedType === 'Cook' || isLoggedType === 'Nutritionist' || isLoggedType === 'Doctor' ? '/Kitchen/Home' : '/Administration/Home');
              navigate(isLoggedType === 'Cook' || isLoggedType === 'Nutritionist' || isLoggedType === 'Doctor' ? '/Kitchen/Home' : '/Administration/Home',{ replace: true });
            }}>
              <Text_Span_16_Left>Inicio</Text_Span_16_Left><Icon_White_18><IoHome/></Icon_White_18>
            </Button_Icon_Blue_200>
          </Tooltip>
          {isLoggedType === 'Cook' ? (
            <></>
          ):(
            <></>
          )}
          {isLoggedType === 'Nutritionist' ? (
            <></>
          ):(
            <></>
          )}
          {isLoggedType === 'Doctor' ? (
            <></>
          ):(
            <></>
          )}
          {isLoggedType === 'Administrator' ? (
            <>
              <Tooltip title='Usuarios' placement="right">
                <Button_Icon_Blue_200 ThemeMode={themeMode} className='pulsate-buttom' onClick={() => {
                  handleSidebarView('Users');
                  handleNavbarView('Users');
                  sessionStorage.setItem('Route','/Administration/Index/Users');
                  navigate('/Administration/Index/Users',{ replace: true });
                }}>
                  <Text_Span_16_Left>Usuarios</Text_Span_16_Left><Icon_White_18><FaCircleUser/></Icon_White_18>
                </Button_Icon_Blue_200>
              </Tooltip>
              <Tooltip title='Proveedores' placement="right">
                <Button_Icon_Blue_200 ThemeMode={themeMode} className='pulsate-buttom' onClick={() => {
                  handleSidebarView('Suppliers');
                  handleNavbarView('Suppliers');
                  sessionStorage.setItem('Route','/Administration/Index/Suppliers');
                  navigate('/Administration/Index/Suppliers',{ replace: true });
                }}>
                  <Text_Span_16_Left>Proveedores</Text_Span_16_Left><Icon_White_18><GiHandTruck/></Icon_White_18>
                </Button_Icon_Blue_200>
              </Tooltip>
              <Tooltip title='Inventario' placement="right">
                <Button_Icon_Blue_200 ThemeMode={themeMode} className='pulsate-buttom' onClick={() => {
                  handleSidebarView('Warehouse');
                  handleNavbarView('Warehouse');
                  sessionStorage.setItem('Route','/Administration/Index/Warehouse');
                  navigate('/Administration/Index/Warehouse',{ replace: true });
                }}>
                  <Text_Span_16_Left>Inventario</Text_Span_16_Left><Icon_White_18><FaWarehouse/></Icon_White_18>
                </Button_Icon_Blue_200>
              </Tooltip>
              <Tooltip title='Menús' placement="right">
                <Button_Icon_Blue_200 ThemeMode={themeMode} className='pulsate-buttom' onClick={() => {
                  
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
            <></>
          ):(
            <></>
          )}
          {isLoggedType === 'Storekeeper' ? (
            <></>
          ):(
            <></>
          )}
        </Container_Column_Border_80_Center>
      </Container_Column_White_Height_100_Center>
    </>
  );
}