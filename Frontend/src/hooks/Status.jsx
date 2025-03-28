import { useContext } from "react";

import { statusEnableContext,statusDeleteContext,statusAddContext } from "../contexts/StatusProvider";
import { selectedRowContext,modalContext,optionModalContext,selectContext,radioContext,toastContext } from "../contexts/VariablesProvider";
import { navbarContext,sidebarContext } from "../contexts/ViewsProvider";

import { Alert_Verification } from "../components/styled/Notifications";

export const useAdd = () => {

    const [isStatusAdd,setIsStatusAdd] = useContext(statusAddContext);
    const [isToast,setIsToast] = useContext(toastContext);
    const [isSelect] = useContext(selectContext);
    const [isRadio] = useContext(radioContext);

    const [isNavbar] = useContext(navbarContext);
    const [isSidebar] = useContext(sidebarContext);
    const [isOptionModal] = useContext(optionModalContext);

    const add = () => {
        if(isNavbar === 'Estatus' && isSidebar === 'Usuarios' && isOptionModal === 'Agregar-Estatus'){
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

    return add;
}

export const useEnable = () => {

    const [isStatusEnable,setIsStatusEnable] = useContext(statusEnableContext);
    const [isOptionModal] = useContext(optionModalContext);
    const [isSelectedRow] = useContext(selectedRowContext);
    const [isNavbar] = useContext(navbarContext);
    const [isSidebar] = useContext(sidebarContext);

    const enable = () => {
        if(isSelectedRow !== null){
            if(isNavbar === 'Estatus' && isSidebar === 'Usuarios' && isOptionModal === 'Habilitar-Estatus'){
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
                setIsStatusDelete(isSelectedRow);
            }
        }
    }

    return Delete;
}