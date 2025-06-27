//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { TextFieldsSupplyOrderContext,TextFieldsSupplyOrderObservationContext,TextFieldsWarehouseSaleContext } from "../../contexts/FormsProvider";
//____________IMPORT/EXPORT____________

// Hook para reinciar los campos de texto de los pedidos de insumo ✔️
export const ResetTextFieldsSupplyOrder = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsSupplyOrder,setIsTextFieldsSupplyOrder] = useContext(TextFieldsSupplyOrderContext);
    // Estados iniciales de los contextos
    const initialTextFieldsSupplyOrder = {
        numeroPedido: '',
        fechaA: '',
        fechaP: null,
        hora: '',
        minutos: '',
        insumos: [{
            idpedido: 0,
            idinsumo: 0,
            cantidad: 0,
            precioUnitario: 0,
            precioTotal: 0,
            estado: '', 
        }]
    };
    // Función del hook
    const resetTextFieldsSupplyOrder = () => {
        setIsTextFieldsSupplyOrder(initialTextFieldsSupplyOrder);
    }
    // Retorno de la función del hook
    return resetTextFieldsSupplyOrder;
}
// Hook para reinciar los campos de texto de las observaciones de los pedidos de insumo ✔️
export const ResetTextFieldsSupplyOrderObservation = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsSupplyOrderObservation,setIsTextFieldsSupplyOrderObservation] = useContext(TextFieldsSupplyOrderObservationContext);
    // Estados iniciales de los contextos
    const initialTextFieldsSupplyOrderObservation = {
        numeroPedido: '',
        idpedido: 0,
        observaciones: [{
            fechaA: '',
            fechaP: null,
            hora: '',
            minutos: '',
            idobservacion: 0,
            observacion: '',
            categoria: '',
        }]
    };
    // Función del hook
    const resetTextFieldsSupplyOrderObservation = () => {
        setIsTextFieldsSupplyOrderObservation(initialTextFieldsSupplyOrderObservation);
    }
    // Retorno de la función del hook
    return resetTextFieldsSupplyOrderObservation;
}
// Hook para reinciar los campos de texto de los almacenes de venta ✔️
export const ResetTextFieldsWarehouseSale = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsWarehouseSale,setIsTextFieldsWarehouseSale] = useContext(TextFieldsWarehouseSaleContext);
    // Estados iniciales de los contextos
    const initialTextFieldsWarehouseSale = {
        idcategoria: 0,
        idtipo: 0,
        cantidadreal: 0,
        precio: 0,
        transaccion: 'Venta'
    };
    // Función del hook
    const resetTextFieldsWarehouseSale = () => {
        setIsTextFieldsWarehouseSale(initialTextFieldsWarehouseSale);
    }
    // Retorno de la función del hook
    return resetTextFieldsWarehouseSale;
}