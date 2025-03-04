import { Tooltip } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Modal_Container_Out_Login,Modal_Out_Login,Modal_Content_Out_Login,Title,Text,Content_Button,Button_Icon_Cancel,Button_Icon_Exit } from "../styled/Modals";
import { Alert_Red } from "../styled/Notifications";
import { Spinner_Blue } from "../styled/Forms";

import { ImSpinner9 } from "react-icons/im";
import { MdCancel } from "react-icons/md";
import { ImExit } from "react-icons/im";

export default function OutLogin({ isModal }){

    const [loading,isLoading] = useState(false);

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const navigate = useNavigate();

    const Cancel = async () => {
        isModal(false);
    }

    const Exit = async () => {
        document.title = "Cargando...";
        isLoading(true);
        await delay(1000);
        Alert_Red('¡Sesión cerrada!');
        await delay(3000);
        navigate("/Login",{replace: true});
        document.title = "MEALSYNC_Iniciar_Sesión";
    }

    return(
        <>
            <Modal_Container_Out_Login>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    closeOnClick
                    pauseOnHover
                    dragga
                    limit={5}
                />
                {isModal ? (
                    <Modal_Out_Login>
                        <Modal_Content_Out_Login>
                            <Title>¿Estas seguro?</Title>
                            <Text>Cerrará la sesión</Text>
                            {loading ? (
                                <Spinner_Blue><ImSpinner9/></Spinner_Blue>
                            ):(
                                <Content_Button>
                                    <Tooltip title="Cancelar">
                                        <Button_Icon_Cancel onClick={Cancel}><MdCancel/></Button_Icon_Cancel>
                                    </Tooltip>
                                    <Tooltip title="Cerrar sesión">
                                        <Button_Icon_Exit onClick={Exit}><ImExit/></Button_Icon_Exit>
                                    </Tooltip>
                                </Content_Button>
                            )}
                        </Modal_Content_Out_Login>
                    </Modal_Out_Login>
                ):(
                    <></>
                )}
            </Modal_Container_Out_Login>
        </>
    );
}