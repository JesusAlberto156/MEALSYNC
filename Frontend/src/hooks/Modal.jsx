//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos

// Servicios

// Rutas

// Contextos
import { nameContext,passwordContext,selectContext,radioContext } from "../contexts/FormsProvider";
import { logContext } from "../contexts/SessionProvider";
import { statusEnableContext,statusAddContext } from "../contexts/StatusProvider";
import { selectedRowContext,actionBlockContext,formComprobationContext } from "../contexts/VariablesProvider";
import { navbarViewContext,sidebarViewContext,modalViewContext } from "../contexts/ViewsProvider";
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados
import { Alert_Verification } from "../components/styled/Alerts";
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Hook para cerrar el modal
export const useCloseModal = () => {
    // Constantes con el valor de los contextos 
    const [currentMView,setCurrentMView] = useContext(modalViewContext);
    const [isName,setIsName] = useContext(nameContext);
    const [isPassword,setIsPassword] = useContext(passwordContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(selectedRowContext);
    const [isSelect,setIsSelect] = useContext(selectContext);
    const [iseRadio,setIsRadio] = useContext(radioContext);
    const [isComprobation,setIsComprobation] = useContext(formComprobationContext);
    const [isBlock,setIsBlock] = useContext(actionBlockContext);
    // Función del hook
    const closeModal = () => {
        if(currentMView === 'Status-Add'){
            setIsSelect([]);
            setIsRadio('');
        }
        if(currentMView === 'Status-Enable'){
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
    const [isOptionModal] = useContext(actionBlockContext);
    const [isBlock,setIsBlock] = useContext(formComprobationContext);
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