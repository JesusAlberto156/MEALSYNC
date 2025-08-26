//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useRef,useCallback } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { LoginViewContext,NavbarViewContext,SidebarViewContext,SidebarContext,ModalViewContext,ModalContext } from "../contexts/ViewsProvider";
import { TouchContext,KeyboardViewContext,KeyboardContext,ActionBlockContext,IndexCountContext,IndexSearchContext,IndexDetailContext } from "../contexts/VariablesProvider";
import { RefKeyboardContext } from "../contexts/RefsProvider";
import { TextFieldsUserContext,TextFieldsOrderDoctorContext,TextFieldsOrderKitchenContext,TextFieldsWarehouseOrderContext,TextFieldsCleaningTypeContext,TextFieldsWarehouseFixedExpenseContext,TextFieldsWarehouseSupplyContext,TextFieldsWarehouseCleaningContext,TextFieldsObservationContext,TextFieldsMenuTypeContext,TextFieldsCleaningCategoryContext,TextFieldsCleaningSupplyContext,TextFieldsFixedExpenseContext,TextFieldsSupplierContext,TextFieldsSideDishContext,TextFieldsDrinkContext,TextFieldsSupplyContext,TextFieldsDishContext,TextFieldsSupplyTypesContext,TextFieldsSupplyCategoryContext } from "../contexts/FormsProvider";
import { LoggedTypeContext } from "../contexts/SessionProvider";
import { SearchTermContext,SearchTerm1Context,SearchTerm2Context,SearchTerm3Context } from "../contexts/SearchsProvider";
// Hooks personalizados
import { ResetSearchTerms,ResetSelectedOptions,ResetSelectedTables } from "./Texts";
//____________IMPORT/EXPORT____________

