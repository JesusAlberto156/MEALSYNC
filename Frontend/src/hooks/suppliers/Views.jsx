//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalViewContext,ModalContext } from "../../contexts/ViewsProvider";
import { ActionBlockContext,VerificationBlockContext } from "../../contexts/VariablesProvider";
// Hooks personalizados
import { ResetSearchTerms,ResetSelectedOptions,ResetSelectedTables } from "../Texts";
//____________IMPORT/EXPORT____________

// Hook para cambiar el modal
export const HandleModalViewSuppliers = () => {
    // Constantes con el valor de los contextos
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const resetSearchTerms = ResetSearchTerms();
    const resetSelectedTables = ResetSelectedTables();
    const resetSelectedOptions = ResetSelectedOptions();
    // Función del hook
    const handleModalViewSuppliers = (View) => {
        setIsModal(true);
        sessionStorage.setItem('Estado del Modal',true);
        const route = sessionStorage.getItem('Ruta');
        // PROVEEDORES
        if(currentMView === 'Proveedor-Agregar' && View === ''){
            setIsActionBlock(true);
            setTimeout(() => {
                resetSelectedTables();
                setIsModal(false);
                sessionStorage.setItem('Estado del Modal',false);
                setIsActionBlock(false);
                navigate(route,{ replace: true });
            },750);
        }
        if(currentMView === 'Proveedor-Editar' && View === ''){
            setIsActionBlock(true);
            setTimeout(() => {
                resetSelectedTables();
                setIsModal(false);
                sessionStorage.setItem('Estado del Modal',false);
                setIsActionBlock(false);
                navigate(route,{ replace: true });
            },750);
        }
        if(currentMView === 'Proveedor-Eliminar' && View === ''){
            setIsActionBlock(false);
            setTimeout(() => {
                resetSelectedTables();
                setIsModal(false);
                sessionStorage.setItem('Estado del Modal',false);
                sessionStorage.removeItem('Acción del Bloqueo');
                setIsVerificationBlock(false);
                sessionStorage.removeItem('Verificación del Bloqueo');
                navigate(route,{ replace: true });
            },750);
        }
        if(currentMView === 'Observacion-Detalles' && View === ''){
            setIsActionBlock(true);
            setTimeout(() => {
                resetSelectedTables();
                setIsActionBlock(false);
                setIsModal(false);
                sessionStorage.setItem('Estado del Modal',false);
                navigate(route,{ replace: true });
            },750);
        }
        if(currentMView === 'Categoria-Agregar' && View === ''){
            
        }
        if(currentMView === 'Categoria-Editar' && View === ''){
            
        }
        if(currentMView === 'Categoria-Eliminar' && View === ''){
            
        }
        if(currentMView === 'Tipo-Insumo-Agregar' && View === ''){
            
        }
        if(currentMView === 'Tipo-Insumo-Editar' && View === ''){
            
        }
        if(currentMView === 'Tipo-Insumo-Cantidad-Agregar' && View === ''){
            
        }
        if(currentMView === 'Tipo-Insumo-Eliminar' && View === ''){
            
        }
        if(currentMView === 'Tipo-Insumo-Detalles' && View === ''){
            
        }
        if(currentMView === 'Insumo-Agregar' && View === ''){
            
        }
        if(currentMView === 'Insumo-Editar' && View === ''){
            
        }
        if(currentMView === 'Insumo-Eliminar' && View === ''){
            
        }
        // PROVEEDORES
        setCurrentMView(View);
        sessionStorage.setItem('Vista del Modal',View);
        resetSelectedOptions();
        resetSearchTerms();
    }
    // Retorno de la función del hook
    return handleModalViewSuppliers;
}