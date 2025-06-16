//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Componentes de React externos
import { Tooltip } from "@mui/material"
// Contextos
import { SelectedRowContext,SelectedOptionOrderDirectionContext,SelectedOptionOrderContext } from "../../../contexts/SelectedesProvider"
import { UsersContext } from "../../../contexts/UsersProvider"
import { LoggedPermissionsContext } from "../../../contexts/SessionProvider"
import { ThemeModeContext } from "../../../contexts/ViewsProvider"
import { TextFieldsPermissionsContext } from "../../../contexts/FormsProvider"
import { RefPermissionsContext } from "../../../contexts/RefsProvider"
// Hooks personalizados
import { TableActionsPermissions } from "../../../hooks/users/Tables"
import { ResetTextFieldsPermissions,ResetTextFieldsUser,ResetTextFieldsStatus } from "../../../hooks/users/Texts"
//__________ICONOS__________
// Iconos utilizados en las tablas
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
// Iconos de la sección de Administración del login
import { FaShieldAlt,FaUserTie } from "react-icons/fa";
// Iconos de la paginación
import { GrNext,GrPrevious } from "react-icons/gr";
//__________ICONOS__________
// Estilos personalizados
import { Container_Row_90_Center } from "../../styled/Containers";
import { Table,Thead,Th,Tbody,Td,TContainer_Center } from "../../styled/Tables";
import { Button_Icon_Blue_180 } from "../../styled/Buttons";
import { Text_A_16_Center,Text_Fade_A_30_Center } from "../../styled/Text";
import { Icon_Green_18,Icon_Red_18,Icon_White_18,Icon_Button_Black_14 } from "../../styled/Icons";
//____________IMPORT/EXPORT____________

