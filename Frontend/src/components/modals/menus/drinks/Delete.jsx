//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { SocketContext } from "../../../../contexts/SocketProvider";
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { TextFieldsDrinkContext } from "../../../../contexts/FormsProvider";
import { DrinkDeleteContext,DeletedDrinksContext } from "../../../../contexts/DrinksProvider";
import { ActionBlockContext,VerificationBlockContext,FunctionBlockContext } from "../../../../contexts/VariablesProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { RefModalContext,RefFormContext } from '../../../../contexts/RefsProvider';
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleModalViewDrinks } from "../../../../hooks/drinks/Views";
import { HandleDrinkDelete } from "../../../../hooks/drinks/Forms";
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Row_NG_Auto_Center,Container_Modal_Form_White_500,Container_Modal_Form_White,Container_Modal_Form } from "../../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Span_12_Justify_Black,Text_Title_28_Black,Text_Color_Green_16 } from "../../../styled/Text";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
// Componentes personalizados
import { Image_Modal } from "../../../styled/Imgs";
import Error_Delete from "../../errors/Delete";
import Form_Verification from "../../../forms/Verification";
import { Modal_Form_Button_Delete } from "../../../forms/Button";
import { Keyboard_Verification } from "../../../keyboards/Verificacion";
//____________IMPORT/EXPORT____________

// Modal para eliminar las bebidas de la tabla
export default function Drink_Delete(){
    // Constantes con el valor de los contextos
    const Modal = useContext(RefModalContext);
    const isForm = useContext(RefFormContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isTextFieldsDrink] = useContext(TextFieldsDrinkContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [socket] = useContext(SocketContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isDrinkDelete,setIsDrinkDelete] = useContext(DrinkDeleteContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isFunctionBlock,setIsFunctionBlock] = useContext(FunctionBlockContext);
    const [isDeletedDrinks] = useContext(DeletedDrinksContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewDrinks = HandleModalViewDrinks();
    const handleDrinkDelete = HandleDrinkDelete();
    // UseEffct para verificar la eliminacion de la bebida
    useEffect(() => {
        if(isDeletedDrinks.length !== 0){
            if(isDeletedDrinks.some(dish => dish.idbebida === isTextFieldsDrink.idbebida)){
                setTimeout(() => {
                    setIsSelectedRow(null);
                },1000); 
            }
        }
    },[isDeletedDrinks]);
    // Useffect para controlar el sidebar
    useEffect(() => {
        if(isSidebar){
            setIsSidebar(false);
        }
    },[]);
    // UseEffect para eliminar datos a la base de datos
    useEffect(() => {
        if(isDrinkDelete){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Deleted-Drink',isLoggedUser.idusuario,isTextFieldsDrink.idbebida,isTextFieldsDrink.tipos,isTextFieldsDrink.ingredientes);

                        resolve('¡Eliminó la bebida!');

                        setIsDrinkDelete(false);

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
                    setIsDrinkDelete(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Eliminando una bebida!','1');
        }
    },[isDrinkDelete]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <>
                    <Container_Modal_Background_Black ref={Modal}>
                        <Image_Modal/>
                        <Container_Modal_Form_White_500 ref={isForm} className={currentMView === 'Bebida-Eliminar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Modal_Form_White>
                                <Container_Modal_Form>
                                    <Text_Title_28_Black>ELIMINAR BEBIDA</Text_Title_28_Black>
                                    <Form_Verification/>
                                    <Container_Row_NG_Auto_Center>
                                        <Text_Color_Green_16>Bebida</Text_Color_Green_16>
                                        <Text_Span_16_Center_Black>: {isTextFieldsDrink.nombre || 'Desconocido'}</Text_Span_16_Center_Black>
                                    </Container_Row_NG_Auto_Center>
                                    <Text_Span_12_Justify_Black>Al eliminar la bebida, se perderá la asignación de los menús, así como también la asignación de los ingredientes asociados al mismo.</Text_Span_12_Justify_Black>
                                    <Modal_Form_Button_Delete
                                        onCancel={() => handleModalViewDrinks('')}
                                        onAction={() => handleDrinkDelete()}
                                    />
                                </Container_Modal_Form>
                            </Container_Modal_Form_White>
                        </Container_Modal_Form_White_500>
                        <Keyboard_Verification/>
                    </Container_Modal_Background_Black>
                </>
            ):(
                currentMView === 'Bebida-Eliminar' ? (
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