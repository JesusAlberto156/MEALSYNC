//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react"
// Componentes de React externos
import { Tooltip } from "@mui/material"
// Contextos
import { SelectedRowContext,SelectedOptionOrderDirectionContext,SelectedOptionOrderContext } from "../../../contexts/SelectedesProvider"
import { TextFieldsSupplierContext } from "../../../contexts/FormsProvider"
import { RefSuppliersContext } from "../../../contexts/RefsProvider"
import { ObservationsContext,SuppliersContext } from "../../../contexts/SuppliersProvider"
// Hooks personalizados
import { ResetTextFieldsSupplier } from "../../../hooks/suppliers/Texts"
import { ResetTextFieldsUser } from "../../../hooks/users/Texts"
import { TableActionsSuppliers } from "../../../hooks/suppliers/Tables"
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
// Estilos personalizados
import { Table_Container,Table,Table_Head_Thead_Blue,Table_Head_Th,Table_Body_Tbody_White,Table_Body_Td,Table_Container_Item_Center,Table_Container_Pagination,Table_Container_Data } from "../../styled/Tables";
import { Button_Icon_Blue_200 } from "../../styled/Buttons";
import { Text_Background_Blue_12,Text_Background_Red_12,Text_Background_Orange_12,Text_Background_Yellow_12,Text_Background_Lime_Green_12,Text_Background_Green_12, Text_Span_16_Center_Black,Text_Fade_Title_32_Black } from "../../styled/Text";
import { Icon_Button_White_16,Icon_20 } from "../../styled/Icons";
//____________IMPORT/EXPORT____________

