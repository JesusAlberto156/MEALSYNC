import { useContext,useEffect } from "react";
import { Tooltip } from "@mui/material";

import { modalContext,optionModalContext } from "../../contexts/VariablesProvider";

import { MdCancel } from "react-icons/md";
import { ImExit } from "react-icons/im";

import { Background_Modal,Background_Modal_Componets } from "../styled/Backgrounds";
import { Container_Modal,Container_Button_Modal } from "../styled/Containers";
import { Title_Fade_Modal,Text_Modal } from "../styled/Text";
import { Button_Icon_Cancel_Modal,Button_Icon_Exit_Modal } from "../styled/Buttons";

export default function ShoppingCart(){

    const [isModal,setIsModal] = useContext(modalContext);
    const [isOptionModal,setIsOptionModal] = useContext(optionModalContext);

    const Cancel = async () => {
        setIsModal(false);
        setIsOptionModal('');
    }

    useEffect(() => {
        document.title = "MEALSYNC_Menú_Carro_De_Compras"
    },[]);

    return(
        <>
            <Container_Modal>
                {isModal ? (
                    <Background_Modal>
                        <Background_Modal_Componets>
                            <Title_Fade_Modal>Pedidos</Title_Fade_Modal>
                            <Text_Modal>Lista de platillos y mas del pedido</Text_Modal>
                            <Container_Button_Modal>
                                <Tooltip title="Cancelar" placement="top">
                                    <Button_Icon_Cancel_Modal onClick={Cancel}><MdCancel/></Button_Icon_Cancel_Modal>
                                </Tooltip>
                                <Tooltip title="Cerrar sesión" placement="top">
                                    <Button_Icon_Exit_Modal><ImExit/></Button_Icon_Exit_Modal>
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