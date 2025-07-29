//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react"
// Contextos
import { SelectedRowContext } from "../../../contexts/SelectedesProvider"
import { TextFieldsSupplierContext } from "../../../contexts/FormsProvider"
import { RefModalContext,RefFormContext,RefButtonEditContext,RefButtonDeleteContext } from "../../../contexts/RefsProvider"
import { ObservationsContext,SuppliersContext } from "../../../contexts/SuppliersProvider"
// Hooks personalizados
import { ResetTextFieldsSupplier } from "../../../hooks/suppliers/Texts"
import { ResetTextFieldsUser } from "../../../hooks/users/Texts"
import { TableActionsSuppliers } from "../../../hooks/suppliers/Tables"
// Estilos personalizados
import { Table_Container,Table,Table_Head_Thead_Blue,Table_Body_Tbody_White,Table_Body_Td,Table_Container_Item_Center } from "../../styled/Tables";
import { Text_Background_Blue_12,Text_Background_Red_12,Text_Background_Orange_12,Text_Background_Yellow_12,Text_Background_Lime_Green_12,Text_Background_Green_12 } from "../../styled/Text";
// Componentes personalizados
import { Table_Title_Text,Table_Title_Numeric } from "../Titles"
import { Table_Pagination } from "../Pagination"
//____________IMPORT/EXPORT____________

