//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { SocketContext } from "../../../../contexts/SocketProvider";
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { TextFieldsSupplierContext } from "../../../../contexts/FormsProvider";
import { SupplierDeleteContext,DeletedSuppliersContext } from "../../../../contexts/SuppliersProvider";
import { ActionBlockContext,VerificationBlockContext,FunctionBlockContext } from "../../../../contexts/VariablesProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { RefModalContext,RefFormContext } from '../../../../contexts/RefsProvider';
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleModalViewSuppliers } from "../../../../hooks/suppliers/Views";
import { HandleSupplierDelete } from "../../../../hooks/suppliers/Forms";
//__________ICONOS__________
import { FaStar } from "react-icons/fa";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Row_100_Center,Container_Row_NG_Auto_Center,Container_Modal_Form_White_500,Container_Modal_Form_White,Container_Modal_Form } from "../../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Span_12_Justify_Black, Text_Title_28_Black, Text_Color_Green_16 } from "../../../styled/Text";
import { Icon_Blue_28,Icon_Black_28,Icon_Red_28,Icon_Orange_28,Icon_Yellow_28,Icon_Lime_Green_28,Icon_Green_28 } from "../../../styled/Icons";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
// Componentes personalizados
import Error_Delete from "../../errors/Delete";
import Form_Verification from "../../../forms/Verification";
import { Modal_Form_Button_Delete } from "../../../forms/Button";
import { Keyboard_Verification } from "../../../keyboards/Verificacion";
import { Image_Modal } from "../../../styled/Imgs";
//____________IMPORT/EXPORT____________

