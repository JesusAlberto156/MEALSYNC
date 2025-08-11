//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { TextFieldsCleaningCategoryContext,TextFieldsCleaningSupplyContext,TextFieldsFixedExpenseContext,TextFieldsCleaningTypeContext } from "../../contexts/FormsProvider";
import { SuppliersContext,DeletedSuppliersContext } from "../../contexts/SuppliersProvider";
import { SuppliesContext } from "../../contexts/SuppliesProvider";
import { CleaningCategoriesContext,CleaningTypeAddContext,CleaningTypesContext,DeletedCleaningTypesContext,CountCleaningTypesContext,CountCleaningTypeAddContext,CleaningTypeEditContext,CleaningTypeDeleteContext,CleaningCategoryAddContext,DeletedCleaningCategoriesContext,FixedExpensesContext,FixedExpenseAddContext,FixedExpenseEditContext,FixedExpenseDeleteContext,CleaningSuppliesContext,CleaningSupplyAddContext,CleaningSupplyEditContext,CleaningSupplyDeleteContext,CleaningCategoryEditContext,CleaningCategoryDeleteContext } from "../../contexts/ExtrasProvider";
import { SelectedRowContext } from "../../contexts/SelectedesProvider";
import { SearchTerm1Context,SearchTerm2Context,SearchTerm3Context } from "../../contexts/SearchsProvider";
import { ActionBlockContext } from "../../contexts/VariablesProvider";
import { NavbarViewContext,SidebarViewContext,ModalViewContext } from "../../contexts/ViewsProvider";
// Estilos personalizados
import { Alert_Sonner_Promise } from "../../components/styled/Alerts";
//____________IMPORT/EXPORT____________

