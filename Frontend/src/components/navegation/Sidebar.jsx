//____________IMPORT/EXPORT____________
// Hooks de React
import { useState, useEffect,useContext } from "react";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Servicios

// Rutas

// Contextos
import { modeContext } from "../../contexts/VariablesProvider";
import { visibleContext } from "../../contexts/VariablesProvider";
import { typeUserContext } from "../../contexts/TypeUserProvider";
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
import { Container_Sidebar_Light,Container_Sidebar_Dark,Container_Icon } from "../styled/Containers";
import { Icon_Image_Profile_Light,Icon_Image_Profile_Dark } from "../styled/Icons";
import { Text_Title_Fade_20_Light,Text_A_18_Light,Text_Title_Fade_20_Dark,Text_A_18_Dark } from "../styled/Text";
import { Button_Icon_Blue_95_Light,Button_Icon_Blue_95_Dark } from '../styled/Buttons';
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Componente para navegar entre las paginas en el lateral
export default function Sidebar() {
  // Constantes con el valor de los contextos 
  const [isMode] = useContext(modeContext);
  const [isVisible] = useContext(visibleContext);
  const [isTypeUser] = useContext(typeUserContext);
  const [isUser] = useContext(userContext);

  const [profileImage, setProfileImage] = useState("https://img.freepik.com/vector-premium/icono-contacto-perfil-icono-avatar_1199668-1320.jpg?w=740");
  // useEffect con el estado del sidebar
  useEffect(() => {
    const content = document.getElementById("content");
    if (content) {
      content.className = isVisible ? "with-sidebar" : "no-sidebar";
    }
  }, [isVisible]);
  // Constantes con la funcionalidad de los hooks
  const changeNavbarView = useChangeNavbarView();
  const changeSidebarView = useChangeSidebarView();
  // Estructura del componente
  return (
    <>
      {isMode ? (
        <>
          <Container_Sidebar_Light className={isVisible ? 'visible' : 'hidden'}>
            <Container_Icon>
              <Icon_Image_Profile_Light src={profileImage}/>
            </Container_Icon>
            <Text_Title_Fade_20_Light>{isUser.nombre}</Text_Title_Fade_20_Light>
            <Tooltip title='Inicio' placement="right">
              <Button_Icon_Blue_95_Light onClick={() => changeSidebarView('Home')}><Text_A_18_Light>Inicio</Text_A_18_Light><BiSolidHomeAlt2/></Button_Icon_Blue_95_Light>
            </Tooltip>
            {isTypeUser === 'Cook' ? (
              <>
                <Tooltip title='General' placement="right">
                  <Button_Icon_Blue_95_Light onClick={() => {changeSidebarView('General')}}><Text_A_18_Light>General</Text_A_18_Light><FaHospitalUser/></Button_Icon_Blue_95_Light>
                </Tooltip>
                <Tooltip title='Colaboradores' placement="right">
                  <Button_Icon_Blue_95_Light onClick={() => {changeSidebarView('Collaborators')}}><Text_A_18_Light>Colaboradores</Text_A_18_Light><FaUserFriends/></Button_Icon_Blue_95_Light>
                </Tooltip>
                <Tooltip title='Nutriólogo' placement="right">
                  <Button_Icon_Blue_95_Light onClick={() => changeSidebarView('Nutritionist')}><Text_A_18_Light>Nutriólogo</Text_A_18_Light><IoNutrition/></Button_Icon_Blue_95_Light>
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
                  <Button_Icon_Blue_95_Light onClick={() => sidebarViews('Doctor','')}><Text_A_18_Light>General</Text_A_18_Light><FaUserDoctor/></Button_Icon_Blue_95_Light>
                </Tooltip>
              </>
            ):(
              <></>
            )}
            {isTypeUser === 'Administrator' ? (
              <>
                <Tooltip title='Usuarios' placement="right">
                  <Button_Icon_Blue_95_Light onClick={() => sidebarViews('Users','Principal')}><Text_A_18_Light>Usuarios</Text_A_18_Light><FaUserGroup/></Button_Icon_Blue_95_Light>
                </Tooltip>
                <Tooltip title='Proveedores' placement="right">
                  <Button_Icon_Blue_95_Light onClick={() => sidebarViews('Suppliers','')}><Text_A_18_Light>Proveedores</Text_A_18_Light><FaUserTie/></Button_Icon_Blue_95_Light>
                </Tooltip>
                <Tooltip title='Menús' placement="right">
                  <Button_Icon_Blue_95_Light onClick={() => sidebarViews('Menus','')}><Text_A_18_Light>Menús</Text_A_18_Light><BiSolidFoodMenu/></Button_Icon_Blue_95_Light>
                </Tooltip>
                <Tooltip title='Inventario' placement="right">
                  <Button_Icon_Blue_95_Light onClick={() => sidebarViews('Inventory','')}><Text_A_18_Light>Inventario</Text_A_18_Light><MdStorage/></Button_Icon_Blue_95_Light>
                </Tooltip>
                <Tooltip title='Historial' placement="right">
                  <Button_Icon_Blue_95_Light onClick={() => sidebarViews('Record','')}><Text_A_18_Light>Historial</Text_A_18_Light><MdWorkHistory/></Button_Icon_Blue_95_Light>
                </Tooltip>
              </>
            ):(
              <></>
            )}
            {isTypeUser === 'Chef' ? (
              <>
                <Tooltip title='Proveedores' placement="right">
                  <Button_Icon_Blue_95_Light onClick={() => sidebarViews('Suppliers','')}><Text_A_18_Light>Proveedores</Text_A_18_Light><FaUserTie/></Button_Icon_Blue_95_Light>
                </Tooltip>
                <Tooltip title='Menús' placement="right">
                  <Button_Icon_Blue_95_Light onClick={() => sidebarViews('Menus','')}><Text_A_18_Light>Menús</Text_A_18_Light><BiSolidFoodMenu/></Button_Icon_Blue_95_Light>
                </Tooltip>
                <Tooltip title='Inventario' placement="right">
                  <Button_Icon_Blue_95_Light onClick={() => sidebarViews('Inventory','')}><Text_A_18_Light>Inventario</Text_A_18_Light><MdStorage/></Button_Icon_Blue_95_Light>
                </Tooltip>
                <Tooltip title='Historial' placement="right">
                  <Button_Icon_Blue_95_Light onClick={() => sidebarViews('Record','')}><Text_A_18_Light>Historial</Text_A_18_Light><MdWorkHistory/></Button_Icon_Blue_95_Light>
                </Tooltip>
              </>
            ):(
              <></>
            )}
            {isTypeUser === 'Storekeeper' ? (
              <>
                <Tooltip title='Proveedores' placement="right">
                  <Button_Icon_Blue_95_Light onClick={() => sidebarViews('Suppliers','')}><Text_A_18_Light>Proveedores</Text_A_18_Light><FaUserTie/></Button_Icon_Blue_95_Light>
                </Tooltip>
                <Tooltip title='Inventario' placement="right">
                  <Button_Icon_Blue_95_Light onClick={() => sidebarViews('Inventory','')}><Text_A_18_Light>Inventario</Text_A_18_Light><MdStorage/></Button_Icon_Blue_95_Light>
                </Tooltip>
                <Tooltip title='Historial' placement="right">
                  <Button_Icon_Blue_95_Light onClick={() => sidebarViews('Record','')}><Text_A_18_Light>Historial</Text_A_18_Light><MdWorkHistory/></Button_Icon_Blue_95_Light>
                </Tooltip>
              </>
            ):(
              <></>
            )}
          </Container_Sidebar_Light>
        </>
      ):(
        <> 
          <Container_Sidebar_Dark className={isVisible ? 'visible' : 'hidden'}>
            <Container_Icon>
              <Icon_Image_Profile_Dark src={profileImage}/>
            </Container_Icon>
            <Text_Title_Fade_20_Dark>{isUser.nombre}</Text_Title_Fade_20_Dark>
            <Tooltip title='Inicio' placement="right">
              <Button_Icon_Blue_95_Dark onClick={() => sidebarHome('Home')}><Text_A_18_Dark>Inicio</Text_A_18_Dark><BiSolidHomeAlt2/></Button_Icon_Blue_95_Dark>
            </Tooltip>
            {isTypeUser === 'Cook' ? (
              <>
                <Tooltip title='General' placement="right">
                  <Button_Icon_Blue_95_Dark onClick={() => sidebarViews('General','')}><Text_A_18_Dark>General</Text_A_18_Dark><FaHospitalUser/></Button_Icon_Blue_95_Dark>
                </Tooltip>
                <Tooltip title='Colaboradores' placement="right">
                  <Button_Icon_Blue_95_Dark onClick={() => sidebarViews('Collaborators','')}><Text_A_18_Dark>Colaboradores</Text_A_18_Dark><FaUserFriends/></Button_Icon_Blue_95_Dark>
                </Tooltip>
                <Tooltip title='Nutriólogo' placement="right">
                  <Button_Icon_Blue_95_Dark onClick={() => sidebarViews('Nutritionist','')}><Text_A_18_Dark>Nutriólogo</Text_A_18_Dark><IoNutrition/></Button_Icon_Blue_95_Dark>
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
                  <Button_Icon_Blue_95_Dark onClick={() => sidebarViews('Doctor','')}><Text_A_18_Dark>General</Text_A_18_Dark><FaUserDoctor/></Button_Icon_Blue_95_Dark>
                </Tooltip>
              </>
            ):(
              <></>
            )}
            {isTypeUser === 'Administrator' ? (
              <>
                <Tooltip title='Usuarios' placement="right">
                  <Button_Icon_Blue_95_Dark onClick={() => sidebarViews('Users','Principal')}><Text_A_18_Dark>Usuarios</Text_A_18_Dark><FaUserGroup/></Button_Icon_Blue_95_Dark>
                </Tooltip>
                <Tooltip title='Proveedores' placement="right">
                  <Button_Icon_Blue_95_Dark onClick={() => sidebarViews('Suppliers','')}><Text_A_18_Dark>Proveedores</Text_A_18_Dark><FaUserTie/></Button_Icon_Blue_95_Dark>
                </Tooltip>
                <Tooltip title='Menús' placement="right">
                  <Button_Icon_Blue_95_Dark onClick={() => sidebarViews('Menus','')}><Text_A_18_Dark>Menús</Text_A_18_Dark><BiSolidFoodMenu/></Button_Icon_Blue_95_Dark>
                </Tooltip>
                <Tooltip title='Inventario' placement="right">
                  <Button_Icon_Blue_95_Dark onClick={() => sidebarViews('Inventory','')}><Text_A_18_Dark>Inventario</Text_A_18_Dark><MdStorage/></Button_Icon_Blue_95_Dark>
                </Tooltip>
                <Tooltip title='Historial' placement="right">
                  <Button_Icon_Blue_95_Dark onClick={() => sidebarViews('Record','')}><Text_A_18_Dark>Historial</Text_A_18_Dark><MdWorkHistory/></Button_Icon_Blue_95_Dark>
                </Tooltip>
              </>
            ):(
              <></>
            )}
            {isTypeUser === 'Chef' ? (
              <>
                <Tooltip title='Proveedores' placement="right">
                  <Button_Icon_Blue_95_Dark onClick={() => sidebarViews('Suppliers','')}><Text_A_18_Dark>Proveedores</Text_A_18_Dark><FaUserTie/></Button_Icon_Blue_95_Dark>
                </Tooltip>
                <Tooltip title='Menús' placement="right">
                  <Button_Icon_Blue_95_Dark onClick={() => sidebarViews('Menus','')}><Text_A_18_Dark>Menús</Text_A_18_Dark><BiSolidFoodMenu/></Button_Icon_Blue_95_Dark>
                </Tooltip>
                <Tooltip title='Inventario' placement="right">
                  <Button_Icon_Blue_95_Dark onClick={() => sidebarViews('Inventory','')}><Text_A_18_Dark>Inventario</Text_A_18_Dark><MdStorage/></Button_Icon_Blue_95_Dark>
                </Tooltip>
                <Tooltip title='Historial' placement="right">
                  <Button_Icon_Blue_95_Dark onClick={() => sidebarViews('Record','')}><Text_A_18_Dark>Historial</Text_A_18_Dark><MdWorkHistory/></Button_Icon_Blue_95_Dark>
                </Tooltip>
              </>
            ):(
              <></>
            )}
            {isTypeUser === 'Storekeeper' ? (
              <>
                <Tooltip title='Proveedores' placement="right">
                  <Button_Icon_Blue_95_Dark onClick={() => sidebarViews('Suppliers','')}><Text_A_18_Dark>Proveedores</Text_A_18_Dark><FaUserTie/></Button_Icon_Blue_95_Dark>
                </Tooltip>
                <Tooltip title='Inventario' placement="right">
                  <Button_Icon_Blue_95_Dark onClick={() => sidebarViews('Inventory','')}><Text_A_18_Dark>Inventario</Text_A_18_Dark><MdStorage/></Button_Icon_Blue_95_Dark>
                </Tooltip>
                <Tooltip title='Historial' placement="right">
                  <Button_Icon_Blue_95_Dark onClick={() => sidebarViews('Record','')}><Text_A_18_Dark>Historial</Text_A_18_Dark><MdWorkHistory/></Button_Icon_Blue_95_Dark>
                </Tooltip>
              </>
            ):(
              <></>
            )}
          </Container_Sidebar_Dark>
        </>
      )}  
    </>
  );
}