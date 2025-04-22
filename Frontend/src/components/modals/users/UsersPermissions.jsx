//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
import Select from "react-select";
// Contextos
import { ThemeModeContext } from "../../../contexts/ViewsProvider";
import { ActionBlockContext } from "../../../contexts/VariablesProvider";
import { CheckboxContext,RadioContext } from "../../../contexts/FormsProvider";
// Hooks personalizados
import { HandleChangeModal } from "../../../hooks/Views";
import { useHandleCheckboxChange } from "../../../hooks/Form";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { MdAddModerator } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_450,Container_Button_Border_Row_400 } from "../../styled/Containers";
import { Button_Icon_Blue_170,Button_Icon_Green_170,Button_Icon_Block_170 } from "../../styled/Buttons";
import { Text_Title_30_Center,Text_P_20_Left } from "../../styled/Text";
import { Label_Check_18 } from "../../styled/Labels";
import { Input_Checkbox_16 } from "../../styled/Inputs";
//____________IMPORT/EXPORT____________


// Modal para ver la contraseña de usuarios
export default function Users_Permissions(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isCheckbox] = useContext(CheckboxContext);
    const [isRadioUsers,setIsRadioUsers] = useContext(RadioContext);
    const [isActionBlock] = useContext(ActionBlockContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleCheckboxChange = useHandleCheckboxChange();
    const changeModalView = HandleChangeModal();
    // Estructura del componente
    return(
        <>
            <Container_Modal>
                <Container_Form_450 ThemeMode={themeMode} >
                    <Text_Title_30_Center ThemeMode={themeMode}>PERMISOS</Text_Title_30_Center>
                    <Text_P_20_Left ThemeMode={themeMode}>Área de administración...</Text_P_20_Left>
                    <Container_Button_Border_Row_400 ThemeMode={themeMode}>
                        <Label_Check_18 ThemeMode={themeMode}>
                            <Input_Checkbox_16 ThemeMode={themeMode}
                                value={isCheckbox.some(item => item.name === 'Administrator' && item.value)}
                                onChange={(e) => handleCheckboxChange('Administrator',e)}
                                type="checkbox"
                            />
                            Administrador
                        </Label_Check_18>
                        <Label_Check_18 ThemeMode={themeMode}>
                            <Input_Checkbox_16 ThemeMode={themeMode}
                                value={isCheckbox.some(item => item.name === 'Chef' && item.value)}
                                onChange={(e) => handleCheckboxChange('Chef',e)}
                                type="checkbox"
                            />
                            Chef
                        </Label_Check_18>
                        <Label_Check_18 ThemeMode={themeMode}>
                            <Input_Checkbox_16 ThemeMode={themeMode}
                                type="checkbox"
                                value={isCheckbox.some(item => item.name === 'Storekeeper' && item.value)}
                                onChange={(e) => handleCheckboxChange('Storekeeper',e)}
                            />
                            Almacenista
                        </Label_Check_18>
                    </Container_Button_Border_Row_400>
                    <Text_P_20_Left ThemeMode={themeMode}>Área de cocina...</Text_P_20_Left>
                    <Container_Button_Border_Row_400 ThemeMode={themeMode}>
                        <Label_Check_18 ThemeMode={themeMode}>
                            <Input_Checkbox_16 ThemeMode={themeMode}
                                type="checkbox"
                                value={isCheckbox.some(item => item.name === 'Cook' && item.value)}
                                onChange={(e) => handleCheckboxChange('Cook',e)}
                            />
                            Cocinero
                        </Label_Check_18>
                        <Label_Check_18 ThemeMode={themeMode}>
                            <Input_Checkbox_16 ThemeMode={themeMode}
                                type="checkbox"
                                value={isCheckbox.some(item => item.name === 'Nutritionist' && item.value)}
                                onChange={(e) => handleCheckboxChange('Nutritionist',e)}
                            />
                            Nutriólogo
                        </Label_Check_18>
                        <Label_Check_18 ThemeMode={themeMode}>
                            <Input_Checkbox_16 ThemeMode={themeMode}
                                type="checkbox"
                                value={isCheckbox.some(item => item.name === 'Doctor' && item.value)}
                                onChange={(e) => handleCheckboxChange('Doctor',e)}
                            />
                            Médico
                        </Label_Check_18>
                    </Container_Button_Border_Row_400>
                    <Text_P_20_Left ThemeMode={themeMode}>Agregar permisos</Text_P_20_Left>
                    <Container_Button_Border_Row_400 ThemeMode={themeMode}>
                        <Tooltip title='Cancelar' placement="top">
                            <Button_Icon_Blue_170 ThemeMode={themeMode} onClick={() => {
                                setIsRadioUsers(prev => ({ ...prev, tipo: 'Default' }))   
                            }}>
                                <MdCancel/>
                            </Button_Icon_Blue_170>
                        </Tooltip>
                        {isActionBlock ? (
                            <>
                                <Button_Icon_Block_170 ThemeMode={themeMode}><MdAddModerator/></Button_Icon_Block_170>
                            </>
                        ):(
                            <>
                                <Tooltip title='Agregar' placement="top">
                                    <Button_Icon_Green_170 ThemeMode={themeMode} onClick={() => changePermissionsAdd()}><MdAddModerator/></Button_Icon_Green_170>
                                </Tooltip>
                            </>
                        )}
                    </Container_Button_Border_Row_400>
                </Container_Form_450>
            </Container_Modal>
        </>
    );
}