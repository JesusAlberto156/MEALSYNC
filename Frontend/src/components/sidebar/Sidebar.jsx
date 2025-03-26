import React, { useState, useEffect,useContext } from "react";
import { Tooltip } from "@mui/material";

import { typeUserContext } from "../../contexts/TypeUserProvider";
import { visibleContext } from "../../contexts/VariablesProvider";
import { userContext } from "../../contexts/UsersProvider";

import { useModal } from "../../hooks/Modal";
import { useToggleSidebar,useSidebarHome,useSidebarOption } from '../../hooks/Sidebar'

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
import { MdWorkHistory } from "react-icons/md";
import { MdStorage } from "react-icons/md";
import { BiSolidFoodMenu } from "react-icons/bi";
import { FaUserTie } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";

import { Title_Sidebar } from "../styled/Text";
import { Background_Sidebar } from "../styled/Backgrounds";
import { Button_Blue_Sidebar,Button_Red_Sidebar } from '../styled/Buttons';

import './Sidebar.css';

export default function Sidebar() {

  const toggleSidebar = useToggleSidebar();
  const modal = useModal();
  const sidebarHome = useSidebarHome();
  const sidebarOption = useSidebarOption();

  const [isTypeUser] = useContext(typeUserContext);
  const [isVisible] = useContext(visibleContext);
  const [isUser] = useContext(userContext);

  const [profileImage, setProfileImage] = useState("https://img.freepik.com/vector-premium/icono-contacto-perfil-icono-avatar_1199668-1320.jpg?w=740");
  
  useEffect(() => {
    const content = document.getElementById("content");
    if (content) {
      content.className = isVisible ? "with-sidebar" : "no-sidebar";
    }
  }, [isVisible]);
  
  return (
    <>
      <Background_Sidebar>
        <Tooltip title='Salir' placement="left">
          <Button_Red_Sidebar onClick={() => modal('Cerrar-Sesion')}>
            <span><FaSignOutAlt/></span>
          </Button_Red_Sidebar>
        </Tooltip>  
        <Tooltip title='Ocultar/Mostrar' placement="right">
          <Button_Blue_Sidebar onClick={toggleSidebar}>
            <FaBars />
          </Button_Blue_Sidebar>
        </Tooltip>    
      </Background_Sidebar>
      <div className={`sidebar ${isVisible ? 'visible' : 'hidden'}`}>
        <div className="profile-container">
          <img 
            src={profileImage} 
            alt="Perfil" 
            className="profile-icon"
          />         
        </div>
        <Title_Sidebar>{isUser.nombre}</Title_Sidebar>
        <ul>
          <Tooltip title='Inicio' placement="right">
            <li onClick={() => sidebarHome('Inicio')}><a>Inicio
                <span><BiSolidHomeAlt2/></span>
              </a>
            </li>
          </Tooltip>
          {isTypeUser === 'Cocinero' ? (
            <>
              <Tooltip title='General' placement="right">
                <li onClick={() => sidebarOption('General','')}><a>General
                    <span><MdFamilyRestroom/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='Colaboradores' placement="right">
                <li onClick={() => sidebarOption('Colaboradores','')}><a>Colaboradores
                    <span><IoIosPeople/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='Nutriólogo' placement="right">
                <li onClick={() => sidebarOption('Nutriologo','')}><a>Nutriólogo
                    <span><IoNutrition/></span>
                  </a>
                </li>
              </Tooltip>
            </>
          ):(
            <></>
          )}
          {isTypeUser === 'Nutriologo' ? (
            <>
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
          {isTypeUser === 'Medico' ? (
            <>
              <Tooltip title='Menú' placement="right">
                <li onClick={() => sidebarOption('Medico','')}><a>Menú
                    <span><MdOutlineRestaurantMenu/></span>
                  </a>
                </li>
              </Tooltip>
            </>
          ):(
            <></>
          )}
          {isTypeUser === 'Administrador' ? (
            <>
              <Tooltip title='Usuarios' placement="right">
                <li onClick={() => sidebarOption('Usuarios','General')}><a>Usuarios
                    <span><FaUserGroup/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='Proveedores' placement="right">
                <li onClick={() => sidebarOption('Proveedores','')}><a>Proveedores
                    <span><FaUserTie/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='Menús' placement="right">
                <li onClick={() => sidebarOption('Menus','')}><a>Menús
                    <span><BiSolidFoodMenu/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='Inventario' placement="right">
                <li onClick={() => sidebarOption('Inventario','')}><a>Inventario
                    <span><MdStorage/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='Historial' placement="right">
                <li onClick={() => sidebarOption('Historial','')}><a>Historial
                    <span><MdWorkHistory/></span>
                  </a>
                </li>
              </Tooltip>
            </>
          ):(
            <></>
          )}
          {isTypeUser === 'Chef' ? (
            <>
              <Tooltip title='Proveedores' placement="right">
                <li onClick={() => sidebarOption('Proveedores','')}><a>Proveedores
                    <span><FaUserTie/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='Menús' placement="right">
                <li onClick={() => sidebarOption('Menus','')}><a>Menús
                    <span><BiSolidFoodMenu/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='Inventario' placement="right">
                <li onClick={() => sidebarOption('Inventario','')}><a>Inventario
                    <span><MdStorage/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='Historial' placement="right">
                <li onClick={() => sidebarOption('Historial','')}><a>Historial
                    <span><MdWorkHistory/></span>
                  </a>
                </li>
              </Tooltip>
            </>
          ):(
            <></>
          )}
          {isTypeUser === 'Almacen' ? (
            <>
              <Tooltip title='Proveedores' placement="right">
                <li onClick={() => sidebarOption('Proveedores','')}><a>Proveedores
                    <span><FaUserTie/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='Inventario' placement="right">
                <li onClick={() => sidebarOption('Inventario','')}><a>Inventario
                    <span><MdStorage/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='Historial' placement="right">
                <li onClick={() => sidebarOption('Historial','')}><a>Historial
                    <span><MdWorkHistory/></span>
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