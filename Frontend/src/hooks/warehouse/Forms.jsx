//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { TextFieldsWarehouseOrderContext } from "../../contexts/FormsProvider";
import { SuppliersContext,DeletedSuppliersContext } from "../../contexts/SuppliersProvider";
import { SupplyOrderAddContext,CleaningSupplyOrderAddContext,OrdersContext,OrderDeleteContext } from "../../contexts/WarehouseProvider";
import { DeletedSupplyTypesContext,DeletedSupplyCategoriesContext,SupplyCategoriesContext,SupplyCategoryAddContext,SupplyCategoryEditContext,SupplyCategoryDeleteContext,SupplyTypesContext,SupplyTypeAddContext,SupplyTypeEditContext,CountSupplyTypesContext,SupplyTypeCountAddContext,SupplyTypeDeleteContext,SuppliesContext,SupplyAddContext,SupplyEditContext,SupplyDeleteContext } from "../../contexts/SuppliesProvider";
import { CleaningSuppliesContext } from "../../contexts/ExtrasProvider";
import { SelectedRowContext } from "../../contexts/SelectedesProvider";
import { SearchTerm1Context } from "../../contexts/SearchsProvider";
import { ActionBlockContext } from "../../contexts/VariablesProvider";
import { NavbarViewContext,SidebarViewContext,ModalViewContext } from "../../contexts/ViewsProvider";
// Estilos personalizados
import { Alert_Sonner_Promise } from "../../components/styled/Alerts";
//____________IMPORT/EXPORT____________

