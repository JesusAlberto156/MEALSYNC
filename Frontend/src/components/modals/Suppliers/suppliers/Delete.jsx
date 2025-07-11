//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { SocketContext } from "../../../../contexts/SocketProvider";
import { ModalContext,ThemeModeContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { TextFieldsSupplierContext,TextFieldsUserContext } from "../../../../contexts/FormsProvider";
import { SupplierDeleteContext } from "../../../../contexts/SuppliersProvider";
import { ActionBlockContext,VerificationBlockContext,KeyboardContext,KeyboardViewContext,FunctionBlockContext } from "../../../../contexts/VariablesProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { RefSuppliersContext } from '../../../../contexts/RefsProvider';
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleModalViewSuppliers } from "../../../../hooks/suppliers/Views";
import { HandleSupplierDelete } from "../../../../hooks/suppliers/Forms";
import { ResetSelectedTables } from "../../../../hooks/Texts";
//__________ICONOS__________
import { FaStar } from "react-icons/fa";
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { MdDelete } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Form_500,Container_Row_100_Center,Container_Row_NG_Auto_Center } from "../../../styled/Containers";
import { Text_Title_32_Black,Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Span_12_Justify_Black } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Red_210 } from "../../../styled/Buttons";
import { Icon_20,Icon_Blue_30,Icon_Black_28,Icon_Red_30,Icon_Orange_30,Icon_Yellow_30,Icon_Lime_Green_30,Icon_Green_30 } from "../../../styled/Icons";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
// Componentes personalizados
import Error_Delete from "../../errors/Delete";
import Form_Verification from "../../../forms/Verification";
import Keyboard_Default from "../../../keyboards/Defaullt";
//____________IMPORT/EXPORT____________

