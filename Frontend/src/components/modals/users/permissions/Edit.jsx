//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,ModalContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { TextFieldsPermissionsContext } from "../../../../contexts/FormsProvider";
import { ActionBlockContext } from "../../../../contexts/VariablesProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { RefPermissionsContext } from "../../../../contexts/RefsProvider";
import { PermissionsEditContext } from "../../../../contexts/UsersProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
import { UsersContext } from "../../../../contexts/UsersProvider";
// Hooks personalizados
import { HandleModalViewUsers } from "../../../../hooks/users/Views";
import { HandlePermissionsEdit } from "../../../../hooks/users/Forms";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { MdEdit } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_450,Container_Row_95_Center,Container_Row_NG_90_Center,Container_Column_90_Center,Container_Row_NG_95_Center } from "../../../styled/Containers";
import { Button_Icon_Red_180,Button_Icon_Blue_180 } from "../../../styled/Buttons";
import { Icon_White_22 } from "../../../styled/Icons";
import { Text_Title_32_Black,Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Span_12_Justify_Black } from "../../../styled/Text";
import { Label_Text_16_Center } from "../../../styled/Labels";
import { Input_Checkbox_16 } from "../../../styled/Inputs";
import { Alert_Verification } from "../../../styled/Alerts";
// Componentes personalizados
import Error_Edit from "../../errors/Edit";
//____________IMPORT/EXPORT____________

