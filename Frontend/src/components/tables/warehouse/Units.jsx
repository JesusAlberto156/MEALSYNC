//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
import { useNavigate } from "react-router-dom"
// Componentes de React externos
import { Tooltip } from "@mui/material"
// Contextos
import { SelectedRow2Context,SearchTerm2Context } from "../../../contexts/VariablesProvider"
import { ThemeModeContext,NavbarViewContext,SidebarViewContext } from "../../../contexts/ViewsProvider"
import { TextFieldsUnitsContext } from "../../../contexts/FormsProvider"
import { RefUnitsContext } from "../../../contexts/RefsProvider"
import { LoggedPermissionsContext } from "../../../contexts/SessionProvider"
// Hooks personalizados
import { ResetTextFieldsUnit } from "../../../hooks/Texts"
import { TableActionsUnits } from "../../../hooks/Table"
import { HandleModalView } from "../../../hooks/Views"
//__________ICONOS__________
import { FaTint } from "react-icons/fa";
import { FaWeightHanging } from "react-icons/fa";
// Iconos de la paginación
import { GrNext,GrPrevious } from "react-icons/gr";
// Icono para la seccion del buscador
import { FcSearch } from "react-icons/fc";
// Iconos para un crud
import { IoIosAddCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Row_90_Center,Container_Row_100_Left,Container_Row_80_Right } from "../../styled/Containers";
import { Table,Thead,Th,Tbody,Td } from "../../styled/Tables";
import { Button_Icon_Blue_180,Button_Icon_Blue_60,Button_Icon_Red_60,Button_Icon_Green_60 } from "../../styled/Buttons";
import { Text_A_16_Center,Text_Title_34_Center } from "../../styled/Text";
import { Icon_White_18,Icon_26 } from "../../styled/Icons";
import { Input_Text_White_20 } from "../../styled/Inputs"
//____________IMPORT/EXPORT____________

