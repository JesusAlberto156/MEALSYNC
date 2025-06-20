//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react"
// Componentes de React externos
import { Tooltip } from "@mui/material"
// Contextos
import { SelectedRowContext,SelectedOptionOrderDirectionContext,SelectedOptionOrderContext } from "../../../contexts/SelectedesProvider"
import { ThemeModeContext } from "../../../contexts/ViewsProvider"
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
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
// Iconos de la paginación
import { GrNext,GrPrevious } from "react-icons/gr";
//__________ICONOS__________
// Estilos personalizados
import { Container_Row_90_Center } from "../../styled/Containers";
import { Table,Thead,Th,Tbody,Td,TContainer_Center } from "../../styled/Tables";
import { Button_Icon_Blue_180 } from "../../styled/Buttons";
import { Text_A_16_Center,Text_Fade_A_30_Center,Text_Background_Blue_12_Center,Text_Background_Red_12_Center,Text_Background_Orange_12_Center,Text_Background_Yellow_12_Center,Text_Background_Lime_Green_12_Center,Text_Background_Green_12_Center } from "../../styled/Text";
import { Icon_White_18,Icon_Button_Black_14 } from "../../styled/Icons";
//____________IMPORT/EXPORT____________

// Tabla de los usuarios
export default function Table_Suppliers(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
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
            <Table id="Table-Suppliers">
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
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('RFC')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'RFC' ? <FaSortAlphaDown/> : <FaSortAlphaDownAlt/>} RFC
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Domicilio')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Domicilio' ? <FaSortAlphaDown/> : <FaSortAlphaDownAlt/>} Domicilio
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Teléfono')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Teléfono' ? <FaLongArrowAltUp/> : <FaLongArrowAltDown/>} Teléfono
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Correo')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Correo' ? <FaSortAlphaDown/> : <FaSortAlphaDownAlt/>} Correo
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                    </tr>
                </Thead>
                <Tbody ThemeMode={themeMode}>
                    {currentRecordsSuppliers.map((supplier) => (
                        <tr 
                            key={supplier.idproveedor}
                            onClick={() => handleRowClick(supplier)}
                            style={{
                                backgroundColor:  isSelectedRow === supplier ? 'rgba(255, 255, 255, 0.7)' : 'transparent',
                                cursor: 'pointer',
                                transition: 'background-color 0.5s ease',
                            }}
                        >
                            <Td ThemeMode={themeMode}>
                                {calification.find(item => item.idproveedor === supplier.idproveedor)?.calificacion === 0 ? (
                                    <>
                                        <TContainer_Center><Text_Background_Blue_12_Center ThemeMode={themeMode}>{supplier.nombre || 'Desconocido...'}</Text_Background_Blue_12_Center></TContainer_Center>
                                    </>
                                ):(
                                    calification.find(item => item.idproveedor === supplier.idproveedor)?.calificacion <= 1 ? (
                                        <>
                                            <TContainer_Center><Text_Background_Red_12_Center ThemeMode={themeMode}>{supplier.nombre || 'Desconocido...'}</Text_Background_Red_12_Center></TContainer_Center>
                                        </>
                                    ):(
                                        calification.find(item => item.idproveedor === supplier.idproveedor)?.calificacion <= 2 ? (
                                            <>
                                                <TContainer_Center><Text_Background_Orange_12_Center ThemeMode={themeMode}>{supplier.nombre || 'Desconocido...'}</Text_Background_Orange_12_Center></TContainer_Center>
                                            </>
                                        ):(
                                            calification.find(item => item.idproveedor === supplier.idproveedor)?.calificacion <= 3 ? (
                                                <>
                                                    <TContainer_Center><Text_Background_Yellow_12_Center ThemeMode={themeMode}>{supplier.nombre || 'Desconocido...'}</Text_Background_Yellow_12_Center></TContainer_Center>
                                                </>
                                            ):(
                                                calification.find(item => item.idproveedor === supplier.idproveedor)?.calificacion <= 4 ? (
                                                    <>
                                                        <TContainer_Center><Text_Background_Lime_Green_12_Center ThemeMode={themeMode}>{supplier.nombre || 'Desconocido...'}</Text_Background_Lime_Green_12_Center></TContainer_Center>
                                                    </>
                                                ):(
                                                    calification.find(item => item.idproveedor === supplier.idproveedor)?.calificacion <= 5 ? (
                                                        <>
                                                            <TContainer_Center><Text_Background_Green_12_Center ThemeMode={themeMode}>{supplier.nombre || 'Desconocido...'}</Text_Background_Green_12_Center></TContainer_Center>
                                                        </>
                                                    ):(
                                                        <></>
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )}
                            </Td>
                            <Td ThemeMode={themeMode}>{supplier.rfc || 'Desconocido...'}</Td>
                            <Td ThemeMode={themeMode}>{supplier.domicilio || 'Desconocido...'}</Td>
                            <Td ThemeMode={themeMode}>{supplier.telefono || 'Desconocido...'}</Td>
                            <Td ThemeMode={themeMode}>{supplier.correo || 'Desconocido...'}</Td>
                        </tr>
                    ))}
                </Tbody>
            </Table>
            {currentRecordsSuppliers.length !== 0 ? (
                <>
                    <Container_Row_90_Center>
                        <Tooltip title='Página anterior' placement="top">
                            <Button_Icon_Blue_180 ThemeMode={themeMode} className={currentPage === 1 ? 'roll-out-button-left' : 'roll-in-button-left'}
                                onClick={prevPage}>
                                <Icon_White_18><GrPrevious/></Icon_White_18>
                            </Button_Icon_Blue_180>
                        </Tooltip>
                        <Text_A_16_Center ThemeMode={themeMode}>Página {currentPage} de {totalPagesSuppliers}</Text_A_16_Center>
                        <Tooltip title='Página siguiente' placement="top">
                            <Button_Icon_Blue_180 ThemeMode={themeMode} className={currentPage === totalPagesSuppliers || totalPagesSuppliers === 0 ? 'roll-out-button-left' : 'roll-in-button-left'}
                                onClick={nextPageSuppliers}>
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