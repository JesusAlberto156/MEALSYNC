import React, { useState, useEffect,useContext } from "react";
import { typeUserContext } from "../../contexts/TypeUserProvider";
import { sidebarVisibleContext } from "../../contexts/SidebarVisibleProvider";
import { userContext } from "../../contexts/UserProvider";

import { FaBars } from "react-icons/fa";
import { BiSolidHomeAlt2 } from "react-icons/bi";
import { MdFamilyRestroom } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { IoNutrition } from "react-icons/io5";
import { MdFreeBreakfast } from "react-icons/md";
import { IoFastFood } from "react-icons/io5";
import { LuDessert } from "react-icons/lu";
import { GiCoffeeCup } from "react-icons/gi";
import { BiSolidCustomize } from "react-icons/bi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { GiMeal } from "react-icons/gi";
import { RiDrinks2Fill } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";

import { Title_Sidebar } from "../styled/Text";
import { Tooltip } from "@mui/material";
import { Background_Sidebar } from "../styled/Backgrounds";
import { Button_Blue_Sidebar,Button_Red_Sidebar } from '../styled/Buttons';
import { useModalOutLogin } from "../../hooks/Modals";
import { useToggleSidebar,useSidebarActions } from '../../hooks/Sidebar'

import './Sidebar.css';

export default function Sidebar() {

  const toggleSidebar = useToggleSidebar();
  const modalOutLogin = useModalOutLogin();
  const { HomeMenu, General, Collaborators, Nutritionist, Doctor, HomeAdministration, Users, Suppliers, Menus, Inventory} = useSidebarActions();

  const [typeUser] = useContext(typeUserContext);
  const [sidebarVisible] = useContext(sidebarVisibleContext);
  const [user] = useContext(userContext);

  const [profileImage, setProfileImage] = useState("https://img.freepik.com/vector-premium/icono-contacto-perfil-icono-avatar_1199668-1320.jpg?w=740");
  
  useEffect(() => {
    const content = document.getElementById("content");
    if (content) {
      content.className = sidebarVisible ? "with-sidebar" : "no-sidebar";
    }
  }, [sidebarVisible]);
  
  return (
    <>
      <Background_Sidebar>
        <Tooltip title='Salir' placement="left">
          <Button_Red_Sidebar onClick={modalOutLogin}>
            <span><FaSignOutAlt/></span>
          </Button_Red_Sidebar>
        </Tooltip>  
        <Tooltip title='Ocultar/Mostrar' placement="right">
          <Button_Blue_Sidebar onClick={toggleSidebar}>
            <FaBars />
          </Button_Blue_Sidebar>
        </Tooltip>    
      </Background_Sidebar>
      <div className={`sidebar ${sidebarVisible ? 'visible' : 'hidden'}`}>
        <div className="profile-container">
          <img 
            src={profileImage} 
            alt="Perfil" 
            className="profile-icon"
          />         
        </div>
        <Title_Sidebar>{user.nombre}</Title_Sidebar>
        <ul>
          {typeUser === 'Cocinero' ? (
            <>
              <Tooltip title='Inicio' placement="right">
                <li onClick={() => HomeMenu('Inicio')}><a>Inicio
                    <span><BiSolidHomeAlt2/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='General' placement="right">
                <li onClick={() => General('Menu','General')}><a>General
                    <span><MdFamilyRestroom/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='Colaboradores' placement="right">
                <li onClick={() => Collaborators('Menu','Colaboradores')}><a>Colaboradores
                    <span><IoIosPeople/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='Nutriólogo' placement="right">
                <li onClick={() => Nutritionist('Menu','Nutriologo')}><a>Nutriólogo
                    <span><IoNutrition/></span>
                  </a>
                </li>
              </Tooltip>
            </>
          ):(
            <></>
          )}
          {typeUser === 'Nutriologo' ? (
            <>
              <Tooltip title='Inicio' placement="right">
                <li><a>Inicio
                    <span className="icon-span"><BiSolidHomeAlt2/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='Bebidas' placement="right">
                <li><a>Bebidas
                    <span><RiDrinks2Fill/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='Desayuno' placement="right">
                <li><a>Desayuno
                    <span><MdFreeBreakfast/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='Comida' placement="right">
                <li><a>Comida
                    <span><GiMeal/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='Snacks' placement="right">
                <li><a>Snacks
                    <span><IoFastFood/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='Postres' placement="right">
                <li><a>Postres
                    <span><LuDessert/></span>
                  </a>
                </li>
              </Tooltip>  
              <Tooltip title='Cafetería' placement="right">
                <li><a>Cafetería
                    <span><GiCoffeeCup/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='Personalizados' placement="right">
                <li><a>Personalizados
                    <span><BiSolidCustomize/></span>
                  </a>
                </li>
              </Tooltip>
            </>
          ):(
            <></>
          )}
          {typeUser === 'Medico' ? (
            <>
              <Tooltip title='Inicio' placement="right">
                <li onClick={() => HomeMenu('Inicio')}><a>Inicio
                    <span><BiSolidHomeAlt2/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='Menú' placement="right">
                <li onClick={() => Doctor('Menu','Medico')}><a>Menú
                    <span><MdOutlineRestaurantMenu/></span>
                  </a>
                </li>
              </Tooltip>
            </>
          ):(
            <></>
          )}
          {typeUser === 'Administrador' ? (
            <>
              <Tooltip title='Inicio' placement="right">
                <li onClick={() => HomeAdministration('Inicio')}><a>Inicio
                    <span><BiSolidHomeAlt2/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='Usuarios' placement="right">
                <li onClick={() => Users('Usuarios','Administrador')}><a>Usuarios
                    <span><BiSolidHomeAlt2/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='Proveedores' placement="right">
                <li onClick={() => Suppliers('Proveedores','Administrador')}><a>Proveedores
                    <span><BiSolidHomeAlt2/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='Menús' placement="right">
                <li onClick={() => Menus('Menus','Administrador')}><a>Menús
                    <span><BiSolidHomeAlt2/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='Inventario' placement="right">
                <li onClick={() => Inventory('Inventario','Administrador')}><a>Inventario
                    <span><BiSolidHomeAlt2/></span>
                  </a>
                </li>
              </Tooltip>
            </>
          ):(
            <></>
          )}
          {typeUser === 'Chef' ? (
            <>
              <Tooltip title='Inicio' placement="right">
                <li onClick={() => HomeAdministration('Inicio')}><a>Inicio
                    <span><BiSolidHomeAlt2/></span>
                  </a>
                </li>
              </Tooltip>
            </>
          ):(
            <></>
          )}
          {typeUser === 'Almacen' ? (
            <>
              <Tooltip title='Inicio' placement="right">
                <li onClick={() => HomeAdministration('Inicio')}><a>Inicio
                    <span><BiSolidHomeAlt2/></span>
                  </a>
                </li>
              </Tooltip>
            </>
          ):(
            <></>
          )}
        </ul>
      </div>
    </>
  );
}