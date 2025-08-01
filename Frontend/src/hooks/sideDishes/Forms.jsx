//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { TextFieldsSideDishContext } from "../../contexts/FormsProvider";
import { ActionBlockContext } from "../../contexts/VariablesProvider";
import { NavbarViewContext,SidebarViewContext,ModalViewContext } from "../../contexts/ViewsProvider";
import { SideDishAddContext,SideDishesContext,SideDishDeleteContext,SideDishEditContext } from "../../contexts/SideDishesProvider";
import { SelectedRowContext } from "../../contexts/SelectedesProvider";
// Estilos personalizados
import { Alert_Sonner_Promise } from "../../components/styled/Alerts";
//____________IMPORT/EXPORT____________

// Hook para agregar o eliminar menu en las guarniciones  ✔️
export const HandleTextSideDishes = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsSideDish,setIsTextFieldsSideDish] = useContext(TextFieldsSideDishContext);
    // Funcion para agregar un nuevo menú
    const MenuAdd = () => {
        const newMenu = {
            idtipo: 0,
        }
        setIsTextFieldsSideDish({
            ...isTextFieldsSideDish,
            tipos: [...isTextFieldsSideDish.tipos, newMenu],
        })
    }
    // Funcion para eliminar un menú
    const MenuDelete = (index) => {
        const updatedMenus = [...isTextFieldsSideDish.tipos];
        updatedMenus.splice(index,1);
        setIsTextFieldsSideDish({
            ...isTextFieldsSideDish,
            tipos: updatedMenus,
        })
    }
    // Funcion para agregar un nuevo ingrediente
    const IngredientAdd = () => {
        const newIngredient = {
            idalmacen: 0,
            idguarnicion: 0,
            cantidad: '',
            idtipo: 0,
            unidad: '',
            buscador: '',
        }
        setIsTextFieldsSideDish({
            ...isTextFieldsSideDish,
            ingredientes: [...isTextFieldsSideDish.ingredientes, newIngredient],
        })
    }
    // Funcion para eliminar un nuevo ingrediente
    const IngredientDelete = (index) => {
        const updatedIngredients = [...isTextFieldsSideDish.ingredientes];
        updatedIngredients.splice(index,1);
        setIsTextFieldsSideDish({
            ...isTextFieldsSideDish,
            ingredientes: updatedIngredients,
        })
    }
    // Retorno de la función del hook
    return { MenuAdd,MenuDelete,IngredientAdd,IngredientDelete }
}
// Hook para agregar una guarnición desde el modal ✔️
export const HandleSideDishAdd = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsSideDish] = useContext(TextFieldsSideDishContext);
    const [isSideDishAdd,setIsSideDishAdd] = useContext(SideDishAddContext);
    const [isSideDishes] = useContext(SideDishesContext);
    // Función del hook
    const handleSideDishAdd = () => {
        if(currentNView === 'Guarniciones' && currentSView === 'Menus' && currentMView === 'Guarnicion-Agregar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsSideDish.nombre === '' || isTextFieldsSideDish.idmenu === 0 || isTextFieldsSideDish.descripcion === '' || isTextFieldsSideDish.precio === '' || isTextFieldsSideDish.preparacion === '' || isTextFieldsSideDish.ingredientes.length === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información de la guarnición!')
                        };

                        if(isSideDishes.some(dish => dish.nombre === isTextFieldsSideDish.nombre)){
                            setIsActionBlock(false);
                            return reject('¡Guarnición ya existente!');
                        }

                        const regexNames = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9\s\-.,&()]+$/
                        const regexDescriptions = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]*$/;
                        const regexNumbersPrice = /^\d+(\.\d{1,4})?$/;
                        const regexNumbersPreparation = /^\d+$/;

                        if(!regexNames.test(isTextFieldsSideDish.nombre.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo puede contener letras, números, espacios y los siguientes caracteres: - . , & ( )!');
                        }

                        if(!regexDescriptions.test(isTextFieldsSideDish.descripcion.trim())){
                            setIsActionBlock(false);
                            return reject('¡La descripción no es válida, solo puede contener letras, números, espacios y los siguientes signos: punto, coma, punto y coma, dos puntos, guiones y paréntesis!');
                        }

                        if(isTextFieldsSideDish.precio <= 0){
                            setIsActionBlock(false);
                            return reject('¡El precio no es válido, debe de ser mayor a 0!');
                        }

                        if(isTextFieldsSideDish.precio > 1000.9999){
                            setIsActionBlock(false);
                            return reject('¡El precio no es válido, excede el valor máximo posible!');
                        }

                        if(isTextFieldsSideDish.preparacion <= 0){
                            setIsActionBlock(false);
                            return reject('¡El tiempo de preparación no es válido, debe de ser mayor a 0!');
                        }

                        if(isTextFieldsSideDish.preparacion > 600){
                            setIsActionBlock(false);
                            return reject('¡El tiempo de preparación no es válido, excede el valor máximo posible!');
                        }

                        if(!regexNumbersPrice.test(isTextFieldsSideDish.precio)){
                            setIsActionBlock(false);
                            return reject('¡El precio no es válido, solo puede contener números decimales de hasta 4 dígitos decimales o enteros!');
                        }  

                        if(!regexNumbersPreparation.test(isTextFieldsSideDish.preparacion)){
                            setIsActionBlock(false);
                            return reject('¡El tiempo de preparación no es válido, solo puede contener números enteros!');
                        }
                        
                        if(isTextFieldsSideDish.imagen){
                            try{
                                new URL(isTextFieldsSideDish.imagen.trim());
                            }catch(e){
                                setIsActionBlock(false);
                                return reject('¡La dirección URL de la imagen no es valida!');
                            }
                        }

                        const ids = new Set();

                        const indexTipoError = isTextFieldsSideDish.tipos.findIndex((tipo, index, arr) => {
                            const idInvalido = tipo.idtipo === 0;
                            const idDuplicado = ids.has(tipo.idtipo);
                            ids.add(tipo.idtipo);

                            return idInvalido || idDuplicado;
                        });

                        if (indexTipoError !== -1) {
                            setIsActionBlock(false);
                            return reject(`¡Error en el menú asignado ${indexTipoError + 1}! Verifica que todos tengan un valor válido y que no estén duplicados.`);
                        }

                        const indexError = isTextFieldsSideDish.ingredientes.findIndex((ing, index, arr) => {
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

                        const indexErrorNumber = isTextFieldsSideDish.ingredientes.findIndex((ing, index, arr) => {

                            const cantidadNumero = parseFloat(ing.cantidad);
                            const cantidadInvalida = cantidadNumero <= 0 || cantidadNumero > 999999.9999;

                            return cantidadInvalida;
                        });

                        if (indexErrorNumber !== -1) {
                            setIsActionBlock(false);
                            return reject(`¡Error en el ingrediente ${indexErrorNumber + 1}! Verifica que la cantidad sea mayor a 0 y no exceda el límite permitido.`);
                        }

                        const indexErrorUnidad = isTextFieldsSideDish.ingredientes.findIndex((ing) => {
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
                            return setIsSideDishAdd(true);
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
    return handleSideDishAdd;
}
// Hook para editar una guarnición desde el modal ✔️
export const HandleSideDishEdit = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [isTextFieldsSideDish] = useContext(TextFieldsSideDishContext);
    const [isSideDishEdit,setIsSideDishEdit] = useContext(SideDishEditContext);
    const [isSideDishes] = useContext(SideDishesContext);
    // Función del hook
    const handleSideDishEdit = () => {
        if(currentNView === 'Guarniciones' && currentSView === 'Menus' && currentMView === 'Guarnicion-Editar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        
                        if(isTextFieldsSideDish.nombre === '' || isTextFieldsSideDish.idmenu === 0 || isTextFieldsSideDish.descripcion === '' || isTextFieldsSideDish.precio === '' || isTextFieldsSideDish.preparacion === '' || isTextFieldsSideDish.ingredientes.length === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información de la guarnición!')
                        };

                        if(isSelectedRow.nombre !== isTextFieldsSideDish.nombre){
                            if(isSideDishes.some(dish => dish.nombre === isTextFieldsSideDish.nombre)){
                                setIsActionBlock(false);
                                return reject('¡Guarnición ya existente!');
                            }
                        }

                        const regexNames = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9\s\-.,&()]+$/
                        const regexDescriptions = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]*$/;
                        const regexNumbersPrice = /^\d+(\.\d{1,4})?$/;
                        const regexNumbersPreparation = /^\d+$/;

                        if(!regexNames.test(isTextFieldsSideDish.nombre.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo puede contener letras, números, espacios y los siguientes caracteres: - . , & ( )!');
                        }

                        if(!regexDescriptions.test(isTextFieldsSideDish.descripcion.trim())){
                            setIsActionBlock(false);
                            return reject('¡La descripción no es válida, solo puede contener letras, números, espacios y los siguientes signos: punto, coma, punto y coma, dos puntos, guiones y paréntesis!');
                        }

                        if(isTextFieldsSideDish.precio <= 0){
                            setIsActionBlock(false);
                            return reject('¡El precio no es válido, debe de ser mayor a 0!');
                        }

                        if(isTextFieldsSideDish.precio > 1000.9999){
                            setIsActionBlock(false);
                            return reject('¡El precio no es válido, excede el valor máximo posible!');
                        }

                        if(isTextFieldsSideDish.preparacion <= 0){
                            setIsActionBlock(false);
                            return reject('¡El tiempo de preparación no es válido, debe de ser mayor a 0!');
                        }

                        if(isTextFieldsSideDish.preparacion > 600){
                            setIsActionBlock(false);
                            return reject('¡El tiempo de preparación no es válido, excede el valor máximo posible!');
                        }

                        if(!regexNumbersPrice.test(isTextFieldsSideDish.precio)){
                            setIsActionBlock(false);
                            return reject('¡El precio no es válido, solo puede contener números decimales de hasta 4 dígitos decimales o enteros!');
                        }  

                        if(!regexNumbersPreparation.test(isTextFieldsSideDish.preparacion)){
                            setIsActionBlock(false);
                            return reject('¡El tiempo de preparación no es válido, solo puede contener números enteros!');
                        }
                        
                        if(isTextFieldsSideDish.imagen){
                            try{
                                new URL(isTextFieldsSideDish.imagen.trim());
                            }catch(e){
                                setIsActionBlock(false);
                                return reject('¡La dirección URL de la imagen no es valida!');
                            }
                        }

                        const ids = new Set();

                        const indexTipoError = isTextFieldsSideDish.tipos.findIndex((tipo, index, arr) => {
                            const idInvalido = tipo.idtipo === 0;
                            const idDuplicado = ids.has(tipo.idtipo);
                            ids.add(tipo.idtipo);

                            return idInvalido || idDuplicado;
                        });

                        if (indexTipoError !== -1) {
                            setIsActionBlock(false);
                            return reject(`¡Error en el menú asignado ${indexTipoError + 1}! Verifica que todos tengan un valor válido y que no estén duplicados.`);
                        }

                        const indexError = isTextFieldsSideDish.ingredientes.findIndex((ing, index, arr) => {
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

                        const indexErrorNumber = isTextFieldsSideDish.ingredientes.findIndex((ing, index, arr) => {

                            const cantidadNumero = parseFloat(ing.cantidad);
                            const cantidadInvalida = cantidadNumero <= 0 || cantidadNumero > 999999.9999;

                            return cantidadInvalida;
                        });

                        if (indexErrorNumber !== -1) {
                            setIsActionBlock(false);
                            return reject(`¡Error en el ingrediente ${indexErrorNumber + 1}! Verifica que la cantidad sea mayor a 0 y no exceda el límite permitido.`);
                        }

                        const indexErrorUnidad = isTextFieldsSideDish.ingredientes.findIndex((ing) => {
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
                            return setIsSideDishEdit(true);
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
    return handleSideDishEdit;
}
// Hook para eliminar una guarnición desde el modal ✔️
export const HandleSideDishDelete = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSideDishDelete,setIsSideDishDelete] = useContext(SideDishDeleteContext);
    // Función del hook
    const handleSideDishDelete = () => {
        if(currentNView === 'Guarniciones' && currentSView === 'Menus' && currentMView === 'Guarnicion-Eliminar'){
            setIsActionBlock(true);
            return setIsSideDishDelete(true);
        }
    } 
    // Retorno de la función del hook
    return handleSideDishDelete;
} 