// Modal para eliminar los proveedores de la tabla
export default function Supplier_Delete(){
    // Constantes con el valor de los contextos
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isFunctionBlock,setIsFunctionBlock] = useContext(FunctionBlockContext);
    const [socket] = useContext(SocketContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const Modal = useContext(RefModalContext);
    const isForm = useContext(RefFormContext);
    const [isSupplierDelete,setIsSupplierDelete] = useContext(SupplierDeleteContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isTextFieldsSupplier] = useContext(TextFieldsSupplierContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isDeletedSuppliers] = useContext(DeletedSuppliersContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewSuppliers = HandleModalViewSuppliers();
    const handleSupplierDelete = HandleSupplierDelete();
    // UseEffct para verificar la eliminacion del proveedor
    useEffect(() => {
        if(isDeletedSuppliers.length !== 0){
            if(isDeletedSuppliers.some(supplier => supplier.idproveedor === isTextFieldsSupplier.idproveedor)){
                setTimeout(() => {
                    setIsSelectedRow(null);
                },1000);
            }
        }
    },[isDeletedSuppliers]);
    // Useffect para controlar el sidebar
    useEffect(() => {
        if(isSidebar){
            setIsSidebar(false);
        }
    },[]);
    // UseEffect para eliminar datos a la base de datos
    useEffect(() => {
        if(isSupplierDelete){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Deleted-Supplier',isLoggedUser.idusuario,isTextFieldsSupplier.idproveedor)

                        resolve('¡Eliminó al proveedor!');

                        setIsSupplierDelete(false);

                        const route = sessionStorage.getItem('Ruta');
                        const sidebar = sessionStorage.getItem('Estado del Sidebar');
                        
                        setCurrentMView('');
                        sessionStorage.setItem('Vista del Modal','');
                        setTimeout(() => {
                            if(sidebar === 'true'){
                                setIsSidebar(true);
                            }
                            setIsModal(false);
                            sessionStorage.setItem('Estado del Modal',false);
                            sessionStorage.removeItem('Función del Bloqueo');
                            sessionStorage.removeItem('Verificación del Bloqueo');
                            setIsVerificationBlock(false);
                            setIsFunctionBlock(false);
                            setIsActionBlock(false);
                            setIsSelectedRow(null);
                            return navigate(route,{ replace: true });
                        },750);
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    setIsSupplierDelete(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Eliminando un proveedor!','1');
        }
    },[isSupplierDelete]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <>
                    <Container_Modal_Background_Black ref={Modal}>
                        <Image_Modal/>
                        <Container_Modal_Form_White_500 ref={isForm} className={currentMView === 'Proveedor-Eliminar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Modal_Form_White>
                                <Container_Modal_Form>
                                    <Text_Title_28_Black>ELIMINAR PROVEEDOR</Text_Title_28_Black>
                                    <Form_Verification/>
                                    <Container_Row_NG_Auto_Center>
                                        <Text_Color_Green_16>Proveedor</Text_Color_Green_16>
                                        <Text_Span_16_Center_Black>:  {isTextFieldsSupplier.nombre || 'Desconocido'}</Text_Span_16_Center_Black>
                                    </Container_Row_NG_Auto_Center>
                                    <Container_Row_100_Center>
                                        {isTextFieldsSupplier.calificacion === 0 ? (
                                            <>
                                                <Icon_Blue_28 className='pulsate-icon-fwd-0'><FaStar/></Icon_Blue_28>
                                                <Icon_Blue_28 className='pulsate-icon-fwd-1'><FaStar/></Icon_Blue_28>
                                                <Icon_Blue_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Blue_28>
                                                <Icon_Blue_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Blue_28>
                                                <Icon_Blue_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Blue_28>
                                            </>
                                        ):(
                                            isTextFieldsSupplier.calificacion <= 1 ? (
                                                <>
                                                    <Icon_Red_28 className='pulsate-icon-fwd-0'><FaStar/></Icon_Red_28>
                                                    <Icon_Black_28 className='pulsate-icon-fwd-1'><FaStar/></Icon_Black_28>
                                                    <Icon_Black_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Black_28>
                                                    <Icon_Black_28 className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_28>
                                                    <Icon_Black_28 className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                                </>
                                            ):(
                                                isTextFieldsSupplier.calificacion <=2 ? (
                                                    <>
                                                        <Icon_Orange_28 className='pulsate-icon-fwd-0'><FaStar/></Icon_Orange_28>
                                                        <Icon_Orange_28 className='pulsate-icon-fwd-1'><FaStar/></Icon_Orange_28>
                                                        <Icon_Black_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Black_28>
                                                        <Icon_Black_28 className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_28>
                                                        <Icon_Black_28 className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                                    </>
                                                ):(
                                                    isTextFieldsSupplier.calificacion <=3 ? (
                                                        <>
                                                            <Icon_Yellow_28 className='pulsate-icon-fwd-0'><FaStar/></Icon_Yellow_28>
                                                            <Icon_Yellow_28 className='pulsate-icon-fwd-1'><FaStar/></Icon_Yellow_28>
                                                            <Icon_Yellow_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Yellow_28>
                                                            <Icon_Black_28 className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_28>
                                                            <Icon_Black_28 className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                                        </>
                                                    ):(
                                                        isTextFieldsSupplier.calificacion <=4 ? (
                                                            <>
                                                                <Icon_Lime_Green_28 className='pulsate-icon-fwd-0'><FaStar/></Icon_Lime_Green_28>
                                                                <Icon_Lime_Green_28 className='pulsate-icon-fwd-1'><FaStar/></Icon_Lime_Green_28>
                                                                <Icon_Lime_Green_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Lime_Green_28>
                                                                <Icon_Lime_Green_28 className='pulsate-icon-fwd-3'><FaStar/></Icon_Lime_Green_28>
                                                                <Icon_Black_28 className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                                            </>
                                                        ):(
                                                            isTextFieldsSupplier.calificacion <=5 ? (
                                                                <>
                                                                    <Icon_Green_28 className='pulsate-icon-fwd-0'><FaStar/></Icon_Green_28>
                                                                    <Icon_Green_28 className='pulsate-icon-fwd-1'><FaStar/></Icon_Green_28>
                                                                    <Icon_Green_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Green_28>
                                                                    <Icon_Green_28 className='pulsate-icon-fwd-3'><FaStar/></Icon_Green_28>
                                                                    <Icon_Green_28 className='pulsate-icon-fwd-4'><FaStar/></Icon_Green_28>
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
                                    <Text_Span_12_Justify_Black>La eliminación de este proveedor impedirá agregarle nuevos insumos, reasignar sus insumos a un proveedor distinto o realizar nuevos pedidos a este proveedor.</Text_Span_12_Justify_Black>
                                    <Modal_Form_Button_Delete
                                        onCancel={() => handleModalViewSuppliers('')}
                                        onAction={() => handleSupplierDelete()}
                                    />
                                </Container_Modal_Form>
                            </Container_Modal_Form_White>
                        </Container_Modal_Form_White_500>
                        <Keyboard_Verification/>
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