import { useContext,useEffect } from "react";
import { Tooltip } from "@mui/material";

import { modalContext,optionModalContext } from "../../contexts/VariablesProvider";
import { typeUserContext } from "../../contexts/TypeUserProvider";

import { useLogout } from '../../hooks/OptionsLogin'

import { MdCancel } from "react-icons/md";
import { ImExit } from "react-icons/im";

import { Background_Modal,Background_Modal_Out_Login } from "../styled/Backgrounds";
import { Container_Modal,Container_Button_Modal } from "../styled/Containers";
import { Title_Fade_Modal,Text_Modal } from "../styled/Text";
import { Button_Icon_Cancel_Modal,Button_Icon_Exit_Modal } from "../styled/Buttons";

export default function OutLogin(){

    const [isModal,setIsModal] = useContext(modalContext);
    const [isOptionModal,setIsOptionModal] = useContext(optionModalContext);
    const [isTypeUser] = useContext(typeUserContext);

    const Cancel = async () => {
        setIsModal(false);
        setIsOptionModal('');
    }

    useEffect(() => {
        if(isTypeUser === 'Cocinero' || isTypeUser === 'Nutriologo' || isTypeUser === 'Medico')document.title = "MEALSYNC_Menú_Cerrar_Sesión"
        if(isTypeUser === 'Administrador' || isTypeUser === 'Chef' || isTypeUser === 'Almacen')document.title = "MEALSYNC_Administración_Cerrar_Sesión"
    },[])

    const logout = useLogout();

    return(
        <>
            <Container_Modal>
                {isModal ? (
                    <Background_Modal>
                        <Background_Modal_Out_Login>
                            <Title_Fade_Modal>¿Estas seguro?</Title_Fade_Modal>
                            <Text_Modal>Cerrará la sesión</Text_Modal>
                            <Container_Button_Modal>
                                <Tooltip title="Cancelar" placement="top">
                                    <Button_Icon_Cancel_Modal onClick={Cancel}><MdCancel/></Button_Icon_Cancel_Modal>
                                </Tooltip>
                                <Tooltip title="Cerrar sesión" placement="top">
                                    <Button_Icon_Exit_Modal onClick={() => logout()}><ImExit/></Button_Icon_Exit_Modal>
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