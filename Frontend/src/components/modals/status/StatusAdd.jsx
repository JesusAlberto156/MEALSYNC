import { useContext,useEffect } from "react";
import Select from 'react-select';
import { Tooltip } from "@mui/material";

import { modalContext,optionModalContext } from "../../../contexts/VariablesProvider";

import { useFilteredRecordsHasStatus,useHandleSelectChange } from "../../../hooks/Form";

import { MdCancel } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

import { Background_Modal,Background_Modal_Componets } from "../../styled/Backgrounds";
import { Container_Modal,Container_Button_Modal,Container_Checkbox_Modal,Container_Select_Modal } from "../../styled/Containers";
import { Input_Radio_Modal } from "../../styled/Inputs";
import { Label_Checkbox_Modal } from "../../styled/Labels";
import { Title_Fade_Modal,Text_Modal } from "../../styled/Text";
import { Button_Icon_Cancel_Modal,Button_Icon_Green_Modal } from "../../styled/Buttons";

export default function StatusAdd(){

    const [isModal,setIsModal] = useContext(modalContext);
    const [isOptionModal,setIsOptionModal] = useContext(optionModalContext);

    const filteredRecordsHasStatus = useFilteredRecordsHasStatus();
    const handleSelectChange = useHandleSelectChange();

    const Cancel = async () => {
        setIsModal(false);
        setIsOptionModal('');
    }

    useEffect(() => {
        document.title = "MEALSYNC_Administración_Estatus_Agregar"
    },[]);

    
    return(
        <>
            <Container_Modal>
                {isModal ? (
                    <Background_Modal>
                        <Background_Modal_Componets>
                            <Title_Fade_Modal>Agregar estatus</Title_Fade_Modal>
                            <Text_Modal>Debe escoger un usuario...</Text_Modal>
                            <Container_Select_Modal>
                                <Select
                                    options={filteredRecordsHasStatus.map((user) => ({
                                        value: user.idusuario,
                                        label: user.usuario
                                    }))}
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            width: '250px',
                                            padding: '8px',
                                            border: '2px solid white',
                                            cursor: 'pointer',
                                            borderRadius: '15px',
                                            fontSize: '18px',
                                            '@media (max-width: 768px)':{
                                                width: '225px',
                                                padding: '6px',
                                                fontSize: '16px',
                                            },
                                            '@media (max-width: 480px)':{
                                                width: '200px',
                                                padding: '4px',
                                                fontSize: '14px',
                                            },
                                        }),
                                        menu: (provided) => ({
                                            ...provided,
                                            overflow: 'hidden',
                                            borderRadius:'15px',
                                        }),
                                        menuList: (provided) => ({
                                            ...provided,
                                            maxHeight:150,
                                            overflowY:'auto',
                                            scrollbarWidth: 'none',
                                            '&::-webkit-scrollbar': {
                                                display:'none',
                                            },
                                            '@media (max-width: 768px)':{
                                                maxHeight:125,
                                            },
                                            '@media (max-width: 480px)':{
                                                maxHeight:100,
                                            },
                                        })
                                    }}
                                    placeholder='Seleccione uno...'
                                    onChange={handleSelectChange}
                                />
                            </Container_Select_Modal>
                            <Text_Modal>Escoja una opción...</Text_Modal>
                            <Container_Checkbox_Modal>
                                {['Habilitado','Deshabilitado'].map((item,index) => (
                                    <Label_Checkbox_Modal key={index}>
                                        <Input_Radio_Modal
                                            type="radio"
                                            name="group"
                                            value={item}
                                        />
                                        {item}
                                    </Label_Checkbox_Modal>
                                ))};
                            </Container_Checkbox_Modal>
                            <Container_Button_Modal>
                                <Tooltip title="Cancelar" placement="top">
                                    <Button_Icon_Cancel_Modal onClick={Cancel}><MdCancel/></Button_Icon_Cancel_Modal>
                                </Tooltip>
                                <Tooltip title="Agregar" placement="top">
                                    <Button_Icon_Green_Modal><IoMdAddCircle/></Button_Icon_Green_Modal>
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