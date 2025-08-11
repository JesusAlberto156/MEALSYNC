//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { TextFieldsWarehouseOrderContext,TextFieldsWarehouseFixedExpenseContext,TextFieldsWarehouseSupplyContext,TextFieldsWarehouseCleaningContext } from "../../contexts/FormsProvider";
//____________IMPORT/EXPORT____________

// Hook para reinciar los campos de texto de los pedidos de almacen ✔️
export const ResetTextFieldsWarehouseOrder = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsWarehouseOrder,setIsTextFieldsWarehouseOrder] = useContext(TextFieldsWarehouseOrderContext);
    // Estados iniciales de los contextos
    const initialTextFieldsWarehouseOrder = {
        idpedido: '',
        fecha: '',
        campus: '',
        precio: '',
        estado: '',
        idproveedor: 0,
        idusuario: 0,
        tipo: '',
        insumos: [{
            idpedidoindividual: 0,
            fecha: '',
            idinsumo: 0,
            idtipo: 0,
            idcategoria: 0,
            cantidadreal: 0,
            cantidad: '',
            preciounitario: '',
            preciototal: '',
            idpedido: '',
            estado: '',
            mensajes: [{
                idmensaje: 0,
                fecha: '',
                mensaje: '',
                idpedidoindividual: 0,
                tipo: '',
                estado: '',
            }],
        }],
        suministros: [{
            idpedidoindividual: 0,
            fecha: '',
            idsuministro: 0,
            idtipo: 0,
            idcategoria: 0,
            cantidadreal: 0,
            cantidad: '',
            preciounitario: '',
            preciototal: '',
            idpedido: '',
            estado: '',
            mensajes: [{
                idmensaje: 0,
                fecha: '',
                mensaje: '',
                idpedidoindividual: 0,
                tipo: '',
                estado: '',
            }],
        }]
    };
    // Función del hook
    const resetTextFieldsWarehouseOrder = () => {
        setIsTextFieldsWarehouseOrder(initialTextFieldsWarehouseOrder);
    }
    // Retorno de la función del hook
    return resetTextFieldsWarehouseOrder;
}
// Hook para reinciar los campos de texto de las compras de gasto fijo ✔️
export const ResetTextFieldsWarehouseFixedExpense = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsWarehouseFixedExpense,setIsTextFieldsWarehouseFixedExpense] = useContext(TextFieldsWarehouseFixedExpenseContext);
    // Estados iniciales de los contextos
    const initialTextFieldsWarehouseFixedExpense = {
        idalmacen: 0,
        precio: '',
        idgasto: 0,
        fecha: '',
        transaccion: '',
    };
    // Función del hook
    const resetTextFieldsWarehouseFixedExpense = () => {
        setIsTextFieldsWarehouseFixedExpense(initialTextFieldsWarehouseFixedExpense);
    }
    // Retorno de la función del hook
    return resetTextFieldsWarehouseFixedExpense;
}
// Hook para reinciar los campos de texto de las ventas de insumo ✔️
export const ResetTextFieldsWarehouseSupply = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsWarehouseSupply,setIsTextFieldsWarehouseSupply] = useContext(TextFieldsWarehouseSupplyContext);
    // Estados iniciales de los contextos
    const initialTextFieldsWarehouseSupply = {
        idalmacen: 0,
        precio: '',
        cantidadreal:'',
        idtipo: 0,
        idcategoria: 0,
        unidad: '',
        cantidadtotal: 0,
        preciototal: 0,
        preciounitario: 0,
        fecha: '',
        transaccion: '',
    };
    // Función del hook
    const resetTextFieldsWarehouseSupply = () => {
        setIsTextFieldsWarehouseSupply(initialTextFieldsWarehouseSupply);
    }
    // Retorno de la función del hook
    return resetTextFieldsWarehouseSupply;
}
// Hook para reinciar los campos de texto de las ventas de suministro ✔️
export const ResetTextFieldsWarehouseCleaning = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsWarehouseCleaning,setIsTextFieldsWarehouseCleaning] = useContext(TextFieldsWarehouseCleaningContext);
    // Estados iniciales de los contextos
    const initialTextFieldsWarehouseCleaning = {
        idalmacen: 0,
        precio: '',
        cantidadreal:'',
        idtipo: 0,
        idcategoria: 0,
        unidad: '',
        cantidadtotal: 0,
        preciototal: 0,
        preciounitario: 0,
        fecha: '',
        transaccion: '',
    };
    // Función del hook
    const resetTextFieldsWarehouseCleaning = () => {
        setIsTextFieldsWarehouseCleaning(initialTextFieldsWarehouseCleaning);
    }
    // Retorno de la función del hook
    return resetTextFieldsWarehouseCleaning;
}