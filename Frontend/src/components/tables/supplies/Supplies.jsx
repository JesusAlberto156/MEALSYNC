//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react"
// Contextos
import { SelectedRowContext } from "../../../contexts/SelectedesProvider"
import { TextFieldsSupplyContext } from "../../../contexts/FormsProvider"
import { RefModalContext,RefFormContext,RefButtonEditContext,RefButtonDeleteContext,RefButtonDetailContext } from "../../../contexts/RefsProvider"
import { SuppliersContext,ObservationsContext } from "../../../contexts/SuppliersProvider"
import { SupplyTypesContext,SupplyCategoriesContext,CountSupplyTypesContext } from "../../../contexts/SuppliesProvider"
// Hooks personalizados
import { ResetTextFieldsUser } from "../../../hooks/users/Texts"
import { ResetTextFieldsSupply } from "../../../hooks/supplies/Texts"
import { TableActionsSupplies } from "../../../hooks/supplies/Tables"
//__________IMAGENES__________
import Supply from '../../imgs/Supply.jpg'
//__________IMAGENES__________
// Estilos personalizados
import { Table_Container,Table,Table_Head_Thead_Blue,Table_Body_Tbody_White,Table_Body_Td,Table_Image_Black,Table_Container_Item_Center } from "../../styled/Tables"
import { Text_Background_Green_12,Text_Background_Lime_Green_12,Text_Background_Yellow_12,Text_Background_Orange_12,Text_Background_Red_12,Text_Background_Blue_12 } from "../../styled/Text";
// Componentes personalizados
import { Table_Title_Normal, Table_Title_Numeric, Table_Title_Text } from "../Titles"
import { Table_Pagination } from "../Pagination"
//____________IMPORT/EXPORT____________

// Tabla de los insumos
export default function Table_Supplies(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext); 
    const isModal = useContext(RefModalContext);
    const isForm = useContext(RefFormContext);
    const isButtonEdit = useContext(RefButtonEditContext);
    const isButtonDelete = useContext(RefButtonDeleteContext);
    const isButtonDetail = useContext(RefButtonDetailContext);
    const [isTextFieldsSupply,setIsTextFieldsSupply] = useContext(TextFieldsSupplyContext);
    const [isSupplyTypes] = useContext(SupplyTypesContext);
    const [isSupplyCategories] = useContext(SupplyCategoriesContext); 
    const [isSuppliers] = useContext(SuppliersContext);
    const [isCountSupplyTypes] = useContext(CountSupplyTypesContext);
    const [isObservations] = useContext(ObservationsContext);
    const [calification,setCalification] = useState([]);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Supplies");
    
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
            setIsTextFieldsSupply(prev => ({
            ...prev,
                idinsumo: isSelectedRow.idinsumo,
                nombre: isSelectedRow.nombre,
                descripcion: isSelectedRow.descripcion,
                imagen: isSelectedRow.imagen,
                idproveedor: isSelectedRow.idproveedor,
                idtipo: isSelectedRow.idtipo,
                idcategoria: isSelectedRow.idcategoria,
                idcantidad: isSelectedRow.idcantidad,
            }));
        }else{
            resetTextFieldsSupply();
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
    const { handleRowClick,nextPageSupplies,prevPage,currentRecordsSupplies,currentPage,totalPagesSupplies } = TableActionsSupplies();
    const resetTextFieldsSupply = ResetTextFieldsSupply();
    const resetTextFieldsUser = ResetTextFieldsUser();
    // Estructura del componente
    return(
        <>
            <Table_Container>
                <Table id="Table-Supplies">
                    <Table_Head_Thead_Blue>
                        <tr>
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
                        {currentRecordsSupplies.map((supply) => (
                            <tr 
                                key={supply.idinsumo}
                                onClick={() => handleRowClick(supply)}
                                style={{
                                    backgroundColor: isSelectedRow === supply ? 'rgba(0, 0, 0, 0.85)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 1s ease',
                                }}
                            >
                                <Table_Body_Td style={{ color: isSelectedRow === supply ? 'white': ''}}>{supply.nombre || 'Desconocido'}</Table_Body_Td>
                                <Table_Body_Td><Table_Container_Item_Center><Table_Image_Black style={{border: isSelectedRow === supply ? '2px solid white' : ''}} src={supply.imagen || Supply}/></Table_Container_Item_Center></Table_Body_Td>
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
                                <Table_Body_Td style={{ color: isSelectedRow === supply ? 'white' : ''}}>{isSupplyCategories.find(category => category.idcategoria === supply.idcategoria)?.nombre || 'Desconocido'}</Table_Body_Td>
                                <Table_Body_Td style={{ color: isSelectedRow === supply ? 'white' : ''}}>{isSupplyTypes.find(type => type.idtipo === supply.idtipo)?.tipo || 'Desconocido'}</Table_Body_Td>
                                <Table_Body_Td style={{ color: isSelectedRow === supply ? 'white' : ''}}>
                                    {(() => {
                                        const count = isCountSupplyTypes.find(count => count.idcantidad === supply.idcantidad);
                                        const type = isSupplyTypes.find(type => type.idtipo === supply.idtipo);
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
                totalPage={totalPagesSupplies}
                currentPage={currentPage}
                currentRecords={currentRecordsSupplies}
                onNextPage={() => nextPageSupplies()}
                onPrevPage={() => prevPage()}
            />
        </>
    );
}