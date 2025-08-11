//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { TextFieldsCleaningTypeContext } from "../../../../contexts/FormsProvider";
import { RefModalContext,RefFormContext } from "../../../../contexts/RefsProvider";
import { CountCleaningTypesContext,DeletedCleaningTypesContext } from "../../../../contexts/ExtrasProvider";
// Hooks personalizados
import { HandleModalViewExtras } from "../../../../hooks/extras/Views";
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Row_100_Center,Container_Row_NG_Auto_Center,Container_Modal_Form_White,Container_Modal_Form,Container_Modal_Form_White_600 } from "../../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Title_28_Black,Text_Color_Green_16,Text_Span_12_Justify_Black } from "../../../styled/Text";
// Componentes personalizados
import Error_View from "../../errors/View";
import { Modal_Form_Button_Return } from "../../../forms/Button";
import { Image_Modal } from "../../../styled/Imgs";
//____________IMPORT/EXPORT____________

// Modal para visualizar los detalles de los tipos de limpieza de su tabla
export default function Cleaning_Type_Details(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isModal] = useContext(ModalContext);
    const [isCountCleaningTypes] = useContext(CountCleaningTypesContext);
    const [isTextFieldsCleaningType] = useContext(TextFieldsCleaningTypeContext);
    const Modal = useContext(RefModalContext);
    const isForm = useContext(RefFormContext); 
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isDeletedCleaningTypes] = useContext(DeletedCleaningTypesContext); 
    // Constantes con la funcionalidad de los hooks
    const handleModalViewExtras = HandleModalViewExtras();
    // UseEffct para verificar la eliminacion del tipo de limpieza
    useEffect(() => {
        if(isDeletedCleaningTypes.length !== 0){
            if(isDeletedCleaningTypes.some(type => type.idtipo === isTextFieldsCleaningType.idtipo)){
                setIsSelectedRow(null);
            }
        }
    },[isDeletedCleaningTypes]);
    // Useffect para controlar el sidebar
    useEffect(() => {
        if(isSidebar){
            setIsSidebar(false);
        }
    },[]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <Container_Modal_Background_Black ref={Modal}>
                    <Image_Modal/>
                    <Container_Modal_Form_White_600 ref={isForm} className={currentMView === 'Tipo-Limpieza-Detalles' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Modal_Form_White>
                            <Container_Modal_Form>
                                <Text_Title_28_Black>DETALLES DE TIPO DE LIMPIEZA</Text_Title_28_Black>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black>: Datos generales</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Tipo de limpieza</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>: {isTextFieldsCleaningType?.tipo || 'Desconocido'}</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Descripción</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>:</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Text_Span_12_Justify_Black>{isTextFieldsCleaningType?.descripcion || 'Desconocida'}</Text_Span_12_Justify_Black>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black>: Datos específicos</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Unidad</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>: {isTextFieldsCleaningType.unidad || 'Desconocida'}</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Cantidades</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>:</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                {isCountCleaningTypes.some(count => count.idtipo === isTextFieldsCleaningType.idtipo) ? (
                                    isTextFieldsCleaningType.cantidades.map((count,index) => (
                                        <Container_Row_100_Center key={index}>
                                            <Text_Span_16_Center_Black>{count.cantidad}</Text_Span_16_Center_Black>
                                        </Container_Row_100_Center>
                                    ))
                                ):(
                                    <>
                                        <Container_Row_100_Center>
                                            <Text_Span_16_Center_Black>¡No hay datos disponibles!</Text_Span_16_Center_Black>
                                        </Container_Row_100_Center>
                                    </>
                                )}
                                <Modal_Form_Button_Return
                                    onHandleModalView={() => handleModalViewExtras('')}
                                />
                            </Container_Modal_Form>
                        </Container_Modal_Form_White>
                    </Container_Modal_Form_White_600>
                </Container_Modal_Background_Black>
            ):(
                currentMView === 'Tipo-Limpieza-Detalles' ? (
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