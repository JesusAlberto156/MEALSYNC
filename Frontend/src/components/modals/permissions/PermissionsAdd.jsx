//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
// Componentes de React externos
import { Tooltip } from "@mui/material";
import Select from "react-select";
// Contextos
import { themeModeContext } from "../../../contexts/ViewsProvider";
import { actionBlockContext } from "../../../contexts/VariablesProvider";
import { selectContext } from "../../../contexts/FormsProvider";
// Hooks personalizados
import { useChangeModalView } from "../../../hooks/Views";
import { useHandleSelectChange,useFilteredRecordsHasPermissions } from "../../../hooks/Form";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { MdAddModerator } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_450,Container_Button_Border_Row_400 } from "../../styled/Containers";
import { Button_Icon_Blue_170,Button_Icon_Green_170,Button_Icon_Block_170 } from "../../styled/Buttons";
import { Text_Title_Fade_30,Text_P_Left_20 } from "../../styled/Text";
import { Label_Check_18 } from "../../styled/Labels";
import { Input_Checkbox_16 } from "../../styled/Inputs";
//____________IMPORT/EXPORT____________

// Modal para agregar permisos a los usuarios
export default function Permissions_Add(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(themeModeContext);
    const [isActionBlock] = useContext(actionBlockContext);
    const [isSelect] = useContext(selectContext);
    // useEffect con el titulo del modal
    useEffect(() => {
        document.title = "MEALSYNC_Administración_Usuarios_Permisos_Agregar"
    },[]);
    // Constantes con la funcionalidad de los hooks
    const changeModalView = useChangeModalView();
    const handleSelectChange = useHandleSelectChange();
    const filteredRecordsHasPermissions = useFilteredRecordsHasPermissions();
    // Estructura del componente
    return(
        <>
            <Container_Modal>
                <Container_Form_450 ThemeMode={themeMode}>
                    <Text_Title_Fade_30 ThemeMode={themeMode}>AGREGAR PERMISOS</Text_Title_Fade_30>
                    <Text_P_Left_20 ThemeMode={themeMode}>Selecciona un usuario...</Text_P_Left_20>
                    <Container_Button_Border_Row_400 ThemeMode={themeMode}>
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
                    </Container_Button_Border_Row_400>
                    <Text_P_Left_20 ThemeMode={themeMode}>Área de administración...</Text_P_Left_20>
                    <Container_Button_Border_Row_400 ThemeMode={themeMode}>
                        <Label_Check_18 ThemeMode={themeMode}>
                            <Input_Checkbox_16 ThemeMode={themeMode}
                                type="checkbox"
                            />
                            Administrador
                        </Label_Check_18>
                        <Label_Check_18 ThemeMode={themeMode}>
                            <Input_Checkbox_16 ThemeMode={themeMode}
                                type="checkbox"
                            />
                            Chef
                        </Label_Check_18>
                        <Label_Check_18 ThemeMode={themeMode}>
                            <Input_Checkbox_16 ThemeMode={themeMode}
                                type="checkbox"
                            />
                            Almacenista
                        </Label_Check_18>
                    </Container_Button_Border_Row_400>
                    <Text_P_Left_20 ThemeMode={themeMode}>Área de cocina...</Text_P_Left_20>
                    <Container_Button_Border_Row_400 ThemeMode={themeMode}>
                    <Label_Check_18 ThemeMode={themeMode}>
                            <Input_Checkbox_16 ThemeMode={themeMode}
                                type="checkbox"
                            />
                            Cocinero
                        </Label_Check_18>
                        <Label_Check_18 ThemeMode={themeMode}>
                            <Input_Checkbox_16 ThemeMode={themeMode}
                                type="checkbox"
                            />
                            Nutriólogo
                        </Label_Check_18>
                        <Label_Check_18 ThemeMode={themeMode}>
                            <Input_Checkbox_16 ThemeMode={themeMode}
                                type="checkbox"
                            />
                            Médico
                        </Label_Check_18>
                    </Container_Button_Border_Row_400>
                    <Text_P_Left_20 ThemeMode={themeMode}>Agregar permisos</Text_P_Left_20>
                    <Container_Button_Border_Row_400 ThemeMode={themeMode}>
                        <Tooltip title='Cancelar' placement="top">
                            <Button_Icon_Blue_170 ThemeMode={themeMode} onClick={() => changeModalView()}><MdCancel/></Button_Icon_Blue_170>
                        </Tooltip>
                        {isActionBlock ? (
                            <>
                                <Button_Icon_Block_170 ThemeMode={themeMode}><MdAddModerator/></Button_Icon_Block_170>
                            </>
                        ):(
                            <>
                                <Tooltip title='Agregar' placement="top">
                                    <Button_Icon_Green_170 ThemeMode={themeMode}><MdAddModerator/></Button_Icon_Green_170>
                                </Tooltip>
                            </>
                        )}
                    </Container_Button_Border_Row_400>
                </Container_Form_450>
            </Container_Modal>
        </>
    );
}