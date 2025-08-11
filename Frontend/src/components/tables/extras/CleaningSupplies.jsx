//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react"
// Contextos
import { SelectedRowContext } from "../../../contexts/SelectedesProvider"
import { TextFieldsCleaningSupplyContext } from "../../../contexts/FormsProvider"
import { SuppliersContext,ObservationsContext } from "../../../contexts/SuppliersProvider"
import { CountCleaningTypesContext,CleaningTypesContext,CleaningCategoriesContext } from "../../../contexts/ExtrasProvider"
import { RefModalContext,RefFormContext,RefButtonEditContext,RefButtonDeleteContext,RefButtonDetailContext } from "../../../contexts/RefsProvider"
// Hooks personalizados
import { ResetTextFieldsUser } from "../../../hooks/users/Texts"
import { ResetTextFieldsCleaningSupply } from "../../../hooks/extras/Texts"
import { TableActionsCleaningSupplies } from "../../../hooks/extras/Tables"
//__________IMAGENES__________
import Cleaning from '../../imgs/Cleaning.jpg'
//__________IMAGENES__________
// Estilos personalizados
import { Text_Background_Blue_12, Text_Background_Green_12, Text_Background_Lime_Green_12, Text_Background_Orange_12, Text_Background_Red_12, Text_Background_Yellow_12 } from "../../styled/Text"
import { Table_Container,Table,Table_Head_Thead_Blue,Table_Body_Tbody_White,Table_Body_Td,Table_Container_Item_Center,Table_Image_Black } from "../../styled/Tables";
// Componentes personalizados
import { Table_Title_Normal, Table_Title_Number, Table_Title_Numeric,Table_Title_Text } from "../Titles"
import { Table_Pagination } from "../Pagination"
//____________IMPORT/EXPORT____________

