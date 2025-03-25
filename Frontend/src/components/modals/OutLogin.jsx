import { useContext,useEffect } from "react";
import { Tooltip } from "@mui/material";

import { modalOutLoginContext } from '../../contexts/ModalsProvider';
import { typeUserContext } from "../../contexts/TypeUserProvider";

import { useOutLogin } from "../../hooks/UserSession";

import { MdCancel } from "react-icons/md";
import { ImExit } from "react-icons/im";

import { Background_Modal,Background_Modal_Out_Login } from "../styled/Backgrounds";
import { Container_Modal,Container_Button_Modal } from "../styled/Containers";
import { Title_Modal,Text_Modal } from "../styled/Text";
import { Button_Icon_Cancel_Modal,Button_Icon_Exit_Modal } from "../styled/Buttons";

export default function OutLogin(){

    const [isModal,setIsModal] = useContext(modalOutLoginContext);
    const [typeUser] = useContext(typeUserContext);
        
    const Cancel = async () => {
        setIsModal(false);
    }

    useEffect(() => {
        if(typeUser === 'Cocinero' || typeUser === 'Nutriologo' || typeUser === 'Medico')document.title = "MEALSYNC_Menú_Cerrar_Sesión"
        if(typeUser === 'Administrador' || typeUser === 'Chef' || typeUser === 'Almacen')document.title = "MEALSYNC_Administración_Cerrar_Sesión"
    },[])

    const outLogin = useOutLogin();

    return(
        <>
            <Container_Modal>
                {isModal ? (
                    <Background_Modal>
                        <Background_Modal_Out_Login>
                            <Title_Modal>¿Estas seguro?</Title_Modal>
                            <Text_Modal>Cerrará la sesión</Text_Modal>
                            <Container_Button_Modal>
                                <Tooltip title="Cancelar" placement="top">
                                    <Button_Icon_Cancel_Modal onClick={Cancel}><MdCancel/></Button_Icon_Cancel_Modal>
                                </Tooltip>
                                <Tooltip title="Cerrar sesión" placement="top">
                                    <Button_Icon_Exit_Modal onClick={() => outLogin()}><ImExit/></Button_Icon_Exit_Modal>
                                </Tooltip>
                            </Container_Button_Modal>
                        </Background_Modal_Out_Login>
                    </Background_Modal>
                ):(
                    <></>
                )}
            </Container_Modal>
        </>
    );
}