//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { TextFieldsSupplierContext } from "../../contexts/FormsProvider";
import { SuppliersContext,SupplierAddContext,SupplierEditContext,SupplierDeleteContext } from "../../contexts/SuppliersProvider";
import { SelectedRowContext } from "../../contexts/SelectedesProvider";
import { ActionBlockContext } from "../../contexts/VariablesProvider";
import { NavbarViewContext,SidebarViewContext,ModalViewContext } from "../../contexts/ViewsProvider";
// Estilos personalizados
import { Alert_Sonner_Promise } from "../../components/styled/Alerts";
//____________IMPORT/EXPORT____________

// Hook para agregar un proveedor desde el modal ✔️
export const HandleSupplierAdd = () => {
    // Constantes con el valor de los contextos 
    const [isSupplierAdd,setIsSupplierAdd] = useContext(SupplierAddContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsSupplier] = useContext(TextFieldsSupplierContext);
    const [isSuppliers] = useContext(SuppliersContext);
    // Función del hook
    const handleSupplierAdd = () => {
        if(currentNView === 'Proveedores' && currentSView === 'Proveedores' && currentMView === 'Proveedor-Agregar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsSupplier.nombre === '' || isTextFieldsSupplier.correo === ''){
                            setIsActionBlock(false);
                            return reject('¡Falta información del proveedor!')
                        };

                        if(isSuppliers.some(supplier => supplier.nombre === isTextFieldsSupplier.nombre)){
                            setIsActionBlock(false);
                            return reject('¡Proveedor ya existente!');
                        }

                        const regexNames = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9\s\-.,&()]+$/
                        const regexRFC = /^$|^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/
                        const regexAddress = /^$|^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9\s.,#\-\/°()]+$/
                        const regexPhone = /^$|^\d{7}$|^\d{8}$|^\d{10}$/
                        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                        if(!regexNames.test(isTextFieldsSupplier.nombre.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo puede contener letras, números, espacios y los siguientes caracteres: - . , & ( )!');
                        }

                        if(!regexRFC.test(isTextFieldsSupplier.rfc.trim())){
                            setIsActionBlock(false);
                            return reject('¡El RFC no es válido, solo acepta un RFC que inicia con 3 o 4 letras mayúsculas (incluye Ñ y &), seguido de 6 dígitos para la fecha, y termina con 3 caracteres alfanuméricos en mayúsculas o números!');
                        }

                        if(!regexAddress.test(isTextFieldsSupplier.domicilio.trim())){
                            setIsActionBlock(false);
                            return reject('¡El domicilio no es válido, solo acepta letras (mayúsculas y minúsculas, incluidas vocales con acentos y la Ñ), números, espacios y los caracteres especiales: punto, coma, numeral (#), guion, barra, símbolo de grado (°) y paréntesis!');
                        }

                        if(!regexPhone.test(isTextFieldsSupplier.telefono.trim())){
                            setIsActionBlock(false);
                            return reject('¡El teléfono no es válido, solo permite números de 7, 8 o 10 dígitos!');
                        }

                        if(!regexEmail.test(isTextFieldsSupplier.correo.trim())){
                            setIsActionBlock(false);
                            return reject('¡El correo no es válido, solo acepta una cadena sin espacios ni arrobas en la parte antes del @, seguida de un @, luego otra cadena sin espacios ni arrobas, un punto y finalmente otra cadena sin espacios ni arrobas!');
                        }

                        resolve('¡Información verificada!');
                        
                        setTimeout(() => {
                            return setIsSupplierAdd(true);
                        },1000);
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
    return handleSupplierAdd;
}
// Hook para editar un porveedor desde el modal ✔️
export const HandleSupplierEdit = () => {
    // Constantes con el valor de los contextos 
    const [isSupplierEdit,setIsSupplierEdit] = useContext(SupplierEditContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsSupplier] = useContext(TextFieldsSupplierContext);
    const [isSuppliers] = useContext(SuppliersContext);
    // Función del hook
    const handleSupplierEdit = () => {
        if(currentNView === 'Proveedores' && currentSView === 'Proveedores' && currentMView === 'Proveedor-Editar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsSupplier.nombre === isSelectedRow.nombre && isTextFieldsSupplier.rfc === isSelectedRow.rfc &&  isTextFieldsSupplier.domicilio === isSelectedRow.domicilio && isTextFieldsSupplier.telefono === isSelectedRow.telefono && isTextFieldsSupplier.correo === isSelectedRow.correo){
                            setIsActionBlock(false);
                            return reject('¡No hay información del proveedor modificada!')
                        };

                        if(isTextFieldsSupplier.nombre === '' || isTextFieldsSupplier.correo === ''){
                            setIsActionBlock(false);
                            return reject('¡Falta información del proveedor!')
                        };

                        if(isSelectedRow.nombre !== isTextFieldsSupplier.nombre){
                            if(isSuppliers.some(supplier => supplier.nombre === isTextFieldsSupplier.nombre)){
                                setIsActionBlock(false);
                                return reject('¡Proveedor ya existente!');
                            }
                        }

                        const regexNames = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9\s\-.,&()]+$/
                        const regexRFC = /^$|^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/
                        const regexAddress = /^$|^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9\s.,#\-\/°()]+$/
                        const regexPhone = /^$|^\d{7}$|^\d{8}$|^\d{10}$/
                        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                        if(!regexNames.test(isTextFieldsSupplier.nombre.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo puede contener letras, números, espacios y los siguientes caracteres: - . , & ( )!');
                        }

                        if(!regexRFC.test(isTextFieldsSupplier.rfc.trim())){
                            setIsActionBlock(false);
                            return reject('¡El RFC no es válido, solo acepta un RFC que inicia con 3 o 4 letras mayúsculas (incluye Ñ y &), seguido de 6 dígitos para la fecha, y termina con 3 caracteres alfanuméricos en mayúsculas o números!');
                        }

                        if(!regexAddress.test(isTextFieldsSupplier.domicilio.trim())){
                            setIsActionBlock(false);
                            return reject('¡El domicilio no es válido, solo acepta letras (mayúsculas y minúsculas, incluidas vocales con acentos y la Ñ), números, espacios y los caracteres especiales: punto, coma, numeral (#), guion, barra, símbolo de grado (°) y paréntesis!');
                        }

                        if(!regexPhone.test(isTextFieldsSupplier.telefono.trim())){
                            setIsActionBlock(false);
                            return reject('¡El teléfono no es válido, solo permite números de 7, 8 o 10 dígitos!');
                        }

                        if(!regexEmail.test(isTextFieldsSupplier.correo.trim())){
                            setIsActionBlock(false);
                            return reject('¡El correo no es válido, solo acepta una cadena sin espacios ni arrobas en la parte antes del @, seguida de un @, luego otra cadena sin espacios ni arrobas, un punto y finalmente otra cadena sin espacios ni arrobas!');
                        }
                        
                        resolve('¡Información verificada!');
                        
                        setTimeout(() => {
                            return setIsSupplierEdit(true);
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
    return handleSupplierEdit;
}
// Hook para eliminar un proveedor desde el modal ✔️
export const HandleSupplierDelete = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSupplierDelete,setIsSupplierDelete] = useContext(SupplierDeleteContext);
    // Función del hook
    const handleSupplierDelete = () => {
        if(currentNView === 'Proveedores' && currentSView === 'Proveedores' && currentMView === 'Proveedor-Eliminar'){
            setIsActionBlock(true);
            return setIsSupplierDelete(true);
        }
    } 
    // Retorno de la función del hook
    return handleSupplierDelete;
}