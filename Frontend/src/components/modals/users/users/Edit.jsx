//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { SocketContext } from "../../../../contexts/SocketProvider";
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { TextFieldsUserContext } from "../../../../contexts/FormsProvider";
import { UserTypesContext,UserEditContext } from "../../../../contexts/UsersProvider";
import { ActionBlockContext,KeyboardContext,KeyboardViewContext,TouchContext } from "../../../../contexts/VariablesProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { RefKeyboardContext,RefModalContext,RefFormContext,RefKeyboardTouchContext } from '../../../../contexts/RefsProvider';
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleModalViewUsers } from "../../../../hooks/users/Views";
import { HandleUserEdit } from "../../../../hooks/users/Forms";
import { HandleKeyboard } from "../../../../hooks/Views";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Row_100_Left,Container_Row_NG_Auto_Center, Container_Modal_Form_White_600,Container_Modal_Form_White, Container_Modal_Form } from "../../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Span_12_Justify_Black,Text_Title_28_Black } from "../../../styled/Text";
import { Icon_Button_Blue_20 } from "../../../styled/Icons";
import { Input_Group, Input_Text_100_Black } from "../../../styled/Inputs";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
import { Label_Text_12_Black,Label_Text_16_Black } from "../../../styled/Labels";
// Componentes personalizados
import { Image_Modal } from "../../../styled/Imgs";
import Error_Edit from "../../errors/Edit";
import { Keyboard_Form_User } from "../../../keyboards/Form";
import { Modal_Form_Button_Edit } from "../../../forms/Button";
import { Select_300 } from "../../../styled/Selects";
//____________IMPORT/EXPORT____________

