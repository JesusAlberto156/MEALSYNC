import { useContext,useEffect } from "react";
import { Tooltip } from "@mui/material";

import { selectedRowContext,modalContext,optionModalContext } from "../../../contexts/VariablesProvider";

import { useEnable } from "../../../hooks/Status";

import { MdCancel } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";

import { Background_Modal, Background_Modal_Status } from "../../styled/Backgrounds";
import { Container_Modal,Container_Button_Modal } from "../../styled/Containers";
import { Title_Fade_Modal,Text_Modal } from "../../styled/Text";
import { Button_Icon_Cancel_Modal,Button_Icon_Exit_Modal,Button_Icon_Green_Modal } from "../../styled/Buttons";

export default function StatusEnable(){

    const [isModal,setIsModal] = useContext(modalContext);
    const [isOptionModal,setIsOptionModal] = useContext(optionModalContext);
    const [isSelectedRow] = useContext(selectedRowContext);

    const Cancel = async () => {
        setIsModal(false);
        setIsOptionModal('');
    }

    useEffect(() => {
        if(isSelectedRow.habilitado)document.title = "MEALSYNC_Administración_Estatus_Deshabilitar"
        if(!isSelectedRow.habilitado)document.title = "MEALSYNC_Administración_Estatus_Habilitar"
    },[]);

    const enable = useEnable();

    return(
        <>
            <Container_Modal id="Estatus-Habilitar">
                {isModal && isSelectedRow ? (
                    <Background_Modal>
                        <Background_Modal_Status>
                            <Title_Fade_Modal>¿Estas seguro?</Title_Fade_Modal>
                            {isSelectedRow.habilitado ? <Text_Modal>Se va deshabilitar al usuario y se <br/>cerrará su sesión de forma forzada</Text_Modal> : <Text_Modal>Se va habilitar al usuario</Text_Modal>}
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
                        </Background_Modal_Status>
                    </Background_Modal>
                ):(
                    <></>
                )}
            </Container_Modal>
        </>
    );
}