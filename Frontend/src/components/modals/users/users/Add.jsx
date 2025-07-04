//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useRef,useState } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
import Select from "react-select";
// Contextos
import { SocketContext } from "../../../../contexts/SocketProvider";
import { ModalContext,SubModalContext,ThemeModeContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { TextFieldsUserContext,TextFieldsPermissionsContext } from "../../../../contexts/FormsProvider";
import { UserTypesContext,UserAddContext,PermissionsAddContext,StatusAddContext,UsersContext } from "../../../../contexts/UsersProvider";
import { AnimationContext,ActionBlockContext,KeyboardContext,KeyboardViewContext,TouchContext } from "../../../../contexts/VariablesProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
import { RefKeyboardContext } from "../../../../contexts/RefsProvider";
// Hooks personalizados
import { ResetTextFieldsPermissions,ResetTextFieldsUser,ResetTextFieldsStatus } from "../../../../hooks/users/Texts";
import { HandleModalViewUsers } from "../../../../hooks/users/Views";
import { HandleUserAdd } from "../../../../hooks/users/Forms";
//__________IMAGENES__________
import Hospital from '../../../imgs/Logo-Hospital.png'
//__________IMAGENES__________
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { IoIosAddCircle } from "react-icons/io";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Modal_Form_White_50,Container_Modal_Image,Container_Modal_Form,Container_Modal_Form_White,Container_Row_NG_Center,Container_Row_Left,Container_Row_100_Center,Container_Column_90_Center,Container_Row_95_Center,Container_Row_NG_95_Center } from "../../../styled/Containers";
import { Text_Title_28_Black,Text_Span_16_Left_Black,Text_Color_Blue_16,Text_Span_16_Center_Black } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Green_210 } from "../../../styled/Buttons";
import { Icon_White_22,Icon_Button_Blue_16 } from "../../../styled/Icons";
import { Input_Text_100_Black,Input_Radio_16, Input_Group } from "../../../styled/Inputs";
import { Label_Text_12_Black } from "../../../styled/Labels";
import { Image_Modal_Fixed } from "../../../styled/Imgs";
import { Alert_Verification,Alert_Sonner_Warning } from "../../../styled/Alerts";
// Componentes personalizados
import Virtual_Keyboard from "../../../forms/Keyboard";
//____________IMPORT/EXPORT____________

