//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { TextFieldsSupplyCategoryContext,TextFieldsSupplyTypesContext,TextFieldsSupplyContext } from "../../contexts/FormsProvider";
import { SuppliersContext,DeletedSuppliersContext } from "../../contexts/SuppliersProvider";
import { DeletedSupplyTypesContext,DeletedSupplyCategoriesContext,SupplyCategoriesContext,SupplyCategoryAddContext,SupplyCategoryEditContext,SupplyCategoryDeleteContext,SupplyTypesContext,SupplyTypeAddContext,SupplyTypeEditContext,CountSupplyTypesContext,SupplyTypeCountAddContext,SupplyTypeDeleteContext,SuppliesContext,SupplyAddContext,SupplyEditContext,SupplyDeleteContext } from "../../contexts/SuppliesProvider";
import { SelectedRowContext } from "../../contexts/SelectedesProvider";
import { SearchTerm1Context,SearchTerm2Context,SearchTerm3Context } from "../../contexts/SearchsProvider";
import { ActionBlockContext } from "../../contexts/VariablesProvider";
import { NavbarViewContext,SidebarViewContext,ModalViewContext } from "../../contexts/ViewsProvider";
// Estilos personalizados
import { Alert_Sonner_Promise } from "../../components/styled/Alerts";
//____________IMPORT/EXPORT____________

