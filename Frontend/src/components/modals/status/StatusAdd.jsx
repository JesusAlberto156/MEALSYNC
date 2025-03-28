import { useContext,useEffect } from "react";
import Select from 'react-select';
import { Tooltip } from "@mui/material";

import { modalContext,optionModalContext } from "../../../contexts/VariablesProvider";
import { radioContext,selectContext } from "../../../contexts/VariablesProvider";

import { useFilteredRecordsHasStatus,useHandleSelectChange,useHandleRadioChange } from "../../../hooks/Form";
import { useAdd } from "../../../hooks/Status";

import { MdCancel } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

import { Background_Modal,Background_Modal_Componets } from "../../styled/Backgrounds";
import { Container_Modal,Container_Button_Modal,Container_Checkbox_Modal,Container_Select_Modal } from "../../styled/Containers";
import { Input_Radio_Modal } from "../../styled/Inputs";
import { Label_Checkbox_Modal } from "../../styled/Labels";
import { GlobalStyle,Title_Fade_Modal,Text_Modal } from "../../styled/Text";
import { Button_Icon_Cancel_Modal,Button_Icon_Green_Modal } from "../../styled/Buttons";

export default function StatusAdd(){

    const [isModal,setIsModal] = useContext(modalContext);
    const [isOptionModal,setIsOptionModal] = useContext(optionModalContext);
    const [isSelect,setIsSelect] = useContext(selectContext);
    const [isRadio,setIsRadio] = useContext(radioContext);

    const filteredRecordsHasStatus = useFilteredRecordsHasStatus();
    const handleSelectChange = useHandleSelectChange();
    const handleRadioChange = useHandleRadioChange();

    const Cancel = async () => {
        setIsModal(false);
        setIsOptionModal('');
        setIsSelect([]);
        setIsRadio('');
    }

    useEffect(() => {
        document.title = "MEALSYNC_Administración_Estatus_Agregar"
    },[]);

    const add = useAdd();
    
    return(
        <>  
            <GlobalStyle/>
            <Container_Modal>
                {isModal ? (
                    <Background_Modal>
                        <Background_Modal_Componets>
                            <Title_Fade_Modal>AGREGAR ESTATUS</Title_Fade_Modal>
                            <Text_Modal>Elegir a un usuario...</Text_Modal>
                            <Container_Select_Modal>
                                <Select
                                    options={filteredRecordsHasStatus.map((user) => ({
                                        value: user.idusuario,
                                        label: user.usuario
                                    }))}
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            width: '350px',
                                            padding: '8px',
                                            border: '2px solid white',
                                            cursor: 'pointer',
                                            borderRadius: '15px',
                                            fontSize: '18px',
                                            '@media (max-width: 768px)':{
                                                width: '300px',
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
                                    value={isSelect}
                                    onChange={handleSelectChange}
                                />
                            </Container_Select_Modal>
                            <Text_Modal>Elegir su estado...</Text_Modal>
                            <Container_Checkbox_Modal>
                                {['Habilitado','Deshabilitado'].map((item,index) => (
                                    <Label_Checkbox_Modal key={index}>
                                        <Input_Radio_Modal
                                            type="radio"
                                            name="group"
                                            value={item}
                                            checked={isRadio === item}
                                            onChange={handleRadioChange}
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
                                    <Button_Icon_Green_Modal onClick={() => add()}><IoMdAddCircle/></Button_Icon_Green_Modal>
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