// Tabla de las medicones
export default function Table_Units(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSelectedRow2,setIsSelectedRow2] = useContext(SelectedRow2Context); 
    const {Modal_Un,Form_Un,Button_Edit_Un,Button_Delete_Un} = useContext(RefUnitsContext);
    const [isTextFieldsUnits,setIsTextFieldsUnits] = useContext(TextFieldsUnitsContext);
    const [isLoggedPermissions] = useContext(LoggedPermissionsContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [isSearchTerm2,setIsSearchTerm2] = useContext(SearchTerm2Context);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Units");
    
            const isClickInsideTable = table && table.contains(event.target);
            const isClickInsideModal = Modal_Un?.current?.contains(event.target);
            const isClickInsideForm = Form_Un?.current?.contains(event.target);
            const isClickInsideEdit = Button_Edit_Un?.current?.contains(event.target);
            const isClickInsideDelete = Button_Delete_Un?.current?.contains(event.target);
    
            if (!isClickInsideTable && !isClickInsideModal && !isClickInsideForm && !isClickInsideEdit && !isClickInsideDelete) {
                setIsSelectedRow2(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    },[Modal_Un,Form_Un,Button_Edit_Un,Button_Delete_Un]);
    // UseEfect para pasar el valor del renglon seleccionado a los input
    useEffect(() => {
        if(isSelectedRow2 !== null){
            setIsTextFieldsUnits(prev => ({
                ...prev,
                idextent: isSelectedRow2.idmedida,
                extent: isSelectedRow2.medida,
                unit: isSelectedRow2.unidad,
                amount: isSelectedRow2.cantidad,
            }))
        }else{
            resetTextFieldsUnit();
        }
    },[isSelectedRow2]);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const {handleRowClick, nextPageUnits, prevPage, currentRecordsUnits, currentPage, totalPagesUnits} = TableActionsUnits();
    const resetTextFieldsUnit = ResetTextFieldsUnit();
    const handleModalView = HandleModalView();
    // Estructura del componente
    return(
        <>  
            <Container_Row_100_Left>
                <Icon_26><FcSearch/></Icon_26>
                <Input_Text_White_20
                    type="text"
                    placeholder="Buscar..."
                    value={isSearchTerm2}
                    onChange={(e) => setIsSearchTerm2(e.target.value)}
                />
                <Container_Row_80_Right>
                    {currentSView === 'Warehouse' && currentNView === 'Supply-Types' ? (
                        isLoggedPermissions.superadministrador ? (
                            <>
                                <Tooltip title='Agregar' placement="top">
                                    <Button_Icon_Green_60 ThemeMode={themeMode} className={isSelectedRow2 === null ? 'roll-in-button-left':'roll-out-button-left'}
                                    onClick={() => {
                                        handleModalView('Unit-Add');
                                        navigate('/Administration/Unit/Add',{ replace: true });
                                    }}>
                                        <Icon_White_18><IoIosAddCircle/></Icon_White_18>
                                    </Button_Icon_Green_60>
                                </Tooltip>
                                {isSelectedRow2 === null ? (
                                    <>
                                        <Button_Icon_Blue_60 ref={Button_Edit_Un} ThemeMode={themeMode} className={isSelectedRow2 === null ? 'roll-out-button-left':'roll-in-button-left'}
                                        disabled={isSelectedRow2 === null}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (isSelectedRow2 !== null) {
                                                handleModalView('Unit-Edit');
                                                navigate('/Administration/Unit/Edit',{ replace: true });
                                            }
                                        }}>
                                            <Icon_White_18><MdEdit/></Icon_White_18>
                                        </Button_Icon_Blue_60>
                                        <Button_Icon_Red_60 ref={Button_Delete_Un} ThemeMode={themeMode} className={isSelectedRow2 === null ? 'roll-out-button-left':'roll-in-button-left'}
                                        disabled={isSelectedRow2 === null}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (isSelectedRow2 !== null) {
                                                handleModalView('Unit-Delete');
                                                navigate('/Administration/Unit/Delete',{ replace: true });
                                            }
                                        }}>
                                            <Icon_White_18><MdDelete/></Icon_White_18>
                                        </Button_Icon_Red_60>
                                    </>
                                ):(
                                    <>
                                        <Tooltip title='Editar' placement="top">
                                            <Button_Icon_Blue_60 ref={Button_Edit_Un} ThemeMode={themeMode} className={isSelectedRow2 === null ? 'roll-out-button-left':'roll-in-button-left'}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (isSelectedRow2 !== null) {
                                                    handleModalView('Unit-Edit');
                                                    navigate('/Administration/Unit/Edit',{ replace: true });
                                                }
                                            }}>
                                                <Icon_White_18><MdEdit/></Icon_White_18>
                                            </Button_Icon_Blue_60>
                                        </Tooltip>
                                        <Tooltip title='Eliminar' placement="top">
                                            <Button_Icon_Red_60 ref={Button_Delete_Un} ThemeMode={themeMode} className={isSelectedRow2 === null ? 'roll-out-button-left':'roll-in-button-left'}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (isSelectedRow2 !== null) {
                                                    handleModalView('Unit-Delete');
                                                    navigate('/Administration/Unit/Delete',{ replace: true });
                                                }
                                            }}>
                                                <Icon_White_18><MdDelete/></Icon_White_18>
                                            </Button_Icon_Red_60>
                                        </Tooltip>  
                                    </>
                                )}
                            </>
                        ):(
                            <>
                            </>
                        )
                    ):(
                        <></>
                    )}
                </Container_Row_80_Right>
            </Container_Row_100_Left>
            <Text_Title_34_Center ThemeMode={themeMode}><FaTint/> MEDICIONES <FaWeightHanging/></Text_Title_34_Center>
            <Table id="Table-Units">
                <Thead ThemeMode={themeMode}>
                    <tr>
                        <Th>Tipo de Medición</Th>
                        <Th>Unidad de Medida</Th>
                        <Th>Cantidad</Th>
                    </tr>
                </Thead>
                <Tbody ThemeMode={themeMode}>
                    {currentRecordsUnits.map((unit) => (
                        <tr 
                            key={unit.idmedida}
                            onClick={() => handleRowClick(unit)}
                            style={{
                                backgroundColor:  isSelectedRow2 === unit ? 'rgba(255, 255, 255, 0.7)' : 'transparent',
                                cursor: 'pointer',
                                transition: 'background-color 0.5s ease',
                            }}
                        >
                            <Td ThemeMode={themeMode}>{unit.medida}</Td>
                            <Td ThemeMode={themeMode}>{unit.unidad}</Td>
                            <Td ThemeMode={themeMode}>{unit.cantidad}</Td>
                        </tr>
                    ))}
                </Tbody>
            </Table>
            <Container_Row_90_Center>
                <Tooltip title='Página anterior' placement="top">
                    <Button_Icon_Blue_180 ThemeMode={themeMode} className={currentPage === 1 ? 'roll-out-button-left' : 'roll-in-button-left'}
                        onClick={prevPage}>
                        <Icon_White_18><GrPrevious/></Icon_White_18>
                    </Button_Icon_Blue_180>
                </Tooltip>
                <Text_A_16_Center ThemeMode={themeMode}>Página {currentPage} de {totalPagesUnits}</Text_A_16_Center>
                <Tooltip title='Página siguiente' placement="top">
                    <Button_Icon_Blue_180 ThemeMode={themeMode} className={currentPage === totalPagesUnits || totalPagesUnits === 0 ? 'roll-out-button-left' : 'roll-in-button-left'}
                        onClick={nextPageUnits}>
                        <Icon_White_18><GrNext/></Icon_White_18>
                    </Button_Icon_Blue_180>
                </Tooltip>
            </Container_Row_90_Center>
        </>
    );
}