// Modal para agregar usuarios a su tabla
export default function User_Add(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    const [isTextFieldsPermissions] = useContext(TextFieldsPermissionsContext);
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
    const [isTouch,setIsTouch] = useContext(TouchContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewUsers = HandleModalViewUsers();
    const handleUserAdd = HandleUserAdd();
    const resetTextFieldsUser = ResetTextFieldsUser();
    const resetTextFieldsPermissions = ResetTextFieldsPermissions();
    const resetTextFieldsStatus = ResetTextFieldsStatus();
    // Constantes con el valor de useState
    const [isTotalName,setIsTotalName] = useState(0);
    const [isTotalShortName,setIsTotalShortName] = useState(0);
    const [isTotalUser,setIsTotalUser] = useState(0);
    const [isTotalPassword,setIsTotalPassword] = useState(0);
    // Constantes con el valor de useRef
    const lastTouchTimeRef = useRef(0);
    const isTouchRef = useRef(isTouch);
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
    // UseEffect que determina la visibilidad del teclado
    useEffect(() => {
        const handleTouchStart = () => {
            lastTouchTimeRef.current = Date.now();
            setIsTouch(true);
        };

        const handleMouseDown = () => {
            const now = Date.now();
            const timeSinceLastTouch = now - lastTouchTimeRef.current;

            // Solo si no hubo un touch reciente, considera que es mouse
            if (timeSinceLastTouch > 500) {
                setIsTouch(false);
            }
        };

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('mousedown', handleMouseDown);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('mousedown', handleMouseDown);
        };
    },[]);
    // UseEffects que determina que se mantenga visible del teclado
    useEffect(() => {
        const handleClickOutside = (event) => {
            setTimeout(() => {
                const inputName = document.getElementById("Input-Name");
                const inputShortName = document.getElementById("Input-ShortName");
                const inputUser = document.getElementById("Input-User");
                const inputPassword = document.getElementById("Input-Password");
                const keyboard = Keyboard.current && Keyboard.current.contains(event.target);
    
                const clickInsideInputs = 
                    (inputName && inputName.contains(event.target)) ||
                    (inputShortName && inputShortName.contains(event.target)) ||
                    (inputUser && inputUser.contains(event.target)) ||
                    (inputPassword && inputPassword.contains(event.target));
    
                if (!clickInsideInputs && !keyboard) {
                    setIsKeyboardView('');
                    setTimeout(() => {
                        setIsKeyboard(false);
                    }, 500);
                }
            }, 0);
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
    
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [Keyboard]);
    useEffect(() => {
        isTouchRef.current = isTouch;
    }, [isTouch]);
    // useEffect para escribir en los campos del formulario
    const handleKeyboard = (newValue) => {
        if(isKeyboardView === 'Name' ){
            if (newValue.length > 150) return;
            setIsTextFieldsUser(prev => ({
                ...prev,
                nombre: newValue, 
            }));
        }
        if(isKeyboardView === 'ShortName' ){
            if (newValue.length > 50) return;
            setIsTextFieldsUser(prev => ({
                ...prev,
                nombrecorto: newValue, 
            }));
        }
        if(isKeyboardView === 'User' ){
            if (newValue.length > 25) return;
            setIsTextFieldsUser(prev => ({
                ...prev,
                usuario: newValue, 
            }));
        }
        if(isKeyboardView === 'Password' ){
            if (newValue.length > 15) return;
            setIsTextFieldsUser(prev => ({
                ...prev,
                contrasena: newValue, 
            }));
        }
    };
    // UseEffect para abrir modal de los permisos
    useEffect(() => {
        if(isTextFieldsUser.permisos === 'Personalizado' && !isAnimation && !isSubModal){
            setIsSubModal(true);
            sessionStorage.setItem('Estado del Sub-Modal',true);
            setIsAnimation(true);
            sessionStorage.setItem('Animación',true);
            setTimeout(() => {
                navigate('/Administration/Index/Users/Users/Add/Permissions',{ replace: true });
            },200);
        }if(isTextFieldsUser.permisos === 'Default'){
            setIsAnimation(false);
            sessionStorage.removeItem('Animación',false);
            setIsSubModal(false);
            sessionStorage.removeItem('Estado del Sub-Modal',false);
        }
    },[isTextFieldsUser]);
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

            Alert_Verification(promise,'¡Agregando un usuario!...');
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

            Alert_Verification(promise,'¡Agregando permisos al usuario!...');
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

            Alert_Verification(promise,'¡Agregando estatus al usuario!...');
        }
    },[isStatusAdd]);
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <>
                    <Container_Modal_Background_Black>
                        <Container_Modal_Image/>
                        <Image_Modal_Fixed src={Hospital}/>
                        <Container_Modal_Form_White_50 className={currentMView === 'Usuario-Agregar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Modal_Form>
                                <Text_Title_28_Black>AGREGAR USUARIO</Text_Title_28_Black>
                                <Container_Modal_Form_White className='shadow-out-container-light-infinite'>
                                    <Container_Row_NG_Center>
                                        <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                        <Text_Span_16_Center_Black>: Datos generales</Text_Span_16_Center_Black>
                                    </Container_Row_NG_Center>
                                    <Container_Row_Left>
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
                                                    if(isTouchRef.current){
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
                                    </Container_Row_Left>
                                    <Container_Row_Left>
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
                                                    if(isTouchRef.current){
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
                                    </Container_Row_Left>
                                    <Container_Row_Left>
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
                                                    if(isTouchRef.current){
                                                        setIsKeyboard(true);
                                                        setIsKeyboardView('User');
                                                    }
                                                }}
                                            />
                                            <Label_Text_12_Black>{isTotalUser}/25</Label_Text_12_Black>
                                        </Input_Group>
                                    </Container_Row_Left>
                                    <Container_Row_Left>
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
                                                    if(isTouchRef.current){
                                                        setIsKeyboard(true);
                                                        setIsKeyboardView('Password');
                                                    }
                                                }}
                                            />
                                            <Label_Text_12_Black>{isTotalPassword}/15</Label_Text_12_Black>
                                        </Input_Group>
                                    </Container_Row_Left>
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
                                                    singleValue: (provided,state) => ({
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
                                            <Container_Row_95_Center>
                                                <Text_Span_16_Left_Black ThemeMode={themeMode}>No hay datos disponibles</Text_Span_16_Left_Black>
                                            </Container_Row_95_Center>
                                        </>
                                    )}
                                </Container_Modal_Form_White>
                                <Container_Row_NG_95_Center>
                                    <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Left_Black ThemeMode={themeMode}>- Datos especificos...</Text_Span_16_Left_Black>
                                </Container_Row_NG_95_Center>
                                <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                    <Container_Row_NG_95_Center>
                                        <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                        <Text_Span_16_Left_Black ThemeMode={themeMode}>- Permisos...</Text_Span_16_Left_Black>
                                    </Container_Row_NG_95_Center>
                                    <Container_Row_100_Center>
                                        {['Default','Personalizado'].map((item,index) => (
                                            <Label_Text_12_Black ThemeMode={themeMode} key={index}>
                                                <Input_Radio_16 ThemeMode={themeMode}
                                                    type="radio"
                                                    name="permissions"
                                                    disabled={isActionBlock}
                                                    value={item}
                                                    checked={isTextFieldsUser.permisos === item}
                                                    onChange={(e) => setIsTextFieldsUser(prev => ({...prev, permisos: e.target.value}))}
                                                />
                                                {item}
                                            </Label_Text_12_Black>
                                        ))};
                                    </Container_Row_100_Center>
                                    <Container_Row_NG_95_Center>
                                        <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                        <Text_Span_16_Left_Black ThemeMode={themeMode}>- Estatus...</Text_Span_16_Left_Black>
                                    </Container_Row_NG_95_Center>
                                    <Container_Row_100_Center>
                                        {['Habilitado','Deshabilitado'].map((item,index) => (
                                            <Label_Text_12_Black ThemeMode={themeMode} key={index}>
                                                <Input_Radio_16 ThemeMode={themeMode}
                                                    type="radio"
                                                    name="status"
                                                    disabled={isActionBlock}
                                                    value={item}
                                                    checked={isTextFieldsUser.estatus === item}
                                                    onChange={(e) => setIsTextFieldsUser(prev => ({...prev, estatus: e.target.value}))}
                                                />
                                                {item}
                                            </Label_Text_12_Black>
                                        ))};
                                    </Container_Row_100_Center>
                                </Container_Column_90_Center>
                                <Container_Row_95_Center>
                                    <Tooltip title='Cancelar' placement='top'>
                                        <Button_Icon_Blue_210 ThemeMode={themeMode} className='pulsate-buttom'
                                            onClick={() => handleModalViewUsers('')}
                                            disabled={isActionBlock}    
                                        >
                                            <Icon_White_22><MdCancel/></Icon_White_22>
                                        </Button_Icon_Blue_210>
                                    </Tooltip>
                                    <Tooltip title='Agregar' placement='top'>
                                        <Button_Icon_Green_210 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                            onClick={() => handleUserAdd()}
                                            disabled={isActionBlock}    
                                        >
                                            <Icon_White_22><IoIosAddCircle/></Icon_White_22>
                                        </Button_Icon_Green_210>
                                    </Tooltip>
                                </Container_Row_95_Center>
                            </Container_Modal_Form>
                        </Container_Modal_Form_White_50>
                        {isKeyboard ? (
                            <>
                                <Virtual_Keyboard value={isKeyboardView === 'Name' ? isTextFieldsUser.nombre : 
                                                         isKeyboardView === 'ShortName' ? isTextFieldsUser.nombrecorto :
                                                         isKeyboardView === 'User' ? isTextFieldsUser.usuario : isTextFieldsUser.contrasena} onChange={handleKeyboard}/>  
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