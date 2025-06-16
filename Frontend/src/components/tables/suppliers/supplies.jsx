//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Componentes de React externos
import { Tooltip } from "@mui/material"
// Contextos
import { SelectedRowContext,SelectedOptionOrderDirectionContext,SelectedOptionOrderContext } from "../../../contexts/SelectedesProvider"
import { ThemeModeContext } from "../../../contexts/ViewsProvider"
import { TextFieldsSupplyContext } from "../../../contexts/FormsProvider"
import { RefSuppliesContext } from "../../../contexts/RefsProvider"
import { SupplyTypesContext,SupplyCategoriesContext,SuppliersContext } from "../../../contexts/SuppliersProvider"
// Hooks personalizados
import { ResetTextFieldsUser } from "../../../hooks/users/Texts"
import { ResetTextFieldsSupply } from "../../../hooks/suppliers/Texts"
import { TableActionsSupplies } from "../../../hooks/suppliers/Tables"
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
import { Icon_White_18,Icon_Button_Black_14,Icon_Image_Black_60 } from "../../styled/Icons";
//____________IMPORT/EXPORT____________

// Tabla de los usuarios
export default function Table_Supplies(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const {Modal_Supplies,Form_Supplies,Button_Edit_Supplies,Button_Delete_Supplies} = useContext(RefSuppliesContext);  
    const [isTextFieldsSupply,setIsTextFieldsSupply] = useContext(TextFieldsSupplyContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const [isSupplyTypes] = useContext(SupplyTypesContext);
    const [isSupplyCategories] = useContext(SupplyCategoriesContext); 
    const [isSuppliers] = useContext(SuppliersContext);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Supplies");
    
            const isClickInsideTable = table && table.contains(event.target);
            const isClickInsideModal = Modal_Supplies?.current?.contains(event.target);
            const isClickInsideForm = Form_Supplies?.current?.contains(event.target);
            const isClickInsideEdit = Button_Edit_Supplies?.current?.contains(event.target);
            const isClickInsideDelete = Button_Delete_Supplies?.current?.contains(event.target);

            if (!isClickInsideTable && !isClickInsideModal && !isClickInsideForm && !isClickInsideEdit && !isClickInsideDelete) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    },[Modal_Supplies,Form_Supplies,Button_Edit_Supplies,Button_Delete_Supplies]);
    // UseEfect para pasar el valor del renglon seleccionado a los input
    useEffect(() => {
        if(isSelectedRow !== null){
            setIsTextFieldsSupply(prev => ({
            ...prev,
                idinsumo: isSelectedRow.idinsumo,
                nombre: isSelectedRow.nombre,
                descripcion: isSelectedRow.descripcion,
                imagen: isSelectedRow.imagen,
                idproveedor: isSelectedRow.idproveedor,
                idtipo: isSelectedRow.idtipo,
                idcategoria: isSelectedRow.idcategoria,
            }));
        }else{
            resetTextFieldsSupply();
            resetTextFieldsUser();
        }
    },[isSelectedRow])
    // Constantes con la funcionalidad de los hooks
    const { handleRowClick,nextPageSupplies,prevPage,currentRecordsSupplies,currentPage,totalPagesSupplies,ToggleOrder,ToggleOrderDirection } = TableActionsSupplies();
    const resetTextFieldsSupply = ResetTextFieldsSupply();
    const resetTextFieldsUser = ResetTextFieldsUser();
    // Estructura del componente
    return(
        <>
            <Table id="Table-Supplies">
                <Thead ThemeMode={themeMode}>
                    <tr>
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Nombre')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Nombre' ? <FaSortAlphaDown/> : <FaSortAlphaDownAlt/>} Nombre
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                        <Th>Descripción</Th>
                        <Th>Imagen</Th>
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Proveedor')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Proveedor' ? <FaSortAlphaDown/> : <FaSortAlphaDownAlt/>} Proveedor
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
                    </tr>
                </Thead>
                <Tbody ThemeMode={themeMode}>
                    {currentRecordsSupplies.map((supply) => (
                        <tr 
                            key={supply.idinsumo}
                            onClick={() => handleRowClick(supply)}
                            style={{
                                backgroundColor:  isSelectedRow === supply ? 'rgba(255, 255, 255, 0.7)' : 'transparent',
                                cursor: 'pointer',
                                transition: 'background-color 0.5s ease',
                            }}
                        >
                            <Td ThemeMode={themeMode}>{supply.nombre}</Td>
                            <Td ThemeMode={themeMode}>{supply.descripcion}</Td>
                            <Td ThemeMode={themeMode}><Icon_Image_Black_60 ThemeMode={themeMode} src={supply.imagen}/></Td>
                            <Td ThemeMode={themeMode}>{isSuppliers.find(supplier => supplier.idproveedor === supply.idproveedor)?.nombre || 'Desconocido'}</Td>
                            <Td ThemeMode={themeMode}>{isSupplyCategories.find(category => category.idcategoria === supply.idcategoria)?.nombre || 'Desconocido'}</Td>
                            <Td ThemeMode={themeMode}>{isSupplyTypes.find(type => type.idtipo === supply.idtipo)?.tipo || 'Desconocido'}</Td>
                        </tr>
                    ))}
                </Tbody>
            </Table>
            {currentRecordsSupplies.length !== 0 ? (
                <>
                    <Container_Row_90_Center>
                        <Tooltip title='Página anterior' placement="top">
                            <Button_Icon_Blue_180 ThemeMode={themeMode} className={currentPage === 1 ? 'roll-out-button-left' : 'roll-in-button-left'}
                                onClick={prevPage}>
                                <Icon_White_18><GrPrevious/></Icon_White_18>
                            </Button_Icon_Blue_180>
                        </Tooltip>
                        <Text_A_16_Center ThemeMode={themeMode}>Página {currentPage} de {totalPagesSupplies}</Text_A_16_Center>
                        <Tooltip title='Página siguiente' placement="top">
                            <Button_Icon_Blue_180 ThemeMode={themeMode} className={currentPage === totalPagesSupplies || totalPagesSupplies === 0 ? 'roll-out-button-left' : 'roll-in-button-left'}
                                onClick={nextPageSupplies}>
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