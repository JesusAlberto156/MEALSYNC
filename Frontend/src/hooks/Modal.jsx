//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos

// Servicios

// Rutas

// Contextos
import { nameContext,passwordContext,selectContext,radioContext } from "../contexts/FormsProvider";
import { logContext } from "../contexts/SessionProvider";
import { statusEnableContext,statusDeleteContext,statusAddContext } from "../contexts/StatusProvider";
import { selectedRowContext,modalContext,optionModalContext,blockContext,comprobationContext } from "../contexts/VariablesProvider";
import { navbarViewContext,sidebarViewContext } from "../contexts/ViewsProvider";
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados
import { Alert_Verification } from "../components/styled/Alerts";
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
    const [isName,setIsName] = useContext(nameContext);
    const [isPassword,setIsPassword] = useContext(passwordContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(selectedRowContext);
    const [isSelect,setIsSelect] = useContext(selectContext);
    const [iseRadio,setIsRadio] = useContext(radioContext);
    const [isComprobation,setIsComprobation] = useContext(comprobationContext);
    const [isBlock,setIsBlock] = useContext(blockContext);
    // Función del hook
    const closeModal = () => {
        if(isOptionModal === 'Status-Add'){
            setIsSelect([]);
            setIsRadio('');
        }
        if(isOptionModal === 'Status-Enable'){
            setIsName('');
            setIsPassword('');
            setIsSelectedRow(null);

        }
        setIsComprobation(false);
        setIsBlock(false);
        setIsModal(false);
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
    const [isSelect] = useContext(selectContext);
    const [isRadio] = useContext(radioContext);
    const [isNavbar] = useContext(navbarViewContext);
    const [isSidebar] = useContext(sidebarViewContext);
    const [isOptionModal] = useContext(optionModalContext);
    const [isBlock,setIsBlock] = useContext(blockContext);
    // Función del hook
    const addStatus = () => {
        if(isNavbar === 'Status' && isSidebar === 'Users' && isOptionModal === 'Status-Add'){
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setIsBlock(true);
                    setTimeout(() => {
                        if(isSelect.length === 0) return reject('¡No ha seleccionado un usuario!...');
                        if(isRadio === '') return reject('¡No ha seleccionado un estado!...');

                        resolve('¡Datos verificados!...');
                        
                        setTimeout(() => {
                            setIsStatusAdd(true);
                        },500)
                    },2000);
                }catch(error){
                    setIsBlock(false);
                    reject('¡Ocurrio un error inesperado!...');
                }
            });

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
// Hook para eliminar un estatus a un usuario desde el modal
export const useDeleteStatus = () => {
    // Constantes con el valor de los contextos 
    const [isStatusDelete,setIsStatusDelete] = useContext(statusDeleteContext);
    const [isModal,setIsModal] = useContext(modalContext);
    const [isOptionModal] = useContext(optionModalContext);
    const [isSelectedRow] = useContext(selectedRowContext);
    const [isNavbar] = useContext(navbarViewContext);
    const [isSidebar] = useContext(sidebarViewContext);
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