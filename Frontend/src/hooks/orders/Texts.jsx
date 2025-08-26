//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { TextFieldsOrderKitchenContext,TextFieldsOrderDoctorContext } from "../../contexts/FormsProvider";
//____________IMPORT/EXPORT____________

// Hook para reinciar los campos de texto de las ordenes de cocina ✔️
export const ResetTextFieldsOrderKitchen = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsOrderKitchen,setIsTextFieldsOrderKitchen] = useContext(TextFieldsOrderKitchenContext); 
    // Estados iniciales de los contextos
    const initialTextFieldsOrderKitchen = {
        idpedido: 0,
        tipoubicacion: '',
        ubicacion: '',
        encargado: '',
        precio: '',
        idusuario: 0,
        pedidos: []
    };
    // Función del hook
    const resetTextFieldsOrderKitchen = () => {
        setIsTextFieldsOrderKitchen(initialTextFieldsOrderKitchen);
    }
    // Retorno de la función del hook
    return resetTextFieldsOrderKitchen;
}
// Hook para reinciar los campos de texto de las ordenes de medicos ✔️
export const ResetTextFieldsOrderDoctor = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsOrderDoctor,setIsTextFieldsOrderDoctor] = useContext(TextFieldsOrderDoctorContext); 
    // Estados iniciales de los contextos
    const initialTextFieldsOrderDoctor = {
        idpedido: 0,
        fecha: '',
        sala: '',
        idcirugia: 0,
        cirugia: '',
        medico: '',
        solicitante: '',
        clavesecreta: '',
        idusuario: 0,
        precio: '',
        pedidos: []
    };
    // Función del hook
    const resetTextFieldsOrderDoctor = () => {
        setIsTextFieldsOrderDoctor(initialTextFieldsOrderDoctor);
    }
    // Retorno de la función del hook
    return resetTextFieldsOrderDoctor;
}