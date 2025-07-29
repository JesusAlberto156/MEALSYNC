//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Contextos
import { SelectedRowContext } from "../../../contexts/SelectedesProvider"
import { TextFieldsSupplyCategoryContext } from "../../../contexts/FormsProvider"
import { RefModalContext,RefFormContext,RefButtonEditContext,RefButtonDeleteContext } from "../../../contexts/RefsProvider"
// Hooks personalizados
import { ResetTextFieldsUser } from "../../../hooks/users/Texts"
import { ResetTextFieldsSupplyCategory } from "../../../hooks/supplies/Texts"
import { TableActionsSupplyCategories } from "../../../hooks/supplies/Tables"
// Estilos personalizados
import { Table_Container,Table,Table_Head_Thead_Blue,Table_Body_Tbody_White,Table_Body_Td } from "../../styled/Tables";
// Componentes personalizados
import { Table_Title_Normal, Table_Title_Text } from "../Titles"
import { Table_Pagination } from "../Pagination"
//____________IMPORT/EXPORT____________

// Tabla de las categorías de insumos
export default function Table_Supply_Categories(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const isModal = useContext(RefModalContext);
    const isForm = useContext(RefFormContext);
    const isButtonEdit = useContext(RefButtonEditContext);
    const isButtonDelete = useContext(RefButtonDeleteContext);
    const [isTextFieldsSupplyCategory,setIsTextFieldsSupplyCategory] = useContext(TextFieldsSupplyCategoryContext);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Supply-Categories");
    
            const isClickInsideTable = table && table.contains(event.target);
            const isClickInsideModal = isModal?.current?.contains(event.target);
            const isClickInsideForm = isForm?.current?.contains(event.target);
            const isClickInsideEdit = isButtonEdit?.current?.contains(event.target);
            const isClickInsideDelete = isButtonDelete?.current?.contains(event.target);

            if (!isClickInsideTable && !isClickInsideModal && !isClickInsideForm && !isClickInsideEdit && !isClickInsideDelete) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    },[isModal,isForm,isButtonEdit,isButtonDelete]);
    // UseEfect para pasar el valor del renglon seleccionado a los input
    useEffect(() => {
        if(isSelectedRow !== null){
            setIsTextFieldsSupplyCategory(prev => ({
                ...prev,
                idcategoria: isSelectedRow.idcategoria,
                nombre: isSelectedRow.nombre,
                descripcion: isSelectedRow.descripcion,
            }))
        }else{
            resetTextFieldsSupplyCategory();
            resetTextFieldsUser();
        }
    },[isSelectedRow])
    // Constantes con la funcionalidad de los hooks
    const { handleRowClick,nextPageSupplyCategories,prevPage,currentRecordsSupplyCategories,currentPage,totalPagesSupplyCategories } = TableActionsSupplyCategories();
    const resetTextFieldsSupplyCategory = ResetTextFieldsSupplyCategory();
    const resetTextFieldsUser = ResetTextFieldsUser();
    // Estructura del componente
    return(
        <>
            <Table_Container>
                <Table id="Table-Supply-Categories">
                    <Table_Head_Thead_Blue>
                        <tr>
                            <Table_Title_Text
                                title="Nombre"
                                order="Nombre"
                            />
                            <Table_Title_Normal
                                title="Descripción"
                            />
                        </tr>
                    </Table_Head_Thead_Blue>
                    <Table_Body_Tbody_White>
                        {currentRecordsSupplyCategories.map((category) => (
                            <tr 
                                key={category.idcategoria}
                                onClick={() => handleRowClick(category)}
                                style={{
                                    backgroundColor: isSelectedRow === category ? 'rgba(0, 0, 0, 0.85)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 1s ease',
                                }}
                            >
                                <Table_Body_Td style={{ color: isSelectedRow === category ? 'white' : ''}}>{category.nombre || 'Desconocido'}</Table_Body_Td>
                                <Table_Body_Td style={{ color: isSelectedRow === category ? 'white' : ''}}>{category.descripcion || 'Desconocida'}</Table_Body_Td>
                            </tr>
                        ))}
                    </Table_Body_Tbody_White>
                </Table>
            </Table_Container>
            <Table_Pagination
                currentPage={currentPage}
                currentRecords={currentRecordsSupplyCategories}
                totalPage={totalPagesSupplyCategories}
                onNextPage={() => nextPageSupplyCategories()}
                onPrevPage={() => prevPage()}
            />
        </>
    );
}