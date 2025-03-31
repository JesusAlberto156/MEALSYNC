import { useContext,useEffect } from "react";
import { Tooltip } from "@mui/material";

import { selectedRowContext,modalContext,optionModalContext } from "../../../contexts/VariablesProvider";

import { MdCancel } from "react-icons/md";
import { MdEdit } from "react-icons/md";

import { Container_Modal } from "../../styled/Containers";
import { GlobalStyle } from "../../styled/Text";

export default function PermissionsEdit(){

    const [isModal,setIsModal] = useContext(modalContext);
    const [isOptionModal,setIsOptionModal] = useContext(optionModalContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(selectedRowContext);

    const Cancel = async () => {
        setIsModal(false);
        setIsOptionModal('');
        setIsSelectedRow(null);
    }

    useEffect(() => {
        document.title = "MEALSYNC_Administración_Permisos_Editar"
    },[]);
    
    return(
        <>  
            <GlobalStyle/>
            <Container_Modal id="Permisos-Editar">
                
            </Container_Modal>
        </>
    );
}