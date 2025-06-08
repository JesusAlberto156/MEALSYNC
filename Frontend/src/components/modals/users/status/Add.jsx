//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
import Select from "react-select";
// Contextos
import { ThemeModeContext,ModalContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { TextFieldsStatusContext } from "../../../../contexts/FormsProvider";
import { ActionBlockContext } from "../../../../contexts/VariablesProvider";
import { StatusAddContext,StatusContext } from "../../../../contexts/UsersProvider";
import { SocketContext,LogAddContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleModalView } from "../../../../hooks/Views";
import { HandleStatusSAdd,FilteredRecordsHasStatus } from "../../../../hooks/Form";
import { ResetTextFieldsPermissions,ResetTextFieldsUser,ResetTextFieldsStatus } from "../../../../hooks/Texts";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { IoIosAddCircle } from "react-icons/io";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_400,Container_Row_95_Center, Container_Row_NG_95_Center, Container_Column_90_Center } from "../../../styled/Containers";
import { Text_Title_30_Center,Text_A_16_Left,Text_Blue_16_Left,Text_A_20_Center } from "../../../styled/Text";
import { Button_Icon_Blue_150,Button_Icon_Green_150 } from "../../../styled/Buttons";
import { Label_Text_16_Center } from "../../../styled/Labels";
import { Input_Radio_16 } from "../../../styled/Inputs";
import { Icon_White_22 } from "../../../styled/Icons";
import { Alert_Verification } from "../../../styled/Alerts";
//____________IMPORT/EXPORT____________

