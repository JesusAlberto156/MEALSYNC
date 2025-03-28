import { useContext,useEffect } from "react";
import { Tooltip } from "@mui/material";

import { modalContext,optionModalContext } from "../../../contexts/VariablesProvider";

import { MdCancel } from "react-icons/md";
import { MdAddModerator } from "react-icons/md";

import { Background_Modal,Background_Modal_Componets } from "../../styled/Backgrounds";
import { Container_Modal,Container_Button_Modal } from "../../styled/Containers";
import { GlobalStyle,Title_Fade_Modal } from "../../styled/Text";
import { Button_Icon_Cancel_Modal,Button_Icon_Green_Modal } from "../../styled/Buttons";

export default function PermissionsAdd(){

    const [isModal,setIsModal] = useContext(modalContext);
    const [isOptionModal,setIsOptionModal] = useContext(optionModalContext);

    const Cancel = async () => {
        setIsModal(false);
        setIsOptionModal('');
    }

    useEffect(() => {
        document.title = "MEALSYNC_Administración_Permisos_Agregar"
    },[]);
    
    return(
        <>  
            <GlobalStyle/>
            <Container_Modal>
                {isModal ? (
                    <Background_Modal>
                        <Background_Modal_Componets>
                            <Title_Fade_Modal>AGREGAR PERMISOS</Title_Fade_Modal>
                            
                            <Container_Button_Modal>
                                <Tooltip title="Cancelar" placement="top">
                                    <Button_Icon_Cancel_Modal onClick={Cancel}><MdCancel/></Button_Icon_Cancel_Modal>
                                </Tooltip>
                                <Tooltip title="Agregar" placement="top">
                                    <Button_Icon_Green_Modal><MdAddModerator/></Button_Icon_Green_Modal>
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