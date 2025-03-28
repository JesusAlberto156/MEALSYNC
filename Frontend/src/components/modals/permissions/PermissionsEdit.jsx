import { useContext,useEffect } from "react";
import { Tooltip } from "@mui/material";

import { selectedRowContext,modalContext,optionModalContext } from "../../../contexts/VariablesProvider";

import { MdCancel } from "react-icons/md";
import { MdEdit } from "react-icons/md";

import { Background_Modal,Background_Modal_Componets } from "../../styled/Backgrounds";
import { Container_Modal,Container_Button_Modal,Container_Checkbox_Modal } from "../../styled/Containers";
import { GlobalStyle,Text_Modal,Title_Fade_Modal } from "../../styled/Text";
import { Button_Icon_Cancel_Modal,Button_Icon_Exit_Modal } from "../../styled/Buttons";
import { Input_Checkbox_Modal } from "../../styled/Inputs";
import { Label_Checkbox_Modal } from "../../styled/Labels";

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
                {isModal && isSelectedRow ? (
                    <Background_Modal>
                        <Background_Modal_Componets>
                            <Title_Fade_Modal>EDITAR PERMISOS</Title_Fade_Modal>
                            
                            <Text_Modal>Área administrativa...</Text_Modal>
                            <Container_Checkbox_Modal>
                                <Label_Checkbox_Modal>
                                    <Input_Checkbox_Modal
                                        type="checkbox"
                                        checked={isSelectedRow.administrador}
                                    />
                                    Administrador
                                </Label_Checkbox_Modal>
                                <Label_Checkbox_Modal>
                                    <Input_Checkbox_Modal
                                        type="checkbox"
                                        checked={isSelectedRow.chef}
                                    />
                                    Chef
                                </Label_Checkbox_Modal>
                                <Label_Checkbox_Modal>
                                    <Input_Checkbox_Modal
                                        type="checkbox"
                                        checked={isSelectedRow.almacen}
                                    />
                                    Almacén
                                </Label_Checkbox_Modal>
                            </Container_Checkbox_Modal>
                            <Text_Modal>Área de cocina...</Text_Modal>
                            <Container_Checkbox_Modal>
                                <Label_Checkbox_Modal>
                                    <Input_Checkbox_Modal
                                        type="checkbox"
                                        checked={isSelectedRow.cocinero}
                                    />
                                    Cocinero
                                </Label_Checkbox_Modal>
                                <Label_Checkbox_Modal>
                                    <Input_Checkbox_Modal
                                        type="checkbox"
                                        checked={isSelectedRow.nutriologo}
                                    />
                                    Nutriólogo
                                </Label_Checkbox_Modal>
                                <Label_Checkbox_Modal>
                                    <Input_Checkbox_Modal
                                        type="checkbox"
                                        checked={isSelectedRow.medico}
                                    />
                                    Médico
                                </Label_Checkbox_Modal>
                            </Container_Checkbox_Modal>
                            <Container_Button_Modal>
                                <Tooltip title="Cancelar" placement="top">
                                    <Button_Icon_Exit_Modal id="Boton-Permisos-Cancelar" onClick={Cancel}><MdCancel/></Button_Icon_Exit_Modal>
                                </Tooltip>
                                <Tooltip title="Editar" placement="top">
                                    <Button_Icon_Cancel_Modal id="Boton-Permisos-Editar"><MdEdit/></Button_Icon_Cancel_Modal>
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