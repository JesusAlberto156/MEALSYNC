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
import { TextFieldsUserContext } from "../../../../contexts/FormsProvider";
import { UserTypesContext,UserEditContext } from "../../../../contexts/UsersProvider";
import { ActionBlockContext } from "../../../../contexts/VariablesProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { RefUsersContext } from '../../../../contexts/RefsProvider';
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleModalView } from "../../../../hooks/Views";
import { HandleUserEdit } from "../../../../hooks/Form";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { MdEdit } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Row_100_Center,Container_Column_90_Center,Container_Row_100_Left,Container_Row_95_Center,Container_Row_NG_95_Center } from "../../../styled/Containers";
import { Text_Title_30_Center,Text_A_16_Left,Text_Blue_16_Left,Text_A_20_Center } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Red_210 } from "../../../styled/Buttons";
import { Icon_White_22,Icon_Button_Blue_18 } from "../../../styled/Icons";
import { Input_Text_Black_100 } from "../../../styled/Inputs";
import { Alert_Verification } from "../../../styled/Alerts";
// Componentes personalizados
import Error_Edit from "../../errors/Edit";
//____________IMPORT/EXPORT____________

// Modal para editar los usuarios de la tabla
export default function User_Edit(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    const [isUserTypes] = useContext(UserTypesContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isUserEdit,setIsUserEdit] = useContext(UserEditContext);
    const [socket] = useContext(SocketContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const {Modal_Users,Form_Users,Button_Edit_Users,Button_Delete_Users} = useContext(RefUsersContext);
    const [isLoggedUser] = useContext(LoggedUserContext); 
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const handleUserEdit = HandleUserEdit();
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
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isUserEdit){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Update-User',getLocalDateTimeOffset(),isLoggedUser.idusuario,isTextFieldsUser.idusuario,isTextFieldsUser.nombre.trim(),isTextFieldsUser.nombrecorto.trim(),isTextFieldsUser.usuario.trim(),isTextFieldsUser.contrasena.trim(),isTextFieldsUser.idtipo)

                        resolve('¡MEALSYNC editó al usuario!...');

                        setIsUserEdit(false);
                        
                        const route = sessionStorage.getItem('Ruta');

                        setCurrentMView('');
                        sessionStorage.setItem('Vista del Modal','');
                        setTimeout(() => {
                            setIsModal(false);
                            sessionStorage.setItem('Estado del Modal',false);
                            setIsActionBlock(false);
                            setIsSelectedRow(null);
                            navigate(route,{ replace: true });
                        },750);
                    },2000);
                }catch(e){
                    setIsActionBlock(false);
                    setIsUserEdit(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'Editando un usuario!...');
        }
    },[isUserEdit])
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <>
                    <Container_Modal ref={Modal_Users}>
                        <Container_Form_500 ref={Form_Users} ThemeMode={themeMode} className={currentMView === 'Usuario-Editar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Row_100_Center>
                                <Text_Title_30_Center ThemeMode={themeMode}>EDITAR USUARIO</Text_Title_30_Center>
                            </Container_Row_100_Center>
                            <Container_Row_NG_95_Center>
                                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                <Text_A_16_Left ThemeMode={themeMode}>- Datos generales</Text_A_16_Left>
                            </Container_Row_NG_95_Center>
                            <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Container_Row_100_Left>
                                    <Text_A_16_Left ThemeMode={themeMode}>Nombre:</Text_A_16_Left>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        placeholder="..."
                                        type="text"
                                        value={isTextFieldsUser.nombre}
                                        disabled={isActionBlock}
                                        onChange={(e) => setIsTextFieldsUser(prev => ({...prev, nombre: e.target.value}))}
                                    />
                                    <Icon_Button_Blue_18 ThemeMode={themeMode} className="pulsate-buttom"
                                        onClick={() => {
                                            setIsTextFieldsUser(prev => ({...prev, nombre: ''}))
                                        }}
                                        disabled={isActionBlock}
                                    >
                                        <MdCancel/>
                                    </Icon_Button_Blue_18>
                                </Container_Row_100_Left>
                                <Container_Row_100_Left>
                                    <Text_A_16_Left ThemeMode={themeMode}>Nombre corto:</Text_A_16_Left>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        placeholder="..."
                                        type="text"
                                        value={isTextFieldsUser.nombrecorto}
                                        disabled={isActionBlock}
                                        onChange={(e) => setIsTextFieldsUser(prev => ({...prev, nombrecorto: e.target.value}))}
                                    />
                                    <Icon_Button_Blue_18 ThemeMode={themeMode} className="pulsate-buttom"
                                        onClick={() => {
                                            setIsTextFieldsUser(prev => ({...prev, nombrecorto: ''}))
                                        }}
                                        disabled={isActionBlock}
                                    >
                                        <MdCancel/>
                                    </Icon_Button_Blue_18>
                                </Container_Row_100_Left>
                                <Container_Row_100_Left>
                                    <Text_A_16_Left ThemeMode={themeMode}>Usuario:</Text_A_16_Left>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        placeholder="..."
                                        type="text"
                                        value={isTextFieldsUser.usuario}
                                        disabled={isActionBlock}
                                        onChange={(e) => setIsTextFieldsUser(prev => ({...prev, usuario: e.target.value}))}
                                    />
                                </Container_Row_100_Left>
                                <Container_Row_100_Left>
                                    <Text_A_16_Left ThemeMode={themeMode}>Contraseña:</Text_A_16_Left>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        placeholder="..."
                                        type="password"
                                        value={isTextFieldsUser.contrasena}
                                        disabled={isActionBlock}
                                        onChange={(e) => setIsTextFieldsUser(prev => ({...prev, contrasena: e.target.value}))}
                                    />
                                </Container_Row_100_Left>
                                {isUserTypes.length !== 0 ? (
                                    <>
                                        <Select
                                            options={isUserTypes.map((userTypes) => ({
                                                value: userTypes.idtipo,
                                                label: userTypes.tipo
                                            }))}
                                            styles={{
                                                control: (provided,state) => ({
                                                    ...provided,
                                                    width: '300px',
                                                    padding: '6px',
                                                    border: '2px solid black',
                                                    borderRadius: '20px',
                                                    fontFamily: 'Century Gothic',
                                                    fontStyle: 'normal',
                                                    fontSize: '18px',
                                                    cursor: state.isDisabled ? 'not-allowed' : 'pointer',
                                                    backgroundColor: state.isDisabled ? '#f0f0f0' : 'white',
                                                    opacity: state.isDisabled ? 0.8 : 1,
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
                                                }),
                                                singleValue: (provided, state) => ({
                                                    ...provided,
                                                    color: state.isDisabled ? '#888' : 'black',
                                                }),
                                                placeholder: (provided, state) => ({
                                                    ...provided,
                                                    color: state.isDisabled ? '#aaa' : '#333',
                                                }),
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
                            <Container_Row_95_Center>
                                <Tooltip title='Cancelar' placement='top'>
                                    <Button_Icon_Red_210 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalView('')}
                                        disabled={isActionBlock}    
                                    >
                                        <Icon_White_22><MdCancel/></Icon_White_22>
                                    </Button_Icon_Red_210>
                                </Tooltip>
                                <Tooltip title='Editar' placement='top'>
                                    <Button_Icon_Blue_210 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                        onClick={() => handleUserEdit()}
                                        disabled={isActionBlock} 
                                    >
                                        <Icon_White_22><MdEdit/></Icon_White_22>
                                    </Button_Icon_Blue_210>
                                </Tooltip>
                            </Container_Row_95_Center>
                        </Container_Form_500>
                    </Container_Modal>
                </>
            ):(
                currentMView === 'Usuario-Editar' ? (
                    <>
                        <Error_Edit/>
                    </>
                ):(
                    <></>
                )
            )}
        </>
    );
}