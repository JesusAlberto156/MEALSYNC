//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { TextFieldsWarehouseOrderContext,TextFieldsWarehouseSaleContext } from "../../contexts/FormsProvider";
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