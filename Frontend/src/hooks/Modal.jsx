//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos

// Servicios

// Rutas

// Contextos
import { statusEnableContext } from "../contexts/StatusProvider";
import { selectedRowContext } from "../contexts/VariablesProvider";
import { navbarViewContext,sidebarViewContext } from "../contexts/ViewsProvider";
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados
import { Alert_Verification } from "../components/styled/Alerts";
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Hook para habilitar un usuario desde el modal
export const useEnableUser = () => {
    // Constantes con el valor de los contextos 
    const [isStatusEnable,setIsStatusEnable] = useContext(statusEnableContext);
    const [isOptionModal] = useContext(optionModalContext);
    const [isSelectedRow] = useContext(selectedRowContext);
    const [isNavbar] = useContext(navbarViewContext);
    const [isSidebar] = useContext(sidebarViewContext);
    // Función del hook
    const enableUser = () => {
        if(isSelectedRow !== null){
            if(isNavbar === 'Status' && isSidebar === 'Users' && isOptionModal === 'Status-Enable'){
                setIsStatusEnable(isSelectedRow);
            }
        }
    }
    // Retorno de la función del hook
    return enableUser;
}