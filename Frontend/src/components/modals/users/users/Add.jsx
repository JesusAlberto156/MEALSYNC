//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { SocketContext } from "../../../../contexts/SocketProvider";
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { TextFieldsUserContext,TextFieldsPermissionsContext,TextFieldsStatusContext } from "../../../../contexts/FormsProvider";
import { UserTypesContext,UserAddContext } from "../../../../contexts/UsersProvider";
import { ActionBlockContext,KeyboardContext,KeyboardViewContext,TouchContext } from "../../../../contexts/VariablesProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
import { RefKeyboardContext,RefKeyboardTouchContext } from "../../../../contexts/RefsProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
// Hooks personalizados
import { HandleKeyboard } from "../../../../hooks/Views";
import { HandleModalViewUsers } from "../../../../hooks/users/Views";
import { HandleUserAdd } from "../../../../hooks/users/Forms";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Modal_Form_White_600,Container_Modal_Form,Container_Modal_Form_White,Container_Row_NG_Auto_Center,Container_Row_100_Left,Container_Row_100_Center,Container_Modal_Form_Button } from "../../../styled/Containers";
import { Text_Title_28_Black,Text_Color_Blue_16,Text_Span_16_Center_Black,Text_Color_Green_16 } from "../../../styled/Text";
import { Icon_Button_Blue_20,Icon_Button_Blue_16 } from "../../../styled/Icons";
import { Input_Text_100_Black,Input_Radio_20,Input_Checkbox_16,Input_Group } from "../../../styled/Inputs";
import { Label_Text_12_Black,Label_Button_16_Black,Label_Text_16_Black } from "../../../styled/Labels";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
// Componentes personalizados
import { Image_Modal } from "../../../styled/Imgs";
import { Keyboard_Form_User } from "../../../keyboards/Form";
import { Modal_Form_Button_Add } from "../../../forms/Button";
import { Select_300 } from "../../../styled/Selects";
//____________IMPORT/EXPORT____________

