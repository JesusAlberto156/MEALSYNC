//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { TextFieldsUserContext,TextFieldsPermissionsContext,TextFieldsStatusContext,TextFieldsSupplierContext,TextFieldsMenuTypesContext,TextFieldsObservationContext,TextFieldsSupplyContext,TextFieldsSupplyTypesContext,TextFieldsUnitsContext,TextFieldsWarehouseContext } from "../contexts/FormsProvider";
import { SearchTermContext,SearchTerm1Context,SearchTerm2Context } from "../contexts/SearchsProvider";
import { SelectedOptionOrderContext,SelectedOptionOrderDirectionContext,SelectedOptionSearchContext,SelectedOptionOrderPlusContext } from "../contexts/SelectedesProvider";
//____________IMPORT/EXPORT____________

// Hook para reinciar los campos de texto de los buscadores ✔️
export const ResetSearchTerms = () => {
    // Constantes con el valor de los contextos 
    const [isSearchTerm,setIsSearchTerm] = useContext(SearchTermContext);
    const [isSearchTerm1,setIsSearchTerm1] = useContext(SearchTerm1Context);
    const [isSearchTerm2,setIsSearchTerm2] = useContext(SearchTerm2Context);
    // Función del hook
    const resetSearchTerms = () => {
        setIsSearchTerm('');
        setIsSearchTerm1('');
        setIsSearchTerm2('');
    }
    // Retorno de la función del hook
    return resetSearchTerms;
}
// Hook para reinciar los campos de los selected para las opciones ✔️
export const ResetSelectedOptions = () => {
    // Constantes con el valor de los contextos 
    const [isSelectedOptionSearch,setIsSelectedOptionSearch] = useContext(SelectedOptionSearchContext);
    const [isSelectedOptionOrder,setIsSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const [isSelectedOptionOrderPlus,setIsSelectedOptionOrderPlus] = useContext(SelectedOptionOrderPlusContext);
    const [isSelectedOptionOrderDirection,setIsSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    // Función del hook
    const resetSelectedOptions = () => {
        setIsSelectedOptionSearch('General');
        setIsSelectedOptionOrder('');
        setIsSelectedOptionOrderPlus('Normal')
        setIsSelectedOptionOrderDirection('Asc');
    }
    // Retorno de la función del hook
    return resetSelectedOptions;
}
// Hook para reinciar los campos de texto de los usuarios ✔️
export const ResetTextFieldsUser = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    // Estados iniciales de los contextos
    const initialTextFieldsUser = {
        idusuario: 0,
        nombre: '',
        nombrecorto: '',
        usuario: '',
        contrasena: '',
        idtipo: 0,
        permisos: '',
        estatus: '',
        ideliminado: 0,
    };
    // Función del hook
    const resetTextFieldsUser = () => {
        setIsTextFieldsUser(initialTextFieldsUser);
    }
    // Retorno de la función del hook
    return resetTextFieldsUser;
}
// Hook para reinciar los campos de texto de los permisos ✔️
export const ResetTextFieldsPermissions = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsPermissions,setIsTextFieldsPermissions] = useContext(TextFieldsPermissionsContext);
    // Estados iniciales de los contextos
    const initialTextFieldsPermissions = {
        idpermiso: 0,
        administrador: 0,
        chef: 0,
        almacenista: 0,
        cocinero: 0,
        nutriologo: 0,
        medico: 0,
        superadministrador: 0,
        idusuario: 0,
        usuario: '',
    };
    // Función del hook
    const resetTextFieldsPermissions = () => {
        setIsTextFieldsPermissions(initialTextFieldsPermissions);
    }
    // Retorno de la función del hook
    return resetTextFieldsPermissions;
}
// Hook para reinciar los campos de texto de los estatus ✔️
export const ResetTextFieldsStatus = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsStatus,setIsTextFieldsStatus] = useContext(TextFieldsStatusContext);
    // Estados iniciales de los contextos
    const initialTextFieldsStatus = {
        idusuario: 0,
        usuario: '',
        idestatus: 0,
        estatus: '',
    };
    // Función del hook
    const resetTextFieldsStatus = () => {
        setIsTextFieldsStatus(initialTextFieldsStatus);
    }
    // Retorno de la función del hook
    return resetTextFieldsStatus;
}

// Hook para reinciar los campos de texto de pedidos para el inventario 
export const ResetTextFieldsWarehouse = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsWarehouse,setIsTextFieldsWarehouse] = useContext(TextFieldsWarehouseContext);
    // Estados iniciales de los contextos
    const initialTextFieldsWarehouse = {
        dateA: '',
        dateP: null,
        hour: '',
        minutes: '',
        supplies: [{
            idsupply: 0,
            idsupplier: 0,
            amount: 0,
            unitprice: '',
            price: 0, 
        }]
    };
    // Función del hook
    const resetTextFieldsWarehouse = () => {
        setIsTextFieldsWarehouse(initialTextFieldsWarehouse);
    }
    // Retorno de la función del hook
    return resetTextFieldsWarehouse;
}
// Hook para reinciar los campos de texto de los tipos de menu ✔️
export const ResetTextFieldsMenuTypes = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsMenuTypes,setIsTextFieldsMenuTypes] = useContext(TextFieldsMenuTypesContext);
    // Estados iniciales de los contextos
    const initialTextFieldsMenuTypes = {
        idtipo: 0,
        nombre: '',
        ideliminado: 0,
        idubicacion: 0,
    };
    // Función del hook
    const resetTextFieldsMenuTypes = () => {
        setIsTextFieldsMenuTypes(initialTextFieldsMenuTypes);
    }
    // Retorno de la función del hook
    return resetTextFieldsMenuTypes;
}