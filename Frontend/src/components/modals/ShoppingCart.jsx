import { Background_Modal,Background_Modal_Out_Login } from "../styled/Backgrounds";
import { Container_Modal,Container_Button_Modal } from "../styled/Containers";
import { Title_Modal,Text_Modal } from "../styled/Text";
import { Button_Icon_Cancel_Modal,Button_Icon_Exit_Modal } from "../styled/Buttons";

import { Spinner_Blue } from "../styled/Spinners";

import { Tooltip } from "@mui/material";
import { ToastContainer } from "react-toastify";

import { ImSpinner9 } from "react-icons/im";
import { MdCancel } from "react-icons/md";
import { ImExit } from "react-icons/im";

import { useState,useContext } from "react";
import { modalShoppingCartContext } from "../../contexts/ModalsProvider";

export default function ShoppingCart(){

    const [isModal,setIsModal] = useContext(modalShoppingCartContext);
    const [loading,isLoading] = useState(false);

    const Cancel = async () => {
        setIsModal(false);
    }

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
                            <Title_Modal>Pedidos</Title_Modal>
                            <Text_Modal>Lista de platillos y mas del pedido</Text_Modal>
                            {loading ? (
                                <Spinner_Blue><ImSpinner9/></Spinner_Blue>
                            ):(
                                <Container_Button_Modal>
                                    <Tooltip title="Cancelar">
                                        <Button_Icon_Cancel_Modal onClick={Cancel}><MdCancel/></Button_Icon_Cancel_Modal>
                                    </Tooltip>
                                    <Tooltip title="Cerrar sesión">
                                        <Button_Icon_Exit_Modal><ImExit/></Button_Icon_Exit_Modal>
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