//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
import Select from "react-select";
// Contextos
import { SocketContext } from "../../../../contexts/SocketProvider";
import { ModalContext,ThemeModeContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { TextFieldsContext,RadioPermissionsContext,RadioStatusContext,CheckboxContext } from "../../../../contexts/FormsProvider";
import { UserTypesContext,UserAddContext,PermissionsAddContext,StatusAddContext,UsersContext } from "../../../../contexts/UsersProvider";
import { AnimationContext,ActionBlockContext } from "../../../../contexts/VariablesProvider";
// Hooks personalizados
import { HandleModalView } from "../../../../hooks/Views";
import { HandleUserAdd } from "../../../../hooks/Form";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { FaUserPlus } from "react-icons/fa";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Row_90_Center,Container_Row_100_Center,Container_Column_90_Center,Container_Row_90_Left } from "../../../styled/Containers";
import { Text_Title_30_Center,Text_A_16_Left,Text_A_16_Center } from "../../../styled/Text";
import { Button_Icon_Blue_160,Button_Icon_Green_160 } from "../../../styled/Buttons";
import { Icon_White_26 } from "../../../styled/Icons";
import { Input_Text_Black_100,Input_Radio_16 } from "../../../styled/Inputs";
import { Label_Text_16_Center } from "../../../styled/Labels";
import { Alert_Verification } from "../../../styled/Alerts";
//____________IMPORT/EXPORT____________

