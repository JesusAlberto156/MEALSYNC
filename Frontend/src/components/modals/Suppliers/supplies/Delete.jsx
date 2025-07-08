//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { SocketContext } from "../../../../contexts/SocketProvider";
import { ModalContext,ThemeModeContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { TextFieldsSupplyContext,TextFieldsUserContext } from "../../../../contexts/FormsProvider";
import { SupplyDeleteContext } from "../../../../contexts/SuppliersProvider";
import { ActionBlockContext,VerificationBlockContext,KeyboardContext,KeyboardViewContext,FunctionBlockContext } from "../../../../contexts/VariablesProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { RefSuppliesContext } from '../../../../contexts/RefsProvider';
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleModalViewSuppliers } from "../../../../hooks/suppliers/Views";
import { HandleSupplyDelete } from "../../../../hooks/suppliers/Forms";
import { ResetSelectedTables } from "../../../../hooks/Texts";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { MdDelete } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Form_500,Container_Row_100_Center,Container_Row_NG_Auto_Center } from "../../../styled/Containers";
import { Text_Title_32_Black,Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Span_12_Justify_Black } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Red_210 } from "../../../styled/Buttons";
import { Icon_20 } from "../../../styled/Icons";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
// Componentes personalizados
import Error_Delete from "../../errors/Delete";
import Form_Verification from "../../../forms/Verification";
import Keyboard_Default from "../../../keyboards/Defaullt";
//____________IMPORT/EXPORT____________

// Modal para eliminar el insumo de la tabla
export default function Supply_Delete(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isFunctionBlock,setIsFunctionBlock] = useContext(FunctionBlockContext);
    const [socket] = useContext(SocketContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const {Modal_Supplies,Form_Supplies,Button_Edit_Supplies,Button_Delete_Supplies} = useContext(RefSuppliesContext);
    const [isSupplyDelete,setIsSupplyDelete] = useContext(SupplyDeleteContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isTextFieldsSupply] = useContext(TextFieldsSupplyContext);
    const [isKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView] = useContext(KeyboardViewContext);
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewSuppliers = HandleModalViewSuppliers();
    const handleSupplyDelete = HandleSupplyDelete();
    const resetSelectedTables = ResetSelectedTables();
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
    // UseEffect para eliminar datos a la base de datos
    useEffect(() => {
        if(isSupplyDelete){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Deleted-Supply',isLoggedUser.idusuario,isTextFieldsSupply.idinsumo)

                        resolve('¡MEALSYNC eliminó al insumo!...');

                        setIsSupplyDelete(false);

                        const route = sessionStorage.getItem('Ruta');

                        setCurrentMView('');
                        sessionStorage.setItem('Vista del Modal','');
                        setTimeout(() => {
                            setIsModal(false);
                            sessionStorage.setItem('Estado del Modal',false);
                            sessionStorage.removeItem('Función del Bloqueo');
                            sessionStorage.removeItem('Verificación del Bloqueo');
                            setIsVerificationBlock(false);
                            setIsActionBlock(false);
                            resetSelectedTables();
                            navigate(route,{ replace: true });
                        },750);
                    },2000);
                }catch(e){
                    setIsActionBlock(false);
                    setIsSupplyDelete(false);
                    setIsFunctionBlock(true);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Sonner_Promise(promise,'Eliminando un insumo!...');
        }
    },[isSupplyDelete]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <>
                    <Container_Modal_Background_Black ref={Modal_Supplies}>
                        <Container_Form_500 ref={Form_Supplies} ThemeMode={themeMode} className={currentMView === 'Insumo-Eliminar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Row_100_Center>
                                <Text_Title_32_Black ThemeMode={themeMode}>ELIMINAR INSUMO</Text_Title_32_Black>
                            </Container_Row_100_Center>
                            <Form_Verification/>
                            <Container_Row_NG_Auto_Center>
                                <Text_Color_Blue_16 ThemeMode={themeMode}>Insumo:</Text_Color_Blue_16>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}> {isTextFieldsSupply.nombre || 'Desconocido'}...</Text_Span_16_Center_Black>
                            </Container_Row_NG_Auto_Center>
                            <Container_Row_100_Center>
                                <Text_Span_12_Justify_Black ThemeMode={themeMode}>La eliminación de este insumo impedirá agregar nuevos pedidos de inventario a este insumo.</Text_Span_12_Justify_Black>
                            </Container_Row_100_Center>
                            <Container_Row_100_Center>
                                <Tooltip title='Cancelar' placement='top'>
                                    <span>
                                        <Button_Icon_Blue_210 ThemeMode={themeMode} className='pulsate-buttom'
                                            onClick={() => handleModalViewSuppliers('')}
                                            disabled={isActionBlock}  
                                        >
                                            <Icon_20><MdCancel/></Icon_20>
                                        </Button_Icon_Blue_210>
                                    </span>
                                </Tooltip>
                                <Tooltip title='Eliminar' placement='top'>
                                    <span>
                                        <Button_Icon_Red_210 ThemeMode={themeMode} className='pulsate-buttom'
                                            onClick={() => handleSupplyDelete()}
                                            disabled={!isFunctionBlock || isActionBlock}    
                                        >
                                            <Icon_20><MdDelete/></Icon_20>
                                        </Button_Icon_Red_210>
                                    </span>
                                </Tooltip>
                            </Container_Row_100_Center>
                        </Container_Form_500>
                        {isKeyboard ? (
                            <>
                                <Keyboard_Default value={isKeyboardView === 'User' ? isTextFieldsUser.usuario : isTextFieldsUser.contrasena} onChange={handleKeyboard}/>  
                            </>
                        ):(
                            <></>
                        )}
                    </Container_Modal_Background_Black>
                </>
            ):(
                currentMView === 'Insumo-Eliminar' ? (
                    <>
                        <Error_Delete/>
                    </>
                ):(
                    <></>
                )
            )}
        </>
    );
}