// Tabla de los proveedores
export default function Table_Suppliers(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const isModal = useContext(RefModalContext);
    const isForm = useContext(RefFormContext);
    const isButtonEdit = useContext(RefButtonEditContext);
    const isButtonDelete = useContext(RefButtonDeleteContext); 
    const [isTextFieldsSupplier,setIsTextFieldsSupplier] = useContext(TextFieldsSupplierContext);
    const [isObservations] = useContext(ObservationsContext);
    const [isSuppliers] = useContext(SuppliersContext);
    const [calification,setCalification] = useState([]);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Suppliers");
    
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
            const proveedorObservaciones = isObservations.filter(
                obs => obs.idproveedor === isSelectedRow.idproveedor
            );

            const suma = proveedorObservaciones.reduce(
                (sum, obs) => sum + Number(obs.calificacion), 0
            );

            const promedio = proveedorObservaciones.length > 0
                ? suma / proveedorObservaciones.length
                : 0;
            
            setIsTextFieldsSupplier(prev => ({
                ...prev,
                idproveedor: isSelectedRow.idproveedor,
                nombre: isSelectedRow.nombre,
                rfc: isSelectedRow.rfc,
                domicilio: isSelectedRow.domicilio,
                telefono: isSelectedRow.telefono,
                correo: isSelectedRow.correo,
                calificacion: promedio,
                ideliminado: isSelectedRow.ideliminado,
            }))
        }else{
            resetTextFieldsSupplier();
            resetTextFieldsUser();
        }
    },[isSelectedRow])
    // UseEffect para determinar la calificacion promedio de cada proveedor
    useEffect(() => {
        const totalCalificaciones = isSuppliers.map((supplier) => {
            const proveedorObservaciones = isObservations.filter(
            obs => obs.idproveedor === supplier.idproveedor
            );

            const suma = proveedorObservaciones.reduce(
                (sum, obs) => sum + Number(obs.calificacion), 0
            );

            const promedio = proveedorObservaciones.length > 0
                ? suma / proveedorObservaciones.length
                : 0;

            return {
                idproveedor: supplier.idproveedor,
                calificacion: promedio
            };
        })

        setCalification(totalCalificaciones);
    },[isObservations,isSuppliers]);
    // Constantes con la funcionalidad de los hooks
    const { handleRowClick,nextPageSuppliers,prevPage,currentRecordsSuppliers,currentPage,totalPagesSuppliers } = TableActionsSuppliers();
    const resetTextFieldsSupplier = ResetTextFieldsSupplier();
    const resetTextFieldsUser = ResetTextFieldsUser();
    // Estructura del componente
    return(
        <>
            <Table_Container>
                <Table id="Table-Suppliers">
                    <Table_Head_Thead_Blue>
                        <tr>
                            <Table_Title_Text
                                title="Nombre"
                                order="Nombre"
                            />
                            <Table_Title_Text
                                title="RFC"
                                order="RFC"
                            />
                            <Table_Title_Text
                                title="Domicilio"
                                order="Domicilio"
                            />
                            <Table_Title_Numeric
                                title="Teléfono"
                                order="Teléfono"
                            />
                            <Table_Title_Text
                                title="Correo"
                                order="Correo"
                            />
                        </tr>
                    </Table_Head_Thead_Blue>
                    <Table_Body_Tbody_White>
                        {currentRecordsSuppliers.map((supplier) => (
                            <tr 
                                key={supplier.idproveedor}
                                onClick={() => handleRowClick(supplier)}
                                style={{
                                    backgroundColor: isSelectedRow === supplier ? 'rgba(0, 0, 0, 0.85)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 1s ease',
                                }}
                            >
                                <Table_Body_Td>
                                    {calification.find(item => item.idproveedor === supplier.idproveedor)?.calificacion === 0 ? (
                                        <>
                                            <Table_Container_Item_Center><Text_Background_Blue_12 style={{ border: isSelectedRow === supplier ? '2px solid white' : ''}}>{supplier.nombre || 'Desconocido'}</Text_Background_Blue_12></Table_Container_Item_Center>
                                        </>
                                    ):(
                                        calification.find(item => item.idproveedor === supplier.idproveedor)?.calificacion <= 1 ? (
                                            <>
                                                <Table_Container_Item_Center><Text_Background_Red_12 style={{ border: isSelectedRow === supplier ? '2px solid white' : ''}}>{supplier.nombre || 'Desconocido'}</Text_Background_Red_12></Table_Container_Item_Center>
                                            </>
                                        ):(
                                            calification.find(item => item.idproveedor === supplier.idproveedor)?.calificacion <= 2 ? (
                                                <>
                                                    <Table_Container_Item_Center><Text_Background_Orange_12 style={{ border: isSelectedRow === supplier ? '2px solid white' : ''}}>{supplier.nombre || 'Desconocido'}</Text_Background_Orange_12></Table_Container_Item_Center>
                                                </>
                                            ):(
                                                calification.find(item => item.idproveedor === supplier.idproveedor)?.calificacion <= 3 ? (
                                                    <>
                                                        <Table_Container_Item_Center><Text_Background_Yellow_12 style={{ border: isSelectedRow === supplier ? '2px solid white' : ''}}>{supplier.nombre || 'Desconocido'}</Text_Background_Yellow_12></Table_Container_Item_Center>
                                                    </>
                                                ):(
                                                    calification.find(item => item.idproveedor === supplier.idproveedor)?.calificacion <= 4 ? (
                                                        <>
                                                            <Table_Container_Item_Center><Text_Background_Lime_Green_12 style={{ border: isSelectedRow === supplier ? '2px solid white' : ''}}>{supplier.nombre || 'Desconocido'}</Text_Background_Lime_Green_12></Table_Container_Item_Center>
                                                        </>
                                                    ):(
                                                        calification.find(item => item.idproveedor === supplier.idproveedor)?.calificacion <= 5 ? (
                                                            <>
                                                                <Table_Container_Item_Center><Text_Background_Green_12 style={{ border: isSelectedRow === supplier ? '2px solid white' : ''}}>{supplier.nombre || 'Desconocido'}</Text_Background_Green_12></Table_Container_Item_Center>
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
                                <Table_Body_Td style={{ color: isSelectedRow === supplier ? 'white' : ''}}>{supplier.rfc || 'Desconocido'}</Table_Body_Td>
                                <Table_Body_Td style={{ color: isSelectedRow === supplier ? 'white' : ''}}>{supplier.domicilio || 'Desconocido'}</Table_Body_Td>
                                <Table_Body_Td style={{ color: isSelectedRow === supplier ? 'white' : ''}}>{supplier.telefono || 'Desconocido'}</Table_Body_Td>
                                <Table_Body_Td style={{ color: isSelectedRow === supplier ? 'white' : ''}}>{supplier.correo || 'Desconocido'}</Table_Body_Td>
                            </tr>
                        ))}
                    </Table_Body_Tbody_White>
                </Table>
            </Table_Container>
            <Table_Pagination
                currentPage={currentPage}
                currentRecords={currentRecordsSuppliers}
                totalPage={totalPagesSuppliers}
                onNextPage={() => nextPageSuppliers()}
                onPrevPage={() => prevPage()}
            />
        </>
    );
}