// Tabla de los suministros de limpieza
export default function Table_Cleaning_Supplies(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const isModal = useContext(RefModalContext);
    const isForm = useContext(RefFormContext);
    const isButtonEdit = useContext(RefButtonEditContext);
    const isButtonDelete = useContext(RefButtonDeleteContext);
    const isButtonDetail = useContext(RefButtonDetailContext);
    const [isTextFieldsCleaningSupply,setIsTextFieldsCleaningSupply] = useContext(TextFieldsCleaningSupplyContext);
    const [isCountCleaningTypes] = useContext(CountCleaningTypesContext); 
    const [isCleaningCategories] = useContext(CleaningCategoriesContext); 
    const [isCleaningTypes] = useContext(CleaningTypesContext); 
    const [isSuppliers] = useContext(SuppliersContext);
    const [isObservations] = useContext(ObservationsContext);
    const [calification,setCalification] = useState([]);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Cleaning-Supply");
    
            const isClickInsideTable = table && table.contains(event.target);
            const isClickInsideModal = isModal?.current?.contains(event.target);
            const isClickInsideForm = isForm?.current?.contains(event.target);
            const isClickInsideEdit = isButtonEdit?.current?.contains(event.target);
            const isClickInsideDelete = isButtonDelete?.current?.contains(event.target);
            const isClickInsideDetail = isButtonDetail?.current?.contains(event.target);

            if (!isClickInsideTable && !isClickInsideModal && !isClickInsideForm && !isClickInsideEdit && !isClickInsideDelete && !isClickInsideDetail) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    },[isModal,isForm,isButtonEdit,isButtonDelete,isButtonDetail]);
    // UseEfect para pasar el valor del renglon seleccionado a los input
    useEffect(() => {
        if(isSelectedRow !== null){
            setIsTextFieldsCleaningSupply(prev => ({
                ...prev,
                codigo: isSelectedRow.codigo,
                idsuministro: isSelectedRow.idsuministro,
                nombre: isSelectedRow.nombre,
                descripcion: isSelectedRow.descripcion,
                imagen: isSelectedRow.imagen,
                idproveedor: isSelectedRow.idproveedor,
                idcategoria: isSelectedRow.idcategoria,
                idtipo: isSelectedRow.idtipo,
                idcantidad: isSelectedRow.idcantidad,
            }))
        }else{
            resetTextFieldsCleaningSupply();
            resetTextFieldsUser();
        }
    },[isSelectedRow]);
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
    const { handleRowClick,nextPageCleaningSupplies,prevPage,currentRecordsCleaningSupplies,currentPage,totalPagesCleaningSupplies } = TableActionsCleaningSupplies();
    const resetTextFieldsCleaningSupply = ResetTextFieldsCleaningSupply();
    const resetTextFieldsUser = ResetTextFieldsUser();
    // Estructura del componente
    return(
        <>
            <Table_Container>
                <Table id="Table-Cleaning-Supply">
                    <Table_Head_Thead_Blue>
                        <tr>
                            <Table_Title_Number
                                title="Código"
                                order="Codigo"
                            />
                            <Table_Title_Text
                                title="Nombre"
                                order="Nombre"
                            />
                            <Table_Title_Normal
                                title="Imagen"
                            />
                            <Table_Title_Text
                                title="Proveedor"
                                order="Proveedor"
                            />
                            <Table_Title_Text
                                title="Categoría"
                                order="Categoría"
                            />
                            <Table_Title_Text
                                title="Tipo"
                                order="Tipo"
                            />
                            <Table_Title_Numeric
                                title="Cantidad"
                                order="Cantidad"
                            />
                        </tr>
                    </Table_Head_Thead_Blue>
                    <Table_Body_Tbody_White>
                        {currentRecordsCleaningSupplies.map((supply) => (
                            <tr 
                                key={supply.idsuministro}
                                onClick={() => handleRowClick(supply)}
                                style={{
                                    backgroundColor: isSelectedRow === supply ? 'rgba(0, 0, 0, 0.85)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 1s ease',
                                }}
                            >
                                <Table_Body_Td style={{ color: isSelectedRow === supply ? 'white' : ''}}>{supply.codigo || 'Desconocido'}</Table_Body_Td>
                                <Table_Body_Td style={{ color: isSelectedRow === supply ? 'white' : ''}}>{supply.nombre || 'Desconocido'}</Table_Body_Td>
                                <Table_Body_Td><Table_Container_Item_Center><Table_Image_Black style={{border: isSelectedRow === supply ? '2px solid white' : ''}} src={supply.imagen || Cleaning}/></Table_Container_Item_Center></Table_Body_Td>
                                <Table_Body_Td>
                                    {calification.find(item => item.idproveedor === supply.idproveedor)?.calificacion === 0 ? (
                                        <>
                                            <Table_Container_Item_Center><Text_Background_Blue_12 style={{border: isSelectedRow === supply ? '2px solid white' : ''}}>{isSuppliers.find(supplier => supplier.idproveedor === supply.idproveedor)?.nombre || 'Desconocido'}</Text_Background_Blue_12></Table_Container_Item_Center>
                                        </>
                                    ):(
                                        calification.find(item => item.idproveedor === supply.idproveedor)?.calificacion <= 1 ? (
                                            <>
                                                <Table_Container_Item_Center><Text_Background_Red_12 style={{border: isSelectedRow === supply ? '2px solid white' : ''}}>{isSuppliers.find(supplier => supplier.idproveedor === supply.idproveedor)?.nombre || 'Desconocido'}</Text_Background_Red_12></Table_Container_Item_Center>
                                            </>
                                        ):(
                                            calification.find(item => item.idproveedor === supply.idproveedor)?.calificacion <= 2 ? (
                                                <>
                                                    <Table_Container_Item_Center><Text_Background_Orange_12 style={{border: isSelectedRow === supply ? '2px solid white' : ''}}>{isSuppliers.find(supplier => supplier.idproveedor === supply.idproveedor)?.nombre || 'Desconocido'}</Text_Background_Orange_12></Table_Container_Item_Center>
                                                </>
                                            ):(
                                                calification.find(item => item.idproveedor === supply.idproveedor)?.calificacion <= 3 ? (
                                                    <>
                                                        <Table_Container_Item_Center><Text_Background_Yellow_12 style={{border: isSelectedRow === supply ? '2px solid white' : ''}}>{isSuppliers.find(supplier => supplier.idproveedor === supply.idproveedor)?.nombre || 'Desconocido'}</Text_Background_Yellow_12></Table_Container_Item_Center>
                                                    </>
                                                ):(
                                                    calification.find(item => item.idproveedor === supply.idproveedor)?.calificacion <= 4 ? (
                                                        <>
                                                            <Table_Container_Item_Center><Text_Background_Lime_Green_12 style={{border: isSelectedRow === supply ? '2px solid white' : ''}}>{isSuppliers.find(supplier => supplier.idproveedor === supply.idproveedor)?.nombre || 'Desconocido'}</Text_Background_Lime_Green_12></Table_Container_Item_Center>
                                                        </>
                                                    ):(
                                                        calification.find(item => item.idproveedor === supply.idproveedor)?.calificacion <= 5 ? (
                                                            <>
                                                                <Table_Container_Item_Center><Text_Background_Green_12 style={{border: isSelectedRow === supply ? '2px solid white' : ''}}>{isSuppliers.find(supplier => supplier.idproveedor === supply.idproveedor)?.nombre || 'Desconocido'}</Text_Background_Green_12></Table_Container_Item_Center>
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
                                <Table_Body_Td style={{ color: isSelectedRow === supply ? 'white' : ''}}>{isCleaningCategories.find(category => category.idcategoria === supply.idcategoria)?.nombre || 'Desconocida'}</Table_Body_Td>
                                <Table_Body_Td style={{ color: isSelectedRow === supply ? 'white' : ''}}>{isCleaningTypes.find(type => type.idtipo === supply.idtipo)?.tipo || 'Desconocido'}</Table_Body_Td>
                                <Table_Body_Td style={{ color: isSelectedRow === supply ? 'white' : ''}}>
                                    {(() => {
                                        const count = isCountCleaningTypes.find(count => count.idcantidad === supply.idcantidad);
                                        const type = isCleaningTypes.find(type => type.idtipo === supply.idtipo);
                                        const s = count.cantidad !== 1 ? 's' : '';
                                        return `${count.cantidad} ${type.unidad}${s}` || 'Desconocida'
                                    })()}
                                </Table_Body_Td>
                            </tr>
                        ))}
                    </Table_Body_Tbody_White>
                </Table>
            </Table_Container>
            <Table_Pagination
                currentPage={currentPage}
                currentRecords={currentRecordsCleaningSupplies}
                totalPage={totalPagesCleaningSupplies}
                onNextPage={() => nextPageCleaningSupplies()}
                onPrevPage={() => prevPage()}
            />
        </>
    );
}