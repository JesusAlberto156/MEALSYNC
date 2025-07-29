//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext, useEffect } from "react";
// Contextos
import { ModalViewContext,ModalContext,SidebarContext } from "../../../contexts/ViewsProvider";
// Hooks personalizados
import { HandleModalView } from "../../../hooks/Views";
import { HandleLoggedLog } from "../../../hooks/Forms";
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Modal_Form_White_500,Container_Modal_Form_White,Container_Modal_Form,Container_Row_NG_100_Center } from "../../styled/Containers";
import { Text_Title_32_Black,Text_Span_16_Center_Black,Text_Color_Blue_16 } from "../../styled/Text";
// Componentes personalizados
import { Image_Modal } from "../../styled/Imgs";
import { Modal_Form_Button_OutLogin } from "../../forms/Button";
//____________IMPORT/EXPORT____________

// Modal para cerrar sesión
export default function Out_Login(){
    // Constantes con el valor de los contextos 
    const [currentMView] = useContext(ModalViewContext);
    const [isModal] = useContext(ModalContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    // Constantes con la funcionalidad de los hooks
    const handleModalView = HandleModalView();
    const handleLoggedLog = HandleLoggedLog();
    // UseEffect para la visualizacion del componente
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
                        <Container_Modal_Form_White_500 className={currentMView === 'Cerrar-Sesión' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Modal_Form_White>
                                <Container_Modal_Form>
                                    <Text_Title_32_Black>¿ESTAS SEGURO?</Text_Title_32_Black>
                                    <Container_Row_NG_100_Center>
                                        <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                        <Text_Span_16_Center_Black>: Cerrará la sesión</Text_Span_16_Center_Black>
                                    </Container_Row_NG_100_Center>
                                    <Modal_Form_Button_OutLogin
                                        onCancel={() => handleModalView('')}
                                        onAction={() => handleLoggedLog()}
                                    />
                                </Container_Modal_Form>
                            </Container_Modal_Form_White>
                        </Container_Modal_Form_White_500>
                    </Container_Modal_Background_Black>  
                </>
            ):(
                <></>
            )}
        </>
    );
}