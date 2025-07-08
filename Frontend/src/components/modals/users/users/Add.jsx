//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
import Select from "react-select";
// Contextos
import { SocketContext } from "../../../../contexts/SocketProvider";
import { ModalContext,SubModalContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { TextFieldsUserContext,TextFieldsPermissionsContext } from "../../../../contexts/FormsProvider";
import { UserTypesContext,UserAddContext,PermissionsAddContext,StatusAddContext,UsersContext } from "../../../../contexts/UsersProvider";
import { AnimationContext,ActionBlockContext,KeyboardContext,KeyboardViewContext,TouchContext } from "../../../../contexts/VariablesProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
import { RefKeyboardContext,RefKeyboardTouchContext } from "../../../../contexts/RefsProvider";
// Hooks personalizados
import { ResetTextFieldsPermissions,ResetTextFieldsUser,ResetTextFieldsStatus } from "../../../../hooks/users/Texts";
import { HandleKeyboard } from "../../../../hooks/Views";
import { HandleModalViewUsers } from "../../../../hooks/users/Views";
import { HandleUserAdd } from "../../../../hooks/users/Forms";
//__________IMAGENES__________
import Logo_Hospital from '../../../imgs/Logo-Hospital.png'
//__________IMAGENES__________
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { IoIosAddCircle } from "react-icons/io";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Modal_Form_White_50,Container_Modal_Image,Container_Modal_Form,Container_Modal_Form_White,Container_Row_NG_Auto_Center,Container_Row_100_Left,Container_Row_100_Center,Container_Modal_Form_Button } from "../../../styled/Containers";
import { Text_Title_28_Black,Text_Span_16_Left_Black,Text_Color_Blue_16,Text_Span_16_Center_Black,Text_Color_Green_16 } from "../../../styled/Text";
import { Button_Icon_Blue_Auto_40,Button_Icon_Green_Auto_40 } from "../../../styled/Buttons";
import { Icon_20,Icon_Button_Blue_16 } from "../../../styled/Icons";
import { Input_Text_100_Black,Input_Radio_20,Input_Checkbox_16,Input_Group } from "../../../styled/Inputs";
import { Label_Text_12_Black,Label_Button_16_Black } from "../../../styled/Labels";
import { Image_Modal_Fixed } from "../../../styled/Imgs";
import { Alert_Sonner_Promise,Alert_Sonner_Warning } from "../../../styled/Alerts";
// Componentes personalizados
import Keyboard_Default from "../../../keyboards/Defaullt";
//____________IMPORT/EXPORT____________

