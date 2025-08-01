//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react"
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ActionBlockContext } from "../../contexts/VariablesProvider";
//__________ICONOS__________
// Iconos de la paginación
import { GrNext,GrPrevious } from "react-icons/gr";
//__________ICONOS__________
// Estilos personalizados
import { Button_Icon_Blue_200 } from "../styled/Buttons";
import { Table_Container_Pagination,Table_Container_Data,Table_Container_Data_Top } from "../styled/Tables";
import { Icon_20 } from "../styled/Icons";
import { Text_Span_16_Center_Black,Text_Fade_Title_20_Black } from "../styled/Text";
//____________IMPORT/EXPORT____________

export const Table_Pagination = ({
    currentRecords = [],
    currentPage = 0,
    onPrevPage = () => {},
    onNextPage = () => {},
    totalPage = 0,
}) => {
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    // Estructura del componente
    return(
        <>
            {currentRecords.length !== 0 ? (
                <>
                    <Table_Container_Pagination>
                        {isActionBlock || currentPage === 1 ? (
                            <Button_Icon_Blue_200 disabled>
                                <Icon_20><GrPrevious/></Icon_20>
                            </Button_Icon_Blue_200>
                        ):(
                            <Tooltip title='Página anterior' placement="top">
                                <Button_Icon_Blue_200
                                    onClick={() => onPrevPage()}
                                >
                                    <Icon_20><GrPrevious/></Icon_20>
                                </Button_Icon_Blue_200>
                            </Tooltip>
                        )}
                        <Text_Span_16_Center_Black>Página {currentPage} de {totalPage}</Text_Span_16_Center_Black>
                        {isActionBlock || currentPage === totalPage || totalPage === 0 ? (
                            <Button_Icon_Blue_200 disabled>
                                <Icon_20><GrNext/></Icon_20>
                            </Button_Icon_Blue_200>
                        ):(
                            <Tooltip title='Página siguiente' placement="top">
                                <Button_Icon_Blue_200
                                    onClick={() => onNextPage()}
                                >
                                    <Icon_20><GrNext/></Icon_20>
                                </Button_Icon_Blue_200>
                            </Tooltip>
                        )}
                    </Table_Container_Pagination>  
                </>
            ):(
                <>
                    <Table_Container_Data>
                        <Text_Fade_Title_20_Black>¡No hay datos disponibles!</Text_Fade_Title_20_Black>
                    </Table_Container_Data>
                </>
            )}
        </>
    );
}
export const Table_Pagination_Top = ({
    currentRecords = [],
    currentPage = 0,
    onPrevPage = () => {},
    onNextPage = () => {},
    totalPage = 0,
}) => {
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    // Estructura del componente
    return(
        <>
            {currentRecords.length !== 0 ? (
                <>
                    <Table_Container_Pagination>
                        {isActionBlock || currentPage === 1 ? (
                            <Button_Icon_Blue_200 disabled>
                                <Icon_20><GrPrevious/></Icon_20>
                            </Button_Icon_Blue_200>
                        ):(
                            <Tooltip title='Página anterior' placement="top">
                                <Button_Icon_Blue_200
                                    onClick={() => onPrevPage()}
                                >
                                    <Icon_20><GrPrevious/></Icon_20>
                                </Button_Icon_Blue_200>
                            </Tooltip>
                        )}
                        <Text_Span_16_Center_Black>Página {currentPage} de {totalPage}</Text_Span_16_Center_Black>
                        {isActionBlock || currentPage === totalPage || totalPage === 0 ? (
                            <Button_Icon_Blue_200 disabled>
                                <Icon_20><GrNext/></Icon_20>
                            </Button_Icon_Blue_200>
                        ):(
                            <Tooltip title='Página siguiente' placement="top">
                                <Button_Icon_Blue_200
                                    onClick={() => onNextPage()}
                                >
                                    <Icon_20><GrNext/></Icon_20>
                                </Button_Icon_Blue_200>
                            </Tooltip>
                        )}
                    </Table_Container_Pagination>  
                </>
            ):(
                <>
                    <Table_Container_Data_Top>
                        <Text_Fade_Title_20_Black>¡No hay datos disponibles!</Text_Fade_Title_20_Black>
                    </Table_Container_Data_Top>
                </>
            )}
        </>
    );
}