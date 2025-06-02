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
// Hooks personalizados
import { HandleModalView } from "../../../../hooks/Views";
import { HandlePermissionsEdit } from "../../../../hooks/Form";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { MdEdit } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_450,Container_Row_95_Center,Container_Row_NG_90_Left,Container_Row_NG_95_Left } from "../../../styled/Containers";
import { Button_Icon_Red_180,Button_Icon_Blue_180 } from "../../../styled/Buttons";
import { Icon_White_22 } from "../../../styled/Icons";
import { Text_Title_30_Center,Text_A_16_Left,Text_Blue_16_Left } from "../../../styled/Text";
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
    const {Modal,Form,Button_Edit_P,Button_Enable_P} = useContext(RefPermissionsContext);
    const [socket] = useContext(SocketContext);
    const [isPermissionsEdit,setIsPermissionsEdit] = useContext(PermissionsEditContext);
    const [isTextFieldsPermissions,setIsTextFieldsPermissions] = useContext(TextFieldsPermissionsContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const handlePermissionsEdit = HandlePermissionsEdit();
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isPermissionsEdit){
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Permissions-Update',isTextFieldsPermissions.iduser,isTextFieldsPermissions.user,isTextFieldsPermissions.administrator,isTextFieldsPermissions.chef,isTextFieldsPermissions.storekeeper,isTextFieldsPermissions.cook,isTextFieldsPermissions.nutritionist,isTextFieldsPermissions.doctor)

                        resolve('¡MEALSYNC edito los permisos al usuario!...')
                        
                        const route = sessionStorage.getItem('Route');

                        setCurrentMView('');
                        sessionStorage.setItem('Modal-View','');
                        setTimeout(() => {
                            setIsModal(false);
                            sessionStorage.setItem('Modal',false);
                            setIsActionBlock(false);
                            setIsPermissionsEdit(false);
                            setIsSelectedRow(null);
                            navigate(route,{ replace: true });
                        },750);
                    },2000);
                }catch(error){
                    setIsActionBlock(false);
                    setIsPermissionsEdit(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            }); 
            
            Alert_Verification(promise,'¡Editando permisos a un usuario!...');
        }
    },[isPermissionsEdit]);
    // UseEffect para quitar la suscrpcion de socket
    useEffect(() => {
        const handlePermissionsUpdate = (message,user) => {
            console.log(message,user);
            socket.emit('Permissions');
        };

        socket.on('Permissions-Update',handlePermissionsUpdate);
        
        return () => {
            socket.off('Permissions-Update',handlePermissionsUpdate);
        }
    },[socket])
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <>
                    <Container_Modal ref={Modal}>
                        <Container_Form_450 ref={Form} ThemeMode={themeMode} className={currentMView === 'Permissions-Edit' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Text_Title_30_Center ThemeMode={themeMode}>EDITAR PERMISOS</Text_Title_30_Center>
                            <Container_Row_NG_90_Left className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                <Text_A_16_Left ThemeMode={themeMode}>- Usuario: {isTextFieldsPermissions.user}</Text_A_16_Left>
                            </Container_Row_NG_90_Left>
                            <Container_Row_NG_95_Left>
                                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                <Text_A_16_Left ThemeMode={themeMode}>- Área de administración...</Text_A_16_Left>
                            </Container_Row_NG_95_Left>
                            <Container_Row_95_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Label_Text_16_Center ThemeMode={themeMode}>
                                    <Input_Checkbox_16 ThemeMode={themeMode}
                                        type="checkbox"
                                        checked={isTextFieldsPermissions.administrator}
                                        onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, administrator: e.target.checked ? 1 : 0}))}
                                    />
                                    Administrador
                                </Label_Text_16_Center>
                                <Label_Text_16_Center ThemeMode={themeMode}>
                                    <Input_Checkbox_16 ThemeMode={themeMode}
                                        type="checkbox"
                                        checked={isTextFieldsPermissions.chef}
                                        onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, chef: e.target.checked ? 1 : 0}))}
                                    />
                                    Chef
                                </Label_Text_16_Center>
                                <Label_Text_16_Center ThemeMode={themeMode}>
                                    <Input_Checkbox_16 ThemeMode={themeMode}
                                        type="checkbox"
                                        checked={isTextFieldsPermissions.storekeeper}
                                        onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, storekeeper: e.target.checked ? 1 : 0}))}
                                    />
                                    Almacenista
                                </Label_Text_16_Center>
                            </Container_Row_95_Center>
                            <Container_Row_NG_95_Left>
                                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                <Text_A_16_Left ThemeMode={themeMode}>Área de cocina...</Text_A_16_Left>
                            </Container_Row_NG_95_Left>
                            <Container_Row_95_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Label_Text_16_Center ThemeMode={themeMode}>
                                    <Input_Checkbox_16 ThemeMode={themeMode}
                                        type="checkbox"
                                        checked={isTextFieldsPermissions.cook}
                                        onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, cook: e.target.checked ? 1 : 0}))}
                                    />
                                    Cocinero
                                </Label_Text_16_Center>
                                <Label_Text_16_Center ThemeMode={themeMode}>
                                    <Input_Checkbox_16 ThemeMode={themeMode}
                                        type="checkbox"
                                        checked={isTextFieldsPermissions.nutritionist}
                                        onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, nutritionist: e.target.checked ? 1 : 0}))}
                                    />
                                    Nutriólogo
                                </Label_Text_16_Center>
                                <Label_Text_16_Center ThemeMode={themeMode}>
                                    <Input_Checkbox_16 ThemeMode={themeMode}
                                        type="checkbox"
                                        checked={isTextFieldsPermissions.doctor}
                                        onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, doctor: e.target.checked ? 1 : 0}))}
                                    />
                                    Médico
                                </Label_Text_16_Center>
                            </Container_Row_95_Center>
                            <Container_Row_95_Center>
                                <Tooltip title='Cancelar' placement='top'>
                                    <Button_Icon_Red_180 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalView('')}>
                                        <Icon_White_22><MdCancel/></Icon_White_22>
                                    </Button_Icon_Red_180>
                                </Tooltip>
                                <Tooltip title='Editar' placement='top'>
                                    <Button_Icon_Blue_180 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                        onClick={() => handlePermissionsEdit()}>
                                        <Icon_White_22><MdEdit/></Icon_White_22>
                                    </Button_Icon_Blue_180>
                                </Tooltip>
                            </Container_Row_95_Center>
                        </Container_Form_450>
                    </Container_Modal>  
                </>
            ):(
                currentMView === 'Permissions-Edit' ? (
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