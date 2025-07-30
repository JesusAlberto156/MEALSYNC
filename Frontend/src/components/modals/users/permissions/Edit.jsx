//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { TextFieldsPermissionsContext } from "../../../../contexts/FormsProvider";
import { ActionBlockContext } from "../../../../contexts/VariablesProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { RefModalContext,RefFormContext } from "../../../../contexts/RefsProvider";
import { PermissionsEditContext,DeletedUsersContext } from "../../../../contexts/UsersProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
import { UsersContext } from "../../../../contexts/UsersProvider";
// Hooks personalizados
import { HandleModalViewUsers } from "../../../../hooks/users/Views";
import { HandlePermissionsEdit } from "../../../../hooks/users/Forms";
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Row_100_Center,Container_Row_NG_Auto_Center,Container_Modal_Form_White_600,Container_Modal_Form_White,Container_Modal_Form } from "../../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Span_12_Justify_Black,Text_Title_28_Black,Text_Color_Green_16 } from "../../../styled/Text";
import { Label_Button_16_Black } from "../../../styled/Labels";
import { Input_Checkbox_16 } from "../../../styled/Inputs";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
// Componentes personalizados
import { Image_Modal } from "../../../styled/Imgs";
import Error_Edit from "../../errors/Edit";
import { Modal_Form_Button_Edit } from "../../../forms/Button";
//____________IMPORT/EXPORT____________

