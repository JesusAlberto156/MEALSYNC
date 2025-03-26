import { useContext } from "react";
import { Tooltip } from "@mui/material";

import { sidebarContext } from "../../contexts/ViewsProvider";

import { useNavbarViews } from '../../hooks/Navbar'

import { MdFreeBreakfast } from "react-icons/md";
import { IoFastFood } from "react-icons/io5";
import { LuDessert } from "react-icons/lu";
import { GiCoffeeCup } from "react-icons/gi";
import { GiMeal } from "react-icons/gi";
import { RiDrinks2Fill } from "react-icons/ri";
import { SiJuce } from "react-icons/si";
import { PiBowlFoodFill } from "react-icons/pi";
import { BiSolidCustomize } from "react-icons/bi";
import { GiFoodChain } from "react-icons/gi";
import { GiKnifeFork } from "react-icons/gi";
import { SiCocacola } from "react-icons/si";
import { GiHotMeal } from "react-icons/gi";
import { FaHourglassStart } from "react-icons/fa";
import { FaUserTag } from "react-icons/fa6";
import { FaUserLock } from "react-icons/fa6";
import { FaUserClock } from "react-icons/fa6";

import { Background_Navbar} from '../styled/Backgrounds';
import { Container_Navbar } from "../styled/Containers";
import { Logo_Navbar} from '../styled/Imgs';
import { Button_Black_Navbar} from '../styled/Buttons';

export default function Navbar(){
    
    const navbarViews = useNavbarViews();
    
    const [isSidebar] = useContext(sidebarContext);
 
    return(
        <Container_Navbar>   
            <Logo_Navbar/> 
            <Background_Navbar>
                {isSidebar === 'General' ? (
                    <>
                        <Tooltip title='Bebidas' placement="right-start">
                            <Button_Black_Navbar><RiDrinks2Fill/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Jugos del día' placement="right-start">
                            <Button_Black_Navbar><SiJuce/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Desayuno' placement="right-start">
                            <Button_Black_Navbar><MdFreeBreakfast/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Comida' placement="right-start">
                            <Button_Black_Navbar><GiMeal/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Pasta y Ensaladas' placement="right-start">
                            <Button_Black_Navbar><PiBowlFoodFill/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Snacks' placement="right-start">
                            <Button_Black_Navbar><IoFastFood/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Postres' placement="right-start">
                            <Button_Black_Navbar><LuDessert/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Cafetería' placement="right-start">
                            <Button_Black_Navbar><GiCoffeeCup/></Button_Black_Navbar>
                        </Tooltip>
                    </>
                ):(
                    <></>
                )}
                {isSidebar === 'Colaboradores' ? (
                    <>
                        <Tooltip title='Bebidas' placement="right-start">
                            <Button_Black_Navbar><RiDrinks2Fill/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Jugos' placement="right-start">
                            <Button_Black_Navbar><SiJuce/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Desayuno' placement="right-start">
                            <Button_Black_Navbar><MdFreeBreakfast/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Comida' placement="right-start">
                            <Button_Black_Navbar><GiMeal/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Ensaladas' placement="right-start">
                            <Button_Black_Navbar><PiBowlFoodFill/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Mariscos' placement="right-start">
                            <Button_Black_Navbar><GiFoodChain/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Snacks' placement="right-start">
                            <Button_Black_Navbar><IoFastFood/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Frutas' placement="right-start">
                            <Button_Black_Navbar><LuDessert/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Cafetería' placement="right-start">
                            <Button_Black_Navbar><GiCoffeeCup/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Otros' placement="right-start">
                            <Button_Black_Navbar><GiKnifeFork/></Button_Black_Navbar>
                        </Tooltip>
                    </>
                ):(
                    <></>
                )}
                {isSidebar === 'Nutriologo' ? (
                    <>
                        <Tooltip title='Bebidas' placement="right-start">
                            <Button_Black_Navbar><RiDrinks2Fill/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Jugos del día' placement="right-start">
                            <Button_Black_Navbar><SiJuce/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Desayuno' placement="right-start">
                            <Button_Black_Navbar><MdFreeBreakfast/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Comida' placement="right-start">
                            <Button_Black_Navbar><GiMeal/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Pasta y Ensaladas' placement="right-start">
                            <Button_Black_Navbar><PiBowlFoodFill/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Snacks' placement="right-start">
                            <Button_Black_Navbar><IoFastFood/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Postres' placement="right-start">
                            <Button_Black_Navbar><LuDessert/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Cafetería' placement="right-start">
                            <Button_Black_Navbar><GiCoffeeCup/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Personalizados' placement="right-start">
                            <Button_Black_Navbar><BiSolidCustomize/></Button_Black_Navbar>
                        </Tooltip>
                    </>
                ):(
                    <></>
                )}
                {isSidebar === 'Medico' ? (
                    <>
                        <Tooltip title='Desayuno' placement="right-start">
                            <Button_Black_Navbar><MdFreeBreakfast/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Platillos Fuertes' placement="right-start">
                            <Button_Black_Navbar><GiHotMeal/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Entrada' placement="right-start">
                            <Button_Black_Navbar><FaHourglassStart/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Platillos Comida' placement="right-start">
                            <Button_Black_Navbar><GiMeal/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Bebidas' placement="right-start">
                            <Button_Black_Navbar><RiDrinks2Fill/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Jugos Naturales' placement="right-start">
                            <Button_Black_Navbar><SiJuce/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Bebidas Calientes' placement="right-start">
                            <Button_Black_Navbar><GiCoffeeCup/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Refrescos' placement="right-start">
                            <Button_Black_Navbar><SiCocacola/></Button_Black_Navbar>
                        </Tooltip>
                    </>
                ):(
                    <></>
                )}
                {isSidebar === 'Usuarios' ? (
                    <>
                        <Tooltip title='General' placement="right-start">
                            <Button_Black_Navbar onClick={() => navbarViews('General')}><FaUserTag/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Permisos' placement="right-start">
                            <Button_Black_Navbar onClick={() => navbarViews('Permisos')}><FaUserLock/></Button_Black_Navbar>
                        </Tooltip>
                        <Tooltip title='Estatus' placement="right-start">
                            <Button_Black_Navbar onClick={() => navbarViews('Estatus')}><FaUserClock/></Button_Black_Navbar>
                        </Tooltip>
                    </>
                ):(
                    <></>
                )}
            </Background_Navbar>
        </Container_Navbar>
    );
}