// Modal para agregar estatus al usuario
export default function Status_Add(){
    // Constantes con el valor de los contextos 
    const [themeMode] = useContext(ThemeModeContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isStatusAdd,setIsStatusAdd] = useContext(StatusAddContext);
    const [socket] = useContext(SocketContext);
    const [isTextFieldsStatus,setIsTextFieldsStatus] = useContext(TextFieldsStatusContext);
    const [isStatus] = useContext(StatusContext);
    const [isLogAdd,setIsLogAdd] = useContext(LogAddContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    // Constantes con los valores de useRef
    const Status = useRef('');
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const filteredRecordsHasStatus = FilteredRecordsHasStatus();
    const handleStatusSAdd = HandleStatusSAdd();
    const resetTextFieldsUser = ResetTextFieldsUser();
    const resetTextFieldsPermissions = ResetTextFieldsPermissions();
    const resetTextFieldsStatus = ResetTextFieldsStatus();
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
        if(isStatusAdd && isStatus.length !== 0 && Status.current !== 'STATUS'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Status',isLoggedUser.usuario,isTextFieldsStatus.usuario,isTextFieldsStatus.estatus === 'Habilitado' ? 1:0,isTextFieldsStatus.idusuario);

                        resolve('¡MEALSYNC agregó el status al usuario!...');

                        setIsStatusAdd(false);
                    },2000);
                }catch(e){
                    setIsActionBlock(false);
                    setIsStatusAdd(false);
                    return reject('¡Ocurrio un error inesperado agregando el estatus al usuario!...');
                }
            });

            Status.current = 'STATUS';

            Alert_Verification(promise,'¡Agregando estatus al usuario!...');
        }
        if(isStatus.some(status => status.idusuario === isTextFieldsStatus.idusuario)){
            setIsTextFieldsStatus(prev => ({
                ...prev,
                idestatus: isStatus.find(status => status.idusuario === isTextFieldsStatus.idusuario)?.idestatus
            }))
            setIsLogAdd(true);
        }
        if(isLogAdd && isTextFieldsStatus.idestatus !== 0 && Status.current !== 'LOG'){
            Status.current = 'LOG';
            socket.emit('Insert-Log-Status',isLoggedUser.usuario,getLocalDateTimeOffset(),'INSERT',isTextFieldsStatus.idestatus,isLoggedUser.idusuario,isTextFieldsStatus.estatus === 'Habilitado' ? '1':'0','0',String(isTextFieldsStatus.idusuario));
        
            setIsLogAdd(false);

            const route = sessionStorage.getItem('Ruta');

            setCurrentMView('');
            sessionStorage.setItem('Vista del Modal','');
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Estado del Modal',false);
                setIsActionBlock(false);
                resetTextFieldsUser();
                resetTextFieldsPermissions();
                resetTextFieldsStatus();
                setIsStatusAdd(false);
                navigate(route,{ replace: true });
            },750);
        }
    },[isStatusAdd,isStatus,isTextFieldsStatus.idestatus]);
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <>
                    <Container_Modal>
                        <Container_Form_400 ThemeMode={themeMode} className={currentMView === 'Estatus-Agregar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Text_Title_30_Center ThemeMode={themeMode}>AGREGAR STATUS</Text_Title_30_Center>
                            <Container_Row_NG_95_Center>
                                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                <Text_A_16_Left ThemeMode={themeMode}>- Datos generales...</Text_A_16_Left>
                            </Container_Row_NG_95_Center>
                            <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Container_Row_NG_95_Center>
                                    <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                    <Text_A_16_Left ThemeMode={themeMode}>- Usuarios...</Text_A_16_Left>
                                </Container_Row_NG_95_Center>
                                {filteredRecordsHasStatus.length !== 0 ? (
                                    <>
                                        <Container_Row_95_Center>
                                            <Select
                                                options={filteredRecordsHasStatus.map((user) => ({
                                                    value: user.idusuario,
                                                    label: user.usuario
                                                }))}
                                                styles={{
                                                    control: (provided) => ({
                                                        ...provided,
                                                        width: '300px',
                                                        padding: '6px',
                                                        border: '2px solid black',
                                                        borderRadius: '20px',
                                                        fontFamily: 'Century Gothic',
                                                        fontStyle: 'normal',
                                                        fontSize: '18px',
                                                        cursor: 'pointer',
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
                                                value={filteredRecordsHasStatus
                                                    .map(user => ({ value: user.idusuario, label: user.usuario }))
                                                    .find(option => option.value === isTextFieldsStatus.idusuario)
                                                }
                                                onChange={(e) => setIsTextFieldsStatus(prev => ({...prev, idusuario: e.value, usuario: e.label}))}
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
                                    <Text_A_16_Left ThemeMode={themeMode}>- Estado...</Text_A_16_Left>
                                </Container_Row_NG_95_Center>
                                <Container_Row_95_Center>
                                    {['Habilitado','Deshabilitado'].map((item,index) => (
                                        <Label_Text_16_Center ThemeMode={themeMode} key={index}>
                                            <Input_Radio_16 ThemeMode={themeMode}
                                                type="radio"
                                                name="group"
                                                value={item}
                                                checked={isTextFieldsStatus.estatus === item}
                                                disabled={isActionBlock}
                                                onChange={(e) => setIsTextFieldsStatus(prev => ({...prev, estatus: e.target.value}))}
                                            />
                                            {item}
                                        </Label_Text_16_Center>
                                    ))};
                                </Container_Row_95_Center>
                            </Container_Column_90_Center>
                            <Container_Row_95_Center>
                                <Tooltip title='Cancelar' placement="top">
                                    <Button_Icon_Blue_150 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalView('')}
                                        disabled={isActionBlock}
                                    >
                                        <Icon_White_22><MdCancel/></Icon_White_22>
                                    </Button_Icon_Blue_150>
                                </Tooltip>
                                <Tooltip title='Agregar' placement="top">
                                    <Button_Icon_Green_150 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                        onClick={() => handleStatusSAdd()}
                                        disabled={isActionBlock}
                                    >
                                        <Icon_White_22><IoIosAddCircle/></Icon_White_22>
                                    </Button_Icon_Green_150>
                                </Tooltip>
                            </Container_Row_95_Center>
                        </Container_Form_400>
                    </Container_Modal>
                </>
            ):(
                <></>
            )}
        </>
    );
}