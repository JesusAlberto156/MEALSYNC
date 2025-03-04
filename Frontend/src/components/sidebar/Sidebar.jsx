import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

import { Whitespace_100,Title } from "../styled/Sidebar";

import { Tooltip } from "@mui/material";

import './Sidebar.css';

export default function Sidebar({ user,onSwitchView,isModalOutLogin,isSidebarVisible,setActiveOption }) {
  
  const navigate = useNavigate();

  const OutLogin = async () => {
    isModalOutLogin(true);
  } 

  const Home = async () => {
    onSwitchView('Inicio');
    setActiveOption('Inicio');
  }

  const General = async () => {
    onSwitchView('Menu');
    setActiveOption('General');
  }

  const Colaboradores = async () => {
    onSwitchView('Menu');
    setActiveOption('Colaboradores');
  }

  const Nutriologo = async () => {
    onSwitchView('Menu');
    setActiveOption('Nutriologo');
  }

  const Medico = async () => {
    onSwitchView('Menu');
    setActiveOption('Medico');
  }

  const [isVisible, setIsVisible] = useState(() => {
    const storedState = localStorage.getItem("sidebarVisible");
    return storedState === "true";
  });

  const [profileImage, setProfileImage] = useState("https://img.freepik.com/vector-premium/icono-contacto-perfil-icono-avatar_1199668-1320.jpg?w=740");

  const toggleSidebar = () => {
    const newState = !isVisible;
    setIsVisible(newState);
    localStorage.setItem("sidebarVisible", newState);

    isSidebarVisible(newState);
  };

  useEffect(() => {
    const content = document.getElementById("content");
    if (content) {
      content.className = isVisible ? "with-sidebar" : "no-sidebar";
    }
  }, [isVisible]);
  
  return (
    <>
      <Tooltip title='Ocultar/Mostrar' placement="right">
        <button className="toggle-button" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </Tooltip>
      <div className={`sidebar ${isVisible ? 'visible' : 'hidden'}`}>
        <div className="profile-container">
          <img 
            src={profileImage} 
            alt="Perfil" 
            className="profile-icon"
          />         
        </div>
        <Title>Nombre de usuario</Title>
        <ul>
          {user === 'Cocinero' ? (
            <div>
              <Tooltip title='Inicio' placement="right">
                <li onClick={Home}><a>Inicio
                    <span><BiSolidHomeAlt2/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='General' placement="right">
                <li onClick={General}><a>General
                    <span><MdFamilyRestroom/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='Colaboradores' placement="right">
                <li onClick={Colaboradores}><a>Colaboradores
                    <span><IoIosPeople/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='Nutriólogo' placement="right">
                <li onClick={Nutriologo}><a>Nutriólogo
                    <span><IoNutrition/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='Salir' placement="right">
                <li onClick={OutLogin}><a>Salir
                    <span><FaSignOutAlt/></span>
                  </a>
                </li>
              </Tooltip>
              <Whitespace_100/>
            </div>
          ):(
            <></>
          )}
          {user === 'Nutriologo' ? (
            <div>
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
              <Tooltip title='Salir' placement="right">
                <li onClick={OutLogin}><a>Salir
                    <span><FaSignOutAlt/></span>
                  </a>
                </li>
              </Tooltip>
              <Whitespace_100/>
            </div>
          ):(
            <></>
          )}
          {user == 'Medico' ? (
            <div>
              <Tooltip title='Inicio' placement="right">
                <li onClick={Home}><a>Inicio
                    <span><BiSolidHomeAlt2/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='Menú' placement="right">
                <li onClick={Medico}><a>Menú
                    <span><MdOutlineRestaurantMenu/></span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title='Salir' placement="right">
                <li onClick={OutLogin}><a>Salir
                    <span><FaSignOutAlt/></span>
                  </a>
                </li>
              </Tooltip>
            </div>
          ):(
            <></>
          )}
        </ul>
      </div>
    </>
  );
}