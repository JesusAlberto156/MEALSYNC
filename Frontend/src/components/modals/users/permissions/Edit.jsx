//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,ModalContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { CheckboxContext } from "../../../../contexts/FormsProvider";
import { ActionBlockContext,SelectedRowContext } from "../../../../contexts/VariablesProvider";
import { RefPermissionsContext } from "../../../../contexts/RefsProvider";
import { UsersContext,PermissionsEditContext } from "../../../../contexts/UsersProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
// Hooks personalizados
import { HandleModalView } from "../../../../hooks/Views";
import { HandlePermissionsEdit } from "../../../../hooks/Form";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { AiFillEdit } from "react-icons/ai";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_450,Container_Row_90_Left,Container_Row_90_Center } from "../../../styled/Containers";
import { Button_Icon_Red_170,Button_Icon_Blue_170 } from "../../../styled/Buttons";
import { Icon_White_22 } from "../../../styled/Icons";
import { Text_Title_30_Center,Text_A_16_Left } from "../../../styled/Text";
import { Label_Text_16_Center } from "../../../styled/Labels";
import { Input_Checkbox_16 } from "../../../styled/Inputs";
import { Alert_Verification } from "../../../styled/Alerts";
// Componentes personalizados
import Error_Edit from "../../errors/Edit";
//____________IMPORT/EXPORT____________

// Modal para editar permisos a los usuarios
export default function Permissions_Edit(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isCheckbox,setIsCheckbox] = useContext(CheckboxContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const {Modal,Form,Button_Edit_P,Button_Enable_P} = useContext(RefPermissionsContext);
    const [isUsers] = useContext(UsersContext);
    const [socket] = useContext(SocketContext);
    const [isPermissionsEdit,setIsPermissionsEdit] = useContext(PermissionsEditContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const handlePermissionsEdit = HandlePermissionsEdit();
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isPermissionsEdit){
            if(isCheckbox.length !== 0){
                const user = isUsers.find(user => user.idusuario === isCheckbox.idusuario);
                if(user){
                    const promise = new Promise(async (resolve,reject) => {
                        try{
                            setTimeout(() => {
                                socket.emit('Permissions-Update',isCheckbox.idusuario,user.usuario,isCheckbox.administrador,isCheckbox.chef,isCheckbox.almacenista,isCheckbox.cocinero,isCheckbox.nutriologo,isCheckbox.medico)
                                
                                socket.on('Permissions-Update',(message,user) => {
                                    console.log(message,user);
                                    socket.emit('Permissions');
                                });
                                resolve('¡MEALSYNC edito los permisos al usuario!...')
                                
                                setCurrentMView('');
                                sessionStorage.setItem('Modal-View','');
                                setTimeout(() => {
                                    setIsModal(false);
                                    sessionStorage.setItem('Modal',false);
                                    setIsActionBlock(false);
                                    setIsPermissionsEdit(false);
                                    setIsSelectedRow(null);
                                    navigate('/Administration/Users/Permissions',{ replace: true });
                                },750);

                                return () => {
                                    socket.off('Permissions-Update');
                                }
                            },2000);
                        }catch(error){
                            setIsActionBlock(false);
                            setIsPermissionsEdit(false);
                            return reject('¡Ocurrio un error inesperado!...');
                        }
                    }); 
                    
                    Alert_Verification(promise,'¡Editando permisos a un usuario!...');
                }
            }
        }
    },[isPermissionsEdit]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <>
                    <Container_Modal ref={Modal}>
                        <Container_Form_450 ref={Form} ThemeMode={themeMode} className={currentMView === 'Permissions-Edit' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Text_Title_30_Center ThemeMode={themeMode}>EDITAR PERMISOS</Text_Title_30_Center>
                            <Container_Row_90_Left>
                                <Text_A_16_Left ThemeMode={themeMode}>Área de administración...</Text_A_16_Left>
                            </Container_Row_90_Left>
                            <Container_Row_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Label_Text_16_Center ThemeMode={themeMode}>
                                    <Input_Checkbox_16 ThemeMode={themeMode}
                                        type="checkbox"
                                        checked={isCheckbox.administrador}
                                        onChange={(e) =>
                                            setIsCheckbox((prev) => ({
                                                ...prev,
                                                administrador: e.target.checked
                                            }))
                                        }
                                    />
                                    Administrador
                                </Label_Text_16_Center>
                                <Label_Text_16_Center ThemeMode={themeMode}>
                                    <Input_Checkbox_16 ThemeMode={themeMode}
                                        type="checkbox"
                                        checked={isCheckbox.chef}
                                        onChange={(e) =>
                                            setIsCheckbox((prev) => ({
                                                ...prev,
                                                chef: e.target.checked
                                            }))
                                        }
                                    />
                                    Chef
                                </Label_Text_16_Center>
                                <Label_Text_16_Center ThemeMode={themeMode}>
                                    <Input_Checkbox_16 ThemeMode={themeMode}
                                        type="checkbox"
                                        checked={isCheckbox.almacenista}
                                        onChange={(e) =>
                                            setIsCheckbox((prev) => ({
                                                ...prev,
                                                almacenista: e.target.checked
                                            }))
                                        }
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
                                        checked={isCheckbox.cocinero}
                                        onChange={(e) =>
                                            setIsCheckbox((prev) => ({
                                                ...prev,
                                                cocinero: e.target.checked
                                            }))
                                        }
                                    />
                                    Cocinero
                                </Label_Text_16_Center>
                                <Label_Text_16_Center ThemeMode={themeMode}>
                                    <Input_Checkbox_16 ThemeMode={themeMode}
                                        type="checkbox"
                                        checked={isCheckbox.nutriologo}
                                        onChange={(e) =>
                                            setIsCheckbox((prev) => ({
                                                ...prev,
                                                nutriologo: e.target.checked
                                            }))
                                        }
                                    />
                                    Nutriólogo
                                </Label_Text_16_Center>
                                <Label_Text_16_Center ThemeMode={themeMode}>
                                    <Input_Checkbox_16 ThemeMode={themeMode}
                                        type="checkbox"
                                        checked={isCheckbox.medico}
                                        onChange={(e) =>
                                            setIsCheckbox((prev) => ({
                                                ...prev,
                                                medico: e.target.checked
                                            }))
                                        }
                                    />
                                    Médico
                                </Label_Text_16_Center>
                            </Container_Row_90_Center>
                            <Container_Row_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Tooltip title='Cancelar' placement='top'>
                                    <Button_Icon_Red_170 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalView('')}>
                                        <Icon_White_22><MdCancel/></Icon_White_22>
                                    </Button_Icon_Red_170>
                                </Tooltip>
                                <Tooltip title='Editar' placement='top'>
                                    <Button_Icon_Blue_170 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                        onClick={() => handlePermissionsEdit()}>
                                        <Icon_White_22><AiFillEdit/></Icon_White_22>
                                    </Button_Icon_Blue_170>
                                </Tooltip>
                            </Container_Row_90_Center>
                        </Container_Form_450>
                    </Container_Modal>  
                </>
            ):(
                currentMView === 'Permissions-Edit' ? (
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