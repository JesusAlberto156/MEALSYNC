//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { TextFieldsUserContext,TextFieldsPermissionsContext,TextFieldsStatusContext } from "../../contexts/FormsProvider";
//____________IMPORT/EXPORT____________

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