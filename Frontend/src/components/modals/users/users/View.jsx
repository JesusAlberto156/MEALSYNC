//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,ModalContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { ActionBlockContext,VerificationBlockContext } from "../../../../contexts/VariablesProvider";
// Hooks personalizados
import { HandleModalView } from "../../../../hooks/Views";
import { HandleViewPassword } from '../../../../hooks/Form'; 
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { FaEye } from "react-icons/fa";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_450,Container_Row_100_Center,Container_Row_95_Center } from "../../../styled/Containers";
import { Button_Icon_Blue_180,Button_Icon_Green_180 } from "../../../styled/Buttons";
import { Text_Title_30_Center } from "../../../styled/Text";
import { Icon_White_22 } from "../../../styled/Icons";
// Componentes perzonalizados
import Form_Verification from "../../../forms/Verification";
//____________IMPORT/EXPORT____________

// Modal para ver la contraseña de usuarios
export default function User_View(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isActionBlock] = useContext(ActionBlockContext);
    const [isModal] = useContext(ModalContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isVerificationBlock] = useContext(VerificationBlockContext);
    // Constantes con la funcionalidad de los hooks
    const handleModalView = HandleModalView();
    const handleViewPassword = HandleViewPassword();
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <>
                    <Container_Modal>
                        <Container_Form_450 ThemeMode={themeMode} className={currentMView === 'Usuario-Ver-Contraseña' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Row_100_Center>
                                <Text_Title_30_Center ThemeMode={themeMode}>VER CONTRASEÑAS</Text_Title_30_Center>
                            </Container_Row_100_Center>
                            <Form_Verification/>
                            <Container_Row_95_Center>
                                <Tooltip title='Cancelar' placement="top">
                                    <span>
                                        <Button_Icon_Blue_180 ThemeMode={themeMode} className='pulsate-buttom'
                                            onClick={() => {
                                                handleModalView('');
                                            }}
                                            disabled={!isActionBlock && isVerificationBlock}
                                        >
                                            <Icon_White_22><MdCancel/></Icon_White_22>
                                        </Button_Icon_Blue_180>
                                    </span>
                                </Tooltip>
                                <Tooltip title='Ver' placement="top">
                                    <span>
                                        <Button_Icon_Green_180 ThemeMode={themeMode} className={isActionBlock ? 'roll-in-button-left' : 'roll-out-button-left'}
                                            onClick={() => {
                                                handleViewPassword();
                                            }}
                                            disabled={!isActionBlock}
                                        >
                                            <Icon_White_22><FaEye/></Icon_White_22>
                                        </Button_Icon_Green_180>
                                    </span>
                                </Tooltip>
                            </Container_Row_95_Center>
                        </Container_Form_450>
                    </Container_Modal>  
                </>
            ):(
                <></>
            )}
        </>
    );
}