//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { TextFieldsMenuTypeContext } from "../../contexts/FormsProvider";
import { MenuTypeAddContext,MenuTypesContext } from "../../contexts/MenusProvider";
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