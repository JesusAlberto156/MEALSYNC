//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Contextos
import { SelectedRowContext } from "../../../contexts/SelectedesProvider"
import { RefModalContext,RefFormContext,RefButtonDetailContext } from "../../../contexts/RefsProvider"
import { SuppliersContext } from "../../../contexts/SuppliersProvider"
// Hooks personalizados
import { ResetTextFieldsObservation } from "../../../hooks/suppliers/Texts"
import { TableActionsObservations } from "../../../hooks/suppliers/Tables"
import { Dates } from "../../../hooks/Dates"
// Estilos personalizados
import { Table_Container,Table,Table_Head_Thead_Blue,Table_Body_Tbody_White,Table_Body_Td,Table_Container_Item_Center } from "../../styled/Tables"
import { Text_Background_Green_12,Text_Background_Lime_Green_12,Text_Background_Yellow_12,Text_Background_Orange_12,Text_Background_Red_12,Text_Background_Blue_12 } from "../../styled/Text";
import { Table_Title_Number, Table_Title_Numeric, Table_Title_Text } from "../Titles"
import { Table_Pagination } from "../Pagination"
//____________IMPORT/EXPORT____________

// Tabla de los observaciones a proveedores
export default function Table_Supplier_Observations(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const isModal = useContext(RefModalContext); 
    const isForm = useContext(RefFormContext); 
    const isButtonDetail = useContext(RefButtonDetailContext);
    const [isSuppliers] = useContext(SuppliersContext);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Supplier-Observations");
    
            const isClickInsideTable = table && table.contains(event.target);
            const isClickInsideModal = isModal?.current?.contains(event.target);
            const isClickInsideForm = isForm?.current?.contains(event.target);
            const isClickInsideDetail = isButtonDetail?.current?.contains(event.target);
    
            if (!isClickInsideTable && !isClickInsideModal && !isClickInsideForm && !isClickInsideDetail) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    },[isModal,isForm,isButtonDetail]);
    // UseEfect para pasar el valor del renglon seleccionado a los input
    useEffect(() => {
        if(isSelectedRow !== null){
            setIsTextFieldsObservation(prev => ({
                ...prev,
                idobservacion: isSelectedRow.idobservacion,
                observacion: isSelectedRow.observacion,
                calificacion: isSelectedRow.calificacion,
                fecha: isSelectedRow.fecha,
                idproveedor: isSelectedRow.idproveedor,
            }))
        }else{
            resetTextFieldsObservation();
        }
    },[isSelectedRow])
    // Constantes con la funcionalidad de los hooks
    const { handleRowClick,nextPageObservations,prevPage,currentRecordsObservations,currentPage,totalPagesObservations } = TableActionsObservations();
    const { getDate } = Dates();
    const resetTextFieldsObservation = ResetTextFieldsObservation();
    // Estructura del componente
    return(
        <>
            <Table_Container>
                <Table id="Table-Supplier-Observations">
                    <Table_Head_Thead_Blue>
                        <tr>
                            <Table_Title_Text
                                title="Proveedor"
                                order="Proveedor"
                            />
                            <Table_Title_Number
                                title="Fecha"
                                order="Fecha"
                            />
                            <Table_Title_Numeric
                                title="Calificación"
                                order="Calificación"
                            />
                        </tr>
                    </Table_Head_Thead_Blue>
                    <Table_Body_Tbody_White>
                        {currentRecordsObservations.map((observation) => (
                            <tr 
                                key={observation.idobservacion}
                                onClick={() => handleRowClick(observation)}
                                style={{
                                    backgroundColor: isSelectedRow === observation ? 'rgba(0, 0, 0, 0.85)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 1s ease',
                                }}
                            >
                                <Table_Body_Td>
                                    {observation.calificacion === 0 ? (
                                        <>
                                            <Table_Container_Item_Center><Text_Background_Blue_12 style={{ border: isSelectedRow === observation ? '2px solid white' : ''}}>{isSuppliers.find(supplier => supplier.idproveedor === observation.idproveedor)?.nombre || 'Desconocido'}</Text_Background_Blue_12></Table_Container_Item_Center>
                                        </>
                                    ):(
                                        observation.calificacion <= 1 ? (
                                            <>
                                                <Table_Container_Item_Center><Text_Background_Red_12 style={{ border: isSelectedRow === observation ? '2px solid white' : ''}}>{isSuppliers.find(supplier => supplier.idproveedor === observation.idproveedor)?.nombre || 'Desconocido'}</Text_Background_Red_12></Table_Container_Item_Center>
                                            </>
                                        ):(
                                            observation.calificacion <= 2 ? (
                                                <>
                                                    <Table_Container_Item_Center><Text_Background_Orange_12 style={{ border: isSelectedRow === observation ? '2px solid white' : ''}}>{isSuppliers.find(supplier => supplier.idproveedor === observation.idproveedor)?.nombre || 'Desconocido'}</Text_Background_Orange_12></Table_Container_Item_Center>
                                                </>
                                            ):(
                                                observation.calificacion <= 3 ? (
                                                    <>
                                                        <Table_Container_Item_Center><Text_Background_Yellow_12 style={{ border: isSelectedRow === observation ? '2px solid white' : ''}}>{isSuppliers.find(supplier => supplier.idproveedor === observation.idproveedor)?.nombre || 'Desconocido'}</Text_Background_Yellow_12></Table_Container_Item_Center>
                                                    </>
                                                ):(
                                                    observation.calificacion <= 4 ? (
                                                        <>
                                                            <Table_Container_Item_Center><Text_Background_Lime_Green_12 style={{ border: isSelectedRow === observation ? '2px solid white' : ''}}>{isSuppliers.find(supplier => supplier.idproveedor === observation.idproveedor)?.nombre || 'Desconocido'}</Text_Background_Lime_Green_12></Table_Container_Item_Center>
                                                        </>
                                                    ):(
                                                        observation.calificacion <= 5 ? (
                                                            <>
                                                                <Table_Container_Item_Center><Text_Background_Green_12 style={{ border: isSelectedRow === observation ? '2px solid white' : ''}}>{isSuppliers.find(supplier => supplier.idproveedor === observation.idproveedor)?.nombre || 'Desconocido'}</Text_Background_Green_12></Table_Container_Item_Center>
                                                            </>
                                                        ):(
                                                            <></>
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    )}
                                </Table_Body_Td>
                                <Table_Body_Td style={{ color: isSelectedRow === observation ? 'white' : ''}}>{getDate(observation.fecha) || 'Desconocida'}</Table_Body_Td>
                                <Table_Body_Td style={{ color: isSelectedRow === observation ? 'white' : ''}}>{observation.calificacion || 'Desconocida'}</Table_Body_Td>
                            </tr>
                        ))}
                    </Table_Body_Tbody_White>
                </Table>
            </Table_Container>
            <Table_Pagination
                currentPage={currentPage}
                currentRecords={currentRecordsObservations}
                totalPage={totalPagesObservations}
                onPrevPage={() => prevPage()}
                onNextPage={() => nextPageObservations()}
            />
        </>
    );
}