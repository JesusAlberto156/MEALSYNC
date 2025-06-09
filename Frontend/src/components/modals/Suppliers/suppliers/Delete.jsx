//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { SocketContext,LogAddContext } from "../../../../contexts/SocketProvider";
import { ModalContext,ThemeModeContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { TextFieldsSupplierContext } from "../../../../contexts/FormsProvider";
import { SupplierDeleteContext,DeletedSuppliersContext } from "../../../../contexts/SuppliersProvider";
import { ActionBlockContext,VerificationBlockContext } from "../../../../contexts/VariablesProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { RefSuppliersContext } from '../../../../contexts/RefsProvider';
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleModalView } from "../../../../hooks/Views";
import { HandleSupplierDelete } from "../../../../hooks/Form";
//__________ICONOS__________
import { FaStar } from "react-icons/fa";
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { MdDelete } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Row_100_Center,Container_Row_95_Center,Container_Row_NG_95_Center } from "../../../styled/Containers";
import { Text_Title_30_Center,Text_A_16_Left,Text_Blue_16_Left } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Red_210 } from "../../../styled/Buttons";
import { Icon_White_22,Icon_Blue_30,Icon_Black_White_30,Icon_Red_30,Icon_Orange_30,Icon_Yellow_30,Icon_Lime_Green_30,Icon_Green_30 } from "../../../styled/Icons";
import { Alert_Verification } from "../../../styled/Alerts";
// Componentes personalizados
import Error_Delete from "../../errors/Delete";
import Form_Verification from "../../../forms/Verification";
//____________IMPORT/EXPORT____________

