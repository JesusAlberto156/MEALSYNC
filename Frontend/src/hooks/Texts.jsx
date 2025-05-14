//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { TextFieldsUserContext,TextFieldsPermissionsContext,TextFieldsSupplierContext,TextFieldsSupplyContext } from "../contexts/FormsProvider";
//____________IMPORT/EXPORT____________

// Hook para reinciar los campos de texto de los usuarios
export const ResetTextFieldsUser = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    // Estados iniciales de los contextos
    const initialTextFieldsUser = {
        name: '',
        shortName: '',
        user: '',
        password: '',
        userTypes: 0,
    };
    // Función del hook
    const resetTextFieldsUser = () => {
        setIsTextFieldsUser(initialTextFieldsUser);
    }
    // Retorno de la función del hook
    return resetTextFieldsUser;
}
// Hook para reinciar los campos de texto de los permisos
export const ResetTextFieldsPermissions = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsPermissions,setIsTextFieldsPermissions] = useContext(TextFieldsPermissionsContext);
    // Estados iniciales de los contextos
    const initialTextFieldsPermissions = {
        user: 0,
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
// Hook para reinciar los campos de texto de los usuarios
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
// Hook para reinciar los campos de texto de los usuarios
export const ResetTextFieldsSupply = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsSupply,setIsTextFieldsSupply] = useContext(TextFieldsSupplyContext);
    // Estados iniciales de los contextos
    const initialTextFieldsSupply = {
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