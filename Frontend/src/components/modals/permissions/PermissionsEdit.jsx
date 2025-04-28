//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos

// Contextos
import { ThemeModeContext } from "../../../contexts/ViewsProvider";
import { CheckboxContext } from "../../../contexts/FormsProvider";
import { ActionBlockContext,SelectedRowContext } from "../../../contexts/VariablesProvider";
// Hooks personalizados
import { HandleModalView } from "../../../hooks/Views";
import { useChangePermissionsEdit } from "../../../hooks/Form";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { AiFillEdit } from "react-icons/ai";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_450,Container_Row_Border_90_Center } from "../../styled/Containers";
import { Button_Icon_Blue_170,Button_Icon_Red_170,Button_Icon_Block_170 } from "../../styled/Buttons";
import { Text_P_20_Left, Text_Title_30_Center } from "../../styled/Text";
import { Label_Check_18 } from "../../styled/Labels";
import { Input_Checkbox_16 } from "../../styled/Inputs";
//____________IMPORT/EXPORT____________

// Modal para editar permisos a los usuarios
export default function Permissions_Edit(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [isCheckbox,setIsCheckbox] = useContext(CheckboxContext);
    const [isActionBlock] = useContext(ActionBlockContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const changeModalView = HandleModalView();
    const changePermissionsEdit = useChangePermissionsEdit();
    // Estructura del componente
    return(
        <>
            {isSelectedRow !== null ? (
                <>
                    <Container_Modal>
                        <Container_Form_450 ThemeMode={themeMode}>
                            <Text_Title_30_Center ThemeMode={themeMode}>EDITAR PERMISOS</Text_Title_30_Center>
                            <Text_P_20_Left ThemeMode={themeMode}>Área de administración...</Text_P_20_Left>
                            <Container_Row_Border_90_Center ThemeMode={themeMode}>
                                <Label_Check_18 ThemeMode={themeMode}>
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
                                </Label_Check_18>
                                <Label_Check_18 ThemeMode={themeMode}>
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
                                </Label_Check_18>
                                <Label_Check_18 ThemeMode={themeMode}>
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
                                </Label_Check_18>
                            </Container_Row_Border_90_Center>
                            <Text_P_20_Left ThemeMode={themeMode}>Área de cocina...</Text_P_20_Left>
                            <Container_Row_Border_90_Center ThemeMode={themeMode}>
                                <Label_Check_18 ThemeMode={themeMode}>
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
                                </Label_Check_18>
                                <Label_Check_18 ThemeMode={themeMode}>
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
                                </Label_Check_18>
                                <Label_Check_18 ThemeMode={themeMode}>
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
                                </Label_Check_18>
                            </Container_Row_Border_90_Center>
                            <Text_P_20_Left ThemeMode={themeMode}>Editar permisos</Text_P_20_Left>
                            <Container_Row_Border_90_Center ThemeMode={themeMode}>
                                <Button_Icon_Blue_170 ThemeMode={themeMode} onClick={(e) => {
                                    e.stopPropagation();
                                    changeModalView('');
                                    navigate('/Administration/Users/Permissions',{ replace: true });    
                                }}>
                                    <MdCancel/>
                                </Button_Icon_Blue_170>
                                {isActionBlock ? (
                                    <>
                                        <Button_Icon_Block_170 ThemeMode={themeMode}><AiFillEdit/></Button_Icon_Block_170>
                                    </>
                                ):(
                                    <>
                                        <Button_Icon_Blue_170 ThemeMode={themeMode} onClick={(e) => {
                                            e.stopPropagation();
                                            changePermissionsEdit();
                                        }}>
                                            <AiFillEdit/>
                                        </Button_Icon_Blue_170>
                                    </>
                                )}
                            </Container_Row_Border_90_Center>
                        </Container_Form_450>
                    </Container_Modal>  
                </>
            ):(
                <></>
            )}
        </>
    );
}