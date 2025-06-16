//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { TextFieldsSupplierContext,TextFieldsObservationContext,TextFieldsSupplyCategoryContext,TextFieldsSupplyTypesContext,TextFieldsSupplyContext } from "../../contexts/FormsProvider";
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
    };
    // Función del hook
    const resetTextFieldsObservation = () => {
        setIsTextFieldsObservation(initialTextFieldsObservation);
    }
    // Retorno de la función del hook
    return resetTextFieldsObservation;
}
// Hook para reinciar los campos de texto de las categorias por insumo ✔️
export const ResetTextFieldsSupplyCategory = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsSupplyCategory,setIsTextFieldsSupplyCategory] = useContext(TextFieldsSupplyCategoryContext);
    // Estados iniciales de los contextos
    const initialTextFieldsSupplyCategory = {
        idcategria: 0,
        nombre: '',
        descripcion: '',
    };
    // Función del hook
    const resetTextFieldsSupply = () => {
        setIsTextFieldsSupplyCategory(initialTextFieldsSupplyCategory);
    }
    // Retorno de la función del hook
    return resetTextFieldsSupply;
}
// Hook para reinciar los campos de texto de los tipos de insumos ✔️
export const ResetTextFieldsSupplyType = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsSupplyTypes,setIsTextFieldsSupplyTypes] = useContext(TextFieldsSupplyTypesContext);
    // Estados iniciales de los contextos
    const initialTextFieldsSupplyTypes = {
        idtipo: 0,
        tipo: '',
        descripcion: '',
        unidad: '',
        idcategoria: 0,
        cantidades: [
            {
                cantidad: 0,
            }
        ],
    };
    // Función del hook
    const resetTextFieldsSupplyType = () => {
        setIsTextFieldsSupplyTypes(initialTextFieldsSupplyTypes);
    }
    // Retorno de la función del hook
    return resetTextFieldsSupplyType;
}
// Hook para reinciar los campos de texto de los insumos ✔️
export const ResetTextFieldsSupply = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsSupply,setIsTextFieldsSupply] = useContext(TextFieldsSupplyContext);
    // Estados iniciales de los contextos
    const initialTextFieldsSupply = {
        idinsumo: 0,
        nombre: '',
        descripcion: '',
        imagen: '',
        idproveedor: 0,
        idtipo: 0,
        idcategoria: 0,
    };
    // Función del hook
    const resetTextFieldsSupply = () => {
        setIsTextFieldsSupply(initialTextFieldsSupply);
    }
    // Retorno de la función del hook
    return resetTextFieldsSupply;
}