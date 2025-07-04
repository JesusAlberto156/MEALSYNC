//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Componentes de React externos
import { Tooltip } from "@mui/material"
// Contextos
import { SelectedRowContext,SelectedOptionOrderDirectionContext,SelectedOptionOrderContext,SelectedOptionOrderPlusContext,SelectedOptionOrderPlusUltraContext } from "../../../contexts/SelectedesProvider"
import { ThemeModeContext } from "../../../contexts/ViewsProvider"
import { SupplyTypesContext,SupplyCategoriesContext } from "../../../contexts/SuppliersProvider"
// Hooks personalizados
import { TableActionsPurchases } from "../../../hooks/warehouse/Tables"
import { Dates } from "../../../hooks/Dates"
//__________ICONOS__________
// Iconos de las tablas
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaSortNumericUp } from "react-icons/fa";
import { FaSortNumericUpAlt } from "react-icons/fa";
import { CgArrowsV } from "react-icons/cg";
// Iconos de la paginación
import { GrNext,GrPrevious } from "react-icons/gr";
//__________ICONOS__________
// Estilos personalizados
import { Container_Row_90_Center } from "../../styled/Containers";
import { Table,Thead,Th,Tbody,Td,TContainer_Center } from "../../styled/Tables";
import { Button_Icon_Blue_180 } from "../../styled/Buttons";
import { Text_Span_16_Center_Black,Text_Fade_Title_32_Black } from "../../styled/Text";
import { Icon_White_18,Icon_Button_Black_14 } from "../../styled/Icons";
//____________IMPORT/EXPORT____________

