//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
import Select from "react-select";
// Contextos
import { ThemeModeContext,ModalContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { SelectContext,RadioStatusContext } from "../../../../contexts/FormsProvider";
import { ActionBlockContext } from "../../../../contexts/VariablesProvider";
import { StatusAddContext,UsersContext } from "../../../../contexts/UsersProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
// Hooks personalizados
import { HandleModalView } from "../../../../hooks/Views";
import { HandleStatusSAdd,FilteredRecordsHasStatus,HandleRadio,HandleSelect } from "../../../../hooks/Form";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { FcAddRow } from "react-icons/fc";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_400,Container_Column_90_Center,Container_Row_90_Left,Container_Row_90_Center } from "../../../styled/Containers";
import { Text_Title_30_Center,Text_A_16_Left } from "../../../styled/Text";
import { Button_Icon_Blue_160,Button_Icon_Green_160 } from "../../../styled/Buttons";
import { Label_Text_16_Center } from "../../../styled/Labels";
import { Input_Radio_16 } from "../../../styled/Inputs";
import { Icon_White_22 } from "../../../styled/Icons";
import { Alert_Verification } from "../../../styled/Alerts";
//____________IMPORT/EXPORT____________

// Modal para agregar estatus al usuario
export default function Status_Add(){
    // Constantes con el valor de los contextos 
    const [themeMode] = useContext(ThemeModeContext);
    const [isSelect,setIsSelect] = useContext(SelectContext);
    const [isRadioStatus,setIsRadioStatus] = useContext(RadioStatusContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isStatusAdd,setIsStatusAdd] = useContext(StatusAddContext);
    const [isUsers] = useContext(UsersContext);
    const [socket] = useContext(SocketContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const filteredRecordsHasStatus = FilteredRecordsHasStatus();
    const handleSelectChange = HandleSelect();
    const handleRadioChange = HandleRadio();
    const handleStatusSAdd = HandleStatusSAdd();
    // UseEffect para agregar datos a la base de datos
    useEffect(() => {
        if(isStatusAdd){
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setTimeout(() => {
                        const user = isUsers.find(user => user.idusuario === isSelect.value);
                        if(user){
                            socket.emit('Status-Insert',user.idusuario,isRadioStatus === 'Habilitado' ? 1:0,user.usuario);

                            socket.on('Status-Insert',(message,user) => {
                                console.log(message,user);
                                socket.emit('Status');
                            });
                            
                            resolve('¡MEALSYNC agregó el status al usuario!...');

                            const route = sessionStorage.getItem('Route');

                            setCurrentMView('');
                            sessionStorage.setItem('Modal-View','');
                            setTimeout(() => {
                                setIsModal(false);
                                sessionStorage.setItem('Modal',false);
                                setIsRadioStatus('');
                                setIsActionBlock(false);
                                setIsSelect([]);
                                setIsStatusAdd(false);
                                navigate(route,{ replace: true });
                            },750);

                            return () => {
                                socket.off('Status-Insert');
                            }
                        }
                    },1000);
                }catch(error){
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
                        <Container_Form_400 ThemeMode={themeMode} className={currentMView === 'Status-Add' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Text_Title_30_Center ThemeMode={themeMode}>AGREGAR STATUS</Text_Title_30_Center>
                            <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Container_Row_90_Left>
                                    <Text_A_16_Left ThemeMode={themeMode}>Selecciona un usuario...</Text_A_16_Left>
                                </Container_Row_90_Left>
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
                                    value={isSelect}
                                    onChange={handleSelectChange}
                                />
                            </Container_Column_90_Center>
                            <Container_Row_90_Left>
                                <Text_A_16_Left ThemeMode={themeMode}>Selecciona un estado...</Text_A_16_Left>
                            </Container_Row_90_Left>
                            <Container_Row_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                {['Habilitado','Deshabilitado'].map((item,index) => (
                                    <Label_Text_16_Center ThemeMode={themeMode} key={index}>
                                        <Input_Radio_16 ThemeMode={themeMode}
                                            type="radio"
                                            name="group"
                                            value={item}
                                            checked={isRadioStatus === item}
                                            onChange={handleRadioChange}
                                        />
                                        {item}
                                    </Label_Text_16_Center>
                                ))};
                            </Container_Row_90_Center>
                            <Container_Row_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Tooltip title='Cancelar' placement="top">
                                    <Button_Icon_Blue_160 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalView('')}>
                                        <Icon_White_22><MdCancel/></Icon_White_22>
                                    </Button_Icon_Blue_160>
                                </Tooltip>
                                <Tooltip title='Agregar' placement="top">
                                    <Button_Icon_Green_160 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                        onClick={() => handleStatusSAdd()}>
                                        <Icon_White_22><FcAddRow/></Icon_White_22>
                                    </Button_Icon_Green_160>
                                </Tooltip>
                            </Container_Row_90_Center>
                        </Container_Form_400>
                    </Container_Modal>
                </>
            ):(
                <></>
            )}
        </>
    );
}