//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,ModalContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { ActionBlockContext,VerificationBlockContext,KeyboardContext,KeyboardViewContext } from "../../../../contexts/VariablesProvider";
import { TextFieldsUserContext } from "../../../../contexts/FormsProvider";
// Hooks personalizados
import { HandleModalViewUsers } from "../../../../hooks/users/Views";
import { HandleViewPassword } from '../../../../hooks/users/Forms'; 
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { FaEye } from "react-icons/fa";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Form_450,Container_Row_100_Center } from "../../../styled/Containers";
import { Button_Icon_Blue_180,Button_Icon_Green_180 } from "../../../styled/Buttons";
import { Text_Title_32_Black,Text_Span_12_Justify_Black } from "../../../styled/Text";
import { Icon_20 } from "../../../styled/Icons";
// Componentes perzonalizados
import Form_Verification from "../../../forms/Verification";
import Virtual_Keyboard from "../../../forms/Keyboard";
//____________IMPORT/EXPORT____________

// Modal para ver la contraseña de usuarios
export default function User_View(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isActionBlock] = useContext(ActionBlockContext);
    const [isModal] = useContext(ModalContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isVerificationBlock] = useContext(VerificationBlockContext);
    const [isKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView] = useContext(KeyboardViewContext);
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    // Constantes con la funcionalidad de los hooks
    const handleModalViewUsers = HandleModalViewUsers();
    const handleViewPassword = HandleViewPassword();
    // useEffect para escribir en los campos del login
    const handleKeyboard = (newValue) => {
        if(isKeyboardView === 'User' ){
            setIsTextFieldsUser(prev => ({
                ...prev,
                usuario: newValue, 
            }));
        }else{
            setIsTextFieldsUser(prev => ({
                ...prev,
                contrasena: newValue,
            }));
        }
    };
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <>
                    <Container_Modal_Background_Black>
                        <Container_Form_450 ThemeMode={themeMode} className={currentMView === 'Usuario-Ver-Contraseña' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Row_100_Center>
                                <Text_Title_32_Black ThemeMode={themeMode}>VER CONTRASEÑAS</Text_Title_32_Black>
                            </Container_Row_100_Center>
                            <Form_Verification/>
                            <Container_Row_100_Center>
                                <Text_Span_12_Justify_Black ThemeMode={themeMode}>Las contraseñas podrán visualizarse, de todos los usuarios durante un periodo de 30 segundos.</Text_Span_12_Justify_Black>
                            </Container_Row_100_Center>
                            <Container_Row_100_Center>
                                <Tooltip title='Cancelar' placement="top">
                                    <span>
                                        <Button_Icon_Blue_180 ThemeMode={themeMode} className='pulsate-buttom'
                                            onClick={() => {
                                                handleModalViewUsers('');
                                            }}
                                            disabled={!isActionBlock && isVerificationBlock}
                                        >
                                            <Icon_20><MdCancel/></Icon_20>
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
                                            <Icon_20><FaEye/></Icon_20>
                                        </Button_Icon_Green_180>
                                    </span>
                                </Tooltip>
                            </Container_Row_100_Center>
                        </Container_Form_450>
                        {isKeyboard ? (
                            <>
                                <Virtual_Keyboard value={isKeyboardView === 'User' ? isTextFieldsUser.usuario : isTextFieldsUser.contrasena} onChange={handleKeyboard}/>  
                            </>
                        ):(
                            <></>
                        )}
                    </Container_Modal_Background_Black>  
                </>
            ):(
                <></>
            )}
        </>
    );
}