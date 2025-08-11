//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { TextFieldsSupplierContext,TextFieldsObservationContext } from "../../contexts/FormsProvider";
//____________IMPORT/EXPORT____________

// Hook para reinciar los campos de texto de los proveedores ✔️
export const ResetTextFieldsSupplier = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsSupplier,setIsTextFieldsSupplier] = useContext(TextFieldsSupplierContext);
    // Estados iniciales de los contextos
    const initialTextFieldsSupplier = {
        idproveedor: 0,
        nombre: '',
        rfc: '',
        domicilio: '',
        telefono: '',
        correo: '',
        calificacion: 0,
        ideliminado: 0,
    };
    // Función del hook
    const resetTextFieldsSupplier = () => {
        setIsTextFieldsSupplier(initialTextFieldsSupplier);
    }
    // Retorno de la función del hook
    return resetTextFieldsSupplier;
}
// Hook para reinciar los campos de texto de las observaciones a proveedor ✔️
export const ResetTextFieldsObservation = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsObservation,setIsTextFieldsObservation] = useContext(TextFieldsObservationContext);
    // Estados iniciales de los contextos
    const initialTextFieldsObservation = {
        idobservacion: 0,
        observacion: '',
        calificacion: 0,
        fecha: '',
        idproveedor: 0,
        idpedido: 0,
    };
    // Función del hook
    const resetTextFieldsObservation = () => {
        setIsTextFieldsObservation(initialTextFieldsObservation);
    }
    // Retorno de la función del hook
    return resetTextFieldsObservation;
}