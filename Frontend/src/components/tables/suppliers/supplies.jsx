//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react"
// Componentes de React externos
import { Tooltip } from "@mui/material"
// Contextos
import { SelectedRowContext,SelectedOptionOrderDirectionContext,SelectedOptionOrderContext } from "../../../contexts/SelectedesProvider"
import { TextFieldsSupplyContext } from "../../../contexts/FormsProvider"
import { RefSuppliesContext } from "../../../contexts/RefsProvider"
import { SupplyTypesContext,SupplyCategoriesContext,SuppliersContext,CountSupplyTypesContext,ObservationsContext } from "../../../contexts/SuppliersProvider"
// Hooks personalizados
import { ResetTextFieldsUser } from "../../../hooks/users/Texts"
import { ResetTextFieldsSupply } from "../../../hooks/suppliers/Texts"
import { TableActionsSupplies } from "../../../hooks/suppliers/Tables"
//__________ICONOS__________
// Iconos de las tablas
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { FaSortNumericUp } from "react-icons/fa";
import { FaSortNumericUpAlt } from "react-icons/fa";
import { CgArrowsV } from "react-icons/cg";
// Iconos de la paginación
import { GrNext,GrPrevious } from "react-icons/gr";
//__________ICONOS__________
//__________IMAGENES__________
import Supply from '../../imgs/Supply.jpg'
//__________IMAGENES__________
// Estilos personalizados
import { Table_Container,Table,Table_Head_Thead_Blue,Table_Head_Th,Table_Body_Tbody_White,Table_Body_Td,Table_Image_Black,Table_Container_Item_Center,Table_Container_Data,Table_Container_Pagination } from "../../styled/Tables"
import { Button_Icon_Blue_200 } from "../../styled/Buttons";
import { Text_Span_16_Center_White,Text_Background_Green_12,Text_Background_Lime_Green_12,Text_Background_Yellow_12,Text_Background_Orange_12,Text_Background_Red_12,Text_Background_Blue_12,Text_Fade_Title_32_Black,Text_Span_16_Center_Black } from "../../styled/Text";
import { Icon_20,Icon_Button_White_16 } from "../../styled/Icons";
//____________IMPORT/EXPORT____________

