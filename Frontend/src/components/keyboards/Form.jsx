//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { KeyboardContext,KeyboardViewContext,IndexCountContext,IndexSearchContext,IndexDetailContext } from "../../contexts/VariablesProvider";
import { TextFieldsUserContext,TextFieldsSupplierContext,TextFieldsCleaningTypeContext,TextFieldsWarehouseFixedExpenseContext,TextFieldsWarehouseSupplyContext,TextFieldsWarehouseCleaningContext,TextFieldsObservationContext,TextFieldsWarehouseOrderContext,TextFieldsCleaningCategoryContext,TextFieldsFixedExpenseContext,TextFieldsCleaningSupplyContext,TextFieldsSupplyCategoryContext,TextFieldsSideDishContext,TextFieldsDrinkContext,TextFieldsDishContext,TextFieldsSupplyContext,TextFieldsSupplyTypesContext,TextFieldsMenuTypeContext } from "../../contexts/FormsProvider";
import { SearchTermContext,SearchTerm1Context,SearchTerm2Context,SearchTerm3Context } from "../../contexts/SearchsProvider";
// Hooks personalizados 
import { HandleKeyboard } from "../../hooks/Views";
// Componentes perzonalizados
import Keyboard_Default from "./Defaullt";
import Keyboard_Numeric from "./Numeric";
//____________IMPORT/EXPORT____________