// Modal para editar permisos a los usuarios
export default function Permissions_Edit(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const Modal = useContext(RefModalContext);
    const isForm = useContext(RefFormContext);
    const [socket] = useContext(SocketContext);
    const [isPermissionsEdit,setIsPermissionsEdit] = useContext(PermissionsEditContext);
    const [isTextFieldsPermissions,setIsTextFieldsPermissions] = useContext(TextFieldsPermissionsContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isUsers] = useContext(UsersContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext); 
    const [isDeletedUsers] = useContext(DeletedUsersContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewUsers = HandleModalViewUsers();
    const handlePermissionsEdit = HandlePermissionsEdit();
    // UseEffct para verificar la eliminacion del usuario
    useEffect(() => {
        if(isDeletedUsers.length !== 0){
            if(isDeletedUsers.some(user => user.idusuario === isTextFieldsPermissions.idusuario)){
                setIsSelectedRow(null);
            }
        }
    },[isDeletedUsers]);
    // Useffect para controlar el sidebar
    useEffect(() => {
        if(isSidebar){
            setIsSidebar(false);
        }
    },[]);
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isPermissionsEdit){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Update-Permissions',isUsers.find(user => user.idusuario === isTextFieldsPermissions.idusuario)?.usuario,isLoggedUser.idusuario,isTextFieldsPermissions.idpermiso,isTextFieldsPermissions.administrador,isTextFieldsPermissions.chef,isTextFieldsPermissions.almacenista,isTextFieldsPermissions.cocinero,isTextFieldsPermissions.nutriologo,isTextFieldsPermissions.medico,isTextFieldsPermissions.idusuario)
                        
                        resolve('¡Editó los permisos al usuario!')
                        
                        setIsPermissionsEdit(false);
                        
                        const route = sessionStorage.getItem('Ruta');
                        const sidebar = sessionStorage.getItem('Estado del Sidebar');

                        setCurrentMView('');
                        sessionStorage.setItem('Vista del Modal','');
                        setTimeout(() => {
                            if(sidebar === 'true'){
                                setIsSidebar(true);
                            }
                            setIsModal(false);
                            sessionStorage.setItem('Estado del Modal',false);
                            setIsActionBlock(false);
                            setIsSelectedRow(null);
                            return navigate(route,{ replace: true });
                        },750);
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    setIsPermissionsEdit(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            }); 
            
            return Alert_Sonner_Promise(promise,'¡Editando permisos al usuario!','2');
        }
    },[isPermissionsEdit]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <>
                    <Container_Modal_Background_Black ref={Modal}>
                        <Image_Modal/>
                        <Container_Modal_Form_White_600 ref={isForm} className={currentMView === 'Permisos-Editar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Modal_Form_White>
                                <Container_Modal_Form>
                                    <Text_Title_28_Black>EDITAR PERMISOS</Text_Title_28_Black>
                                    <Container_Row_NG_Auto_Center>
                                        <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                        <Text_Span_16_Center_Black>: Datos generales</Text_Span_16_Center_Black>
                                    </Container_Row_NG_Auto_Center>
                                    <Container_Row_NG_Auto_Center>
                                        <Text_Color_Green_16>Usuario</Text_Color_Green_16>
                                        <Text_Span_16_Center_Black>: {isTextFieldsPermissions.usuario}</Text_Span_16_Center_Black>
                                    </Container_Row_NG_Auto_Center>
                                    <Container_Row_NG_Auto_Center>
                                        <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                        <Text_Span_16_Center_Black>: Datos específicos</Text_Span_16_Center_Black>
                                    </Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Área de administración</Text_Color_Green_16>
                                    <Container_Row_100_Center>
                                        <Label_Button_16_Black Disabled={isActionBlock}>
                                            <Input_Checkbox_16
                                                disabled={isActionBlock}
                                                checked={isTextFieldsPermissions.administrador}
                                                onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, administrador: e.target.checked ? 1 : 0}))}
                                                type="checkbox"
                                            />
                                            Administrador
                                        </Label_Button_16_Black>
                                        <Label_Button_16_Black Disabled={isActionBlock}>
                                            <Input_Checkbox_16
                                                disabled={isActionBlock}
                                                checked={isTextFieldsPermissions.chef}
                                                onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, chef: e.target.checked ? 1 : 0}))}
                                                type="checkbox"
                                            />
                                            Chef
                                        </Label_Button_16_Black>
                                        <Label_Button_16_Black Disabled={isActionBlock}>
                                            <Input_Checkbox_16
                                                type="checkbox"
                                                disabled={isActionBlock}
                                                checked={isTextFieldsPermissions.almacenista}
                                                onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, almacenista: e.target.checked ? 1 : 0}))}
                                            />
                                            Almacenista
                                        </Label_Button_16_Black>
                                    </Container_Row_100_Center>
                                    <Text_Color_Green_16>Área de cocina</Text_Color_Green_16>
                                    <Container_Row_100_Center>
                                        <Label_Button_16_Black Disabled={isActionBlock}>
                                            <Input_Checkbox_16
                                                type="checkbox"
                                                disabled={isActionBlock}
                                                checked={isTextFieldsPermissions.cocinero}
                                                onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, cocinero: e.target.checked ? 1 : 0}))}
                                            />
                                            Cocinero
                                        </Label_Button_16_Black>
                                        <Label_Button_16_Black Disabled={isActionBlock}>
                                            <Input_Checkbox_16
                                                type="checkbox"
                                                disabled={isActionBlock}
                                                checked={isTextFieldsPermissions.nutriologo}
                                                onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, nutriologo: e.target.checked ? 1 : 0}))}
                                            />
                                            Nutriólogo
                                        </Label_Button_16_Black>
                                        <Label_Button_16_Black Disabled={isActionBlock}>
                                            <Input_Checkbox_16
                                                type="checkbox"
                                                disabled={isActionBlock}
                                                checked={isTextFieldsPermissions.medico}
                                                onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, medico: e.target.checked ? 1 : 0}))}
                                            />
                                            Médico
                                        </Label_Button_16_Black>
                                    </Container_Row_100_Center>
                                    <Text_Span_12_Justify_Black>Si se le retira el permiso mientras el usuario tiene una sesión activa con dicho permiso, su sesión se cerrará de forma inmediata.</Text_Span_12_Justify_Black>
                                    <Modal_Form_Button_Edit
                                        onCancel={() => handleModalViewUsers('')}
                                        onAction={() => handlePermissionsEdit()}
                                    />
                                </Container_Modal_Form>
                            </Container_Modal_Form_White>
                        </Container_Modal_Form_White_600>
                    </Container_Modal_Background_Black>  
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