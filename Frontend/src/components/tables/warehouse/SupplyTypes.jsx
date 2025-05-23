//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
import { useNavigate } from "react-router-dom"
// Componentes de React externos
import { Tooltip } from "@mui/material"
// Contextos
import { SelectedRow1Context,SearchTerm1Context } from "../../../contexts/VariablesProvider"
import { ThemeModeContext,NavbarViewContext,SidebarViewContext } from "../../../contexts/ViewsProvider"
import { TextFieldsSupplyTypesContext } from "../../../contexts/FormsProvider"
import { RefSupplyTypesContext } from "../../../contexts/RefsProvider"
import { UnitsContext } from "../../../contexts/WarehouseProvider"
import { LoggedPermissionsContext } from "../../../contexts/SessionProvider"
// Hooks personalizados
import { ResetTextFieldsSupplyType } from "../../../hooks/Texts"
import { TableActionsSupplyTypes } from "../../../hooks/Table"
import { HandleModalView } from "../../../hooks/Views"
//__________ICONOS__________
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
import { Button_Icon_Blue_180,Button_Icon_Blue_60,Button_Icon_Green_60,Button_Icon_Red_60 } from "../../styled/Buttons";
import { Text_A_16_Center,Text_Title_34_Center,Text_Fade_A_30_Center } from "../../styled/Text";
import { Icon_White_18,Icon_26 } from "../../styled/Icons";
import { Input_Text_White_20 } from "../../styled/Inputs"
// Componentes personalizados
import Table_Units from "./Units"
//____________IMPORT/EXPORT____________

