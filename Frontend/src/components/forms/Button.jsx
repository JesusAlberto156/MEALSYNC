//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ActionBlockContext,VerificationBlockContext,FunctionBlockContext } from "../../contexts/VariablesProvider";
// Hooks personalizados
import { HandleVerificationBlock } from "../../hooks/Forms";
import { ResetFilteredOrder,ResetFilteredSearch } from "../../hooks/Texts";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { FaUserCheck } from "react-icons/fa6";
import { ImExit } from "react-icons/im";
import { IoIosAddCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import { FaEye } from "react-icons/fa";
// Icono para la seccion del buscador
import { IoSearch } from "react-icons/io5";
import { LuArrowDownUp } from "react-icons/lu";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Form_Button } from "../styled/Containers";
import { Button_Icon_Blue_Auto_40,Button_Icon_Green_Auto_40,Button_Icon_Red_Auto_40,Button_Icon_Blue_Auto_50 } from "../styled/Buttons";
import { Icon_20,Icon_Button_White_20 } from "../styled/Icons";
//____________IMPORT/EXPORT____________

// Componentes con las diferentes funcionalidades de los botones de los modales 
export const Modal_Form_Button_OutLogin = ({ onCancel = () => {}, onAction = () => {} }) => {
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    // Estructura del componente
    return (
        <>
            {isActionBlock ? (
                <Container_Modal_Form_Button>
                    <Button_Icon_Blue_Auto_40
                        disabled
                    >
                        <Icon_20><MdCancel/></Icon_20>
                    </Button_Icon_Blue_Auto_40>
                    <Button_Icon_Red_Auto_40
                        disabled  
                    >
                        <Icon_20><ImExit/></Icon_20>
                    </Button_Icon_Red_Auto_40>
                </Container_Modal_Form_Button>
            ):(
                <Container_Modal_Form_Button>
                    <Tooltip title='Cancelar' placement='top'>
                        <Button_Icon_Blue_Auto_40
                            onClick={() => onCancel()}  
                        >
                            <Icon_20><MdCancel/></Icon_20>
                        </Button_Icon_Blue_Auto_40>
                    </Tooltip>
                    <Tooltip title='Cerrar sesión' placement='top'>
                        <Button_Icon_Red_Auto_40
                            onClick={() => onAction()}   
                        >
                            <Icon_20><ImExit/></Icon_20>
                        </Button_Icon_Red_Auto_40>
                    </Tooltip>
                </Container_Modal_Form_Button>
            )}
        </>
    );
};
export const Modal_Form_Button_Verification = () => {
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    const [isVerificationBlock] = useContext(VerificationBlockContext);
    // constantes con el valor de los hook
    const handleVerificationBlock = HandleVerificationBlock();
    // Estructura del componente
    return (
        <>
            {isActionBlock || isVerificationBlock ? (
                <Container_Modal_Form_Button>
                    <Button_Icon_Blue_Auto_50
                        disabled
                    >
                        <Icon_20><FaUserCheck/></Icon_20>
                    </Button_Icon_Blue_Auto_50>
                </Container_Modal_Form_Button>
            ):(
                <Container_Modal_Form_Button>
                    <Tooltip title='Verificar' placement='top'>
                        <Button_Icon_Blue_Auto_50
                            onClick={() => handleVerificationBlock()}  
                        >
                            <Icon_20><FaUserCheck/></Icon_20>
                        </Button_Icon_Blue_Auto_50>
                    </Tooltip>
                </Container_Modal_Form_Button>
            )}
        </>
    );
};
export const Modal_Form_Button_Add = ({ onCancel = () => {}, onAction = () => {} }) => {
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    // Estructura del componente
    return (
        <>
            {isActionBlock ? (
                <Container_Modal_Form_Button>
                    <Button_Icon_Blue_Auto_40
                        disabled
                    >
                        <Icon_20><MdCancel/></Icon_20>
                    </Button_Icon_Blue_Auto_40>
                    <Button_Icon_Green_Auto_40
                        disabled  
                    >
                        <Icon_20><IoIosAddCircle/></Icon_20>
                    </Button_Icon_Green_Auto_40>
                </Container_Modal_Form_Button>
            ):(
                <Container_Modal_Form_Button>
                    <Tooltip title='Cancelar' placement='top'>
                        <Button_Icon_Blue_Auto_40
                            onClick={() => onCancel()}  
                        >
                            <Icon_20><MdCancel/></Icon_20>
                        </Button_Icon_Blue_Auto_40>
                    </Tooltip>
                    <Tooltip title='Agregar' placement='top'>
                        <Button_Icon_Green_Auto_40
                            onClick={() => onAction()}   
                        >
                            <Icon_20><IoIosAddCircle/></Icon_20>
                        </Button_Icon_Green_Auto_40>
                    </Tooltip>
                </Container_Modal_Form_Button>
            )}
        </>
    );
};
export const Modal_Form_Button_Edit = ({ onCancel = () => {}, onAction = () => {} }) => {
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    // Estructura del componente
    return (
        <>
            {isActionBlock ? (
                <Container_Modal_Form_Button>
                    <Button_Icon_Red_Auto_40
                        disabled
                    >
                        <Icon_20><MdCancel/></Icon_20>
                    </Button_Icon_Red_Auto_40>
                    <Button_Icon_Blue_Auto_40
                        disabled  
                    >
                        <Icon_20><MdEdit/></Icon_20>
                    </Button_Icon_Blue_Auto_40>
                </Container_Modal_Form_Button>
            ):(
                <Container_Modal_Form_Button>
                    <Tooltip title='Cancelar' placement='top'>
                        <Button_Icon_Red_Auto_40
                            onClick={() => onCancel()}  
                        >
                            <Icon_20><MdCancel/></Icon_20>
                        </Button_Icon_Red_Auto_40>
                    </Tooltip>
                    <Tooltip title='Editar' placement='top'>
                        <Button_Icon_Blue_Auto_40
                            onClick={() => onAction()}   
                        >
                            <Icon_20><MdEdit/></Icon_20>
                        </Button_Icon_Blue_Auto_40>
                    </Tooltip>
                </Container_Modal_Form_Button>
            )}
        </>
    );
};
export const Modal_Form_Button_Delete = ({ onCancel = () => {}, onAction = () => {} }) => {
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    const [isFunctionBlock] = useContext(FunctionBlockContext);
    // Estructura del componente
    return (
        <>
            {isActionBlock ? (
                <Container_Modal_Form_Button>
                    <Button_Icon_Blue_Auto_40
                        disabled
                    >
                        <Icon_20><MdCancel/></Icon_20>
                    </Button_Icon_Blue_Auto_40>
                    <Button_Icon_Red_Auto_40
                        disabled  
                    >
                        <Icon_20><MdDelete/></Icon_20>
                    </Button_Icon_Red_Auto_40>
                </Container_Modal_Form_Button>
            ):(
                <Container_Modal_Form_Button>
                    <Tooltip title='Cancelar' placement='top'>
                        <Button_Icon_Blue_Auto_40
                            onClick={() => onCancel()}  
                        >
                            <Icon_20><MdCancel/></Icon_20>
                        </Button_Icon_Blue_Auto_40>
                    </Tooltip>
                    {isFunctionBlock ? (
                        <Tooltip title='Eliminar' placement='top'>
                            <Button_Icon_Red_Auto_40
                                onClick={() => onAction()}   
                            >
                                <Icon_20><MdDelete/></Icon_20>
                            </Button_Icon_Red_Auto_40>
                        </Tooltip>
                    ):(
                        <Button_Icon_Red_Auto_40 disabled>
                            <Icon_20><MdDelete/></Icon_20>
                        </Button_Icon_Red_Auto_40>
                    )}
                </Container_Modal_Form_Button>
            )}
        </>
    );
};
export const Modal_Form_Button_Enable_Verification = ({ onCancel = () => {}, onAction = () => {},Icon = null }) => {
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    const [isFunctionBlock] = useContext(FunctionBlockContext);
    // Estructura del componente
    return (
        <>
            {isActionBlock ? (
                <Container_Modal_Form_Button>
                    <Button_Icon_Blue_Auto_40
                        disabled
                    >
                        <Icon_20><MdCancel/></Icon_20>
                    </Button_Icon_Blue_Auto_40>
                    <Button_Icon_Green_Auto_40
                        disabled  
                    >
                        <Icon_20>{Icon}</Icon_20>
                    </Button_Icon_Green_Auto_40>
                </Container_Modal_Form_Button>
            ):(
                <Container_Modal_Form_Button>
                    <Tooltip title='Cancelar' placement='top'>
                        <Button_Icon_Blue_Auto_40
                            onClick={() => onCancel()}  
                        >
                            <Icon_20><MdCancel/></Icon_20>
                        </Button_Icon_Blue_Auto_40>
                    </Tooltip>
                    {isFunctionBlock ? (
                        <Tooltip title='Habilitar' placement='top'>
                            <Button_Icon_Green_Auto_40
                                onClick={() => onAction()}   
                            >
                                <Icon_20>{Icon}</Icon_20>
                            </Button_Icon_Green_Auto_40>
                        </Tooltip>
                    ):(
                        <Button_Icon_Green_Auto_40 disabled>
                            <Icon_20>{Icon}</Icon_20>
                        </Button_Icon_Green_Auto_40>
                    )}
                </Container_Modal_Form_Button>
            )}
        </>
    );
};
export const Modal_Form_Button_Disable_Verification = ({ onCancel = () => {}, onAction = () => {},Icon = null }) => {
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    const [isFunctionBlock] = useContext(FunctionBlockContext);
    // Estructura del componente
    return (
        <>
            {isActionBlock ? (
                <Container_Modal_Form_Button>
                    <Button_Icon_Blue_Auto_40
                        disabled
                    >
                        <Icon_20><MdCancel/></Icon_20>
                    </Button_Icon_Blue_Auto_40>
                    <Button_Icon_Red_Auto_40
                        disabled  
                    >
                        <Icon_20>{Icon}</Icon_20>
                    </Button_Icon_Red_Auto_40>
                </Container_Modal_Form_Button>
            ):(
                <Container_Modal_Form_Button>
                    <Tooltip title='Cancelar' placement='top'>
                        <Button_Icon_Blue_Auto_40
                            onClick={() => onCancel()}  
                        >
                            <Icon_20><MdCancel/></Icon_20>
                        </Button_Icon_Blue_Auto_40>
                    </Tooltip>
                    {isFunctionBlock ? (
                        <Tooltip title='Deshabilitar' placement='top'>
                            <Button_Icon_Red_Auto_40
                                onClick={() => onAction()}   
                            >
                                <Icon_20>{Icon}</Icon_20>
                            </Button_Icon_Red_Auto_40>
                        </Tooltip>
                    ):(
                        <Button_Icon_Red_Auto_40 disabled>
                            <Icon_20>{Icon}</Icon_20>
                        </Button_Icon_Red_Auto_40>
                    )}
                </Container_Modal_Form_Button>
            )}
        </>
    );
};
export const Modal_Form_Button_View = ({ onCancel = () => {}, onAction = () => {} }) => {
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    const [isFunctionBlock] = useContext(FunctionBlockContext);
    // Estructura del componente
    return (
        <>
            {isActionBlock ? (
                <Container_Modal_Form_Button>
                    <Button_Icon_Blue_Auto_40
                        disabled
                    >
                        <Icon_20><MdCancel/></Icon_20>
                    </Button_Icon_Blue_Auto_40>
                    <Button_Icon_Green_Auto_40
                        disabled  
                    >
                        <Icon_20><FaEye/></Icon_20>
                    </Button_Icon_Green_Auto_40>
                </Container_Modal_Form_Button>
            ):(
                <Container_Modal_Form_Button>
                    <Tooltip title='Cancelar' placement='top'>
                        <Button_Icon_Blue_Auto_40
                            onClick={() => onCancel()}  
                        >
                            <Icon_20><MdCancel/></Icon_20>
                        </Button_Icon_Blue_Auto_40>
                    </Tooltip>
                    {isFunctionBlock ? (
                        <Tooltip title='Ver' placement='top'>
                            <Button_Icon_Green_Auto_40
                                onClick={() => onAction()}   
                            >
                                <Icon_20><FaEye/></Icon_20>
                            </Button_Icon_Green_Auto_40>
                        </Tooltip>
                    ):(
                        <Button_Icon_Green_Auto_40 disabled>
                            <Icon_20><FaEye/></Icon_20>
                        </Button_Icon_Green_Auto_40>
                    )}
                </Container_Modal_Form_Button>
            )}
        </>
    );
};
// Componetes de los botones de ordenamiento y busqueda
export const Searchbar_Button_Search = () => {
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    // Constantes con la funcionalidad de los hooks
    const resetFilteredSearch = ResetFilteredSearch();
    // Estructura del componente
    return (
        <>
            {isActionBlock ? (
                <>
                    <Icon_Button_White_20 disabled>
                        <IoSearch/>
                    </Icon_Button_White_20>
                </>
            ):(
                <>
                    <Tooltip title='Restablecer filtros de búsqueda' placement="top">
                        <Icon_Button_White_20 
                            onClick={() => resetFilteredSearch()}
                        >
                            <IoSearch/>
                        </Icon_Button_White_20>
                    </Tooltip>
                </>
            )}
        </>
    );
};
export const Searchbar_Button_Order = () => {
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    // Constantes con la funcionalidad de los hooks
    const resetFilteredOrder = ResetFilteredOrder();
    // Estructura del componente
    return (
        <>
            {isActionBlock ? (
                                <>
                                    <Icon_Button_White_20 disabled>
                                        <LuArrowDownUp/>
                                    </Icon_Button_White_20>
                                </>
            ):(
                <>
                    <Tooltip title='Restablecer filtros de ordenamiento' placement="top">
                        <Icon_Button_White_20
                            onClick={() => resetFilteredOrder()}
                        >
                            <LuArrowDownUp/>
                        </Icon_Button_White_20>
                    </Tooltip>
                </>
            )}
        </>
    );
};
export const Searchbar_Button_Search_Order = () => {
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    // Constantes con la funcionalidad de los hooks
    const resetFilteredSearch = ResetFilteredSearch();
    const resetFilteredOrder = ResetFilteredOrder();
    // Estructura del componente
    return (
        <>
            {isActionBlock ? (
                <>
                    <Icon_Button_White_20 disabled>
                        <IoSearch/>
                    </Icon_Button_White_20>
                    <Icon_Button_White_20 disabled>
                        <LuArrowDownUp/>
                    </Icon_Button_White_20>
                </>
            ):(
                <>
                    <Tooltip title='Restablecer filtros de búsqueda' placement="top">
                        <Icon_Button_White_20 
                            onClick={() => resetFilteredSearch()}
                        >
                            <IoSearch/>
                        </Icon_Button_White_20>
                    </Tooltip>
                    <Tooltip title='Restablecer filtros de ordenamiento' placement="top">
                        <Icon_Button_White_20
                            onClick={() => resetFilteredOrder()}
                        >
                            <LuArrowDownUp/>
                        </Icon_Button_White_20>
                    </Tooltip>
                </>
            )}
        </>
    );
};