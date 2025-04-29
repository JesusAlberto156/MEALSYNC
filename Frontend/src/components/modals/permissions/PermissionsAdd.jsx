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
import { SelectContext,CheckboxContext } from "../../../contexts/FormsProvider";
// Hooks personalizados
import { HandleChangeModal } from "../../../hooks/Views";
import { useChangePermissionsAdd,useHandleSelectChange,useFilteredRecordsHasPermissions,useHandleCheckboxChange } from "../../../hooks/Form";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { MdAddModerator } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_450,Container_Row_Border_90_Center } from "../../styled/Containers";
import { Button_Icon_Blue_170,Button_Icon_Green_170 } from "../../styled/Buttons";
import { Text_Title_30_Center,Text_P_20_Left } from "../../styled/Text";
import { Label_Text_16_Center } from "../../styled/Labels";
import { Input_Checkbox_16 } from "../../styled/Inputs";
//____________IMPORT/EXPORT____________

// Modal para agregar permisos a los usuarios
export default function Permissions_Add(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isActionBlock] = useContext(ActionBlockContext);
    const [isSelect] = useContext(SelectContext);
    const [isCheckbox] = useContext(CheckboxContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const changePermissionsAdd = useChangePermissionsAdd();
    const changeModalView = HandleChangeModal();
    const handleSelectChange = useHandleSelectChange();
    const handleCheckboxChange = useHandleCheckboxChange();
    const filteredRecordsHasPermissions = useFilteredRecordsHasPermissions();
    // Estructura del componente
    return(
        <>
            <Container_Modal>
                <Container_Form_450 ThemeMode={themeMode}>
                    <Text_Title_30_Center ThemeMode={themeMode}>AGREGAR PERMISOS</Text_Title_30_Center>
                    <Text_P_20_Left ThemeMode={themeMode}>Selecciona un usuario...</Text_P_20_Left>
                    <Container_Row_Border_90_Center ThemeMode={themeMode}>
                        <Select
                            options={filteredRecordsHasPermissions.map((user) => ({
                                value: user.idusuario,
                                label: user.usuario
                            }))}
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    width: '350px',
                                    padding: '6px',
                                    border: '2px solid black',
                                    cursor: 'pointer',
                                    borderRadius: '15px',
                                    fontFamily: 'Prompt, sans-serif',
                                    fontWeight: 300,
                                    fontStyle: 'normal',
                                    fontSize: '18px',
                                    '@media (max-width: 768px)':{
                                        width: '300px',
                                        padding: '4px',
                                        fontSize: '16px',
                                    },
                                    '@media (max-width: 480px)':{
                                        width: '250px',
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
                                    fontFamily: 'Prompt, sans-serif',
                                    fontWeight: 300,
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
                    </Container_Row_Border_90_Center>
                    <Text_P_20_Left ThemeMode={themeMode}>Área de administración...</Text_P_20_Left>
                    <Container_Row_Border_90_Center ThemeMode={themeMode}>
                        <Label_Text_16_Center ThemeMode={themeMode}>
                            <Input_Checkbox_16 ThemeMode={themeMode}
                                value={isCheckbox.some(item => item.name === 'Administrator' && item.value)}
                                onChange={(e) => handleCheckboxChange('Administrator',e)}
                                type="checkbox"
                            />
                            Administrador
                        </Label_Text_16_Center>
                        <Label_Text_16_Center ThemeMode={themeMode}>
                            <Input_Checkbox_16 ThemeMode={themeMode}
                                value={isCheckbox.some(item => item.name === 'Chef' && item.value)}
                                onChange={(e) => handleCheckboxChange('Chef',e)}
                                type="checkbox"
                            />
                            Chef
                        </Label_Text_16_Center>
                        <Label_Text_16_Center ThemeMode={themeMode}>
                            <Input_Checkbox_16 ThemeMode={themeMode}
                                type="checkbox"
                                value={isCheckbox.some(item => item.name === 'Storekeeper' && item.value)}
                                onChange={(e) => handleCheckboxChange('Storekeeper',e)}
                            />
                            Almacenista
                        </Label_Text_16_Center>
                    </Container_Row_Border_90_Center>
                    <Text_P_Left_20 ThemeMode={themeMode}>Área de cocina...</Text_P_Left_20>
                    <Container_Row_Border_90_Center ThemeMode={themeMode}>
                        <Label_Text_16_Center ThemeMode={themeMode}>
                            <Input_Checkbox_16 ThemeMode={themeMode}
                                type="checkbox"
                                value={isCheckbox.some(item => item.name === 'Cook' && item.value)}
                                onChange={(e) => handleCheckboxChange('Cook',e)}
                            />
                            Cocinero
                        </Label_Text_16_Center>
                        <Label_Text_16_Center ThemeMode={themeMode}>
                            <Input_Checkbox_16 ThemeMode={themeMode}
                                type="checkbox"
                                value={isCheckbox.some(item => item.name === 'Nutritionist' && item.value)}
                                onChange={(e) => handleCheckboxChange('Nutritionist',e)}
                            />
                            Nutriólogo
                        </Label_Text_16_Center>
                        <Label_Text_16_Center ThemeMode={themeMode}>
                            <Input_Checkbox_16 ThemeMode={themeMode}
                                type="checkbox"
                                value={isCheckbox.some(item => item.name === 'Doctor' && item.value)}
                                onChange={(e) => handleCheckboxChange('Doctor',e)}
                            />
                            Médico
                        </Label_Text_16_Center>
                    </Container_Row_Border_90_Center>
                    <Text_P_20_Left ThemeMode={themeMode}>Agregar permisos</Text_P_20_Left>
                    <Container_Row_Border_90_Center ThemeMode={themeMode}>
                        <Tooltip title='Cancelar' placement="top">
                            <Button_Icon_Blue_170 ThemeMode={themeMode} onClick={() => {
                                changeModalView('')
                                navigate('/Administration/Users/Permissions',{ replace: true });    
                            }}>
                                <MdCancel/>
                            </Button_Icon_Blue_170>
                        </Tooltip>
                        {isActionBlock ? (
                            <>
                                
                            </>
                        ):(
                            <>
                                <Tooltip title='Agregar' placement="top">
                                    <Button_Icon_Green_170 ThemeMode={themeMode} onClick={() => changePermissionsAdd()}><MdAddModerator/></Button_Icon_Green_170>
                                </Tooltip>
                            </>
                        )}
                    </Container_Row_Border_90_Center>
                </Container_Form_450>
            </Container_Modal>
        </>
    );
}