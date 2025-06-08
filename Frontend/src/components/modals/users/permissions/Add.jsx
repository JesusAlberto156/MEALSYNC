//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
import Select from "react-select";
// Contextos
import { ThemeModeContext,ModalViewContext,ModalContext } from "../../../../contexts/ViewsProvider";
import { ActionBlockContext } from "../../../../contexts/VariablesProvider";
import { TextFieldsPermissionsContext } from "../../../../contexts/FormsProvider";
import { PermissionsAddContext,PermissionsContext } from "../../../../contexts/UsersProvider";
import { SocketContext,LogAddContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleModalView } from "../../../../hooks/Views";
import { HandlePermissionsAdd,FilteredRecordsHasPermissions } from "../../../../hooks/Form";
import { ResetTextFieldsPermissions,ResetTextFieldsUser,ResetTextFieldsStatus } from "../../../../hooks/Texts";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { IoIosAddCircle } from "react-icons/io";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_450,Container_Row_95_Center,Container_Row_NG_95_Center,Container_Column_90_Center } from "../../../styled/Containers";
import { Button_Icon_Blue_180,Button_Icon_Green_180 } from "../../../styled/Buttons";
import { Icon_White_22 } from "../../../styled/Icons";
import { Text_Title_30_Center,Text_A_16_Left,Text_Blue_16_Left,Text_A_20_Center } from "../../../styled/Text";
import { Label_Text_16_Center } from "../../../styled/Labels";
import { Input_Checkbox_16 } from "../../../styled/Inputs";
import { Alert_Verification } from "../../../styled/Alerts";
//____________IMPORT/EXPORT____________

