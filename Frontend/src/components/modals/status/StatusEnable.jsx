//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
// Componentes de React externos

// Servicios

// Rutas

// Contextos
import { modeContext } from "../../../contexts/VariablesProvider";
import { selectedRowContext,modalContext,comprobationContext } from "../../../contexts/VariablesProvider";
import { usersContext } from "../../../contexts/UsersProvider";
import { statusModalContext } from "../../../contexts/RefsProvider";
// Hooks personalizados
import { useCloseModal,useEnableUser } from "../../../hooks/Modal";
//__________ICONOS__________
import { MdCancel } from "react-icons/md";
import { FaUnlock } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { FaExclamationCircle } from 'react-icons/fa';
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_400_Light,Container_Button_Border_Light,Container_Form_400_Dark,Container_Button_Border_Dark } from "../../styled/Containers";
import { Text_Title_Fade_30_Light,Text_P_20_Light,Text_Title_Fade_30_Dark,Text_P_20_Dark } from "../../styled/Text";
import { Button_Icon_Blue_50_Light,Button_Icon_Green_50_Light,Button_Icon_Red_50_Light,Button_Icon_Block_50_Light,Button_Icon_Blue_50_Dark,Button_Icon_Green_50_Dark,Button_Icon_Red_50_Dark,Button_Icon_Block_50_Dark } from "../../styled/Buttons";
import { Icon_Warning_Modal,Icon_Tooltip_Modal } from "../../styled/Icons";

// Componentes personalizados
import FormLoginComprobation from "../../forms/FormLoginComprobation";
//____________IMPORT/EXPORT____________

export default function StatusEnable(){
    // Constantes con el valor de los contextos
    const [isMode] = useContext(modeContext);
    const [isModal] = useContext(modalContext);
    const [isSelectedRow] = useContext(selectedRowContext);
    const [isUsers] = useContext(usersContext);
    const [isComprobation] = useContext(comprobationContext);
    const {modal,form} = useContext(statusModalContext);
    // Constantes con el valor de useState
    const [user,setUser] = useState('');
    // useEffect con el titulo del modal
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
    // Constantes con la funcionalidad de los hooks
    const closeModal = useCloseModal();
    const enableUser = useEnableUser();
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <Container_Modal ref={modal}>
                    {isMode ? (
                        <>
                            <Container_Form_400_Light ref={form}>
                                <Text_Title_Fade_30_Light>{isSelectedRow.habilitado ? 'DESHABILITAR USUARIO' : 'HABILITAR USUARIO'}</Text_Title_Fade_30_Light>
                                <FormLoginComprobation/>
                                {isSelectedRow.habilitado ? <Text_P_20_Light>Se deshabilitará a {user} </Text_P_20_Light> : <Text_P_20_Light>Se habilitará a {user}...</Text_P_20_Light>}
                                <Container_Button_Border_Light>
                                        <Button_Icon_Blue_50_Light onClick={(e) => {
                                            e.stopPropagation();
                                            closeModal();
                                        }}>
                                                <MdCancel/>
                                        </Button_Icon_Blue_50_Light>
                                    {isSelectedRow.habilitado ? (
                                        isComprobation ? (
                                            <>
                                                <Button_Icon_Red_50_Light onClick={(e) => {
                                                    e.stopPropagation();
                                                    enableUser();
                                                }}>
                                                    <FaLock/>
                                                </Button_Icon_Red_50_Light>
                                            </>
                                        ):(
                                            <>
                                                <Button_Icon_Block_50_Light><FaUnlock/></Button_Icon_Block_50_Light>
                                            </>
                                        )
                                    ):(
                                        isComprobation ? (
                                            <>
                                                <Button_Icon_Green_50_Light onClick={(e) => {
                                                    e.stopPropagation();
                                                    enableUser();
                                                }}>
                                                    <FaLockOpen/>
                                                </Button_Icon_Green_50_Light>
                                            </>
                                        ):(
                                            <>
                                                <Button_Icon_Block_50_Light><FaUnlock/></Button_Icon_Block_50_Light>
                                            </>
                                        )
                                    )}
                                </Container_Button_Border_Light>
                            </Container_Form_400_Light>
                        </>
                    ):(
                        <>
                            <Container_Form_400_Dark ref={form}>
                                <Text_Title_Fade_30_Dark>{isSelectedRow.habilitado ? 'DESHABILITAR USUARIO' : 'HABILITAR USUARIO'}</Text_Title_Fade_30_Dark>
                                <FormLoginComprobation/>
                                {isSelectedRow.habilitado ? <Text_P_20_Dark>Se deshabilitará a {user} </Text_P_20_Dark> : <Text_P_20_Dark>Se habilitará a {user}...</Text_P_20_Dark>}
                                <Container_Button_Border_Dark>
                                    <Button_Icon_Blue_50_Dark onClick={(e) => {
                                            e.stopPropagation();
                                            closeModal();
                                    }}>
                                        <MdCancel/>
                                    </Button_Icon_Blue_50_Dark>
                                    {isSelectedRow.habilitado ? (
                                        isComprobation ? (
                                            <>
                                                <Button_Icon_Red_50_Dark onClick={(e) => {
                                                    e.stopPropagation();
                                                    enableUser();
                                                }}>
                                                    <FaLock/>
                                                </Button_Icon_Red_50_Dark>
                                            </>
                                        ):(
                                            <>
                                                <Button_Icon_Block_50_Dark><FaUnlock/></Button_Icon_Block_50_Dark>
                                            </>
                                        )
                                    ):(
                                        isComprobation ? (
                                            <>
                                                <Button_Icon_Green_50_Dark  onClick={(e) => {
                                                    e.stopPropagation();
                                                    enableUser();
                                                }}>
                                                    <FaLockOpen/>
                                                </Button_Icon_Green_50_Dark>
                                            </>
                                        ):(
                                            <>
                                                <Button_Icon_Block_50_Dark><FaUnlock/></Button_Icon_Block_50_Dark>
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