// Tabla de los usuarios
export default function Table_Suppliers(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const {Modal_Suppliers,Form_Suppliers,Button_Edit_Suppliers,Button_Delete_Suppliers} = useContext(RefSuppliersContext);
    const [isTextFieldsSupplier,setIsTextFieldsSupplier] = useContext(TextFieldsSupplierContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const [isObservations] = useContext(ObservationsContext);
    const [isSuppliers] = useContext(SuppliersContext);
    const [calification,setCalification] = useState([]);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Suppliers");
    
            const isClickInsideTable = table && table.contains(event.target);
            const isClickInsideModal = Modal_Suppliers?.current?.contains(event.target);
            const isClickInsideForm = Form_Suppliers?.current?.contains(event.target);
            const isClickInsideEdit = Button_Edit_Suppliers?.current?.contains(event.target);
            const isClickInsideDelete = Button_Delete_Suppliers?.current?.contains(event.target);
    
            if (!isClickInsideTable && !isClickInsideModal && !isClickInsideForm && !isClickInsideEdit && !isClickInsideDelete) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    },[Modal_Suppliers,Form_Suppliers,Button_Edit_Suppliers, Button_Delete_Suppliers]);
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
    const { handleRowClick,nextPageSuppliers,prevPage,currentRecordsSuppliers,currentPage,totalPagesSuppliers,ToggleOrder,ToggleOrderDirection } = TableActionsSuppliers();
    const resetTextFieldsSupplier = ResetTextFieldsSupplier();
    const resetTextFieldsUser = ResetTextFieldsUser();
    // Estructura del componente
    return(
        <>
            <Table_Container>
                <Table id="Table-Suppliers">
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
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 
                                        onClick={() => {
                                            ToggleOrder('RFC')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'RFC' ? <FaSortAlphaDown/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'RFC' ? <FaSortAlphaDownAlt/> : <CgArrowsV/>} RFC
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 
                                        onClick={() => {
                                            ToggleOrder('Domicilio')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Domicilio' ? <FaSortAlphaDown/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Domicilio' ? <FaSortAlphaDownAlt/> : <CgArrowsV/>} Domicilio
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 
                                        onClick={() => {
                                            ToggleOrder('Teléfono')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Teléfono' ? <FaSortNumericUp/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Teléfono' ? <FaSortNumericUpAlt/> : <CgArrowsV/>} Teléfono
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 
                                        onClick={() => {
                                            ToggleOrder('Correo')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Correo' ? <FaSortAlphaDown/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Correo' ? <FaSortAlphaDownAlt/> : <CgArrowsV/>} Correo
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                        </tr>
                    </Table_Head_Thead_Blue>
                    <Table_Body_Tbody_White>
                        {currentRecordsSuppliers.map((supplier) => (
                            <tr 
                                key={supplier.idproveedor}
                                onClick={() => handleRowClick(supplier)}
                                style={{
                                    backgroundColor: isSelectedRow === supplier ? 'rgba(88, 88, 84, 0.8)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 1s ease',
                                }}
                            >
                                <Table_Body_Td>
                                    {calification.find(item => item.idproveedor === supplier.idproveedor)?.calificacion === 0 ? (
                                        <>
                                            <Table_Container_Item_Center><Text_Background_Blue_12 style={{ border: isSelectedRow === supplier ? '2px solid white' : ''}}>{supplier.nombre || 'Desconocido...'}</Text_Background_Blue_12></Table_Container_Item_Center>
                                        </>
                                    ):(
                                        calification.find(item => item.idproveedor === supplier.idproveedor)?.calificacion <= 1 ? (
                                            <>
                                                <Table_Container_Item_Center><Text_Background_Red_12 style={{ border: isSelectedRow === supplier ? '2px solid white' : ''}}>{supplier.nombre || 'Desconocido...'}</Text_Background_Red_12></Table_Container_Item_Center>
                                            </>
                                        ):(
                                            calification.find(item => item.idproveedor === supplier.idproveedor)?.calificacion <= 2 ? (
                                                <>
                                                    <Table_Container_Item_Center><Text_Background_Orange_12 style={{ border: isSelectedRow === supplier ? '2px solid white' : ''}}>{supplier.nombre || 'Desconocido...'}</Text_Background_Orange_12></Table_Container_Item_Center>
                                                </>
                                            ):(
                                                calification.find(item => item.idproveedor === supplier.idproveedor)?.calificacion <= 3 ? (
                                                    <>
                                                        <Table_Container_Item_Center><Text_Background_Yellow_12 style={{ border: isSelectedRow === supplier ? '2px solid white' : ''}}>{supplier.nombre || 'Desconocido...'}</Text_Background_Yellow_12></Table_Container_Item_Center>
                                                    </>
                                                ):(
                                                    calification.find(item => item.idproveedor === supplier.idproveedor)?.calificacion <= 4 ? (
                                                        <>
                                                            <Table_Container_Item_Center><Text_Background_Lime_Green_12 style={{ border: isSelectedRow === supplier ? '2px solid white' : ''}}>{supplier.nombre || 'Desconocido...'}</Text_Background_Lime_Green_12></Table_Container_Item_Center>
                                                        </>
                                                    ):(
                                                        calification.find(item => item.idproveedor === supplier.idproveedor)?.calificacion <= 5 ? (
                                                            <>
                                                                <Table_Container_Item_Center><Text_Background_Green_12 style={{ border: isSelectedRow === supplier ? '2px solid white' : ''}}>{supplier.nombre || 'Desconocido...'}</Text_Background_Green_12></Table_Container_Item_Center>
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
                                <Table_Body_Td style={{ color: isSelectedRow === supplier ? 'white' : ''}}>{supplier.rfc || 'Desconocido...'}</Table_Body_Td>
                                <Table_Body_Td style={{ color: isSelectedRow === supplier ? 'white' : ''}}>{supplier.domicilio || 'Desconocido...'}</Table_Body_Td>
                                <Table_Body_Td style={{ color: isSelectedRow === supplier ? 'white' : ''}}>{supplier.telefono || 'Desconocido...'}</Table_Body_Td>
                                <Table_Body_Td style={{ color: isSelectedRow === supplier ? 'white' : ''}}>{supplier.correo || 'Desconocido...'}</Table_Body_Td>
                            </tr>
                        ))}
                    </Table_Body_Tbody_White>
                </Table>
            </Table_Container>
            {currentRecordsSuppliers.length !== 0 ? (
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
                        <Text_Span_16_Center_Black>Página {currentPage} de {totalPagesSuppliers}</Text_Span_16_Center_Black>
                        <Tooltip title='Página siguiente' placement="top">
                            <span>
                                <Button_Icon_Blue_200
                                    disabled={currentPage === totalPagesSuppliers || totalPagesSuppliers === 0}
                                    onClick={() => nextPageSuppliers()}
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