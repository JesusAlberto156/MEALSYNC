//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalViewContext,ModalContext,SidebarContext } from "../../contexts/ViewsProvider";
import { ActionBlockContext,VerificationBlockContext,FunctionBlockContext } from "../../contexts/VariablesProvider";
import { SelectedRowContext } from "../../contexts/SelectedesProvider";
// Hooks personalizados
import { ResetSearchTerms,ResetSelectedOptions } from "../Texts";
//____________IMPORT/EXPORT____________

// Hook para cambiar el modal ✔️
export const HandleModalViewOrderKitchen = () => {
    // Constantes con el valor de los contextos
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    const [isFunctionBlock,setIsFunctionBlock] = useContext(FunctionBlockContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const resetSearchTerms = ResetSearchTerms();
    const resetSelectedOptions = ResetSelectedOptions();
    // Función del hook
    const handleModalViewOrderKitchen = (View) => {
        setIsModal(true);
        sessionStorage.setItem('Estado del Modal',true);
        const route = sessionStorage.getItem('Ruta');
        const sidebar = sessionStorage.getItem('Estado del Sidebar');
        // TIPOS DE MENÚ ✔️
        if(currentMView === 'Pedido-Cocina-Agregar' && View === ''){
            setIsActionBlock(true);
            setTimeout(() => {
                if(sidebar === 'true'){
                    setIsSidebar(true);
                }
                setIsModal(false);
                sessionStorage.setItem('Estado del Modal',false);
                setIsSelectedRow(null);
                setIsActionBlock(false);
                return navigate(route,{ replace: true });
            },750);
        }
        setCurrentMView(View);
        sessionStorage.setItem('Vista del Modal',View);
        resetSelectedOptions();
        resetSearchTerms();
    }
    // Retorno de la función del hook
    return handleModalViewOrderKitchen;
}