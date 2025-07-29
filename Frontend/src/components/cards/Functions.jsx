//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ActionBlockContext } from "../../contexts/VariablesProvider";
//__________ICONOS__________
import { BiSolidMessageDetail } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Icon_20 } from '../styled/Icons';
import { Card_Menu_White_300,Card_Menu_White,Card_Menu_Functions,Card_Menu_Gray } from '../styled/Cards';
import { Button_Icon_Blue_160,Button_Icon_Orange_160,Button_Icon_Red_160 } from "../styled/Buttons";
//____________IMPORT/EXPORT____________

// Componente para agregar cosas al menú
export default function Card_Functions({
    routeDetail = '',
    onHandleModalViewDetail = () => {},
    routeEdit = '',
    onHandleModalViewEdit = () => {},
    routeDelete = '',
    onHandleModalViewDelete = () => {},
    id = '',
}){
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    // constantes con el valor de los hooks
    const navigate = useNavigate();
    // Estructura del componente
    return(
        <>
            <Card_Menu_White_300 disabled={isActionBlock}>
                {isActionBlock ? (
                    <Card_Menu_Gray>
                        <Card_Menu_Functions>
                            <Button_Icon_Orange_160 disabled>
                                <Icon_20><BiSolidMessageDetail/></Icon_20>
                            </Button_Icon_Orange_160>
                            <Button_Icon_Blue_160 disabled>
                                <Icon_20><MdEdit/></Icon_20>
                            </Button_Icon_Blue_160>
                            <Button_Icon_Red_160 disabled>
                                <Icon_20><MdDelete/></Icon_20>
                            </Button_Icon_Red_160>
                        </Card_Menu_Functions>
                    </Card_Menu_Gray>
                ):(
                    <Card_Menu_White className={id}>
                        <Card_Menu_Functions>
                            <Tooltip title='Detalles' placement="top">
                                <Button_Icon_Orange_160
                                    onClick={() => {
                                        onHandleModalViewDetail();
                                        navigate(routeDetail,{ replace: true });
                                    }}
                                >
                                    <Icon_20><BiSolidMessageDetail/></Icon_20>
                                </Button_Icon_Orange_160>
                            </Tooltip>
                            <Tooltip title='Editar' placement="top">
                                <Button_Icon_Blue_160
                                    onClick={() => {
                                        onHandleModalViewEdit();
                                        navigate(routeEdit,{ replace: true });
                                    }}
                                >
                                    <Icon_20><MdEdit/></Icon_20>
                                </Button_Icon_Blue_160>
                            </Tooltip>
                            <Tooltip title='Eliminar' placement="top">
                                <Button_Icon_Red_160
                                    onClick={() => {
                                        onHandleModalViewDelete();
                                        navigate(routeDelete,{ replace: true });
                                    }}
                                >
                                    <Icon_20><MdDelete/></Icon_20>
                                </Button_Icon_Red_160>
                            </Tooltip>  
                        </Card_Menu_Functions>
                    </Card_Menu_White>
                )}
            </Card_Menu_White_300>
        </>
    );
}