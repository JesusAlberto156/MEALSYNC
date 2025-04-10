//____________IMPORT/EXPORT____________
// Hooks de React
import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { themeModeContext,sidebarVisibleContext } from "../../contexts/ViewsProvider";
import { typeUserContext } from "../../contexts/VariablesProvider";
import { userContext } from "../../contexts/UsersProvider";
// Hooks personalizados
import { useChangeNavbarView,useChangeSidebarView } from "../../hooks/Views";
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
import { Container_Side_Bar,Container_Icon_60 } from "../styled/Containers";
import { Icon_Image_Profile_Light } from "../styled/Icons";
import { Text_Title_Fade_20,Text_A_18 } from "../styled/Text";
import { Button_Icon_Blue_210 } from '../styled/Buttons';
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Componente para navegar entre las paginas en el lateral
export default function Side_Bar() {
  // Constantes con el valor de los contextos 
  const [themeMode] = useContext(themeModeContext);
  const [isSidebarVisible] = useContext(sidebarVisibleContext);
  const [isTypeUser] = useContext(typeUserContext);
  const [isUser] = useContext(userContext);

  const [profileImage, setProfileImage] = useState("https://img.freepik.com/vector-premium/icono-contacto-perfil-icono-avatar_1199668-1320.jpg?w=740");
  // Constantes con la funcionalidad de los hooks
  const changeNavbarView = useChangeNavbarView();
  const changeSidebarView = useChangeSidebarView();
  const navigate = useNavigate();
  // Estructura del componente
  return (
    <>
      <Container_Side_Bar ThemeMode={themeMode} className={isSidebarVisible ? 'visible' : 'hidden'}>
        <Container_Icon_60>
          <Icon_Image_Profile_Light src={profileImage}/>
        </Container_Icon_60>
        <Text_Title_Fade_20 ThemeMode={themeMode}>{isUser.nombre}</Text_Title_Fade_20>
        <Tooltip title='Inicio' placement="right">
          <Button_Icon_Blue_210 ThemeMode={themeMode} onClick={() => {
                  changeSidebarView('Home')
                  changeNavbarView('')
                  navigate(isTypeUser === 'Cook' || isTypeUser === 'Nutritionist' || isTypeUser === 'Doctor' ? '/Kitchen/Home' : '/Administration/Home',{ replace: true });
          }}>
            <Text_A_18>Inicio</Text_A_18><BiSolidHomeAlt2/>
          </Button_Icon_Blue_210>
        </Tooltip>
        {isTypeUser === 'Cook' ? (
          <>
            <Tooltip title='General' placement="right">
              <Button_Icon_Blue_210 ThemeMode={themeMode} onClick={() => {
                changeSidebarView('General')
                changeNavbarView('')
              }}>
                <Text_A_18>General</Text_A_18><FaHospitalUser/>
              </Button_Icon_Blue_210>
            </Tooltip>
            <Tooltip title='Colaboradores' placement="right">
              <Button_Icon_Blue_210 ThemeMode={themeMode} onClick={() => {
                changeSidebarView('Collaborators')
                changeNavbarView('')
              }}>
                <Text_A_18>Colaboradores</Text_A_18><FaUserFriends/>
              </Button_Icon_Blue_210>
            </Tooltip>
            <Tooltip title='Nutriólogo' placement="right">
              <Button_Icon_Blue_210 ThemeMode={themeMode} onClick={() => {
                changeSidebarView('Nutritionist')
                changeNavbarView('')
              }}>
                <Text_A_18>Nutriólogo</Text_A_18><IoNutrition/>
              </Button_Icon_Blue_210>
            </Tooltip>
          </>
        ):(
          <></>
        )}
        {isTypeUser === 'Nutritionist' ? (
          <></>
        ):(
          <></>
        )}
        {isTypeUser === 'Doctor' ? (
          <>
            <Tooltip title='General' placement="right">
              <Button_Icon_Blue_210 ThemeMode={themeMode} onClick={() => {
                changeSidebarView('Doctor')
                changeNavbarView('')
              }}>
                <Text_A_18>General</Text_A_18><FaUserDoctor/>
              </Button_Icon_Blue_210>
            </Tooltip>
          </>
        ):(
          <></>
        )}
        {isTypeUser === 'Administrator' ? (
          <>
            <Tooltip title='Usuarios' placement="right">
              <Button_Icon_Blue_210 ThemeMode={themeMode} onClick={() => {
                changeSidebarView('Users');
                changeNavbarView('Principal');
                navigate('/Administration/Users/Principal',{ replace: true });
              }}>
                <Text_A_18>Usuarios</Text_A_18><FaUserGroup/>
              </Button_Icon_Blue_210>
            </Tooltip>
            <Tooltip title='Proveedores' placement="right">
              <Button_Icon_Blue_210 ThemeMode={themeMode} onClick={() => {
                changeSidebarView('Suppliers');
                changeNavbarView('');
                navigate('/Administration/Suppliers',{ replace: true });
              }}>
                <Text_A_18>Proveedores</Text_A_18><FaUserTie/>
              </Button_Icon_Blue_210>
            </Tooltip>
            <Tooltip title='Inventario' placement="right">
              <Button_Icon_Blue_210 ThemeMode={themeMode} onClick={() => {
                changeSidebarView('Inventory');
                changeNavbarView('');
                navigate('/Administration/Inventory',{ replace: true });
              }}>
                <Text_A_18>Inventario</Text_A_18><MdStorage/>
              </Button_Icon_Blue_210>
            </Tooltip>
            <Tooltip title='Menús' placement="right">
              <Button_Icon_Blue_210 ThemeMode={themeMode} onClick={() => {
                changeSidebarView('Menus');
                changeNavbarView('');
                navigate('/Administration/Menus',{ replace: true });
              }}>
                <Text_A_18>Menús</Text_A_18><BiSolidFoodMenu/>
              </Button_Icon_Blue_210>
            </Tooltip>
            <Tooltip title='Historial' placement="right">
              <Button_Icon_Blue_210 ThemeMode={themeMode} onClick={() => {
                changeSidebarView('Record');
                changeNavbarView('');
                navigate('/Administration/Record',{ replace: true });
              }}>
                <Text_A_18>Historial</Text_A_18><MdWorkHistory/>
              </Button_Icon_Blue_210>
            </Tooltip>
          </>
        ):(
          <></>
        )}
        {isTypeUser === 'Chef' ? (
          <>
            <Tooltip title='Proveedores' placement="right">
              <Button_Icon_Blue_210 ThemeMode={themeMode} onClick={() => {
                changeSidebarView('Suppliers');
                changeNavbarView('');
                navigate('/Administration/Suppliers',{ replace: true });
              }}>
                <Text_A_18>Proveedores</Text_A_18><FaUserTie/>
              </Button_Icon_Blue_210>
            </Tooltip>
            <Tooltip title='Inventario' placement="right">
              <Button_Icon_Blue_210 ThemeMode={themeMode} onClick={() => {
                changeSidebarView('Inventory');
                changeNavbarView('');
                navigate('/Administration/Inventory',{ replace: true });
              }}>
                <Text_A_18>Inventario</Text_A_18><MdStorage/>
              </Button_Icon_Blue_210>
            </Tooltip>
            <Tooltip title='Menús' placement="right">
              <Button_Icon_Blue_210 ThemeMode={themeMode} onClick={() => {
                changeSidebarView('Menus');
                changeNavbarView('');
                navigate('/Administration/Menus',{ replace: true });
              }}>
                <Text_A_18>Menús</Text_A_18><BiSolidFoodMenu/>
              </Button_Icon_Blue_210>
            </Tooltip>
            <Tooltip title='Historial' placement="right">
              <Button_Icon_Blue_210 ThemeMode={themeMode} onClick={() => {
                changeSidebarView('Record');
                changeNavbarView('');
                navigate('/Administration/Record',{ replace: true });
              }}>
                <Text_A_18>Historial</Text_A_18><MdWorkHistory/>
              </Button_Icon_Blue_210>
            </Tooltip>
          </>
        ):(
          <></>
        )}
        {isTypeUser === 'Storekeeper' ? (
          <>
            <Tooltip title='Proveedores' placement="right">
              <Button_Icon_Blue_210 ThemeMode={themeMode} onClick={() => {
                changeSidebarView('Suppliers');
                changeNavbarView('');
                navigate('/Administration/Suppliers',{ replace: true });
              }}>
                <Text_A_18>Proveedores</Text_A_18><FaUserTie/>
              </Button_Icon_Blue_210>
            </Tooltip>
            <Tooltip title='Inventario' placement="right">
              <Button_Icon_Blue_210 ThemeMode={themeMode} onClick={() => {
                changeSidebarView('Inventory');
                changeNavbarView('');
                navigate('/Administration/Inventory',{ replace: true });
              }}>
                <Text_A_18>Inventario</Text_A_18><MdStorage/>
              </Button_Icon_Blue_210>
            </Tooltip>
            <Tooltip title='Historial' placement="right">
              <Button_Icon_Blue_210 ThemeMode={themeMode} onClick={() => {
                changeSidebarView('Record');
                changeNavbarView('');
                navigate('/Administration/Record',{ replace: true });
              }}>
                <Text_A_18>Historial</Text_A_18><MdWorkHistory/>
              </Button_Icon_Blue_210>
            </Tooltip>
          </>
        ):(
          <></>
        )}
      </Container_Side_Bar>
    </>
  );
}