// Modal para eliminar los proveedores de la tabla
export default function Supplier_Delete(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isFunctionBlock,setIsFunctionBlock] = useContext(FunctionBlockContext);
    const [socket] = useContext(SocketContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const {Modal_Suppliers,Form_Suppliers,Button_Edit_Suppliers,Button_Delete_Suppliers} = useContext(RefSuppliersContext);
    const [isSupplierDelete,setIsSupplierDelete] = useContext(SupplierDeleteContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isTextFieldsSupplier] = useContext(TextFieldsSupplierContext);
    const [isKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView] = useContext(KeyboardViewContext);
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewSuppliers = HandleModalViewSuppliers();
    const handleSupplierDelete = HandleSupplierDelete();
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
        if(isSupplierDelete){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Deleted-Supplier',isLoggedUser.idusuario,isTextFieldsSupplier.idproveedor)

                        resolve('¡MEALSYNC eliminó al proveedor!...');

                        setIsSupplierDelete(false);

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
                    setIsSupplierDelete(false);
                    setIsFunctionBlock(true);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Sonner_Promise(promise,'Eliminando un proveedor!...');
        }
    },[isSupplierDelete]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <>
                    <Container_Modal_Background_Black ref={Modal_Suppliers}>
                        <Container_Form_500 ref={Form_Suppliers} ThemeMode={themeMode} className={currentMView === 'Proveedor-Eliminar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Row_100_Center>
                                <Text_Title_32_Black ThemeMode={themeMode}>ELIMINAR PROVEEDOR</Text_Title_32_Black>
                            </Container_Row_100_Center>
                            <Form_Verification/>
                            <Container_Row_NG_Auto_Center>
                                <Text_Color_Blue_16 ThemeMode={themeMode}>Proveedor:</Text_Color_Blue_16>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}> {isTextFieldsSupplier.nombre || 'Desconocido'}...</Text_Span_16_Center_Black>
                            </Container_Row_NG_Auto_Center>
                            <Container_Row_100_Center>
                                {isTextFieldsSupplier.calificacion === 0 ? (
                                    <>
                                        <Icon_Blue_30 ThemeMode={themeMode} className='pulsate-icon-fwd-0'><FaStar/></Icon_Blue_30>
                                        <Icon_Blue_30 ThemeMode={themeMode} className='pulsate-icon-fwd-1'><FaStar/></Icon_Blue_30>
                                        <Icon_Blue_30 ThemeMode={themeMode} className='pulsate-icon-fwd-2'><FaStar/></Icon_Blue_30>
                                        <Icon_Black_28 ThemeMode={themeMode} className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_28>
                                        <Icon_Black_28 ThemeMode={themeMode} className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                    </>
                                ):(
                                    isTextFieldsSupplier.calificacion <= 1 ? (
                                        <>
                                            <Icon_Red_30 ThemeMode={themeMode} className='pulsate-icon-fwd-0'><FaStar/></Icon_Red_30>
                                            <Icon_Black_28 ThemeMode={themeMode} className='pulsate-icon-fwd-1'><FaStar/></Icon_Black_28>
                                            <Icon_Black_28 ThemeMode={themeMode} className='pulsate-icon-fwd-2'><FaStar/></Icon_Black_28>
                                            <Icon_Black_28 ThemeMode={themeMode} className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_28>
                                            <Icon_Black_28 ThemeMode={themeMode} className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                        </>
                                    ):(
                                        isTextFieldsSupplier.calificacion <=2 ? (
                                            <>
                                                <Icon_Orange_30 ThemeMode={themeMode} className='pulsate-icon-fwd-0'><FaStar/></Icon_Orange_30>
                                                <Icon_Orange_30 ThemeMode={themeMode} className='pulsate-icon-fwd-1'><FaStar/></Icon_Orange_30>
                                                <Icon_Black_28 ThemeMode={themeMode} className='pulsate-icon-fwd-2'><FaStar/></Icon_Black_28>
                                                <Icon_Black_28 ThemeMode={themeMode} className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_28>
                                                <Icon_Black_28 ThemeMode={themeMode} className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                            </>
                                        ):(
                                            isTextFieldsSupplier.calificacion <=3 ? (
                                                <>
                                                    <Icon_Yellow_30 ThemeMode={themeMode} className='pulsate-icon-fwd-0'><FaStar/></Icon_Yellow_30>
                                                    <Icon_Yellow_30 ThemeMode={themeMode} className='pulsate-icon-fwd-1'><FaStar/></Icon_Yellow_30>
                                                    <Icon_Yellow_30 ThemeMode={themeMode} className='pulsate-icon-fwd-2'><FaStar/></Icon_Yellow_30>
                                                    <Icon_Black_28 ThemeMode={themeMode} className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_28>
                                                    <Icon_Black_28 ThemeMode={themeMode} className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                                </>
                                            ):(
                                                isTextFieldsSupplier.calificacion <=4 ? (
                                                    <>
                                                        <Icon_Lime_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-0'><FaStar/></Icon_Lime_Green_30>
                                                        <Icon_Lime_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-1'><FaStar/></Icon_Lime_Green_30>
                                                        <Icon_Lime_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-2'><FaStar/></Icon_Lime_Green_30>
                                                        <Icon_Lime_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-3'><FaStar/></Icon_Lime_Green_30>
                                                        <Icon_Black_28 ThemeMode={themeMode} className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                                    </>
                                                ):(
                                                    isTextFieldsSupplier.calificacion <=5 ? (
                                                        <>
                                                            <Icon_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-0'><FaStar/></Icon_Green_30>
                                                            <Icon_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-1'><FaStar/></Icon_Green_30>
                                                            <Icon_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-2'><FaStar/></Icon_Green_30>
                                                            <Icon_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-3'><FaStar/></Icon_Green_30>
                                                            <Icon_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-4'><FaStar/></Icon_Green_30>
                                                        </>
                                                    ):(
                                                        <></>
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )}
                            </Container_Row_100_Center>
                            <Container_Row_100_Center>
                                <Text_Span_12_Justify_Black ThemeMode={themeMode}>La eliminación de este proveedor impedirá agregarle nuevos insumos o reasignar sus insumos a un proveedor distinto.</Text_Span_12_Justify_Black>
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
                                            onClick={() => handleSupplierDelete()}
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
                currentMView === 'Proveedor-Eliminar' ? (
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