//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { SocketContext } from "../../../../contexts/SocketProvider";
import { ModalContext,ThemeModeContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { TextFieldsSupplyCategoryContext,TextFieldsUserContext } from "../../../../contexts/FormsProvider";
import { SupplyCategoryDeleteContext } from "../../../../contexts/SuppliersProvider";
import { ActionBlockContext,VerificationBlockContext,KeyboardContext,KeyboardViewContext,FunctionBlockContext } from "../../../../contexts/VariablesProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { RefSupplyCategoriesContext } from '../../../../contexts/RefsProvider';
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleModalViewSuppliers } from "../../../../hooks/suppliers/Views";
import { HandleSupplyCategoryDelete } from "../../../../hooks/suppliers/Forms";
import { ResetSelectedTables } from "../../../../hooks/Texts";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { MdDelete } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Row_100_Center,Container_Row_95_Center,Container_Row_NG_95_Center } from "../../../styled/Containers";
import { Text_Title_30_Center,Text_A_16_Left,Text_Blue_16_Left,Text_A_12_Justify } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Red_210 } from "../../../styled/Buttons";
import { Icon_White_22 } from "../../../styled/Icons";
import { Alert_Verification } from "../../../styled/Alerts";
// Componentes personalizados
import Error_Delete from "../../errors/Delete";
import Form_Verification from "../../../forms/Verification";
import Keyboard_Default from "../../../keyboards/Defaullt";
//____________IMPORT/EXPORT____________

// Modal para eliminar los proveedores de la tabla
export default function Supply_Category_Delete(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isFunctionBlock,setIsFunctionBlock] = useContext(FunctionBlockContext);
    const [socket] = useContext(SocketContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const {Modal_Supply_Categories,Form_Supply_Categories,Button_Edit_Supply_Categories,Button_Delete_Supply_Categories} = useContext(RefSupplyCategoriesContext);
    const [isSupplyCategoryDelete,setIsSupplyCategoryDelete] = useContext(SupplyCategoryDeleteContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isTextFieldsSupplyCategory] = useContext(TextFieldsSupplyCategoryContext);
    const [isKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView] = useContext(KeyboardViewContext);
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewSuppliers = HandleModalViewSuppliers();
    const handleSupplyCategoryDelete = HandleSupplyCategoryDelete();
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
        if(isSupplyCategoryDelete){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Deleted-Supply-Category',isLoggedUser.idusuario,isTextFieldsSupplyCategory.idcategoria)

                        resolve('¡MEALSYNC eliminó la categoría!...');

                        setIsSupplyCategoryDelete(false);

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
                    setIsSupplyCategoryDelete(false);
                    setIsFunctionBlock(true);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'Eliminando una categoría!...');
        }
    },[isSupplyCategoryDelete]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <>
                    <Container_Modal ref={Modal_Supply_Categories}>
                        <Container_Form_500 ref={Form_Supply_Categories} ThemeMode={themeMode} className={currentMView === 'Categoria-Eliminar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Row_100_Center>
                                <Text_Title_30_Center ThemeMode={themeMode}>ELIMINAR CATEGORÍA</Text_Title_30_Center>
                            </Container_Row_100_Center>
                            <Form_Verification/>
                            <Container_Row_NG_95_Center>
                                <Text_Blue_16_Left ThemeMode={themeMode}>Categoría:</Text_Blue_16_Left>
                                <Text_A_16_Left ThemeMode={themeMode}> {isTextFieldsSupplyCategory.nombre || 'Desconocida'}...</Text_A_16_Left>
                            </Container_Row_NG_95_Center>
                            <Container_Row_95_Center>
                                <Text_A_12_Justify ThemeMode={themeMode}>La eliminación de esta categorá impedirá agregarle nuevos insumos o reasignar sus insumos a una categoría distinta, tambien no se podrá agregar nuevos tipos de insumo a esta categoría o reasignarle sus tipos de insumo a otra categoría.</Text_A_12_Justify>
                            </Container_Row_95_Center>
                            <Container_Row_95_Center>
                                <Tooltip title='Cancelar' placement='top'>
                                    <span>
                                        <Button_Icon_Blue_210 ThemeMode={themeMode} className='pulsate-buttom'
                                            onClick={() => handleModalViewSuppliers('')}
                                            disabled={isActionBlock}  
                                        >
                                            <Icon_White_22><MdCancel/></Icon_White_22>
                                        </Button_Icon_Blue_210>
                                    </span>
                                </Tooltip>
                                <Tooltip title='Eliminar' placement='top'>
                                    <span>
                                        <Button_Icon_Red_210 ThemeMode={themeMode} className='pulsate-buttom'
                                            onClick={() => handleSupplyCategoryDelete()}
                                            disabled={!isFunctionBlock || isActionBlock}    
                                        >
                                            <Icon_White_22><MdDelete/></Icon_White_22>
                                        </Button_Icon_Red_210>
                                    </span>
                                </Tooltip>
                            </Container_Row_95_Center>
                        </Container_Form_500>
                        {isKeyboard ? (
                            <>
                                <Keyboard_Default value={isKeyboardView === 'User' ? isTextFieldsUser.usuario : isTextFieldsUser.contrasena} onChange={handleKeyboard}/>  
                            </>
                        ):(
                            <></>
                        )}
                    </Container_Modal>
                </>
            ):(
                currentMView === 'Categoria-Eliminar' ? (
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