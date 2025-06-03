//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
import Select from "react-select";
// Contextos
import { ThemeModeContext,ModalContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { TextFieldsStatusContext } from "../../../../contexts/FormsProvider";
import { ActionBlockContext } from "../../../../contexts/VariablesProvider";
import { StatusAddContext } from "../../../../contexts/UsersProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
// Hooks personalizados
import { HandleModalView } from "../../../../hooks/Views";
import { HandleStatusSAdd,FilteredRecordsHasStatus } from "../../../../hooks/Form";
import { ResetTextFieldsStatus } from "../../../../hooks/Texts";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { IoIosAddCircle } from "react-icons/io";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_400,Container_Row_NG_95_Left,Container_Row_95_Center } from "../../../styled/Containers";
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
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const filteredRecordsHasStatus = FilteredRecordsHasStatus();
    const handleStatusSAdd = HandleStatusSAdd();
    const resetTextFieldsStatus = ResetTextFieldsStatus();
    // UseEffect para agregar datos a la base de datos
    useEffect(() => {
        if(isStatusAdd){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Status-Insert',isTextFieldsStatus.iduser,isTextFieldsStatus.status === 'Habilitado' ? 1:0,isTextFieldsStatus.user);

                        resolve('¡MEALSYNC agregó el status al usuario!...');

                        const route = sessionStorage.getItem('Route');

                        setCurrentMView('');
                        sessionStorage.setItem('Modal-View','');
                        setTimeout(() => {
                            setIsModal(false);
                            sessionStorage.setItem('Modal',false);
                            setIsActionBlock(false);
                            setIsStatusAdd(false);
                            resetTextFieldsStatus();
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
    // UseEffect para quitar la suscrpcion de socket
    useEffect(() => {
        const handleStatusInsert = (message,user) => {
            console.log(message,user);
            socket.emit('Status');
        };

        socket.on('Status-Insert',handleStatusInsert);
        
        return () => {
            socket.off('Status-Insert',handleStatusInsert);
        }
    },[socket])
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <>
                    <Container_Modal>
                        <Container_Form_400 ThemeMode={themeMode} className={currentMView === 'Status-Add' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Text_Title_30_Center ThemeMode={themeMode}>AGREGAR STATUS</Text_Title_30_Center>
                            <Container_Row_NG_95_Left>
                                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                <Text_A_16_Left ThemeMode={themeMode}>- Selecciona un usuario...</Text_A_16_Left>
                            </Container_Row_NG_95_Left>
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
                                            value={filteredRecordsHasStatus
                                                .map(user => ({ value: user.idusuario, label: user.usuario }))
                                                .find(option => option.value === isTextFieldsStatus.iduser)
                                            }
                                            onChange={(e) => setIsTextFieldsStatus(prev => ({...prev, iduser: e.value, user: e.label}))}
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
                                <Text_A_16_Left ThemeMode={themeMode}>Selecciona un estado...</Text_A_16_Left>
                            </Container_Row_NG_95_Left>
                            <Container_Row_95_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                {['Habilitado','Deshabilitado'].map((item,index) => (
                                    <Label_Text_16_Center ThemeMode={themeMode} key={index}>
                                        <Input_Radio_16 ThemeMode={themeMode}
                                            type="radio"
                                            name="group"
                                            value={item}
                                            checked={isTextFieldsStatus.status === item}
                                            onChange={(e) => setIsTextFieldsStatus(prev => ({...prev, status: e.target.value}))}
                                        />
                                        {item}
                                    </Label_Text_16_Center>
                                ))};
                            </Container_Row_95_Center>
                            <Container_Row_95_Center>
                                <Tooltip title='Cancelar' placement="top">
                                    <Button_Icon_Blue_150 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalView('')}>
                                        <Icon_White_22><MdCancel/></Icon_White_22>
                                    </Button_Icon_Blue_150>
                                </Tooltip>
                                <Tooltip title='Agregar' placement="top">
                                    <Button_Icon_Green_150 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                        onClick={() => handleStatusSAdd()}>
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