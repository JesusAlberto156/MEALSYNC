//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Componentes de React externos
import { Tooltip } from "@mui/material"
// Contextos
import { SelectedRowContext,SelectedOptionOrderDirectionContext,SelectedOptionOrderContext } from "../../../contexts/SelectedesProvider"
import { ThemeModeContext } from "../../../contexts/ViewsProvider"
import { TextFieldsSupplyTypesContext } from "../../../contexts/FormsProvider"
import { RefSupplyTypesContext } from "../../../contexts/RefsProvider"
import { CountSupplyTypesContext,SupplyCategoriesContext } from "../../../contexts/SuppliersProvider"
// Hooks personalizados
import { ResetTextFieldsUser } from "../../../hooks/users/Texts"
import { ResetTextFieldsSupplyType } from "../../../hooks/suppliers/Texts"
import { TableActionsSupplyTypes } from "../../../hooks/suppliers/Tables"
//__________ICONOS__________
// Iconos de las tablas
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
// Iconos de la paginación
import { GrNext,GrPrevious } from "react-icons/gr";
//__________ICONOS__________
// Estilos personalizados
import { Container_Row_90_Center } from "../../styled/Containers";
import { Table,Thead,Th,Tbody,Td,TContainer_Center } from "../../styled/Tables";
import { Button_Icon_Blue_180 } from "../../styled/Buttons";
import { Text_A_16_Center,Text_Fade_A_30_Center } from "../../styled/Text";
import { Icon_White_18,Icon_Button_Black_14 } from "../../styled/Icons";
//____________IMPORT/EXPORT____________

// Tabla de los usuarios
export default function Table_Supply_Types(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const {Modal_Supply_Types,Form_Supply_Types,Button_Edit_Supply_Types,Button_Add_Supply_Types,Button_Delete_Supply_Types,Button_Count_Supply_Types} = useContext(RefSupplyTypesContext);
    const [isTextFieldsSupplyType,setIsTextFieldsSupplyType] = useContext(TextFieldsSupplyTypesContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const [isCountSupplyTypes] = useContext(CountSupplyTypesContext);
    const [isSupplyCategories] = useContext(SupplyCategoriesContext); 
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Supply-Types");
    
            const isClickInsideTable = table && table.contains(event.target);
            const isClickInsideModal = Modal_Supply_Types?.current?.contains(event.target);
            const isClickInsideForm = Form_Supply_Types?.current?.contains(event.target);
            const isClickInsideEdit = Button_Edit_Supply_Types?.current?.contains(event.target);
            const isClickInsideAdd = Button_Add_Supply_Types?.current?.contains(event.target);
            const isClickInsideDelete = Button_Delete_Supply_Types?.current?.contains(event.target);
            const isClickInsideDetail = Button_Count_Supply_Types?.current?.contains(event.target);

            if (!isClickInsideTable && !isClickInsideModal && !isClickInsideForm && !isClickInsideEdit && !isClickInsideAdd && !isClickInsideDelete && !isClickInsideDetail) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    },[Modal_Supply_Types,Form_Supply_Types,Button_Edit_Supply_Types,Button_Add_Supply_Types,Button_Delete_Supply_Types,Button_Count_Supply_Types]);
    // UseEfect para pasar el valor del renglon seleccionado a los input
    useEffect(() => {
        if(isSelectedRow !== null){
            const cantidadesFiltradas = isCountSupplyTypes
            .filter(count => count.idtipo === isSelectedRow.idtipo)
            .flatMap(item =>
                (item.cantidades || []).map(c => ({ cantidad: c.cantidad }))
            );

            setIsTextFieldsSupplyType(prev => ({
            ...prev,
                idtipo: isSelectedRow.idtipo,
                tipo: isSelectedRow.tipo,
                descripcion: isSelectedRow.descripcion,
                unidad: isSelectedRow.unidad,
                idcategoria: isSelectedRow.idcategoria,
                cantidades: cantidadesFiltradas.length > 0
                    ? cantidadesFiltradas
                    : [{ cantidad: 0 }]
            }));
        }else{
            resetTextFieldsSupplyType();
            resetTextFieldsUser();
        }
    },[isSelectedRow])
    // Constantes con la funcionalidad de los hooks
    const { handleRowClick,nextPageSupplyTypes,prevPage,currentRecordsSupplyTypes,currentPage,totalPagesSupplyTypes,ToggleOrder,ToggleOrderDirection } = TableActionsSupplyTypes();
    const resetTextFieldsSupplyType = ResetTextFieldsSupplyType();
    const resetTextFieldsUser = ResetTextFieldsUser();
    // Estructura del componente
    return(
        <>
            <Table id="Table-Supply-Types">
                <Thead ThemeMode={themeMode}>
                    <tr>
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Tipo')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Tipo' ? <FaSortAlphaDown/> : <FaSortAlphaDownAlt/>} Tipo
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                        <Th>Descripción</Th>
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Unidad')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Unidad' ? <FaSortAlphaDown/> : <FaSortAlphaDownAlt/>} Unidad
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Categoría')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Categoría' ? <FaSortAlphaDown/> : <FaSortAlphaDownAlt/>} Categoría
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                    </tr>
                </Thead>
                <Tbody ThemeMode={themeMode}>
                    {currentRecordsSupplyTypes.map((type) => (
                        <tr 
                            key={type.idtipo}
                            onClick={() => handleRowClick(type)}
                            style={{
                                backgroundColor:  isSelectedRow === type ? 'rgba(255, 255, 255, 0.7)' : 'transparent',
                                cursor: 'pointer',
                                transition: 'background-color 0.5s ease',
                            }}
                        >
                            <Td ThemeMode={themeMode}>{type.tipo}</Td>
                            <Td ThemeMode={themeMode}>{type.descripcion}</Td>
                            <Td ThemeMode={themeMode}>{type.unidad}</Td>
                            <Td ThemeMode={themeMode}>{isSupplyCategories.find(category => category.idcategoria === type.idcategoria)?.nombre || 'Desconocido'}</Td>
                        </tr>
                    ))}
                </Tbody>
            </Table>
            {currentRecordsSupplyTypes.length !== 0 ? (
                <>
                    <Container_Row_90_Center>
                        <Tooltip title='Página anterior' placement="top">
                            <Button_Icon_Blue_180 ThemeMode={themeMode} className={currentPage === 1 ? 'roll-out-button-left' : 'roll-in-button-left'}
                                onClick={prevPage}>
                                <Icon_White_18><GrPrevious/></Icon_White_18>
                            </Button_Icon_Blue_180>
                        </Tooltip>
                        <Text_A_16_Center ThemeMode={themeMode}>Página {currentPage} de {totalPagesSupplyTypes}</Text_A_16_Center>
                        <Tooltip title='Página siguiente' placement="top">
                            <Button_Icon_Blue_180 ThemeMode={themeMode} className={currentPage === totalPagesSupplyTypes || totalPagesSupplyTypes === 0 ? 'roll-out-button-left' : 'roll-in-button-left'}
                                onClick={nextPageSupplyTypes}>
                                <Icon_White_18><GrNext/></Icon_White_18>
                            </Button_Icon_Blue_180>
                        </Tooltip>
                    </Container_Row_90_Center>
                </>
            ):(
                <>
                    <Container_Row_90_Center>
                        <Text_Fade_A_30_Center ThemeMode={themeMode}>No hay datos disponibles</Text_Fade_A_30_Center>
                    </Container_Row_90_Center>
                </>
            )}
        </>
    );
}