// Modal para editar permisos a los usuarios
export default function Permissions_Edit(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const {Modal_Permissions,Form_Permissions,Button_Edit_Permissions,Button_Enable_Permissions} = useContext(RefPermissionsContext);
    const [socket] = useContext(SocketContext);
    const [isPermissionsEdit,setIsPermissionsEdit] = useContext(PermissionsEditContext);
    const [isTextFieldsPermissions,setIsTextFieldsPermissions] = useContext(TextFieldsPermissionsContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isUsers] = useContext(UsersContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewUsers = HandleModalViewUsers();
    const handlePermissionsEdit = HandlePermissionsEdit();
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isPermissionsEdit){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Update-Permissions',isUsers.find(user => user.idusuario === isTextFieldsPermissions.idusuario)?.usuario,isLoggedUser.idusuario,isTextFieldsPermissions.idpermiso,isTextFieldsPermissions.administrador,isTextFieldsPermissions.chef,isTextFieldsPermissions.almacenista,isTextFieldsPermissions.cocinero,isTextFieldsPermissions.nutriologo,isTextFieldsPermissions.medico,isTextFieldsPermissions.idusuario)
                        
                        resolve('¡MEALSYNC editó los permisos al usuario!...')
                        
                        setIsPermissionsEdit(false);
                        
                        const route = sessionStorage.getItem('Ruta');

                        setCurrentMView('');
                        sessionStorage.setItem('Vista del Modal','');
                        setTimeout(() => {
                            setIsModal(false);
                            sessionStorage.setItem('Estado del Modal',false);
                            setIsActionBlock(false);
                            setIsSelectedRow(null);
                            navigate(route,{ replace: true });
                        },750);
                    },2000);
                }catch(e){
                    setIsActionBlock(false);
                    setIsPermissionsEdit(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            }); 
            
            Alert_Verification(promise,'¡Editando permisos a un usuario!...');
        }
    },[isPermissionsEdit]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <>
                    <Container_Modal ref={Modal_Permissions}>
                        <Container_Form_450 ref={Form_Permissions} ThemeMode={themeMode} className={currentMView === 'Permisos-Editar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Text_Title_32_Black ThemeMode={themeMode}>EDITAR PERMISOS</Text_Title_32_Black>
                            <Container_Row_95_Center>
                                <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}>- Datos generales...</Text_Span_16_Center_Black>
                            </Container_Row_95_Center>
                            <Container_Row_NG_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Text_Color_Blue_16 ThemeMode={themeMode}>Usuario:</Text_Color_Blue_16>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}>{isTextFieldsPermissions.usuario}</Text_Span_16_Center_Black>
                            </Container_Row_NG_90_Center>
                            <Container_Row_95_Center>
                                <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}>- Datos especificos...</Text_Span_16_Center_Black>
                            </Container_Row_95_Center>
                            <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Container_Row_NG_95_Center>
                                    <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black ThemeMode={themeMode}>- Área de administración...</Text_Span_16_Center_Black>
                                </Container_Row_NG_95_Center>
                                <Container_Row_95_Center>
                                    <Label_Text_16_Center ThemeMode={themeMode}>
                                        <Input_Checkbox_16 ThemeMode={themeMode}
                                            type="checkbox"
                                            disabled={isActionBlock}
                                            checked={isTextFieldsPermissions.administrador}
                                            onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, administrador: e.target.checked ? 1 : 0}))}
                                        />
                                        Administrador
                                    </Label_Text_16_Center>
                                    <Label_Text_16_Center ThemeMode={themeMode}>
                                        <Input_Checkbox_16 ThemeMode={themeMode}
                                            type="checkbox"
                                            disabled={isActionBlock}
                                            checked={isTextFieldsPermissions.chef}
                                            onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, chef: e.target.checked ? 1 : 0}))}
                                        />
                                        Chef
                                    </Label_Text_16_Center>
                                    <Label_Text_16_Center ThemeMode={themeMode}>
                                        <Input_Checkbox_16 ThemeMode={themeMode}
                                            type="checkbox"
                                            disabled={isActionBlock}
                                            checked={isTextFieldsPermissions.almacenista}
                                            onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, almacenista: e.target.checked ? 1 : 0}))}
                                        />
                                        Almacenista
                                    </Label_Text_16_Center>
                                </Container_Row_95_Center>
                                <Container_Row_NG_95_Center>
                                    <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black ThemeMode={themeMode}>- Área de cocina...</Text_Span_16_Center_Black>
                                </Container_Row_NG_95_Center>
                                <Container_Row_95_Center>
                                    <Label_Text_16_Center ThemeMode={themeMode}>
                                        <Input_Checkbox_16 ThemeMode={themeMode}
                                            type="checkbox"
                                            disabled={isActionBlock}
                                            checked={isTextFieldsPermissions.cocinero}
                                            onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, cocinero: e.target.checked ? 1 : 0}))}
                                        />
                                        Cocinero
                                    </Label_Text_16_Center>
                                    <Label_Text_16_Center ThemeMode={themeMode}>
                                        <Input_Checkbox_16 ThemeMode={themeMode}
                                            type="checkbox"
                                            disabled={isActionBlock}
                                            checked={isTextFieldsPermissions.nutriologo}
                                            onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, nutriologo: e.target.checked ? 1 : 0}))}
                                        />
                                        Nutriólogo
                                    </Label_Text_16_Center>
                                    <Label_Text_16_Center ThemeMode={themeMode}>
                                        <Input_Checkbox_16 ThemeMode={themeMode}
                                            type="checkbox"
                                            disabled={isActionBlock}
                                            checked={isTextFieldsPermissions.medico}
                                            onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, medico: e.target.checked ? 1 : 0}))}
                                        />
                                        Médico
                                    </Label_Text_16_Center>
                                </Container_Row_95_Center>
                            </Container_Column_90_Center>
                            <Container_Row_95_Center>
                                <Text_Span_12_Justify_Black ThemeMode={themeMode}>Si se le retira el permiso mientras el usuario tiene una sesión activa con dicho permiso, su sesión se cerrará de forma inmediata.</Text_Span_12_Justify_Black>
                            </Container_Row_95_Center>
                            <Container_Row_95_Center>
                                <Tooltip title='Cancelar' placement='top'>
                                    <Button_Icon_Red_180 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalViewUsers('')}
                                        disabled={isActionBlock}
                                    >
                                        <Icon_White_22><MdCancel/></Icon_White_22>
                                    </Button_Icon_Red_180>
                                </Tooltip>
                                <Tooltip title='Editar' placement='top'>
                                    <Button_Icon_Blue_180 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                        onClick={() => handlePermissionsEdit()}
                                        disabled={isActionBlock}
                                    >
                                        <Icon_White_22><MdEdit/></Icon_White_22>
                                    </Button_Icon_Blue_180>
                                </Tooltip>
                            </Container_Row_95_Center>
                        </Container_Form_450>
                    </Container_Modal>  
                </>
            ):(
                currentMView === 'Permisos-Editar' ? (
                    <>
                        <Error_Edit/>
                    </>
                ):(
                    <></>
                )
            )}
        </>
    );
}