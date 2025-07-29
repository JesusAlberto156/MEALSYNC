//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
// Hooks personalizados
import { HandleModalViewUsers } from "../../../../hooks/users/Views";
import { HandleViewPassword } from '../../../../hooks/users/Forms';
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Modal_Form_White_500,Container_Modal_Form_White,Container_Modal_Form } from "../../../styled/Containers";
import { Text_Span_12_Justify_Black,Text_Title_28_Black } from "../../../styled/Text";
// Componentes perzonalizados
import Form_Verification from "../../../forms/Verification";
import { Keyboard_Verification } from "../../../keyboards/Verificacion";
import { Image_Modal } from "../../../styled/Imgs";
import { Modal_Form_Button_View } from "../../../forms/Button";
//____________IMPORT/EXPORT____________

// Modal para ver las contraseñas de los usuarios
export default function User_View(){
    // Constantes con el valor de los contextos
    const [isModal] = useContext(ModalContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    // Constantes con la funcionalidad de los hooks
    const handleModalViewUsers = HandleModalViewUsers();
    const handleViewPassword = HandleViewPassword();
    // Useffect para controlar el sidebar
    useEffect(() => {
        if(isSidebar){
            setIsSidebar(false);
        }
    },[]);
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <>
                    <Container_Modal_Background_Black>
                        <Image_Modal/>
                        <Container_Modal_Form_White_500 className={currentMView === 'Usuario-Ver-Contraseña' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Modal_Form_White>
                                <Container_Modal_Form>
                                    <Text_Title_28_Black>VER CONTRASEÑAS</Text_Title_28_Black>
                                    <Form_Verification/>
                                    <Text_Span_12_Justify_Black>Las contraseñas podrán visualizarse de todos los usuarios durante un periodo de 30 segundos.</Text_Span_12_Justify_Black>
                                    <Modal_Form_Button_View
                                        onCancel={() => handleModalViewUsers('')}
                                        onAction={() => handleViewPassword()}
                                    />
                                </Container_Modal_Form>
                            </Container_Modal_Form_White>
                        </Container_Modal_Form_White_500>
                        <Keyboard_Verification/>
                    </Container_Modal_Background_Black>  
                </>
            ):(
                <></>
            )}
        </>
    );
}