export const Keyboard_Form_Search = () => {
    // Constantes con el valor de los contextos
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView] = useContext(KeyboardViewContext);
    // Constantes con la funcionalidad de los hooks
    const { handleKeyboard } = HandleKeyboard();
    // Estructura del componente
    return (
        <>
            {isKeyboard ? (
                <Keyboard_Default 
                    value={isKeyboardView === 'Buscador' ? isSearchTerm : null} 
                    onChange={handleKeyboard}
                /> 
            ):(
                <></>
            )}
        </>
    );
};
export const Keyboard_Form_User = () => {
    // Constantes con el valor de los contextos
    const [isTextFieldsUser] = useContext(TextFieldsUserContext);
    const [isKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView] = useContext(KeyboardViewContext);
    // Constantes con la funcionalidad de los hooks
    const { handleKeyboard } = HandleKeyboard();
    // Estructura del componente
    return (
        <>
            {isKeyboard ? (
                <>
                    <Keyboard_Default 
                        value={isKeyboardView === 'Nombre-Usuario' ? isTextFieldsUser.nombre :
                               isKeyboardView === 'Nombre-Corto-Usuario' ? isTextFieldsUser.nombrecorto :
                               isKeyboardView === 'Usuario' ? isTextFieldsUser.usuario :
                               isKeyboardView === 'Contraseña' ? isTextFieldsUser.contrasena : null} 
                        onChange={handleKeyboard}
                    />  
                </>
            ):(
                <></>
            )}
        </>
    );
};
export const Keyboard_Form_Supplier = () => {
    // Constantes con el valor de los contextos
    const [isTextFieldsSupplier] = useContext(TextFieldsSupplierContext); 
    const [isKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView] = useContext(KeyboardViewContext);
    // Constantes con la funcionalidad de los hooks
    const { handleKeyboard } = HandleKeyboard();
    // Estructura del componente
    return (
        <>
            {isKeyboard ? (
                <>
                    {isKeyboardView === 'Nombre-Proveedor' || isKeyboardView === 'RFC' || isKeyboardView === 'Domicilio' || isKeyboardView === 'Correo' ? (
                        <Keyboard_Default 
                            value={isKeyboardView === 'Nombre-Proveedor' ? isTextFieldsSupplier.nombre :
                                isKeyboardView === 'RFC' ? isTextFieldsSupplier.rfc :
                                isKeyboardView === 'Domicilio' ? isTextFieldsSupplier.domicilio :
                                isKeyboardView === 'Correo' ? isTextFieldsSupplier.correo : null} 
                            onChange={handleKeyboard}
                        /> 
                    ):(
                        <></>
                    )}
                    {isKeyboardView === 'Telefono' ? (
                        <Keyboard_Numeric
                            value={isKeyboardView === 'Telefono' ? isTextFieldsSupplier.telefono : null}
                            onChange={handleKeyboard}
                        />
                    ):(
                        <></>
                    )}
                </>
            ):(
                <></>
            )}
        </>
    );
};
export const Keyboard_Form_Supply_Category = () => {
    // Constantes con el valor de los contextos
    const [isTextFieldsSupplyCategory] = useContext(TextFieldsSupplyCategoryContext);
    const [isKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView] = useContext(KeyboardViewContext);
    // Constantes con la funcionalidad de los hooks
    const { handleKeyboard } = HandleKeyboard();
    // Estructura del componente
    return (
        <>
            {isKeyboard ? (
                <Keyboard_Default 
                    value={isKeyboardView === 'Nombre-Categoria-Insumo' ? isTextFieldsSupplyCategory.nombre :
                           isKeyboardView === 'Descripcion-Categoria-Insumo' ? isTextFieldsSupplyCategory.descripcion : null} 
                    onChange={handleKeyboard}
                /> 
            ):(
                <></>
            )}
        </>
    );
};
export const Keyboard_Form_Supply_Type = () => {
    // Constantes con el valor de los contextos
    const [isTextFieldsSupplyType] = useContext(TextFieldsSupplyTypesContext);
    const [isKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView] = useContext(KeyboardViewContext);
    const [isSearchTerm] = useContext(SearchTermContext); 
    // Constantes con la funcionalidad de los hooks
    const { handleKeyboard } = HandleKeyboard();
    // Estructura del componente
    return (
        <>
            {isKeyboard ? (
                <>
                    {isKeyboardView === 'Nombre-Tipo-Insumo' || isKeyboardView === 'Descripcion-Tipo-Insumo' || isKeyboardView === 'Buscador' ? (
                        <Keyboard_Default 
                            value={isKeyboardView === 'Nombre-Tipo-Insumo' ? isTextFieldsSupplyType.tipo :
                                isKeyboardView === 'Descripcion-Tipo-Insumo' ? isTextFieldsSupplyType.descripcion : 
                                isKeyboardView === 'Buscador' ? isSearchTerm : null} 
                            onChange={handleKeyboard}
                        />
                    ):(
                        <></>
                    )}
                    {isKeyboardView === 'Limite' || isKeyboardView === 'Cantidad' ? (
                        <Keyboard_Numeric
                            value={isKeyboardView === 'Limite' ? isTextFieldsSupplyType.limite : 
                                isKeyboardView === 'Cantidad' ? isTextFieldsSupplyType.cantidades?.[0]?.cantidad ?? '' : null}
                            onChange={handleKeyboard}
                        />
                    ):(
                        <></>
                    )}
                </>
            ):(
                <></>
            )}
        </>
    );
};
export const Keyboard_Form_Supply = () => {
    // Constantes con el valor de los contextos
    const [isTextFieldsSupply] = useContext(TextFieldsSupplyContext);
    const [isKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView] = useContext(KeyboardViewContext);
    const [isSearchTerm1] = useContext(SearchTerm1Context); 
    const [isSearchTerm2] = useContext(SearchTerm2Context); 
    const [isSearchTerm3] = useContext(SearchTerm3Context);  
    // Constantes con la funcionalidad de los hooks
    const { handleKeyboard } = HandleKeyboard();
    // Estructura del componente
    return (
        <>
            {isKeyboard ? (
                <Keyboard_Default 
                    value={isKeyboardView === 'Codigo-Insumo' ? isTextFieldsSupply.codigo :
                        isKeyboardView === 'Nombre-Insumo' ? isTextFieldsSupply.nombre :
                        isKeyboardView === 'Descripcion-Insumo' ? isTextFieldsSupply.descripcion : 
                        isKeyboardView === 'Imagen-Insumo' ? isTextFieldsSupply.imagen :
                        isKeyboardView === 'Buscador-Proveedor' ? isSearchTerm1 : 
                        isKeyboardView === 'Buscador-Categoria' ? isSearchTerm2 : 
                        isKeyboardView === 'Buscador-Tipo' ? isSearchTerm3 : null} 
                    onChange={handleKeyboard}
                />
            ):(
                <></>
            )}
        </>
    );
};
export const Keyboard_Form_Cleaning_Category = () => {
    // Constantes con el valor de los contextos
    const [isTextFieldsCleaningCategory] = useContext(TextFieldsCleaningCategoryContext);
    const [isKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView] = useContext(KeyboardViewContext);
    // Constantes con la funcionalidad de los hooks
    const { handleKeyboard } = HandleKeyboard();
    // Estructura del componente
    return (
        <>
            {isKeyboard ? (
                <Keyboard_Default 
                    value={isKeyboardView === 'Nombre-Categoria-Limpieza' ? isTextFieldsCleaningCategory.nombre :
                        isKeyboardView === 'Descripcion-Categoria-Limpieza' ? isTextFieldsCleaningCategory.descripcion : null} 
                    onChange={handleKeyboard}
                />
            ):(
                <></>
            )}
        </>
    );
};
export const Keyboard_Form_Cleaning_Type = () => {
    // Constantes con el valor de los contextos
    const [isTextFieldsCleaningType] = useContext(TextFieldsCleaningTypeContext); 
    const [isKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView] = useContext(KeyboardViewContext);
    const [isSearchTerm] = useContext(SearchTermContext); 
    // Constantes con la funcionalidad de los hooks
    const { handleKeyboard } = HandleKeyboard();
    // Estructura del componente
    return (
        <>
            {isKeyboard ? (
                <>
                    {isKeyboardView === 'Nombre-Tipo-Limpieza' || isKeyboardView === 'Descripcion-Tipo-Limpieza' || isKeyboardView === 'Buscador-Tipo-Limpieza' ? (
                        <Keyboard_Default 
                            value={isKeyboardView === 'Nombre-Tipo-Limpieza' ? isTextFieldsCleaningType.tipo :
                                isKeyboardView === 'Descripcion-Tipo-Limpieza' ? isTextFieldsCleaningType.descripcion : 
                                isKeyboardView === 'Buscador-Tipo-Limpieza' ? isSearchTerm : null} 
                            onChange={handleKeyboard}
                        />
                    ):(
                        <></>
                    )}
                    {isKeyboardView === 'Limite-Tipo-Limpieza' || isKeyboardView === 'Cantidad-Tipo-Limpieza' ? (
                        <Keyboard_Numeric
                            value={isKeyboardView === 'Limite-Tipo-Limpieza' ? isTextFieldsCleaningType.limite : 
                                isKeyboardView === 'Cantidad-Tipo-Limpieza' ? isTextFieldsCleaningType.cantidades?.[0]?.cantidad ?? '' : null}
                            onChange={handleKeyboard}
                        />
                    ):(
                        <></>
                    )}
                </>
            ):(
                <></>
            )}
        </>
    );
};
export const Keyboard_Form_Cleaning_Supply = () => {
    // Constantes con el valor de los contextos
    const [isTextFieldsCleaningSupply] = useContext(TextFieldsCleaningSupplyContext);
    const [isKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView] = useContext(KeyboardViewContext);
    const [isSearchTerm1] = useContext(SearchTerm1Context); 
    const [isSearchTerm2] = useContext(SearchTerm2Context); 
    const [isSearchTerm3] = useContext(SearchTerm3Context); 
    // Constantes con la funcionalidad de los hooks
    const { handleKeyboard } = HandleKeyboard();
    // Estructura del componente
    return (
        <>
            {isKeyboard ? (
                <Keyboard_Default 
                    value={isKeyboardView === 'Codigo-Suministro' ? isTextFieldsCleaningSupply.codigo :
                        isKeyboardView === 'Nombre-Suministro' ? isTextFieldsCleaningSupply.nombre :
                        isKeyboardView === 'Descripcion-Suministro' ? isTextFieldsCleaningSupply.descripcion : 
                        isKeyboardView === 'Imagen-Suministro' ? isTextFieldsCleaningSupply.imagen :
                        isKeyboardView === 'Buscador-Proveedor-Suministro' ? isSearchTerm1 : 
                        isKeyboardView === 'Buscador-Categoria-Suministro' ? isSearchTerm2 :
                        isKeyboardView === 'Buscador-Tipo-Suministro' ? isSearchTerm3 : null} 
                    onChange={handleKeyboard}
                />
            ):(
                <></>
            )}
        </>
    );
};
export const Keyboard_Form_Fixed_Expense = () => {
    // Constantes con el valor de los contextos
    const [isTextFieldsFixedExpense] = useContext(TextFieldsFixedExpenseContext);
    const [isKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView] = useContext(KeyboardViewContext); 
    // Constantes con la funcionalidad de los hooks
    const { handleKeyboard } = HandleKeyboard();
    // Estructura del componente
    return (
        <>
            {isKeyboard ? (
                <Keyboard_Default 
                    value={isKeyboardView === 'Nombre-Gasto-Fijo' ? isTextFieldsFixedExpense.nombre :
                        isKeyboardView === 'Descripcion-Gasto-Fijo' ? isTextFieldsFixedExpense.descripcion : null} 
                    onChange={handleKeyboard}
                />
            ):(
                <></>
            )}
        </>
    );
};
export const Keyboard_Form_Warehouse_Order = () => {
    // Constantes con el valor de los contextos
    const [isTextFieldsWarehouseOrder] = useContext(TextFieldsWarehouseOrderContext);
    const [isTextFieldsObservation] = useContext(TextFieldsObservationContext);
    const [isKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView] = useContext(KeyboardViewContext); 
    const [isIndexCount] = useContext(IndexCountContext);
    const [isIndexDetail] = useContext(IndexDetailContext);
    const [isSearchTerm1] = useContext(SearchTerm1Context);
    // Constantes con la funcionalidad de los hooks
    const { handleKeyboard } = HandleKeyboard();
    // Estructura del componente
    return (
        <>
            {isKeyboard ? (
                <>
                    {isKeyboardView === 'Campus-Pedido-Almacen' || isKeyboardView === 'Buscador-Proveedor-Pedido-Almacen' || isKeyboardView === `Detalle-Pedido-Almacen-Sumnistro-${isIndexDetail}` || isKeyboardView === `Detalle-Pedido-Almacen-Insumo-${isIndexDetail}` || isKeyboardView === 'Observacion-Pedido-Almacen' ? (
                        <Keyboard_Default 
                            value={isKeyboardView === 'Campus-Pedido-Almacen' ? isTextFieldsWarehouseOrder.campus :
                                isKeyboardView === 'Buscador-Proveedor-Pedido-Almacen' ? isSearchTerm1 :
                                isKeyboardView === `Detalle-Pedido-Almacen-Sumnistro-${isIndexDetail}` ? isTextFieldsWarehouseOrder.suministros[isIndexDetail].mensajes[0].mensaje :
                                isKeyboardView === `Detalle-Pedido-Almacen-Insumo-${isIndexDetail}` ? isTextFieldsWarehouseOrder.insumos[isIndexDetail].mensajes[0].mensaje :
                                isKeyboardView === 'Observacion-Pedido-Almacen' ? isTextFieldsObservation.observacion : null} 
                            onChange={handleKeyboard}
                    />
                    ):(
                        <></>
                    )}
                    {isKeyboardView === 'ID-Pedido-Almacen' || isKeyboardView === `Cantidad-Pedido-Almacen-Insumo-${isIndexCount}` || isKeyboardView === `Cantidad-Pedido-Almacen-Suministro-${isIndexCount}` || isKeyboardView === `Precio-Pedido-Almacen-Insumo-${isIndexCount}` || isKeyboardView === `Precio-Pedido-Almacen-Suministro-${isIndexCount}` ? (
                        <Keyboard_Numeric
                            value={isKeyboardView === 'ID-Pedido-Almacen' ? isTextFieldsWarehouseOrder.idpedido :
                                isKeyboardView === `Cantidad-Pedido-Almacen-Insumo-${isIndexCount}` ? isTextFieldsWarehouseOrder.insumos[isIndexCount].cantidad :
                                isKeyboardView === `Cantidad-Pedido-Almacen-Suministro-${isIndexCount}` ? isTextFieldsWarehouseOrder.suministros[isIndexCount].cantidad : 
                                isKeyboardView === `Precio-Pedido-Almacen-Insumo-${isIndexCount}` ? isTextFieldsWarehouseOrder.insumos[isIndexCount].preciounitario :
                                isKeyboardView === `Precio-Pedido-Almacen-Suministro-${isIndexCount}` ? isTextFieldsWarehouseOrder.suministros[isIndexCount].preciounitario : null
                            }
                            onChange={handleKeyboard}
                        />
                    ):(
                        <></> 
                    )}
                </>
            ):(
                <></>
            )}
        </>
    );
};
export const Keyboard_Form_Warehouse_Products = () => {
    // Constantes con el valor de los contextos
    const [isKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView] = useContext(KeyboardViewContext);
    const [isTextFieldsWarehouseFixedExpense] = useContext(TextFieldsWarehouseFixedExpenseContext);
    const [isTextFieldsWarehouseSupply] = useContext(TextFieldsWarehouseSupplyContext);
    const [isTextFieldsWarehouseCleaning] = useContext(TextFieldsWarehouseCleaningContext);
    // Constantes con la funcionalidad de los hooks
    const { handleKeyboard } = HandleKeyboard();
    // Estructura del componente
    return (
        <>
            {isKeyboard ? (
                <Keyboard_Numeric
                    value={isKeyboardView === 'Precio-Almacen-Gasto-Fijo' ? isTextFieldsWarehouseFixedExpense.precio :
                        isKeyboardView === 'Cantidad-Almacen-Suministro' ? isTextFieldsWarehouseCleaning.cantidadreal :
                        isKeyboardView === 'Cantidad-Almacen-Insumo' ? isTextFieldsWarehouseSupply.cantidadreal : null
                    }
                    onChange={handleKeyboard}
                />
            ):(
                <></>
            )}
        </>
    );
};
export const Keyboard_Form_Menu = () => {
    // Constantes con el valor de los contextos
    const [isTextFieldsMenuType] = useContext(TextFieldsMenuTypeContext); 
    const [isKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView] = useContext(KeyboardViewContext);
    // Constantes con la funcionalidad de los hooks
    const { handleKeyboard } = HandleKeyboard();
    // Estructura del componente
    return (
        <>
            {isKeyboard ? (
                <Keyboard_Default 
                    value={isKeyboardView === 'Nombre-Menu' ? isTextFieldsMenuType.nombre : null} 
                    onChange={handleKeyboard}
                />  
            ):(
                <></>
            )}
        </>
    );
};
export const Keyboard_Form_Dish = () => {
    // Constantes con el valor de los contextos
    const [isTextFieldsDish] = useContext(TextFieldsDishContext);
    const [isKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView] = useContext(KeyboardViewContext); 
    const [isIndexSearch] = useContext(IndexSearchContext); 
    const [isIndexCount] = useContext(IndexCountContext);
    // Constantes con la funcionalidad de los hooks
    const { handleKeyboard } = HandleKeyboard();
    // Estructura del componente
    return (
        <>
            {isKeyboard ? (
                <>
                    {isKeyboardView === 'Nombre-Platillo' || isKeyboardView === 'Descripcion-Platillo' || isKeyboardView === 'Imagen-Platillo' || isKeyboardView === `Buscador-Platillo-${isIndexSearch}` ? (
                        <Keyboard_Default 
                            value={isKeyboardView === 'Nombre-Platillo' ? isTextFieldsDish.nombre :
                                isKeyboardView === 'Descripcion-Platillo' ? isTextFieldsDish.descripcion :
                                isKeyboardView === 'Imagen-Platillo' ? isTextFieldsDish.imagen :
                                isKeyboardView === `Buscador-Platillo-${isIndexSearch}` ? isTextFieldsDish.ingredientes[isIndexSearch].buscador : null} 
                            onChange={handleKeyboard}
                    />
                    ):(
                        <></>
                    )}
                    {isKeyboardView === 'Precio-Platillo' || isKeyboardView === 'Preparacion-Platillo' || isKeyboardView === `Cantidad-Platillo-${isIndexCount}` ? (
                        <Keyboard_Numeric
                            value={isKeyboardView === 'Precio-Platillo' ? isTextFieldsDish.precio :
                                isKeyboardView === 'Preparacion-Platillo' ? isTextFieldsDish.preparacion :
                                isKeyboardView === `Cantidad-Platillo-${isIndexCount}` ? isTextFieldsDish.ingredientes[isIndexCount].cantidad : null
                            }
                            onChange={handleKeyboard}
                        />
                    ):(
                        <></> 
                    )}
                </>
            ):(
                <></>
            )}
        </>
    );
};
export const Keyboard_Form_Side_Dish = () => {
    // Constantes con el valor de los contextos
    const [isTextFieldsSideDish] = useContext(TextFieldsSideDishContext);
    const [isKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView] = useContext(KeyboardViewContext); 
    const [isIndexSearch] = useContext(IndexSearchContext); 
    const [isIndexCount] = useContext(IndexCountContext);
    // Constantes con la funcionalidad de los hooks
    const { handleKeyboard } = HandleKeyboard();
    // Estructura del componente
    return (
        <>
            {isKeyboard ? (
                <>
                    {isKeyboardView === 'Nombre-Guarnicion' || isKeyboardView === 'Descripcion-Guarnicion' || isKeyboardView === 'Imagen-Guarnicion' || isKeyboardView === `Buscador-Guarnicion-${isIndexSearch}` ? (
                        <Keyboard_Default 
                            value={isKeyboardView === 'Nombre-Guarnicion' ? isTextFieldsSideDish.nombre :
                                isKeyboardView === 'Descripcion-Guarnicion' ? isTextFieldsSideDish.descripcion :
                                isKeyboardView === 'Imagen-Guarnicion' ? isTextFieldsSideDish.imagen :
                                isKeyboardView === `Buscador-Guarnicion-${isIndexSearch}` ? isTextFieldsSideDish.ingredientes[isIndexSearch].buscador : null} 
                            onChange={handleKeyboard}
                    />
                    ):(
                        <></>
                    )}
                    {isKeyboardView === 'Precio-Guarnicion' || isKeyboardView === 'Preparacion-Guarnicion' || isKeyboardView === `Cantidad-Guarnicion-${isIndexCount}` ? (
                        <Keyboard_Numeric
                            value={isKeyboardView === 'Precio-Guarnicion' ? isTextFieldsSideDish.precio :
                                isKeyboardView === 'Preparacion-Guarnicion' ? isTextFieldsSideDish.preparacion :
                                isKeyboardView === `Cantidad-Guarnicion-${isIndexCount}` ? isTextFieldsSideDish.ingredientes[isIndexCount].cantidad : null
                            }
                            onChange={handleKeyboard}
                        />
                    ):(
                        <></> 
                    )}
                </>
            ):(
                <></>
            )}
        </>
    );
};
export const Keyboard_Form_Drink = () => {
    // Constantes con el valor de los contextos
    const [isTextFieldsDrink] = useContext(TextFieldsDrinkContext);
    const [isKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView] = useContext(KeyboardViewContext); 
    const [isIndexSearch] = useContext(IndexSearchContext); 
    const [isIndexCount] = useContext(IndexCountContext);
    // Constantes con la funcionalidad de los hooks
    const { handleKeyboard } = HandleKeyboard();
    // Estructura del componente
    return (
        <>
            {isKeyboard ? (
                <>
                    {isKeyboardView === 'Nombre-Bebida' || isKeyboardView === 'Descripcion-Bebida' || isKeyboardView === 'Imagen-Bebida' || isKeyboardView === `Buscador-Bebida-${isIndexSearch}` ? (
                        <Keyboard_Default 
                            value={isKeyboardView === 'Nombre-Bebida' ? isTextFieldsDrink.nombre :
                                isKeyboardView === 'Descripcion-Bebida' ? isTextFieldsDrink.descripcion :
                                isKeyboardView === 'Imagen-Bebida' ? isTextFieldsDrink.imagen :
                                isKeyboardView === `Buscador-Bebida-${isIndexSearch}` ? isTextFieldsDrink.ingredientes[isIndexSearch].buscador : null} 
                            onChange={handleKeyboard}
                    />
                    ):(
                        <></>
                    )}
                    {isKeyboardView === 'Precio-Bebida' || isKeyboardView === 'Preparacion-Bebida' || isKeyboardView === `Cantidad-Bebida-${isIndexCount}` ? (
                        <Keyboard_Numeric
                            value={isKeyboardView === 'Precio-Bebida' ? isTextFieldsDrink.precio :
                                isKeyboardView === 'Preparacion-Bebida' ? isTextFieldsDrink.preparacion :
                                isKeyboardView === `Cantidad-Bebida-${isIndexCount}` ? isTextFieldsDrink.ingredientes[isIndexCount].cantidad : null
                            }
                            onChange={handleKeyboard}
                        />
                    ):(
                        <></> 
                    )}
                </>
            ):(
                <></>
            )}
        </>
    );
};