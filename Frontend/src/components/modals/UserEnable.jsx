import { useContext,useEffect } from "react";
import { Tooltip } from "@mui/material";

import { modalUserEnableContext } from '../../contexts/ModalsProvider';
import { selectedRowContext } from "../../contexts/VariablesProvider";

import { useOutLogin } from "../../hooks/UserSession";

import { MdCancel } from "react-icons/md";
import { FaUserSlash } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

import { Background_Modal, Background_Modal_User_Enable } from "../styled/Backgrounds";
import { Container_Modal,Container_Button_Modal } from "../styled/Containers";
import { Title_Modal,Text_Modal } from "../styled/Text";
import { Button_Icon_Cancel_Modal,Button_Icon_Exit_Modal,Button_Icon_Green_Modal } from "../styled/Buttons";

export default function UserEnable(){

    const [isModal,setIsModal] = useContext(modalUserEnableContext);
    const [selectedRow] = useContext(selectedRowContext);
        
    const Cancel = async () => {
        setIsModal(false);
    }

    useEffect(() => {
        if(selectedRow.habilitado)document.title = "MEALSYNC_Administración_Deshabilitar"
        if(!selectedRow.habilitado)document.title = "MEALSYNC_Administración_Habilitar"
    },[]);

    const outLogin = useOutLogin();

    return(
        <>
            <Container_Modal id="Enable">
                {isModal && selectedRow ? (
                    <Background_Modal>
                        <Background_Modal_User_Enable>
                            <Title_Modal>¿Estas seguro?</Title_Modal>
                            {selectedRow.habilitado ? <Text_Modal>Se va deshabilitar al usuario y se <br/>cerrará su sesión de forma forzada</Text_Modal> : <Text_Modal>Se va habilitar al usuario</Text_Modal>}
                            <Container_Button_Modal>
                                <Tooltip title="Cancelar" placement="top">
                                    <Button_Icon_Cancel_Modal onClick={Cancel}><MdCancel/></Button_Icon_Cancel_Modal>
                                </Tooltip>
                                {selectedRow.habilitado ? (
                                    <>
                                        <Tooltip title="Deshabilitar" placement="top">
                                            <Button_Icon_Exit_Modal id="Deshabilitar"><FaUserSlash/></Button_Icon_Exit_Modal>
                                        </Tooltip>
                                    </>
                                ):(
                                    <>
                                        <Tooltip title="Habilitar" placement="top">
                                            <Button_Icon_Green_Modal id="Habilitar"><FaUser/></Button_Icon_Green_Modal>
                                        </Tooltip>
                                    </>
                                )}
                            </Container_Button_Modal>
                        </Background_Modal_User_Enable>
                    </Background_Modal>
                ):(
                    <></>
                )}
            </Container_Modal>
        </>
    );
}