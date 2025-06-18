//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalViewContext,ModalContext } from "../../contexts/ViewsProvider";
// Hooks personalizados
import { ResetSearchTerms,ResetSelectedOptions } from "../Texts";
//____________IMPORT/EXPORT____________

// Hook para cambiar el modal ✔️
export const HandleModalViewWarehouse = () => {
    // Constantes con el valor de los contextos
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const resetSearchTerms = ResetSearchTerms();
    const resetSelectedOptions = ResetSelectedOptions();
    // Función del hook
    const handleModalViewWarehouse = (View) => {
        setIsModal(true);
        sessionStorage.setItem('Estado del Modal',true);
        const route = sessionStorage.getItem('Ruta');
        // INVENTARIOS
        if(currentMView === 'Pedido-Agregar' && View === ''){

        }
        if(currentMView === 'Pedido-Editar' && View === ''){

        }
        if(currentMView === 'Pedido-Editar-Estado' && View === ''){

        }
        if(currentMView === 'Observaciones-Pedido-Visualizar' && View === ''){

        }
        if(currentMView === 'Observacion-Pedido-Agregar' && View === ''){

        }
        if(currentMView === 'Pedido-Eliminar' && View === ''){

        }
        if(currentMView === 'Almacen-Tipo-Insumo-Agregar' && View === ''){

        }
        // INVENTARIOS
        setCurrentMView(View);
        sessionStorage.setItem('Vista del Modal',View);
        resetSelectedOptions();
        resetSearchTerms();
    }
    // Retorno de la función del hook
    return handleModalViewWarehouse;
}