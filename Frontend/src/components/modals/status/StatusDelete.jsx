import { useContext,useEffect,useState } from "react";
import { Tooltip } from "@mui/material";

import { selectedRowContext,modalContext,optionModalContext } from "../../../contexts/VariablesProvider";
import { usersContext } from "../../../contexts/UsersProvider";

import { MdCancel } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import { Background_Modal,Background_Modal_Componets } from "../../styled/Backgrounds";
import { Container_Modal,Container_Button_Modal } from "../../styled/Containers";
import { Title_Fade_Modal,Text_Modal } from "../../styled/Text";
import { Button_Icon_Cancel_Modal,Button_Icon_Exit_Modal } from "../../styled/Buttons";

export default function StatusDelete(){

    const [isModal,setIsModal] = useContext(modalContext);
    const [isOptionModal,setIsOptionModal] = useContext(optionModalContext);
    const [isSelectedRow] = useContext(selectedRowContext);
    const [isUsers] = useContext(usersContext);

    const [user,setUser] = useState('');

    const Cancel = async () => {
        setIsModal(false);
        setIsOptionModal('');
    }

    useEffect(() => {
        document.title = "MEALSYNC_Administración_Estatus_Eliminar"
        if(isSelectedRow !== null){
            const isUser = isUsers.find(u => u.idusuario === isSelectedRow.idusuario);
            if(isUser){
                setUser(isUser.usuario);
            }
        }
    },[]);

    return(
        <>
            <Container_Modal id="Estatus-Eliminar">
                {isModal && isSelectedRow ? (
                    <Background_Modal>
                        <Background_Modal_Componets>
                            <Title_Fade_Modal>¿Estas seguro?</Title_Fade_Modal>
                            <Text_Modal>Se eliminará el estatus a {user} <br/>¡Cerrará su sesión de forma forzada!...</Text_Modal>
                            <Container_Button_Modal>
                                <Tooltip title="Cancelar" placement="top">
                                    <Button_Icon_Cancel_Modal id="Boton-Estatus-Cancelar" onClick={Cancel}><MdCancel/></Button_Icon_Cancel_Modal>
                                </Tooltip>
                                <Tooltip title="Eliminar" placement="top">
                                    <Button_Icon_Exit_Modal id="Boton-Estatus-Eliminar"><MdDelete/></Button_Icon_Exit_Modal>
                                </Tooltip>
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