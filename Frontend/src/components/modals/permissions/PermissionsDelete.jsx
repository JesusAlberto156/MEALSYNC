import { useContext,useEffect,useState } from "react";
import { Tooltip } from "@mui/material";

import { selectedRowContext,modalContext,optionModalContext } from "../../../contexts/VariablesProvider";
import { usersContext } from "../../../contexts/UsersProvider";

import { MdCancel } from "react-icons/md";
import { MdRemoveModerator } from "react-icons/md";
import { FaExclamationCircle } from 'react-icons/fa';

import { Background_Modal,Background_Modal_Componets } from "../../styled/Backgrounds";
import { Container_Modal,Container_Button_Modal } from "../../styled/Containers";
import { GlobalStyle,Title_Fade_Modal } from "../../styled/Text";
import { Button_Icon_Cancel_Modal,Button_Icon_Exit_Modal } from "../../styled/Buttons";
import { Icon_Warning_Modal,Icon_Tooltip_Modal } from "../../styled/Icons";

export default function PermissionsDelete(){

    const [isModal,setIsModal] = useContext(modalContext);
    const [isOptionModal,setIsOptionModal] = useContext(optionModalContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(selectedRowContext);
    const [isUsers] = useContext(usersContext);
    
    const [user,setUser] = useState('');

    const Cancel = async () => {
        setIsModal(false);
        setIsOptionModal('');
        setIsSelectedRow(null);
    }

    useEffect(() => {
        document.title = "MEALSYNC_Administración_Permisos_Eliminar"
        if(isSelectedRow !== null){
            const isUser = isUsers.find(u => u.idusuario === isSelectedRow.idusuario);
            if(isUser){
                setUser(isUser.usuario);
            }
        }
    },[]);
    
    return(
        <>  
            <GlobalStyle/>
            <Container_Modal id="Permisos-Eliminar">
                {isModal && isSelectedRow ? (
                    <Background_Modal>
                        <Background_Modal_Componets>
                            <Title_Fade_Modal>ELIMINAR PERMISOS</Title_Fade_Modal>
                            
                            <Container_Button_Modal>
                                <Tooltip title="Cancelar" placement="top">
                                    <Button_Icon_Cancel_Modal id="Boton-Permisos-Cancelar" onClick={Cancel}><MdCancel/></Button_Icon_Cancel_Modal>
                                </Tooltip>
                                <Tooltip title="Eliminar" placement="top">
                                    <Button_Icon_Exit_Modal id="Boton-Permisos-Eliminar"><MdRemoveModerator/></Button_Icon_Exit_Modal>
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