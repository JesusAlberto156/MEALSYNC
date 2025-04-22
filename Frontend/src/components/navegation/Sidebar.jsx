//____________IMPORT/EXPORT____________
// Hooks de React
import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,SidebarContext } from "../../contexts/ViewsProvider";
import { LoggedTypeContext,LoggedUserContext } from "../../contexts/SessionProvider";
// Hooks personalizados
import { HandleChangeSidebar,HandleChangeNavbar } from "../../hooks/Views";
//__________ICONOS__________
// Icono para el inicio
import { BiSolidHomeAlt2 } from "react-icons/bi";
// Iconos para las opciones del cocinero
import { FaHospitalUser } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { IoNutrition } from "react-icons/io5";
// Icono para la opción de doctor
import { FaUserDoctor } from "react-icons/fa6";
// Iconos para la parte administrativa
import { FaUserGroup } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
import { MdStorage } from "react-icons/md";
import { MdWorkHistory } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Column_White_Height_100_Center,Container_Column_Border_80_Center,Container_Row_100_Center,Container_Icon_60 } from "../styled/Containers";
import { Icon_Image_Profile_Light,Icon_18 } from "../styled/Icons";
import { Text_Title_22_Center,Text_Span_16_Left } from "../styled/Text";
import { Button_Icon_Blue_200 } from '../styled/Buttons';
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Componente para navegar entre las paginas en el lateral
export default function Side_Bar() {
  // Constantes con el valor de los contextos 
  const [themeMode] = useContext(ThemeModeContext);
  const [isSidebar] = useContext(SidebarContext);
  const [isTypeUser] = useContext(LoggedTypeContext);
  const [isUser] = useContext(LoggedUserContext);

  const [profileImage, setProfileImage] = useState("https://img.freepik.com/vector-premium/icono-contacto-perfil-icono-avatar_1199668-1320.jpg?w=740");
  // Constantes con la funcionalidad de los hooks
  const navigate = useNavigate();
  const handleChangeSidebar = HandleChangeSidebar();
  const handleChangeNavbar = HandleChangeNavbar();
  // Estructura del componente
  return (
    <>
      <Container_Column_White_Height_100_Center ThemeMode={themeMode} className={isSidebar ? 'visible bounce-in-left' : 'hidden bounce-out-left'}>
        <Container_Column_Border_80_Center className={themeMode ? 'shadow-out-infinite-light' : 'shadow-out-infinite-dark'} ThemeMode={themeMode}>
          <Container_Icon_60>
            <Icon_Image_Profile_Light src={profileImage}/>
          </Container_Icon_60>
          <Container_Row_100_Center>
            <Text_Title_22_Center className={themeMode ? 'text-pop-light' : 'text-pop-dark'} ThemeMode={themeMode}>{isUser.nombrecorto}</Text_Title_22_Center>
          </Container_Row_100_Center>
          <Tooltip title='Inicio' placement="right">
            <Button_Icon_Blue_200 ThemeMode={themeMode} onClick={() => {
              handleChangeSidebar('Home');
              navigate(isTypeUser === 'Cook' || isTypeUser === 'Nutritionist' || isTypeUser === 'Doctor' ? '/Kitchen/Home' : '/Administration/Home',{ replace: true });
            }}>
              <Text_Span_16_Left>Inicio</Text_Span_16_Left><Icon_18><BiSolidHomeAlt2/></Icon_18>
            </Button_Icon_Blue_200>
          </Tooltip>
          {isTypeUser === 'Cook' ? (
            <></>
          ):(
            <></>
          )}
          {isTypeUser === 'Nutritionist' ? (
            <></>
          ):(
            <></>
          )}
          {isTypeUser === 'Doctor' ? (
            <></>
          ):(
            <></>
          )}
          {isTypeUser === 'Administrator' ? (
            <>
              <Tooltip title='Usuarios' placement="right">
                <Button_Icon_Blue_200 ThemeMode={themeMode} onClick={() => {
                  handleChangeSidebar('Users');
                  handleChangeNavbar('Users');
                  navigate('/Administration/Users/Users',{ replace: true });
                }}>
                  <Text_Span_16_Left>Usuarios</Text_Span_16_Left><Icon_18><FaUserGroup/></Icon_18>
                </Button_Icon_Blue_200>
              </Tooltip>
              <Tooltip title='Proveedores' placement="right">
                <Button_Icon_Blue_200 ThemeMode={themeMode} onClick={() => {
                  handleChangeSidebar('Suppliers');
                  handleChangeNavbar('Suppliers');
                  navigate('/Administration/Suppliers/Suppliers',{ replace: true });
                }}>
                  <Text_Span_16_Left>Proveedores</Text_Span_16_Left><Icon_18><FaUserTie/></Icon_18>
                </Button_Icon_Blue_200>
              </Tooltip>
              <Tooltip title='Inventario' placement="right">
                <Button_Icon_Blue_200 ThemeMode={themeMode} onClick={() => {
                  handleChangeSidebar('Inventory');
                  handleChangeNavbar('Inventory');
                  navigate('/Administration/Inventory/Inventory',{ replace: true });
                }}>
                  <Text_Span_16_Left>Inventario</Text_Span_16_Left><Icon_18><MdStorage/></Icon_18>
                </Button_Icon_Blue_200>
              </Tooltip>
              <Tooltip title='Menús' placement="right">
                <Button_Icon_Blue_200 ThemeMode={themeMode} onClick={() => {
                  handleChangeSidebar('Menus');
                  handleChangeNavbar('');
                  navigate('/Administration/Menus',{ replace: true });
                }}>
                  <Text_Span_16_Left>Menús</Text_Span_16_Left><Icon_18><BiSolidFoodMenu/></Icon_18>
                </Button_Icon_Blue_200>
              </Tooltip>
              <Tooltip title='Historial' placement="right">
                <Button_Icon_Blue_200 ThemeMode={themeMode} onClick={() => {
                  handleChangeSidebar('Record');
                  handleChangeNavbar('Inventory');
                  navigate('/Administration/Record/General',{ replace: true });
                }}>
                  <Text_Span_16_Left>Historial</Text_Span_16_Left><Icon_18><MdWorkHistory/></Icon_18>
                </Button_Icon_Blue_200>
              </Tooltip>
            </>
          ):(
            <></>
          )}
          {isTypeUser === 'Chef' ? (
            <></>
          ):(
            <></>
          )}
          {isTypeUser === 'Storekeeper' ? (
            <></>
          ):(
            <></>
          )}
        </Container_Column_Border_80_Center>
      </Container_Column_White_Height_100_Center>
    </>
  );
}