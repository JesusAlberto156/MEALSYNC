//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,SubModalContext } from "../../../../contexts/ViewsProvider";
import { AnimationContext } from "../../../../contexts/VariablesProvider";
import { TextFieldsPermissionsContext,TextFieldsUserContext } from "../../../../contexts/FormsProvider";
// Hooks personalizados
import { ResetTextFieldsPermissions } from "../../../../hooks/Texts";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { IoIosAddCircle } from "react-icons/io";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_450,Container_Row_NG_95_Left,Container_Row_95_Center } from "../../../styled/Containers";
import { Button_Icon_Blue_180,Button_Icon_Green_180 } from "../../../styled/Buttons";
import { Text_Title_30_Center,Text_A_16_Left,Text_Blue_16_Left } from "../../../styled/Text";
import { Label_Text_16_Center } from "../../../styled/Labels";
import { Icon_White_22 } from "../../../styled/Icons";
import { Input_Checkbox_16 } from "../../../styled/Inputs";
//____________IMPORT/EXPORT____________

// Modal para agregar permisos a los usuarios
export default function User_Permissions_Add(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isAnimation,setIsAnimation] = useContext(AnimationContext);
    const [isTextFieldsPermissions,setIsTextFieldsPermissions] = useContext(TextFieldsPermissionsContext);
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    const [isSubModal,setIsSubModal] = useContext(SubModalContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const resetTextFieldsPermissions = ResetTextFieldsPermissions();
    // Estructura del componente
    return(
        <>
            {isSubModal ? (
                <>
                    <Container_Modal>
                        <Container_Form_450 ThemeMode={themeMode} className={isAnimation ? 'puff-in-container-center' : 'puff-out-container-center'}>
                            <Text_Title_30_Center ThemeMode={themeMode}>PERMISOS PERSONALIZADOS</Text_Title_30_Center>
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
                                    <Button_Icon_Blue_180 ThemeMode={themeMode} className='pulsate-buttom' onClick={() => {
                                        setIsAnimation(false);
                                        sessionStorage.removeItem('Animation');
                                        resetTextFieldsPermissions();
                                        setIsTextFieldsUser(prev => ({
                                            ...prev,
                                            permissions: 'Default'
                                        }))
                                        setTimeout(() => {
                                            navigate('/Administration/Users/Add',{ replace: true });
                                        },750);
                                    }}>
                                        <Icon_White_22><MdCancel/></Icon_White_22>
                                    </Button_Icon_Blue_180>
                                </Tooltip>
                                <Tooltip title='Agregar' placement='top'>
                                    <Button_Icon_Green_180 ThemeMode={themeMode} className='pulsate-buttom' onClick={() => {
                                        setIsAnimation(false);
                                        sessionStorage.removeItem('Animation');
                                        setIsTextFieldsUser(prev => ({
                                            ...prev,
                                            permissions: 'Personalizado'
                                        }))
                                        setTimeout(() => {
                                            navigate('/Administration/Users/Add',{ replace: true });
                                        },750);
                                    }}>
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