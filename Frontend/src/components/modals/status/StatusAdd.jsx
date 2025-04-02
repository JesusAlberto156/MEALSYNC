//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
// Componentes de React externos
import { Tooltip } from "@mui/material";
import Select from "react-select";
// Servicios

// Contextos
import { modeContext,modalContext,selectContext,radioContext,blockContext } from "../../../contexts/VariablesProvider";
// Hooks personalizados
import { useCloseModal,useAddStatus } from "../../../hooks/Modal";
import { useFilteredRecordsHasStatus,useHandleRadioChange,useHandleSelectChange } from "../../../hooks/Form";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { IoMdAddCircle } from "react-icons/io";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_400_Light,Container_Button_Border_Light,Container_Select_Light,Container_Check_Light,Container_Form_400_Dark,Container_Button_Border_Dark,Container_Select_Dark,Container_Check_Dark } from "../../styled/Containers";
import { Text_Title_Fade_30_Light,Text_P_20_Light,Text_Title_Fade_30_Dark,Text_P_20_Dark } from "../../styled/Text";
import { Button_Icon_Blue_50_Light,Button_Icon_Green_50_Light,Button_Icon_Block_50_Light,Button_Icon_Blue_50_Dark,Button_Icon_Green_50_Dark,Button_Icon_Block_50_Dark } from "../../styled/Buttons";
import { Label_Check_18_Light,Label_Check_18_Dark } from "../../styled/Labels";
import { Input_Radio_16_Light,Input_Radio_16_Dark } from "../../styled/Inputs";
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Modal para agregar estatus al usuario
export default function StatusAdd(){
    // Constantes con el valor de los contextos 
    const [isMode] = useContext(modeContext);
    const [isModal] = useContext(modalContext);
    const [isSelect] = useContext(selectContext);
    const [isRadio] = useContext(radioContext);
    const [isBlock] = useContext(blockContext);
    // useEffect con el titulo del modal
    useEffect(() => {
        document.title = "MEALSYNC_Administración_Estatus_Agregar"
    },[]);
    // Constantes con la funcionalidad de los hooks
    const closeModal = useCloseModal();
    const filteredRecordsHasStatus = useFilteredRecordsHasStatus();
    const handleSelectChange = useHandleSelectChange();
    const handleRadioChange = useHandleRadioChange();
    const addStatus = useAddStatus();
    // Estructura del componente
    return(
        <>
            <Container_Modal>
                {isModal ? (
                    isMode ? (
                        <>
                            <Container_Form_400_Light>
                                    <Text_Title_Fade_30_Light>AGREGAR STATUS</Text_Title_Fade_30_Light>
                                    <Text_P_20_Light>Selecciona un usuario...</Text_P_20_Light>
                                    <Container_Select_Light>
                                        <Select
                                            options={filteredRecordsHasStatus.map((user) => ({
                                                value: user.idusuario,
                                                label: user.usuario
                                            }))}
                                            styles={{
                                                control: (provided) => ({
                                                    ...provided,
                                                    width: '300px',
                                                    padding: '6px',
                                                    border: '2px solid black',
                                                    cursor: 'pointer',
                                                    borderRadius: '15px',
                                                    fontFamily: 'Prompt, sans-serif',
                                                    fontWeight: 300,
                                                    fontStyle: 'normal',
                                                    fontSize: '18px',
                                                    '@media (max-width: 768px)':{
                                                        width: '250px',
                                                        padding: '4px',
                                                        fontSize: '16px',
                                                    },
                                                    '@media (max-width: 480px)':{
                                                        width: '250px',
                                                        padding: '2px',
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
                                                    fontFamily: 'Prompt, sans-serif',
                                                    fontWeight: 300,
                                                    fontStyle: 'normal',
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
                                    </Container_Select_Light>
                                    <Text_P_20_Light>Selecciona un estado...</Text_P_20_Light>
                                    <Container_Check_Light>
                                        {['Habilitado','Deshabilitado'].map((item,index) => (
                                            <Label_Check_18_Light key={index}>
                                                <Input_Radio_16_Light
                                                    type="radio"
                                                    name="group"
                                                    value={item}
                                                    checked={isRadio === item}
                                                    onChange={handleRadioChange}
                                                />
                                                {item}
                                            </Label_Check_18_Light>
                                        ))};
                                    </Container_Check_Light>
                                    <Text_P_20_Light>Agregar estatus...</Text_P_20_Light>
                                    <Container_Button_Border_Light>
                                        <Tooltip title="Cancelar" placement="top">
                                            <Button_Icon_Blue_50_Light onClick={() => closeModal()}><MdCancel/></Button_Icon_Blue_50_Light>
                                        </Tooltip>
                                        {isBlock ? (
                                            <>
                                                <Button_Icon_Block_50_Light><IoMdAddCircle/></Button_Icon_Block_50_Light>   
                                            </>
                                        ):(
                                            <>
                                                <Tooltip title="Agregar" placement="top">
                                                    <Button_Icon_Green_50_Light onClick={() => addStatus()}><IoMdAddCircle/></Button_Icon_Green_50_Light>
                                                </Tooltip>
                                            </>
                                        )}
                                    </Container_Button_Border_Light>
                            </Container_Form_400_Light>
                        </>
                    ):(
                        <>
                            <Container_Form_400_Dark>
                                    <Text_Title_Fade_30_Dark>AGREGAR STATUS</Text_Title_Fade_30_Dark>
                                    <Text_P_20_Dark>Selecciona un usuario...</Text_P_20_Dark>
                                    <Container_Select_Dark>
                                        <Select
                                            options={filteredRecordsHasStatus.map((user) => ({
                                                value: user.idusuario,
                                                label: user.usuario
                                            }))}
                                            styles={{
                                                control: (provided) => ({
                                                    ...provided,
                                                    width: '300px',
                                                    padding: '6px',
                                                    border: '2px solid black',
                                                    cursor: 'pointer',
                                                    borderRadius: '15px',
                                                    fontFamily: 'Prompt, sans-serif',
                                                    fontWeight: 300,
                                                    fontStyle: 'normal',
                                                    fontSize: '18px',
                                                    '@media (max-width: 768px)':{
                                                        width: '250px',
                                                        padding: '4px',
                                                        fontSize: '16px',
                                                    },
                                                    '@media (max-width: 480px)':{
                                                        width: '250px',
                                                        padding: '2px',
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
                                                    fontFamily: 'Prompt, sans-serif',
                                                    fontWeight: 300,
                                                    fontStyle: 'normal',
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
                                    </Container_Select_Dark>
                                    <Text_P_20_Dark>Selecciona un estado...</Text_P_20_Dark>
                                    <Container_Check_Dark>
                                        {['Habilitado','Deshabilitado'].map((item,index) => (
                                            <Label_Check_18_Dark key={index}>
                                                <Input_Radio_16_Dark
                                                    type="radio"
                                                    name="group"
                                                    value={item}
                                                    checked={isRadio === item}
                                                    onChange={handleRadioChange}
                                                />
                                                {item}
                                            </Label_Check_18_Dark>
                                        ))};
                                    </Container_Check_Dark>
                                    <Text_P_20_Dark>Agregar estatus...</Text_P_20_Dark>
                                    <Container_Button_Border_Dark>
                                        <Tooltip title="Cancelar" placement="top">
                                            <Button_Icon_Blue_50_Dark onClick={() => closeModal()}><MdCancel/></Button_Icon_Blue_50_Dark>
                                        </Tooltip>
                                        {isBlock ? (
                                            <>
                                                <Button_Icon_Block_50_Dark><IoMdAddCircle/></Button_Icon_Block_50_Dark>
                                            </>
                                        ):(
                                            <>
                                                <Tooltip title="Agregar" placement="top">
                                                    <Button_Icon_Green_50_Dark onClick={() => addStatus()}><IoMdAddCircle/></Button_Icon_Green_50_Dark>
                                                </Tooltip>  
                                            </>
                                        )}
                                    </Container_Button_Border_Dark>
                            </Container_Form_400_Dark>
                        </>
                    )
                ):(
                    <></>
                )}
            </Container_Modal>
        </>
    );
}