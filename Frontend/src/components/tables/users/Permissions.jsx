//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Componentes de React externos
import { Tooltip } from "@mui/material"
// Contextos
import { SelectedRowContext } from "../../../contexts/VariablesProvider"
import { UsersContext } from "../../../contexts/UsersProvider"
import { LoggedPermissionsContext } from "../../../contexts/SessionProvider"
import { ThemeModeContext } from "../../../contexts/ViewsProvider"
import { TextFieldsPermissionsContext } from "../../../contexts/FormsProvider"
import { RefPermissionsContext } from "../../../contexts/RefsProvider"
// Hooks personalizados
import { TableActionsPermissions } from "../../../hooks/Table"
import { ResetTextFieldsPermissions } from "../../../hooks/Texts"
//__________ICONOS__________
// Iconos utilizados en las tablas
// Iconos de la sección de Administración del login
import { FaShieldAlt,FaUserTie } from "react-icons/fa";
// Iconos de la paginación
import { GrNext,GrPrevious } from "react-icons/gr";
//__________ICONOS__________
// Estilos personalizados
import { Container_Row_90_Center } from "../../styled/Containers";
import { Table,Thead,Th,Tbody,Td } from "../../styled/Tables";
import { Button_Icon_Blue_180 } from "../../styled/Buttons";
import { Text_A_16_Center } from "../../styled/Text";
import { Icon_Green_18,Icon_Red_18,Icon_White_18 } from "../../styled/Icons";
//____________IMPORT/EXPORT____________

// Tabla de los permisos de usuarios
export default function Table_Permissions(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isPermission] = useContext(LoggedPermissionsContext);
    const [isUsers] = useContext(UsersContext);
    const [isTextFieldsPermissions,setIsTextFieldsPermissions] = useContext(TextFieldsPermissionsContext);
    const {Modal,Form,Button_Edit_P,Button_Enable_P} = useContext(RefPermissionsContext);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Permissions");

            const isClickInsideTable = table && table.contains(event.target);
            const isClickInsideModal = Modal?.current?.contains(event.target);
            const isClickInsideForm = Form?.current?.contains(event.target);
            const isClickInsideEdit = Button_Edit_P?.current?.contains(event.target);
            const isClickInsideEnable = Button_Enable_P?.current?.contains(event.target);

            if (!isClickInsideTable && !isClickInsideModal && !isClickInsideForm && !isClickInsideEdit && !isClickInsideEnable) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    },[Modal,Form,Button_Edit_P,Button_Enable_P]);
    // UseEffect que pasa el valor a un check con la selección de la tabla
    useEffect(() => {
        if(isSelectedRow !== null){
            setIsTextFieldsPermissions(prev => ({
                ...prev,
                iduser: isSelectedRow.idusuario,
                user: isUsers.find(user => user.idusuario === isSelectedRow.idusuario)?.usuario || 'Desconocido',
                administrator: isSelectedRow.administrador,
                chef: isSelectedRow.chef,
                storekeeper: isSelectedRow.almacenista,
                cook: isSelectedRow.cocinero,
                nutritionist: isSelectedRow.nutriologo,
                doctor: isSelectedRow.medico,
            }));

        }else{
            resetTextFieldsPermissions();
        }
    },[isSelectedRow])
    // Constantes con la funcionalidad de los hooks
    const resetTextFieldsPermissions = ResetTextFieldsPermissions();
    const {handleRowClick, nextPagePermissions, prevPage, currentRecordsPermissions, currentPage, totalPagesPermissions} = TableActionsPermissions();
    // Estructura del componente
    return(
        <>
            <Table id="Table-Permissions">
                <Thead ThemeMode={themeMode}>
                    <tr>
                        <Th>Usuario (nombre completo)</Th>
                        <Th>Administrador</Th>
                        <Th>Chef</Th>
                        <Th>Almacenista</Th>
                        <Th>Cocinero</Th>
                        <Th>Nutriologo</Th>
                        <Th>Medico</Th>
                        {isPermission.superadministrador ? (
                            <Th>Super Administrador</Th>
                        ):(
                            <></>
                        )}
                    </tr>
                </Thead>
                <Tbody ThemeMode={themeMode}>
                    {isUsers.map((user) => (
                        currentRecordsPermissions.filter((permission) => user.idusuario === permission.idusuario).map((permission) => (
                            <tr
                                key={permission.idpermiso}
                                onClick={() => handleRowClick(permission)}
                                style={{
                                    backgroundColor: isSelectedRow === permission ? 'rgba(255, 255, 255, 0.7)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.5s ease',
                                }}
                            >
                                <Td ThemeMode={themeMode}>{user.nombre}</Td>
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
                        ))
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
                <Text_A_16_Center ThemeMode={themeMode}>Página {currentPage} de {totalPagesPermissions}</Text_A_16_Center>
                <Tooltip title='Página siguiente' placement="top">
                    <Button_Icon_Blue_180 ThemeMode={themeMode} className={currentPage === totalPagesPermissions || totalPagesPermissions === 0 ? 'roll-out-button-left' : 'roll-in-button-left'}
                        onClick={nextPagePermissions}>
                        <Icon_White_18><GrNext/></Icon_White_18>
                    </Button_Icon_Blue_180>
                </Tooltip>
            </Container_Row_90_Center>
        </>
    );
}