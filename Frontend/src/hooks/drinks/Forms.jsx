//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { TextFieldsDrinkContext } from "../../contexts/FormsProvider";
import { ActionBlockContext } from "../../contexts/VariablesProvider";
import { NavbarViewContext,SidebarViewContext,ModalViewContext } from "../../contexts/ViewsProvider";
import { DrinkAddContext,DrinksContext,DrinkDeleteContext,DrinkEditContext } from "../../contexts/DrinksProvider";
import { SelectedRowContext } from "../../contexts/SelectedesProvider";
// Estilos personalizados
import { Alert_Sonner_Promise } from "../../components/styled/Alerts";
//____________IMPORT/EXPORT____________

// Hook para agregar o eliminar menu en las bebidas  ✔️
export const HandleTextDrinks = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsDrink,setIsTextFieldsDrink] = useContext(TextFieldsDrinkContext);
    // Funcion para agregar un nuevo menú
    const MenuAdd = () => {
        const newMenu = {
            idtipo: 0,
        }
        setIsTextFieldsDrink({
            ...isTextFieldsDrink,
            tipos: [...isTextFieldsDrink.tipos, newMenu],
        })
    }
    // Funcion para eliminar un menú
    const MenuDelete = (index) => {
        const updatedMenus = [...isTextFieldsDrink.tipos];
        updatedMenus.splice(index,1);
        setIsTextFieldsDrink({
            ...isTextFieldsDrink,
            tipos: updatedMenus,
        })
    }
    // Funcion para agregar un nuevo ingrediente
    const IngredientAdd = () => {
        const newIngredient = {
            idalmacen: 0,
            idbebida: 0,
            cantidad: '',
            idtipo: 0,
            unidad: '',
            buscador: '',
        }
        setIsTextFieldsDrink({
            ...isTextFieldsDrink,
            ingredientes: [...isTextFieldsDrink.ingredientes, newIngredient],
        })
    }
    // Funcion para eliminar un nuevo ingrediente
    const IngredientDelete = (index) => {
        const updatedIngredients = [...isTextFieldsDrink.ingredientes];
        updatedIngredients.splice(index,1);
        setIsTextFieldsDrink({
            ...isTextFieldsDrink,
            ingredientes: updatedIngredients,
        })
    }
    // Retorno de la función del hook
    return { MenuAdd,MenuDelete,IngredientAdd,IngredientDelete }
}
// Hook para agregar una bebida desde el modal ✔️
export const HandleDrinkAdd = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsDrink] = useContext(TextFieldsDrinkContext);
    const [isDrinkAdd,setIsDrinkAdd] = useContext(DrinkAddContext);
    const [isDrinks] = useContext(DrinksContext);
    // Función del hook
    const handleDrinkAdd = () => {
        if(currentNView === 'Bebidas' && currentSView === 'Menus' && currentMView === 'Bebida-Agregar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsDrink.nombre === '' || isTextFieldsDrink.idmenu === 0 || isTextFieldsDrink.descripcion === '' || isTextFieldsDrink.precio === '' || isTextFieldsDrink.preparacion === '' || isTextFieldsDrink.ingredientes.length === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información de la bebida!')
                        };

                        if(isDrinks.some(dish => dish.nombre === isTextFieldsDrink.nombre)){
                            setIsActionBlock(false);
                            return reject('¡Bebida ya existente!');
                        }

                        const regexNames = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9\s\-.,&()]+$/
                        const regexDescriptions = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]*$/;
                        const regexNumbersPrice = /^\d+(\.\d{1,4})?$/;
                        const regexNumbersPreparation = /^\d+$/;

                        if(!regexNames.test(isTextFieldsDrink.nombre.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo puede contener letras, números, espacios y los siguientes caracteres: - . , & ( )!');
                        }

                        if(!regexDescriptions.test(isTextFieldsDrink.descripcion.trim())){
                            setIsActionBlock(false);
                            return reject('¡La descripción no es válida, solo puede contener letras, números, espacios y los siguientes signos: punto, coma, punto y coma, dos puntos, guiones y paréntesis!');
                        }

                        if(isTextFieldsDrink.precio <= 0){
                            setIsActionBlock(false);
                            return reject('¡El precio no es válido, debe de ser mayor a 0!');
                        }

                        if(isTextFieldsDrink.precio > 1000.9999){
                            setIsActionBlock(false);
                            return reject('¡El precio no es válido, excede el valor máximo posible!');
                        }

                        if(isTextFieldsDrink.preparacion <= 0){
                            setIsActionBlock(false);
                            return reject('¡El tiempo de preparación no es válido, debe de ser mayor a 0!');
                        }

                        if(isTextFieldsDrink.preparacion > 600){
                            setIsActionBlock(false);
                            return reject('¡El tiempo de preparación no es válido, excede el valor máximo posible!');
                        }

                        if(!regexNumbersPrice.test(isTextFieldsDrink.precio)){
                            setIsActionBlock(false);
                            return reject('¡El precio no es válido, solo puede contener números decimales de hasta 4 dígitos decimales o enteros!');
                        }  

                        if(!regexNumbersPreparation.test(isTextFieldsDrink.preparacion)){
                            setIsActionBlock(false);
                            return reject('¡El tiempo de preparación no es válido, solo puede contener números enteros!');
                        }
                        
                        if(isTextFieldsDrink.imagen){
                            try{
                                new URL(isTextFieldsDrink.imagen.trim());
                            }catch(e){
                                setIsActionBlock(false);
                                return reject('¡La dirección URL de la imagen no es valida!');
                            }
                        }

                        const ids = new Set();

                        const indexTipoError = isTextFieldsDrink.tipos.findIndex((tipo, index, arr) => {
                            const idInvalido = tipo.idtipo === 0;
                            const idDuplicado = ids.has(tipo.idtipo);
                            ids.add(tipo.idtipo);

                            return idInvalido || idDuplicado;
                        });

                        if (indexTipoError !== -1) {
                            setIsActionBlock(false);
                            return reject(`¡Error en el menú asignado ${indexTipoError + 1}! Verifica que todos tengan un valor válido y que no estén duplicados.`);
                        }

                        const indexError = isTextFieldsDrink.ingredientes.findIndex((ing, index, arr) => {
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

                        const indexErrorNumber = isTextFieldsDrink.ingredientes.findIndex((ing, index, arr) => {

                            const cantidadNumero = parseFloat(ing.cantidad);
                            const cantidadInvalida = cantidadNumero <= 0 || cantidadNumero > 999999.9999;

                            return cantidadInvalida;
                        });

                        if (indexErrorNumber !== -1) {
                            setIsActionBlock(false);
                            return reject(`¡Error en el ingrediente ${indexErrorNumber + 1}! Verifica que la cantidad sea mayor a 0 y no exceda el límite permitido.`);
                        }

                        const indexErrorUnidad = isTextFieldsDrink.ingredientes.findIndex((ing) => {
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
                            return setIsDrinkAdd(true);
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
    return handleDrinkAdd;
}
// Hook para editar una bebida desde el modal ✔️
export const HandleDrinkEdit = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [isTextFieldsDrink] = useContext(TextFieldsDrinkContext);
    const [isDrinkEdit,setIsDrinkEdit] = useContext(DrinkEditContext);
    const [isDrinks] = useContext(DrinksContext);
    // Función del hook
    const handleDrinkEdit = () => {
        if(currentNView === 'Bebidas' && currentSView === 'Menus' && currentMView === 'Bebida-Editar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        
                        if(isTextFieldsDrink.nombre === '' || isTextFieldsDrink.idmenu === 0 || isTextFieldsDrink.descripcion === '' || isTextFieldsDrink.precio === '' || isTextFieldsDrink.preparacion === '' || isTextFieldsDrink.ingredientes.length === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información de la bebida!')
                        };

                        if(isSelectedRow.nombre !== isTextFieldsDrink.nombre){
                            if(isDrinks.some(dish => dish.nombre === isTextFieldsDrink.nombre)){
                                setIsActionBlock(false);
                                return reject('¡Bebida ya existente!');
                            }
                        }

                        const regexNames = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9\s\-.,&()]+$/
                        const regexDescriptions = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]*$/;
                        const regexNumbersPrice = /^\d+(\.\d{1,4})?$/;
                        const regexNumbersPreparation = /^\d+$/;

                        if(!regexNames.test(isTextFieldsDrink.nombre.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo puede contener letras, números, espacios y los siguientes caracteres: - . , & ( )!');
                        }

                        if(!regexDescriptions.test(isTextFieldsDrink.descripcion.trim())){
                            setIsActionBlock(false);
                            return reject('¡La descripción no es válida, solo puede contener letras, números, espacios y los siguientes signos: punto, coma, punto y coma, dos puntos, guiones y paréntesis!');
                        }

                        if(isTextFieldsDrink.precio <= 0){
                            setIsActionBlock(false);
                            return reject('¡El precio no es válido, debe de ser mayor a 0!');
                        }

                        if(isTextFieldsDrink.precio > 1000.9999){
                            setIsActionBlock(false);
                            return reject('¡El precio no es válido, excede el valor máximo posible!');
                        }

                        if(isTextFieldsDrink.preparacion <= 0){
                            setIsActionBlock(false);
                            return reject('¡El tiempo de preparación no es válido, debe de ser mayor a 0!');
                        }

                        if(isTextFieldsDrink.preparacion > 600){
                            setIsActionBlock(false);
                            return reject('¡El tiempo de preparación no es válido, excede el valor máximo posible!');
                        }

                        if(!regexNumbersPrice.test(isTextFieldsDrink.precio)){
                            setIsActionBlock(false);
                            return reject('¡El precio no es válido, solo puede contener números decimales de hasta 4 dígitos decimales o enteros!');
                        }  

                        if(!regexNumbersPreparation.test(isTextFieldsDrink.preparacion)){
                            setIsActionBlock(false);
                            return reject('¡El tiempo de preparación no es válido, solo puede contener números enteros!');
                        }
                        
                        if(isTextFieldsDrink.imagen){
                            try{
                                new URL(isTextFieldsDrink.imagen.trim());
                            }catch(e){
                                setIsActionBlock(false);
                                return reject('¡La dirección URL de la imagen no es valida!');
                            }
                        }

                        const ids = new Set();

                        const indexTipoError = isTextFieldsDrink.tipos.findIndex((tipo, index, arr) => {
                            const idInvalido = tipo.idtipo === 0;
                            const idDuplicado = ids.has(tipo.idtipo);
                            ids.add(tipo.idtipo);

                            return idInvalido || idDuplicado;
                        });

                        if (indexTipoError !== -1) {
                            setIsActionBlock(false);
                            return reject(`¡Error en el menú asignado ${indexTipoError + 1}! Verifica que todos tengan un valor válido y que no estén duplicados.`);
                        }

                        const indexError = isTextFieldsDrink.ingredientes.findIndex((ing, index, arr) => {
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

                        const indexErrorNumber = isTextFieldsDrink.ingredientes.findIndex((ing, index, arr) => {

                            const cantidadNumero = parseFloat(ing.cantidad);
                            const cantidadInvalida = cantidadNumero <= 0 || cantidadNumero > 999999.9999;

                            return cantidadInvalida;
                        });

                        if (indexErrorNumber !== -1) {
                            setIsActionBlock(false);
                            return reject(`¡Error en el ingrediente ${indexErrorNumber + 1}! Verifica que la cantidad sea mayor a 0 y no exceda el límite permitido.`);
                        }

                        const indexErrorUnidad = isTextFieldsDrink.ingredientes.findIndex((ing) => {
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
                            return setIsDrinkEdit(true);
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
    return handleDrinkEdit;
}
// Hook para eliminar una bebida desde el modal ✔️
export const HandleDrinkDelete = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isDrinkDelete,setIsDrinkDelete] = useContext(DrinkDeleteContext);
    // Función del hook
    const handleDrinkDelete = () => {
        if(currentNView === 'Bebidas' && currentSView === 'Menus' && currentMView === 'Bebida-Eliminar'){
            setIsActionBlock(true);
            return setIsDrinkDelete(true);
        }
    } 
    // Retorno de la función del hook
    return handleDrinkDelete;
} 