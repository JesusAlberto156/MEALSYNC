//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext } from "../../../../contexts/ViewsProvider";
import { AnimationContext } from "../../../../contexts/VariablesProvider";
import { RadioPermissionsContext,CheckboxContext } from "../../../../contexts/FormsProvider";
// Hooks personalizados
import { HandleCheckbox } from "../../../../hooks/Form";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { MdAddModerator } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_450,Container_Row_90_Center,Container_Row_90_Left } from "../../../styled/Containers";
import { Button_Icon_Blue_160,Button_Icon_Green_160 } from "../../../styled/Buttons";
import { Text_Title_30_Center,Text_P_16_Left } from "../../../styled/Text";
import { Label_Text_16_Center } from "../../../styled/Labels";
import { Icon_White_26 } from "../../../styled/Icons";
import { Input_Checkbox_16 } from "../../../styled/Inputs";
//____________IMPORT/EXPORT____________

// Modal para agregar permisos a los usuarios
export default function User_Permissions_Add(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isAnimation,setIsAnimation] = useContext(AnimationContext);
    const [isCheckbox,setIsCheckbox] = useContext(CheckboxContext);
    const [isRadioPermissions,setIsRadioPermissions] = useContext(RadioPermissionsContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleCheckbox = HandleCheckbox();
    // Estructura del componente
    return(
        <>
            <Container_Modal>
                <Container_Form_450 ThemeMode={themeMode} className={isAnimation ? 'puff-in-container-center' : 'puff-out-container-center'}>
                    <Text_Title_30_Center ThemeMode={themeMode}>PERMISOS PERSONALIZADOS</Text_Title_30_Center>
                    <Container_Row_90_Left>
                        <Text_P_16_Left ThemeMode={themeMode}>Área de administración...</Text_P_16_Left>
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
                        <Text_P_16_Left ThemeMode={themeMode}>Área de cocina...</Text_P_16_Left>
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
                            <Button_Icon_Blue_160 ThemeMode={themeMode} className='pulsate-buttom' onClick={() => {
                                setIsRadioPermissions('');
                                setIsCheckbox([]);
                                setIsAnimation(false);
                                sessionStorage.removeItem('Animation');
                                setTimeout(() => {
                                    navigate('/Administration/Users/Users/Add',{ replace: true });
                                },750);
                            }}>
                                <Icon_White_26><MdCancel/></Icon_White_26>
                            </Button_Icon_Blue_160>
                        </Tooltip>
                        <Tooltip title='Agregar' placement='top'>
                            <Button_Icon_Green_160 ThemeMode={themeMode} className='pulsate-buttom' onClick={() => {
                                setIsAnimation(false);
                                sessionStorage.removeItem('Animation');
                                if(isCheckbox.length === 0){
                                    setIsRadioPermissions('Default');
                                }
                                setTimeout(() => {
                                    navigate('/Administration/Users/Users/Add',{ replace: true });
                                },750);
                            }}>
                                <Icon_White_26><MdAddModerator/></Icon_White_26>
                            </Button_Icon_Green_160>
                        </Tooltip>
                    </Container_Row_90_Center>
                </Container_Form_450>
            </Container_Modal>
        </>
    );
}