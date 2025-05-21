//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Componentes de React externos
import { Tooltip } from "@mui/material"
// Contextos
import { SelectedRow1Context } from "../../../contexts/VariablesProvider"
import { ThemeModeContext } from "../../../contexts/ViewsProvider"
import { TextFieldsSupplyContext } from "../../../contexts/FormsProvider"
import { RefSupplyTypesContext } from "../../../contexts/RefsProvider"
import { UnitsContext } from "../../../contexts/WarehouseProvider"
// Hooks personalizados
import { ResetTextFieldsSupplyTypes } from "../../../hooks/Texts"
import { TableActionsSupplyTypes } from "../../../hooks/Table"
//__________ICONOS__________
// Iconos de la paginación
import { GrNext,GrPrevious } from "react-icons/gr";
//__________ICONOS__________
// Estilos personalizados
import { Container_Row_90_Center } from "../../styled/Containers";
import { Table,Thead,Th,Tbody,Td } from "../../styled/Tables";
import { Button_Icon_Blue_180 } from "../../styled/Buttons";
import { Text_A_16_Center,Text_Title_34_Center } from "../../styled/Text";
import { Icon_White_18 } from "../../styled/Icons";

import Table_Units from "./Units"
//____________IMPORT/EXPORT____________

// Tabla de los tipos de insumos
export default function Table_Supply_Types(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSelectedRow1,setIsSelectedRow1] = useContext(SelectedRow1Context);
    const {Modal_ST,Form_ST,Button_Edit_ST,Button_Delete_ST} = useContext(RefSupplyTypesContext);
    const [isTextFieldsSupply,setIsTextFieldsSupply] = useContext(TextFieldsSupplyContext);
    const [isUnits] = useContext(UnitsContext);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Supply-Types");
    
            const isClickInsideTable = table && table.contains(event.target);
            const isClickInsideModal = Modal_ST?.current?.contains(event.target);
            const isClickInsideForm = Form_ST?.current?.contains(event.target);
            const isClickInsideEdit = Button_Edit_ST?.current?.contains(event.target);
            const isClickInsideDelete = Button_Delete_ST?.current?.contains(event.target);
    
            if (!isClickInsideTable && !isClickInsideModal && !isClickInsideForm && !isClickInsideEdit && !isClickInsideDelete) {
                setIsSelectedRow1(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    },[Modal_ST,Form_ST,Button_Edit_ST,Button_Delete_ST]);
    // UseEfect para pasar el valor del renglon seleccionado a los input
    useEffect(() => {
        if(isSelectedRow1 !== null){
            setIsTextFieldsSupply(prev => ({
                ...prev,
                idtype: isSelectedRow1.idtipo,
                type: isSelectedRow1.tipo,
                description: isSelectedRow1.descripcion,
                idunits: isSelectedRow1.idmedida,
            }))
        }else{
            resetTextFieldsSupplyTypes();
        }
    },[isSelectedRow1])
    // Constantes con la funcionalidad de los hooks
    const {handleRowClick, nextPageSupplyTypes, prevPage, currentRecordsSupplyTypes, currentPage, totalPagesSupplyTypes} = TableActionsSupplyTypes();
    const resetTextFieldsSupplyTypes = ResetTextFieldsSupplyTypes();
    // Estructura del componente
    return(
        <>  
            <Text_Title_34_Center ThemeMode={themeMode}>TIPOS DE INSUMOS</Text_Title_34_Center>
            <Table id="Table-Supply-Types">
                <Thead ThemeMode={themeMode}>
                    <tr>
                        <Th>Tipo</Th>
                        <Th>Descripción</Th>
                        <Th>Tipo de Medición</Th>
                    </tr>
                </Thead>
                <Tbody ThemeMode={themeMode}>
                    {currentRecordsSupplyTypes.map((type) => (
                        <tr 
                            key={type.idtipo}
                            onClick={() => handleRowClick(type)}
                            style={{
                                backgroundColor:  isSelectedRow1 === type ? 'rgba(255, 255, 255, 0.7)' : 'transparent',
                                cursor: 'pointer',
                                transition: 'background-color 0.5s ease',
                            }}
                        >
                            <Td ThemeMode={themeMode}>{type.tipo}</Td>
                            <Td ThemeMode={themeMode}>{type.descripcion}</Td>
                            <Td ThemeMode={themeMode}>
                                {(() => {
                                    const unit = isUnits.find(unit => unit.idmedida === type.idmedida);
                                    return unit?.medida || 'Desconocido';
                                })()}
                            </Td>
                        </tr>
                    ))}
                </Tbody>
            </Table>
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
            <Table_Units/>
        </>
    );
}