// Hook para filtrar los proveedores ✔️
export const FilteredRecordsSuppliers = () => {
    // Constantes con el valor de los contextos 
    const [isSuppliers] = useContext(SuppliersContext);
    const [isDeletedSuppliers] = useContext(DeletedSuppliersContext);
    const [isSearchTerm1] = useContext(SearchTerm1Context);
    // Función del hook
    const filtered = isSuppliers.filter((data) => {
        const isDeleted = isDeletedSuppliers.some(supplier => supplier.idproveedor === data.idproveedor);
        if (isDeleted) return false;
        
        return data.nombre.toLowerCase().includes(isSearchTerm1.toLowerCase());
    });
    // Retorno de la función del hook
    return filtered;
}
// Hook para filtrar los proveedores sin eliminar ✔️
export const FilteredRecordsDeletedSuppliers = () => {
    // Constantes con el valor de los contextos 
    const [isSuppliers] = useContext(SuppliersContext);
    const [isDeletedSuppliers] = useContext(DeletedSuppliersContext);
    // Función del hook
    const filtered = isSuppliers.filter((data) => {
        const isDeleted = isDeletedSuppliers.some(supplier => supplier.idproveedor === data.idproveedor);
        if (isDeleted) return false;
        
        return true;
    });
    // Retorno de la función del hook
    return filtered;
}
// Hook para agregar o eliminar productos en los pedidos de almacen  ✔️
export const HandleTextProducts = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsWarehouseOrder,setIsTextFieldsWarehouseOrder] = useContext(TextFieldsWarehouseOrderContext);
    // Funcion para agregar un nuevo insumo
    const SupplyAdd = () => {
        const newSupply = {
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
        }
        setIsTextFieldsWarehouseOrder({
            ...isTextFieldsWarehouseOrder,
            insumos: [...isTextFieldsWarehouseOrder.insumos, newSupply],
        })
    }
    // Funcion para eliminar un insumo
    const SupplyDelete = (index) => {
        const updatedSupplies = [...isTextFieldsWarehouseOrder.insumos];
        updatedSupplies.splice(index,1);
        setIsTextFieldsWarehouseOrder({
            ...isTextFieldsWarehouseOrder,
            insumos: updatedSupplies,
        })
    }
    // Funcion para agregar un nuevo suministro
    const CleaningSupplyAdd = () => {
        const newCleaningSupply = {
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
        }
        setIsTextFieldsWarehouseOrder({
            ...isTextFieldsWarehouseOrder,
            suministros: [...isTextFieldsWarehouseOrder.suministros, newCleaningSupply],
        })
    }
    // Funcion para eliminar un suministro
    const CleaningSupplyDelete = (index) => {
        const updatedCleaningSupplies = [...isTextFieldsWarehouseOrder.suministros];
        updatedCleaningSupplies.splice(index,1);
        setIsTextFieldsWarehouseOrder({
            ...isTextFieldsWarehouseOrder,
            suministros: updatedCleaningSupplies,
        })
    }
    // Retorno de la función del hook
    return { SupplyAdd,SupplyDelete,CleaningSupplyAdd,CleaningSupplyDelete }
}
// Hook para agregar un pedido de almacén desde el modal ✔️
export const HandleWarehouseOrderAdd = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsWarehouseOrder] = useContext(TextFieldsWarehouseOrderContext);
    const [isSupplyOrderAdd,setIsSupplyOrderAdd] = useContext(SupplyOrderAddContext);
    const [isCleaningSupplyOrderAdd,setIsCleaningSupplyOrderAdd] = useContext(CleaningSupplyOrderAddContext);
    const [isOrders] = useContext(OrdersContext);
    // Función del hook
    const handleWarehouseOrderAdd = () => {
        if(currentNView === 'Pedidos de almacen' && currentSView === 'Inventario' && currentMView === 'Pedido-Almacen-Agregar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsWarehouseOrder.idpedido === '' || isTextFieldsWarehouseOrder.campus === '' || isTextFieldsWarehouseOrder.idproveedor === 0 || isTextFieldsWarehouseOrder.tipo === '' || (isTextFieldsWarehouseOrder.tipo === 'Insumo' && isTextFieldsWarehouseOrder.insumos.length === 0) || (isTextFieldsWarehouseOrder.tipo === 'Suministro de limpieza' && isTextFieldsWarehouseOrder.suministros.length === 0)){
                            setIsActionBlock(false);
                            return reject('¡Falta información del pedido de almacén!')
                        };

                        if(isOrders.some(order => order.idpedido === Number(isTextFieldsWarehouseOrder.idpedido))){
                            setIsActionBlock(false);
                            return reject('¡Pedido de almacén ya existente!');
                        }

                        const regexID = /^[0-9]+$/;
                        const regexCampus = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9\s\-.,&()]+$/

                        if(!regexID.test(isTextFieldsWarehouseOrder.idpedido.trim())){
                            setIsActionBlock(false);
                            return reject('¡El ID Pedido no es válido, solo puede contener números enteros!');
                        }

                        if(Number(isTextFieldsWarehouseOrder.idpedido) <= 0){
                            setIsActionBlock(false);
                            return reject('¡El ID Pedido no es válido, debe de ser mayor a 0!');
                        }

                        if(!regexCampus.test(isTextFieldsWarehouseOrder.campus.trim())){
                            setIsActionBlock(false);
                            return reject('¡El campus no es válido, solo puede contener letras, números, espacios y los siguientes caracteres: - . , & ( )!');
                        }

                        if(isTextFieldsWarehouseOrder.tipo === 'Insumo'){
                            const indexError = isTextFieldsWarehouseOrder.insumos.findIndex((ing, index, arr) => {
                                const idInsumoInvalido = ing.idinsumo === 0;
                                const cantidadVacia = String(ing.cantidad).trim() === '';

                                return idInsumoInvalido || cantidadVacia;
                            });
                        
                            if (indexError !== -1) {
                                setIsActionBlock(false);
                                return reject(`¡Error en el insumo ${indexError + 1}! Verifica que este asignado su insumo o cuente con una cantidad valida.`);
                            }

                            const indexErrorNumber = isTextFieldsWarehouseOrder.insumos.findIndex((ing, index, arr) => {

                                const cantidadNumero = parseFloat(ing.cantidad);

                                const cantidadInvalida = 
                                    isNaN(cantidadNumero) ||   
                                    !Number.isInteger(cantidadNumero) ||
                                    cantidadNumero <= 0 || 
                                    cantidadNumero > 999999;       

                                return cantidadInvalida;
                            });
                        
                            if (indexErrorNumber !== -1) {
                                setIsActionBlock(false);
                                return reject(`¡Error en el insumo ${indexErrorNumber + 1}! Verifica que la cantidad sea mayor a 0, no exceda el límite permitido y sea número entero.`);
                            }
                        
                            resolve('¡Información verificada!');

                            setTimeout(() => {
                                return setIsSupplyOrderAdd(true);
                            },1000)
                        }

                        if(isTextFieldsWarehouseOrder.tipo === 'Suministro de limpieza'){
                            const indexError = isTextFieldsWarehouseOrder.suministros.findIndex((ing, index, arr) => {
                                const idSuministroInvalido = ing.idsuministro === 0;
                                const cantidadVacia = String(ing.cantidad).trim() === '';

                                return idSuministroInvalido || cantidadVacia;
                            });
                        
                            if (indexError !== -1) {
                                setIsActionBlock(false);
                                return reject(`¡Error en el suministro ${indexError + 1}! Verifica que este asignado su suministro o cuente con una cantidad valida.`);
                            }

                            const indexErrorNumber = isTextFieldsWarehouseOrder.suministros.findIndex((ing, index, arr) => {

                                const cantidadNumero = parseFloat(ing.cantidad);

                                const cantidadInvalida = 
                                    isNaN(cantidadNumero) ||   
                                    !Number.isInteger(cantidadNumero) ||
                                    cantidadNumero <= 0 || 
                                    cantidadNumero > 999999;       

                                return cantidadInvalida;
                            });
                        
                            if (indexErrorNumber !== -1) {
                                setIsActionBlock(false);
                                return reject(`¡Error en el suministro ${indexErrorNumber + 1}! Verifica que la cantidad sea mayor a 0, no exceda el límite permitido y sea número entero.`);
                            }
                        
                            resolve('¡Información verificada!');

                            setTimeout(() => {
                                return setIsCleaningSupplyOrderAdd(true);
                            },1000)
                        }
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Verificando información!','1');
        }
    } 
    // Retorno de la función del hook
    return handleWarehouseOrderAdd;
}