// Modal para editar los usuarios de la tabla
export default function Supplier_Delete(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [socket] = useContext(SocketContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const {Modal_Suppliers,Form_Suppliers,Button_Edit_Suppliers,Button_Delete_Suppliers} = useContext(RefSuppliersContext);
    const [isSupplierDelete,setIsSupplierDelete] = useContext(SupplierDeleteContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isDeletedSuppliers] = useContext(DeletedSuppliersContext);
    const [isLogAdd,setIsLogAdd] = useContext(LogAddContext);
    const [isTextFieldsSupplier,setIsTextFieldsSupplier] = useContext(TextFieldsSupplierContext);
    // Constantes con los valores de useRef
    const Supplier = useRef(false);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const handleSupplierDelete = HandleSupplierDelete();
    // Función para obtener la hora exacta del sistema
    function getLocalDateTimeOffset(hoursOffset = -7) {
        const now = new Date();
        now.setHours(now.getHours() + hoursOffset); // Restar 7 horas
        const pad = (n) => n.toString().padStart(2, '0');
        const year = now.getFullYear();
        const month = pad(now.getMonth() + 1);
        const day = pad(now.getDate());
        const hours = pad(now.getHours());
        const minutes = pad(now.getMinutes());
        const seconds = pad(now.getSeconds());
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isSupplierDelete){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Deleted-Supplier',isLoggedUser.usuario,isTextFieldsSupplier.nombre.trim(),isTextFieldsSupplier.idproveedor)

                        resolve('¡MEALSYNC eliminó al proveedor!...');

                        setIsSupplierDelete(false);
                    },2000);
                }catch(e){
                    setIsActionBlock(true);
                    setIsSupplierDelete(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'Eliminando un proveedor!...');
        }
        if(isDeletedSuppliers.some(supplier => supplier.idproveedor === isTextFieldsSupplier.idproveedor)){
            setIsTextFieldsSupplier(prev => ({
                ...prev,
                ideliminado: isDeletedSuppliers.find(user => user.idproveedor === isTextFieldsSupplier.idproveedor)?.ideliminado
            }));
            setIsLogAdd(true);
        }
        if(isLogAdd && isTextFieldsSupplier.ideliminado !== 0 && !Supplier.current){
            Supplier.current = true;
            socket.emit('Insert-Log-Deleted-Supplier',isLoggedUser.usuario,getLocalDateTimeOffset(),'INSERT',isTextFieldsSupplier.ideliminado,isLoggedUser.idusuario,String(isTextFieldsSupplier.idproveedor));
            setIsLogAdd(false);

            const route = sessionStorage.getItem('Ruta');

            setCurrentMView('');
            sessionStorage.setItem('Vista del Modal','');
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Estado del Modal',false);
                sessionStorage.removeItem('Acción del Bloqueo');
                sessionStorage.removeItem('Verificación del Bloqueo');
                setIsVerificationBlock(false);
                setIsActionBlock(false);
                setIsSelectedRow(null);
                navigate(route,{ replace: true });
            },750);
        }
    },[isSupplierDelete,isDeletedSuppliers,isTextFieldsSupplier.ideliminado]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <>
                    <Container_Modal ref={Modal_Suppliers}>
                        <Container_Form_500 ref={Form_Suppliers} ThemeMode={themeMode} className={currentMView === 'Proveedor-Eliminar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Row_100_Center>
                                <Text_Title_30_Center ThemeMode={themeMode}>ELIMINAR PROVEEDOR</Text_Title_30_Center>
                            </Container_Row_100_Center>
                            <Form_Verification/>
                            <Container_Row_NG_95_Center>
                                <Text_Blue_16_Left ThemeMode={themeMode}>Proveedor:</Text_Blue_16_Left>
                                <Text_A_16_Left ThemeMode={themeMode}> {isTextFieldsSupplier.nombre}</Text_A_16_Left>
                            </Container_Row_NG_95_Center>
                            <Container_Row_95_Center>
                                {isTextFieldsSupplier.calificacion === 0 ? (
                                    <>
                                        <Icon_Blue_30 ThemeMode={themeMode} className='pulsate-icon-fwd-0'><FaStar/></Icon_Blue_30>
                                        <Icon_Blue_30 ThemeMode={themeMode} className='pulsate-icon-fwd-1'><FaStar/></Icon_Blue_30>
                                        <Icon_Blue_30 ThemeMode={themeMode} className='pulsate-icon-fwd-2'><FaStar/></Icon_Blue_30>
                                        <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_White_30>
                                        <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_White_30>
                                    </>
                                ):(
                                    isTextFieldsSupplier.calificacion <= 1 ? (
                                        <>
                                            <Icon_Red_30 ThemeMode={themeMode} className='pulsate-icon-fwd-0'><FaStar/></Icon_Red_30>
                                            <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-1'><FaStar/></Icon_Black_White_30>
                                            <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-2'><FaStar/></Icon_Black_White_30>
                                            <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_White_30>
                                            <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_White_30>
                                        </>
                                    ):(
                                        isTextFieldsSupplier.calificacion <=2 ? (
                                            <>
                                                <Icon_Orange_30 ThemeMode={themeMode} className='pulsate-icon-fwd-0'><FaStar/></Icon_Orange_30>
                                                <Icon_Orange_30 ThemeMode={themeMode} className='pulsate-icon-fwd-1'><FaStar/></Icon_Orange_30>
                                                <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-2'><FaStar/></Icon_Black_White_30>
                                                <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_White_30>
                                                <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_White_30>
                                            </>
                                        ):(
                                            isTextFieldsSupplier.calificacion <=3 ? (
                                                <>
                                                    <Icon_Yellow_30 ThemeMode={themeMode} className='pulsate-icon-fwd-0'><FaStar/></Icon_Yellow_30>
                                                    <Icon_Yellow_30 ThemeMode={themeMode} className='pulsate-icon-fwd-1'><FaStar/></Icon_Yellow_30>
                                                    <Icon_Yellow_30 ThemeMode={themeMode} className='pulsate-icon-fwd-2'><FaStar/></Icon_Yellow_30>
                                                    <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_White_30>
                                                    <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_White_30>
                                                </>
                                            ):(
                                                isTextFieldsSupplier.calificacion <=4 ? (
                                                    <>
                                                        <Icon_Lime_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-0'><FaStar/></Icon_Lime_Green_30>
                                                        <Icon_Lime_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-1'><FaStar/></Icon_Lime_Green_30>
                                                        <Icon_Lime_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-2'><FaStar/></Icon_Lime_Green_30>
                                                        <Icon_Lime_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-3'><FaStar/></Icon_Lime_Green_30>
                                                        <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_White_30>
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
                            </Container_Row_95_Center>
                            <Container_Row_95_Center>
                                <Tooltip title='Cancelar' placement='top'>
                                    <span>
                                        <Button_Icon_Blue_210 ThemeMode={themeMode} className='pulsate-buttom'
                                            onClick={() => handleModalView('')}
                                            disabled={!isActionBlock && isVerificationBlock}  
                                        >
                                            <Icon_White_22><MdCancel/></Icon_White_22>
                                        </Button_Icon_Blue_210>
                                    </span>
                                </Tooltip>
                                <Tooltip title='Eliminar' placement='top'>
                                    <span>
                                        <Button_Icon_Red_210 ThemeMode={themeMode} className={!isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                            onClick={() => handleSupplierDelete()}
                                            disabled={!isActionBlock}    
                                        >
                                            <Icon_White_22><MdDelete/></Icon_White_22>
                                        </Button_Icon_Red_210>
                                    </span>
                                </Tooltip>
                            </Container_Row_95_Center>
                        </Container_Form_500>
                    </Container_Modal>
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