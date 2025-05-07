//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,ModalContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { SelectedRowContext,ActionBlockContext,VerificationBlockContext } from "../../../../contexts/VariablesProvider";
import { UsersContext,StatusEnableContext } from "../../../../contexts/UsersProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { RefSuppliersContext } from "../../../../contexts/RefsProvider";
import { TextFieldsContext } from "../../../../contexts/FormsProvider";
// Hooks personalizados
import { HandleStatusEnable } from "../../../../hooks/Form";
import { HandleModalView } from "../../../../hooks/Views";
//__________ICONOS__________
import { MdCancel } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_400,Container_Row_90_Left,Container_Row_90_Center } from "../../../styled/Containers";
import { Text_Title_30_Center,Text_A_16_Left } from "../../../styled/Text";
import { Button_Icon_Blue_160,Button_Icon_Green_160,Button_Icon_Red_160 } from "../../../styled/Buttons";
import { Icon_White_22 } from "../../../styled/Icons";
import { Alert_Verification } from "../../../styled/Alerts";
// Componentes personalizados
import Form_Verification from "../../../forms/Verification";
import Error_Enable from "../../errors/Enable";
//____________IMPORT/EXPORT____________

export default function Suppliers_Details(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isUsers] = useContext(UsersContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    const [socket] = useContext(SocketContext);
    const [isStatusEnable,setIsStatusEnable] = useContext(StatusEnableContext);
    const {Modal,Form,Button_Edit_S,Button_Delete_S,Button_Details_S} = useContext(RefSuppliersContext);
    const [isTextFields,setIsTextFields] = useContext(TextFieldsContext);
    // Constantes con el valor de useState
    const [user,setUser] = useState('');
    // Estados iniciales de los contextos
    const initialTextFields = {
        name: '',
        shortName: '',
        user: '',
        password: '',
        userTypes: 0,
    };
    // useEffect con el usuario
    useEffect(() => {
        if(isSelectedRow !== null){
            const isUser = isUsers.find(u => u.idusuario === isSelectedRow.idusuario);
            if(isUser){
                setUser(isUser.usuario);
            }
        }
    },[]);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
    },[]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <Container_Modal ref={Modal}>
                    <Container_Form_400 ref={Form} ThemeMode={themeMode} className={currentMView === 'Suppliers-Details' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Text_Title_30_Center ThemeMode={themeMode}>DETALLES DEL PROVEEDOR</Text_Title_30_Center>
                        <Container_Row_90_Left>
                            <Text_A_16_Left ThemeMode={themeMode}>Datos del proveedor...</Text_A_16_Left>
                        </Container_Row_90_Left>
                        
                    </Container_Form_400>
                </Container_Modal>
            ):(
                <>
                    
                </>
            )}
        </>
    );
}