// Tabla de los tipos de insumos
export default function Table_Supply_Types(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSelectedRow1,setIsSelectedRow1] = useContext(SelectedRow1Context);
    const {Modal_ST,Form_ST,Button_Edit_ST,Button_Delete_ST} = useContext(RefSupplyTypesContext);
    const [isTextFieldsSupplyTypes,setIsTextFieldsSupplyTypes] = useContext(TextFieldsSupplyTypesContext);
    const [isUnits] = useContext(UnitsContext);
    const [isSearchTerm1,setIsSearchTerm1] = useContext(SearchTerm1Context);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [isLoggedPermissions] = useContext(LoggedPermissionsContext);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Supply-Types");
    
            const isClickInsideTable = table && table.contains(event.target);
            const isClickInsideModal = Modal_ST?.current?.contains(event.target);
            const isClickInsideForm = Form_ST?.current?.contains(event.target);
            const isClickInsideEdit = Button_Edit_ST?.current?.contains(event.target);
            const isClickInsideDelete = Button_Delete_ST?.current?.contains(event.target);
    
            if (!isClickInsideTable && !isClickInsideModal && !isClickInsideForm && !isClickInsideEdit && !isClickInsideDelete) {
                setIsSelectedRow1(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    },[Modal_ST,Form_ST,Button_Edit_ST,Button_Delete_ST]);
    // UseEfect para pasar el valor del renglon seleccionado a los input
    useEffect(() => {
        if(isSelectedRow1 !== null){
            setIsTextFieldsSupplyTypes(prev => ({
                ...prev,
                idtype: isSelectedRow1.idtipo,
                type: isSelectedRow1.tipo,
                description: isSelectedRow1.descripcion,
                idunits: isSelectedRow1.idmedida,
            }))
        }else{
            resetTextFieldsSupplyType();
        }
    },[isSelectedRow1])
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const {handleRowClick, nextPageSupplyTypes, prevPage, currentRecordsSupplyTypes, currentPage, totalPagesSupplyTypes} = TableActionsSupplyTypes();
    const resetTextFieldsSupplyType = ResetTextFieldsSupplyType();
    const handleModalView = HandleModalView();
    // Estructura del componente
    return(
        <>  
            <Container_Row_100_Left>
                <Icon_26><FcSearch/></Icon_26>
                <Input_Text_White_20
                    type="text"
                    placeholder="Buscar..."
                    value={isSearchTerm1}
                    onChange={(e) => setIsSearchTerm1(e.target.value)}
                />
                <Container_Row_80_Right>
                    {currentSView === 'Warehouse' && currentNView === 'Supply-Types' ? (
                        isLoggedPermissions.superadministrador ? (
                            <>
                                <Tooltip title='Agregar' placement="top">
                                    <Button_Icon_Green_60 ThemeMode={themeMode} className={isSelectedRow1 === null ? 'roll-in-button-left':'roll-out-button-left'}
                                    onClick={() => {
                                        handleModalView('Supply-Type-Add');
                                        navigate('/Administration/Supply-Type/Add',{ replace: true });
                                    }}>
                                        <Icon_White_18><IoIosAddCircle/></Icon_White_18>
                                    </Button_Icon_Green_60>
                                </Tooltip>
                                {isSelectedRow1 === null ? (
                                    <>
                                        <Button_Icon_Blue_60 ref={Button_Edit_ST} ThemeMode={themeMode} className={isSelectedRow1 === null ? 'roll-out-button-left':'roll-in-button-left'}
                                        disabled={isSelectedRow1 === null}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (isSelectedRow1 !== null) {
                                                handleModalView('Supply-Type-Edit');
                                                navigate('/Administration/Supply-Type/Edit',{ replace: true });
                                            }
                                        }}>
                                            <Icon_White_18><MdEdit/></Icon_White_18>
                                        </Button_Icon_Blue_60>
                                        <Button_Icon_Red_60 ref={Button_Delete_ST} ThemeMode={themeMode} className={isSelectedRow1 === null ? 'roll-out-button-left':'roll-in-button-left'}
                                        disabled={isSelectedRow1 === null}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (isSelectedRow1 !== null) {
                                                handleModalView('Supply-Type-Delete');
                                                navigate('/Administration/Supply-Type/Delete',{ replace: true });
                                            }
                                        }}>
                                            <Icon_White_18><MdDelete/></Icon_White_18>
                                        </Button_Icon_Red_60>
                                    </>
                                ):(
                                    <>
                                        <Tooltip title='Editar' placement="top">
                                            <Button_Icon_Blue_60 ref={Button_Edit_ST} ThemeMode={themeMode} className={isSelectedRow1 === null ? 'roll-out-button-left':'roll-in-button-left'}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (isSelectedRow1 !== null) {
                                                    handleModalView('Supply-Type-Edit');
                                                    navigate('/Administration/Supply-Type/Edit',{ replace: true });
                                                }
                                            }}>
                                                <Icon_White_18><MdEdit/></Icon_White_18>
                                            </Button_Icon_Blue_60>
                                        </Tooltip>
                                        <Tooltip title='Eliminar' placement="top">
                                            <Button_Icon_Red_60 ref={Button_Delete_ST} ThemeMode={themeMode} className={isSelectedRow1 === null ? 'roll-out-button-left':'roll-in-button-left'}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (isSelectedRow1 !== null) {
                                                    handleModalView('Supply-Type-Delete');
                                                    navigate('/Administration/Supply-Type/Delete',{ replace: true });
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
            <Text_Title_34_Center ThemeMode={themeMode}>TIPOS DE INSUMOS</Text_Title_34_Center>
            <Table id="Table-Supply-Types">
                <Thead ThemeMode={themeMode}>
                    <tr>
                        <Th>Tipo</Th>
                        <Th>Descripción</Th>
                        <Th>Tipo de Medición</Th>
                    </tr>
                </Thead>
                <Tbody ThemeMode={themeMode}>
                    {currentRecordsSupplyTypes.map((type) => (
                        <tr 
                            key={type.idtipo}
                            onClick={() => handleRowClick(type)}
                            style={{
                                backgroundColor:  isSelectedRow1 === type ? 'rgba(255, 255, 255, 0.7)' : 'transparent',
                                cursor: 'pointer',
                                transition: 'background-color 0.5s ease',
                            }}
                        >
                            <Td ThemeMode={themeMode}>{type.tipo}</Td>
                            <Td ThemeMode={themeMode}>{type.descripcion}</Td>
                            <Td ThemeMode={themeMode}>
                                {(() => {
                                    const unit = isUnits.find(unit => unit.idmedida === type.idmedida);
                                    return unit?.medida || 'Desconocido';
                                })()}
                            </Td>
                        </tr>
                    ))}
                </Tbody>
            </Table>
            {currentRecordsSupplyTypes.length !== 0 ? (
                <>
                    <Container_Row_90_Center>
                        <Tooltip title='Página anterior' placement="top">
                            <Button_Icon_Blue_180 ThemeMode={themeMode} className={currentPage === 1 ? 'roll-out-button-left' : 'roll-in-button-left'}
                                onClick={prevPage}>
                                <Icon_White_18><GrPrevious/></Icon_White_18>
                            </Button_Icon_Blue_180>
                        </Tooltip>
                        <Text_A_16_Center ThemeMode={themeMode}>Página {currentPage} de {totalPagesSupplyTypes}</Text_A_16_Center>
                        <Tooltip title='Página siguiente' placement="top">
                            <Button_Icon_Blue_180 ThemeMode={themeMode} className={currentPage === totalPagesSupplyTypes || totalPagesSupplyTypes === 0 ? 'roll-out-button-left' : 'roll-in-button-left'}
                                onClick={nextPageSupplyTypes}>
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
            <Table_Units/>
        </>
    );
}