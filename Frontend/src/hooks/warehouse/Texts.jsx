//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { TextFieldsSupplyOrderContext,TextFieldsSupplyOrderObservationContext,TextFieldsWarehouseCategoryContext,TextFieldsWarehouseSupplyTypeContext,TextFieldsWarehouseSalesSupplyTypeContext } from "../../contexts/FormsProvider";
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
        idobservacion: 0,
        numeroPedido: '',
        fechaA: '',
        fechaP: null,
        hora: '',
        minutos: '',
        insumos: [{
            idinsumo: 0,
            observacion: '',
            categoria: '',
            idpedido: 0,
        }]
    };
    // Función del hook
    const resetTextFieldsSupplyOrderObservation = () => {
        setIsTextFieldsSupplyOrderObservation(initialTextFieldsSupplyOrderObservation);
    }
    // Retorno de la función del hook
    return resetTextFieldsSupplyOrderObservation;
}
// Hook para reinciar los campos de texto de los almacenes por categoria ✔️
export const ResetTextFieldsWarehouseCategory = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsWarehouseCategory,setIsTextFieldsWarehouseCategory] = useContext(TextFieldsWarehouseCategoryContext);
    // Estados iniciales de los contextos
    const initialTextFieldsWarehouseCategory = {
        cantidadRealTotal: 0,
        precioTotal: 0,
        idcategoria: 0,
    };
    // Función del hook
    const resetTextFieldsWarehouseCategory = () => {
        setIsTextFieldsWarehouseCategory(initialTextFieldsWarehouseCategory);
    }
    // Retorno de la función del hook
    return resetTextFieldsWarehouseCategory;
}
// Hook para reinciar los campos de texto de los almacenes de tipo de insumo ✔️
export const ResetTextFieldsWarehouseSupplyType = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsWarehouseSupplyType,setIsTextFieldsWarehouseSupplyType] = useContext(TextFieldsWarehouseSupplyTypeContext); 
    // Estados iniciales de los contextos
    const initialTextFieldsWarehouseSupplyTypes = {
        cantidadRealTotal: 0,
        precioTotal: 0,
        idtipo: 0,
    };
    // Función del hook
    const resetTextFieldsWarehouseSupplyType = () => {
        setIsTextFieldsWarehouseSupplyType(initialTextFieldsWarehouseSupplyTypes);
    }
    // Retorno de la función del hook
    return resetTextFieldsWarehouseSupplyType;
}
// Hook para reinciar los campos de texto de los almacenes de ventas de tipo de insumo ✔️
export const ResetTextFieldsWarehouseSalesSupplyType = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsWarehouseSalesSupplyType,setIsTextFieldsWarehouseSalesSupplyType] = useContext(TextFieldsWarehouseSalesSupplyTypeContext);
    // Estados iniciales de los contextos
    const initialTextFieldsWarehouseSalesSupplyTypes = {
        tipos:[{
            idtipo: 0,
            cantidadReal: 0,
            precio: 0,
            transaccion: 'Venta',
        }],
    };
    // Función del hook
    const resetTextFieldsWarehouseSalesSupplyType = () => {
        setIsTextFieldsWarehouseSalesSupplyType(initialTextFieldsWarehouseSalesSupplyTypes);
    }
    // Retorno de la función del hook
    return resetTextFieldsWarehouseSalesSupplyType;
}