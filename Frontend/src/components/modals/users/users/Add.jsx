//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useRef } from "react";
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
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { IoIosAddCircle } from "react-icons/io";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Row_100_Center,Container_Column_90_Center,Container_Row_95_Center,Container_Row_NG_95_Center } from "../../../styled/Containers";
import { Text_Title_30_Center,Text_A_16_Left,Text_A_16_Center,Text_Blue_16_Left,Text_A_20_Center } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Green_210 } from "../../../styled/Buttons";
import { Icon_White_22,Icon_Button_Blue_18 } from "../../../styled/Icons";
import { Input_Text_Black_100,Input_Radio_16 } from "../../../styled/Inputs";
import { Label_Text_16_Center } from "../../../styled/Labels";
import { Alert_Verification } from "../../../styled/Alerts";
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
    // Constantes con el valor de useRef
    const lastTouchTimeRef = useRef(0);
    const isTouchRef = useRef(isTouch);
    // UseEffect que determina la visibilidad del teclado
    useEffect(() => {
        const handleTouchStart = () => {
            lastTouchTimeRef.current = Date.now();
            setIsTouch(true);
        };
    
        const handleMouseOrKey = () => {
            const now = Date.now();
            const timeSinceLastTouch = now - lastTouchTimeRef.current;
    
            // Solo desactiva touch si ha pasado más de 500ms desde el último touch
            if (timeSinceLastTouch > 500) {
                setIsTouch(false);
            }
        };

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('mousedown', handleMouseOrKey);
        window.addEventListener('keydown', handleMouseOrKey);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('mousedown', handleMouseOrKey);
            window.removeEventListener('keydown', handleMouseOrKey);
        };
    },[]);
    // UseEffect que determina que se mantenga visible del teclado
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
    // useEffect para escribir en los campos del login
    const handleKeyboard = (newValue) => {
        if(isKeyboardView === 'Name' ){
            setIsTextFieldsUser(prev => ({
                ...prev,
                nombre: newValue, 
            }));
        }
        if(isKeyboardView === 'ShortName' ){
            setIsTextFieldsUser(prev => ({
                ...prev,
                nombrecorto: newValue, 
            }));
        }
        if(isKeyboardView === 'User' ){
            setIsTextFieldsUser(prev => ({
                ...prev,
                usuario: newValue, 
            }));
        }
        if(isKeyboardView === 'Password' ){
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
                    <Container_Modal>
                        <Container_Form_500 ThemeMode={themeMode} className={currentMView === 'Usuario-Agregar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Row_100_Center>
                                <Text_Title_30_Center ThemeMode={themeMode}>AGREGAR USUARIO</Text_Title_30_Center>
                            </Container_Row_100_Center>
                            <Container_Row_NG_95_Center>
                                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                <Text_A_16_Center ThemeMode={themeMode}>- Datos generales...</Text_A_16_Center>
                            </Container_Row_NG_95_Center>
                            <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Container_Row_100_Center>
                                    <Text_A_16_Left ThemeMode={themeMode}>Nombre:</Text_A_16_Left>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        id="Input-Name"
                                        placeholder="..."
                                        type="text"
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
                                    <Icon_Button_Blue_18 ThemeMode={themeMode} className="pulsate-buttom"
                                        onClick={() => {
                                            setIsTextFieldsUser(prev => ({...prev, nombre: ''}))
                                        }}
                                        disabled={isActionBlock}
                                    >
                                        <MdCancel/>
                                    </Icon_Button_Blue_18>
                                </Container_Row_100_Center>
                                <Container_Row_100_Center>
                                    <Text_A_16_Left ThemeMode={themeMode}>Nombre corto:</Text_A_16_Left>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        id="Input-ShortName"
                                        placeholder="..."
                                        type="text"
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
                                    <Icon_Button_Blue_18 ThemeMode={themeMode} className="pulsate-buttom"
                                        onClick={() => {
                                            setIsTextFieldsUser(prev => ({...prev, nombrecorto: ''}))
                                        }}
                                        disabled={isActionBlock}
                                    >
                                        <MdCancel/>
                                    </Icon_Button_Blue_18>
                                </Container_Row_100_Center>
                                <Container_Row_100_Center>
                                    <Text_A_16_Left ThemeMode={themeMode}>Usuario:</Text_A_16_Left>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        id="Input-User"
                                        placeholder="..."
                                        type="text"
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
                                </Container_Row_100_Center>
                                <Container_Row_100_Center>
                                    <Text_A_16_Left ThemeMode={themeMode}>Contraseña:</Text_A_16_Left>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        id="Input-Password"
                                        placeholder="..."
                                        type="password"
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
                                </Container_Row_100_Center>
                                {isUserTypes.length !== 0 ? (
                                    <>
                                        <Select
                                            options={isUserTypes.map((userTypes) => ({
                                                value: userTypes.idtipo,
                                                label: userTypes.tipo
                                            }))}
                                            styles={{
                                                control: (provided) => ({
                                                    ...provided,
                                                    width: '300px',
                                                    padding: '6px',
                                                    border: '2px solid black',
                                                    cursor: 'pointer',
                                                    borderRadius: '20px',
                                                    fontFamily: 'Century Gothic',
                                                    fontStyle: 'normal',
                                                    fontSize: '18px',
                                                    '@media (max-width: 768px)':{
                                                        width: '250px',
                                                        padding: '4px',
                                                        fontSize: '16px',
                                                    },
                                                    '@media (max-width: 480px)':{
                                                        width: '200px',
                                                        padding: '2px',
                                                        fontSize: '14px',
                                                    },
                                                }),
                                                menu: (provided) => ({
                                                    ...provided,
                                                    overflow: 'hidden',
                                                    borderRadius:'15px',
                                                }),
                                                menuList: (provided) => ({
                                                    ...provided,
                                                    maxHeight:175,
                                                    fontFamily: 'Century Gothic',
                                                    fontStyle: 'normal',
                                                    overflowY:'auto',
                                                    scrollbarWidth: 'none',
                                                    '&::-webkit-scrollbar': {
                                                        display:'none',
                                                    },
                                                    '@media (max-width: 768px)':{
                                                        maxHeight:150,
                                                    },
                                                    '@media (max-width: 480px)':{
                                                        maxHeight:125,
                                                    },
                                                })
                                            }}
                                            placeholder='Seleccione uno...'
                                            value={isUserTypes
                                                .map(user => ({ value: user.idtipo, label: user.tipo }))
                                                .find(option => option.value === isTextFieldsUser.idtipo)
                                            }
                                            onChange={(e) => setIsTextFieldsUser(prev => ({...prev, idtipo: e.value}))}
                                            isDisabled={isActionBlock}
                                        />  
                                    </>
                                ):(
                                    <>
                                        <Container_Row_95_Center>
                                            <Text_A_20_Center ThemeMode={themeMode}>No hay datos disponibles</Text_A_20_Center>
                                        </Container_Row_95_Center>
                                    </>
                                )}
                            </Container_Column_90_Center>
                            <Container_Row_NG_95_Center>
                                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                <Text_A_16_Center ThemeMode={themeMode}>- Datos especificos...</Text_A_16_Center>
                            </Container_Row_NG_95_Center>
                            <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Container_Row_NG_95_Center>
                                    <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                    <Text_A_16_Center ThemeMode={themeMode}>- Permisos...</Text_A_16_Center>
                                </Container_Row_NG_95_Center>
                                <Container_Row_100_Center>
                                    {['Default','Personalizado'].map((item,index) => (
                                        <Label_Text_16_Center ThemeMode={themeMode} key={index}>
                                            <Input_Radio_16 ThemeMode={themeMode}
                                                type="radio"
                                                name="permissions"
                                                disabled={isActionBlock}
                                                value={item}
                                                checked={isTextFieldsUser.permisos === item}
                                                onChange={(e) => setIsTextFieldsUser(prev => ({...prev, permisos: e.target.value}))}
                                            />
                                            {item}
                                        </Label_Text_16_Center>
                                    ))};
                                </Container_Row_100_Center>
                                <Container_Row_NG_95_Center>
                                    <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                    <Text_A_16_Center ThemeMode={themeMode}>- Estatus...</Text_A_16_Center>
                                </Container_Row_NG_95_Center>
                                <Container_Row_100_Center>
                                    {['Habilitado','Deshabilitado'].map((item,index) => (
                                        <Label_Text_16_Center ThemeMode={themeMode} key={index}>
                                            <Input_Radio_16 ThemeMode={themeMode}
                                                type="radio"
                                                name="status"
                                                disabled={isActionBlock}
                                                value={item}
                                                checked={isTextFieldsUser.estatus === item}
                                                onChange={(e) => setIsTextFieldsUser(prev => ({...prev, estatus: e.target.value}))}
                                            />
                                            {item}
                                        </Label_Text_16_Center>
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
                        </Container_Form_500>
                        {isKeyboard ? (
                            <>
                                <Virtual_Keyboard value={isKeyboardView === 'Name' ? isTextFieldsUser.nombre : 
                                                         isKeyboardView === 'ShortName' ? isTextFieldsUser.nombrecorto :
                                                         isKeyboardView === 'User' ? isTextFieldsUser.usuario : isTextFieldsUser.contrasena} onChange={handleKeyboard}/>  
                            </>
                        ):(
                            <></>
                        )}
                    </Container_Modal>
                </>
            ):(
                <></>
            )}
        </>
    );
}