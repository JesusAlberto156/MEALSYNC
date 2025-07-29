//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ActionBlockContext } from "../../contexts/VariablesProvider";
import { SelectedRowContext } from "../../contexts/SelectedesProvider";
//__________ICONOS__________
import { BiSolidMessageDetail } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Card_Menu_White,Card_Menu,Card_Menu_White_300,Card_Menu_Functions } from '../styled/Cards';
import { Text_Color_Blue_12, Text_Span_12_Justify_Black,Text_Title_16_Black } from "../styled/Text";
import { Image_Menu_100 } from "../styled/Imgs";
import { Container_Row_NG_100_Left } from "../styled/Containers";
import { Button_Icon_Blue_160,Button_Icon_Red_160,Button_Icon_Orange_160 } from "../styled/Buttons";
import { Icon_20 } from "../styled/Icons";
//____________IMPORT/EXPORT____________

// Componente para información de cosas al menú
export default function Card_Information({
    title = '',
    image = '',
    preparation = '',
    price = '',
    onHandleView = () => {},
    id = '',
    routeDetail = '',
    onHandleModalViewDetail = () => {},
    routeEdit = '',
    onHandleModalViewEdit = () => {},
    routeDelete = '',
    onHandleModalViewDelete = () => {},
}){
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    const [isSelectedRow] = useContext(SelectedRowContext); 
    // constantes con el valor de los hooks
    const navigate = useNavigate();
    // Estructura del componente
    return(
        <>
            <Card_Menu_White_300
                isDisabled={isActionBlock}
                onClick={() => {
                    if(isActionBlock) return; 
                    onHandleView();
                }}
                className={id}
            >
                <Card_Menu_White isDisabled={isActionBlock}>
                    {isSelectedRow === null ? (
                        <Card_Menu_Functions>
                            <Text_Title_16_Black style={{ color: isActionBlock ? 'rgba(255, 255, 255, 1)': ''}}>{title}</Text_Title_16_Black>
                            <Image_Menu_100 style={{ borderColor: isActionBlock ? 'rgba(255, 255, 255, 1)': ''}} src={image}/>
                            <Container_Row_NG_100_Left>
                                <Text_Color_Blue_12 style={{ color: isActionBlock ? 'rgb(82, 126, 231)': ''}}>Tiempo de preparación</Text_Color_Blue_12>
                                <Text_Span_12_Justify_Black style={{ color: isActionBlock ? 'rgba(255, 255, 255, 1)': ''}}>: {preparation} {preparation !== '1' ? 'minutos' : 'minuto'}</Text_Span_12_Justify_Black>
                            </Container_Row_NG_100_Left>
                            <Container_Row_NG_100_Left>
                                <Text_Color_Blue_12 style={{ color: isActionBlock ? 'rgb(82, 126, 231)': ''}}>Precio</Text_Color_Blue_12>
                                <Text_Span_12_Justify_Black style={{ color: isActionBlock ? 'rgba(255, 255, 255, 1)': ''}}>: $ {price} MXN</Text_Span_12_Justify_Black>
                            </Container_Row_NG_100_Left>
                        </Card_Menu_Functions>
                    ):(
                        isActionBlock ? (
                            <Card_Menu_Functions isDisabled={true}>
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
                        ):(
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
                        )
                    )}
                </Card_Menu_White>
            </Card_Menu_White_300>
        </>
    );
}