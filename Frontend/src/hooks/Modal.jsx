//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos

// Servicios

// Rutas

// Contextos
import { logContext } from "../contexts/SessionProvider";
import { statusEnableContext,statusDeleteContext,statusAddContext } from "../contexts/StatusProvider";
import { selectedRowContext,modalContext,optionModalContext,selectContext,radioContext,toastContext } from "../contexts/VariablesProvider";
import { navbarContext,sidebarContext } from "../contexts/ViewsProvider";
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados
import { Alert_Verification } from "../components/styled/Notifications";
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Hook para abrir el modal
export const useOpenModal = () => {
    // Constantes con el valor de los contextos 
    const [isModal, setIsModal] = useContext(modalContext);
    const [isOptionModal,setIsOptionModal] = useContext(optionModalContext);
    // Función del hook
    const openModal = (option) => {
        setIsModal(true);
        setIsOptionModal(option);
    }
    // Retorno de la función del hook
    return openModal;
}
// Hook para cerrar el modal
export const useCloseModal = () => {
    // Constantes con el valor de los contextos 
    const [isModal, setIsModal] = useContext(modalContext);
    const [isOptionModal,setIsOptionModal] = useContext(optionModalContext);
    // Función del hook
    const closeModal = () => {
        setIsModal(false);
        if(isOptionModal === 'Status-Enable'){
            
        }
        setIsOptionModal('');
    }
    // Retorno de la función del hook
    return closeModal;
}
// Hook para cerrar sesión desde el modal
export const useLogoutModal = () => {
    // Constantes con el valor de los contextos 
    const [isLog,setIsLog] = useContext(logContext);
    // Función del hook
    const logoutModal = () => {
        setIsLog(false);
    }
    // Retorno de la función del hook
    return logoutModal;
}

// Hook para agregar un estatus a un usuario desde el modal
export const useAddStatus = () => {
    // Constantes con el valor de los contextos 
    const [isStatusAdd,setIsStatusAdd] = useContext(statusAddContext);
    const [isToast,setIsToast] = useContext(toastContext);
    const [isSelect] = useContext(selectContext);
    const [isRadio] = useContext(radioContext);
    const [isNavbar] = useContext(navbarContext);
    const [isSidebar] = useContext(sidebarContext);
    const [isOptionModal] = useContext(optionModalContext);
    // Función del hook
    const addStatus = () => {
        if(isNavbar === 'Status' && isSidebar === 'Users' && isOptionModal === 'Add-Status'){
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setIsToast(true);

                    setTimeout(() => {
                        if(isSelect.length === 0) return reject('¡No ha seleccionado un usuario!...');
                        if(isRadio === '') return reject('¡No ha seleccionado un estado!...');

                        resolve('¡Datos verificados!...');
                        
                        setIsStatusAdd(true);
                    },500);
                }catch(error){
                    reject('¡Ocurrio un error inesperado!...');
                }
            });

            setTimeout(() => {
                setIsToast(false);
            },3000);

            Alert_Verification(promise,'¡Verificando datos!...');
        }
    } 
    // Retorno de la función del hook
    return addStatus;
}
// Hook para habilitar un usuario desde el modal
export const useEnableUser = () => {
    // Constantes con el valor de los contextos 
    const [isStatusEnable,setIsStatusEnable] = useContext(statusEnableContext);
    const [isOptionModal] = useContext(optionModalContext);
    const [isSelectedRow] = useContext(selectedRowContext);
    const [isNavbar] = useContext(navbarContext);
    const [isSidebar] = useContext(sidebarContext);
    // Función del hook
    const enableUser = () => {
        if(isSelectedRow !== null){
            if(isNavbar === 'Status' && isSidebar === 'Users' && isOptionModal === 'Enable-Status'){
                setIsStatusEnable(isSelectedRow);
            }
        }
    }
    // Retorno de la función del hook
    return enableUser;
}
// Hook para eliminar un estatus a un usuario desde el modal
export const useDeleteStatus = () => {
    // Constantes con el valor de los contextos 
    const [isStatusDelete,setIsStatusDelete] = useContext(statusDeleteContext);
    const [isModal,setIsModal] = useContext(modalContext);
    const [isOptionModal] = useContext(optionModalContext);
    const [isSelectedRow] = useContext(selectedRowContext);
    const [isNavbar] = useContext(navbarContext);
    const [isSidebar] = useContext(sidebarContext);
    // Función del hook
    const deleteStatus = () => {
        if(isSelectedRow !== null){
            if(isNavbar === 'Status' && isSidebar === 'Users' && isOptionModal === 'Delete-Status'){
                setIsStatusDelete(isSelectedRow);
            }
        }
    }
    // Retorno de la función del hook
    return deleteStatus;
}