// Modal para editar los usuarios de la tabla
export default function User_Edit(){
    // Constantes con el valor de los contextos
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    const [isUserTypes] = useContext(UserTypesContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isUserEdit,setIsUserEdit] = useContext(UserEditContext);
    const [socket] = useContext(SocketContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const Modal = useContext(RefModalContext);
    const isForm = useContext(RefFormContext);
    const [isLoggedUser] = useContext(LoggedUserContext); 
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const isKeyboardTouch = useContext(RefKeyboardTouchContext);
    const Keyboard = useContext(RefKeyboardContext);
    const [isTouch] = useContext(TouchContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext); 
    // Constantes con el valor de useState
    const [isTotalName,setIsTotalName] = useState(0);
    const [isTotalShortName,setIsTotalShortName] = useState(0);
    const [isTotalUser,setIsTotalUser] = useState(0);
    const [isTotalPassword,setIsTotalPassword] = useState(0);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewUsers = HandleModalViewUsers();
    const handleUserEdit = HandleUserEdit();
    const { KeyboardView,KeyboardClick } = HandleKeyboard();
    // Useffect para controlar el sidebar
    useEffect(() => {
        if(isSidebar){
            setIsSidebar(false);
        }
    },[]);
    // UseEffets para controlar el teclado
    useEffect(() => {
        KeyboardView();
    },[]);
    useEffect(() => {
        KeyboardClick();
    },[Keyboard]);
    useEffect(() => {
        isKeyboardTouch.current = isTouch;
    },[isTouch]);
    // UseEffects para el limite de caracteres de los campos del formulario
    useEffect(() => {
        setIsTotalName(isTextFieldsUser.nombre.length);
    },[isTextFieldsUser.nombre]);
    useEffect(() => {
        setIsTotalShortName(isTextFieldsUser.nombrecorto.length);
    },[isTextFieldsUser.nombrecorto]);
    useEffect(() => {
        setIsTotalUser(isTextFieldsUser.usuario.length);
    },[isTextFieldsUser.usuario]);
    useEffect(() => {
        setIsTotalPassword(isTextFieldsUser.contrasena.length);
    },[isTextFieldsUser.contrasena]);
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isUserEdit){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Update-User',isLoggedUser.idusuario,isTextFieldsUser.idusuario,isTextFieldsUser.nombre.trim(),isTextFieldsUser.nombrecorto.trim(),isTextFieldsUser.usuario.trim(),isTextFieldsUser.contrasena.trim(),isTextFieldsUser.idtipo)

                        resolve('¡Editó al usuario!');

                        setIsUserEdit(false);
                        
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
                    setIsUserEdit(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Editando un usuario!','2');
        }
    },[isUserEdit])
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <>
                    <Container_Modal_Background_Black ref={Modal}>
                        <Image_Modal/>
                        <Container_Modal_Form_White_600 ref={isForm} className={currentMView === 'Usuario-Editar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Modal_Form_White>
                                <Container_Modal_Form>
                                    <Text_Title_28_Black>EDITAR USUARIO</Text_Title_28_Black>
                                    <Container_Row_NG_Auto_Center>
                                        <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                        <Text_Span_16_Center_Black>: Datos generales</Text_Span_16_Center_Black>
                                    </Container_Row_NG_Auto_Center>
                                    <Container_Row_100_Left>
                                        <Label_Text_16_Black>Nombre:</Label_Text_16_Black>
                                        <Input_Group>
                                            <Input_Text_100_Black
                                                id="Input-Nombre"
                                                placeholder="..."
                                                type="text"
                                                maxLength={150}
                                                value={isTextFieldsUser.nombre}
                                                disabled={isActionBlock}
                                                onChange={(e) => setIsTextFieldsUser(prev => ({...prev, nombre: e.target.value}))}
                                                onFocus={() => {
                                                    if(isKeyboardTouch.current){
                                                        setIsKeyboard(true);
                                                        setIsKeyboardView('Nombre-Usuario');
                                                    }
                                                }}
                                            />
                                            <Label_Text_12_Black>{isTotalName}/150</Label_Text_12_Black>
                                        </Input_Group>
                                        <Icon_Button_Blue_20
                                            onClick={() => {
                                                setIsTextFieldsUser(prev => ({...prev, nombre: ''}))
                                            }}
                                            disabled={isActionBlock}
                                        >
                                            <MdCancel/>
                                        </Icon_Button_Blue_20>
                                    </Container_Row_100_Left>
                                    <Container_Row_100_Left>
                                        <Label_Text_16_Black>Nombre corto:</Label_Text_16_Black>
                                        <Input_Group>
                                            <Input_Text_100_Black
                                                id="Input-Nombre-Corto"
                                                placeholder="..."
                                                type="text"
                                                maxLength={50}
                                                value={isTextFieldsUser.nombrecorto}
                                                disabled={isActionBlock}
                                                onChange={(e) => setIsTextFieldsUser(prev => ({...prev, nombrecorto: e.target.value}))}
                                                onFocus={() => {
                                                    if(isKeyboardTouch.current){
                                                        setIsKeyboard(true);
                                                        setIsKeyboardView('Nombre-Corto-Usuario');
                                                    }
                                                }}
                                            />
                                            <Label_Text_12_Black>{isTotalShortName}/50</Label_Text_12_Black>
                                        </Input_Group>
                                        <Icon_Button_Blue_20
                                            onClick={() => {
                                                setIsTextFieldsUser(prev => ({...prev, nombrecorto: ''}))
                                            }}
                                            disabled={isActionBlock}
                                        >
                                            <MdCancel/>
                                        </Icon_Button_Blue_20>
                                    </Container_Row_100_Left>
                                    <Container_Row_100_Left>
                                        <Label_Text_16_Black>Usuario:</Label_Text_16_Black>
                                        <Input_Group>
                                            <Input_Text_100_Black
                                                id="Input-Usuario"
                                                placeholder="..."
                                                type="text"
                                                maxLength={50}
                                                value={isTextFieldsUser.usuario}
                                                disabled={isActionBlock}
                                                onChange={(e) => setIsTextFieldsUser(prev => ({...prev, usuario: e.target.value}))}
                                                onFocus={() => {
                                                    if(isKeyboardTouch.current){
                                                        setIsKeyboard(true);
                                                        setIsKeyboardView('Usuario');
                                                    }
                                                }}
                                            />
                                            <Label_Text_12_Black>{isTotalUser}/25</Label_Text_12_Black>
                                        </Input_Group>
                                        <Icon_Button_Blue_20
                                            onClick={() => {
                                                setIsTextFieldsUser(prev => ({...prev, usuario: ''}))
                                            }}
                                            disabled={isActionBlock}
                                        >
                                            <MdCancel/>
                                        </Icon_Button_Blue_20>
                                    </Container_Row_100_Left>
                                    <Container_Row_100_Left>
                                        <Label_Text_16_Black>Nombre corto:</Label_Text_16_Black>
                                        <Input_Group>
                                            <Input_Text_100_Black
                                                id="Input-Contraseña"
                                                placeholder="..."
                                                type="text"
                                                maxLength={50}
                                                value={isTextFieldsUser.contrasena}
                                                disabled={isActionBlock}
                                                onChange={(e) => setIsTextFieldsUser(prev => ({...prev, contrasena: e.target.value}))}
                                                onFocus={() => {
                                                    if(isKeyboardTouch.current){
                                                        setIsKeyboard(true);
                                                        setIsKeyboardView('Contraseña');
                                                    }
                                                }}
                                            />
                                            <Label_Text_12_Black>{isTotalPassword}/15</Label_Text_12_Black>
                                        </Input_Group>
                                        <Icon_Button_Blue_20
                                            onClick={() => {
                                                setIsTextFieldsUser(prev => ({...prev, contrasena: ''}))
                                            }}
                                            disabled={isActionBlock}
                                        >
                                            <MdCancel/>
                                        </Icon_Button_Blue_20>
                                    </Container_Row_100_Left>
                                    <Select_300
                                        data={isUserTypes.length}
                                        options={isUserTypes.map((userTypes) => ({
                                            value: userTypes.idtipo,
                                            label: userTypes.tipo
                                        }))}
                                        placeholder='Tipos de usuario...'
                                        value={isUserTypes
                                            .map(user => ({ value: user.idtipo, label: user.tipo }))
                                            .find(option => option.value === isTextFieldsUser.idtipo)
                                        }
                                        onChange={(e) => {
                                            if(e) {
                                                setIsTextFieldsUser(prev => ({...prev, idtipo: e.value}))
                                            }else{
                                                setIsTextFieldsUser(prev => ({...prev, idtipo: 0}))
                                            }
                                        }}
                                        isDisabled={isActionBlock}
                                    />
                                    <Text_Span_12_Justify_Black>Modificar el nombre de usuario o la contraseña puede forzar el cierre de la sesión del usuario si se encuentra activo, por motivos de seguridad.</Text_Span_12_Justify_Black>
                                    <Modal_Form_Button_Edit
                                        onCancel={() => handleModalViewUsers('')}
                                        onAction={() => handleUserEdit()}
                                    />
                                </Container_Modal_Form>
                            </Container_Modal_Form_White>
                        </Container_Modal_Form_White_600>
                        <Keyboard_Form_User/>                              
                    </Container_Modal_Background_Black>
                </>
            ):(
                currentMView === 'Usuario-Editar' ? (
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