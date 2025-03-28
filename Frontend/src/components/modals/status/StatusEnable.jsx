import { useContext,useEffect,useState } from "react";
import { Tooltip } from "@mui/material";

import { selectedRowContext,modalContext,optionModalContext } from "../../../contexts/VariablesProvider";
import { usersContext } from "../../../contexts/UsersProvider";

import { useEnable } from "../../../hooks/Status";

import { MdCancel } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { FaExclamationCircle } from 'react-icons/fa';

import { Background_Modal,Background_Modal_Componets } from "../../styled/Backgrounds";
import { Container_Modal,Container_Button_Modal } from "../../styled/Containers";
import { Title_Fade_Modal,Text_Modal,GlobalStyle } from "../../styled/Text";
import { Button_Icon_Cancel_Modal,Button_Icon_Exit_Modal,Button_Icon_Green_Modal } from "../../styled/Buttons";
import { Icon_Warning_Modal,Icon_Tooltip_Modal } from "../../styled/Icons";

export default function StatusEnable(){

    const [isModal,setIsModal] = useContext(modalContext);
    const [isOptionModal,setIsOptionModal] = useContext(optionModalContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(selectedRowContext);
    const [isUsers] = useContext(usersContext);
    
    const [user,setUser] = useState('');

    const Cancel = async () => {
        setIsModal(false);
        setIsOptionModal('');
        setIsSelectedRow(null);
    }

    useEffect(() => {
        if(isSelectedRow.habilitado)document.title = "MEALSYNC_Administración_Estatus_Deshabilitar"
        if(!isSelectedRow.habilitado)document.title = "MEALSYNC_Administración_Estatus_Habilitar"
        if(isSelectedRow !== null){
            const isUser = isUsers.find(u => u.idusuario === isSelectedRow.idusuario);
            if(isUser){
                setUser(isUser.usuario);
            }
        }
    },[]);

    const enable = useEnable();

    return(
        <>
            <GlobalStyle/>
            <Container_Modal id="Estatus-Habilitar">
                {isModal && isSelectedRow ? (
                    <Background_Modal>
                        <Background_Modal_Componets>
                            <Title_Fade_Modal>{isSelectedRow.habilitado ? 'DESHABILITAR USUARIO' : 'HABILITAR USUARIO'}</Title_Fade_Modal>
                            {isSelectedRow.habilitado ? <Text_Modal>Se deshabilitará a {user} <Icon_Warning_Modal><FaExclamationCircle /><Icon_Tooltip_Modal>¡Cerrará su sesión de forma forzada!...</Icon_Tooltip_Modal></Icon_Warning_Modal></Text_Modal> : <Text_Modal>Se habilitará a {user}...</Text_Modal>}
                            <Container_Button_Modal>
                                <Tooltip title="Cancelar" placement="top">
                                    <Button_Icon_Cancel_Modal id="Boton-Estatus-Cancelar" onClick={Cancel}><MdCancel/></Button_Icon_Cancel_Modal>
                                </Tooltip>
                                {isSelectedRow.habilitado ? (
                                    <>
                                        <Tooltip title="Deshabilitar" placement="top">
                                            <Button_Icon_Exit_Modal id="Boton-Estatus-Deshabilitar" onClick={() => enable()}><FaLock/></Button_Icon_Exit_Modal>
                                        </Tooltip>
                                    </>
                                ):(
                                    <>
                                        <Tooltip title="Habilitar" placement="top">
                                            <Button_Icon_Green_Modal id="Boton-Estatus-Habilitar" onClick={() => enable()}><FaLockOpen/></Button_Icon_Green_Modal>
                                        </Tooltip>
                                    </>
                                )}
                            </Container_Button_Modal>
                        </Background_Modal_Componets>
                    </Background_Modal>
                ):(
                    <></>
                )}
            </Container_Modal>
        </>
    );
}