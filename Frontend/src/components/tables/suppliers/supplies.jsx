//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react"
// Componentes de React externos
import { Tooltip } from "@mui/material"
// Contextos
import { SelectedRowContext,SelectedOptionOrderDirectionContext,SelectedOptionOrderContext } from "../../../contexts/SelectedesProvider"
import { ThemeModeContext } from "../../../contexts/ViewsProvider"
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
import Supply_Image from '../../imgs/Supply.jpg'
//__________IMAGENES__________
// Estilos personalizados
import { Container_Row_90_Center } from "../../styled/Containers";
import { Table,Thead,Th,Tbody,Td,TContainer_Center } from "../../styled/Tables";
import { Button_Icon_Blue_180 } from "../../styled/Buttons";
import { Text_A_16_Center,Text_Fade_A_30_Center,Text_Background_Blue_12_Center,Text_Background_Green_12_Center,Text_Background_Lime_Green_12_Center,Text_Background_Orange_12_Center,Text_Background_Red_12_Center,Text_Background_Yellow_12_Center } from "../../styled/Text";
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
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Nombre' ? <FaSortAlphaDown/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Nombre' ? <FaSortAlphaDownAlt/> : <CgArrowsV/>} Nombre
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
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Proveedor' ? <FaSortAlphaDown/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Proveedor' ? <FaSortAlphaDownAlt/> : <CgArrowsV/>} Proveedor
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
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Categoría' ? <FaSortAlphaDown/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Categoría' ? <FaSortAlphaDownAlt/> : <CgArrowsV/>} Categoría
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
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Tipo' ? <FaSortAlphaDown/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Tipo' ? <FaSortAlphaDownAlt/> : <CgArrowsV/>} Tipo
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Cantidad')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Cantidad' ? <FaSortNumericUp/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Cantidad' ? <FaSortNumericUpAlt/> : <CgArrowsV/>} Cantidad
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
                            <Td ThemeMode={themeMode}>{supply.nombre || 'Desconocido...'}</Td>
                            <Td ThemeMode={themeMode}>{supply.descripcion || 'Desconocida...'}</Td>
                            <Td ThemeMode={themeMode}><TContainer_Center><Icon_Image_Black_60 ThemeMode={themeMode} src={supply.imagen || Supply_Image}/></TContainer_Center></Td>
                            <Td ThemeMode={themeMode}>
                                {calification.find(item => item.idproveedor === supply.idproveedor)?.calificacion === 0 ? (
                                    <>
                                        <TContainer_Center><Text_Background_Blue_12_Center ThemeMode={themeMode}>{isSuppliers.find(supplier => supplier.idproveedor === supply.idproveedor)?.nombre || 'Desconocido...'}</Text_Background_Blue_12_Center></TContainer_Center>
                                    </>
                                ):(
                                    calification.find(item => item.idproveedor === supply.idproveedor)?.calificacion <= 1 ? (
                                        <>
                                            <TContainer_Center><Text_Background_Red_12_Center ThemeMode={themeMode}>{isSuppliers.find(supplier => supplier.idproveedor === supply.idproveedor)?.nombre || 'Desconocido...'}</Text_Background_Red_12_Center></TContainer_Center>
                                        </>
                                    ):(
                                        calification.find(item => item.idproveedor === supply.idproveedor)?.calificacion <= 2 ? (
                                            <>
                                                <TContainer_Center><Text_Background_Orange_12_Center ThemeMode={themeMode}>{isSuppliers.find(supplier => supplier.idproveedor === supply.idproveedor)?.nombre || 'Desconocido...'}</Text_Background_Orange_12_Center></TContainer_Center>
                                            </>
                                        ):(
                                            calification.find(item => item.idproveedor === supply.idproveedor)?.calificacion <= 3 ? (
                                                <>
                                                    <TContainer_Center><Text_Background_Yellow_12_Center ThemeMode={themeMode}>{isSuppliers.find(supplier => supplier.idproveedor === supply.idproveedor)?.nombre || 'Desconocido...'}</Text_Background_Yellow_12_Center></TContainer_Center>
                                                </>
                                            ):(
                                                calification.find(item => item.idproveedor === supply.idproveedor)?.calificacion <= 4 ? (
                                                    <>
                                                        <TContainer_Center><Text_Background_Lime_Green_12_Center ThemeMode={themeMode}>{isSuppliers.find(supplier => supplier.idproveedor === supply.idproveedor)?.nombre || 'Desconocido...'}</Text_Background_Lime_Green_12_Center></TContainer_Center>
                                                    </>
                                                ):(
                                                    calification.find(item => item.idproveedor === supply.idproveedor)?.calificacion <= 5 ? (
                                                        <>
                                                            <TContainer_Center><Text_Background_Green_12_Center ThemeMode={themeMode}>{isSuppliers.find(supplier => supplier.idproveedor === supply.idproveedor)?.nombre || 'Desconocido...'}</Text_Background_Green_12_Center></TContainer_Center>
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
                            <Td ThemeMode={themeMode}>{isSupplyCategories.find(category => category.idcategoria === supply.idcategoria)?.nombre || 'Desconocido...'}</Td>
                            <Td ThemeMode={themeMode}>{isSupplyTypes.find(type => type.idtipo === supply.idtipo)?.tipo || 'Desconocido...'}</Td>
                            <Td ThemeMode={themeMode}>{(() => {
                                const count = isCountSupplyTypes.find(count => count.idcantidad === supply.idcantidad);
                                const type = isSupplyTypes.find(type => type.idtipo === supply.idtipo);
                                return `${count.cantidad} ${type.unidad}` || 'Desconocida...'
                            })()}</Td>
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