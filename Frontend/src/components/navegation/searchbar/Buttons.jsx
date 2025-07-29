//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ActionBlockContext } from "../../../contexts/VariablesProvider";
import { RefButtonAddContext,RefButtonEditContext,RefButtonDeleteContext,RefButtonDisableContext,RefButtonEnableContext,RefButtonViewContext,RefButtonDetailContext } from "../../../contexts/RefsProvider";
import { SelectedOptionSearchContext,SelectedOptionOrderPlusContext } from "../../../contexts/SelectedesProvider";
// Hooks personalizados
import { ResetFilteredOrder,ResetFilteredSearch } from "../../../hooks/Texts";
//__________ICONOS__________
// Iconos para un crud
import { IoIosAddCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
// Iconos para metodos de ordenamiento y busqueda
import { IoSearch } from "react-icons/io5";
import { LuArrowDownUp } from "react-icons/lu";
//__________ICONOS__________
// Estilos personalizados
import { Button_Icon_Green_60,Button_Icon_Blue_60,Button_Icon_Red_60,Button_Icon_Orange_60,Button_Text_Blue_Auto } from "../../styled/Buttons";
import { Icon_16,Icon_Button_White_20 } from "../../styled/Icons";
//____________IMPORT/EXPORT____________

// Botonoes de funcionalidades
export const Search_Bar_Button_Add = ({
    route = '',
    onHandleModalView = () => {},
    row = null,
    title = 'Agregar',
    icon = <IoIosAddCircle/>,
    mode = false,
}) => {
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    const isButtonAdd = useContext(RefButtonAddContext);
    // constantes con el valor de los hooks
    const navigate = useNavigate();
    // Estructura del componente
    return(
        <>
            {isActionBlock ? (
                <>
                    <Button_Icon_Green_60 disabled>
                        <Icon_16>{icon}</Icon_16>
                    </Button_Icon_Green_60>
                </>
            ):(
                row !== null ? (
                    mode ? (
                        <Tooltip title={title} placement="top">
                            <Button_Icon_Green_60
                                ref={isButtonAdd}
                                onClick={() => {
                                    onHandleModalView();
                                    navigate(route,{ replace: true });
                                }}
                            >
                                <Icon_16>{icon}</Icon_16>
                            </Button_Icon_Green_60>
                        </Tooltip>
                    ):(
                        <Button_Icon_Green_60 disabled>
                            <Icon_16>{icon}</Icon_16>
                        </Button_Icon_Green_60> 
                    )
                ):(
                    mode ? (
                        <Button_Icon_Green_60 disabled>
                            <Icon_16>{icon}</Icon_16>
                        </Button_Icon_Green_60> 
                    ):(
                        <Tooltip title={title} placement="top">
                            <Button_Icon_Green_60
                                onClick={() => {
                                    onHandleModalView();
                                    navigate(route,{ replace: true });
                                }}
                            >
                                <Icon_16>{icon}</Icon_16>
                            </Button_Icon_Green_60>
                        </Tooltip>
                    )
                )
            )}
        </>
    );
}
export const Search_Bar_Button_Edit = ({
    route = '',
    onHandleModalView = () => {},
    row = null,
    title = 'Editar',
    icon = <MdEdit/>,
}) => {
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    const isButtonEdit = useContext(RefButtonEditContext);
    // constantes con el valor de los hooks
    const navigate = useNavigate();
    // Estructura del componente
    return(
        <>
            {isActionBlock ? (
                <>
                    <Button_Icon_Blue_60 disabled>
                        <Icon_16>{icon}</Icon_16>
                    </Button_Icon_Blue_60>
                </>
            ):(
                row !== null ? (
                    <>
                        <Tooltip title={title} placement="top">
                            <Button_Icon_Blue_60 ref={isButtonEdit}
                                onClick={() => {
                                    onHandleModalView();
                                    navigate(route,{ replace: true });
                                }}
                            >
                                <Icon_16>{icon}</Icon_16>
                            </Button_Icon_Blue_60>
                        </Tooltip>
                    </>
                ):(
                    <>
                        <Button_Icon_Blue_60 disabled>
                            <Icon_16>{icon}</Icon_16>
                        </Button_Icon_Blue_60>
                    </>
                )
            )}
        </>
    );
}
export const Search_Bar_Button_Delete = ({
    route = '',
    onHandleModalView = () => {},
    row = null,
    title = 'Eliminar',
    icon = <MdDelete/>,
}) => {
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    const isButtonDelete = useContext(RefButtonDeleteContext);
    // constantes con el valor de los hooks
    const navigate = useNavigate();
    // Estructura del componente
    return(
        <>
            {isActionBlock ? (
                <>
                    <Button_Icon_Red_60 disabled>
                        <Icon_16>{icon}</Icon_16>
                    </Button_Icon_Red_60>
                </>
            ):(
                row !== null ? (
                    <>
                        <Tooltip title={title} placement="top">
                            <Button_Icon_Red_60 ref={isButtonDelete}
                                onClick={() => {
                                    onHandleModalView();
                                    navigate(route,{ replace: true });
                                }}
                            >
                                <Icon_16>{icon}</Icon_16>
                            </Button_Icon_Red_60>
                        </Tooltip>
                    </>
                ):(
                    <>
                        <Button_Icon_Red_60 disabled>
                            <Icon_16>{icon}</Icon_16>
                        </Button_Icon_Red_60>
                    </>
                )
            )}
        </>
    );
}
export const Search_Bar_Button_Enable = ({
    route = '',
    onHandleModalView = () => {},
    icon = null,
    icon_true = null,
    icon_false = null,
    row = null,
    condition = false,
    title_true = '',
    title_false = '',
}) => {
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    const isButtonEnable = useContext(RefButtonEnableContext);
    const isButtonDisable = useContext(RefButtonDisableContext);
    // constantes con el valor de los hooks
    const navigate = useNavigate();
    // Estructura del componente
    return(
        <>
            {isActionBlock ? (
                <>
                    <Button_Icon_Red_60 disabled>
                        <Icon_16>{icon}</Icon_16>
                    </Button_Icon_Red_60>
                </>
            ):(
                row !== null ? (
                    <Tooltip title={condition ? title_true : title_false} placement="top">
                        {condition ? (
                            <Button_Icon_Red_60 
                                ref={isButtonDisable}
                                onClick={() => {
                                    onHandleModalView();
                                    navigate(route,{ replace: true });
                                }}
                            >
                                <Icon_16>{icon_true}</Icon_16>
                            </Button_Icon_Red_60>
                        ):(
                            <Button_Icon_Green_60 
                                ref={isButtonEnable}
                                onClick={() => {
                                    onHandleModalView();
                                    navigate(route,{ replace: true });
                                }}
                            >
                                <Icon_16>{icon_false}</Icon_16>
                            </Button_Icon_Green_60>
                        )}
                    </Tooltip>
                ):(
                    <Button_Icon_Red_60 disabled>
                        <Icon_16>{icon}</Icon_16>
                    </Button_Icon_Red_60>
                )
            )}
        </>
    );
}
export const Search_Bar_Button_View = ({
    route = '',
    onHandleAction_True = () => {},
    onHandleAction_False = () => {},
    title_true = '',
    title_false = '',
    icon_true = null,
    icon_false = null,
    condition = false,
}) => {
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    const isButtonView = useContext(RefButtonViewContext);
    // constantes con el valor de los hooks
    const navigate = useNavigate();
    // Estructura del componente
    return(
        <>
            {isActionBlock ? (
                <>
                    <Button_Icon_Green_60 disabled>
                        <Icon_16>{condition ? {icon_true} : {icon_false}}</Icon_16>
                    </Button_Icon_Green_60>
                </>
            ):(
                <Tooltip title={condition ? title_true : title_false} placement="top">
                    {condition ? (
                            <Button_Icon_Red_60 
                                onClick={() => onHandleAction_True()}
                            >
                                <Icon_16>{icon_true}</Icon_16>
                            </Button_Icon_Red_60>  
                    ):(
                        <Button_Icon_Green_60 
                            onClick={() => {
                                onHandleAction_False();
                                navigate(route,{ replace: true });
                            }}
                        >
                            <Icon_16>{icon_false}</Icon_16>
                        </Button_Icon_Green_60>
                    )}
                </Tooltip> 
            )}
        </>
    );
}
export const Search_Bar_Button_Detail = ({
    route = '',
    onHandleModalView = () => {},
    row = null,
    title = 'Detalles',
    icon = null,
}) => {
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    const isButtonDetail = useContext(RefButtonDetailContext);
    // constantes con el valor de los hooks
    const navigate = useNavigate();
    // Estructura del componente
    return(
        <>
            {isActionBlock ? (
                <>
                    <Button_Icon_Orange_60 disabled>
                        <Icon_16>{icon}</Icon_16>
                    </Button_Icon_Orange_60>
                </>
            ):(
                row !== null ? (
                    <>
                        <Tooltip title={title} placement="top">
                            <Button_Icon_Orange_60 
                                ref={isButtonDetail}
                                onClick={() => {
                                    onHandleModalView();
                                    navigate(route,{ replace: true });
                                }}
                            >
                                <Icon_16>{icon}</Icon_16>
                            </Button_Icon_Orange_60>
                        </Tooltip>
                    </>
                ):(
                    <>
                        <Button_Icon_Orange_60 disabled>
                            <Icon_16>{icon}</Icon_16>
                        </Button_Icon_Orange_60>
                    </>
                )
            )}
        </>
    );
}
// Botones de busqueda y ordenamiento
export const Search_Bar_Button_Search = ({options = []}) => {
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    const [isSelectedOptionSearch,setIsSelectedOptionSearch] = useContext(SelectedOptionSearchContext);
    // Estructura del componente
    return(
        <>
            {options?.map((option,index) => (
                <Button_Text_Blue_Auto
                    key={index}
                    disabled={isActionBlock}
                    onClick={() => setIsSelectedOptionSearch(option)}
                    style={{
                        backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : isSelectedOptionSearch === option ? 'rgb(12, 54, 109)' : '',
                    }}
                >
                    {option}
                </Button_Text_Blue_Auto>
            ))}
        </>
    );
}
export const Search_Bar_Button_Order = ({options = []}) => {
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    const [isSelectedOptionOrderPlus,setIsSelectedOptionOrderPlus] = useContext(SelectedOptionOrderPlusContext);
    // Estructura del componente
    return(
        <>
            {options?.map((option,index) => (
                <Button_Text_Blue_Auto
                    key={index}
                    disabled={isActionBlock}
                    onClick={() => setIsSelectedOptionOrderPlus(option)}
                    style={{
                        backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : isSelectedOptionOrderPlus === option ? 'rgb(12, 54, 109)' : '',
                    }}
                >
                    {option}
                </Button_Text_Blue_Auto>
            ))}
        </>
    );
}
export const Search_Bar_Icon_Button_Search = () => {
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
export const Search_Bar_Icon_Button_Order = () => {
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
export const Search_Bar_Icon_Button_Search_Order = () => {
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