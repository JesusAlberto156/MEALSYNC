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
import { ActionBlockContext,SelectedRowContext } from "../../../../contexts/VariablesProvider";
import { RefUsersContext } from '../../../../contexts/RefsProvider';
// Hooks personalizados
import { HandleModalView } from "../../../../hooks/Views";
import { HandleUserEdit } from "../../../../hooks/Form";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { FaUserEdit } from "react-icons/fa";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Row_90_Center,Container_Row_100_Center,Container_Column_90_Center,Container_Row_90_Left,Container_Row_100_Left } from "../../../styled/Containers";
import { Text_Title_30_Center,Text_A_16_Left } from "../../../styled/Text";
import { Button_Icon_Blue_180,Button_Icon_Red_180 } from "../../../styled/Buttons";
import { Icon_White_22 } from "../../../styled/Icons";
import { Input_Text_Black_100 } from "../../../styled/Inputs";
import { Alert_Verification } from "../../../styled/Alerts";
// Componentes personalizados
import Error_Edit from "../../errors/Edit";
//____________IMPORT/EXPORT____________

// Modal para ver la contraseña de usuarios
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
    const {Modal,Form,Button_Edit_U,Button_Delete_U} = useContext(RefUsersContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const handleUserEdit = HandleUserEdit();
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isUserEdit){
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('User-Update',isTextFieldsUser.userTypes,isSelectedRow.idusuario,isTextFieldsUser.name,isTextFieldsUser.shortName,isTextFieldsUser.user,isTextFieldsUser.password)
                    
                        socket.on('User-Update',(message,user) => {
                            console.log(message,user);
                            socket.emit('Users');
                        });

                        resolve('¡MEALSYNC actualizo al usuario!...');

                        setCurrentMView('');
                        sessionStorage.setItem('Modal-View','');
                        setTimeout(() => {
                            setIsModal(false);
                            sessionStorage.setItem('Modal',false);
                            setIsActionBlock(false);
                            setIsUserEdit(false);
                            setIsSelectedRow(null);
                            navigate('/Administration/Users/Users',{ replace: true });
                        },750);

                        return () => {
                            socket.off('User-Update');
                        }
                    },1000);
                }catch(error){
                    setIsActionBlock(false);
                    setIsUserEdit(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'¡Actualizado un usuario!...');
        }
    },[isUserEdit])
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <>
                    <Container_Modal ref={Modal}>
                        <Container_Form_500 ref={Form} ThemeMode={themeMode} className={currentMView === 'User-Edit' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Row_100_Center>
                                <Text_Title_30_Center ThemeMode={themeMode}>EDITAR USUARIO</Text_Title_30_Center>
                            </Container_Row_100_Center>
                            <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Container_Row_90_Left>
                                    <Text_A_16_Left ThemeMode={themeMode}>Editar datos del usuario...</Text_A_16_Left>
                                </Container_Row_90_Left>
                                <Container_Row_100_Left>
                                    <Text_A_16_Left ThemeMode={themeMode}>Nombre:</Text_A_16_Left>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        placeholder="Nombre completo..."
                                        type="text"
                                        value={isTextFieldsUser.name}
                                        onChange={(e) => setIsTextFieldsUser(prev => ({...prev, name: e.target.value}))}
                                    />
                                </Container_Row_100_Left>
                                <Container_Row_100_Left>
                                    <Text_A_16_Left ThemeMode={themeMode}>Nombre corto:</Text_A_16_Left>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        placeholder="Primer nombre y apellido..."
                                        type="text"
                                        value={isTextFieldsUser.shortName}
                                        onChange={(e) => setIsTextFieldsUser(prev => ({...prev, shortName: e.target.value}))}
                                    />
                                </Container_Row_100_Left>
                                <Container_Row_100_Left>
                                    <Text_A_16_Left ThemeMode={themeMode}>Usuario:</Text_A_16_Left>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        placeholder="Nombre de usuario..."
                                        type="text"
                                        value={isTextFieldsUser.user}
                                        onChange={(e) => setIsTextFieldsUser(prev => ({...prev, user: e.target.value}))}
                                    />
                                </Container_Row_100_Left>
                                <Container_Row_100_Left>
                                    <Text_A_16_Left ThemeMode={themeMode}>Contraseña:</Text_A_16_Left>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        placeholder="Contraseña de usuario..."
                                        type="password"
                                        value={isTextFieldsUser.password}
                                        onChange={(e) => setIsTextFieldsUser(prev => ({...prev, password: e.target.value}))}
                                    />
                                </Container_Row_100_Left>
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
                            <Container_Row_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Tooltip title='Cancelar' placement='top'>
                                    <Button_Icon_Red_180 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalView('')}>
                                        <Icon_White_22><MdCancel/></Icon_White_22>
                                    </Button_Icon_Red_180>
                                </Tooltip>
                                <Tooltip title='Editar' placement='top'>
                                    <Button_Icon_Blue_180 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                        onClick={() => handleUserEdit()}>
                                        <Icon_White_22><FaUserEdit/></Icon_White_22>
                                    </Button_Icon_Blue_180>
                                </Tooltip>
                            </Container_Row_90_Center>
                        </Container_Form_500>
                    </Container_Modal>
                </>
            ):(
                currentMView === 'User-Edit' ? (
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