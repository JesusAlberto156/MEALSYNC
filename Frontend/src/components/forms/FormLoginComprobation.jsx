//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useState } from "react";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Servicios

// Rutas

// Contextos
import { modeContext } from "../../contexts/VariablesProvider";
import { nameContext,passwordContext } from "../../contexts/SessionProvider";
// Hooks personalizados
import { useComprobation } from "../../hooks/Form";
//__________ICONOS__________
import { FaUser } from "react-icons/fa6";
//__________ICONOS__________
// Estilos personalizados
import { Container_Input_Border_Light,Container_Input_Border_Dark } from "../styled/Containers";
import { Text_P_20_Light,Text_P_20_Dark } from "../styled/Text";
import { Input_Group_80,Input_Text_280_Light,Input_Text_280_Dark } from "../styled/Inputs";
import { Label_Text_20_Light,Label_Popup_16_Light,Label_Text_20_Dark,Label_Popup_16_Dark } from "../styled/Labels";
import { Button_Icon_Blue_80_Light,Button_Icon_Blue_80_Dark } from "../styled/Buttons";
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Formulario para comprobar su sesión
export default function FormLoginComprobation(){
    // Constantes con el valor de los contextos
    const [isMode] = useContext(modeContext);
    const [isName,setIsName] = useContext(nameContext);
    const [isPassword,setIsPassword] = useContext(passwordContext);
    // Constantes con el valor de useState
    const [textName,setTextName] = useState(false);
    const [isFocusedName, setIsFocusedName] = useState(false);
    const [isFocusedNameColor, setIsFocusedNameColor] = useState(false);
    const [textPassword,setTextPassword] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [isFocusedPasswordColor, setIsFocusedPasswordColor] = useState(false);

    const comprobation = useComprobation();
    // Estructura del componente
    return(
        <>
            {isMode ? (
                <>
                    <Text_P_20_Light>Inicia sesión nuevamente...</Text_P_20_Light>
                    <Container_Input_Border_Light>
                        <Input_Group_80>
                            <Label_Text_20_Light
                                isLabelUp={isFocusedName}
                                isFocused={isFocusedNameColor}
                            >
                                Nombre de usuario
                            </Label_Text_20_Light>
                            <Input_Text_280_Light
                                value={isName}
                                onClick={(e) => {
                                    setTextName(true);
                                    setIsFocusedNameColor(true);
                                    setIsFocusedName(true);
                                }}
                                onBlur={(e) => {
                                    setTextName(false);
                                    setIsFocusedNameColor(false);
                                    if (e.target.value === ''){
                                        setIsFocusedName(false);
                                    }else{
                                        setIsFocusedName(true);
                                    }
                                }}   
                                onChange={(e) => setIsName(e.target.value)} 
                            />
                            {textName && (
                                <Label_Popup_16_Light>Escribe tú nombre de usuario</Label_Popup_16_Light>
                            )}
                        </Input_Group_80>
                        <Input_Group_80>
                            <Label_Text_20_Light 
                                isLabelUp={isFocusedPassword}
                                isFocused={isFocusedPasswordColor}
                            >
                                Contraseña
                            </Label_Text_20_Light>
                            <Input_Text_280_Light
                                value={isPassword}
                                onClick={(e) => {
                                    setTextPassword(true);
                                    setIsFocusedPasswordColor(true);
                                    setIsFocusedPassword(true);
                                }}
                                onBlur={(e) => {
                                    setTextPassword(false);
                                    setIsFocusedPasswordColor(false);
                                    if (e.target.value === ''){
                                        setIsFocusedPassword(false);
                                    }else{
                                        setIsFocusedPassword(true);
                                    }
                                }}   
                                onChange={(e) => setIsPassword(e.target.value)} 
                                type="password"
                            />
                            {textPassword && (
                                <Label_Popup_16_Light>Escribe tú Contraseña</Label_Popup_16_Light>
                            )}
                        </Input_Group_80>
                        <Tooltip title="Comprobar" placement="top">
                            <Button_Icon_Blue_80_Light onClick={() => comprobation()}><FaUser/></Button_Icon_Blue_80_Light>
                        </Tooltip>
                    </Container_Input_Border_Light>
                </>  
            ):(
                <>
                    <Text_P_20_Dark>Inicia sesión nuevamente...</Text_P_20_Dark>
                    <Container_Input_Border_Dark>
                        <Input_Group_80>
                            <Label_Text_20_Dark
                                isLabelUp={isFocusedName}
                                isFocused={isFocusedNameColor}
                            >
                                Nombre de usuario
                            </Label_Text_20_Dark>
                            <Input_Text_280_Dark
                                value={isName}
                                onClick={(e) => {
                                    setTextName(true);
                                    setIsFocusedNameColor(true);
                                    setIsFocusedName(true);
                                }}
                                onBlur={(e) => {
                                    setTextName(false);
                                    setIsFocusedNameColor(false);
                                    if (e.target.value === ''){
                                        setIsFocusedName(false);
                                    }else{
                                        setIsFocusedName(true);
                                    }
                                }}   
                                onChange={(e) => setIsName(e.target.value)} 
                            />
                            {textName && (
                                <Label_Popup_16_Dark>Escribe tú nombre de usuario</Label_Popup_16_Dark>
                            )}
                        </Input_Group_80>
                        <Input_Group_80>
                            <Label_Text_20_Dark 
                                isLabelUp={isFocusedPassword}
                                isFocused={isFocusedPasswordColor}
                            >
                                Contraseña
                            </Label_Text_20_Dark>
                            <Input_Text_280_Dark
                                value={isPassword}
                                onClick={(e) => {
                                    setTextPassword(true);
                                    setIsFocusedPasswordColor(true);
                                    setIsFocusedPassword(true);
                                }}
                                onBlur={(e) => {
                                    setTextPassword(false);
                                    setIsFocusedPasswordColor(false);
                                    if (e.target.value === ''){
                                        setIsFocusedPassword(false);
                                    }else{
                                        setIsFocusedPassword(true);
                                    }
                                }}   
                                onChange={(e) => setIsPassword(e.target.value)} 
                                type="password"
                            />
                            {textPassword && (
                                <Label_Popup_16_Dark>Escribe tú Contraseña</Label_Popup_16_Dark>
                            )}
                        </Input_Group_80>
                        <Tooltip title="Comprobar" placement="top">
                            <Button_Icon_Blue_80_Dark onClick={() => comprobation()}><FaUser/></Button_Icon_Blue_80_Dark>
                        </Tooltip>
                    </Container_Input_Border_Dark>
                </>
            )}
        </>
    );
}