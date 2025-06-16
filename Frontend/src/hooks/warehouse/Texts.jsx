//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { TextFieldsSupplyOrderContext,TextFieldsSupplyOrderObservationContext,TextFieldsWarehousePurchaseCategoryContext,TextFieldsWarehouseSalesCategoryContext,TextFieldsWarehousePurchaseSupplyTypeContext,TextFieldsWarehouseSalesSupplyTypeContext } from "../../contexts/FormsProvider";
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
// Hook para reinciar los campos de texto de los almacenes de compras por categoria ✔️
export const ResetTextFieldsWarehousePurchaseCategory = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsWarehousePurchaseCategory,setIsTextFieldsWarehousePurchaseCategory] = useContext(TextFieldsWarehousePurchaseCategoryContext);
    // Estados iniciales de los contextos
    const initialTextFieldsWarehousePurchaseCategory = {
        idalmacen: 0,
        cantidadReal: 0,
        precio: 0,
        idcategoria: 0,
    };
    // Función del hook
    const resetTextFieldsWarehousePurchaseCategory = () => {
        setIsTextFieldsWarehousePurchaseCategory(initialTextFieldsWarehousePurchaseCategory);
    }
    // Retorno de la función del hook
    return resetTextFieldsWarehousePurchaseCategory;
}
// Hook para reinciar los campos de texto de los almacenes de ventas por categoria ✔️
export const ResetTextFieldsWarehouseSalesCategory = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsWarehouseSalesCategory,setIsTextFieldsWarehouseSalesCategory] = useContext(TextFieldsWarehouseSalesCategoryContext); 
    // Estados iniciales de los contextos
    const initialTextFieldsWarehouseSalesCategory = {
        idalmacen: 0,
        cantidadReal: 0,
        precio: 0,
        idcategoria: 0,
    };
    // Función del hook
    const resetTextFieldsWarehouseSalesCategory = () => {
        setIsTextFieldsWarehouseSalesCategory(initialTextFieldsWarehouseSalesCategory);
    }
    // Retorno de la función del hook
    return resetTextFieldsWarehouseSalesCategory;
}
// Hook para reinciar los campos de texto de los almacenes de compras de tipo de insumo ✔️
export const ResetTextFieldsWarehousePurchaseSupplyType = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsWarehousePurchaseSupplyType,setIsTextFieldsWarehousePurchaseSupplyType] = useContext(TextFieldsWarehousePurchaseSupplyTypeContext); 
    // Estados iniciales de los contextos
    const initialTextFieldsWarehousePurchaseSupplyTypes = {
        idalmacen: 0,
        cantidadreal: 0,
        precio: 0,
        idtipo: 0,
    };
    // Función del hook
    const resetTextFieldsWarehousePurchaseSupplyType = () => {
        setIsTextFieldsWarehousePurchaseSupplyType(initialTextFieldsWarehousePurchaseSupplyTypes);
    }
    // Retorno de la función del hook
    return resetTextFieldsWarehousePurchaseSupplyType;
}
// Hook para reinciar los campos de texto de los almacenes de ventas de tipo de insumo ✔️
export const ResetTextFieldsWarehouseSalesSupplyType = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsWarehouseSalesSupplyType,setIsTextFieldsWarehouseSalesSupplyType] = useContext(TextFieldsWarehouseSalesSupplyTypeContext); 
    // Estados iniciales de los contextos
    const initialTextFieldsWarehouseSalesSupplyTypes = {
        idalmacen: 0,
        cantidadreal: 0,
        precio: 0,
        idtipo: 0,
    };
    // Función del hook
    const resetTextFieldsWarehouseSalesSupplyType = () => {
        setIsTextFieldsWarehouseSalesSupplyType(initialTextFieldsWarehouseSalesSupplyTypes);
    }
    // Retorno de la función del hook
    return resetTextFieldsWarehouseSalesSupplyType;
}