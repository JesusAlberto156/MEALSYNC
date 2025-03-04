
import { Tooltip } from "@mui/material";

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

import { Background, Container, Logo, Button_Aqua } from "../styled/Navbar";

export default function Navbar({ setActiveOption }){

    return(
        <Container>   
            <Logo/> 
            <Background>
                {setActiveOption === 'General' ? (
                    <>
                        <Tooltip title='Bebidas' placement="right-start">
                            <Button_Aqua><RiDrinks2Fill/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Jugos del día' placement="right-start">
                            <Button_Aqua><SiJuce/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Desayuno' placement="right-start">
                            <Button_Aqua><MdFreeBreakfast/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Comida' placement="right-start">
                            <Button_Aqua><GiMeal/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Pasta y Ensaladas' placement="right-start">
                            <Button_Aqua><PiBowlFoodFill/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Snacks' placement="right-start">
                            <Button_Aqua><IoFastFood/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Postres' placement="right-start">
                            <Button_Aqua><LuDessert/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Cafetería' placement="right-start">
                            <Button_Aqua><GiCoffeeCup/></Button_Aqua>
                        </Tooltip>
                    </>
                ):(
                    <></>
                )}
                {setActiveOption === 'Colaboradores' ? (
                    <>
                        <Tooltip title='Bebidas' placement="right-start">
                            <Button_Aqua><RiDrinks2Fill/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Jugos' placement="right-start">
                            <Button_Aqua><SiJuce/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Desayuno' placement="right-start">
                            <Button_Aqua><MdFreeBreakfast/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Comida' placement="right-start">
                            <Button_Aqua><GiMeal/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Ensaladas' placement="right-start">
                            <Button_Aqua><PiBowlFoodFill/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Mariscos' placement="right-start">
                            <Button_Aqua><GiFoodChain/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Snacks' placement="right-start">
                            <Button_Aqua><IoFastFood/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Frutas' placement="right-start">
                            <Button_Aqua><LuDessert/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Cafetería' placement="right-start">
                            <Button_Aqua><GiCoffeeCup/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Otros' placement="right-start">
                            <Button_Aqua><GiKnifeFork/></Button_Aqua>
                        </Tooltip>
                    </>
                ):(
                    <></>
                )}
                {setActiveOption === 'Nutriologo' ? (
                    <>
                        <Tooltip title='Bebidas' placement="right-start">
                            <Button_Aqua><RiDrinks2Fill/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Jugos del día' placement="right-start">
                            <Button_Aqua><SiJuce/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Desayuno' placement="right-start">
                            <Button_Aqua><MdFreeBreakfast/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Comida' placement="right-start">
                            <Button_Aqua><GiMeal/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Pasta y Ensaladas' placement="right-start">
                            <Button_Aqua><PiBowlFoodFill/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Snacks' placement="right-start">
                            <Button_Aqua><IoFastFood/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Postres' placement="right-start">
                            <Button_Aqua><LuDessert/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Cafetería' placement="right-start">
                            <Button_Aqua><GiCoffeeCup/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Personalizados' placement="right-start">
                            <Button_Aqua><BiSolidCustomize/></Button_Aqua>
                        </Tooltip>
                    </>
                ):(
                    <></>
                )}
                {setActiveOption === 'Medico' ? (
                    <>
                        <Tooltip title='Desayuno' placement="right-start">
                            <Button_Aqua><MdFreeBreakfast/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Platillos Fuertes' placement="right-start">
                            <Button_Aqua><GiHotMeal/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Entrada' placement="right-start">
                            <Button_Aqua><FaHourglassStart/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Platillos Comida' placement="right-start">
                            <Button_Aqua><GiMeal/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Bebidas' placement="right-start">
                            <Button_Aqua><RiDrinks2Fill/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Jugos Naturales' placement="right-start">
                            <Button_Aqua><SiJuce/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Bebidas Calientes' placement="right-start">
                            <Button_Aqua><GiCoffeeCup/></Button_Aqua>
                        </Tooltip>
                        <Tooltip title='Refrescos' placement="right-start">
                            <Button_Aqua><SiCocacola/></Button_Aqua>
                        </Tooltip>
                    </>
                ):(
                    <></>
                )}
            </Background>
        </Container>
    );
}