// Tabla de los usuarios
export default function Table_Purchases(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const [isSupplyTypes] = useContext(SupplyTypesContext); 
    const [isSupplyCategories] = useContext(SupplyCategoriesContext);
    const [isSelectedOptionOrderPlus] = useContext(SelectedOptionOrderPlusContext);
    const [isSelectedOptionOrderPlusUltra] = useContext(SelectedOptionOrderPlusUltraContext);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Purchases");
    
            const isClickInsideTable = table && table.contains(event.target);
            
            if (!isClickInsideTable) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    },[]);
    // Constantes con la funcionalidad de los hooks
    const { handleRowClick,nextPagePurchases,prevPage,currentRecordsPurchases,currentPage,totalPagesPurchases,ToggleOrder,ToggleOrderDirection } = TableActionsPurchases();
    const { getDate } = Dates();
    // Estructura del componente
    return(
        <>
            <Table id="Table-Purchases">
                <Thead ThemeMode={themeMode}>
                    <tr>
                        <Th>
                            <TContainer_Center>
                                {isSelectedOptionOrderPlus === 'Categorías' ? (
                                    <>
                                        <Icon_Button_Black_14 onClick={() => {
                                                ToggleOrder('Categorías')
                                                ToggleOrderDirection()
                                            }}
                                        >
                                            {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Categorías' ? <FaSortAlphaDown/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Categorías' ? <FaSortAlphaDownAlt/> : <CgArrowsV/>} Categoría
                                        </Icon_Button_Black_14>
                                    </>
                                ):(
                                    <>
                                        {isSelectedOptionOrderPlus === 'Tipos de Insumo' ? (
                                            <>
                                                <Icon_Button_Black_14 onClick={() => {
                                                        ToggleOrder('Tipos de Insumo')
                                                        ToggleOrderDirection()
                                                    }}
                                                >
                                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Tipos de Insumo' ? <FaSortAlphaDown/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Tipos de Insumo' ? <FaSortAlphaDownAlt/> : <CgArrowsV/>} Tipo de Insumo
                                                </Icon_Button_Black_14>
                                            </>
                                        ):(
                                            <>Desconocido</>
                                        )}
                                    </>
                                )}
                            </TContainer_Center>
                        </Th>
                        {isSelectedOptionOrderPlusUltra === 'General'? (
                            <>
                                <Th>
                                    <TContainer_Center>
                                        <Icon_Button_Black_14 onClick={() => {
                                                ToggleOrder('Fecha')
                                                ToggleOrderDirection()
                                            }}
                                        >
                                            {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Fecha' ? <FaLongArrowAltUp/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Fecha' ? <FaLongArrowAltDown/> : <CgArrowsV/>} Fecha
                                        </Icon_Button_Black_14>
                                    </TContainer_Center>
                                </Th>  
                            </>
                        ):(
                            <></>
                        )}
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Cantidad')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Cantidad' ? <FaSortNumericUp/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Cantidad' ? <FaSortNumericUpAlt/> : <CgArrowsV/>} Cantidad (kg/Lt)
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Total')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Total' ? <FaSortNumericUp/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Total' ? <FaSortNumericUpAlt/> : <CgArrowsV/>} Total
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                    </tr>
                </Thead>
                <Tbody ThemeMode={themeMode}>
                    {currentRecordsPurchases.map((warehouse) => (
                        <tr 
                            key={warehouse.idalmacen}
                            onClick={() => handleRowClick(warehouse)}
                            style={{
                                backgroundColor:  isSelectedRow === warehouse ? 'rgba(255, 255, 255, 0.7)' : 'transparent',
                                cursor: 'pointer',
                                transition: 'background-color 0.5s ease',
                            }}
                        >
                            <Td ThemeMode={themeMode}>{isSelectedOptionOrderPlus === 'Categorías' ? isSupplyCategories.find(category => category.idcategoria === warehouse.idcategoria)?.nombre || 'Desconocida...' : isSelectedOptionOrderPlus === 'Tipos de Insumo'  ? isSupplyTypes.find(type => type.idtipo === warehouse.idtipo)?.tipo || 'Desconocido...' : ''}</Td>
                            {isSelectedOptionOrderPlusUltra === 'General'? (
                                <>
                                    <Td ThemeMode={themeMode}>{isSelectedOptionOrderPlus === 'Categorías' || isSelectedOptionOrderPlus === 'Tipos de Insumo' ? getDate(warehouse.fecha) || 'Desconocida...' : ''}</Td>
                                </>
                            ):(
                                <></>
                            )}
                            <Td ThemeMode={themeMode}>{isSelectedOptionOrderPlus === 'Categorías' || isSelectedOptionOrderPlus === 'Tipos de Insumo' ? warehouse.cantidadreal : ''}</Td>
                            <Td ThemeMode={themeMode}><MdOutlineAttachMoney/> {isSelectedOptionOrderPlus === 'Categorías' || isSelectedOptionOrderPlus === 'Tipos de Insumo' ? warehouse.precio : ''} MXN</Td>
                        </tr>
                    ))}
                </Tbody>
            </Table>
            {currentRecordsPurchases.length !== 0 ? (
                <>
                    <Container_Row_90_Center>
                        <Tooltip title='Página anterior' placement="top">
                            <Button_Icon_Blue_180 ThemeMode={themeMode} className={currentPage === 1 ? 'roll-out-button-left' : 'roll-in-button-left'}
                                onClick={prevPage}>
                                <Icon_White_18><GrPrevious/></Icon_White_18>
                            </Button_Icon_Blue_180>
                        </Tooltip>
                        <Text_Span_16_Center_Black ThemeMode={themeMode}>Página {currentPage} de {totalPagesPurchases}</Text_Span_16_Center_Black>
                        <Tooltip title='Página siguiente' placement="top">
                            <Button_Icon_Blue_180 ThemeMode={themeMode} className={currentPage === totalPagesPurchases || totalPagesPurchases === 0 ? 'roll-out-button-left' : 'roll-in-button-left'}
                                onClick={nextPagePurchases}>
                                <Icon_White_18><GrNext/></Icon_White_18>
                            </Button_Icon_Blue_180>
                        </Tooltip>
                    </Container_Row_90_Center>
                </>
            ):(
                <>
                    <Container_Row_90_Center>
                        <Text_Fade_Title_32_Black ThemeMode={themeMode}>No hay datos disponibles</Text_Fade_Title_32_Black>
                    </Container_Row_90_Center>
                </>
            )}
        </>
    );
}