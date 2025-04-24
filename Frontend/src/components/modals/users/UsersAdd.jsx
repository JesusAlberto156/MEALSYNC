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
import { SelectContext,RadioContext } from "../../../contexts/FormsProvider";
// Hooks personalizados
import { HandleChangeModal } from "../../../hooks/Views";
import { useHandleRadioChange } from "../../../hooks/Form";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { FaUserPlus } from "react-icons/fa";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_450,Container_Row_Border_90_Center,Container_Column_Border_90_Center,Container_Row_90_Center,Container_Row_100_Center } from "../../styled/Containers";
import { Button_Icon_Blue_170,Button_Icon_Green_170,Button_Icon_Block_170 } from "../../styled/Buttons";
import { Text_Title_30_Center,Text_P_16_Left,Text_P_20_Left,Text_A_16_Center } from "../../styled/Text";
import { Label_Check_18 } from "../../styled/Labels";
import { Input_Text_260,Input_Radio_16 } from "../../styled/Inputs";
//____________IMPORT/EXPORT____________


// Modal para ver la contraseña de usuarios
export default function Users_Add(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isActionBlock] = useContext(ActionBlockContext);
    const [isSelect] = useContext(SelectContext);
    const [isRadioUsers,setIsRadioUsers] = useContext(RadioContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleRadioChange = useHandleRadioChange();
    const changeModalView = HandleChangeModal();
    // Estructura del componente
    return(
        <>
            <Container_Modal>
                <Container_Form_450 ThemeMode={themeMode}>
                    <Text_Title_30_Center ThemeMode={themeMode}>AGREGAR USUARIO</Text_Title_30_Center>
                    <Text_P_16_Left ThemeMode={themeMode}>Ingresar datos del usuario...</Text_P_16_Left>
                    <Container_Column_Border_90_Center ThemeMode={themeMode}>
                        <Container_Row_90_Center>
                            <Label_Check_18 ThemeMode={themeMode}>Nombre:</Label_Check_18>
                            <Input_Text_260 ThemeMode={themeMode}/>
                        </Container_Row_90_Center>
                        <Container_Row_90_Center>
                            <Label_Check_18 ThemeMode={themeMode}>Nombre corto:</Label_Check_18>
                            <Input_Text_260 ThemeMode={themeMode}/>
                        </Container_Row_90_Center>
                        <Container_Row_90_Center>
                            <Label_Check_18 ThemeMode={themeMode}>Usuario:</Label_Check_18>
                            <Input_Text_260 ThemeMode={themeMode}/>
                        </Container_Row_90_Center>
                        <Container_Row_90_Center>
                            <Label_Check_18 ThemeMode={themeMode}>Contraseña:</Label_Check_18>
                            <Input_Text_260 ThemeMode={themeMode}/>
                        </Container_Row_90_Center>
                    </Container_Column_Border_90_Center>
                    <Text_A_16_Center ThemeMode={themeMode}>Permisos...</Text_A_16_Center>
                    <Container_Row_100_Center>
                        {['Default','Personalizado'].map((item,index) => (
                            <Label_Check_18 ThemeMode={themeMode} key={index}>
                                <Input_Radio_16 ThemeMode={themeMode}
                                    type="radio"
                                    name="tipo"
                                    checked={isRadioUsers.tipo === item}
                                    onChange={() => setIsRadioUsers(prev => ({ ...prev, tipo: item }))}
                                />
                                {item}
                            </Label_Check_18>
                        ))};
                    </Container_Row_100_Center>
                    <Text_A_16_Center ThemeMode={themeMode}>Estatus...</Text_A_16_Center>
                    <Container_Row_100_Center>
                        {['Habilitado','Deshabilitado'].map((item,index) => (
                            <Label_Check_18 ThemeMode={themeMode} key={index}>
                                <Input_Radio_16 ThemeMode={themeMode}
                                    type="radio"
                                    name="estatus"
                                    checked={isRadioUsers.estatus === item}
                                    onChange={() => setIsRadioUsers(prev => ({ ...prev, estatus: item }))}
                                />
                                {item}
                            </Label_Check_18>
                        ))};
                    </Container_Row_100_Center>
                    <Text_P_20_Left ThemeMode={themeMode}>Agregar usuario</Text_P_20_Left>
                    <Container_Row_Border_90_Center ThemeMode={themeMode}>
                        <Tooltip title='Cancelar' placement="top">
                            <Button_Icon_Blue_170 ThemeMode={themeMode} onClick={() => {
                                changeModalView('')
                                navigate('/Administration/Users/Principal',{ replace: true });
                            }}>
                                <MdCancel/>
                            </Button_Icon_Blue_170>
                        </Tooltip>
                        {isActionBlock ? (
                            <>
                                <Button_Icon_Block_170 ThemeMode={themeMode}><FaUserPlus/></Button_Icon_Block_170>
                            </>
                        ):(
                            <>
                                <Tooltip title='Agregar' placement="top">
                                    <Button_Icon_Green_170 ThemeMode={themeMode}><FaUserPlus/></Button_Icon_Green_170>
                                </Tooltip>
                            </>
                        )}
                    </Container_Row_Border_90_Center>
                </Container_Form_450>
            </Container_Modal>
        </>
    );
}