// Modal para agregar permisos a los usuarios
export default function Permissions_Add(){
    // Constantes con el valor de los contextos
    const [socket] = useContext(SocketContext);
    const [themeMode] = useContext(ThemeModeContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isPermissionsAdd,setIsPermissionsAdd] = useContext(PermissionsAddContext);
    const [isTextFieldsPermissions,setIsTextFieldsPermissions] = useContext(TextFieldsPermissionsContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isLogAdd,setIsLogAdd] = useContext(LogAddContext);
    const [isPermissions] = useContext(PermissionsContext);
    // Constantes con los valores de useRef 
    const Permissions = useRef('');
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handlePermissionsAdd = HandlePermissionsAdd();
    const handleModalView = HandleModalView();
    const resetTextFieldsUser = ResetTextFieldsUser();
    const resetTextFieldsPermissions = ResetTextFieldsPermissions();
    const resetTextFieldsStatus = ResetTextFieldsStatus();
    const filteredRecordsHasPermissions = FilteredRecordsHasPermissions();
    // Función para obtener la hora exacta del sistema
    function getLocalDateTimeOffset(hoursOffset = -7) {
        const now = new Date();
        now.setHours(now.getHours() + hoursOffset); // Restar 7 horas
        const pad = (n) => n.toString().padStart(2, '0');
        const year = now.getFullYear();
        const month = pad(now.getMonth() + 1);
        const day = pad(now.getDate());
        const hours = pad(now.getHours());
        const minutes = pad(now.getMinutes());
        const seconds = pad(now.getSeconds());
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    // UseEffect para agregar datos a la base de datos
    useEffect(() => {
        if(isPermissionsAdd && isPermissions.length !== 0 && Permissions.current !== 'PERMISSIONS'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Permissions',isLoggedUser.usuario,isTextFieldsPermissions.usuario,isTextFieldsPermissions.administrador,isTextFieldsPermissions.chef,isTextFieldsPermissions.almacenista,isTextFieldsPermissions.cocinero,isTextFieldsPermissions.nutriologo,isTextFieldsPermissions.medico,isTextFieldsPermissions.idusuario);
                        
                        resolve('¡MEALSYNC agregó los permisos al usuario!...')

                        isPermissionsAdd(false);
                    },2000);
                }catch(e){
                    setIsActionBlock(false);
                    setIsPermissionsAdd(false);
                    return reject('¡Ocurrio un error inesperado agregando los permisos al usuario!...');
                }
            });

            Permissions.current = 'PERMISSIONS'

            Alert_Verification(promise,'¡Agregando permisos al usuario!...');
        }
        if(isPermissions.some(permission => permission.idusuario === isTextFieldsPermissions.idusuario)){
            setIsTextFieldsPermissions(prev => ({
                ...prev,
                idpermiso: isPermissions.find(permission => permission.idusuario === isTextFieldsPermissions.idusuario)?.idpermiso
            }));
            setIsLogAdd(true);
        }
        if(isLogAdd && isTextFieldsPermissions.idpermiso !== 0 && Permissions.current !== 'LOG'){
            Permissions.current = 'LOG';
            socket.emit('Insert-Log-Permissions',isLoggedUser.usuario,getLocalDateTimeOffset(),'INSERT',isTextFieldsPermissions.idpermiso,isLoggedUser.idusuario,String(isTextFieldsPermissions.administrador),String(isTextFieldsPermissions.chef),String(isTextFieldsPermissions.almacenista),String(isTextFieldsPermissions.cocinero),String(isTextFieldsPermissions.nutriologo),String(isTextFieldsPermissions.medico),'0',String(isTextFieldsPermissions.idusuario));
            setIsLogAdd(false);

            const route = sessionStorage.getItem('Ruta');

            setCurrentMView('');
            sessionStorage.setItem('Vista del Modal','');
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Estado del Modal',false);
                resetTextFieldsUser();
                resetTextFieldsPermissions();
                resetTextFieldsStatus();
                setIsActionBlock(false);
                setIsPermissionsAdd(false);
                navigate(route,{ replace: true });
            },750);
        }
    },[isPermissionsAdd,isPermissions,isTextFieldsPermissions.idpermiso])
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <>
                    <Container_Modal>
                        <Container_Form_450 ThemeMode={themeMode} className={currentMView === 'Permisos-Agregar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Text_Title_30_Center ThemeMode={themeMode}>AGREGAR PERMISOS</Text_Title_30_Center>
                            <Container_Row_NG_95_Center>
                                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                <Text_A_16_Left ThemeMode={themeMode}>- Datos generales...</Text_A_16_Left>
                            </Container_Row_NG_95_Center>
                            <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                    <Container_Row_NG_95_Center>
                                    <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                    <Text_A_16_Left ThemeMode={themeMode}>- Usuarios...</Text_A_16_Left>
                                </Container_Row_NG_95_Center>
                                {filteredRecordsHasPermissions.length !== 0 ? (
                                    <>
                                        <Container_Row_95_Center>
                                            <Select
                                                options={filteredRecordsHasPermissions.map((user) => ({
                                                    value: user.idusuario,
                                                    label: user.usuario
                                                }))}
                                                styles={{
                                                    control: (provided) => ({
                                                        ...provided,
                                                        width: '350px',
                                                        padding: '6px',
                                                        border: '2px solid black',
                                                        borderRadius: '20px',
                                                        fontFamily: 'Century Gothic',
                                                        fontStyle: 'normal',
                                                        fontSize: '18px',
                                                        cursor: 'pointer',
                                                        '@media (max-width: 768px)':{
                                                            width: '300px',
                                                            padding: '4px',
                                                            fontSize: '16px',
                                                        },
                                                        '@media (max-width: 480px)':{
                                                            width: '250px',
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
                                                value={filteredRecordsHasPermissions
                                                    .map(user => ({ value: user.idusuario, label: user.usuario }))
                                                    .find(option => option.value === isTextFieldsPermissions.idusuario)
                                                }
                                                onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, idusuario: e.value, usuario: e.label}))}
                                                isDisabled={isActionBlock}
                                            />
                                        </Container_Row_95_Center>
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
                                <Text_A_16_Left ThemeMode={themeMode}>- Datos especificos...</Text_A_16_Left>
                            </Container_Row_NG_95_Center>
                            <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Container_Row_NG_95_Center>
                                    <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                    <Text_A_16_Left ThemeMode={themeMode}>- Área de administración...</Text_A_16_Left>
                                </Container_Row_NG_95_Center>
                                <Container_Row_95_Center>
                                    <Label_Text_16_Center ThemeMode={themeMode}>
                                        <Input_Checkbox_16 ThemeMode={themeMode}
                                            value={isTextFieldsPermissions.administrador}
                                            onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, administrador: e.target.checked ? 1 : 0}))}
                                            type="checkbox"
                                            disabled={isActionBlock}
                                        />
                                        Administrador
                                    </Label_Text_16_Center>
                                    <Label_Text_16_Center ThemeMode={themeMode}>
                                        <Input_Checkbox_16 ThemeMode={themeMode}
                                            value={isTextFieldsPermissions.chef}
                                            onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, chef: e.target.checked ? 1 : 0}))}
                                            type="checkbox"
                                            disabled={isActionBlock}
                                        />
                                        Chef
                                    </Label_Text_16_Center>
                                    <Label_Text_16_Center ThemeMode={themeMode}>
                                        <Input_Checkbox_16 ThemeMode={themeMode}
                                            type="checkbox"
                                            disabled={isActionBlock}
                                            value={isTextFieldsPermissions.almacenista}
                                            onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, almacenista: e.target.checked ? 1 : 0}))}
                                        />
                                        Almacenista
                                    </Label_Text_16_Center>
                                </Container_Row_95_Center>
                                <Container_Row_NG_95_Center>
                                    <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                    <Text_A_16_Left ThemeMode={themeMode}>- Área de cocina...</Text_A_16_Left>
                                </Container_Row_NG_95_Center>
                                <Container_Row_95_Center>
                                    <Label_Text_16_Center ThemeMode={themeMode}>
                                        <Input_Checkbox_16 ThemeMode={themeMode}
                                            type="checkbox"
                                            disabled={isActionBlock}
                                            value={isTextFieldsPermissions.cocinero}
                                            onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, cocinero: e.target.checked ? 1 : 0}))}
                                        />
                                        Cocinero
                                    </Label_Text_16_Center>
                                    <Label_Text_16_Center ThemeMode={themeMode}>
                                        <Input_Checkbox_16 ThemeMode={themeMode}
                                            type="checkbox"
                                            disabled={isActionBlock}
                                            value={isTextFieldsPermissions.nutriologo}
                                            onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, nutriologo: e.target.checked ? 1 : 0}))}
                                        />
                                        Nutriólogo
                                    </Label_Text_16_Center>
                                    <Label_Text_16_Center ThemeMode={themeMode}>
                                        <Input_Checkbox_16 ThemeMode={themeMode}
                                            type="checkbox"
                                            disabled={isActionBlock}
                                            value={isTextFieldsPermissions.medico}
                                            onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, medico: e.target.checked ? 1 : 0}))}
                                        />
                                        Médico
                                    </Label_Text_16_Center>
                                </Container_Row_95_Center>
                            </Container_Column_90_Center>
                            <Container_Row_95_Center>
                                <Tooltip title='Cancelar' placement='top'>
                                    <Button_Icon_Blue_180 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalView('')}
                                        disabled={isActionBlock}    
                                    >
                                        <Icon_White_22><MdCancel/></Icon_White_22>
                                    </Button_Icon_Blue_180>
                                </Tooltip>
                                <Tooltip title='Agregar' placement='top'>
                                    <Button_Icon_Green_180 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                        onClick={() => handlePermissionsAdd()}
                                        disabled={isActionBlock}
                                    >
                                        <Icon_White_22><IoIosAddCircle/></Icon_White_22>
                                    </Button_Icon_Green_180>
                                </Tooltip>
                            </Container_Row_95_Center>
                        </Container_Form_450>
                    </Container_Modal>
                </>
            ):(
                <></>
            )}
        </>
    );
}