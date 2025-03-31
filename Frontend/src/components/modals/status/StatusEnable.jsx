//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Servicios

// Rutas

// Contextos
import { modeContext } from "../../../contexts/VariablesProvider";
import { selectedRowContext,modalContext,optionModalContext } from "../../../contexts/VariablesProvider";
import { nameContext,passwordContext } from "../../../contexts/SessionProvider";
import { usersContext } from "../../../contexts/UsersProvider";
// Hooks personalizados
import { useCloseModal,useEnableUser } from "../../../hooks/Modal";
//__________ICONOS__________
import { MdCancel } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { FaExclamationCircle } from 'react-icons/fa';
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_400_Light,Container_Button_Border_Light,Container_Input_Border_Light,Container_Form_400_Dark,Container_Button_Border_Dark,Container_Input_Border_Dark } from "../../styled/Containers";
import { Text_Title_Fade_30_Light,Text_P_20_Light,Text_Title_Fade_30_Dark,Text_P_20_Dark } from "../../styled/Text";
import { Button_Icon_Blue_50_Light,Button_Icon_Blue_50_Dark, } from "../../styled/Buttons";
import { Icon_Warning_Modal,Icon_Tooltip_Modal } from "../../styled/Icons";
import { Input_Group_Login,Input_Login } from "../../styled/Inputs";
import { Label_Login,Label_Popup_Login } from "../../styled/Labels";
// Componentes personalizados

//____________IMPORT/EXPORT____________

export default function StatusEnable(){
    // Constantes con el valor de los contextos
    const [isMode] = useContext(modeContext);
    const [isName,setIsName] = useContext(nameContext);
    const [isPassword,setIsPassword] = useContext(passwordContext);
    const [isModal,setIsModal] = useContext(modalContext);
    const [isOptionModal,setIsOptionModal] = useContext(optionModalContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(selectedRowContext);
    const [isUsers] = useContext(usersContext);
    // Constantes con el valor de useState
    const [textName,setTextName] = useState(false);
    const [isFocusedName, setIsFocusedName] = useState(false);
    const [isFocusedNameColor, setIsFocusedNameColor] = useState(false);
    const [textPassword,setTextPassword] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [isFocusedPasswordColor, setIsFocusedPasswordColor] = useState(false);
    const [user,setUser] = useState('');


    const closeModal = useCloseModal();
    const enableUser = useEnableUser();

    return(
        <>
            <Container_Modal id="Status-Enable">
                {!isModal ? (
                    isMode ? (
                        <>
                            <Container_Form_400_Light>
                                <Text_Title_Fade_30_Light>Hola</Text_Title_Fade_30_Light>
                                <Text_P_20_Light>Inicia sesión nuevamente...</Text_P_20_Light>
                                <Container_Input_Border_Light>
                                    <Input_Group_Login>
                                        <Label_Login
                                            isLabelUp={isFocusedName}
                                            isFocused={isFocusedNameColor}
                                        >
                                            Nombre de usuario
                                        </Label_Login>
                                        <Input_Login
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
                                            <Label_Popup_Login>Escribe tú nombre de usuario</Label_Popup_Login>
                                        )}
                                    </Input_Group_Login>
                                    <Input_Group_Login>
                                        <Label_Login 
                                            isLabelUp={isFocusedPassword}
                                            isFocused={isFocusedPasswordColor}
                                        >
                                            Contraseña
                                        </Label_Login>
                                        <Input_Login
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
                                            <Label_Popup_Login>Escribe tú Contraseña</Label_Popup_Login>
                                        )}
                                    </Input_Group_Login>
                                </Container_Input_Border_Light>
                                <Text_P_20_Light>Hola</Text_P_20_Light>
                                <Container_Button_Border_Light>
                                    <Tooltip title="Cancelar" placement="top">
                                        <Button_Icon_Blue_50_Light id="Boton-Estatus-Cancelar" onClick={() => closeModal()}><MdCancel/></Button_Icon_Blue_50_Light>
                                    </Tooltip>
                                </Container_Button_Border_Light>
                            </Container_Form_400_Light>
                        </>
                    ):(
                        <>
                            <Container_Form_400_Dark>
                                <Text_Title_Fade_30_Dark>Hola</Text_Title_Fade_30_Dark>
                                <Container_Button_Border_Dark>
                                    <Tooltip title="Cancelar" placement="top">
                                        <Button_Icon_Blue_50_Dark id="Boton-Estatus-Cancelar" onClick={() => closeModal()}><MdCancel/></Button_Icon_Blue_50_Dark>
                                    </Tooltip>
                                </Container_Button_Border_Dark>
                            </Container_Form_400_Dark>
                        </>
                    )
                ):(
                    <></>
                )}
            </Container_Modal>
        </>
    );
}