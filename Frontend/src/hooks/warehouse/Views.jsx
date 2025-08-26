//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalViewContext,ModalContext,SidebarContext } from "../../contexts/ViewsProvider";
import { SelectedRowContext } from "../../contexts/SelectedesProvider";
import { ActionBlockContext,VerificationBlockContext,FunctionBlockContext } from "../../contexts/VariablesProvider";
// Hooks personalizados
import { ResetSearchTerms,ResetSelectedOptions } from "../Texts";
//____________IMPORT/EXPORT____________

// Hook para cambiar el modal ✔️
export const HandleModalViewWarehouse = () => {
    // Constantes con el valor de los contextos
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isFunctionBlock,setIsFunctionBlock] = useContext(FunctionBlockContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const resetSearchTerms = ResetSearchTerms();
    const resetSelectedOptions = ResetSelectedOptions();
    // Función del hook
    const handleModalViewWarehouse = (View) => {
        setIsModal(true);
        sessionStorage.setItem('Estado del Modal',true);
        const route = sessionStorage.getItem('Ruta');
        const sidebar = sessionStorage.getItem('Estado del Sidebar');
        // PEDIDOS ✔️
        if(currentMView === 'Pedido-Almacen-Agregar' && View === ''){
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
        if(currentMView === 'Pedido-Almacen-Eliminar' && View === ''){
            setIsActionBlock(true);
            setTimeout(() => {
                if(sidebar === 'true'){
                    setIsSidebar(true);
                }
                setIsModal(false);
                sessionStorage.setItem('Estado del Modal',false);
                setIsSelectedRow(null);
                setIsActionBlock(false);
                setIsFunctionBlock(false)
                setIsVerificationBlock(false);
                sessionStorage.removeItem('Función del Bloqueo');
                sessionStorage.removeItem('Verificación del Bloqueo');
                return navigate(route,{ replace: true });
            },750);
        }
        if(currentMView === 'Pedido-Almacen-Verificacion-Editar' && View === ''){
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
        if(currentMView === 'Pedido-Almacen-Verificacion-Agregar' && View === ''){
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
        if(currentMView === 'Pedido-Almacen-Finalizar' && View === ''){
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
        if(currentMView === 'Pedido-Almacen-Detalles' && View === ''){
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
        // COMPRAS ✔️
        if(currentMView === 'Almacen-Compra-Insumo-Agregar' && View === ''){
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
        if(currentMView === 'Almacen-Compra-Suministro-Agregar' && View === ''){
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
        if(currentMView === 'Almacen-Compra-Gasto-Fijo-Agregar' && View === ''){
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
        // VENTAS ✔️
        if(currentMView === 'Almacen-Venta-Insumo-Agregar' && View === ''){
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
        if(currentMView === 'Almacen-Venta-Suministro-Agregar' && View === ''){
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
    return handleModalViewWarehouse;
}