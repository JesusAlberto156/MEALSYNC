import { Tooltip } from "@mui/material";
import { useContext } from "react";

import { modalOutLoginContext } from '../../contexts/ModalsProvider';
import { loadingContext } from "../../contexts/LoadingProvider";

import { useOutLogin } from "../../hooks/UserSession";

import { ToastContainer } from "react-toastify";

import { Background_Modal,Background_Modal_Out_Login } from "../styled/Backgrounds";
import { Container_Modal,Container_Button_Modal } from "../styled/Containers";
import { Title_Modal,Text_Modal } from "../styled/Text";
import { Button_Icon_Cancel_Modal,Button_Icon_Exit_Modal } from "../styled/Buttons";

import { Spinner_Blue } from "../styled/Spinners";

import { ImSpinner9 } from "react-icons/im";
import { MdCancel } from "react-icons/md";
import { ImExit } from "react-icons/im";

export default function OutLogin(){

    const [isModal,setIsModal] = useContext(modalOutLoginContext);
    const [loading,isLoading] = useContext(loadingContext);

    const Cancel = async () => {
        setIsModal(false);
    }

    const outLogin = useOutLogin();

    return(
        <>
            <Container_Modal>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    closeOnClick
                    pauseOnHover
                    dragga
                    limit={5}
                />
                {isModal ? (
                    <Background_Modal>
                        <Background_Modal_Out_Login>
                            <Title_Modal>¿Estas seguro?</Title_Modal>
                            <Text_Modal>Cerrará la sesión</Text_Modal>
                            {loading ? (
                                <Spinner_Blue><ImSpinner9/></Spinner_Blue>
                            ):(
                                <Container_Button_Modal>
                                    <Tooltip title="Cancelar" placement="top">
                                        <Button_Icon_Cancel_Modal onClick={Cancel}><MdCancel/></Button_Icon_Cancel_Modal>
                                    </Tooltip>
                                    <Tooltip title="Cerrar sesión" placement="top">
                                        <Button_Icon_Exit_Modal onClick={outLogin}><ImExit/></Button_Icon_Exit_Modal>
                                    </Tooltip>
                                </Container_Button_Modal>
                            )}
                        </Background_Modal_Out_Login>
                    </Background_Modal>
                ):(
                    <></>
                )}
            </Container_Modal>
        </>
    );
}