import { useContext } from "react";

import { statusEnableContext,statusDeleteContext } from "../contexts/StatusProvider";
import { selectedRowContext,modalContext,optionModalContext } from "../contexts/VariablesProvider";
import { navbarContext,sidebarContext } from "../contexts/ViewsProvider";

export const useAdd = () => {

    const [isStatusAdd,setIsStatusAdd] = useContext(statusDeleteContext);
    const [isModal,setIsModal] = useContext(modalContext);
    const [isOptionModal,setIsOptionModal] = useContext(optionModalContext);
    const [isSelectedRow] = useContext(selectedRowContext);
    const [isNavbar] = useContext(navbarContext);
    const [isSidebar] = useContext(sidebarContext);

    const add = () => {
        if(isSelectedRow !== null){
            if(isNavbar === 'Estatus' && isSidebar === 'Usuarios' && isOptionModal === 'Agregar-Estatus'){
                setIsModal(false);
                setIsOptionModal('');
                setIsStatusAdd();
            }
        }
    } 

    return add;
}

export const useEnable = () => {

    const [isStatusEnable,setIsStatusEnable] = useContext(statusEnableContext);
    const [isModal,setIsModal] = useContext(modalContext);
    const [isOptionModal,setIsOptionModal] = useContext(optionModalContext);
    const [isSelectedRow] = useContext(selectedRowContext);
    const [isNavbar] = useContext(navbarContext);
    const [isSidebar] = useContext(sidebarContext);

    const enable = () => {
        if(isSelectedRow !== null){
            if(isNavbar === 'Estatus' && isSidebar === 'Usuarios' && isOptionModal === 'Habilitar-Estatus'){
                setIsModal(false);
                setIsOptionModal('');
                setIsStatusEnable(isSelectedRow);
            }
        }
    }

    return enable;
}

export const useDelete = () => {

    const [isStatusDelete,setIsStatusDelete] = useContext(statusDeleteContext);
    const [isModal,setIsModal] = useContext(modalContext);
    const [isOptionModal,setIsOptionModal] = useContext(optionModalContext);
    const [isSelectedRow] = useContext(selectedRowContext);
    const [isNavbar] = useContext(navbarContext);
    const [isSidebar] = useContext(sidebarContext);

    const Delete = () => {
        if(isSelectedRow !== null){
            if(isNavbar === 'Estatus' && isSidebar === 'Usuarios' && isOptionModal === 'Eliminar-Estatus'){
                setIsModal(false);
                setIsOptionModal('');
                setIsStatusDelete(isSelectedRow);
            }
        }
    }

    return Delete;
}