// Hook para cambiar la vista del login ✔️
export const HandleLoginView = () => {
    // Constantes con el valor de los contextos 
    const [currentLView,setCurrentLView] = useContext(LoginViewContext);
    const [isLoggedType,setIsLoggedType] = useContext(LoggedTypeContext);
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    // Función del hook
    const handleLoginView = (option,type) => {
        setCurrentLView(option);
        if(option === 'Administration' || option === 'Kitchen'){
            setIsTextFieldsUser(prev => ({
                ...prev,             
                usuario: '',      
                contrasena: '',       
            }));
            setIsLoggedType('');
        }
        if(option === 'Login'){
            setIsLoggedType(type);
        }
    }
    // Retorno de la función del hook
    return handleLoginView;
}
// Hook para cambiar la vista del navbar ✔️
export const HandleNavbarView = () => {
    // Constantes con el valor de los contextos 
    const [currentNView,setCurrentNView] = useContext(NavbarViewContext);
    // Constantes con la funcionalidad de los hooks
    const resetSearchTerms = ResetSearchTerms();
    const resetSelectedOptions = ResetSelectedOptions();
    const resetSelectedTables = ResetSelectedTables();
    // Función del hook
    const handleNavbarView = (View) => {
        setCurrentNView(View);
        resetSearchTerms();
        resetSelectedOptions();
        resetSelectedTables();
        sessionStorage.setItem('Vista del Navbar',View);
    };
    // Retorno de la función del hook
    return handleNavbarView;
}
// Hook para controlar el teclado virtual 
export const HandleKeyboard = () => {
    // Constantes con el valor de los contextos 
    const [isTouch,setIsTouch] = useContext(TouchContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(SearchTermContext); 
    const [isSearchTerm1,setIsSearchTerm1] = useContext(SearchTerm1Context); 
    const [isSearchTerm2,setIsSearchTerm2] = useContext(SearchTerm2Context); 
    const [isSearchTerm3,setIsSearchTerm3] = useContext(SearchTerm3Context); 
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    const [isTextFieldsSupplier,setIsTextFieldsSupplier] = useContext(TextFieldsSupplierContext); 
    const [isTextFieldsObservation,setIsTextFieldsObservation] = useContext(TextFieldsObservationContext);
    const [isTextFieldsSupplyCategory,setIsTextFieldsSupplyCategory] = useContext(TextFieldsSupplyCategoryContext); 
    const [isTextFieldsSupplyType,setIsTextFieldsSupplyType] = useContext(TextFieldsSupplyTypesContext);
    const [isTextFieldsSupply,setIsTextFieldsSupply] = useContext(TextFieldsSupplyContext);
    const [isTextFieldsCleaningCategory,setIsTextFieldsCleaningCategory] = useContext(TextFieldsCleaningCategoryContext); 
    const [isTextFieldsCleaningType,setIsTextFieldsCleaningType] = useContext(TextFieldsCleaningTypeContext); 
    const [isTextFieldsCleaningSupply,setIsTextFieldsCleaningSupply] = useContext(TextFieldsCleaningSupplyContext);
    const [isTextFieldsFixedExpense,setIsTextFieldsFixedExpense] = useContext(TextFieldsFixedExpenseContext);
    const [isTextFieldsWarehouseOrder,setIsTextFieldsWarehouseOrder] = useContext(TextFieldsWarehouseOrderContext);
    const [isTextFieldsWarehouseFixedExpense,setIsTextFieldsWarehouseFixedExpense] = useContext(TextFieldsWarehouseFixedExpenseContext);
    const [isTextFieldsWarehouseSupply,setIsTextFieldsWarehouseSupply] = useContext(TextFieldsWarehouseSupplyContext);
    const [isTextFieldsWarehouseCleaning,setIsTextFieldsWarehouseCleaning] = useContext(TextFieldsWarehouseCleaningContext);
    const [isTextFieldsMenuType,setIsTextFieldsMenuType] = useContext(TextFieldsMenuTypeContext); 
    const [isTextFieldsDish,setIsTextFieldsDish] = useContext(TextFieldsDishContext);
    const [isTextFieldsSideDish,setIsTextFieldsSideDish] = useContext(TextFieldsSideDishContext);
    const [isTextFieldsDrink,setIsTextFieldsDrink] = useContext(TextFieldsDrinkContext);
    const [isTextFieldsOrderDoctor,setIsTextFieldsOrderDoctor] = useContext(TextFieldsOrderDoctorContext); 
    const [isTextFieldsOrderKitchen,setIsTextFieldsOrderKitchen] = useContext(TextFieldsOrderKitchenContext); 
    const [isIndexSearch] = useContext(IndexSearchContext);
    const [isIndexCount] = useContext(IndexCountContext);
    const [isIndexDetail] = useContext(IndexDetailContext); 
    // Constantes con el valor de los useRef
    const lastTouchTimeRef = useRef(0);
    // Hook con callback para verificar si hubo touch o no en la pantalla 
    const KeyboardView = useCallback(() => {
        const handleTouchStart = () => {
            lastTouchTimeRef.current = Date.now();
            setIsTouch(true);
        };

        const handleMouseDown = () => {
            const now = Date.now();
            const timeSinceLastTouch = now - lastTouchTimeRef.current;

            // Solo si no hubo un touch reciente, considera que es mouse
            if (timeSinceLastTouch > 500) {
                setIsTouch(false);
            }
        };

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('mousedown', handleMouseDown);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('mousedown', handleMouseDown);
        }; 
    }, []);
    /// Hook con callback para mantener visible el teclado
    const KeyboardClick = useCallback(() => {
        const handleClickOutside = (event) => {
            setTimeout(() => {
                // Usuario
                const inputName = document.getElementById("Input-Nombre");
                const inputShortName = document.getElementById("Input-Nombre-Corto");
                const inputUser = document.getElementById("Input-Usuario");
                const inputPassword = document.getElementById("Input-Contraseña");
                // Proveedor
                const inputRFC = document.getElementById("Input-RFC");
                const inputAddress = document.getElementById("Input-Domicilio");
                const inputPhone = document.getElementById("Input-Telefono");
                const inputEmail = document.getElementById("Input-Correo");
                // Categoria de insumos
                const inputDescription = document.getElementById("Input-Descripcion");
                // Tipos de insumos
                const inputLimit = document.getElementById("Input-Limite");
                // Insumos
                const inputCode = document.getElementById("Input-Codigo");
                const inputImage = document.getElementById("Input-Imagen");
                const inputSearch1 = document.getElementById("Input-Buscador-1");
                const inputSearch2 = document.getElementById("Input-Buscador-2");
                const inputSearch3 = document.getElementById("Input-Buscador-3");
                // Pedidos de almacén
                const inputID = document.getElementById("Input-ID");
                const inputCampus = document.getElementById("Input-Campus");
                const inputDetalle = document.querySelectorAll(".Input-Detalle");
                const inputObservation = document.getElementById("Input-Observacion");
                // Platillos-Guarniciones-Bebidas
                const inputsSearch = document.querySelectorAll(".Input-Buscador");
                const inputsCount = document.querySelectorAll(".Input-Cantidad");
                const inputPrice = document.getElementById("Input-Precio");
                const inputPreparation = document.getElementById("Input-Preparacion");
                // Pedido de doctor
                const inputRequester = document.getElementById("Input-Solicitante");
                const inputKey = document.getElementById("Input-Clave");
                // Pedido de cocina
                const inputUbication = document.getElementById("Input-Ubicacion");
                const inputE = document.getElementById("Input-Encargado");

                const keyboard = Keyboard.current && Keyboard.current.contains(event.target);
                const clickInsideInputsDetail = Array.from(inputDetalle).some(input => input.contains(event.target));
                const clickInsideInputsSearch = Array.from(inputsSearch).some(input => input.contains(event.target));
                const clickInsideInputsCount = Array.from(inputsCount).some(input => input.contains(event.target));

                const clickInsideInputs = 
                    // Usuario
                    (inputName && inputName.contains(event.target)) ||
                    (inputShortName && inputShortName.contains(event.target)) ||
                    (inputUser && inputUser.contains(event.target)) ||
                    (inputPassword && inputPassword.contains(event.target)) ||
                    // Proveedor
                    (inputRFC && inputRFC.contains(event.target)) ||
                    (inputAddress && inputAddress.contains(event.target)) ||
                    (inputPhone && inputPhone.contains(event.target)) ||
                    (inputEmail && inputEmail.contains(event.target)) ||
                    // Categoria de insumos
                    (inputDescription && inputDescription.contains(event.target)) ||
                    // Tipos de insumos
                    (inputLimit && inputLimit.contains(event.target)) ||
                    // Insumos
                    (inputCode && inputCode.contains(event.target)) ||
                    (inputImage && inputImage.contains(event.target)) ||
                    (inputSearch1 && inputSearch1.contains(event.target)) ||
                    (inputSearch2 && inputSearch2.contains(event.target)) ||
                    (inputSearch3 && inputSearch3.contains(event.target)) ||
                    // Pedidos de almacén
                    (inputID && inputID.contains(event.target)) ||
                    (inputCampus && inputCampus.contains(event.target)) ||
                    (inputObservation && inputObservation.contains(event.target)) ||
                    // Platillos-Guarniciones-Bebidas
                    (inputPrice && inputPrice.contains(event.target)) ||
                    (inputPreparation && inputPreparation.contains(event.target)) ||
                    // Pedido de doctor
                    (inputRequester && inputRequester.contains(event.target)) || 
                    (inputKey && inputKey.contains(event.target)) ||
                    // Pedido de cocina
                    (inputUbication && inputUbication.contains(event.target)) ||
                    (inputE && inputE.contains(event.target));

                if (!clickInsideInputs && !keyboard && !clickInsideInputsDetail && !clickInsideInputsSearch && !clickInsideInputsCount) {
                    setIsKeyboardView('');
                    setTimeout(() => {
                        setIsKeyboard(false);
                    }, 500);
                }
            }, 0);
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
    
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, []);
    // Hook con callback para escribir con el teclado
    const handleKeyboard = useCallback((newValue) => {
        switch (isKeyboardView) {
            case 'Nombre-Usuario':
                if (newValue.length > 150) return;
                setIsTextFieldsUser(prev => ({ ...prev, nombre: newValue }));
                break;
            case 'Nombre-Corto-Usuario':
                if (newValue.length > 50) return;
                setIsTextFieldsUser(prev => ({ ...prev, nombrecorto: newValue }));
                break;
            case 'Usuario':
                if (newValue.length > 25) return;
                setIsTextFieldsUser(prev => ({ ...prev, usuario: newValue }));
                break;
            case 'Contraseña':
                if (newValue.length > 15) return;
                setIsTextFieldsUser(prev => ({ ...prev, contrasena: newValue }));
                break;
            case 'Nombre-Proveedor':
                if (newValue.length > 150) return;
                setIsTextFieldsSupplier(prev => ({ ...prev, nombre: newValue }));
                break;
            case 'RFC':
                if (newValue.length > 30) return;
                setIsTextFieldsSupplier(prev => ({ ...prev, rfc: newValue }));
                break;
            case 'Domicilio':
                if (newValue.length > 150) return;
                setIsTextFieldsSupplier(prev => ({ ...prev, domicilio: newValue }));
                break;
            case 'Telefono':
                if (newValue.length > 20) return;
                if (isNaN(Number(newValue))) return;
                setIsTextFieldsSupplier(prev => ({ ...prev, telefono: newValue }));
                break;
            case 'Correo':
                if (newValue.length > 150) return;
                setIsTextFieldsSupplier(prev => ({ ...prev, correo: newValue }));
                break;
            case 'Nombre-Categoria-Insumo':
                if (newValue.length > 150) return;
                setIsTextFieldsSupplyCategory(prev => ({ ...prev, nombre: newValue }));
                break;
            case 'Descripcion-Categoria-Insumo':
                if (newValue.length > 250) return;
                setIsTextFieldsSupplyCategory(prev => ({ ...prev, descripcion: newValue }));
                break;
            case 'Nombre-Tipo-Insumo':
                if (newValue.length > 150) return;
                setIsTextFieldsSupplyType(prev => ({ ...prev, tipo: newValue }));
                break;
            case 'Descripcion-Tipo-Insumo':
                if (newValue.length > 250) return;
                setIsTextFieldsSupplyType(prev => ({ ...prev, descripcion: newValue }));
                break;
            case 'Limite':
                if (isNaN(Number(newValue))) return;
                setIsTextFieldsSupplyType(prev => ({ ...prev, limite: newValue }));
                break;
            case 'Cantidad':
                if (isNaN(Number(newValue))) return;
                setIsTextFieldsSupplyType(prev => ({...prev, cantidades: [{ cantidad: newValue }]}))
                break;
            case 'Buscador':
                setIsSearchTerm(newValue);
                break;
            case 'Codigo-Insumo':
                if (newValue.length > 20) return;
                setIsTextFieldsSupply(prev => ({ ...prev, codigo: newValue }));
                break;
            case 'Nombre-Insumo':
                if (newValue.length > 150) return;
                setIsTextFieldsSupply(prev => ({ ...prev, nombre: newValue }));
                break;
            case 'Descripcion-Insumo':
                if (newValue.length > 250) return;
                setIsTextFieldsSupply(prev => ({ ...prev, descripcion: newValue }));
                break;
            case 'Imagen-Insumo':
                if (newValue.length > 10000) return;
                setIsTextFieldsSupply(prev => ({ ...prev, imagen: newValue }));
                break;
            case 'Buscador-Proveedor':
                setIsSearchTerm1(newValue);
                break;
            case 'Buscador-Categoria':
                setIsSearchTerm2(newValue);
                break;
            case 'Buscador-Tipo':
                setIsSearchTerm3(newValue);
                break;
            case 'Nombre-Categoria-Limpieza':
                if (newValue.length > 150) return;
                setIsTextFieldsCleaningCategory(prev => ({ ...prev, nombre: newValue }));
                break;
            case 'Descripcion-Categoria-Limpieza':
                if (newValue.length > 250) return;
                setIsTextFieldsCleaningCategory(prev => ({ ...prev, descripcion: newValue }));
                break;
            case 'Nombre-Tipo-Limpieza':
                if (newValue.length > 150) return;
                setIsTextFieldsCleaningType(prev => ({ ...prev, tipo: newValue }));
                break;
            case 'Descripcion-Tipo-Limpieza':
                if (newValue.length > 250) return;
                setIsTextFieldsCleaningType(prev => ({ ...prev, descripcion: newValue }));
                break;
            case 'Limite-Tipo-Limpieza':
                if (isNaN(Number(newValue))) return;
                setIsTextFieldsCleaningType(prev => ({ ...prev, limite: newValue }));
                break;
            case 'Cantidad-Tipo-Limpieza':
                if (isNaN(Number(newValue))) return;
                setIsTextFieldsCleaningType(prev => ({...prev, cantidades: [{ cantidad: newValue }]}))
                break;
            case 'Buscador-Tipo-Limpieza':
                setIsSearchTerm(newValue);
                break;  
            case 'Codigo-Suministro':
                if (newValue.length > 20) return;
                setIsTextFieldsCleaningSupply(prev => ({ ...prev, codigo: newValue }));
                break;
            case 'Nombre-Suministro':
                if (newValue.length > 150) return;
                setIsTextFieldsCleaningSupply(prev => ({ ...prev, nombre: newValue }));
                break;
            case 'Descripcion-Suministro':
                if (newValue.length > 250) return;
                setIsTextFieldsCleaningSupply(prev => ({ ...prev, descripcion: newValue }));
                break;
            case 'Imagen-Suministro':
                if (newValue.length > 10000) return;
                setIsTextFieldsCleaningSupply(prev => ({ ...prev, imagen: newValue }));
                break;
            case 'Buscador-Proveedor-Suministro':
                setIsSearchTerm1(newValue);
                break;
            case 'Buscador-Categoria-Suministro':
                setIsSearchTerm2(newValue);
                break;
            case 'Buscador-Tipo-Suministro':
                setIsSearchTerm3(newValue);
                break;
            case 'Nombre-Gasto-Fijo':
                if (newValue.length > 150) return;
                setIsTextFieldsFixedExpense(prev => ({ ...prev, nombre: newValue }));
                break;
            case 'Descripcion-Gasto-Fijo':
                if (newValue.length > 250) return;
                setIsTextFieldsFixedExpense(prev => ({ ...prev, descripcion: newValue }));
                break;
            case 'ID-Pedido-Almacen':
                if (isNaN(Number(newValue))) return;
                setIsTextFieldsWarehouseOrder(prev => ({...prev, idpedido: newValue}))
                break; 
            case 'Campus-Pedido-Almacen':
                if (newValue.length > 50) return;
                setIsTextFieldsWarehouseOrder(prev => ({ ...prev, campus: newValue }));
                break;
            case 'Buscador-Proveedor-Pedido-Almacen':
                setIsSearchTerm1(newValue);
                break;
            case `Cantidad-Pedido-Almacen-Insumo-${isIndexCount}`:
                if (isNaN(Number(newValue))) return;
                setIsTextFieldsWarehouseOrder(prev => {
                    const newInsumos = [...prev.insumos];
                    newInsumos[isIndexCount].cantidad = newValue;
                    return { ...prev, insumos: newInsumos };
                });
                break;
            case `Cantidad-Pedido-Almacen-Suministro-${isIndexCount}`:
                if (isNaN(Number(newValue))) return;
                setIsTextFieldsWarehouseOrder(prev => {
                    const newSuministros = [...prev.suministros];
                    newSuministros[isIndexCount].cantidad = newValue;
                    return { ...prev, suministros: newSuministros };
                });
                break;
            case `Detalle-Pedido-Almacen-Insumo-${isIndexDetail}`:
                if (newValue.length > 500) return;
                setIsTextFieldsWarehouseOrder(prev => {
                    const newInsumos = [...prev.insumos];
                    newInsumos[isIndexDetail].mensajes[0].mensaje = newValue;
                    return { ...prev, insumos: newInsumos };
                });
                break;
            case `Detalle-Pedido-Almacen-Sumnistro-${isIndexDetail}`:
                if (newValue.length > 500) return;
                setIsTextFieldsWarehouseOrder(prev => {
                    const newSuministros = [...prev.suministros];
                    newSuministros[isIndexDetail].mensajes[0].mensaje = newValue;
                    return { ...prev, suministros: newSuministros };
                });
                break;
            case `Precio-Pedido-Almacen-Insumo-${isIndexCount}`:
                if (isNaN(Number(newValue))) return;
                setIsTextFieldsWarehouseOrder(prev => {
                    const newInsumos = [...prev.insumos];
                    const unitPrice = Number(newValue);
                    const quantity = Number(newInsumos[isIndexCount].cantidad) || 0;
                    const totalPrice = unitPrice * quantity;

                    newInsumos[isIndexCount] = {
                        ...newInsumos[isIndexCount],
                        preciounitario: newValue,
                        preciototal: totalPrice
                    };
                    return { ...prev, insumos: newInsumos };
                });
                break;
            case `Precio-Pedido-Almacen-Suministro-${isIndexCount}`:
                if (isNaN(Number(newValue))) return;
                setIsTextFieldsWarehouseOrder(prev => {
                    const newSuministros = [...prev.suministros];
                    const unitPrice = Number(newValue);
                    const quantity = Number(newSuministros[isIndexCount].cantidad) || 0;
                    const totalPrice = unitPrice * quantity;

                    newSuministros[isIndexCount] = {
                        ...newSuministros[isIndexCount],
                        preciounitario: newValue,
                        preciototal: totalPrice
                    };
                    return { ...prev, suministros: newSuministros };
                });
                break;
            case 'Observacion-Pedido-Almacen':
                if (newValue.length > 250) return;
                setIsTextFieldsObservation(prev => ({ ...prev, observacion: newValue }));
                break;
            case 'Precio-Almacen-Gasto-Fijo':
                if (isNaN(Number(newValue))) return;
                setIsTextFieldsWarehouseFixedExpense(prev => ({...prev, precio: newValue}));
                break;
            case 'Cantidad-Almacen-Suministro':
                if (isNaN(Number(newValue))) return;
                setIsTextFieldsWarehouseCleaning(prev => ({...prev, cantidadreal: newValue}));
                break;
            case 'Precio-Unitario-Almacen-Suministro':
                if (isNaN(Number(newValue))) return;
                setIsTextFieldsWarehouseCleaning(prev => ({...prev, preciounitario: newValue}));
                break;
            case 'Cantidad-Almacen-Insumo':
                if (isNaN(Number(newValue))) return;
                setIsTextFieldsWarehouseSupply(prev => ({...prev, cantidadreal: newValue}));
                break;
            case 'Precio-Unitario-Almacen-Insumo':
                if (isNaN(Number(newValue))) return;
                setIsTextFieldsWarehouseSupply(prev => ({...prev, preciounitario: newValue}));
                break;
            case 'Nombre-Menu':
                if (newValue.length > 100) return;
                setIsTextFieldsMenuType(prev => ({ ...prev, nombre: newValue }));
                break;
            case 'Nombre-Platillo':
                if (newValue.length > 100) return;
                setIsTextFieldsDish(prev => ({ ...prev, nombre: newValue }));
                break;
            case 'Descripcion-Platillo':
                if (newValue.length > 500) return;
                setIsTextFieldsDish(prev => ({ ...prev, descripcion: newValue }));
                break;
            case 'Imagen-Platillo':
                if (newValue.length > 10000) return;
                setIsTextFieldsDish(prev => ({ ...prev, imagen: newValue }));
                break;
            case 'Precio-Platillo':
                if (isNaN(Number(newValue))) return;
                setIsTextFieldsDish(prev => ({...prev, precio: newValue }))
                break;
            case 'Preparacion-Platillo':
                if (isNaN(Number(newValue))) return;
                setIsTextFieldsDish(prev => ({...prev, preparacion: newValue }))
                break;
            case `Buscador-Platillo-${isIndexSearch}`:
                setIsTextFieldsDish(prev => {
                    const newIngredientes = [...prev.ingredientes];
                    newIngredientes[isIndexSearch].buscador = newValue;
                    return { ...prev, ingredientes: newIngredientes };
                });
                break;
            case `Cantidad-Platillo-${isIndexCount}`:
                if (isNaN(Number(newValue))) return;
                setIsTextFieldsDish(prev => {
                    const newIngredientes = [...prev.ingredientes];
                    newIngredientes[isIndexCount].cantidad = newValue;
                    return { ...prev, ingredientes: newIngredientes };
                });
                break;
            case 'Nombre-Guarnicion':
                if (newValue.length > 100) return;
                setIsTextFieldsSideDish(prev => ({ ...prev, nombre: newValue }));
                break;
            case 'Descripcion-Guarnicion':
                if (newValue.length > 500) return;
                setIsTextFieldsSideDish(prev => ({ ...prev, descripcion: newValue }));
                break;
            case 'Imagen-Guarnicion':
                if (newValue.length > 10000) return;
                setIsTextFieldsSideDish(prev => ({ ...prev, imagen: newValue }));
                break;
            case 'Precio-Guarnicion':
                if (isNaN(Number(newValue))) return;
                setIsTextFieldsSideDish(prev => ({...prev, precio: newValue }))
                break;
            case 'Preparacion-Guarnicion':
                if (isNaN(Number(newValue))) return;
                setIsTextFieldsSideDish(prev => ({...prev, preparacion: newValue }))
                break;
            case `Buscador-Guarnicion-${isIndexSearch}`:
                setIsTextFieldsSideDish(prev => {
                    const newIngredientes = [...prev.ingredientes];
                    newIngredientes[isIndexSearch].buscador = newValue;
                    return { ...prev, ingredientes: newIngredientes };
                });
                break;
            case `Cantidad-Guarnicion-${isIndexCount}`:
                if (isNaN(Number(newValue))) return;
                setIsTextFieldsSideDish(prev => {
                    const newIngredientes = [...prev.ingredientes];
                    newIngredientes[isIndexCount].cantidad = newValue;
                    return { ...prev, ingredientes: newIngredientes };
                });
                break;  
            case 'Nombre-Bebida':
                if (newValue.length > 100) return;
                setIsTextFieldsDrink(prev => ({ ...prev, nombre: newValue }));
                break;
            case 'Descripcion-Bebida':
                if (newValue.length > 500) return;
                setIsTextFieldsDrink(prev => ({ ...prev, descripcion: newValue }));
                break;
            case 'Imagen-Bebida':
                if (newValue.length > 10000) return;
                setIsTextFieldsDrink(prev => ({ ...prev, imagen: newValue }));
                break;
            case 'Precio-Bebida':
                if (isNaN(Number(newValue))) return;
                setIsTextFieldsDrink(prev => ({...prev, precio: newValue }))
                break;
            case 'Preparacion-Bebida':
                if (isNaN(Number(newValue))) return;
                setIsTextFieldsDrink(prev => ({...prev, preparacion: newValue }))
                break;
            case `Buscador-Bebida-${isIndexSearch}`:
                setIsTextFieldsDrink(prev => {
                    const newIngredientes = [...prev.ingredientes];
                    newIngredientes[isIndexSearch].buscador = newValue;
                    return { ...prev, ingredientes: newIngredientes };
                });
                break;
            case `Cantidad-Bebida-${isIndexCount}`:
                if (isNaN(Number(newValue))) return;
                setIsTextFieldsDrink(prev => {
                    const newIngredientes = [...prev.ingredientes];
                    newIngredientes[isIndexCount].cantidad = newValue;
                    return { ...prev, ingredientes: newIngredientes };
                });
                break;
            case 'Solicitante':
                if (newValue.length > 150) return;
                setIsTextFieldsOrderDoctor(prev => ({ ...prev, solicitante: newValue }));
                break;
            case 'Clave':
                if (newValue.length > 20) return;
                setIsTextFieldsOrderDoctor(prev => ({ ...prev, clavesecreta: newValue }));
                break;
            case 'Ubicacion':
                if (newValue.length > 250) return;
                setIsTextFieldsOrderKitchen(prev => ({ ...prev, ubicacion: newValue }));
                break;
            case 'Encargado':
                if (newValue.length > 150) return;
                setIsTextFieldsOrderKitchen(prev => ({ ...prev, encargado: newValue }));
                break;
            case `Cantidad-Pedido-${isIndexCount}`:
                if (isNaN(Number(newValue))) return;
                setIsTextFieldsOrderKitchen(prev => {
                    const newPedidos = [...prev.pedidos];
                    newPedidos[isIndexCount].cantidad = newValue;
                    return { ...prev, pedidos: newPedidos };
                });
                break;
        }
    }, [isKeyboardView]);
    // Retorno de las funciónes del hook
    return { KeyboardView,KeyboardClick,handleKeyboard }
}
// Hook para cambiar la vista del sidebar ✔️
export const HandleSidebarView = () => {
    // Constantes con el valor de los contextos 
    const [currentSView,setCurrentSView] = useContext(SidebarViewContext);
    // Constantes con la funcionalidad de los hooks
    const resetSearchTerms = ResetSearchTerms();
    const resetSelectedOptions = ResetSelectedOptions();
    const resetSelectedTables = ResetSelectedTables();
    // Función del hook
    const handleSidebarView = (View) => {
        setCurrentSView(View);
        resetSearchTerms();
        resetSelectedOptions();
        resetSelectedTables();
        sessionStorage.setItem('Vista del Sidebar',View);
    };
    // Retorno de la función del hook
    return handleSidebarView;
};
// Hook para cambiar el sidebar (Ocultar/Mostrar) ✔️
export const ToggleSidebar = () => {
    // Constantes con el valor de los contextos 
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    // Función del hook
    const toggleSidebar = () => {
        setIsSidebar(!isSidebar);
        sessionStorage.setItem('Estado del Sidebar',!isSidebar);
    };
    // Retorno de la función del hook
    return toggleSidebar;
};
// Hook para cambiar el modal ✔️
export const HandleModalView = () => {
    // Constantes con el valor de los contextos
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const resetSearchTerms = ResetSearchTerms();
    const resetSelectedOptions = ResetSelectedOptions();
    // Función del hook
    const handleModalView = (View) => {
        setIsModal(true);
        sessionStorage.setItem('Estado del Modal',true);
        const route = sessionStorage.getItem('Ruta');
        const sidebar = sessionStorage.getItem('Estado del Sidebar')
        // CERRAR SESIÓN
        if(currentMView === 'Cerrar-Sesión' && View === ''){
            setIsActionBlock(true);
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Estado del Modal',false);
                if(sidebar === 'true'){setIsSidebar(true)};
                setIsActionBlock(false);
                return navigate(route,{ replace: true });
            },750);
        }
        // CLAVE SECRETA
        if(currentMView === 'Clave-Secreta' && View === ''){
            setIsActionBlock(true);
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Estado del Modal',false);
                if(sidebar === 'true'){setIsSidebar(true)};
                setIsActionBlock(false);
                return navigate(route,{ replace: true });
            },750);
        }
        setCurrentMView(View);
        sessionStorage.setItem('Vista del Modal',View);
        resetSelectedOptions();
        resetSearchTerms();
    }
    // Retorno de la función del hook
    return handleModalView;
}