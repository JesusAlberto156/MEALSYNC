//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
import Select from "react-select";
// Contextos
import { ThemeModeContext,ModalViewContext,ModalContext } from "../../../../contexts/ViewsProvider";
import { ActionBlockContext } from "../../../../contexts/VariablesProvider";
import { SelectContext,CheckboxContext } from "../../../../contexts/FormsProvider";
import { PermissionsAddContext,UsersContext } from "../../../../contexts/UsersProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
// Hooks personalizados
import { HandleModalView } from "../../../../hooks/Views";
import { HandlePermissionsAdd,HandleSelect,FilteredRecordsHasPermissions,HandleCheckbox } from "../../../../hooks/Form";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { MdAddModerator } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_450,Container_Row_90_Left,Container_Column_90_Center,Container_Row_90_Center } from "../../../styled/Containers";
import { Button_Icon_Blue_160,Button_Icon_Green_160 } from "../../../styled/Buttons";
import { Icon_White_26 } from "../../../styled/Icons";
import { Text_Title_30_Center,Text_A_16_Left } from "../../../styled/Text";
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
    const [isSelect,setIsSelect] = useContext(SelectContext);
    const [isCheckbox,setIsCheckbox] = useContext(CheckboxContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isPermissionsAdd,setIsPermissionsAdd] = useContext(PermissionsAddContext);
    const [isUsers] = useContext(UsersContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handlePermissionsAdd = HandlePermissionsAdd();
    const handleModalView = HandleModalView();
    const handleSelect = HandleSelect();
    const handleCheckbox = HandleCheckbox();
    const filteredRecordsHasPermissions = FilteredRecordsHasPermissions();
    // UseEffect para agregar datos a la base de datos
    useEffect(() => {
        if(isPermissionsAdd){
                const user = isUsers.find(user => user.idusuario === isSelect.value);
                if(user){
                    const promise = new Promise(async (resolve,reject) => {
                        try{
                            setTimeout(() => {
                                if(isCheckbox.length !== 0){
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

                                setCurrentMView('');
                                sessionStorage.setItem('Modal-View','');
                                setTimeout(() => {
                                    setIsModal(false);
                                    sessionStorage.setItem('Modal',false);
                                    setIsActionBlock(false);
                                    setIsPermissionsAdd(false);
                                    setIsCheckbox([]);
                                    setIsSelect([]);
                                    navigate('/Administration/Users/Permissions',{ replace: true });
                                },750);

                                return () => {
                                    socket.off('Permissions-Insert');
                                }
                            },1000);
                        }catch(error){
                            setIsActionBlock(false);
                            setIsPermissionsAdd(false);
                            return reject('¡Ocurrio un error inesperado agregando los permisos al usuario!...');
                        }
                    });

                    Alert_Verification(promise,'¡Agregando permisos al usuario!...');
                }
        }
    },[isPermissionsAdd])
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <>
                    <Container_Modal>
                        <Container_Form_450 ThemeMode={themeMode} className={currentMView === 'Permissions-Add' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Text_Title_30_Center ThemeMode={themeMode}>AGREGAR PERMISOS</Text_Title_30_Center>
                            <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Container_Row_90_Left>
                                    <Text_A_16_Left ThemeMode={themeMode}>Selecciona un usuario...</Text_A_16_Left>
                                </Container_Row_90_Left>
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
                                    value={isSelect}
                                    onChange={handleSelect}
                                />
                            </Container_Column_90_Center>
                            <Container_Row_90_Left>
                                <Text_A_16_Left ThemeMode={themeMode}>Área de administración...</Text_A_16_Left>
                            </Container_Row_90_Left>
                            <Container_Row_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Label_Text_16_Center ThemeMode={themeMode}>
                                    <Input_Checkbox_16 ThemeMode={themeMode}
                                        value={isCheckbox.some(item => item.name === 'Administrator' && item.value)}
                                        onChange={(e) => handleCheckbox('Administrator',e)}
                                        type="checkbox"
                                    />
                                    Administrador
                                </Label_Text_16_Center>
                                <Label_Text_16_Center ThemeMode={themeMode}>
                                    <Input_Checkbox_16 ThemeMode={themeMode}
                                        value={isCheckbox.some(item => item.name === 'Chef' && item.value)}
                                        onChange={(e) => handleCheckbox('Chef',e)}
                                        type="checkbox"
                                    />
                                    Chef
                                </Label_Text_16_Center>
                                <Label_Text_16_Center ThemeMode={themeMode}>
                                    <Input_Checkbox_16 ThemeMode={themeMode}
                                        type="checkbox"
                                        value={isCheckbox.some(item => item.name === 'Storekeeper' && item.value)}
                                        onChange={(e) => handleCheckbox('Storekeeper',e)}
                                    />
                                    Almacenista
                                </Label_Text_16_Center>
                            </Container_Row_90_Center>
                            <Container_Row_90_Left>
                                <Text_A_16_Left ThemeMode={themeMode}>Área de cocina...</Text_A_16_Left>
                            </Container_Row_90_Left>
                            <Container_Row_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Label_Text_16_Center ThemeMode={themeMode}>
                                    <Input_Checkbox_16 ThemeMode={themeMode}
                                        type="checkbox"
                                        value={isCheckbox.some(item => item.name === 'Cook' && item.value)}
                                        onChange={(e) => handleCheckbox('Cook',e)}
                                    />
                                    Cocinero
                                </Label_Text_16_Center>
                                <Label_Text_16_Center ThemeMode={themeMode}>
                                    <Input_Checkbox_16 ThemeMode={themeMode}
                                        type="checkbox"
                                        value={isCheckbox.some(item => item.name === 'Nutritionist' && item.value)}
                                        onChange={(e) => handleCheckbox('Nutritionist',e)}
                                    />
                                    Nutriólogo
                                </Label_Text_16_Center>
                                <Label_Text_16_Center ThemeMode={themeMode}>
                                    <Input_Checkbox_16 ThemeMode={themeMode}
                                        type="checkbox"
                                        value={isCheckbox.some(item => item.name === 'Doctor' && item.value)}
                                        onChange={(e) => handleCheckbox('Doctor',e)}
                                    />
                                    Médico
                                </Label_Text_16_Center>
                            </Container_Row_90_Center>
                            <Container_Row_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Tooltip title='Cancelar' placement='top'>
                                    <Button_Icon_Blue_160 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalView('')}>
                                        <Icon_White_26><MdCancel/></Icon_White_26>
                                    </Button_Icon_Blue_160>
                                </Tooltip>
                                <Tooltip title='Agregar' placement='top'>
                                    <Button_Icon_Green_160 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                        onClick={() => handlePermissionsAdd()}>
                                        <Icon_White_26><MdAddModerator/></Icon_White_26>
                                    </Button_Icon_Green_160>
                                </Tooltip>
                            </Container_Row_90_Center>
                        </Container_Form_450>
                    </Container_Modal>
                </>
            ):(
                <></>
            )}
        </>
    );
}