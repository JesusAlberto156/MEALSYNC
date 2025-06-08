//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Componentes de React externos
import { Tooltip } from "@mui/material"
// Contextos
import { SelectedRowContext,SelectedOptionOrderDirectionContext,SelectedOptionOrderContext } from "../../../contexts/SelectedesProvider"
import { UsersViewPasswordContext } from "../../../contexts/UsersProvider"
import { ThemeModeContext } from "../../../contexts/ViewsProvider"
import { TextFieldsUserContext } from "../../../contexts/FormsProvider"
import { RefUsersContext } from "../../../contexts/RefsProvider"
import { UserTypesContext } from "../../../contexts/UsersProvider"
// Hooks personalizados
import { ResetTextFieldsUser,ResetTextFieldsPermissions,ResetTextFieldsStatus } from "../../../hooks/Texts"
import { TableActionsUsers } from "../../../hooks/Table"
//__________ICONOS__________
// Iconos de las tablas
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
// Iconos de la paginación
import { GrNext,GrPrevious } from "react-icons/gr";
//__________ICONOS__________
// Estilos personalizados
import { Container_Row_90_Center } from "../../styled/Containers";
import { Table,Thead,Th,Tbody,Td,TContainer_Center } from "../../styled/Tables";
import { Button_Icon_Blue_180 } from "../../styled/Buttons";
import { Text_A_16_Center,Text_Fade_A_30_Center } from "../../styled/Text";
import { Icon_White_18,Icon_Button_Black_14 } from "../../styled/Icons";
import { Alert_Verification } from "../../styled/Alerts"
//____________IMPORT/EXPORT____________

// Tabla de los usuarios
export default function Table_Users(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isUsersViewPassword,setIsUsersViewPassword] = useContext(UsersViewPasswordContext);
    const {Modal_Users,Form_Users,Button_Edit_Users,Button_Delete_Users} = useContext(RefUsersContext);
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    const [isUserTypes] = useContext(UserTypesContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Users");
    
            const isClickInsideTable = table && table.contains(event.target);
            const isClickInsideModal = Modal_Users?.current?.contains(event.target);
            const isClickInsideForm = Form_Users?.current?.contains(event.target);
            const isClickInsideEdit = Button_Edit_Users?.current?.contains(event.target);
            const isClickInsideDelete = Button_Delete_Users?.current?.contains(event.target);
    
            if (!isClickInsideTable && !isClickInsideModal && !isClickInsideForm && !isClickInsideEdit && !isClickInsideDelete) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    },[Modal_Users,Form_Users,Button_Edit_Users, Button_Delete_Users]);
    // UseEffect para reiniciar la vista de contraseña
    useEffect(() => {
        let timeoutId;

        if(isUsersViewPassword){
            timeoutId = setTimeout(() => {
                const promise = new Promise((resolve,reject) => {
                    try{
                        setTimeout(() => {
                            resolve('¡Se ocultaron las contraseñas!...');
                            setTimeout(() => {
                                setIsUsersViewPassword(false);
                            },500);
                        },1000);
                    }catch(e){
                        return reject('¡Ocurrio un error inesperado!...');
                    }
                });

                Alert_Verification(promise,'¡Ocultando contraseñas!...');
            },30000);            
        }

        return () => clearTimeout(timeoutId);
    },[isUsersViewPassword])
    // UseEfect para pasar el valor del renglon seleccionado a los input
    useEffect(() => {
        if(isSelectedRow !== null){
            setIsTextFieldsUser(prev => ({
                ...prev,
                idusuario: isSelectedRow.idusuario,
                nombre: isSelectedRow.nombre,
                nombrecorto: isSelectedRow.nombrecorto,
                usuario: isSelectedRow.usuario,
                contrasena: isSelectedRow.contrasena,
                idtipo: isSelectedRow.idtipo,
            }))
        }else{
            resetTextFieldsUser();
            resetTextFieldsPermissions();
            resetTextFieldsStatus();
        }
    },[isSelectedRow])
    // Constantes con la funcionalidad de los hooks
    const {handleRowClick, nextPageUsers, prevPage, currentRecordsUsers, currentPage, totalPagesUsers, ToggleOrder, ToggleOrderDirection} = TableActionsUsers();
    const resetTextFieldsUser = ResetTextFieldsUser();
    const resetTextFieldsPermissions = ResetTextFieldsPermissions();
    const resetTextFieldsStatus = ResetTextFieldsStatus();
    // Estructura del componente
    return(
        <>
            <Table id="Table-Users">
                <Thead ThemeMode={themeMode}>
                    <tr>
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Nombre')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Nombre' ? <FaSortAlphaDown/> : <FaSortAlphaDownAlt/>} Nombre completo
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Nombre-Corto')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Nombre-Corto' ? <FaSortAlphaDown/> : <FaSortAlphaDownAlt/>} Nombre corto
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Usuario')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Usuario' ? <FaSortAlphaDown/> : <FaSortAlphaDownAlt/>} Usuario
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                        <Th>Contraseña</Th>
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Tipo')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Tipo' ? <FaSortAlphaDown/> : <FaSortAlphaDownAlt/>} Tipo de usuario
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                    </tr>
                </Thead>
                <Tbody ThemeMode={themeMode}>
                    {currentRecordsUsers.map((user) => (
                        <tr 
                            key={user.idusuario}
                            onClick={() => handleRowClick(user)}
                            style={{
                                backgroundColor:  isSelectedRow === user ? 'rgba(255, 255, 255, 0.7)' : 'transparent',
                                cursor: 'pointer',
                                transition: 'background-color 0.5s ease',
                            }}
                        >
                            <Td ThemeMode={themeMode}>{user.nombre}</Td>
                            <Td ThemeMode={themeMode}>{user.nombrecorto}</Td>
                            <Td ThemeMode={themeMode}>{user.usuario}</Td>
                            <Td ThemeMode={themeMode}>{isUsersViewPassword ? user.contrasena : '•'.repeat(8)}</Td>
                            <Td ThemeMode={themeMode}>{isUserTypes.find(type => type.idtipo === user.idtipo)?.tipo || 'Desconocido'}</Td>
                        </tr>
                    ))}
                </Tbody>
            </Table>
            {currentRecordsUsers.length !== 0 ? (
                <>
                    <Container_Row_90_Center>
                        <Tooltip title='Página anterior' placement="top">
                            <Button_Icon_Blue_180 ThemeMode={themeMode} className={currentPage === 1 ? 'roll-out-button-left' : 'roll-in-button-left'}
                                onClick={prevPage}>
                                <Icon_White_18><GrPrevious/></Icon_White_18>
                            </Button_Icon_Blue_180>
                        </Tooltip>
                        <Text_A_16_Center ThemeMode={themeMode}>Página {currentPage} de {totalPagesUsers}</Text_A_16_Center>
                        <Tooltip title='Página siguiente' placement="top">
                            <Button_Icon_Blue_180 ThemeMode={themeMode} className={currentPage === totalPagesUsers || totalPagesUsers === 0 ? 'roll-out-button-left' : 'roll-in-button-left'}
                                onClick={nextPageUsers}>
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