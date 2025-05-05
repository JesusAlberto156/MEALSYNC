//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos

// Contextos
import { ThemeModeContext } from "../../../../contexts/ViewsProvider";
import { UsersContext } from "../../../../contexts/UsersProvider";
import { ActionBlockContext,SelectedRowContext } from "../../../../contexts/VariablesProvider";
// Hooks personalizados
import { HandleModalView } from "../../../../hooks/Views";
import { useChangePermissionsEnable } from "../../../../hooks/Form";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { MdAdminPanelSettings } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_400,Container_Row_Border_90_Center } from "../../../styled/Containers";
import { Text_P_16_Left, Text_Title_30_Center } from "../../../styled/Text";
import { Button_Icon_Blue_150,Button_Icon_Red_150,Button_Icon_Green_150 } from "../../../styled/Buttons";
// Componentes personalizados
import Form_Verification from '../../../forms/Verification';
//____________IMPORT/EXPORT____________

// Modal para agregar permiso de super administrador a los usuarios
export default function Permissions_Enable(){
    // Constantes con el valor de los contextos
        const [themeMode] = useContext(ThemeModeContext);
        const [isActionBlock] = useContext(ActionBlockContext);
        const [isSelectedRow] = useContext(SelectedRowContext);
        const [isUsers] = useContext(UsersContext);
        // Constantes con el valor de useState
        const [user,setUser] = useState('');
        // useEffect con el usuario
        useEffect(() => {
            if(isSelectedRow !== null){
                const isUser = isUsers.find(u => u.idusuario === isSelectedRow.idusuario);
                if(isUser){
                    setUser(isUser.usuario);
                }
            }
        },[]);
        // Constantes con la funcionalidad de los hooks
        const navigate = useNavigate();
        const changeModalView = HandleModalView();
        const changePermissionsEnable = useChangePermissionsEnable();
        // Estructura del componente
    return(
        <>
            {isSelectedRow !== null ? (
                <>
                    <Container_Modal>
                        <Container_Form_400 ThemeMode={themeMode}>
                            <Text_Title_30_Center ThemeMode={themeMode}>{isSelectedRow.superadministrador ? 'DESHABILITAR PERMISO':'HABILITAR PERMISO'}</Text_Title_30_Center>
                            <Form_Verification/>
                            {isSelectedRow.superadministrador ? <Text_P_16_Left ThemeMode={themeMode}>Se deshabilitará a {user}</Text_P_16_Left>:<Text_P_16_Left ThemeMode={themeMode}>Se habilitará a {user}</Text_P_16_Left>}
                            <Container_Row_Border_90_Center ThemeMode={themeMode}>
                                <Button_Icon_Blue_150 ThemeMode={themeMode} onClick={(e) => {
                                    e.stopPropagation();
                                    changeModalView('');
                                    navigate('/Administration/Users/Permissions',{ replace: true });    
                                }}>
                                    <MdCancel/>
                                </Button_Icon_Blue_150>
                                {isActionBlock ? (
                                    isSelectedRow.superadministrador ? (
                                        <>
                                            <Button_Icon_Red_150 ThemeMode={themeMode} onClick={(e) => {
                                                e.stopPropagation();
                                                changePermissionsEnable();
                                            }}>
                                                <MdAdminPanelSettings/>
                                            </Button_Icon_Red_150>
                                        </>
                                    ):(
                                        <>
                                            <Button_Icon_Green_150 ThemeMode={themeMode} onClick={(e) => {
                                                e.stopPropagation();
                                                changePermissionsEnable();
                                            }}>
                                                <MdAdminPanelSettings/>
                                            </Button_Icon_Green_150>
                                        </>
                                    )
                                ):(
                                    <>
                                        
                                    </>
                                )}
                            </Container_Row_Border_90_Center>
                        </Container_Form_400>
                    </Container_Modal>  
                </>
            ):(
                <></>
            )}
        </>
    );
}