// Modal para agregar usuarios a su tabla
export default function User_Add(){
    // Constantes con el valor de los contextos
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    const [isTextFieldsPermissions,setIsTextFieldsPermissions] = useContext(TextFieldsPermissionsContext);
    const [isTextFieldsStatus,setIsTextFieldsStatus] = useContext(TextFieldsStatusContext);
    const [isUserTypes] = useContext(UserTypesContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isUserAdd,setIsUserAdd] = useContext(UserAddContext);
    const [socket] = useContext(SocketContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const isKeyboardTouch = useContext(RefKeyboardTouchContext);
    const [isTouch] = useContext(TouchContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewUsers = HandleModalViewUsers();
    const handleUserAdd = HandleUserAdd();
    const { KeyboardView,KeyboardClick } = HandleKeyboard();
    // Constantes con el valor de useState
    const [isTotalName,setIsTotalName] = useState(0);
    const [isTotalShortName,setIsTotalShortName] = useState(0);
    const [isTotalUser,setIsTotalUser] = useState(0);
    const [isTotalPassword,setIsTotalPassword] = useState(0);
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
    // UseEffects para agregar datos a la base de datos
    useEffect(() => {
        if(isUserAdd){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-User',isLoggedUser.idusuario,isTextFieldsUser.nombre.trim(),isTextFieldsUser.nombrecorto.trim(),isTextFieldsUser.usuario.trim(),isTextFieldsUser.contrasena.trim(),isTextFieldsUser.idtipo,isTextFieldsUser.permisos,isTextFieldsPermissions.administrador,isTextFieldsPermissions.chef,isTextFieldsPermissions.almacenista,isTextFieldsPermissions.cocinero,isTextFieldsPermissions.nutriologo,isTextFieldsPermissions.medico,isTextFieldsStatus.estatus)

                        resolve('¡Agregó al usuario!');

                        setIsUserAdd(false);

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
                    setIsUserAdd(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Agregando un usuario!','2');
        }
    },[isUserAdd]);
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <>
                    <Container_Modal_Background_Black>
                        <Image_Modal/>
                        <Container_Modal_Form_White_600 className={currentMView === 'Usuario-Agregar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Modal_Form_White>
                                <Container_Modal_Form>
                                    <Text_Title_28_Black>AGREGAR USUARIO</Text_Title_28_Black>
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
                                                disabled={isActionBlock}
                                                value={isTextFieldsUser.nombre}
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
                                                disabled={isActionBlock}
                                                value={isTextFieldsUser.nombrecorto}
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
                                                maxLength={25}
                                                disabled={isActionBlock}
                                                value={isTextFieldsUser.usuario}
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
                                        <Label_Text_16_Black>Contraseña:</Label_Text_16_Black>
                                        <Input_Group>
                                            <Input_Text_100_Black
                                                id="Input-Contraseña"
                                                placeholder="..."
                                                type="password"
                                                maxLength={15}
                                                disabled={isActionBlock}
                                                value={isTextFieldsUser.contrasena}
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
                                            if (e) {
                                                setIsTextFieldsUser(prev => ({
                                                    ...prev,
                                                    idtipo: e.value,
                                                }));
                                            } else {
                                                setIsTextFieldsUser(prev => ({
                                                    ...prev,
                                                    idtipo: 0,
                                                }));
                                            }
                                        }}
                                        isDisabled={isActionBlock}
                                    />  
                                    <Container_Row_NG_Auto_Center>
                                        <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                        <Text_Span_16_Center_Black>: Datos específicos</Text_Span_16_Center_Black>
                                    </Container_Row_NG_Auto_Center>
                                    <Container_Row_100_Center>
                                        <Text_Color_Green_16>ESTATUS</Text_Color_Green_16>
                                        <Icon_Button_Blue_16
                                            onClick={() => {
                                                setIsTextFieldsStatus(prev => ({...prev, estatus: ''}))
                                            }}
                                            disabled={isActionBlock}
                                        >
                                            <MdCancel/>
                                        </Icon_Button_Blue_16>
                                    </Container_Row_100_Center>
                                    <Container_Row_100_Center>
                                        {['Habilitado','Deshabilitado'].map((item,index) => (
                                            <Label_Button_16_Black 
                                                Disabled={isActionBlock} 
                                                key={index}
                                            >
                                                <Input_Radio_20
                                                    type="radio"
                                                    name="status"
                                                    disabled={isActionBlock}
                                                    value={item}
                                                    checked={isTextFieldsStatus.estatus === item}
                                                    onChange={(e) => setIsTextFieldsStatus(prev => ({...prev, estatus: e.target.value}))}
                                                />
                                                {item}
                                            </Label_Button_16_Black>
                                        ))}
                                    </Container_Row_100_Center>
                                    <Container_Row_100_Center>
                                        <Text_Color_Green_16>PERMISOS</Text_Color_Green_16>
                                        <Icon_Button_Blue_16
                                            onClick={() => {
                                                setIsTextFieldsUser(prev => ({...prev, permisos: ''}))
                                            }}
                                            disabled={isActionBlock}
                                        >
                                            <MdCancel/>
                                        </Icon_Button_Blue_16>
                                    </Container_Row_100_Center>
                                    <Container_Row_100_Center>
                                        {['Default','Personalizados'].map((item,index) => (
                                            <Label_Button_16_Black 
                                                Disabled={isActionBlock}
                                                key={index}
                                            >
                                                <Input_Radio_20
                                                    type="radio"
                                                    name="permissions"
                                                    disabled={isActionBlock}
                                                    value={item}
                                                    checked={isTextFieldsUser.permisos === item}
                                                    onChange={(e) => setIsTextFieldsUser(prev => ({...prev, permisos: e.target.value}))}
                                                />
                                                {item}
                                            </Label_Button_16_Black>
                                        ))}
                                    </Container_Row_100_Center>
                                    {isTextFieldsUser.permisos === 'Personalizados' ? (
                                        <>
                                            <Container_Row_100_Center>
                                                <Text_Color_Blue_16>Área de administración</Text_Color_Blue_16>
                                            </Container_Row_100_Center>
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
                                            <Container_Row_100_Center>
                                                <Text_Color_Blue_16>Área de cocina</Text_Color_Blue_16>
                                            </Container_Row_100_Center>
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
                                        </>
                                    ):(
                                        <></>
                                    )}
                                    <Modal_Form_Button_Add
                                        onCancel={() => handleModalViewUsers('')}
                                        onAction={() => handleUserAdd()}
                                    />
                                </Container_Modal_Form>
                            </Container_Modal_Form_White>
                        </Container_Modal_Form_White_600>
                        <Keyboard_Form_User/>
                    </Container_Modal_Background_Black>
                </>
            ):(
                <></>
            )}
        </>
    );
}