//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { SocketContext } from "../../../../contexts/SocketProvider";
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { TextFieldsCleaningTypeContext } from "../../../../contexts/FormsProvider";
import { DeletedCleaningTypesContext,CleaningTypeDeleteContext } from "../../../../contexts/ExtrasProvider";
import { ActionBlockContext,VerificationBlockContext,FunctionBlockContext } from "../../../../contexts/VariablesProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { RefModalContext,RefFormContext } from '../../../../contexts/RefsProvider';
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleModalViewExtras } from "../../../../hooks/extras/Views";
import { HandleCleaningTypeDelete } from "../../../../hooks/extras/Forms";
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Row_NG_Auto_Center,Container_Modal_Form_White_500,Container_Modal_Form,Container_Modal_Form_White } from "../../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Span_12_Justify_Black,Text_Title_28_Black,Text_Color_Green_16 } from "../../../styled/Text";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
// Componentes personalizados
import Error_Delete from "../../errors/Delete";
import Form_Verification from "../../../forms/Verification";
import { Modal_Form_Button_Delete } from "../../../forms/Button";
import { Keyboard_Verification } from "../../../keyboards/Verificacion";
import { Image_Modal } from "../../../styled/Imgs";
//____________IMPORT/EXPORT____________

// Modal para eliminar los tipos de limpieza de la tabla
export default function Cleaning_Type_Delete(){
    // Constantes con el valor de los contextos
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isFunctionBlock,setIsFunctionBlock] = useContext(FunctionBlockContext);
    const [socket] = useContext(SocketContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const Modal = useContext(RefModalContext);
    const isForm = useContext(RefFormContext);
    const [isCleaningTypeDelete,setIsCleaningTypeDelete] = useContext(CleaningTypeDeleteContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isTextFieldsCleaningType] = useContext(TextFieldsCleaningTypeContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isDeletedCleaningTypes] = useContext(DeletedCleaningTypesContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleCleaningTypeDelete = HandleCleaningTypeDelete();
    const handleModalViewExtras = HandleModalViewExtras();
    // UseEffct para verificar la eliminacion del tipo de limpieza
    useEffect(() => {
        if(isDeletedCleaningTypes.length !== 0){
            if(isDeletedCleaningTypes.some(type => type.idtipo === isTextFieldsCleaningType.idtipo)){
                setTimeout(() => {
                    setIsSelectedRow(null);
                },1000);
            }
        }
    },[isDeletedCleaningTypes]);
    // Useffect para controlar el sidebar
    useEffect(() => {
        if(isSidebar){
            setIsSidebar(false);
        }
    },[]);
    // UseEffect para eliminar datos a la base de datos
    useEffect(() => {
        if(isCleaningTypeDelete){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Deleted-Cleaning-Type',isLoggedUser.idusuario,isTextFieldsCleaningType.idtipo)

                        resolve('¡Eliminó al tipo de limpieza!');

                        setIsCleaningTypeDelete(false);

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
                    setIsCleaningTypeDelete(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Eliminando un tipo de limpieza!','1');
        }
    },[isCleaningTypeDelete]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <>
                    <Container_Modal_Background_Black ref={Modal}>
                        <Image_Modal/>
                        <Container_Modal_Form_White_500 ref={isForm} className={currentMView === 'Tipo-Limpieza-Eliminar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Modal_Form_White>
                                <Container_Modal_Form>
                                    <Text_Title_28_Black>ELIMINAR TIPO DE LIMPIEZA</Text_Title_28_Black>
                                    <Form_Verification/>
                                    <Container_Row_NG_Auto_Center>
                                        <Text_Color_Green_16>Tipo de limpieza</Text_Color_Green_16>
                                        <Text_Span_16_Center_Black>:  {isTextFieldsCleaningType.tipo || 'Desconocido'}</Text_Span_16_Center_Black>
                                    </Container_Row_NG_Auto_Center>
                                    <Text_Span_12_Justify_Black>La eliminación de este tipo de limpieza impedirá agregarle nuevos suministros de limpieza o reasignar sus suministros de limpieza a un tipo de limpieza distinto.</Text_Span_12_Justify_Black>
                                    <Modal_Form_Button_Delete
                                        onCancel={() => handleModalViewExtras('')}
                                        onAction={() => handleCleaningTypeDelete()}
                                    />
                                </Container_Modal_Form>
                            </Container_Modal_Form_White>
                        </Container_Modal_Form_White_500>
                        <Keyboard_Verification/>
                    </Container_Modal_Background_Black>
                </>
            ):(
                currentMView === 'Tipo-Limpieza-Eliminar' ? (
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