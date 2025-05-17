//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
import Select from "react-select";
// Contextos
import { SocketContext } from "../../../../contexts/SocketProvider";
import { ModalContext,SubModalContext,ThemeModeContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { TextFieldsUserContext,TextFieldsPermissionsContext } from "../../../../contexts/FormsProvider";
import { UserTypesContext,UserAddContext,PermissionsAddContext,StatusAddContext,UsersContext } from "../../../../contexts/UsersProvider";
import { AnimationContext,ActionBlockContext } from "../../../../contexts/VariablesProvider";
// Hooks personalizados
import { ResetTextFieldsUser,ResetTextFieldsPermissions } from "../../../../hooks/Texts";
import { HandleModalView } from "../../../../hooks/Views";
import { HandleUserAdd } from "../../../../hooks/Form";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { IoIosAddCircle } from "react-icons/io";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Row_100_Center,Container_Column_90_Center,Container_Row_95_Center,Container_Row_NG_95_Left } from "../../../styled/Containers";
import { Text_Title_30_Center,Text_A_16_Left,Text_A_16_Center,Text_Blue_16_Left } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Green_210 } from "../../../styled/Buttons";
import { Icon_White_22 } from "../../../styled/Icons";
import { Input_Text_Black_100,Input_Radio_16 } from "../../../styled/Inputs";
import { Label_Text_16_Center } from "../../../styled/Labels";
import { Alert_Verification } from "../../../styled/Alerts";
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
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const handleUserAdd = HandleUserAdd();
    const resetTextFieldsUser = ResetTextFieldsUser();
    const resetTextFieldsPermissions = ResetTextFieldsPermissions();
    // UseEffect para abrir modal de los permisos
    useEffect(() => {
        if(isTextFieldsUser.permissions === 'Personalizado' && !isAnimation && !isSubModal){
            setIsSubModal(true);
            sessionStorage.setItem('Sub-Modal',true);
            setIsAnimation(true);
            sessionStorage.setItem('Animation',true);
            setTimeout(() => {
                navigate('/Administration/Users/Add/Permissions',{ replace: true });
            },200);
        }if(isTextFieldsUser.permissions === 'Default'){
            setIsAnimation(false);
            sessionStorage.setItem('Animation',false);
            setIsSubModal(false);
            sessionStorage.setItem('Sub-Modal',false);
        }
    },[isTextFieldsUser]);
    // UseEffect para agregar datos a la base de datos
    useEffect(() => {
        if(isUserAdd){
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setTimeout(() => {
                        if(isUsers.some(user => user.usuario === isTextFieldsUser.user)){
                            setIsActionBlock(false);
                            setIsUserAdd(false);
                            return reject('¡Usuario ya existente!...');
                        }
                        socket.emit('User-Insert',isTextFieldsUser.userTypes,isTextFieldsUser.name,isTextFieldsUser.shortName,isTextFieldsUser.user,isTextFieldsUser.password)

                        resolve('¡MEALSYNC agrego al usuario!...');

                        setIsUserAdd(false);
                        setIsPermissionsAdd(true);
                        
                    },2000);
                }catch(error){
                    setIsActionBlock(false);
                    setIsUserAdd(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'¡Agregando un usuario!...');
        }
        if(isPermissionsAdd){
            if(isTextFieldsUser.iduser !== 0){
                const promise = new Promise(async (resolve,reject) => {
                    try{
                        setTimeout(() => {
                            socket.emit('Permissions-Insert',isTextFieldsUser.iduser,isTextFieldsUser.user,isTextFieldsPermissions.administrator,isTextFieldsPermissions.chef,isTextFieldsPermissions.storekeeper,isTextFieldsPermissions.cook,isTextFieldsPermissions.nutritionist,isTextFieldsPermissions.doctor);
                            
                            resolve('¡MEALSYNC agregó los permisos al usuario!...')

                            setIsPermissionsAdd(false);
                            setIsStatusAdd(true);
                        },2000);
                    }catch(error){
                        setIsActionBlock(false);
                        setIsPermissionsAdd(false);
                        return reject('¡Ocurrio un error inesperado agregando los permisos al usuario!...');
                    }
                });

                Alert_Verification(promise,'¡Agregando permisos al usuario!...');
            }else{
                setIsTextFieldsUser(prev => ({
                    ...prev,
                    iduser: isUsers.find(user => user.usuario === isTextFieldsUser.user)?.idusuario || 0,
                }));
                setIsPermissionsAdd(true);
            }
        }
        if(isStatusAdd){
            if(isTextFieldsUser.iduser !== 0){
                const promise = new Promise(async (resolve,reject) => {
                    try{
                        setTimeout(() => {
                            socket.emit('Status-Insert',isTextFieldsUser.iduser,isTextFieldsUser.status === 'Habilitado' ? 1:0,isTextFieldsUser.user);
                            
                            resolve('¡MEALSYNC agregó el status al usuario!...');

                            const route = sessionStorage.getItem('Route');

                            setCurrentMView('');
                            sessionStorage.setItem('Modal-View','');
                            setTimeout(() => {
                                setIsModal(false);
                                sessionStorage.setItem('Modal',false);
                                setIsSubModal(false);
                                sessionStorage.setItem('Sub-Modal',false);
                                resetTextFieldsUser();
                                resetTextFieldsPermissions();
                                setIsAnimation(false);
                                sessionStorage.removeItem('Animation');
                                setIsActionBlock(false);
                                setIsStatusAdd(false);
                                navigate(route,{ replace: true });
                            },750);
                        },2000);
                    }catch(error){               
                        setIsActionBlock(false);
                        setIsStatusAdd(false);
                        return reject('¡Ocurrio un error inesperado agregando el estatus al usuario!...');
                    }
                });

                Alert_Verification(promise,'¡Agregando estatus al usuario!...');
            }
        }
    },[isUserAdd,isPermissionsAdd,isStatusAdd,isUsers,isTextFieldsUser])
    // UseEffect para quitar la suscrpcion de socket
    useEffect(() => {
        const handleUserInsert = (message,user) => {
            console.log(message,user);
            socket.emit('Users');
        };
        const handlePermissionsInsert = (message,user) => {
            console.log(message,user);
            socket.emit('Permissions');
        };
        const handleStatusInsert = (message,user) => {
            console.log(message,user);
            socket.emit('Status');
        };

        socket.on('User-Insert',handleUserInsert);
        socket.on('Permissions-Insert',handlePermissionsInsert);
        socket.on('Status-Insert',handleStatusInsert);
        
        return () => {
            socket.off('User-Insert',handleUserInsert);
            socket.off('Permissions-Insert',handlePermissionsInsert);
            socket.off('Status-Insert',handleStatusInsert);
        }
    },[socket])
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
                            <Container_Row_NG_95_Left>
                                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                <Text_A_16_Center ThemeMode={themeMode}>Datos del usuario...</Text_A_16_Center>
                            </Container_Row_NG_95_Left>
                            <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Container_Row_100_Center>
                                    <Text_A_16_Left ThemeMode={themeMode}>Nombre:</Text_A_16_Left>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        placeholder="..."
                                        type="text"
                                        value={isTextFieldsUser.name}
                                        onChange={(e) => setIsTextFieldsUser(prev => ({...prev, name: e.target.value}))}
                                    />
                                </Container_Row_100_Center>
                                <Container_Row_100_Center>
                                    <Text_A_16_Left ThemeMode={themeMode}>Nombre corto:</Text_A_16_Left>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        placeholder="..."
                                        type="text"
                                        value={isTextFieldsUser.shortName}
                                        onChange={(e) => setIsTextFieldsUser(prev => ({...prev, shortName: e.target.value}))}
                                    />
                                </Container_Row_100_Center>
                                <Container_Row_100_Center>
                                    <Text_A_16_Left ThemeMode={themeMode}>Usuario:</Text_A_16_Left>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        placeholder="..."
                                        type="text"
                                        value={isTextFieldsUser.user}
                                        onChange={(e) => setIsTextFieldsUser(prev => ({...prev, user: e.target.value}))}
                                    />
                                </Container_Row_100_Center>
                                <Container_Row_100_Center>
                                    <Text_A_16_Left ThemeMode={themeMode}>Contraseña:</Text_A_16_Left>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        placeholder="..."
                                        type="password"
                                        value={isTextFieldsUser.password}
                                        onChange={(e) => setIsTextFieldsUser(prev => ({...prev, password: e.target.value}))}
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
                                        .find(option => option.value === isTextFieldsUser.userTypes)
                                    }
                                    onChange={(e) => setIsTextFieldsUser(prev => ({...prev, userTypes: e.value}))}
                                />
                            </Container_Column_90_Center>
                            <Container_Row_NG_95_Left>
                                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                <Text_A_16_Center ThemeMode={themeMode}>Permisos...</Text_A_16_Center>
                            </Container_Row_NG_95_Left>
                            <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Container_Row_100_Center>
                                    {['Default','Personalizado'].map((item,index) => (
                                        <Label_Text_16_Center ThemeMode={themeMode} key={index}>
                                            <Input_Radio_16 ThemeMode={themeMode}
                                                type="radio"
                                                name="permissions"
                                                value={item}
                                                checked={isTextFieldsUser.permissions === item}
                                                onChange={(e) => setIsTextFieldsUser(prev => ({...prev, permissions: e.target.value}))}
                                            />
                                            {item}
                                        </Label_Text_16_Center>
                                    ))};
                                </Container_Row_100_Center>
                            </Container_Column_90_Center>
                            <Container_Row_NG_95_Left>
                                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                <Text_A_16_Center ThemeMode={themeMode}>Estatus...</Text_A_16_Center>
                            </Container_Row_NG_95_Left>
                            <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Container_Row_100_Center>
                                    {['Habilitado','Deshabilitado'].map((item,index) => (
                                        <Label_Text_16_Center ThemeMode={themeMode} key={index}>
                                            <Input_Radio_16 ThemeMode={themeMode}
                                                type="radio"
                                                name="status"
                                                value={item}
                                                checked={isTextFieldsUser.status === item}
                                                onChange={(e) => setIsTextFieldsUser(prev => ({...prev, status: e.target.value}))}
                                            />
                                            {item}
                                        </Label_Text_16_Center>
                                    ))};
                                </Container_Row_100_Center>
                            </Container_Column_90_Center>
                            <Container_Row_95_Center>
                                <Tooltip title='Cancelar' placement='top'>
                                    <Button_Icon_Blue_210 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalView('')}>
                                        <Icon_White_22><MdCancel/></Icon_White_22>
                                    </Button_Icon_Blue_210>
                                </Tooltip>
                                <Tooltip title='Agregar' placement='top'>
                                    <Button_Icon_Green_210 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                        onClick={() => handleUserAdd()}>
                                        <Icon_White_22><IoIosAddCircle/></Icon_White_22>
                                    </Button_Icon_Green_210>
                                </Tooltip>
                            </Container_Row_95_Center>
                        </Container_Form_500>
                    </Container_Modal>
                </>
            ):(
                <></>
            )}
        </>
    );
}