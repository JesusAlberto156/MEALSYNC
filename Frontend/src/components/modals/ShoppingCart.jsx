import { useContext } from "react";
import { Tooltip } from "@mui/material";

import { modalShoppingCartContext } from "../../contexts/ModalsProvider";

import { MdCancel } from "react-icons/md";
import { ImExit } from "react-icons/im";

import { Background_Modal,Background_Modal_Out_Login } from "../styled/Backgrounds";
import { Container_Modal,Container_Button_Modal } from "../styled/Containers";
import { Title_Modal,Text_Modal } from "../styled/Text";
import { Button_Icon_Cancel_Modal,Button_Icon_Exit_Modal } from "../styled/Buttons";

export default function ShoppingCart(){

    const [isModal,setIsModal] = useContext(modalShoppingCartContext);

    const Cancel = async () => {
        setIsModal(false);
    }

    return(
        <>
            <Container_Modal>
                {isModal ? (
                    <Background_Modal>
                        <Background_Modal_Out_Login>
                            <Title_Modal>Pedidos</Title_Modal>
                            <Text_Modal>Lista de platillos y mas del pedido</Text_Modal>
                            <Container_Button_Modal>
                                <Tooltip title="Cancelar">
                                    <Button_Icon_Cancel_Modal onClick={Cancel}><MdCancel/></Button_Icon_Cancel_Modal>
                                </Tooltip>
                                <Tooltip title="Cerrar sesión">
                                    <Button_Icon_Exit_Modal><ImExit/></Button_Icon_Exit_Modal>
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