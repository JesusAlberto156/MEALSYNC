import { Modal_Container_Shopping_Cart,Modal_Shopping_Cart,Modal_Content_Shopping_Cart,Title,Text,Content_Button,Button_Icon_Cancel,Button_Icon_Exit } from "../styled/Modals";
import { Tooltip } from "@mui/material";
import { ToastContainer } from "react-toastify";

import { ImSpinner9 } from "react-icons/im";
import { MdCancel } from "react-icons/md";
import { ImExit } from "react-icons/im";

import { useState } from "react";

export default function ShoppingCart({ isModal }){

    const [loading,isLoading] = useState(false);

    const Cancel = async () => {
        isModal(false);
    }

    return(
        <>
            <Modal_Container_Shopping_Cart>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    closeOnClick
                    pauseOnHover
                    dragga
                    limit={5}
                />
                {isModal ? (
                    <Modal_Shopping_Cart>
                        <Modal_Content_Shopping_Cart>
                            <Title>Pedidos</Title>
                            <Text>Lista de platillos y mas del pedido</Text>
                            {loading ? (
                                <Spinner_Blue><ImSpinner9/></Spinner_Blue>
                            ):(
                                <Content_Button>
                                    <Tooltip title="Cancelar">
                                        <Button_Icon_Cancel onClick={Cancel}><MdCancel/></Button_Icon_Cancel>
                                    </Tooltip>
                                    <Tooltip title="Cerrar sesión">
                                        <Button_Icon_Exit><ImExit/></Button_Icon_Exit>
                                    </Tooltip>
                                </Content_Button>
                            )}
                        </Modal_Content_Shopping_Cart>
                    </Modal_Shopping_Cart>
                ):(
                    <></>
                )}
            </Modal_Container_Shopping_Cart>
        </>
    );
}