//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalViewContext,ModalContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { ActionBlockContext } from "../../../../contexts/VariablesProvider";
import { TextFieldsPermissionsContext } from "../../../../contexts/FormsProvider";
import { PermissionsAddContext } from "../../../../contexts/UsersProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
// Hooks personalizados
import { HandleModalViewUsers } from "../../../../hooks/users/Views";
import { HandlePermissionsAdd,FilteredRecordsHasPermissions } from "../../../../hooks/users/Forms";
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Row_100_Center,Container_Row_NG_Auto_Center,Container_Modal_Form_White_600,Container_Modal_Form_White,Container_Modal_Form } from "../../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Title_28_Black,Text_Color_Green_16 } from "../../../styled/Text";
import { Label_Button_16_Black } from "../../../styled/Labels";
import { Input_Checkbox_16 } from "../../../styled/Inputs";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
import { Select_300 } from "../../../styled/Selects";
import { Modal_Form_Button_Add } from "../../../forms/Button";
// Componentes personalizados
import { Image_Modal } from "../../../styled/Imgs";
//____________IMPORT/EXPORT____________

// Modal para agregar permisos a los usuarios
export default function Permissions_Add(){
    // Constantes con el valor de los contextos
    const [socket] = useContext(SocketContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isPermissionsAdd,setIsPermissionsAdd] = useContext(PermissionsAddContext);
    const [isTextFieldsPermissions,setIsTextFieldsPermissions] = useContext(TextFieldsPermissionsContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext); 
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handlePermissionsAdd = HandlePermissionsAdd();
    const handleModalViewUsers = HandleModalViewUsers();
    const filteredRecordsHasPermissions = FilteredRecordsHasPermissions();
    // Useffect para controlar el sidebar
    useEffect(() => {
        if(isSidebar){
            setIsSidebar(false);
        }
    },[]);
    // UseEffect para agregar datos a la base de datos
    useEffect(() => {
        if(isPermissionsAdd){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Permissions',isLoggedUser.idusuario,isTextFieldsPermissions.administrador,isTextFieldsPermissions.chef,isTextFieldsPermissions.almacenista,isTextFieldsPermissions.cocinero,isTextFieldsPermissions.nutriologo,isTextFieldsPermissions.medico,isTextFieldsPermissions.idusuario);
                        
                        resolve('¡Agregó los permisos al usuario!');

                        setIsPermissionsAdd(false);

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
                            setIsSelectedRow(null);
                            setIsActionBlock(false);
                            return navigate(route,{ replace: true });
                        },750);
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    setIsPermissionsAdd(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Agregando permisos al usuario!','2');
        }
    },[isPermissionsAdd]);
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <>
                    <Container_Modal_Background_Black>
                        <Image_Modal/>
                        <Container_Modal_Form_White_600 className={currentMView === 'Permisos-Agregar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Modal_Form_White>
                                <Container_Modal_Form>
                                    <Text_Title_28_Black>AGREGAR PERMISOS</Text_Title_28_Black>
                                    <Container_Row_NG_Auto_Center>
                                        <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                        <Text_Span_16_Center_Black>: Datos generales</Text_Span_16_Center_Black>
                                    </Container_Row_NG_Auto_Center>
                                        <Select_300
                                        data={filteredRecordsHasPermissions.length}
                                        options={filteredRecordsHasPermissions.map((user) => ({
                                            value: user.idusuario,
                                            label: user.usuario
                                        }))}
                                        placeholder='Usuarios...'
                                        value={filteredRecordsHasPermissions
                                            .map(user => ({ value: user.idusuario, label: user.usuario }))
                                            .find(option => option.value === isTextFieldsPermissions.idusuario)
                                        }
                                        onChange={(e) => {
                                            if (e) {
                                                setIsTextFieldsPermissions(prev => ({
                                                    ...prev,
                                                    idusuario: e.value,
                                                    usuario: e.label
                                                }));
                                            } else {
                                                setIsTextFieldsPermissions(prev => ({
                                                    ...prev,
                                                    idusuario: 0,
                                                    usuario: ''
                                                }));
                                            }
                                        }}
                                        isDisabled={isActionBlock}
                                    />
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
                                    <Modal_Form_Button_Add
                                        onCancel={() => handleModalViewUsers('')}
                                        onAction={() => handlePermissionsAdd()}
                                    />
                                </Container_Modal_Form>
                            </Container_Modal_Form_White>
                        </Container_Modal_Form_White_600>
                    </Container_Modal_Background_Black>
                </>
            ):(
                <></>
            )}
        </>
    );
}