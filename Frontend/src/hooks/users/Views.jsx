//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalViewContext,ModalContext,SubModalContext } from "../../contexts/ViewsProvider";
import { AnimationContext,ActionBlockContext,VerificationBlockContext } from "../../contexts/VariablesProvider";
import { SelectedRowContext } from "../../contexts/SelectedesProvider";
// Hooks personalizados
import { ResetTextFieldsUser,ResetTextFieldsPermissions,ResetTextFieldsStatus } from "./Texts";
import { ResetSearchTerms,ResetSelectedOptions } from "../Texts";
//____________IMPORT/EXPORT____________

// Hook para cambiar el modal ✔️
export const HandleModalViewUsers = () => {
    // Constantes con el valor de los contextos
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isAnimation,setIsAnimation] = useContext(AnimationContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSubModal,setIsSubModal] = useContext(SubModalContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const resetSearchTerms = ResetSearchTerms();
    const resetSelectedOptions = ResetSelectedOptions();
    const resetTextFieldsUser = ResetTextFieldsUser();
    const resetTextFieldsPermissions = ResetTextFieldsPermissions();
    const resetTextFieldsStatus = ResetTextFieldsStatus();
    // Función del hook
    const handleModalViewUsers = (View) => {
        setIsModal(true);
        sessionStorage.setItem('Estado del Modal',true);
        const route = sessionStorage.getItem('Ruta');
        // USUARIOS
        if(currentMView === 'Usuario-Agregar' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Estado del Modal',false);
                setIsSubModal(false);
                sessionStorage.removeItem('Estado del Sub-Modal');
                setIsAnimation(false);
                sessionStorage.removeItem('Animación');
                resetTextFieldsUser();
                resetTextFieldsPermissions();
                resetTextFieldsStatus();
                setIsActionBlock(false);
                navigate(route,{ replace: true });
            },750);
        }
        if(currentMView === 'Usuario-Ver-Contraseña' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Estado del Modal',false);
                resetTextFieldsUser();
                resetTextFieldsPermissions();
                resetTextFieldsStatus();
                setIsActionBlock(false);
                setIsVerificationBlock(false);
                sessionStorage.removeItem('Acción del Bloqueo');
                sessionStorage.removeItem('Verificación del Bloqueo');
                navigate(route,{ replace: true });
            },750);
        }
        if(currentMView === 'Usuario-Editar' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Estado del Modal',false);
                setIsSelectedRow(null);
                setIsActionBlock(false);
                navigate(route,{ replace: true });
            },750);
        }
        if(currentMView === 'Usuario-Eliminar' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Estado del Modal',false);
                setIsSelectedRow(null);
                setIsActionBlock(false);
                setIsVerificationBlock(false);
                sessionStorage.removeItem('Acción del Bloqueo');
                sessionStorage.removeItem('Verificación del Bloqueo');
                navigate(route,{ replace: true });
            },750);
        }
        if(currentMView === 'Permisos-Agregar' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Estado del Modal',false);
                resetTextFieldsUser();
                resetTextFieldsPermissions();
                resetTextFieldsStatus();
                setIsActionBlock(false);
                navigate(route,{ replace: true });
            },750);
        }
        if(currentMView === 'Permisos-Editar' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Estado del Modal',false);
                setIsActionBlock(false);
                setIsSelectedRow(null);
                navigate(route,{ replace: true });
            },750);
        }
        if(currentMView === 'Permiso-Super-Administrador' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Estado del Modal',false);
                setIsActionBlock(false);
                setIsSelectedRow(null);
                setIsVerificationBlock(false);
                sessionStorage.removeItem('Acción del Bloqueo');
                sessionStorage.removeItem('Verificación del Bloqueo');
                navigate(route,{ replace: true });
            },750);
        }
        if(currentMView === 'Estatus-Agregar' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Estado del Modal',false);
                setIsActionBlock(false);
                resetTextFieldsUser();
                resetTextFieldsPermissions();
                resetTextFieldsStatus();
                navigate(route,{ replace: true });
            },750);
        }
        if(currentMView === 'Estatus-Habilitar' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Estado del Modal',false);
                setIsActionBlock(false);
                setIsVerificationBlock(false);
                setIsSelectedRow(null);
                sessionStorage.removeItem('Acción del Bloqueo');
                sessionStorage.removeItem('Verificación del Bloqueo');
                navigate(route,{ replace: true });
            },750);
        }
        // USUARIOS
        setCurrentMView(View);
        sessionStorage.setItem('Vista del Modal',View);
        resetSelectedOptions();
        resetSearchTerms();
    }
    // Retorno de la función del hook
    return handleModalViewUsers;
}