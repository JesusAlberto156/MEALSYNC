//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
import Select from "react-select";
// Contextos
import { themeModeContext } from "../../../contexts/ViewsProvider";
import { selectContext,radioContext } from "../../../contexts/FormsProvider";
import { actionBlockContext } from "../../../contexts/VariablesProvider";
// Hooks personalizados
import { useChangeModalView } from "../../../hooks/Views";
import { useChangeStatusSAdd,useFilteredRecordsHasStatus,useHandleRadioChange,useHandleSelectChange } from "../../../hooks/Form";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { FcAddRow } from "react-icons/fc";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_400,Container_Button_Border_Row_350 } from "../../styled/Containers";
import { Text_Title_Fade_30,Text_P_Left_20 } from "../../styled/Text";
import { Button_Icon_Blue_150,Button_Icon_Block_150,Button_Icon_Green_150 } from "../../styled/Buttons";
import { Label_Check_18 } from "../../styled/Labels";
import { Input_Radio_16 } from "../../styled/Inputs";
//____________IMPORT/EXPORT____________

// Modal para agregar estatus al usuario
export default function Status_Add(){
    // Constantes con el valor de los contextos 
    const [themeMode] = useContext(themeModeContext);
    const [isSelect] = useContext(selectContext);
    const [isRadio] = useContext(radioContext);
    const [isActiveBlock] = useContext(actionBlockContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const changeModalView = useChangeModalView();
    const filteredRecordsHasStatus = useFilteredRecordsHasStatus();
    const handleSelectChange = useHandleSelectChange();
    const handleRadioChange = useHandleRadioChange();
    const changeStatusSAdd = useChangeStatusSAdd();
    // Estructura del componente
    return(
        <>
            <Container_Modal>
                <Container_Form_400 ThemeMode={themeMode}>
                        <Text_Title_Fade_30 ThemeMode={themeMode}>AGREGAR STATUS</Text_Title_Fade_30>
                        <Text_P_Left_20 ThemeMode={themeMode}>Selecciona un usuario...</Text_P_Left_20>
                        <Container_Button_Border_Row_350 ThemeMode={themeMode}>
                            <Select
                                options={filteredRecordsHasStatus.map((user) => ({
                                    value: user.idusuario,
                                    label: user.usuario
                                }))}
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        width: '300px',
                                        padding: '6px',
                                        border: '2px solid black',
                                        cursor: 'pointer',
                                        borderRadius: '15px',
                                        fontFamily: 'Prompt, sans-serif',
                                        fontWeight: 300,
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
                        </Container_Button_Border_Row_350>
                        <Text_P_Left_20 ThemeMode={themeMode}>Selecciona un estado...</Text_P_Left_20>
                        <Container_Button_Border_Row_350 ThemeMode={themeMode}>
                            {['Habilitado','Deshabilitado'].map((item,index) => (
                                <Label_Check_18 ThemeMode={themeMode} key={index}>
                                    <Input_Radio_16 ThemeMode={themeMode}
                                        type="radio"
                                        name="group"
                                        value={item}
                                        checked={isRadio === item}
                                        onChange={handleRadioChange}
                                    />
                                    {item}
                                </Label_Check_18>
                            ))};
                        </Container_Button_Border_Row_350>
                        <Text_P_Left_20 ThemeMode={themeMode}>Agregar estatus...</Text_P_Left_20>
                        <Container_Button_Border_Row_350 ThemeMode={themeMode}>
                            <Tooltip title='Cancelar' placement="top">
                                <Button_Icon_Blue_150 ThemeMode={themeMode} onClick={() => {
                                    changeModalView('')
                                    navigate('/Administration/Users/Status',{ replace: true });    
                                }}>
                                    <MdCancel/>
                                </Button_Icon_Blue_150>
                            </Tooltip>
                            {isActiveBlock ? (
                                <>
                                    <Button_Icon_Block_150 ThemeMode={themeMode}><FcAddRow/></Button_Icon_Block_150>   
                                </>
                            ):(
                                <>
                                    <Tooltip title="Agregar" placement="top">
                                        <Button_Icon_Green_150 ThemeMode={themeMode} onClick={() => changeStatusSAdd()}><FcAddRow/></Button_Icon_Green_150>
                                    </Tooltip>
                                </>
                            )}
                        </Container_Button_Border_Row_350>
                </Container_Form_400>
            </Container_Modal>
        </>
    );
}