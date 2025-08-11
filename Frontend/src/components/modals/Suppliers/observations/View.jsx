//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { TextFieldsObservationContext } from "../../../../contexts/FormsProvider";
import { SuppliersContext,DeletedSuppliersContext } from "../../../../contexts/SuppliersProvider";
import { RefModalContext,RefFormContext } from "../../../../contexts/RefsProvider";
// Hooks personalizados
import { HandleModalViewSuppliers } from "../../../../hooks/suppliers/Views";
import { Dates } from "../../../../hooks/Dates";
//__________ICONOS__________
import { FaStar } from "react-icons/fa";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Row_100_Center,Container_Row_NG_Auto_Center,Container_Modal_Form_White_600,Container_Modal_Form_White,Container_Modal_Form } from "../../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Span_16_Justify_Black,Text_Title_28_Black,Text_Color_Green_16 } from "../../../styled/Text";
import { Icon_Green_28,Icon_Lime_Green_28,Icon_Yellow_28,Icon_Orange_28,Icon_Red_28,Icon_Blue_28,Icon_Black_28 } from "../../../styled/Icons";
// Componentes personalizados
import Error_View from "../../errors/View";
import { Image_Modal } from "../../../styled/Imgs";
import { Modal_Form_Button_Return } from "../../../forms/Button";
//____________IMPORT/EXPORT____________

// Modal para visualizar las observaciones de proveedores de su tabla
export default function Supplier_Observation_View(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isModal] = useContext(ModalContext);
    const [isTextFieldsObservation] = useContext(TextFieldsObservationContext);
    const Modal = useContext(RefModalContext);
    const isForm = useContext(RefFormContext);
    const [isSuppliers] = useContext(SuppliersContext);
    const [isDeletedSuppliers] = useContext(DeletedSuppliersContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    // Constantes con la funcionalidad de los hooks
    const handleModalViewSuppliers = HandleModalViewSuppliers();
    const { getDate } = Dates();
    // Useffect para controlar el sidebar
    useEffect(() => {
        if(isSidebar){
            setIsSidebar(false);
        }
    },[]);
    // UseEffct para verificar la eliminacion del proveedor
    useEffect(() => {
        if(isDeletedSuppliers.length !== 0){
            if(isDeletedSuppliers.some(supplier => supplier.idproveedor === isTextFieldsObservation.idproveedor)){
                setIsSelectedRow(null);
            }
        }
    },[isDeletedSuppliers]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <Container_Modal_Background_Black ref={Modal}>
                    <Image_Modal/>
                    <Container_Modal_Form_White_600 ref={isForm} className={currentMView === 'Observacion-Detalles' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Modal_Form_White>
                            <Container_Modal_Form>
                                <Text_Title_28_Black>DETALLES DE LA OBSERVACIÓN</Text_Title_28_Black>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black>: Datos generales</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Proveedor</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>: {isSuppliers.find(supplier => supplier.idproveedor === isTextFieldsObservation.idproveedor)?.nombre || 'Desconocido'}</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Text_Span_16_Center_Black>{getDate(isTextFieldsObservation.fecha)}</Text_Span_16_Center_Black>
                                <Container_Row_100_Center>
                                    {isTextFieldsObservation.calificacion === 0 ? (
                                        <>
                                            <Icon_Blue_28 className='pulsate-icon-fwd-0'><FaStar/></Icon_Blue_28>
                                            <Icon_Blue_28 className='pulsate-icon-fwd-1'><FaStar/></Icon_Blue_28>
                                            <Icon_Blue_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Blue_28>
                                            <Icon_Black_28 className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_28>
                                            <Icon_Black_28 className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                        </>
                                    ):(
                                        isTextFieldsObservation.calificacion <= 1 ? (
                                            <>
                                                <Icon_Red_28 className='pulsate-icon-fwd-0'><FaStar/></Icon_Red_28>
                                                <Icon_Black_28 className='pulsate-icon-fwd-1'><FaStar/></Icon_Black_28>
                                                <Icon_Black_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Black_28>
                                                <Icon_Black_28 className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_28>
                                                <Icon_Black_28 className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                            </>
                                        ):(
                                            isTextFieldsObservation.calificacion <=2 ? (
                                                <>
                                                    <Icon_Orange_28 className='pulsate-icon-fwd-0'><FaStar/></Icon_Orange_28>
                                                    <Icon_Orange_28 className='pulsate-icon-fwd-1'><FaStar/></Icon_Orange_28>
                                                    <Icon_Black_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Black_28>
                                                    <Icon_Black_28 className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_28>
                                                    <Icon_Black_28 className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                                </>
                                            ):(
                                                isTextFieldsObservation.calificacion <=3 ? (
                                                    <>
                                                        <Icon_Yellow_28 className='pulsate-icon-fwd-0'><FaStar/></Icon_Yellow_28>
                                                        <Icon_Yellow_28 className='pulsate-icon-fwd-1'><FaStar/></Icon_Yellow_28>
                                                        <Icon_Yellow_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Yellow_28>
                                                        <Icon_Black_28 className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_28>
                                                        <Icon_Black_28 className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                                    </>
                                                ):(
                                                    isTextFieldsObservation.calificacion <=4 ? (
                                                        <>
                                                            <Icon_Lime_Green_28 className='pulsate-icon-fwd-0'><FaStar/></Icon_Lime_Green_28>
                                                            <Icon_Lime_Green_28 className='pulsate-icon-fwd-1'><FaStar/></Icon_Lime_Green_28>
                                                            <Icon_Lime_Green_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Lime_Green_28>
                                                            <Icon_Lime_Green_28 className='pulsate-icon-fwd-3'><FaStar/></Icon_Lime_Green_28>
                                                            <Icon_Black_28 className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                                        </>
                                                    ):(
                                                        isTextFieldsObservation.calificacion <=5 ? (
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
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black>: Datos específicos</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>No. Pedido</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>: {isTextFieldsObservation.idpedido || 'Desconocido'}</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Text_Span_16_Justify_Black>{isTextFieldsObservation.observacion}</Text_Span_16_Justify_Black>
                                <Modal_Form_Button_Return
                                    onHandleModalView={() => handleModalViewSuppliers('')}
                                />
                            </Container_Modal_Form>
                        </Container_Modal_Form_White>
                    </Container_Modal_Form_White_600>
                </Container_Modal_Background_Black>
            ):(
                currentMView === 'Observacion-Detalles' ? (
                    <>
                        <Error_View/>
                    </>
                ):(
                    <></>
                )
            )}
        </>
    );
}