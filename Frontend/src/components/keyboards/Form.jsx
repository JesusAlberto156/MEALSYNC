//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { KeyboardContext,KeyboardViewContext,IndexCountContext,IndexSearchContext } from "../../contexts/VariablesProvider";
import { TextFieldsUserContext,TextFieldsSupplierContext,TextFieldsSupplyCategoryContext,TextFieldsDishContext,TextFieldsSupplyContext,TextFieldsSupplyTypesContext,TextFieldsMenuTypeContext } from "../../contexts/FormsProvider";
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
                    value={isKeyboardView === 'Nombre-Insumo' ? isTextFieldsSupply.nombre :
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