// Modal para ver la contraseña de usuarios
export default function User_Add(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isTextFields,setIsTextFields] = useContext(TextFieldsContext);
    const [isUserTypes] = useContext(UserTypesContext);
    const [isRadioPermissions,setIsRadioPermissions] = useContext(RadioPermissionsContext);
    const [isRadioStatus,setIsRadioStatus] = useContext(RadioStatusContext);
    const [isAnimation,setIsAnimation] = useContext(AnimationContext);
    const [isCheckbox,setIsCheckbox] = useContext(CheckboxContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isUserAdd,setIsUserAdd] = useContext(UserAddContext);
    const [isPermissionsAdd,setIsPermissionsAdd] = useContext(PermissionsAddContext);
    const [isStatusAdd,setIsStatusAdd] = useContext(StatusAddContext);
    const [socket] = useContext(SocketContext);
    const [isUsers] = useContext(UsersContext);
    // Estados iniciales de los contextos
    const initialTextFields = {
        name: '',
        shortName: '',
        user: '',
        password: '',
        userTypes: 0,
    };
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const handleUserAdd = HandleUserAdd();
    // UseEffect para abrir modal de los permisos
    useEffect(() => {
        if(isRadioPermissions === 'Personalizado' && isCheckbox.length === 0){
            setIsAnimation(true);
            navigate('/Administration/Users/Users/Add/Permissions',{ replace: true });
        }
        if(isRadioPermissions === 'Default'){
            setIsCheckbox([]);
        }
    },[isRadioPermissions]);
    // UseEffect para agregar datos a la base de datos
    useEffect(() => {
        if(isUserAdd){
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('User-Insert',isTextFields.userTypes,isTextFields.name,isTextFields.shortName,isTextFields.user,isTextFields.password)
                    
                        socket.on('User-Insert',(message,user) => {
                            console.log(message,user);
                            socket.emit('Users');
                        });

                        resolve('¡¡MEALSYNC agrego al usuario!...');

                        setIsUserAdd(false);
                        setIsPermissionsAdd(true);

                        return () => {
                            socket.off('User-Insert');
                        }
                    },1000);
                }catch(error){
                    setIsAnimation(false);
                    setIsActionBlock(false);
                    setIsUserAdd(false);
                    setIsPermissionsAdd(false);
                    setIsStatusAdd(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'¡Agregando un usuario!...');
        }
        if(isPermissionsAdd){
            if(isRadioPermissions !== ''){
                const user = isUsers.find(user => user.usuario === isTextFields.user);
                if(user){
                    const promise = new Promise(async (resolve,reject) => {
                        try{
                            setTimeout(() => {
                                if(isRadioPermissions === 'Personalizado'){
                                    let Administrator = 0,Chef = 0,Storekeeper = 0,Cook = 0,Nutritionist = 0,Doctor = 0;
                                    isCheckbox.map(permission => {
                                        if(permission.name === 'Administrator' && permission.value) Administrator = 1 
                                        if(permission.name === 'Chef' && permission.value) Chef = 1 
                                        if(permission.name === 'Storekeeper' && permission.value) Storekeeper = 1 
                                        if(permission.name === 'Cook' && permission.value) Cook = 1 
                                        if(permission.name === 'Nutritionist' && permission.value) Nutritionist = 1 
                                        if(permission.name === 'Doctor' && permission.value) Doctor = 1 
                                    });
                                    socket.emit('Permissions-Insert',user.idusuario,user.usuario,Administrator,Chef,Storekeeper,Cook,Nutritionist,Doctor);
                                    
                                    socket.on('Permissions-Insert',(message,user) => {
                                        console.log(message,user);
                                        socket.emit('Permissions');
                                    });
                                }else{
                                    socket.emit('Permissions-Insert',user.idusuario,user.usuario,0,0,0,0,0,0);

                                    socket.on('Permissions-Insert',(message,user) => {
                                        console.log(message,user);
                                        socket.emit('Permissions');
                                    });
                                }

                                resolve('¡MEALSYNC agregó los permisos al usuario!...')

                                setIsRadioPermissions('');
                                setIsPermissionsAdd(false);
                                setIsStatusAdd(true);

                                return () => {
                                    socket.off('Permissions-Insert');
                                }
                            },1000);
                        }catch(error){
                            setIsAnimation(false);
                            setIsActionBlock(false);
                            setIsUserAdd(false);
                            setIsPermissionsAdd(false);
                            setIsStatusAdd(false);
                            return reject('¡Ocurrio un error inesperado agregando los permisos al usuario!...');
                        }
                    });

                    Alert_Verification(promise,'¡Agregando permisos al usuario!...');
                }
            }
        }
        if(isStatusAdd){
            if(isRadioStatus !== ''){
                const promise = new Promise(async (resolve,reject) => {
                    try{
                        setTimeout(() => {
                            const user = isUsers.find(user => user.usuario === isTextFields.user);
                            if(user){
                                socket.emit('Status-Insert',user.idusuario,isRadioStatus === 'Habilitado' ? 1:0,user.usuario);

                                socket.on('Status-Insert',(message,user) => {
                                    console.log(message,user);
                                    socket.emit('Status');
                                });
                                
                                resolve('¡MEALSYNC agregó el status al usuario!...');

                                setCurrentMView('');
                                setTimeout(() => {
                                    setIsModal(false);
                                    setIsTextFields(initialTextFields);
                                    setIsRadioPermissions('');
                                    setIsRadioStatus('');
                                    setIsCheckbox([]);
                                    setIsAnimation(false);
                                    setIsActionBlock(false);
                                    setIsUserAdd(false);
                                    setIsPermissionsAdd(false);
                                    setIsStatusAdd(false);
                                    navigate('/Administration/Users/Users',{ replace: true });
                                },1550);

                                return () => {
                                    socket.off('Status-Insert');
                                }
                            }
                        },1000);
                    }catch(error){
                        
                        setIsAnimation(false);
                        setIsActionBlock(false);
                        setIsUserAdd(false);
                        setIsPermissionsAdd(false);
                        setIsStatusAdd(false);
                        return reject('¡Ocurrio un error inesperado agregando el estatus al usuario!...');
                    }
                });

                Alert_Verification(promise,'¡Agregando estatus al usuario!...');
            }
        }
    },[isUserAdd,isStatusAdd,isUsers])
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <>
                    <Container_Modal>
                        <Container_Form_500 ThemeMode={themeMode} className={currentMView === 'User-Add' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Row_100_Center>
                                <Text_Title_30_Center ThemeMode={themeMode}>AGREGAR USUARIO</Text_Title_30_Center>
                            </Container_Row_100_Center>
                            <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Container_Row_90_Left>
                                    <Text_A_16_Left ThemeMode={themeMode}>Ingresar datos del usuario...</Text_A_16_Left>
                                </Container_Row_90_Left>
                                <Container_Row_100_Center>
                                    <Text_A_16_Left ThemeMode={themeMode}>Nombre:</Text_A_16_Left>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        placeholder="Nombre completo..."
                                        type="text"
                                        value={isTextFields.name}
                                        onChange={(e) => setIsTextFields(prev => ({...prev, name: e.target.value}))}
                                    />
                                </Container_Row_100_Center>
                                <Container_Row_100_Center>
                                    <Text_A_16_Left ThemeMode={themeMode}>Nombre corto:</Text_A_16_Left>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        placeholder="Primer nombre y apellido..."
                                        type="text"
                                        value={isTextFields.shortName}
                                        onChange={(e) => setIsTextFields(prev => ({...prev, shortName: e.target.value}))}
                                    />
                                </Container_Row_100_Center>
                                <Container_Row_100_Center>
                                    <Text_A_16_Left ThemeMode={themeMode}>Usuario:</Text_A_16_Left>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        placeholder="Nombre de usuario..."
                                        type="text"
                                        value={isTextFields.user}
                                        onChange={(e) => setIsTextFields(prev => ({...prev, user: e.target.value}))}
                                    />
                                </Container_Row_100_Center>
                                <Container_Row_100_Center>
                                    <Text_A_16_Left ThemeMode={themeMode}>Contraseña:</Text_A_16_Left>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        placeholder="Contraseña de usuario..."
                                        type="password"
                                        value={isTextFields.password}
                                        onChange={(e) => setIsTextFields(prev => ({...prev, password: e.target.value}))}
                                    />
                                </Container_Row_100_Center>
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
                                        .find(option => option.value === isTextFields.userTypes)
                                    }
                                    onChange={(e) => setIsTextFields(prev => ({...prev, userTypes: e.value}))}
                                />
                            </Container_Column_90_Center>
                            <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Text_A_16_Center ThemeMode={themeMode}>Permisos...</Text_A_16_Center>
                                <Container_Row_100_Center>
                                    {['Default','Personalizado'].map((item,index) => (
                                        <Label_Text_16_Center ThemeMode={themeMode} key={index}>
                                            <Input_Radio_16 ThemeMode={themeMode}
                                                type="radio"
                                                name="permissions"
                                                value={item}
                                                checked={isRadioPermissions === item}
                                                onChange={(e) => setIsRadioPermissions(e.target.value)}
                                            />
                                            {item}
                                        </Label_Text_16_Center>
                                    ))};
                                </Container_Row_100_Center>
                            </Container_Column_90_Center>
                            <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Text_A_16_Center ThemeMode={themeMode}>Estatus...</Text_A_16_Center>
                                <Container_Row_100_Center>
                                    {['Habilitado','Deshabilitado'].map((item,index) => (
                                        <Label_Text_16_Center ThemeMode={themeMode} key={index}>
                                            <Input_Radio_16 ThemeMode={themeMode}
                                                type="radio"
                                                name="status"
                                                value={item}
                                                checked={isRadioStatus === item}
                                                onChange={(e) => setIsRadioStatus(e.target.value)}
                                            />
                                            {item}
                                        </Label_Text_16_Center>
                                    ))};
                                </Container_Row_100_Center>
                            </Container_Column_90_Center>
                            <Container_Row_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Tooltip title='Cancelar' placement='top'>
                                    <Button_Icon_Blue_160 ThemeMode={themeMode} className={isAnimation ? 'roll-out-button-left' : 'roll-in-button-left'}
                                        onClick={() => handleModalView('')}>
                                        <Icon_White_26><MdCancel/></Icon_White_26>
                                    </Button_Icon_Blue_160>
                                </Tooltip>
                                <Tooltip title='Agregar' placement='top'>
                                    <Button_Icon_Green_160 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                        onClick={() => handleUserAdd()}>
                                        <Icon_White_26><FaUserPlus/></Icon_White_26>
                                    </Button_Icon_Green_160>
                                </Tooltip>
                            </Container_Row_90_Center>
                        </Container_Form_500>
                    </Container_Modal>
                </>
            ):(
                <></>
            )}
        </>
    );
}