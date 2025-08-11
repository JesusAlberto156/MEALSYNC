//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Contextos
import { SelectedRowContext } from "../../../contexts/SelectedesProvider"
import { TextFieldsSupplyTypesContext } from "../../../contexts/FormsProvider"
import { RefModalContext,RefFormContext,RefButtonAddContext,RefButtonEditContext,RefButtonDeleteContext,RefButtonDetailContext } from "../../../contexts/RefsProvider"
import { CountSupplyTypesContext,SupplyCategoriesContext } from "../../../contexts/SuppliesProvider"
// Hooks personalizados
import { ResetTextFieldsUser } from "../../../hooks/users/Texts"
import { ResetTextFieldsSupplyType } from "../../../hooks/supplies/Texts"
import { TableActionsSupplyTypes } from "../../../hooks/supplies/Tables"
// Estilos personalizados
import { Table_Container,Table,Table_Head_Thead_Blue,Table_Body_Tbody_White,Table_Body_Td } from "../../styled/Tables"
// Componentes personalizados
import { Table_Pagination } from "../Pagination"
import { Table_Title_Numeric,Table_Title_Text } from "../Titles"
//____________IMPORT/EXPORT____________

// Tabla de los tipos de insumo
export default function Table_Supply_Types(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const isModal = useContext(RefModalContext);
    const isForm = useContext(RefFormContext);
    const isButtonAdd = useContext(RefButtonAddContext);
    const isButtonEdit = useContext(RefButtonEditContext);
    const isButtonDelete = useContext(RefButtonDeleteContext);
    const isButtonDetail = useContext(RefButtonDetailContext);
    const [isTextFieldsSupplyType,setIsTextFieldsSupplyType] = useContext(TextFieldsSupplyTypesContext);
    const [isCountSupplyTypes] = useContext(CountSupplyTypesContext);
    const [isSupplyCategories] = useContext(SupplyCategoriesContext); 
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Supply-Types");
    
            const isClickInsideTable = table && table.contains(event.target);
            const isClickInsideModal = isModal?.current?.contains(event.target);
            const isClickInsideForm = isForm?.current?.contains(event.target);
            const isClickInsideEdit = isButtonEdit?.current?.contains(event.target);
            const isClickInsideAdd = isButtonAdd?.current?.contains(event.target);
            const isClickInsideDelete = isButtonDelete?.current?.contains(event.target);
            const isClickInsideDetail = isButtonDetail?.current?.contains(event.target);

            if (!isClickInsideTable && !isClickInsideModal && !isClickInsideForm && !isClickInsideEdit && !isClickInsideAdd && !isClickInsideDelete && !isClickInsideDetail) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    },[isModal,isForm,isButtonAdd,isButtonEdit,isButtonDelete,isButtonDetail]);
    // UseEfect para pasar el valor del renglon seleccionado a los input
    useEffect(() => {
        if(isSelectedRow !== null){
            const cantidadesFiltradas = isCountSupplyTypes.filter(count => count.idtipo === isSelectedRow.idtipo).map(count => ({ cantidad: count.cantidad}))
            setIsTextFieldsSupplyType(prev => ({
            ...prev,
                idtipo: isSelectedRow.idtipo,
                tipo: isSelectedRow.tipo,
                descripcion: isSelectedRow.descripcion,
                unidad: isSelectedRow.unidad,
                idcategoria: isSelectedRow.idcategoria,
                limite: isSelectedRow.limite?.toString() ?? '',
                cantidades: cantidadesFiltradas.length > 0
                    ? cantidadesFiltradas
                    : [{ cantidad: '' }]
            }));
        }else{
            resetTextFieldsSupplyType();
            resetTextFieldsUser();
        }
    },[isSelectedRow])
    // Constantes con la funcionalidad de los hooks
    const { handleRowClick,nextPageSupplyTypes,prevPage,currentRecordsSupplyTypes,currentPage,totalPagesSupplyTypes } = TableActionsSupplyTypes();
    const resetTextFieldsSupplyType = ResetTextFieldsSupplyType();
    const resetTextFieldsUser = ResetTextFieldsUser();
    // Estructura del componente
    return(
        <>
            <Table_Container>
                <Table id="Table-Supply-Types">
                    <Table_Head_Thead_Blue>
                        <tr>
                            <Table_Title_Text
                                title="Nombre"
                                order="Nombre"
                            />
                            <Table_Title_Text
                                title="Unidad"
                                order="Unidad"
                            />
                            <Table_Title_Text
                                title="Categoría"
                                order="Categoría"
                            />
                            <Table_Title_Numeric
                                title="Cantidad Mínima (Kg/Lt/Pz)"
                                order="Cantidad Mínima"
                            />
                        </tr>
                    </Table_Head_Thead_Blue>
                    <Table_Body_Tbody_White>
                        {currentRecordsSupplyTypes.map((type) => (
                            <tr 
                                key={type.idtipo}
                                onClick={() => handleRowClick(type)}
                                style={{
                                    backgroundColor: isSelectedRow === type ? 'rgba(0, 0, 0, 0.85)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 1s ease',
                                }}
                            >
                                <Table_Body_Td style={{ color: isSelectedRow === type ? 'white' : ''}}>{type.tipo || 'Desconocido'}</Table_Body_Td>
                                <Table_Body_Td style={{ color: isSelectedRow === type ? 'white' : ''}}>{type.unidad || 'Desconocida'}</Table_Body_Td>
                                <Table_Body_Td style={{ color: isSelectedRow === type ? 'white' : ''}}>{isSupplyCategories.find(category => category.idcategoria === type.idcategoria)?.nombre || 'Desconocida'}</Table_Body_Td>
                                <Table_Body_Td style={{ color: isSelectedRow === type ? 'white' : ''}}>{type.limite || 'Desconocido'}</Table_Body_Td>
                            </tr>
                        ))}
                    </Table_Body_Tbody_White>
                </Table>
            </Table_Container>
            <Table_Pagination
                currentPage={currentPage}
                currentRecords={currentRecordsSupplyTypes}
                totalPage={totalPagesSupplyTypes}
                onNextPage={() => nextPageSupplyTypes()}
                onPrevPage={() => prevPage()}
            />
        </>
    );
}