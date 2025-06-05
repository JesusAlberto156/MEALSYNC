//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { TextFieldsUserContext,TextFieldsPermissionsContext,TextFieldsStatusContext,TextFieldsSupplierContext,TextFieldsSupplyContext,TextFieldsSupplyTypesContext,TextFieldsUnitsContext,TextFieldsWarehouseContext } from "../contexts/FormsProvider";
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
        iduser: 0,
        name: '',
        shortName: '',
        user: '',
        password: '',
        userTypes: 0,
        permissions: '',
        status: '',
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
        iduser: 0,
        user: '',
        administrator: 0,
        chef: 0,
        storekeeper: 0,
        cook: 0,
        nutritionist: 0,
        doctor: 0,
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
        iduser: 0,
        user: '',
        status: '',
    };
    // Función del hook
    const resetTextFieldsStatus = () => {
        setIsTextFieldsStatus(initialTextFieldsStatus);
    }
    // Retorno de la función del hook
    return resetTextFieldsStatus;
}

// Hook para reinciar los campos de texto de los proveedores 
export const ResetTextFieldsSupplier = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsSupplier,setIsTextFieldsSupplier] = useContext(TextFieldsSupplierContext);
    // Estados iniciales de los contextos
    const initialTextFieldsSupplier = {
        name: '',
        rfc: '',
        address: '',
        phone: '',
        email: '',
    };
    // Función del hook
    const resetTextFieldsSupplier = () => {
        setIsTextFieldsSupplier(initialTextFieldsSupplier);
    }
    // Retorno de la función del hook
    return resetTextFieldsSupplier;
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
// Hook para reinciar los campos de texto de los insumos 
export const ResetTextFieldsSupply = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsSupply,setIsTextFieldsSupply] = useContext(TextFieldsSupplyContext);
    // Estados iniciales de los contextos
    const initialTextFieldsSupply = {
        idsupply: 0,
        name: '',
        description: '',
        image: '',
        supplier: 0,
        type: 0,
    };
    // Función del hook
    const resetTextFieldsSupply = () => {
        setIsTextFieldsSupply(initialTextFieldsSupply);
    }
    // Retorno de la función del hook
    return resetTextFieldsSupply;
}
// Hook para reinciar los campos de texto de los tipos de insumos 
export const ResetTextFieldsSupplyType = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsSupplyTypes,setIsTextFieldsSupplyTypes] = useContext(TextFieldsSupplyTypesContext);
    // Estados iniciales de los contextos
    const initialTextFieldsSupplyTypes = {
        idtype: 0,
        type: '',
        description: '',
        idunits: 0,
    };
    // Función del hook
    const resetTextFieldsSupplyType = () => {
        setIsTextFieldsSupplyTypes(initialTextFieldsSupplyTypes);
    }
    // Retorno de la función del hook
    return resetTextFieldsSupplyType;
}
// Hook para reinciar los campos de texto de las mediciones 
export const ResetTextFieldsUnit = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsUnits,setIsTextFieldsUnits] = useContext(TextFieldsUnitsContext);
    // Estados iniciales de los contextos
    const initialTextFieldsUnits = {
        idextent: 0,
        extent: '',
        unit: '',
        amount: '',
    };
    // Función del hook
    const resetTextFieldsUnit = () => {
        setIsTextFieldsUnits(initialTextFieldsUnits);
    }
    // Retorno de la función del hook
    return resetTextFieldsUnit;
}