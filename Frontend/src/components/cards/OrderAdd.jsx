//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ActionBlockContext } from "../../contexts/VariablesProvider";
import { SelectedRowContext,SelectedOptionOrderPlusContext } from "../../contexts/SelectedesProvider";
import { RefButtonDetailContext } from "../../contexts/RefsProvider";
import { TextFieldsOrderDoctorContext,TextFieldsOrderKitchenContext } from "../../contexts/FormsProvider";
import { LoggedTypeContext } from "../../contexts/SessionProvider";
//__________ICONOS__________
import { BiSolidMessageDetail } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
//__________ICONOS__________
// Estilos personalizados
import { Card_Menu_White,Card_Menu_White_300,Card_Menu_Functions,Card_Menu_Column_100_Information } from '../styled/Cards';
import { Text_Color_Blue_12, Text_Span_12_Justify_Black,Text_Title_16_Black } from "../styled/Text";
import { Image_Menu_100 } from "../styled/Imgs";
import { Container_Row_100_Center, Container_Row_NG_100_Left } from "../styled/Containers";
import { Button_Icon_Orange_160, Button_Icon_Red_80, Button_Icon_Green_80 } from "../styled/Buttons";
import { Icon_20 } from "../styled/Icons";
//____________IMPORT/EXPORT____________