// Hook para agregar una categoría de insumo desde el modal ✔️
export const HandleSupplyCategoryAdd = () => {
    // Constantes con el valor de los contextos 
    const [isSupplyCategoryAdd,setIsSupplyCategoryAdd] = useContext(SupplyCategoryAddContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsSupplyCategory] = useContext(TextFieldsSupplyCategoryContext);
    const [isSupplyCategories] = useContext(SupplyCategoriesContext);
    // Función del hook
    const handleSupplyCategoryAdd = () => {
        if(currentNView === 'Categorias por insumo' && currentSView === 'Insumos' && currentMView === 'Categoria-Agregar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsSupplyCategory.nombre === ''){
                            setIsActionBlock(false);
                            return reject('¡Falta información de la categoría!')
                        };

                        if(isSupplyCategories.some(category => category.nombre === isTextFieldsSupplyCategory.nombre)){
                            setIsActionBlock(false);
                            return reject('¡Categoría ya existente!');
                        }

                        const regexNames = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9\s\-.,&()]+$/
                        const regexDescriptions = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]*$/;

                        if(!regexNames.test(isTextFieldsSupplyCategory.nombre.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo puede contener letras, números, espacios y los siguientes caracteres: - . , & ( )!');
                        }

                        if(!regexDescriptions.test(isTextFieldsSupplyCategory.descripcion.trim())){
                            setIsActionBlock(false);
                            return reject('¡La descripción no es válida, solo puede contener letras, números, espacios y los siguientes signos: punto, coma, punto y coma, dos puntos, guiones y paréntesis!');
                        }

                        resolve('¡Información verificada!');
                        
                        setTimeout(() => {
                            return setIsSupplyCategoryAdd(true);
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
    return handleSupplyCategoryAdd;
}
// Hook para editar una categoría de insumo desde el modal ✔️
export const HandleSupplyCategoryEdit = () => {
    // Constantes con el valor de los contextos 
    const [isSupplyCategoryEdit,setIsSupplyCategoryEdit] = useContext(SupplyCategoryEditContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsSupplyCategory] = useContext(TextFieldsSupplyCategoryContext);
    const [isSupplyCategories] = useContext(SupplyCategoriesContext);
    // Función del hook
    const handleSupplyCategoryEdit = () => {
        if(currentNView === 'Categorias por insumo' && currentSView === 'Insumos' && currentMView === 'Categoria-Editar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isSelectedRow.nombre === isTextFieldsSupplyCategory.nombre && isSelectedRow.descripcion === isTextFieldsSupplyCategory.descripcion){
                            setIsActionBlock(false);
                            return reject('¡No hay información de la categoría modificada!')
                        }

                        if(isTextFieldsSupplyCategory.nombre === ''){
                            setIsActionBlock(false);
                            return reject('¡Falta información de la categoría!')
                        };

                        if(isSelectedRow.nombre !== isTextFieldsSupplyCategory.nombre){
                            if(isSupplyCategories.some(category => category.nombre === isTextFieldsSupplyCategory.nombre)){
                                setIsActionBlock(false);
                                return reject('Categoría ya existente!');
                            }
                        }   

                        const regexNames = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9\s\-.,&()]+$/
                        const regexDescriptions = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]*$/;

                        if(!regexNames.test(isTextFieldsSupplyCategory.nombre.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo puede contener letras, números, espacios y los siguientes caracteres: - . , & ( )!');
                        }

                        if(!regexDescriptions.test(isTextFieldsSupplyCategory.descripcion.trim())){
                            setIsActionBlock(false);
                            return reject('¡La descripción no es válida, solo puede contener letras, números, espacios y los siguientes signos: punto, coma, punto y coma, dos puntos, guiones y paréntesis!');
                        }

                        resolve('¡Información verificada!');
                    
                        setTimeout(() => {
                            return setIsSupplyCategoryEdit(true);
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
    return handleSupplyCategoryEdit;
}
// Hook para eliminar una categoría de insumo desde el modal ✔️
export const HandleSupplyCategoryDelete = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSupplyCategoryDelete,setIsSupplyCategoryDelete] = useContext(SupplyCategoryDeleteContext);
    // Función del hook
    const handleSupplyCategoryDelete = () => {
        if(currentNView === 'Categorias por insumo' && currentSView === 'Insumos' && currentMView === 'Categoria-Eliminar'){
            setIsActionBlock(true);
            return setIsSupplyCategoryDelete(true);
        }
    } 
    // Retorno de la función del hook
    return handleSupplyCategoryDelete;
}
// Hook para filtrar las categorias sin eliminar ✔️
export const FilteredRecordsSupplyCategoriesDeleted = () => {
    // Constantes con el valor de los contextos 
    const [isSupplyCategories] = useContext(SupplyCategoriesContext); 
    const [isDeletedSupplyCategories] = useContext(DeletedSupplyCategoriesContext);
    // Función del hook
    const filtered = isSupplyCategories.filter((data) => {
        const isDeleted = isDeletedSupplyCategories.some(category => category.idcategoria === data.idcategoria);
        if (isDeleted) return false;
        
        return true;
    });
    // Retorno de la función del hook
    return filtered;
}
// Hook para agregar un tipo de insumo desde el modal ✔️
export const HandleSupplyTypeAdd = () => {
    // Constantes con el valor de los contextos 
    const [isSupplyTypeAdd,setIsSupplyTypeAdd] = useContext(SupplyTypeAddContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsSupplyType] = useContext(TextFieldsSupplyTypesContext);
    const [isSupplyTypes] = useContext(SupplyTypesContext);
    // Función del hook
    const handleSupplyTypeAdd = () => {
        if(currentNView === 'Tipos de insumo' && currentSView === 'Insumos' && currentMView === 'Tipo-Insumo-Agregar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsSupplyType.tipo === '' || isTextFieldsSupplyType.unidad === '' || isTextFieldsSupplyType.idcategoria === 0 || isTextFieldsSupplyType.limite === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información del tipo de insumo!')
                        };

                        if(isSupplyTypes.some(type => type.tipo === isTextFieldsSupplyType.tipo)){
                            setIsActionBlock(false);
                            return reject('Tipo de insumo ya existente!');
                        }

                        const regexNames = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9\s\-.,&()]+$/
                        const regexDescriptions = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]*$/;

                        if(!regexNames.test(isTextFieldsSupplyType.tipo.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo puede contener letras, números, espacios y los siguientes caracteres: - . , & ( )!');
                        }

                        if(!regexDescriptions.test(isTextFieldsSupplyType.descripcion.trim())){
                            setIsActionBlock(false);
                            return reject('¡La descripción no es válida, solo puede contener letras, números, espacios y los siguientes signos: punto, coma, punto y coma, dos puntos, guiones y paréntesis!');
                        }

                        if(isTextFieldsSupplyType.limite <= 0){
                            setIsActionBlock(false);
                            return reject('¡La cantidad mínima no es válida, debe de ser mayor a 0!');
                        }

                        if(isTextFieldsSupplyType.limite > 999999.9999){
                            setIsActionBlock(false);
                            return reject('¡La cantidad mínima no es válida, excede el valor máximo posible!');
                        }

                        if(isTextFieldsSupplyType.unidad === 'Kilogramo' || isTextFieldsSupplyType.unidad === 'Litro'){
                            const regexNumbers = /^\d+(\.\d{1,4})?$/;

                            if(!regexNumbers.test(isTextFieldsSupplyType.limite)){
                                setIsActionBlock(false);
                                return reject('¡La cantidad mínima no es válida, solo puede contener números decimales de hasta 4 dígitos decimales o enteros!');
                            }
                        }

                        if(isTextFieldsSupplyType.unidad === 'Pieza'){
                            const regexNumbers = /^\d+$/;  

                            if(!regexNumbers.test(isTextFieldsSupplyType.limite)){
                                setIsActionBlock(false);
                                return reject('¡La cantidad mínima no es válida, solo puede contener números enteros!');
                            }
                        }

                        resolve('¡Información verificada!');
                        
                        setTimeout(() => {
                            return setIsSupplyTypeAdd(true);
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
    return handleSupplyTypeAdd;
}
// Hook para editar un tipo de insumo desde el modal ✔️
export const HandleSupplyTypeEdit = () => {
    // Constantes con el valor de los contextos 
    const [isSupplyTypeEdit,setIsSupplyTypeEdit] = useContext(SupplyTypeEditContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsSupplyType] = useContext(TextFieldsSupplyTypesContext);
    const [isSupplyTypes] = useContext(SupplyTypesContext);
    // Función del hook
    const handleSupplyTypeEdit = () => {
        if(currentNView === 'Tipos de insumo' && currentSView === 'Insumos' && currentMView === 'Tipo-Insumo-Editar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isSelectedRow.tipo === isTextFieldsSupplyType.tipo && isSelectedRow.descripcion === isTextFieldsSupplyType.descripcion && isSelectedRow.unidad === isTextFieldsSupplyType.unidad && isSelectedRow.idcategoria === isTextFieldsSupplyType.idcategoria && isSelectedRow.limite === isTextFieldsSupplyType.limite){
                            setIsActionBlock(false);
                            return reject('¡No hay información del tipo de insumo modificada!')
                        }

                        if(isTextFieldsSupplyType.tipo === '' || isTextFieldsSupplyType.unidad === '' || isTextFieldsSupplyType.idcategoria === 0 || isTextFieldsSupplyType.limite === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información del tipo de insumo!')
                        };

                        if(isSelectedRow.tipo !== isTextFieldsSupplyType.tipo){
                            if(isSupplyTypes.some(type => type.tipo === isTextFieldsSupplyType.tipo)){
                                setIsActionBlock(false);
                                return reject('Tipo de insumo ya existente!');
                            }
                        }

                        const regexNames = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9\s\-.,&()]+$/
                        const regexDescriptions = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]*$/;

                        if(!regexNames.test(isTextFieldsSupplyType.tipo.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo puede contener letras, números, espacios y los siguientes caracteres: - . , & ( )!');
                        }

                        if(!regexDescriptions.test(isTextFieldsSupplyType.descripcion.trim())){
                            setIsActionBlock(false);
                            return reject('¡La descripción no es válida, solo puede contener letras, números, espacios y los siguientes signos: punto, coma, punto y coma, dos puntos, guiones y paréntesis!');
                        }

                        if(isTextFieldsSupplyType.limite <= 0){
                            setIsActionBlock(false);
                            return reject('¡La cantidad mínima no es válida, debe de ser mayor a 0!');
                        }

                        if(isTextFieldsSupplyType.limite > 999999.9999){
                            setIsActionBlock(false);
                            return reject('¡La cantidad mínima no es válida, excede el valor máximo posible!');
                        }

                        if(isTextFieldsSupplyType.unidad === 'Kilogramo' || isTextFieldsSupplyType.unidad === 'Litro'){
                            const regexNumbers = /^\d+(\.\d{1,4})?$/;

                            if(!regexNumbers.test(isTextFieldsSupplyType.limite)){
                                setIsActionBlock(false);
                                return reject('¡La cantidad mínima no es válida, solo puede contener números decimales de hasta 4 dígitos decimales o enteros!');
                            }
                        }

                        if(isTextFieldsSupplyType.unidad === 'Pieza'){
                            const regexNumbers = /^\d+$/;  

                            if(!regexNumbers.test(isTextFieldsSupplyType.limite)){
                                setIsActionBlock(false);
                                return reject('¡La cantidad mínima no es válida, solo puede contener números enteros!');
                            }
                        }

                        resolve('¡Información verificada!');
                        
                        setTimeout(() => {
                            return setIsSupplyTypeEdit(true);
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
    return handleSupplyTypeEdit;
}
// Hook para agregar cantidades a un tipo de insumo desde el modal ✔️
export const HandleCountSupplyTypeAdd = () => {
    // Constantes con el valor de los contextos 
    const [isSupplyTypeCountAdd,setIsSupplyTypeCountAdd] = useContext(SupplyTypeCountAddContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsSupplyType] = useContext(TextFieldsSupplyTypesContext);
    const [isCountSupplyTypes] = useContext(CountSupplyTypesContext);
    // Función del hook
    const handleCountSupplyTypeAdd = () => {
        if(currentNView === 'Tipos de insumo' && currentSView === 'Insumos' && currentMView === 'Tipo-Insumo-Cantidad-Agregar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsSupplyType.cantidades[0].cantidad === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información de la cantidad de tipo de insumo!')
                        };

                        if(isCountSupplyTypes.some(count => count.idtipo === isTextFieldsSupplyType.idtipo && count.cantidad === parseFloat(isTextFieldsSupplyType.cantidades[0].cantidad))){
                            setIsActionBlock(false);
                            return reject('¡Cantidad ya existente al tipo de insumo!');
                        }

                        if(isTextFieldsSupplyType.cantidades[0].cantidad <= 0){
                            setIsActionBlock(false);
                            return reject('¡La cantidad no es válida, debe de ser mayor a 0!');
                        }

                        if(isTextFieldsSupplyType.cantidades[0].cantidad > 999999.9999){
                            setIsActionBlock(false);
                            return reject('¡La cantidad no es válida, excede el valor máximo posible!');
                        }

                        if(isTextFieldsSupplyType.unidad === 'Kilogramo' || isTextFieldsSupplyType.unidad === 'Litro'){
                            const regexNumbers = /^\d+(\.\d{1,4})?$/;

                            if(!regexNumbers.test(isTextFieldsSupplyType.cantidades[0].cantidad)){
                                setIsActionBlock(false);
                                return reject('¡La cantidad no es válida, solo puede contener números decimales de hasta 4 dígitos decimales o enteros!');
                            }
                        }

                        if(isTextFieldsSupplyType.unidad === 'Pieza'){
                            const regexNumbers = /^\d+$/;  

                            if(!regexNumbers.test(isTextFieldsSupplyType.cantidades[0].cantidad)){
                                setIsActionBlock(false);
                                return reject('¡La cantidad no es válida, solo puede contener números enteros!');
                            }
                        }

                        resolve('¡Información verificada!');
                        
                        setTimeout(() => {
                            return setIsSupplyTypeCountAdd(true);
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
    return handleCountSupplyTypeAdd;
}
// Hook para eliminar un tipo de insumo desde el modal ✔️
export const HandleSupplyTypeDelete = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSupplyTypeDelete,setIsSupplyTypeDelete] = useContext(SupplyTypeDeleteContext);
    // Función del hook
    const handleSupplyTypeDelete = () => {
        if(currentNView === 'Tipos de insumo' && currentSView === 'Insumos' && currentMView === 'Tipo-Insumo-Eliminar'){
            setIsActionBlock(true);
            return setIsSupplyTypeDelete(true);
        }
    } 
    // Retorno de la función del hook
    return handleSupplyTypeDelete;
}
// Hook para filtrar los proveedores ✔️
export const FilteredRecordsSuppliers = () => {
    // Constantes con el valor de los contextos 
    const [isSearchTerm1] = useContext(SearchTerm1Context); 
    const [isSuppliers] = useContext(SuppliersContext);
    const [isDeletedSuppliers] = useContext(DeletedSuppliersContext);
    // Función del hook
    const filtered = isSuppliers.filter((data) => {
        const isDeleted = isDeletedSuppliers.some(supplier => supplier.idproveedor === data.idproveedor);
        if (isDeleted) return false;
        
        return data.nombre.toLowerCase().includes(isSearchTerm1.toLowerCase());;
    });
    // Retorno de la función del hook
    return filtered;
}
// Hook para filtrar los proveedores sin eliminar ✔️
export const FilteredRecordsSuppliersDeleted = () => {
    // Constantes con el valor de los contextos 
    const [isSuppliers] = useContext(SuppliersContext); 
    const [isDeletedSuppliers] = useContext(DeletedSuppliersContext);
    // Función del hook
    const filtered = isSuppliers.filter((data) => {
        const isDeleted = isDeletedSuppliers.some(supplier => supplier.idproveedor === data.idproveedor);
        if (isDeleted) return false;
        
        return true;
    });
    // Retorno de la función del hook
    return filtered;
}
// Hook para filtrar las categorias por insumo ✔️
export const FilteredRecordsSupplyCategories = () => {
    // Constantes con el valor de los contextos 
    const [isSearchTerm2] = useContext(SearchTerm2Context); 
    const [isSupplyCategories] = useContext(SupplyCategoriesContext); 
    const [isDeletedSupplyCategories] = useContext(DeletedSupplyCategoriesContext);
    // Función del hook
    const filtered = isSupplyCategories.filter((data) => {
        const isDeleted = isDeletedSupplyCategories.some(category => category.idcategoria === data.idcategoria);
        if (isDeleted) return false;
        
        return data.nombre.toLowerCase().includes(isSearchTerm2.toLowerCase());
    });
    // Retorno de la función del hook
    return filtered;
}
// Hook para filtrar los tipos de insumo ✔️
export const FilteredRecordsSupplyTypes = () => {
    // Constantes con el valor de los contextos 
    const [isSearchTerm3] = useContext(SearchTerm3Context); 
    const [isSupplyTypes] = useContext(SupplyTypesContext);
    const [isDeletedSupplyTypes] = useContext(DeletedSupplyTypesContext);
    const [isTextFieldsSupply] = useContext(TextFieldsSupplyContext);
    // Función del hook
    const filtered = isSupplyTypes.filter((data) => {
        if(data.idcategoria === isTextFieldsSupply.idcategoria){
            const isDeleted = isDeletedSupplyTypes.some(type => type.idtipo === data.idtipo);
            if (isDeleted) return false;
                
            return data.tipo.toLowerCase().includes(isSearchTerm3.toLowerCase())
        }
    });
    // Retorno de la función del hook
    return filtered;
}
// Hook para filtrar las cantidades de los tipos de insumo ✔️
export const FilteredRecordsCountSupplyTypes = () => {
    // Constantes con el valor de los contextos 
    const [isCountSupplyTypes] = useContext(CountSupplyTypesContext); 
    const [isDeletedSupplyTypes] = useContext(DeletedSupplyTypesContext);
    const [isTextFieldsSupply] = useContext(TextFieldsSupplyContext);
    // Función del hook
    const filtered = isCountSupplyTypes.filter((data) => {
        if(data.idtipo === isTextFieldsSupply.idtipo){
            const isDeleted = isDeletedSupplyTypes.some(type => type.idtipo === data.idtipo);
            if (isDeleted) return false;
                
            return true;
        }
    });
    // Retorno de la función del hook
    return filtered;
}
// Hook para agregar un insumo desde el modal ✔️
export const HandleSupplyAdd = () => {
    // Constantes con el valor de los contextos 
    const [isSupplyAdd,setIsSupplyAdd] = useContext(SupplyAddContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsSupply] = useContext(TextFieldsSupplyContext);
    const [isSupplies] = useContext(SuppliesContext);
    // Función del hook
    const handleSupplyAdd = () => {
        if(currentNView === 'Insumos' && currentSView === 'Insumos' && currentMView === 'Insumo-Agregar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsSupply.nombre === '' || isTextFieldsSupply.idproveedor === 0 || isTextFieldsSupply.idcategoria === 0 || isTextFieldsSupply.idtipo === 0 || isTextFieldsSupply.idcantidad === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información del insumo!')
                        };

                        if(isSupplies.some(supply => supply.nombre === isTextFieldsSupply.nombre && supply.idproveedor === isTextFieldsSupply.idproveedor)){
                            setIsActionBlock(false);
                            return reject('Insumo ya existente!');
                        }

                        const regexNames = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9\s\-.,&()]+$/
                        const regexDescriptions = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]*$/;

                        if(!regexNames.test(isTextFieldsSupply.nombre.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo puede contener letras, números, espacios y los siguientes caracteres: - . , & ( )!');
                        }

                        if(!regexDescriptions.test(isTextFieldsSupply.descripcion.trim())){
                            setIsActionBlock(false);
                            return reject('¡La descripción no es válida, solo puede contener letras, números, espacios y los siguientes signos: punto, coma, punto y coma, dos puntos, guiones y paréntesis!');
                        }

                        if(isTextFieldsSupply.imagen){
                            try{
                                new URL(isTextFieldsSupply.imagen.trim());
                            }catch(e){
                                setIsActionBlock(false);
                                return reject('¡La dirección URL de la imagen no es valida!');
                            }
                        }

                        resolve('¡Información verificada!');
                        
                        setTimeout(() => {
                            return setIsSupplyAdd(true);
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
    return handleSupplyAdd;
}
// Hook para editar un insumo desde el modal ✔️
export const HandleSupplyEdit = () => {
    // Constantes con el valor de los contextos 
    const [isSupplyEdit,setIsSupplyEdit] = useContext(SupplyEditContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsSupply] = useContext(TextFieldsSupplyContext);
    const [isSupplies] = useContext(SuppliesContext);
    // Función del hook
    const handleSupplyEdit = () => {
        if(currentNView === 'Insumos' && currentSView === 'Insumos' && currentMView === 'Insumo-Editar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isSelectedRow.nombre === isTextFieldsSupply.nombre && isSelectedRow.descripcion === isTextFieldsSupply.descripcion && isSelectedRow.imagen === isTextFieldsSupply.imagen && isSelectedRow.idproveedor === isTextFieldsSupply.idproveedor && isSelectedRow.idtipo === isTextFieldsSupply.idtipo && isSelectedRow.idcategoria === isTextFieldsSupply.idcategoria && isSelectedRow.idcantidad === isTextFieldsSupply.idcantidad){
                            setIsActionBlock(false);
                            return reject('¡No hay información del insumo modificada!')
                        }

                        if(isTextFieldsSupply.nombre === '' || isTextFieldsSupply.idproveedor === 0 || isTextFieldsSupply.idcategoria === 0 || isTextFieldsSupply.idtipo === 0 || isTextFieldsSupply.idcantidad === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información del insumo!')
                        };

                        if(isSelectedRow.nombre !== isTextFieldsSupply.nombre){
                            if(isSupplies.some(supply => supply.nombre === isTextFieldsSupply.nombre && supply.idproveedor === isTextFieldsSupply.idproveedor)){
                                setIsActionBlock(false);
                                return reject('Insumo ya existente!');
                            }
                        }

                        const regexNames = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9\s\-.,&()]+$/
                        const regexDescriptions = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]*$/;

                        if(!regexNames.test(isTextFieldsSupply.nombre.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo puede contener letras, números, espacios y los siguientes caracteres: - . , & ( )!');
                        }

                        if(!regexDescriptions.test(isTextFieldsSupply.descripcion.trim())){
                            setIsActionBlock(false);
                            return reject('¡La descripción no es válida, solo puede contener letras, números, espacios y los siguientes signos: punto, coma, punto y coma, dos puntos, guiones y paréntesis!');
                        }

                        if(isTextFieldsSupply.imagen){
                            try{
                                new URL(isTextFieldsSupply.imagen.trim());
                            }catch(e){
                                setIsActionBlock(false);
                                return reject('¡La dirección URL de la imagen no es valida!');
                            }
                        }

                        resolve('¡Información verificada!');
                        
                        setTimeout(() => {
                            return setIsSupplyEdit(true);
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
    return handleSupplyEdit;
}
// Hook para eliminar un insumo desde el modal ✔️
export const HandleSupplyDelete = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSupplyDelete,setIsSupplyDelete] = useContext(SupplyDeleteContext);
    // Función del hook
    const handleSupplyDelete = () => {
        if(currentNView === 'Insumos' && currentSView === 'Insumos' && currentMView === 'Insumo-Eliminar'){
            setIsActionBlock(true);
            return setIsSupplyDelete(true);
        }
    } 
    // Retorno de la función del hook
    return handleSupplyDelete;
}