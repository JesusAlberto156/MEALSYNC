//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { TextFieldsDishContext } from "../../contexts/FormsProvider";
import { ActionBlockContext } from "../../contexts/VariablesProvider";
import { NavbarViewContext,SidebarViewContext,ModalViewContext } from "../../contexts/ViewsProvider";
import { DishAddContext,DishesContext,DishDeleteContext,DishEditContext } from "../../contexts/DishesProvider";
import { SelectedRowContext } from "../../contexts/SelectedesProvider";
// Estilos personalizados
import { Alert_Sonner_Promise } from "../../components/styled/Alerts";
//____________IMPORT/EXPORT____________

// Hook para agregar o eliminar menu en los platillos  ✔️
export const HandleTextDishes = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsDish,setIsTextFieldsDish] = useContext(TextFieldsDishContext);
    // Funcion para agregar un nuevo menú
    const MenuAdd = () => {
        const newMenu = {
            idtipo: 0,
        }
        setIsTextFieldsDish({
            ...isTextFieldsDish,
            tipos: [...isTextFieldsDish.tipos, newMenu],
        })
    }
    // Funcion para eliminar un menú
    const MenuDelete = (index) => {
        const updatedMenus = [...isTextFieldsDish.tipos];
        updatedMenus.splice(index,1);
        setIsTextFieldsDish({
            ...isTextFieldsDish,
            tipos: updatedMenus,
        })
    }
    // Funcion para agregar un nuevo ingrediente
    const IngredientAdd = () => {
        const newIngredient = {
            idalmacen: 0,
            idplatillo: 0,
            cantidad: '',
            idtipo: 0,
            unidad: '',
            buscador: '',
        }
        setIsTextFieldsDish({
            ...isTextFieldsDish,
            ingredientes: [...isTextFieldsDish.ingredientes, newIngredient],
        })
    }
    // Funcion para eliminar un nuevo ingrediente
    const IngredientDelete = (index) => {
        const updatedIngredients = [...isTextFieldsDish.ingredientes];
        updatedIngredients.splice(index,1);
        setIsTextFieldsDish({
            ...isTextFieldsDish,
            ingredientes: updatedIngredients,
        })
    }
    // Retorno de la función del hook
    return { MenuAdd,MenuDelete,IngredientAdd,IngredientDelete }
}
// Hook para agregar un platillo desde el modal ✔️
export const HandleDishAdd = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsDish] = useContext(TextFieldsDishContext);
    const [isDishAdd,setIsDishAdd] = useContext(DishAddContext);
    const [isDishes] = useContext(DishesContext);
    // Función del hook
    const handleDishAdd = () => {
        if(currentNView === 'Platillos' && currentSView === 'Menus' && currentMView === 'Platillo-Agregar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsDish.nombre === '' || isTextFieldsDish.descripcion === '' || isTextFieldsDish.precio === '' || isTextFieldsDish.preparacion === '' || isTextFieldsDish.ingredientes.length === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información del platillo!')
                        };

                        if(isDishes.some(dish => dish.nombre === isTextFieldsDish.nombre)){
                            setIsActionBlock(false);
                            return reject('¡Platillo ya existente!');
                        }

                        const regexNames = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9\s\-.,&()]+$/
                        const regexDescriptions = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]*$/;
                        const regexNumbersPrice = /^\d+(\.\d{1,4})?$/;
                        const regexNumbersPreparation = /^\d+$/;

                        if(!regexNames.test(isTextFieldsDish.nombre.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo puede contener letras, números, espacios y los siguientes caracteres: - . , & ( )!');
                        }

                        if(!regexDescriptions.test(isTextFieldsDish.descripcion.trim())){
                            setIsActionBlock(false);
                            return reject('¡La descripción no es válida, solo puede contener letras, números, espacios y los siguientes signos: punto, coma, punto y coma, dos puntos, guiones y paréntesis!');
                        }

                        if(isTextFieldsDish.precio <= 0){
                            setIsActionBlock(false);
                            return reject('¡El precio no es válido, debe de ser mayor a 0!');
                        }

                        if(isTextFieldsDish.precio > 1000.9999){
                            setIsActionBlock(false);
                            return reject('¡El precio no es válido, excede el valor máximo posible!');
                        }

                        if(isTextFieldsDish.preparacion <= 0){
                            setIsActionBlock(false);
                            return reject('¡El tiempo de preparación no es válido, debe de ser mayor a 0!');
                        }

                        if(isTextFieldsDish.preparacion > 600){
                            setIsActionBlock(false);
                            return reject('¡El tiempo de preparación no es válido, excede el valor máximo posible!');
                        }

                        if(!regexNumbersPrice.test(isTextFieldsDish.precio)){
                            setIsActionBlock(false);
                            return reject('¡El precio no es válido, solo puede contener números decimales de hasta 4 dígitos decimales o enteros!');
                        }  

                        if(!regexNumbersPreparation.test(isTextFieldsDish.preparacion)){
                            setIsActionBlock(false);
                            return reject('¡El tiempo de preparación no es válido, solo puede contener números enteros!');
                        }
                        
                        if(isTextFieldsDish.imagen){
                            try{
                                new URL(isTextFieldsDish.imagen.trim());
                            }catch(e){
                                setIsActionBlock(false);
                                return reject('¡La dirección URL de la imagen no es valida!');
                            }
                        }

                        const ids = new Set();

                        const indexTipoError = isTextFieldsDish.tipos.findIndex((tipo, index, arr) => {
                            const idInvalido = tipo.idtipo === 0;
                            const idDuplicado = ids.has(tipo.idtipo);
                            ids.add(tipo.idtipo);

                            return idInvalido || idDuplicado;
                        });

                        if (indexTipoError !== -1) {
                            setIsActionBlock(false);
                            return reject(`¡Error en el menú asignado ${indexTipoError + 1}! Verifica que todos tengan un valor válido y que no estén duplicados.`);
                        }

                        const indexError = isTextFieldsDish.ingredientes.findIndex((ing, index, arr) => {
                            const idalmacenInvalido = ing.idalmacen === 0;
                            const cantidadVacia = String(ing.cantidad).trim() === '';
                            const idsAnteriores = arr.slice(0, index).map(prev => prev.idalmacen);
                            const almacenRepetido = idsAnteriores.includes(ing.idalmacen);

                            return idalmacenInvalido || cantidadVacia || almacenRepetido;
                        });

                        if (indexError !== -1) {
                            setIsActionBlock(false);
                            return reject(`¡Error en el ingrediente ${indexError + 1}! Verifica que este asignado su insumo o no se duplique o cuente con una cantidad valida.`);
                        }

                        const indexErrorNumber = isTextFieldsDish.ingredientes.findIndex((ing, index, arr) => {

                            const cantidadNumero = parseFloat(ing.cantidad);
                            const cantidadInvalida = cantidadNumero <= 0 || cantidadNumero > 999999.9999;

                            return cantidadInvalida;
                        });

                        if (indexErrorNumber !== -1) {
                            setIsActionBlock(false);
                            return reject(`¡Error en el ingrediente ${indexErrorNumber + 1}! Verifica que la cantidad sea mayor a 0 y no exceda el límite permitido.`);
                        }

                        const indexErrorUnidad = isTextFieldsDish.ingredientes.findIndex((ing) => {
                            const cantidadNumero = parseFloat(ing.cantidad);

                            if (ing.unidad === 'Pieza') {
                                if (!Number.isInteger(cantidadNumero) || cantidadNumero <= 0) {
                                    return true;
                                }
                            } else if (
                                ing.unidad === 'Kilogramo' ||
                                ing.unidad === 'Litro'
                            ) {
                                if (isNaN(cantidadNumero) || cantidadNumero <= 0) {
                                    return true;
                                }
                            }

                            return false;
                        });

                        if (indexErrorUnidad !== -1) {
                            setIsActionBlock(false);
                            return reject(
                                `¡Error en el ingrediente ${indexErrorUnidad + 1}! La cantidad no es válida acorde a la unidad.`
                            );
                        }

                        resolve('¡Información verificada!');
                        
                        setTimeout(() => {
                            return setIsDishAdd(true);
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
    return handleDishAdd;
}
// Hook para editar un platillo desde el modal ✔️
export const HandleDishEdit = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [isTextFieldsDish] = useContext(TextFieldsDishContext);
    const [isDishEdit,setIsDishEdit] = useContext(DishEditContext);
    const [isDishes] = useContext(DishesContext);
    // Función del hook
    const handleDishEdit = () => {
        if(currentNView === 'Platillos' && currentSView === 'Menus' && currentMView === 'Platillo-Editar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        
                        if(isTextFieldsDish.nombre === '' || isTextFieldsDish.descripcion === '' || isTextFieldsDish.precio === '' || isTextFieldsDish.preparacion === '' || isTextFieldsDish.ingredientes.length === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información del platillo!')
                        };

                        if(isSelectedRow.nombre !== isTextFieldsDish.nombre){
                            if(isDishes.some(dish => dish.nombre === isTextFieldsDish.nombre)){
                                setIsActionBlock(false);
                                return reject('¡Platillo ya existente!');
                            }
                        }

                        const regexNames = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9\s\-.,&()]+$/
                        const regexDescriptions = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]*$/;
                        const regexNumbersPrice = /^\d+(\.\d{1,4})?$/;
                        const regexNumbersPreparation = /^\d+$/;

                        if(!regexNames.test(isTextFieldsDish.nombre.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo puede contener letras, números, espacios y los siguientes caracteres: - . , & ( )!');
                        }

                        if(!regexDescriptions.test(isTextFieldsDish.descripcion.trim())){
                            setIsActionBlock(false);
                            return reject('¡La descripción no es válida, solo puede contener letras, números, espacios y los siguientes signos: punto, coma, punto y coma, dos puntos, guiones y paréntesis!');
                        }

                        if(isTextFieldsDish.precio <= 0){
                            setIsActionBlock(false);
                            return reject('¡El precio no es válido, debe de ser mayor a 0!');
                        }

                        if(isTextFieldsDish.precio > 1000.9999){
                            setIsActionBlock(false);
                            return reject('¡El precio no es válido, excede el valor máximo posible!');
                        }

                        if(isTextFieldsDish.preparacion <= 0){
                            setIsActionBlock(false);
                            return reject('¡El tiempo de preparación no es válido, debe de ser mayor a 0!');
                        }

                        if(isTextFieldsDish.preparacion > 600){
                            setIsActionBlock(false);
                            return reject('¡El tiempo de preparación no es válido, excede el valor máximo posible!');
                        }

                        if(!regexNumbersPrice.test(isTextFieldsDish.precio)){
                            setIsActionBlock(false);
                            return reject('¡El precio no es válido, solo puede contener números decimales de hasta 4 dígitos decimales o enteros!');
                        }  

                        if(!regexNumbersPreparation.test(isTextFieldsDish.preparacion)){
                            setIsActionBlock(false);
                            return reject('¡El tiempo de preparación no es válido, solo puede contener números enteros!');
                        }
                        
                        if(isTextFieldsDish.imagen){
                            try{
                                new URL(isTextFieldsDish.imagen.trim());
                            }catch(e){
                                setIsActionBlock(false);
                                return reject('¡La dirección URL de la imagen no es valida!');
                            }
                        }

                        const ids = new Set();

                        const indexTipoError = isTextFieldsDish.tipos.findIndex((tipo, index, arr) => {
                            const idInvalido = tipo.idtipo === 0;
                            const idDuplicado = ids.has(tipo.idtipo);
                            ids.add(tipo.idtipo);

                            return idInvalido || idDuplicado;
                        });

                        if (indexTipoError !== -1) {
                            setIsActionBlock(false);
                            return reject(`¡Error en el menú asignado ${indexTipoError + 1}! Verifica que todos tengan un valor válido y que no estén duplicados.`);
                        }

                        const indexError = isTextFieldsDish.ingredientes.findIndex((ing, index, arr) => {
                            const idalmacenInvalido = ing.idalmacen === 0;
                            const cantidadVacia = String(ing.cantidad).trim() === '';
                            const idsAnteriores = arr.slice(0, index).map(prev => prev.idalmacen);
                            const almacenRepetido = idsAnteriores.includes(ing.idalmacen);

                            return idalmacenInvalido || cantidadVacia || almacenRepetido;
                        });

                        if (indexError !== -1) {
                            setIsActionBlock(false);
                            return reject(`¡Error en el ingrediente ${indexError + 1}! Verifica que este asignado su insumo o no se duplique o cuente con una cantidad valida.`);
                        }

                        const indexErrorNumber = isTextFieldsDish.ingredientes.findIndex((ing, index, arr) => {

                            const cantidadNumero = parseFloat(ing.cantidad);
                            const cantidadInvalida = cantidadNumero <= 0 || cantidadNumero > 999999.9999;

                            return cantidadInvalida;
                        });

                        if (indexErrorNumber !== -1) {
                            setIsActionBlock(false);
                            return reject(`¡Error en el ingrediente ${indexErrorNumber + 1}! Verifica que la cantidad sea mayor a 0 y no exceda el límite permitido.`);
                        }

                        const indexErrorUnidad = isTextFieldsDish.ingredientes.findIndex((ing) => {
                            const cantidadNumero = parseFloat(ing.cantidad);

                            if (ing.unidad === 'Pieza') {
                                if (!Number.isInteger(cantidadNumero) || cantidadNumero <= 0) {
                                    return true;
                                }
                            } else if (
                                ing.unidad === 'Kilogramo' ||
                                ing.unidad === 'Litro'
                            ) {
                                if (isNaN(cantidadNumero) || cantidadNumero <= 0) {
                                    return true;
                                }
                            }

                            return false;
                        });

                        if (indexErrorUnidad !== -1) {
                            setIsActionBlock(false);
                            return reject(
                                `¡Error en el ingrediente ${indexErrorUnidad + 1}! La cantidad no es válida acorde a la unidad.`
                            );
                        }

                        resolve('¡Información verificada!');
                        
                        setTimeout(() => {
                            return setIsDishEdit(true);
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
    return handleDishEdit;
}
// Hook para eliminar un platillo desde el modal ✔️
export const HandleDishDelete = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isDishDelete,setIsDishDelete] = useContext(DishDeleteContext);
    // Función del hook
    const handleDishDelete = () => {
        if(currentNView === 'Platillos' && currentSView === 'Menus' && currentMView === 'Platillo-Eliminar'){
            setIsActionBlock(true);
            return setIsDishDelete(true);
        }
    } 
    // Retorno de la función del hook
    return handleDishDelete;
} 