// Modal para agregar usuarios a su tabla
export default function User_Add(){
    // Constantes con el valor de los contextos
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    const [isTextFieldsPermissions,setIsTextFieldsPermissions] = useContext(TextFieldsPermissionsContext);
    const [isUserTypes] = useContext(UserTypesContext);
    const [isAnimation,setIsAnimation] = useContext(AnimationContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isUserAdd,setIsUserAdd] = useContext(UserAddContext);
    const [isPermissionsAdd,setIsPermissionsAdd] = useContext(PermissionsAddContext);
    const [isStatusAdd,setIsStatusAdd] = useContext(StatusAddContext);
    const [socket] = useContext(SocketContext);
    const [isUsers] = useContext(UsersContext); 
    const [isSubModal,setIsSubModal] = useContext(SubModalContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const isKeyboardTouch = useContext(RefKeyboardTouchContext);
    const [isTouch] = useContext(TouchContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewUsers = HandleModalViewUsers();
    const handleUserAdd = HandleUserAdd();
    const resetTextFieldsUser = ResetTextFieldsUser();
    const resetTextFieldsPermissions = ResetTextFieldsPermissions();
    const resetTextFieldsStatus = ResetTextFieldsStatus();
    const { KeyboardView,KeyboardClick,handleKeyboard } = HandleKeyboard();
    // Constantes con el valor de useState
    const [isTotalName,setIsTotalName] = useState(0);
    const [isTotalShortName,setIsTotalShortName] = useState(0);
    const [isTotalUser,setIsTotalUser] = useState(0);
    const [isTotalPassword,setIsTotalPassword] = useState(0);
    // UseEffets para controlar el teclado
    useEffect(() => {
        KeyboardView();
    }, []);
    useEffect(() => {
        KeyboardClick();
    }, [Keyboard]);
    useEffect(() => {
        isKeyboardTouch.current = isTouch;
    }, [isTouch]);
    // UseEffects para advertir sobre el limite de caracteres de los campos del formulario
    useEffect(() => {
        setIsTotalName(isTextFieldsUser.nombre.length);
        if(isTextFieldsUser.nombre.length === 150){
            Alert_Sonner_Warning('MEALSYNC','¡Ha alcanzado el límite de caracteres permitido en el nombre!');
        }
    },[isTextFieldsUser.nombre]);
    useEffect(() => {
        setIsTotalShortName(isTextFieldsUser.nombrecorto.length);
        if(isTextFieldsUser.nombrecorto.length === 50){
            Alert_Sonner_Warning('MEALSYNC','¡Ha alcanzado el límite de caracteres permitido en el nombre corto!');
        }
    },[isTextFieldsUser.nombrecorto]);
    useEffect(() => {
        setIsTotalUser(isTextFieldsUser.usuario.length);
        if(isTextFieldsUser.usuario.length === 25){
            Alert_Sonner_Warning('MEALSYNC','¡Ha alcanzado el límite de caracteres permitido en el usuario!');
        }
    },[isTextFieldsUser.usuario]);
    useEffect(() => {
        setIsTotalPassword(isTextFieldsUser.contrasena.length);
        if(isTextFieldsUser.contrasena.length === 15){
            Alert_Sonner_Warning('MEALSYNC','¡Ha alcanzado el límite de caracteres permitido en la contraseña!');
        }
    },[isTextFieldsUser.contrasena]);
    // UseEffects para agregar datos a la base de datos
    useEffect(() => {
        if(isUserAdd){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-User',isLoggedUser.idusuario,isTextFieldsUser.nombre.trim(),isTextFieldsUser.nombrecorto.trim(),isTextFieldsUser.usuario.trim(),isTextFieldsUser.contrasena.trim(),isTextFieldsUser.idtipo)

                        resolve('¡MEALSYNC agregó al usuario!...');

                        setIsUserAdd(false);

                        if(isTextFieldsUser.permisos === '' && isTextFieldsUser.estatus === ''){
                            const route = sessionStorage.getItem('Ruta');

                            setCurrentMView('');
                            sessionStorage.setItem('Vista del Modal','');
                            setTimeout(() => {
                                setIsModal(false);
                                sessionStorage.setItem('Estado del Modal',false);
                                setIsSubModal(false);
                                sessionStorage.removeItem('Estado del Sub-Modal');
                                resetTextFieldsUser();
                                resetTextFieldsPermissions();
                                resetTextFieldsStatus();
                                setIsAnimation(false);
                                sessionStorage.removeItem('Animación');
                                setIsActionBlock(false);
                                navigate(route,{ replace: true });
                            },750);
                        }
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    setIsUserAdd(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Sonner_Promise(promise,'¡Agregando un usuario!...');
        }
    },[isUserAdd]);
    useEffect(() => {
        if(isUsers.length !== 0 && isTextFieldsUser.idusuario === 0){
            setIsTextFieldsUser(prev => ({
                ...prev,
                idusuario: isUsers.find(user => user.usuario === isTextFieldsUser.usuario)?.idusuario || 0,
            }))

            if(isTextFieldsUser.permisos !== '' && isTextFieldsUser.estatus === ''){
                setIsPermissionsAdd(true);
            }
            if(isTextFieldsUser.permisos === '' && isTextFieldsUser.estatus !== ''){
                setIsStatusAdd(true);
            }
            if(isTextFieldsUser.permisos !== '' && isTextFieldsUser.estatus !== ''){
                setIsPermissionsAdd(true);
            }
        }
    },[isUsers])
    useEffect(() => {
        if(isPermissionsAdd){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Permissions',isLoggedUser.idusuario,isTextFieldsPermissions.administrador,isTextFieldsPermissions.chef,isTextFieldsPermissions.almacenista,isTextFieldsPermissions.cocinero,isTextFieldsPermissions.nutriologo,isTextFieldsPermissions.medico,isTextFieldsUser.idusuario);
                        
                        resolve('¡MEALSYNC agregó los permisos al usuario!...')

                        setIsPermissionsAdd(false);

                        if(isTextFieldsUser.permisos !== '' && isTextFieldsUser.estatus === ''){
                            const route = sessionStorage.getItem('Ruta');

                            setCurrentMView('');
                            sessionStorage.setItem('Vista del Modal','');
                            setTimeout(() => {
                                setIsModal(false);
                                sessionStorage.setItem('Estado del Modal',false);
                                setIsSubModal(false);
                                sessionStorage.removeItem('Estado del Sub-Modal');
                                resetTextFieldsUser();
                                resetTextFieldsPermissions();
                                resetTextFieldsStatus();
                                setIsAnimation(false);
                                sessionStorage.removeItem('Animación');
                                setIsActionBlock(false);
                                navigate(route,{ replace: true });
                            },750);
                        }
                        if(isTextFieldsUser.permisos !== '' && isTextFieldsUser.estatus !== ''){
                            setIsStatusAdd(true);
                        }
                    },2000);
                }catch(e){
                    setIsActionBlock(false);
                    setIsPermissionsAdd(false);
                    return reject('¡Ocurrio un error inesperado agregando los permisos al usuario!...');
                }
            });

            Alert_Sonner_Promise(promise,'¡Agregando permisos al usuario!...');
        }
    },[isPermissionsAdd]);
    useEffect(() => {
        if(isStatusAdd){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Status',isLoggedUser.idusuario,isTextFieldsUser.estatus === 'Habilitado' ? 1:0,isTextFieldsUser.idusuario);

                        resolve('¡MEALSYNC agregó el estatus al usuario!...');

                        setIsStatusAdd(false);

                        const route = sessionStorage.getItem('Ruta');

                        setCurrentMView('');
                        sessionStorage.setItem('Vista del Modal','');
                        setTimeout(() => {
                            setIsModal(false);
                            sessionStorage.setItem('Estado del Modal',false);
                            setIsSubModal(false);
                            sessionStorage.removeItem('Estado del Sub-Modal');
                            resetTextFieldsUser();
                            resetTextFieldsPermissions();
                            resetTextFieldsStatus();
                            setIsAnimation(false);
                            sessionStorage.removeItem('Animación');
                            setIsActionBlock(false);
                            navigate(route,{ replace: true });
                        },750);
                    },2000);
                }catch(e){               
                    setIsActionBlock(false);
                    setIsStatusAdd(false);
                    return reject('¡Ocurrio un error inesperado agregando el estatus al usuario!...');
                }
            });

            Alert_Sonner_Promise(promise,'¡Agregando estatus al usuario!...');
        }
    },[isStatusAdd]);
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <>
                    <Container_Modal_Background_Black>
                        <Container_Modal_Image/>
                        <Image_Modal_Fixed src={Logo_Hospital}/>
                        <Container_Modal_Form_White_50 className={currentMView === 'Usuario-Agregar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Modal_Form>
                                <Text_Title_28_Black>AGREGAR USUARIO</Text_Title_28_Black>
                                <Container_Modal_Form_White className='shadow-out-container-light-infinite'>
                                    <Container_Row_NG_Auto_Center>
                                        <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                        <Text_Span_16_Center_Black>: Datos generales</Text_Span_16_Center_Black>
                                    </Container_Row_NG_Auto_Center>
                                    <Container_Row_100_Left>
                                        <Text_Span_16_Left_Black>Nombre:</Text_Span_16_Left_Black>
                                        <Input_Group>
                                            <Input_Text_100_Black
                                                id="Input-Name"
                                                placeholder="..."
                                                type="text"
                                                maxLength={150}
                                                disabled={isActionBlock}
                                                value={isTextFieldsUser.nombre}
                                                onChange={(e) => setIsTextFieldsUser(prev => ({...prev, nombre: e.target.value}))}
                                                onFocus={() => {
                                                    if(isKeyboardTouch.current){
                                                        setIsKeyboard(true);
                                                        setIsKeyboardView('Name');
                                                    }
                                                }}
                                            />
                                            <Label_Text_12_Black>{isTotalName}/150</Label_Text_12_Black>
                                        </Input_Group>
                                        <Icon_Button_Blue_16
                                            onClick={() => {
                                                setIsTextFieldsUser(prev => ({...prev, nombre: ''}))
                                            }}
                                            disabled={isActionBlock}
                                        >
                                            <MdCancel/>
                                        </Icon_Button_Blue_16>
                                    </Container_Row_100_Left>
                                    <Container_Row_100_Left>
                                        <Text_Span_16_Left_Black>Nombre corto:</Text_Span_16_Left_Black>
                                        <Input_Group>
                                            <Input_Text_100_Black
                                                id="Input-ShortName"
                                                placeholder="..."
                                                type="text"
                                                maxLength={50}
                                                disabled={isActionBlock}
                                                value={isTextFieldsUser.nombrecorto}
                                                onChange={(e) => setIsTextFieldsUser(prev => ({...prev, nombrecorto: e.target.value}))}
                                                onFocus={() => {
                                                    if(isKeyboardTouch.current){
                                                        setIsKeyboard(true);
                                                        setIsKeyboardView('ShortName');
                                                    }
                                                }}
                                            />
                                            <Label_Text_12_Black>{isTotalShortName}/50</Label_Text_12_Black>
                                        </Input_Group>
                                        <Icon_Button_Blue_16
                                            onClick={() => {
                                                setIsTextFieldsUser(prev => ({...prev, nombrecorto: ''}))
                                            }}
                                            disabled={isActionBlock}
                                        >
                                            <MdCancel/>
                                        </Icon_Button_Blue_16>
                                    </Container_Row_100_Left>
                                    <Container_Row_100_Left>
                                        <Text_Span_16_Left_Black>Usuario:</Text_Span_16_Left_Black>
                                        <Input_Group>
                                            <Input_Text_100_Black
                                                id="Input-User"
                                                placeholder="..."
                                                type="text"
                                                maxLength={25}
                                                disabled={isActionBlock}
                                                value={isTextFieldsUser.usuario}
                                                onChange={(e) => setIsTextFieldsUser(prev => ({...prev, usuario: e.target.value}))}
                                                onFocus={() => {
                                                    if(isKeyboardTouch.current){
                                                        setIsKeyboard(true);
                                                        setIsKeyboardView('User');
                                                    }
                                                }}
                                            />
                                            <Label_Text_12_Black>{isTotalUser}/25</Label_Text_12_Black>
                                        </Input_Group>
                                    </Container_Row_100_Left>
                                    <Container_Row_100_Left>
                                        <Text_Span_16_Left_Black>Contraseña:</Text_Span_16_Left_Black>
                                        <Input_Group>
                                            <Input_Text_100_Black
                                                id="Input-Password"
                                                placeholder="..."
                                                type="password"
                                                maxLength={15}
                                                disabled={isActionBlock}
                                                value={isTextFieldsUser.contrasena}
                                                onChange={(e) => setIsTextFieldsUser(prev => ({...prev, contrasena: e.target.value}))}
                                                onFocus={() => {
                                                    if(isKeyboardTouch.current){
                                                        setIsKeyboard(true);
                                                        setIsKeyboardView('Password');
                                                    }
                                                }}
                                            />
                                            <Label_Text_12_Black>{isTotalPassword}/15</Label_Text_12_Black>
                                        </Input_Group>
                                    </Container_Row_100_Left>
                                    {isUserTypes.length !== 0 ? (
                                        <>
                                            <Select
                                                options={isUserTypes.map((userTypes) => ({
                                                    value: userTypes.idtipo,
                                                    label: userTypes.tipo
                                                }))}
                                                isClearable={true}
                                                styles={{
                                                    control: (provided,state) => ({
                                                        ...provided,
                                                        width: '30vw',
                                                        padding: '6px',
                                                        border: '1px solid black',
                                                        borderRight: '5px solid black',
                                                        cursor: 'pointer',
                                                        borderRadius: '30px',
                                                        fontFamily: 'Century Gothic',
                                                        fontStyle: 'normal',
                                                        fontSize: '16px',
                                                        justifyContent: 'center',
                                                        textAlign: 'center',
                                                        '&:hover': {
                                                            border: '1px solid rgb(58,93,174)',
                                                            borderRight: '5px solid rgb(58,93,174)',
                                                        },
                                                        ...(state.isFocused && {
                                                            border: '1px solid rgb(58,93,174)',
                                                            borderRight: '5px solid rgb(58,93,174)',
                                                        }),
                                                        '@media (max-width: 768px)':{
                                                            width: '40vw',
                                                            borderRadius: '25px',
                                                            padding: '4px',
                                                            fontSize: '14px',
                                                            border: '1px solid black',
                                                            borderRight: '4px solid black',
                                                            '&:hover': {
                                                                border: '1px solid rgb(58,93,174)',
                                                                borderRight: '4px solid rgb(58,93,174)',
                                                            },
                                                            ...(state.isFocused && {
                                                                border: '1px solid rgb(58,93,174)',
                                                                borderRight: '5px solid rgb(58,93,174)',
                                                            }),
                                                        },
                                                        '@media (max-width: 480px)':{
                                                            width: '50vw',
                                                            borderRadius: '20px',
                                                            padding: '2px',
                                                            fontSize: '12px',
                                                            border: '1px solid black',
                                                            borderRight: '3px solid black',
                                                            '&:hover': {
                                                                border: '1px solid rgb(58,93,174)',
                                                                borderRight: '3px solid rgb(58,93,174)',
                                                            },
                                                            ...(state.isFocused && {
                                                                border: '1px solid rgb(58,93,174)',
                                                                borderRight: '5px solid rgb(58,93,174)',
                                                            }),
                                                        },
                                                    }),
                                                    singleValue: (provided) => ({
                                                        ...provided,
                                                        textAlign: 'center', 
                                                        width: '100%',
                                                    }),
                                                    option: (provided,state) => ({
                                                        ...provided,
                                                        textAlign: 'center',
                                                        fontFamily: 'Century Gothic',
                                                        padding: '6px',
                                                        fontSize: '16px',
                                                        backgroundColor: state.isSelected ? 'rgb(58,93,174)' : 'white', 
                                                        color: state.isSelected ? 'white' : 'black',
                                                        fontWeight: state.isSelected ? 'bold' : 'normal',
                                                        cursor: 'pointer',
                                                        ':hover': {
                                                            backgroundColor: state.isSelected ? 'rgb(12, 54, 109)' : 'rgba(58,93,174,0.2)',
                                                        },
                                                        '@media (max-width: 768px)':{
                                                            padding: '4px',
                                                            fontSize: '14px',
                                                        },
                                                        '@media (max-width: 480px)':{
                                                            padding: '2px',
                                                            fontSize: '12px',
                                                        },
                                                    }),
                                                    menu: (provided) => ({
                                                        ...provided,
                                                        overflow: 'hidden',
                                                        borderBottomLeftRadius:'30px',
                                                        borderBottomRightRadius: '30px',
                                                        border: '1px solid black',
                                                        borderRight: '5px solid black',
                                                        borderBottom: '5px solid black',
                                                        '@media (max-width: 768px)':{
                                                            borderBottomLeftRadius:'25px',
                                                            borderBottomRightRadius: '25px',
                                                            border: '1px solid black',
                                                            borderRight: '4px solid black',
                                                            borderBottom: '4px solid black',
                                                        },
                                                        '@media (max-width: 480px)':{
                                                            borderBottomLeftRadius:'20px',
                                                            borderBottomRightRadius: '20px',
                                                            border: '1px solid black',
                                                            borderRight: '3px solid black',
                                                            borderBottom: '3px solid black',
                                                        },
                                                    }),
                                                    menuList: (provided) => ({
                                                        ...provided,
                                                        maxHeight:175,
                                                        fontFamily: 'Century Gothic',
                                                        fontStyle: 'normal',
                                                        overflowY:'auto',
                                                        
                                                        '@media (max-width: 768px)':{
                                                            maxHeight:150,
                                                        },
                                                        '@media (max-width: 480px)':{
                                                            maxHeight:125,
                                                        },
                                                    })
                                                }}
                                                placeholder='Tipo de usuario...'
                                                value={isUserTypes
                                                    .map(user => ({ value: user.idtipo, label: user.tipo }))
                                                    .find(option => option.value === isTextFieldsUser.idtipo)
                                                }
                                                onChange={(e) => {if(e) {setIsTextFieldsUser(prev => ({...prev, idtipo: e.value}))}else{setIsTextFieldsUser(prev => ({...prev, idtipo: 0}))}}}
                                                isDisabled={isActionBlock}
                                            />  
                                        </>
                                    ):(
                                        <>
                                            <Container_Row_100_Center>
                                                <Text_Span_16_Center_Black>¡No hay datos disponibles!</Text_Span_16_Center_Black>
                                            </Container_Row_100_Center>
                                        </>
                                    )}
                                    <Container_Row_NG_Auto_Center>
                                        <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                        <Text_Span_16_Center_Black>: Datos especificos</Text_Span_16_Center_Black>
                                    </Container_Row_NG_Auto_Center>
                                    <Container_Row_100_Center>
                                        <Text_Color_Green_16>ESTATUS</Text_Color_Green_16>
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
                                                    checked={isTextFieldsUser.estatus === item}
                                                    onChange={(e) => setIsTextFieldsUser(prev => ({...prev, estatus: e.target.value}))}
                                                />
                                                {item}
                                            </Label_Button_16_Black>
                                        ))}
                                    </Container_Row_100_Center>
                                    <Container_Row_100_Center>
                                        <Text_Color_Green_16>PERMISOS</Text_Color_Green_16>
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
                                                        value={isTextFieldsPermissions.administrador}
                                                        onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, administrador: e.target.checked ? 1 : 0}))}
                                                        type="checkbox"
                                                    />
                                                    Administrador
                                                </Label_Button_16_Black>
                                                <Label_Button_16_Black Disabled={isActionBlock}>
                                                    <Input_Checkbox_16
                                                        value={isTextFieldsPermissions.chef}
                                                        onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, chef: e.target.checked ? 1 : 0}))}
                                                        type="checkbox"
                                                    />
                                                    Chef
                                                </Label_Button_16_Black>
                                                <Label_Button_16_Black Disabled={isActionBlock}>
                                                    <Input_Checkbox_16
                                                        type="checkbox"
                                                        value={isTextFieldsPermissions.almacenista}
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
                                                        value={isTextFieldsPermissions.cocinero}
                                                        onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, cocinero: e.target.checked ? 1 : 0}))}
                                                    />
                                                    Cocinero
                                                </Label_Button_16_Black>
                                                <Label_Button_16_Black Disabled={isActionBlock}>
                                                    <Input_Checkbox_16
                                                        type="checkbox"
                                                        value={isTextFieldsPermissions.nutriologo}
                                                        onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, nutriologo: e.target.checked ? 1 : 0}))}
                                                    />
                                                    Nutriólogo
                                                </Label_Button_16_Black>
                                                <Label_Button_16_Black Disabled={true}>
                                                    <Input_Checkbox_16
                                                        type="checkbox"
                                                        disabled
                                                        value={true}
                                                        defaultChecked
                                                        onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, medico: e.target.checked ? 1 : 0}))}
                                                    />
                                                    Médico
                                                </Label_Button_16_Black>
                                            </Container_Row_100_Center>
                                        </>
                                    ):(
                                        <></>
                                    )}
                                </Container_Modal_Form_White>
                                <Container_Modal_Form_Button>
                                    <Tooltip title='Cancelar' placement='top'>
                                        <Button_Icon_Blue_Auto_40
                                            onClick={() => handleModalViewUsers('')}
                                            disabled={isActionBlock}    
                                        >
                                            <Icon_20><MdCancel/></Icon_20>
                                        </Button_Icon_Blue_Auto_40>
                                    </Tooltip>
                                    <Tooltip title='Agregar' placement='top'>
                                        <Button_Icon_Green_Auto_40
                                            onClick={() => handleUserAdd()}
                                            disabled={isActionBlock}    
                                        >
                                            <Icon_20><IoIosAddCircle/></Icon_20>
                                        </Button_Icon_Green_Auto_40>
                                    </Tooltip>
                                </Container_Modal_Form_Button>
                            </Container_Modal_Form>
                        </Container_Modal_Form_White_50>
                        {isKeyboard ? (
                            <>
                                <Keyboard_Default 
                                    value={isKeyboardView === 'Name' ? isTextFieldsUser.nombre :
                                           isKeyboardView === 'ShortName' ? isTextFieldsUser.nombrecorto :
                                           isKeyboardView === 'User' ? isTextFieldsUser.usuario :
                                           isTextFieldsUser.contrasena} 
                                    onChange={handleKeyboard}
                                />  
                            </>
                        ):(
                            <></>
                        )}
                    </Container_Modal_Background_Black>
                </>
            ):(
                <></>
            )}
        </>
    );
}