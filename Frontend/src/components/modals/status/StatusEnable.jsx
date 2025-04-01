//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Servicios

// Rutas

// Contextos
import { modeContext } from "../../../contexts/VariablesProvider";
import { selectedRowContext,modalContext,optionModalContext,comprobationContext } from "../../../contexts/VariablesProvider";
import { nameContext,passwordContext } from "../../../contexts/SessionProvider";
import { usersContext } from "../../../contexts/UsersProvider";
// Hooks personalizados
import { useCloseModal,useEnableUser } from "../../../hooks/Modal";
//__________ICONOS__________
import { MdCancel } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { FaExclamationCircle } from 'react-icons/fa';
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_400_Light,Container_Button_Border_Light,Container_Form_400_Dark,Container_Button_Border_Dark } from "../../styled/Containers";
import { Text_Title_Fade_30_Light,Text_P_20_Light,Text_Title_Fade_30_Dark,Text_P_20_Dark, Text_Title_Fade_30__Light } from "../../styled/Text";
import { Button_Icon_Blue_50_Light,Button_Icon_Green_50_Light,Button_Icon_Red_50_Light,Button_Icon_Block_50_Light,Button_Icon_Blue_50_Dark,Button_Icon_Green_50_Dark,Button_Icon_Red_50_Dark,Button_Icon_Block_50_Dark } from "../../styled/Buttons";
import { Icon_Warning_Modal,Icon_Tooltip_Modal } from "../../styled/Icons";

// Componentes personalizados
import FormLoginComprobation from "../../forms/FormLoginComprobation";
//____________IMPORT/EXPORT____________

export default function StatusEnable(){
    // Constantes con el valor de los contextos
    const [isMode] = useContext(modeContext);
    const [isName,setIsName] = useContext(nameContext);
    const [isPassword,setIsPassword] = useContext(passwordContext);
    const [isModal,setIsModal] = useContext(modalContext);
    const [isOptionModal,setIsOptionModal] = useContext(optionModalContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(selectedRowContext);
    const [isUsers] = useContext(usersContext);
    const [isComprobation] = useContext(comprobationContext);
    // Constantes con el valor de useState
    const [user,setUser] = useState('');

    useEffect(() => {
        if(isSelectedRow.habilitado)document.title = "MEALSYNC_Administración_Estatus_Deshabilitar"
        if(!isSelectedRow.habilitado)document.title = "MEALSYNC_Administración_Estatus_Habilitar"
        if(isSelectedRow !== null){
            const isUser = isUsers.find(u => u.idusuario === isSelectedRow.idusuario);
            if(isUser){
                setUser(isUser.usuario);
            }
        }
    },[]);

    const closeModal = useCloseModal();
    const enableUser = useEnableUser();

    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <Container_Modal id="Status-Enable">
                    {isMode ? (
                        <>
                            <Container_Form_400_Light>
                                <Text_Title_Fade_30_Light>{isSelectedRow.habilitado ? 'DESHABILITAR USUARIO' : 'HABILITAR USUARIO'}</Text_Title_Fade_30_Light>
                                <FormLoginComprobation/>
                                {isSelectedRow.habilitado ? <Text_P_20_Light>Se deshabilitará a {user} </Text_P_20_Light> : <Text_P_20_Light>Se habilitará a {user}...</Text_P_20_Light>}
                                <Container_Button_Border_Light>
                                    <Tooltip id="Description" title="Cancelar" placement="top">
                                        <Button_Icon_Blue_50_Light onClick={() => closeModal()}><MdCancel/></Button_Icon_Blue_50_Light>
                                    </Tooltip>
                                    {isSelectedRow.habilitado ? (
                                        isComprobation ? (
                                            <>
                                                <Tooltip id="Description" title="Deshabilitar" placement="top">
                                                    <Button_Icon_Red_50_Light onClick={() => useEnableUser()}><FaLock/></Button_Icon_Red_50_Light>
                                                </Tooltip>
                                            </>
                                        ):(
                                            <>
                                                <Tooltip title="" placement="top">
                                                    <Button_Icon_Block_50_Light><FaLock/></Button_Icon_Block_50_Light>
                                                </Tooltip>
                                            </>
                                        )
                                    ):(
                                        isComprobation ? (
                                            <>
                                                <Tooltip id="Description" title="Habilitar" placement="top">
                                                    <Button_Icon_Green_50_Light onClick={() => useEnableUser()}><FaLockOpen/></Button_Icon_Green_50_Light>
                                                </Tooltip>
                                            </>
                                        ):(
                                            <>
                                                <Tooltip title="" placement="top">
                                                    <Button_Icon_Block_50_Light><FaLockOpen/></Button_Icon_Block_50_Light>
                                                </Tooltip>
                                            </>
                                        )
                                    )}
                                </Container_Button_Border_Light>
                            </Container_Form_400_Light>
                        </>
                    ):(
                        <>
                            <Container_Form_400_Dark>
                                <Text_Title_Fade_30_Dark>{isSelectedRow.habilitado ? 'DESHABILITAR USUARIO' : 'HABILITAR USUARIO'}</Text_Title_Fade_30_Dark>
                                <FormLoginComprobation/>
                                {isSelectedRow.habilitado ? <Text_P_20_Dark>Se deshabilitará a {user} </Text_P_20_Dark> : <Text_P_20_Dark>Se habilitará a {user}...</Text_P_20_Dark>}
                                <Container_Button_Border_Dark>
                                    <Tooltip id="Description" title="Cancelar" placement="top">
                                        <Button_Icon_Blue_50_Dark onClick={() => closeModal()}><MdCancel/></Button_Icon_Blue_50_Dark>
                                    </Tooltip>
                                    {isSelectedRow.habilitado ? (
                                        isComprobation ? (
                                            <>
                                                <Tooltip id="Description" title="Deshabilitar" placement="top">
                                                    <Button_Icon_Red_50_Dark onClick={() => useEnableUser()}><FaLock/></Button_Icon_Red_50_Dark>
                                                </Tooltip>
                                            </>
                                        ):(
                                            <>
                                                <Tooltip title="" placement="top">
                                                    <Button_Icon_Block_50_Dark><FaLock/></Button_Icon_Block_50_Dark>
                                                </Tooltip>
                                            </>
                                        )
                                    ):(
                                        isComprobation ? (
                                            <>
                                                <Tooltip id="Description" title="Habilitar" placement="top">
                                                    <Button_Icon_Green_50_Dark  onClick={() => useEnableUser()}><FaLockOpen/></Button_Icon_Green_50_Dark>
                                                </Tooltip>
                                            </>
                                        ):(
                                            <>
                                                <Tooltip title="" placement="top">
                                                    <Button_Icon_Block_50_Dark><FaLockOpen/></Button_Icon_Block_50_Dark>
                                                </Tooltip>
                                            </>
                                        )
                                    )}
                                </Container_Button_Border_Dark>
                            </Container_Form_400_Dark>
                        </>
                    )}
                </Container_Modal>
            ):(
                <></>
            )}
        </>
    );
}