// Hook para eliminar un pedido de almacén desde el modal ✔️
export const HandleWarehouseOrderDelete = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isOrderDelete,setIsOrderDelete] = useContext(OrderDeleteContext); 
    // Función del hook
    const handleWarehouseOrderDelete = () => {
        if(currentNView === 'Pedidos de almacen' && currentSView === 'Inventario' && currentMView === 'Pedido-Almacen-Eliminar'){
            setIsActionBlock(true);
            return setIsOrderDelete(true);
        }
    } 
    // Retorno de la función del hook
    return handleWarehouseOrderDelete;
}
// Hook para agregar una revisión al pedido de almacén desde el modal ✔️
export const HandleWarehouseOrderVerificationAdd = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsWarehouseOrder] = useContext(TextFieldsWarehouseOrderContext);
    const [isSupplyOrderAdd,setIsSupplyOrderAdd] = useContext(SupplyOrderAddContext);
    const [isCleaningSupplyOrderAdd,setIsCleaningSupplyOrderAdd] = useContext(CleaningSupplyOrderAddContext);
    const [isOrders] = useContext(OrdersContext);
    // Función del hook
    const handleWarehouseOrderVerificationAdd = () => {
        if(currentNView === 'Pedidos de almacen' && currentSView === 'Inventario' && currentMView === 'Pedido-Almacen-Verificacion-Agregar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsWarehouseOrder.tipo === 'Insumo'){
                            const indexError = isTextFieldsWarehouseOrder.insumos.findIndex((ing, index, arr) => {
                                const estadoInvalido = ing.estado === 'En espera';

                                return estadoInvalido;
                            });
                        
                            if (indexError !== -1) {
                                setIsActionBlock(false);
                                return reject(`¡Error en el insumo ${indexError + 1}! Verifica que contenga un estado.`);
                            }

                            const todosEliminados = isTextFieldsWarehouseOrder.insumos.every(ing => ing.estado === 'Eliminar');

                            if (todosEliminados) {
                                setIsActionBlock(false);
                                return reject(`¡No es posible eliminar todos los insumos del pedido!`);
                            }

                            const regexDetail = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]+$/;

                            const hayDetalleInvalido = isTextFieldsWarehouseOrder.insumos
                                .filter(insumo => insumo.estado === 'Modificar')
                                .some(insumo => !regexDetail.test(insumo.mensajes?.[0]?.mensaje?.trim() || ''));

                            if (hayDetalleInvalido) {
                                setIsActionBlock(false);
                                return reject('¡Hay detalles no válidos! Solo se permiten letras, números, espacios y los siguientes signos: punto, coma, punto y coma, dos puntos, guiones y paréntesis. Tambien no pueden estar vacios');
                            }

                            resolve('Completado')
                            setIsActionBlock(false);
                        }
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Verificando información!','1');
        }
    } 
    // Retorno de la función del hook
    return handleWarehouseOrderVerificationAdd;
}