// Tabla de los permisos de usuarios
export default function Table_Permissions(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isPermission] = useContext(LoggedPermissionsContext);
    const [isUsers] = useContext(UsersContext);
    const [isTextFieldsPermissions,setIsTextFieldsPermissions] = useContext(TextFieldsPermissionsContext);
    const {Modal_Permissions,Form_Permissions,Button_Edit_Permissions,Button_Enable_Permissions} = useContext(RefPermissionsContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Permissions");

            const isClickInsideTable = table && table.contains(event.target);
            const isClickInsideModal = Modal_Permissions?.current?.contains(event.target);
            const isClickInsideForm = Form_Permissions?.current?.contains(event.target);
            const isClickInsideEdit = Button_Edit_Permissions?.current?.contains(event.target);
            const isClickInsideEnable = Button_Enable_Permissions?.current?.contains(event.target);

            if (!isClickInsideTable && !isClickInsideModal && !isClickInsideForm && !isClickInsideEdit && !isClickInsideEnable) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    },[Modal_Permissions,Form_Permissions,Button_Edit_Permissions,Button_Enable_Permissions]);
    // UseEffect que pasa el valor a un check con la selección de la tabla
    useEffect(() => {
        if(isSelectedRow !== null){
            setIsTextFieldsPermissions(prev => ({
                ...prev,
                idpermiso: isSelectedRow.idpermiso,
                idusuario: isSelectedRow.idusuario,
                usuario: isUsers.find(user => user.idusuario === isSelectedRow.idusuario)?.usuario || 'Desconocido',
                administrador: isSelectedRow.administrador,
                chef: isSelectedRow.chef,
                almacenista: isSelectedRow.almacenista,
                cocinero: isSelectedRow.cocinero,
                nutriologo: isSelectedRow.nutriologo,
                medico: isSelectedRow.medico,
                superadministrador: isSelectedRow.superadministrador,
            }));
        }else{
            resetTextFieldsUser();
            resetTextFieldsPermissions();
            resetTextFieldsStatus();
        }
    },[isSelectedRow])
    // Constantes con la funcionalidad de los hooks
    const resetTextFieldsUser = ResetTextFieldsUser();
    const resetTextFieldsPermissions = ResetTextFieldsPermissions();
    const resetTextFieldsStatus = ResetTextFieldsStatus();
    const {handleRowClick, nextPagePermissions, prevPage, currentRecordsPermissions, currentPage, totalPagesPermissions, ToggleOrder, ToggleOrderDirection} = TableActionsPermissions();
    // Estructura del componente
    return(
        <>
            <Table id="Table-Permissions">
                <Thead ThemeMode={themeMode}>
                    <tr>
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Nombre')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Nombre' ? <FaSortAlphaDown/> : <FaSortAlphaDownAlt/>} Usuario
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Administrador')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Administrador' ? <FaLongArrowAltUp/> : <FaLongArrowAltDown/>} Administrador
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Chef')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Chef' ? <FaLongArrowAltUp/> : <FaLongArrowAltDown/>} Chef
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Almacenista')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Almacenista' ? <FaLongArrowAltUp/> : <FaLongArrowAltDown/>} Almacenista
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Cocinero')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Cocinero' ? <FaLongArrowAltUp/> : <FaLongArrowAltDown/>} Cocinero
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Nutriologo')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Nutriologo' ? <FaLongArrowAltUp/> : <FaLongArrowAltDown/>} Nutriólogo
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Medico')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Medico' ? <FaLongArrowAltUp/> : <FaLongArrowAltDown/>} Médico
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                        {isPermission.superadministrador ? (
                            <Th>
                                <TContainer_Center>
                                    <Icon_Button_Black_14 onClick={() => {
                                            ToggleOrder('Super-Administrador')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Super-Administrador' ? <FaLongArrowAltUp/> : <FaLongArrowAltDown/>} Super Administrador
                                    </Icon_Button_Black_14>
                                </TContainer_Center>
                            </Th>
                        ):(
                            <></>
                        )}
                    </tr>
                </Thead>
                <Tbody ThemeMode={themeMode}>
                    {currentRecordsPermissions.map((permission) => (
                        <tr
                            key={permission.idpermiso}
                            onClick={() => handleRowClick(permission)}
                            style={{
                                backgroundColor: isSelectedRow === permission ? 'rgba(255, 255, 255, 0.7)' : 'transparent',
                                cursor: 'pointer',
                                transition: 'background-color 0.5s ease',
                            }}
                        >
                            <Td ThemeMode={themeMode}>{isUsers.find(user => user.idusuario === permission.idusuario)?.nombre || 'Desconocido'}</Td>
                            <Td ThemeMode={themeMode}>{permission.administrador ? <Icon_Green_18 ThemeMode={themeMode} className="pulsate-icon"><FaShieldAlt/></Icon_Green_18>:<Icon_Red_18 ThemeMode={themeMode} className="pulsate-icon"><FaShieldAlt/></Icon_Red_18>}</Td>
                            <Td ThemeMode={themeMode}>{permission.chef ? <Icon_Green_18 ThemeMode={themeMode} className="pulsate-icon"><FaShieldAlt/></Icon_Green_18>:<Icon_Red_18 ThemeMode={themeMode} className="pulsate-icon"><FaShieldAlt/></Icon_Red_18>}</Td>
                            <Td ThemeMode={themeMode}>{permission.almacenista ? <Icon_Green_18 ThemeMode={themeMode} className="pulsate-icon"><FaShieldAlt/></Icon_Green_18>:<Icon_Red_18 ThemeMode={themeMode} className="pulsate-icon"><FaShieldAlt/></Icon_Red_18>}</Td>
                            <Td ThemeMode={themeMode}>{permission.cocinero ? <Icon_Green_18 ThemeMode={themeMode} className="pulsate-icon"><FaShieldAlt/></Icon_Green_18>:<Icon_Red_18 ThemeMode={themeMode} className="pulsate-icon"><FaShieldAlt/></Icon_Red_18>}</Td>
                            <Td ThemeMode={themeMode}>{permission.nutriologo ? <Icon_Green_18 ThemeMode={themeMode} className="pulsate-icon"><FaShieldAlt/></Icon_Green_18>:<Icon_Red_18 ThemeMode={themeMode} className="pulsate-icon"><FaShieldAlt/></Icon_Red_18>}</Td>
                            <Td ThemeMode={themeMode}>{permission.medico ? <Icon_Green_18 ThemeMode={themeMode} className="pulsate-icon"><FaShieldAlt/></Icon_Green_18>:<Icon_Red_18 ThemeMode={themeMode} className="pulsate-icon"><FaShieldAlt/></Icon_Red_18>}</Td>
                            {isPermission.superadministrador ? (
                                <Td ThemeMode={themeMode}>{permission.superadministrador ? <Icon_Green_18 ThemeMode={themeMode} className="pulsate-icon"><FaUserTie/></Icon_Green_18>:<Icon_Red_18 ThemeMode={themeMode} className="pulsate-icon"><FaUserTie/></Icon_Red_18>}</Td>
                            ):(
                                <></>
                            )}
                        </tr>
                    ))}
                </Tbody>
            </Table>
            {currentRecordsPermissions.length !== 0 ? (
                <>
                    <Container_Row_90_Center>
                        <Tooltip title='Página anterior' placement="top">
                            <Button_Icon_Blue_180 ThemeMode={themeMode} className={currentPage === 1 ? 'roll-out-button-left' : 'roll-in-button-left'}
                                onClick={prevPage}>
                                <Icon_White_18><GrPrevious/></Icon_White_18>
                            </Button_Icon_Blue_180>
                        </Tooltip>
                        <Text_A_16_Center ThemeMode={themeMode}>Página {currentPage} de {totalPagesPermissions}</Text_A_16_Center>
                        <Tooltip title='Página siguiente' placement="top">
                            <Button_Icon_Blue_180 ThemeMode={themeMode} className={currentPage === totalPagesPermissions || totalPagesPermissions === 0 ? 'roll-out-button-left' : 'roll-in-button-left'}
                                onClick={nextPagePermissions}>
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