// Tabla de los usuarios
export default function Table_Supplies(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const {Modal_Supplies,Form_Supplies,Button_Edit_Supplies,Button_Delete_Supplies} = useContext(RefSuppliesContext);  
    const [isTextFieldsSupply,setIsTextFieldsSupply] = useContext(TextFieldsSupplyContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
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
    const { handleRowClick,nextPageSupplies,prevPage,currentRecordsSupplies,currentPage,totalPagesSupplies,ToggleOrder,ToggleOrderDirection } = TableActionsSupplies();
    const resetTextFieldsSupply = ResetTextFieldsSupply();
    const resetTextFieldsUser = ResetTextFieldsUser();
    // Estructura del componente
    return(
        <>
            <Table_Container>
                <Table id="Table-Supplies">
                    <Table_Head_Thead_Blue>
                        <tr>
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 
                                        onClick={() => {
                                            ToggleOrder('Nombre')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Nombre' ? <FaSortAlphaDown/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Nombre' ? <FaSortAlphaDownAlt/> : <CgArrowsV/>} Nombre
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                            <Table_Head_Th><Text_Span_16_Center_White>Descripción</Text_Span_16_Center_White></Table_Head_Th>
                            <Table_Head_Th><Text_Span_16_Center_White>Imagen</Text_Span_16_Center_White></Table_Head_Th>
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 
                                        onClick={() => {
                                            ToggleOrder('Proveedor')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Proveedor' ? <FaSortAlphaDown/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Proveedor' ? <FaSortAlphaDownAlt/> : <CgArrowsV/>} Proveedor
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 
                                        onClick={() => {
                                            ToggleOrder('Categoría')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Categoría' ? <FaSortAlphaDown/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Categoría' ? <FaSortAlphaDownAlt/> : <CgArrowsV/>} Categoría
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 
                                        onClick={() => {
                                            ToggleOrder('Tipo')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Tipo' ? <FaSortAlphaDown/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Tipo' ? <FaSortAlphaDownAlt/> : <CgArrowsV/>} Tipo
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 
                                        onClick={() => {
                                            ToggleOrder('Cantidad')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Cantidad' ? <FaSortNumericUp/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Cantidad' ? <FaSortNumericUpAlt/> : <CgArrowsV/>} Cantidad
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                        </tr>
                    </Table_Head_Thead_Blue>
                    <Table_Body_Tbody_White>
                        {currentRecordsSupplies.map((supply) => (
                            <tr 
                                key={supply.idinsumo}
                                onClick={() => handleRowClick(supply)}
                                style={{
                                    backgroundColor: isSelectedRow === supply ? 'rgba(88, 88, 84, 0.8)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 1s ease',
                                }}
                            >
                                <Table_Body_Td style={{ color: isSelectedRow === supply ? 'white': ''}}>{supply.nombre || 'Desconocido...'}</Table_Body_Td>
                                <Table_Body_Td style={{ color: isSelectedRow === supply ? 'white': ''}}>{supply.descripcion || 'Desconocida...'}</Table_Body_Td>
                                <Table_Body_Td><Table_Container_Item_Center><Table_Image_Black style={{border: isSelectedRow === supply ? '2px solid white' : ''}} src={supply.imagen || Supply}/></Table_Container_Item_Center></Table_Body_Td>
                                <Table_Body_Td>
                                    {calification.find(item => item.idproveedor === supply.idproveedor)?.calificacion === 0 ? (
                                        <>
                                            <Table_Container_Item_Center><Text_Background_Blue_12 style={{border: isSelectedRow === supply ? '2px solid white' : ''}}>{isSuppliers.find(supplier => supplier.idproveedor === supply.idproveedor)?.nombre || 'Desconocido...'}</Text_Background_Blue_12></Table_Container_Item_Center>
                                        </>
                                    ):(
                                        calification.find(item => item.idproveedor === supply.idproveedor)?.calificacion <= 1 ? (
                                            <>
                                                <Table_Container_Item_Center><Text_Background_Red_12 style={{border: isSelectedRow === supply ? '2px solid white' : ''}}>{isSuppliers.find(supplier => supplier.idproveedor === supply.idproveedor)?.nombre || 'Desconocido...'}</Text_Background_Red_12></Table_Container_Item_Center>
                                            </>
                                        ):(
                                            calification.find(item => item.idproveedor === supply.idproveedor)?.calificacion <= 2 ? (
                                                <>
                                                    <Table_Container_Item_Center><Text_Background_Orange_12 style={{border: isSelectedRow === supply ? '2px solid white' : ''}}>{isSuppliers.find(supplier => supplier.idproveedor === supply.idproveedor)?.nombre || 'Desconocido...'}</Text_Background_Orange_12></Table_Container_Item_Center>
                                                </>
                                            ):(
                                                calification.find(item => item.idproveedor === supply.idproveedor)?.calificacion <= 3 ? (
                                                    <>
                                                        <Table_Container_Item_Center><Text_Background_Yellow_12 style={{border: isSelectedRow === supply ? '2px solid white' : ''}}>{isSuppliers.find(supplier => supplier.idproveedor === supply.idproveedor)?.nombre || 'Desconocido...'}</Text_Background_Yellow_12></Table_Container_Item_Center>
                                                    </>
                                                ):(
                                                    calification.find(item => item.idproveedor === supply.idproveedor)?.calificacion <= 4 ? (
                                                        <>
                                                            <Table_Container_Item_Center><Text_Background_Lime_Green_12 style={{border: isSelectedRow === supply ? '2px solid white' : ''}}>{isSuppliers.find(supplier => supplier.idproveedor === supply.idproveedor)?.nombre || 'Desconocido...'}</Text_Background_Lime_Green_12></Table_Container_Item_Center>
                                                        </>
                                                    ):(
                                                        calification.find(item => item.idproveedor === supply.idproveedor)?.calificacion <= 5 ? (
                                                            <>
                                                                <Table_Container_Item_Center><Text_Background_Green_12 style={{border: isSelectedRow === supply ? '2px solid white' : ''}}>{isSuppliers.find(supplier => supplier.idproveedor === supply.idproveedor)?.nombre || 'Desconocido...'}</Text_Background_Green_12></Table_Container_Item_Center>
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
                                <Table_Body_Td style={{ color: isSelectedRow === supply ? 'white' : ''}}>{isSupplyCategories.find(category => category.idcategoria === supply.idcategoria)?.nombre || 'Desconocido...'}</Table_Body_Td>
                                <Table_Body_Td style={{ color: isSelectedRow === supply ? 'white' : ''}}>{isSupplyTypes.find(type => type.idtipo === supply.idtipo)?.tipo || 'Desconocido...'}</Table_Body_Td>
                                <Table_Body_Td style={{ color: isSelectedRow === supply ? 'white' : ''}}>
                                    {(() => {
                                        const count = isCountSupplyTypes.find(count => count.idcantidad === supply.idcantidad);
                                        const type = isSupplyTypes.find(type => type.idtipo === supply.idtipo);
                                        return `${count.cantidad} ${type.unidad}` || 'Desconocida...'
                                    })()}
                                </Table_Body_Td>
                            </tr>
                        ))}
                    </Table_Body_Tbody_White>
                </Table>
            </Table_Container>
            {currentRecordsSupplies.length !== 0 ? (
                <>
                    <Table_Container_Pagination>
                        <Tooltip title='Página anterior' placement="top">
                            <span>
                                <Button_Icon_Blue_200
                                    disabled={currentPage === 1}
                                    onClick={() => prevPage()}
                                >
                                    <Icon_20><GrPrevious/></Icon_20>
                                </Button_Icon_Blue_200>
                            </span>
                        </Tooltip>
                        <Text_Span_16_Center_Black>Página {currentPage} de {totalPagesSupplies}</Text_Span_16_Center_Black>
                        <Tooltip title='Página siguiente' placement="top">
                            <span>
                                <Button_Icon_Blue_200
                                    disabled={currentPage === totalPagesSupplies || totalPagesSupplies === 0}
                                    onClick={() => nextPageSupplies()}
                                >
                                    <Icon_20><GrNext/></Icon_20>
                                </Button_Icon_Blue_200>
                            </span>
                        </Tooltip>
                    </Table_Container_Pagination>
                </>
            ):(
                <>
                    <Table_Container_Data>
                        <Text_Fade_Title_32_Black>¡No hay datos disponibles!</Text_Fade_Title_32_Black>
                    </Table_Container_Data>
                </>
            )}
        </>
    );
}