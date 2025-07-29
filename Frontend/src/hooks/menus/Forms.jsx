//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { TextFieldsMenuTypeContext } from "../../contexts/FormsProvider";
import { MenuTypeAddContext,MenuTypesContext,MenuTypeEditContext,MenuTypeDeleteContext,MenuTypeUbicationsContext } from "../../contexts/MenusProvider";
import { SelectedRowContext } from "../../contexts/SelectedesProvider";
import { ActionBlockContext } from "../../contexts/VariablesProvider";
import { NavbarViewContext,SidebarViewContext,ModalViewContext } from "../../contexts/ViewsProvider";
// Estilos personalizados
import { Alert_Sonner_Promise } from "../../components/styled/Alerts";
//____________IMPORT/EXPORT____________

// Hook para agregar un tipo de menú desde el modal ✔️
export const HandleMenuTypeAdd = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsMenuType] = useContext(TextFieldsMenuTypeContext); 
    const [isMenuTypeAdd,setIsMenuTypeAdd] = useContext(MenuTypeAddContext);
    const [isMenuTypes] = useContext(MenuTypesContext);
    // Función del hook
    const handleMenuTypeAdd = () => {
        if(currentNView === 'Menus' && currentSView === 'Menus' && currentMView === 'Tipo-Menu-Agregar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsMenuType.nombre === ''){
                            setIsActionBlock(false);
                            return reject('¡Falta información del menú!')
                        };

                        if(isMenuTypes.some(type => type.nombre === isTextFieldsMenuType.nombre)){
                            setIsActionBlock(false);
                            return reject('Menú ya existente!');
                        }

                        const regexNames = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

                        if(!regexNames.test(isTextFieldsMenuType.nombre.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo permite letras y espacios!');
                        }

                        resolve('¡Información verificada!');
                        
                        setTimeout(() => {
                            return setIsMenuTypeAdd(true);
                        },1000)
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Verificando información!','1');
        }
    } 
    // Retorno de la función del hook
    return handleMenuTypeAdd;
}
// Hook para editar un tipo de menú desde el modal ✔️
export const HandleMenuTypeEdit = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsMenuType] = useContext(TextFieldsMenuTypeContext); 
    const [isMenuTypeEdit,setIsMenuTypeEdit] = useContext(MenuTypeEditContext);
    const [isMenuTypeUbications] = useContext(MenuTypeUbicationsContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [isMenuTypes] = useContext(MenuTypesContext);
    // Función del hook
    const handleMenuTypeEdit = () => {
        if(currentNView === 'Menus' && currentSView === 'Menus' && currentMView === 'Tipo-Menu-Editar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {

                        const cocina = isMenuTypeUbications.some(type => type.idtipo === isSelectedRow.idtipo && type.idubicacion === 1) ? 1 : 0;
                        const nutriologia = isMenuTypeUbications.some(type => type.idtipo === isSelectedRow.idtipo && type.idubicacion === 2) ? 1 : 0;
                        const areaMedica = isMenuTypeUbications.some(type => type.idtipo === isSelectedRow.idtipo && type.idubicacion === 3) ? 1 : 0;

                        if(isTextFieldsMenuType.nombre === isSelectedRow.nombre && 
                           isTextFieldsMenuType.cocina ===  cocina && 
                           isTextFieldsMenuType.nutriologia === nutriologia && 
                           isTextFieldsMenuType.areaMedica === areaMedica){
                            setIsActionBlock(false);
                            return reject('¡No hay información modificada!');
                        }

                        if(isTextFieldsMenuType.nombre === ''){
                            setIsActionBlock(false);
                            return reject('¡Falta información del menú!')
                        };

                        if(isTextFieldsMenuType.nombre !== isSelectedRow.nombre){
                            if(isMenuTypes.some(type => type.nombre === isTextFieldsMenuType.nombre)){
                                setIsActionBlock(false);
                                return reject('¡Menú ya existente!');
                            }
                        }

                        const regexNames = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

                        if(!regexNames.test(isTextFieldsMenuType.nombre.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo permite letras y espacios!');
                        }

                        resolve('¡Información verificada!');
                        
                        setTimeout(() => {
                            return setIsMenuTypeEdit(true);
                        },1000)
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Verificando información!','1');
        }
    } 
    // Retorno de la función del hook
    return handleMenuTypeEdit;
}
// Hook para eliminar un tipo de menú desde el modal ✔️
export const HandleMenuTypeDelete = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isMenuTypeDelete,setIsMenuTypeDelete] = useContext(MenuTypeDeleteContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    // Función del hook
    const handleMenuTypeDelete = () => {
        if(currentNView === 'Menus' && currentSView === 'Menus' && currentMView === 'Tipo-Menu-Eliminar'){
            setIsActionBlock(true);
            return setIsMenuTypeDelete(true);
        }
    } 
    // Retorno de la función del hook
    return handleMenuTypeDelete;
}