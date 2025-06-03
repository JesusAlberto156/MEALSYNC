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
import { TextFieldsPermissionsContext } from "../../../../contexts/FormsProvider";
import { PermissionsAddContext } from "../../../../contexts/UsersProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
// Hooks personalizados
import { HandleModalView } from "../../../../hooks/Views";
import { HandlePermissionsAdd,FilteredRecordsHasPermissions } from "../../../../hooks/Form";
import { ResetTextFieldsPermissions } from "../../../../hooks/Texts";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { IoIosAddCircle } from "react-icons/io";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_450,Container_Row_95_Center,Container_Row_NG_95_Left } from "../../../styled/Containers";
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
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handlePermissionsAdd = HandlePermissionsAdd();
    const handleModalView = HandleModalView();
    const resetTextFieldsPermissions = ResetTextFieldsPermissions();
    const filteredRecordsHasPermissions = FilteredRecordsHasPermissions();
    // UseEffect para agregar datos a la base de datos
    useEffect(() => {
        if(isPermissionsAdd){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Permissions-Insert',isTextFieldsPermissions.iduser,isTextFieldsPermissions.user,isTextFieldsPermissions.administrator,isTextFieldsPermissions.chef,isTextFieldsPermissions.storekeeper,isTextFieldsPermissions.cook,isTextFieldsPermissions.nutritionist,isTextFieldsPermissions.doctor);
                        
                        resolve('¡MEALSYNC agregó los permisos al usuario!...')

                        const route = sessionStorage.getItem('Route');

                        setCurrentMView('');
                        sessionStorage.setItem('Modal-View','');
                        setTimeout(() => {
                            setIsModal(false);
                            sessionStorage.setItem('Modal',false);
                            resetTextFieldsPermissions();
                            setIsActionBlock(false);
                            setIsPermissionsAdd(false);
                            navigate(route,{ replace: true });
                        },750);
                    },2000);
                }catch(e){
                    setIsActionBlock(false);
                    setIsPermissionsAdd(false);
                    return reject('¡Ocurrio un error inesperado agregando los permisos al usuario!...');
                }
            });

            Alert_Verification(promise,'¡Agregando permisos al usuario!...');
        }
    },[isPermissionsAdd])
    // UseEffect para quitar la suscrpcion de socket
    useEffect(() => {
        const handlePermissionsInsert = (message,user) => {
            console.log(message,user);
            socket.emit('Permissions');
        };

        socket.on('Permissions-Insert',handlePermissionsInsert);
        
        return () => {
            socket.off('Permissions-Insert',handlePermissionsInsert);
        }
    },[socket])
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <>
                    <Container_Modal>
                        <Container_Form_450 ThemeMode={themeMode} className={currentMView === 'Permissions-Add' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Text_Title_30_Center ThemeMode={themeMode}>AGREGAR PERMISOS</Text_Title_30_Center>
                            <Container_Row_NG_95_Left>
                                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                <Text_A_16_Left ThemeMode={themeMode}>- Selecciona un usuario...</Text_A_16_Left>
                            </Container_Row_NG_95_Left>
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
                                                    cursor: 'pointer',
                                                    borderRadius: '20px',
                                                    fontFamily: 'Century Gothic',
                                                    fontStyle: 'normal',
                                                    fontSize: '18px',
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
                                                .find(option => option.value === isTextFieldsPermissions.iduser)
                                            }
                                            onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, iduser: e.value, user: e.label}))}
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
                            <Container_Row_NG_95_Left>
                                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                <Text_A_16_Left ThemeMode={themeMode}>- Área de administración...</Text_A_16_Left>
                            </Container_Row_NG_95_Left>
                            <Container_Row_95_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Label_Text_16_Center ThemeMode={themeMode}>
                                    <Input_Checkbox_16 ThemeMode={themeMode}
                                        value={isTextFieldsPermissions.administrator}
                                        onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, administrator: e.target.checked ? 1 : 0}))}
                                        type="checkbox"
                                    />
                                    Administrador
                                </Label_Text_16_Center>
                                <Label_Text_16_Center ThemeMode={themeMode}>
                                    <Input_Checkbox_16 ThemeMode={themeMode}
                                        value={isTextFieldsPermissions.chef}
                                        onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, chef: e.target.checked ? 1 : 0}))}
                                        type="checkbox"
                                    />
                                    Chef
                                </Label_Text_16_Center>
                                <Label_Text_16_Center ThemeMode={themeMode}>
                                    <Input_Checkbox_16 ThemeMode={themeMode}
                                        type="checkbox"
                                        value={isTextFieldsPermissions.storekeeper}
                                        onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, storekeeper: e.target.checked ? 1 : 0}))}
                                    />
                                    Almacenista
                                </Label_Text_16_Center>
                            </Container_Row_95_Center>
                            <Container_Row_NG_95_Left>
                                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                <Text_A_16_Left ThemeMode={themeMode}>- Área de cocina...</Text_A_16_Left>
                            </Container_Row_NG_95_Left>
                            <Container_Row_95_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Label_Text_16_Center ThemeMode={themeMode}>
                                    <Input_Checkbox_16 ThemeMode={themeMode}
                                        type="checkbox"
                                        value={isTextFieldsPermissions.cook}
                                        onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, cook: e.target.checked ? 1 : 0}))}
                                    />
                                    Cocinero
                                </Label_Text_16_Center>
                                <Label_Text_16_Center ThemeMode={themeMode}>
                                    <Input_Checkbox_16 ThemeMode={themeMode}
                                        type="checkbox"
                                        value={isTextFieldsPermissions.nutritionist}
                                        onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, nutritionist: e.target.checked ? 1 : 0}))}
                                    />
                                    Nutriólogo
                                </Label_Text_16_Center>
                                <Label_Text_16_Center ThemeMode={themeMode}>
                                    <Input_Checkbox_16 ThemeMode={themeMode}
                                        type="checkbox"
                                        value={isTextFieldsPermissions.doctor}
                                        onChange={(e) => setIsTextFieldsPermissions(prev => ({...prev, doctor: e.target.checked ? 1 : 0}))}
                                    />
                                    Médico
                                </Label_Text_16_Center>
                            </Container_Row_95_Center>
                            <Container_Row_95_Center>
                                <Tooltip title='Cancelar' placement='top'>
                                    <Button_Icon_Blue_180 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalView('')}>
                                        <Icon_White_22><MdCancel/></Icon_White_22>
                                    </Button_Icon_Blue_180>
                                </Tooltip>
                                <Tooltip title='Agregar' placement='top'>
                                    <Button_Icon_Green_180 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                        onClick={() => handlePermissionsAdd()}>
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