// Hook para agregar una categoría de limpieza desde el modal ✔️
export const HandleCleaningCategoryAdd = () => {
    // Constantes con el valor de los contextos 
    const [isCleaningCategoryAdd,setIsCleaningCategoryAdd] = useContext(CleaningCategoryAddContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsCleaningCategory] = useContext(TextFieldsCleaningCategoryContext);
    const [isCleaningCategories] = useContext(CleaningCategoriesContext);
    // Función del hook
    const handleCleaningCategoryAdd = () => {
        if(currentNView === 'Categorias de limpieza' && currentSView === 'Extras' && currentMView === 'Categoria-Limpieza-Agregar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsCleaningCategory.nombre === ''){
                            setIsActionBlock(false);
                            return reject('¡Falta información de la categoría de limpieza!')
                        };

                        if(isCleaningCategories.some(category => category.nombre === isTextFieldsCleaningCategory.nombre)){
                            setIsActionBlock(false);
                            return reject('¡Categoría de limpieza ya existente!');
                        }

                        const regexNames = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9\s\-.,&()]+$/
                        const regexDescriptions = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]*$/;

                        if(!regexNames.test(isTextFieldsCleaningCategory.nombre.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo puede contener letras, números, espacios y los siguientes caracteres: - . , & ( )!');
                        }

                        if(!regexDescriptions.test(isTextFieldsCleaningCategory.descripcion.trim())){
                            setIsActionBlock(false);
                            return reject('¡La descripción no es válida, solo puede contener letras, números, espacios y los siguientes signos: punto, coma, punto y coma, dos puntos, guiones y paréntesis!');
                        }

                        resolve('¡Información verificada!');
                        
                        setTimeout(() => {
                            return setIsCleaningCategoryAdd(true);
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
    return handleCleaningCategoryAdd;
}
// Hook para editar una categoría de limpieza desde el modal ✔️
export const HandleCleaningCategoryEdit = () => {
    // Constantes con el valor de los contextos 
    const [isCleaningCategoryEdit,setIsCleaningCategoryEdit] = useContext(CleaningCategoryEditContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsCleaningCategory] = useContext(TextFieldsCleaningCategoryContext);
    const [isCleaningCategories] = useContext(CleaningCategoriesContext);
    // Función del hook
    const handleCleaningCategoryEdit = () => {
        if(currentNView === 'Categorias de limpieza' && currentSView === 'Extras' && currentMView === 'Categoria-Limpieza-Editar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isSelectedRow.nombre === isTextFieldsCleaningCategory.nombre && isSelectedRow.descripcion === isTextFieldsCleaningCategory.descripcion){
                            setIsActionBlock(false);
                            return reject('¡No hay información de la categoría de limpieza modificada!')
                        }

                        if(isTextFieldsCleaningCategory.nombre === ''){
                            setIsActionBlock(false);
                            return reject('¡Falta información de la categoría de limpieza!')
                        };

                        if(isSelectedRow.nombre !== isTextFieldsCleaningCategory.nombre){
                            if(isCleaningCategories.some(category => category.nombre === isTextFieldsCleaningCategory.nombre)){
                                setIsActionBlock(false);
                                return reject('¡Categoría de limpieza ya existente!');
                            }
                        }

                        const regexNames = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9\s\-.,&()]+$/
                        const regexDescriptions = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]*$/;

                        if(!regexNames.test(isTextFieldsCleaningCategory.nombre.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo puede contener letras, números, espacios y los siguientes caracteres: - . , & ( )!');
                        }

                        if(!regexDescriptions.test(isTextFieldsCleaningCategory.descripcion.trim())){
                            setIsActionBlock(false);
                            return reject('¡La descripción no es válida, solo puede contener letras, números, espacios y los siguientes signos: punto, coma, punto y coma, dos puntos, guiones y paréntesis!');
                        }

                        resolve('¡Información verificada!');
                        
                        setTimeout(() => {
                            return setIsCleaningCategoryEdit(true);
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
    return handleCleaningCategoryEdit;
}
// Hook para eliminar una categoría de limpieza desde el modal ✔️
export const HandleCleaningCategoryDelete = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isCleaningCategoryDelete,setIsCleaningCategoryDelete] = useContext(CleaningCategoryDeleteContext);    
    // Función del hook
    const handleCleaningCategoryDelete = () => {
        if(currentNView === 'Categorias de limpieza' && currentSView === 'Extras' && currentMView === 'Categoria-Limpieza-Eliminar'){
            setIsActionBlock(true);
            return setIsCleaningCategoryDelete(true);
        }
    } 
    // Retorno de la función del hook
    return handleCleaningCategoryDelete;
}
// Hook para filtrar las categorías de limpieza sin eliminar ✔️
export const FilteredRecordsCleaningCategoriesDeleted = () => {
    // Constantes con el valor de los contextos 
    const [isCleaningCategories] = useContext(CleaningCategoriesContext);
    const [isDeletedCleaningCategories] = useContext(DeletedCleaningCategoriesContext);
    // Función del hook
    const filtered = isCleaningCategories.filter((data) => {
        const isDeleted = isDeletedCleaningCategories.some(category => category.idcategoria === data.idcategoria);
        if (isDeleted) return false;
        
        return true;
    });
    // Retorno de la función del hook
    return filtered;
}
// Hook para agregar un tipo de limpieza desde el modal ✔️
export const HandleCleaningTypeAdd = () => {
    // Constantes con el valor de los contextos 
    const [isCleaningTypeAdd,setIsCleaningTypeAdd] = useContext(CleaningTypeAddContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsCleaningType] = useContext(TextFieldsCleaningTypeContext); 
    const [isCleaningTypes] = useContext(CleaningTypesContext);
    // Función del hook
    const handleCleaningTypeAdd = () => {
        if(currentNView === 'Tipos de limpieza' && currentSView === 'Extras' && currentMView === 'Tipo-Limpieza-Agregar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsCleaningType.tipo === '' || isTextFieldsCleaningType.unidad === '' || isTextFieldsCleaningType.idcategoria === 0 || isTextFieldsCleaningType.limite === ''){
                            setIsActionBlock(false);
                            return reject('¡Falta información del tipo de limpieza!')
                        };

                        if(isCleaningTypes.some(type => type.tipo === isTextFieldsCleaningType.tipo)){
                            setIsActionBlock(false);
                            return reject('¡Tipo de limpieza ya existente!');
                        }

                        const regexNames = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9\s\-.,&()]+$/
                        const regexDescriptions = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]*$/;

                        if(!regexNames.test(isTextFieldsCleaningType.tipo.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo puede contener letras, números, espacios y los siguientes caracteres: - . , & ( )!');
                        }

                        if(!regexDescriptions.test(isTextFieldsCleaningType.descripcion.trim())){
                            setIsActionBlock(false);
                            return reject('¡La descripción no es válida, solo puede contener letras, números, espacios y los siguientes signos: punto, coma, punto y coma, dos puntos, guiones y paréntesis!');
                        }

                        if(Number(isTextFieldsCleaningType.limite) <= 0){
                            setIsActionBlock(false);
                            return reject('¡La cantidad mínima no es válida, debe de ser mayor a 0!');
                        }

                        if(Number(isTextFieldsCleaningType.limite) > 999999.9999){
                            setIsActionBlock(false);
                            return reject('¡La cantidad mínima no es válida, excede el valor máximo posible!');
                        }

                        if(isTextFieldsCleaningType.unidad === 'Kilogramo' || isTextFieldsCleaningType.unidad === 'Litro'){
                            const regexNumbers = /^\d+(\.\d{1,4})?$/;

                            if(!regexNumbers.test(isTextFieldsCleaningType.limite)){
                                setIsActionBlock(false);
                                return reject('¡La cantidad mínima no es válida, solo puede contener números decimales de hasta 4 dígitos decimales o enteros!');
                            }
                        }

                        if(isTextFieldsCleaningType.unidad === 'Pieza'){
                            const regexNumbers = /^\d+$/;  

                            if(!regexNumbers.test(isTextFieldsCleaningType.limite)){
                                setIsActionBlock(false);
                                return reject('¡La cantidad mínima no es válida, solo puede contener números enteros!');
                            }
                        }

                        resolve('¡Información verificada!');
                        
                        setTimeout(() => {
                            return setIsCleaningTypeAdd(true);
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
    return handleCleaningTypeAdd;
}
// Hook para agregar cantidades a un tipo de limpieza desde el modal ✔️
export const HandleCountCleaningTypeAdd = () => {
    // Constantes con el valor de los contextos 
    const [isCleaningTypeCountAdd,setIsCleaningTypeCountAdd] = useContext(CountCleaningTypeAddContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsCleaningType] = useContext(TextFieldsCleaningTypeContext); 
    const [isCountCleaningTypes] = useContext(CountCleaningTypesContext);
    // Función del hook
    const handleCountCleaningTypeAdd = () => {
        if(currentNView === 'Tipos de limpieza' && currentSView === 'Extras' && currentMView === 'Tipo-Limpieza-Cantidad-Agregar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsCleaningType.cantidades[0].cantidad === ''){
                            setIsActionBlock(false);
                            return reject('¡Falta información de la cantidad de tipo de limpieza!')
                        };

                        if(isCountCleaningTypes.some(count => count.idtipo === isTextFieldsCleaningType.idtipo && count.cantidad === parseFloat(isTextFieldsCleaningType.cantidades[0].cantidad))){
                            setIsActionBlock(false);
                            return reject('¡Cantidad ya existente al tipo de limpieza!');
                        }

                        if(Number(isTextFieldsCleaningType.cantidades[0].cantidad) <= 0){
                            setIsActionBlock(false);
                            return reject('¡La cantidad no es válida, debe de ser mayor a 0!');
                        }

                        if(Number(isTextFieldsCleaningType.cantidades[0].cantidad) > 999999.9999){
                            setIsActionBlock(false);
                            return reject('¡La cantidad no es válida, excede el valor máximo posible!');
                        }

                        if(isTextFieldsCleaningType.unidad === 'Kilogramo' || isTextFieldsCleaningType.unidad === 'Litro'){
                            const regexNumbers = /^\d+(\.\d{1,4})?$/;

                            if(!regexNumbers.test(isTextFieldsCleaningType.cantidades[0].cantidad)){
                                setIsActionBlock(false);
                                return reject('¡La cantidad no es válida, solo puede contener números decimales de hasta 4 dígitos decimales o enteros!');
                            }
                        }

                        if(isTextFieldsCleaningType.unidad === 'Pieza'){
                            const regexNumbers = /^\d+$/;  

                            if(!regexNumbers.test(isTextFieldsCleaningType.cantidades[0].cantidad)){
                                setIsActionBlock(false);
                                return reject('¡La cantidad no es válida, solo puede contener números enteros!');
                            }
                        }

                        resolve('¡Información verificada!');
                        
                        setTimeout(() => {
                            return setIsCleaningTypeCountAdd(true);
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
    return handleCountCleaningTypeAdd;
}
// Hook para editar un tipo de insumo desde el modal ✔️
export const HandleCleaningTypeEdit = () => {
    // Constantes con el valor de los contextos 
    const [isCleaningTypeEdit,setIsCleaningTypeEdit] = useContext(CleaningTypeEditContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsCleaningType] = useContext(TextFieldsCleaningTypeContext); 
    const [isCleaningTypes] = useContext(CleaningTypesContext);
    // Función del hook
    const handleCleaningTypeEdit = () => {
        if(currentNView === 'Tipos de limpieza' && currentSView === 'Extras' && currentMView === 'Tipo-Limpieza-Editar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isSelectedRow.tipo === isTextFieldsCleaningType.tipo && isSelectedRow.descripcion === isTextFieldsCleaningType.descripcion && isSelectedRow.unidad === isTextFieldsCleaningType.unidad && isSelectedRow.idcategoria === isTextFieldsCleaningType.idcategoria && isSelectedRow.limite === isTextFieldsCleaningType.limite){
                            setIsActionBlock(false);
                            return reject('¡No hay información del tipo de limpieza modificada!')
                        }

                        if(isTextFieldsCleaningType.tipo === '' || isTextFieldsCleaningType.unidad === '' || isTextFieldsCleaningType.idcategoria === 0 || isTextFieldsCleaningType.limite === ''){
                            setIsActionBlock(false);
                            return reject('¡Falta información del tipo de limpieza!')
                        };

                        if(isSelectedRow.tipo !== isTextFieldsCleaningType.tipo){
                            if(isCleaningTypes.some(type => type.tipo === isTextFieldsCleaningType.tipo)){
                                setIsActionBlock(false);
                                return reject('¡Tipo de limpieza ya existente!');
                            }
                        }

                        const regexNames = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9\s\-.,&()]+$/
                        const regexDescriptions = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]*$/;

                        if(!regexNames.test(isTextFieldsCleaningType.tipo.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo puede contener letras, números, espacios y los siguientes caracteres: - . , & ( )!');
                        }

                        if(!regexDescriptions.test(isTextFieldsCleaningType.descripcion.trim())){
                            setIsActionBlock(false);
                            return reject('¡La descripción no es válida, solo puede contener letras, números, espacios y los siguientes signos: punto, coma, punto y coma, dos puntos, guiones y paréntesis!');
                        }

                        if(Number(isTextFieldsCleaningType.limite) <= 0){
                            setIsActionBlock(false);
                            return reject('¡La cantidad mínima no es válida, debe de ser mayor a 0!');
                        }

                        if(Number(isTextFieldsCleaningType.limite) > 999999.9999){
                            setIsActionBlock(false);
                            return reject('¡La cantidad mínima no es válida, excede el valor máximo posible!');
                        }

                        if(isTextFieldsCleaningType.unidad === 'Kilogramo' || isTextFieldsCleaningType.unidad === 'Litro'){
                            const regexNumbers = /^\d+(\.\d{1,4})?$/;

                            if(!regexNumbers.test(isTextFieldsCleaningType.limite)){
                                setIsActionBlock(false);
                                return reject('¡La cantidad mínima no es válida, solo puede contener números decimales de hasta 4 dígitos decimales o enteros!');
                            }
                        }

                        if(isTextFieldsCleaningType.unidad === 'Pieza'){
                            const regexNumbers = /^\d+$/;  

                            if(!regexNumbers.test(isTextFieldsCleaningType.limite)){
                                setIsActionBlock(false);
                                return reject('¡La cantidad mínima no es válida, solo puede contener números enteros!');
                            }
                        }

                        resolve('¡Información verificada!');
                        
                        setTimeout(() => {
                            return setIsCleaningTypeEdit(true);
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
    return handleCleaningTypeEdit;
}
// Hook para eliminar un tipo de limpieza desde el modal ✔️
export const HandleCleaningTypeDelete = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isCleaningTypeDelete,setIsCleaningTypeDelete] = useContext(CleaningTypeDeleteContext);    
    // Función del hook
    const handleCleaningTypeDelete = () => {
        if(currentNView === 'Tipos de limpieza' && currentSView === 'Extras' && currentMView === 'Tipo-Limpieza-Eliminar'){
            setIsActionBlock(true);
            return setIsCleaningTypeDelete(true);
        }
    } 
    // Retorno de la función del hook
    return handleCleaningTypeDelete;
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
// Hook para filtrar las categorias por limpieza ✔️
export const FilteredRecordsCleaningCategories = () => {
    // Constantes con el valor de los contextos 
    const [isSearchTerm2] = useContext(SearchTerm2Context); 
    const [isCleaningCategories] = useContext(CleaningCategoriesContext); 
    const [isDeletedCleaningCategories] = useContext(DeletedCleaningCategoriesContext);
    // Función del hook
    const filtered = isCleaningCategories.filter((data) => {
        const isDeleted = isDeletedCleaningCategories.some(category => category.idcategoria === data.idcategoria);
        if (isDeleted) return false;
        
        return data.nombre.toLowerCase().includes(isSearchTerm2.toLowerCase());
    });
    // Retorno de la función del hook
    return filtered;
}
// Hook para filtrar los tipos de limpieza ✔️
export const FilteredRecordsCleaningTypes = () => {
    // Constantes con el valor de los contextos 
    const [isSearchTerm3] = useContext(SearchTerm3Context); 
    const [isCleaningTypes] = useContext(CleaningTypesContext); 
    const [isDeletedCleaningTypes] = useContext(DeletedCleaningTypesContext);
    const [isTextFieldsCleaningSupply] = useContext(TextFieldsCleaningSupplyContext);  
    // Función del hook
    const filtered = isCleaningTypes.filter((data) => {
        if(data.idcategoria === isTextFieldsCleaningSupply.idcategoria){
            const isDeleted = isDeletedCleaningTypes.some(type => type.idtipo === data.idtipo);
            if (isDeleted) return false;
                
            return data.tipo.toLowerCase().includes(isSearchTerm3.toLowerCase())
        }
    });
    // Retorno de la función del hook
    return filtered;
}
// Hook para filtrar las cantidades de los tipos de limpieza ✔️
export const FilteredRecordsCountCleaningTypes = () => {
    // Constantes con el valor de los contextos 
    const [isCountCleaningTypes] = useContext(CountCleaningTypesContext); 
    const [isDeletedCleaningTypes] = useContext(DeletedCleaningTypesContext);
    const [isTextFieldsCleaningSupply] = useContext(TextFieldsCleaningSupplyContext);
    // Función del hook
    const filtered = isCountCleaningTypes.filter((data) => {
        if(data.idtipo === isTextFieldsCleaningSupply.idtipo){
            const isDeleted = isDeletedCleaningTypes.some(type => type.idtipo === data.idtipo);
            if (isDeleted) return false;
                
            return true;
        }
    });
    // Retorno de la función del hook
    return filtered;
}
// Hook para agregar un suministro de limpieza desde el modal ✔️
export const HandleCleaningSupplyAdd = () => {
    // Constantes con el valor de los contextos
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsCleaningSupply] = useContext(TextFieldsCleaningSupplyContext);
    const [isCleaningSupplies] = useContext(CleaningSuppliesContext);
    const [isSupplies] = useContext(SuppliesContext);
    const [isCleaningSupplyAdd,setIsCleaningSupplyAdd] = useContext(CleaningSupplyAddContext);
    // Función del hook
    const handleCleaningSupplyAdd = () => {
        if(currentNView === 'Suministros de limpieza' && currentSView === 'Extras' && currentMView === 'Suministro-Limpieza-Agregar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsCleaningSupply.codigo === '' || isTextFieldsCleaningSupply.nombre === '' || isTextFieldsCleaningSupply.idproveedor === 0 || isTextFieldsCleaningSupply.idcategoria === 0 || isTextFieldsCleaningSupply.idtipo === 0 || isTextFieldsCleaningSupply.idcantidad === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información del suministro de limpieza!')
                        };

                        if(isSupplies.some(supply => supply.codigo === isTextFieldsCleaningSupply.codigo || isCleaningSupplies.some(supply => supply.codigo === isTextFieldsCleaningSupply.codigo))){
                            setIsActionBlock(false);
                            return reject('¡Código ya existente!');
                        }

                        if(isCleaningSupplies.some(supply => supply.nombre === isTextFieldsCleaningSupply.nombre)){
                            setIsActionBlock(false);
                            return reject('¡Suministro de limpieza ya existente!');
                        }

                        const regexCode = /^[A-Za-z0-9_-]+$/;
                        const regexNames = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9\s\-.,&()]+$/
                        const regexDescriptions = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]*$/;

                        if(!regexCode.test(isTextFieldsCleaningSupply.codigo.trim())){
                            setIsActionBlock(false);
                            return reject('¡El código no es válido, solo puede contener letras, números, guiones medios (-) y guiones bajos (_). No se permiten espacios ni caracteres especiales!');
                        }

                        if(!regexNames.test(isTextFieldsCleaningSupply.nombre.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo puede contener letras, números, espacios y los siguientes caracteres: - . , & ( )!');
                        }

                        if(!regexDescriptions.test(isTextFieldsCleaningSupply.descripcion.trim())){
                            setIsActionBlock(false);
                            return reject('¡La descripción no es válida, solo puede contener letras, números, espacios y los siguientes signos: punto, coma, punto y coma, dos puntos, guiones y paréntesis!');
                        }

                        if(isTextFieldsCleaningSupply.imagen){
                            try{
                                new URL(isTextFieldsCleaningSupply.imagen.trim());
                            }catch(e){
                                setIsActionBlock(false);
                                return reject('¡La dirección URL de la imagen no es valida!');
                            }
                        }
                    
                        resolve('¡Información verificada!');
                        
                        setTimeout(() => {
                            return setIsCleaningSupplyAdd(true);
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
    return handleCleaningSupplyAdd;
}
// Hook para editar un suministro de limpieza desde el modal ✔️
export const HandleCleaningSupplyEdit = () => {
    // Constantes con el valor de los contextos
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsCleaningSupply] = useContext(TextFieldsCleaningSupplyContext);
    const [isCleaningSupplies] = useContext(CleaningSuppliesContext);
    const [isSupplies] = useContext(SuppliesContext);
    const [isCleaningSupplyEdit,setIsCleaningSupplyEdit] = useContext(CleaningSupplyEditContext);
    // Función del hook
    const handleCleaningSupplyEdit = () => {
        if(currentNView === 'Suministros de limpieza' && currentSView === 'Extras' && currentMView === 'Suministro-Limpieza-Editar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isSelectedRow.codigo === isTextFieldsCleaningSupply.codigo && isSelectedRow.nombre === isTextFieldsCleaningSupply.nombre && isSelectedRow.descripcion === isTextFieldsCleaningSupply.descripcion && isSelectedRow.imagen === isTextFieldsCleaningSupply.imagen && isSelectedRow.idcategoria === isTextFieldsCleaningSupply.idcategoria && isSelectedRow.idproveedor === isTextFieldsCleaningSupply.idproveedor && isSelectedRow.idtipo === isTextFieldsCleaningSupply.idtipo && isTextFieldsCleaningSupply.idcantidad === isSelectedRow.idcantidad){
                            setIsActionBlock(false);
                            return reject('¡No hay información del suministro de limpieza modificada!')
                        }

                        if(isTextFieldsCleaningSupply.codigo === '' || isTextFieldsCleaningSupply.nombre === '' || isTextFieldsCleaningSupply.idproveedor === 0 || isTextFieldsCleaningSupply.idcategoria === 0 || isTextFieldsCleaningSupply.idtipo === 0 || isTextFieldsCleaningSupply.idcantidad === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información del suministro de limpieza!')
                        };

                        if(isSelectedRow.codigo !== isTextFieldsCleaningSupply.codigo){
                            if(isSupplies.some(supply => supply.codigo === isTextFieldsCleaningSupply.codigo || isCleaningSupplies.some(supply => supply.codigo === isTextFieldsCleaningSupply.codigo))){
                                setIsActionBlock(false);
                                return reject('¡Código ya existente!');
                            }
                        }

                        if(isSelectedRow.nombre !== isTextFieldsCleaningSupply.nombre){
                            if(isCleaningSupplies.some(supply => supply.nombre === isTextFieldsCleaningSupply.nombre)){
                                setIsActionBlock(false);
                                return reject('¡Suministro de limpieza ya existente!');
                            }
                        }   

                        const regexCode = /^[A-Za-z0-9_-]+$/;
                        const regexNames = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9\s\-.,&()]+$/
                        const regexDescriptions = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]*$/;

                        if(!regexCode.test(isTextFieldsCleaningSupply.codigo.trim())){
                            setIsActionBlock(false);
                            return reject('¡El código no es válido, solo puede contener letras, números, guiones medios (-) y guiones bajos (_). No se permiten espacios ni caracteres especiales!');
                        }

                        if(!regexNames.test(isTextFieldsCleaningSupply.nombre.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo puede contener letras, números, espacios y los siguientes caracteres: - . , & ( )!');
                        }

                        if(!regexDescriptions.test(isTextFieldsCleaningSupply.descripcion.trim())){
                            setIsActionBlock(false);
                            return reject('¡La descripción no es válida, solo puede contener letras, números, espacios y los siguientes signos: punto, coma, punto y coma, dos puntos, guiones y paréntesis!');
                        }

                        if(isTextFieldsCleaningSupply.imagen){
                            try{
                                new URL(isTextFieldsCleaningSupply.imagen.trim());
                            }catch(e){
                                setIsActionBlock(false);
                                return reject('¡La dirección URL de la imagen no es valida!');
                            }
                        }
                    
                        resolve('¡Información verificada!');
                        
                        setTimeout(() => {
                            return setIsCleaningSupplyEdit(true);
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
    return handleCleaningSupplyEdit;
}
// Hook para eliminar un suministro de limpieza desde el modal ✔️
export const HandleCleaningSupplyDelete = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isCleaningSupplyDelete,setIsCleaningSupplyDelete] = useContext(CleaningSupplyDeleteContext);
    // Función del hook
    const handleCleaningSupplyDelete = () => {
        if(currentNView === 'Suministros de limpieza' && currentSView === 'Extras' && currentMView === 'Suministro-Limpieza-Eliminar'){
            setIsActionBlock(true);
            return setIsCleaningSupplyDelete(true);
        }
    } 
    // Retorno de la función del hook
    return handleCleaningSupplyDelete;
}
// Hook para agregar un gasto fijo desde el modal ✔️
export const HandleFixedExpenseAdd = () => {
    // Constantes con el valor de los contextos 
    const [isFixedExpenseAdd,setIsFixedExpenseAdd] = useContext(FixedExpenseAddContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsFixedExpense] = useContext(TextFieldsFixedExpenseContext);
    const [isFixedExpenses] = useContext(FixedExpensesContext);
    // Función del hook
    const handleFixedExpenseAdd = () => {
        if(currentNView === 'Gastos fijos' && currentSView === 'Extras' && currentMView === 'Gasto-Fijo-Agregar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsFixedExpense.nombre === ''){
                            setIsActionBlock(false);
                            return reject('¡Falta información del gasto fijo!')
                        };

                        if(isFixedExpenses.some(expense => expense.nombre === isTextFieldsFixedExpense.nombre)){
                            setIsActionBlock(false);
                            return reject('¡Gasto fijo ya existente!');
                        }

                        const regexNames = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9\s\-.,&()]+$/
                        const regexDescriptions = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]*$/;

                        if(!regexNames.test(isTextFieldsFixedExpense.nombre.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo puede contener letras, números, espacios y los siguientes caracteres: - . , & ( )!');
                        }

                        if(!regexDescriptions.test(isTextFieldsFixedExpense.descripcion.trim())){
                            setIsActionBlock(false);
                            return reject('¡La descripción no es válida, solo puede contener letras, números, espacios y los siguientes signos: punto, coma, punto y coma, dos puntos, guiones y paréntesis!');
                        }

                        resolve('¡Información verificada!');
                        
                        setTimeout(() => {
                            return setIsFixedExpenseAdd(true);
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
    return handleFixedExpenseAdd;
}
// Hook para editar un gasto fijo desde el modal ✔️
export const HandleFixedExpenseEdit = () => {
    // Constantes con el valor de los contextos 
    const [isFixedExpenseEdit,setIsFixedExpenseEdit] = useContext(FixedExpenseEditContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsFixedExpense] = useContext(TextFieldsFixedExpenseContext);
    const [isFixedExpenses] = useContext(FixedExpensesContext);
    // Función del hook
    const handleFixedExpenseEdit = () => {
        if(currentNView === 'Gastos fijos' && currentSView === 'Extras' && currentMView === 'Gasto-Fijo-Editar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isSelectedRow.nombre === isTextFieldsFixedExpense.nombre && isSelectedRow.descripcion === isTextFieldsFixedExpense.descripcion){                           setIsActionBlock(false);
                            return reject('¡No hay información del gasto fijo modificada!')
                        }

                        if(isTextFieldsFixedExpense.nombre === ''){
                            setIsActionBlock(false);
                            return reject('¡Falta información del gasto fijo!')
                        };

                        if(isSelectedRow.nombre !== isTextFieldsFixedExpense.nombre){
                            if(isFixedExpenses.some(expense => expense.nombre === isTextFieldsFixedExpense.nombre)){
                                setIsActionBlock(false);
                                return reject('¡Gasto fijo ya existente!');
                            }
                        }

                        const regexNames = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9\s\-.,&()]+$/
                        const regexDescriptions = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]*$/;

                        if(!regexNames.test(isTextFieldsFixedExpense.nombre.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo puede contener letras, números, espacios y los siguientes caracteres: - . , & ( )!');
                        }

                        if(!regexDescriptions.test(isTextFieldsFixedExpense.descripcion.trim())){
                            setIsActionBlock(false);
                            return reject('¡La descripción no es válida, solo puede contener letras, números, espacios y los siguientes signos: punto, coma, punto y coma, dos puntos, guiones y paréntesis!');
                        }

                        resolve('¡Información verificada!');
                        
                        setTimeout(() => {
                            return setIsFixedExpenseEdit(true);
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
    return handleFixedExpenseEdit;
}
// Hook para eliminar un gasto fijo desde el modal ✔️
export const HandleFixedExpenseDelete = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isFixedExpenseDelete,setIsFixedExpenseDelete] = useContext(FixedExpenseDeleteContext);    
    // Función del hook
    const handleFixedExpenseDelete = () => {
        if(currentNView === 'Gastos fijos' && currentSView === 'Extras' && currentMView === 'Gasto-Fijo-Eliminar'){
            setIsActionBlock(true);
            return setIsFixedExpenseDelete(true);
        }
    } 
    // Retorno de la función del hook
    return handleFixedExpenseDelete;
}