// Componente para información de cosas al menú
export default function Card_Information({
    data = {},
    title = '',
    image = '',
    preparation = '',
    onHandleView = () => {},
    id = '',
    idplatillo = 0,
    idguarnicion = 0,
    idbebida = 0,
    routeDetail = '',
    row = null,
    onHandleModalViewDetail = () => {},
    onAdd = () => {},
    onDelete = () => {},
    onAddCook = () => {},
    onDeleteCook = () => {},
}){
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    const [isSelectedRow] = useContext(SelectedRowContext); 
    const isButtonDetail = useContext(RefButtonDetailContext);
    const [isTextFieldsOrderDoctor] = useContext(TextFieldsOrderDoctorContext); 
    const [isTextFieldsOrderKitchen] = useContext(TextFieldsOrderKitchenContext); 
    const [isLoggedType] = useContext(LoggedTypeContext);
    const [isSelectedOptionOrderPlus] = useContext(SelectedOptionOrderPlusContext);
    // constantes con el valor de los hooks
    const navigate = useNavigate();
    // Constantes
    let isSelected;
    if(isLoggedType === 'Médico'){
        isSelected = idplatillo;
    }
    if(isLoggedType === 'Cocinero'){
        if(isSelectedOptionOrderPlus === 'Platillos'){
            isSelected = idplatillo;
        }
        if(isSelectedOptionOrderPlus === 'Guarniciones'){
            isSelected = idguarnicion;
        }
        if(isSelectedOptionOrderPlus === 'Bebidas'){
            isSelected = idbebida;
        }
    }
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
                <Card_Menu_White 
                    style={{ backgroundColor: isTextFieldsOrderDoctor.pedidos.some(p => p.idplatillo === isSelected) || isTextFieldsOrderKitchen.pedidos.some(p => p.idplatillo === isSelected || p.idguarnicion === isSelected || p.idbebida === isSelected) ? 'rgba(206, 135, 227, 1)' : ''}} 
                    isDisabled={isActionBlock}
                >
                    <Card_Menu_Functions>
                        {row !== null && (row?.idplatillo === idplatillo || row?.idbebida === idbebida || row?.idguarnicion === idguarnicion)  ? (
                            isActionBlock ? (
                                <>
                                    <Card_Menu_Column_100_Information>
                                        <Button_Icon_Orange_160 disabled>
                                            <Icon_20><BiSolidMessageDetail/></Icon_20>
                                        </Button_Icon_Orange_160>
                                    </Card_Menu_Column_100_Information>
                                </>
                            ):(
                                <>
                                    <Card_Menu_Column_100_Information>
                                        <Tooltip title='Detalles' placement="top">
                                            <Button_Icon_Orange_160
                                                ref={isButtonDetail}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onHandleModalViewDetail();
                                                    navigate(routeDetail,{ replace: true });
                                                }}
                                            >
                                                <Icon_20><BiSolidMessageDetail/></Icon_20>
                                            </Button_Icon_Orange_160>
                                        </Tooltip>
                                    </Card_Menu_Column_100_Information>
                                </>  
                            )
                        ):(
                            <>
                                {isLoggedType === 'Médico' ? (
                                    <>
                                        <Text_Title_16_Black style={{ color: isActionBlock ? 'rgba(255, 255, 255, 1)': ''}}>{title}</Text_Title_16_Black>
                                        <Image_Menu_100 style={{ borderColor: isActionBlock ? 'rgba(255, 255, 255, 1)': ''}} src={image}/>
                                        <Container_Row_NG_100_Left>
                                            <Text_Color_Blue_12 style={{ color: isActionBlock ? 'rgb(82, 126, 231)': ''}}>Tiempo de preparación</Text_Color_Blue_12>
                                            <Text_Span_12_Justify_Black style={{ color: isActionBlock ? 'rgba(255, 255, 255, 1)': ''}}>: {preparation} {preparation !== '1' ? 'minutos' : 'minuto'}</Text_Span_12_Justify_Black>
                                        </Container_Row_NG_100_Left>
                                        <Container_Row_100_Center>
                                            <Button_Icon_Red_80
                                                disabled={isActionBlock || !isTextFieldsOrderDoctor.pedidos.some(p => p.idplatillo === isSelected)}
                                                onClick={() => onDelete()}
                                            >
                                                <Icon_20><FaMinus/></Icon_20>
                                            </Button_Icon_Red_80>
                                            <Button_Icon_Green_80
                                                disabled={isActionBlock || isTextFieldsOrderDoctor.pedidos.some(p => p.idplatillo === isSelected) || isTextFieldsOrderDoctor.pedidos.length === 4}
                                                onClick={() => onAdd()}
                                            >
                                                <Icon_20><FaPlus/></Icon_20>
                                            </Button_Icon_Green_80>
                                        </Container_Row_100_Center>  
                                    </>
                                ):(
                                    <></>
                                )}
                                {isLoggedType === 'Cocinero' ? (
                                    <>
                                        <Text_Title_16_Black style={{ color: isActionBlock ? 'rgba(255, 255, 255, 1)': ''}}>{title}</Text_Title_16_Black>
                                        <Image_Menu_100 style={{ borderColor: isActionBlock ? 'rgba(255, 255, 255, 1)': ''}} src={image}/>
                                        <Container_Row_NG_100_Left>
                                            <Text_Color_Blue_12 style={{ color: isActionBlock ? 'rgb(82, 126, 231)': ''}}>Tiempo de preparación</Text_Color_Blue_12>
                                            <Text_Span_12_Justify_Black style={{ color: isActionBlock ? 'rgba(255, 255, 255, 1)': ''}}>: {preparation} {preparation !== '1' ? 'minutos' : 'minuto'}</Text_Span_12_Justify_Black>
                                        </Container_Row_NG_100_Left>
                                        <Container_Row_100_Center>
                                            <Button_Icon_Red_80
                                                disabled={isActionBlock || !isTextFieldsOrderKitchen.pedidos.some(p => p.idplatillo === isSelected || p.idguarnicion === isSelected || p.idbebida === isSelected)}
                                                onClick={() => onDeleteCook()}
                                            >
                                                <Icon_20><FaMinus/></Icon_20>
                                            </Button_Icon_Red_80>
                                            <Button_Icon_Green_80
                                                disabled={isActionBlock || isTextFieldsOrderKitchen.pedidos.some(p => p.idplatillo === isSelected || p.idguarnicion === isSelected || p.idbebida === isSelected)}
                                                onClick={() => onAddCook()}
                                            >
                                                <Icon_20><FaPlus/></Icon_20>
                                            </Button_Icon_Green_80>
                                        </Container_Row_100_Center>
                                    </>
                                ):(
                                    <></>
                                )}
                            </>
                        )}
                    </Card_Menu_Functions>
                </Card_Menu_White>
            </Card_Menu_White_300>
        </>
    );
}