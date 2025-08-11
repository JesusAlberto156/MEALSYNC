//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { TextFieldsWarehouseOrderContext,TextFieldsObservationContext,TextFieldsWarehouseFixedExpenseContext,TextFieldsWarehouseSupplyContext,TextFieldsWarehouseCleaningContext } from "../../contexts/FormsProvider";
import { SuppliersContext,DeletedSuppliersContext } from "../../contexts/SuppliersProvider";
import { SupplyOrderAddContext,WarehouseFixedExpenseAddContext,WarehouseSupplyAddContext,WarehouseCleaningAddContext,CleaningSupplyOrderAddContext,OrdersContext,OrderDeleteContext,SupplyOrderEndContext,CleaningSupplyOrderEndContext,SupplyOrderVerificationAddContext,CleaningSupplyOrderVerificationAddContext,SupplyOrderVerificationEditContext,CleaningSupplyOrderVerificationEditContext } from "../../contexts/WarehouseProvider";
import { SocketContext } from "../../contexts/SocketProvider";
import { FixedExpensesContext,DeletedFixedExpensesContext } from "../../contexts/ExtrasProvider";
import { LoggedUserContext } from "../../contexts/SessionProvider";
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
    const [isTextFieldsWarehouseOrder,setIsTextFieldsWarehouseOrder] = useContext(TextFieldsWarehouseOrderContext);
    const [isSupplyOrderVerificationAdd,setIsSupplyOrderVerificationAdd] = useContext(SupplyOrderVerificationAddContext);
    const [isCleaningSupplyOrderVerificationAdd,setIsCleaningSupplyOrderVerificationAdd] = useContext(CleaningSupplyOrderVerificationAddContext);
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

                            const todosAceptados = isTextFieldsWarehouseOrder.insumos.every(ing => ing.estado === 'Mantener');

                            if(todosAceptados){
                                setIsTextFieldsWarehouseOrder(prev => ({
                                    ...prev,
                                    estado: 'Aceptado',
                                }))
                            }else{
                                setIsTextFieldsWarehouseOrder(prev => ({
                                    ...prev,
                                    estado: 'Rechazado',
                                }))
                            }
                            
                            resolve('¡Información verificada!');

                            setTimeout(() => {
                                return setIsSupplyOrderVerificationAdd(true);
                            },1000)
                        }
                        if(isTextFieldsWarehouseOrder.tipo === 'Suministro de limpieza'){
                            const indexError = isTextFieldsWarehouseOrder.suministros.findIndex((ing, index, arr) => {
                                const estadoInvalido = ing.estado === 'En espera';

                                return estadoInvalido;
                            });
                        
                            if (indexError !== -1) {
                                setIsActionBlock(false);
                                return reject(`¡Error en el suministro ${indexError + 1}! Verifica que contenga un estado.`);
                            }

                            const todosEliminados = isTextFieldsWarehouseOrder.suministros.every(ing => ing.estado === 'Eliminar');

                            if (todosEliminados) {
                                setIsActionBlock(false);
                                return reject(`¡No es posible eliminar todos los suministros de limpieza del pedido!`);
                            }

                            const regexDetail = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]+$/;

                            const hayDetalleInvalido = isTextFieldsWarehouseOrder.suministros
                                .filter(suministro => suministro.estado === 'Modificar')
                                .some(suministro => !regexDetail.test(suministro.mensajes?.[0]?.mensaje?.trim() || ''));

                            if (hayDetalleInvalido) {
                                setIsActionBlock(false);
                                return reject('¡Hay detalles no válidos! Solo se permiten letras, números, espacios y los siguientes signos: punto, coma, punto y coma, dos puntos, guiones y paréntesis. Tambien no pueden estar vacios');
                            }

                            const todosAceptados = isTextFieldsWarehouseOrder.suministros.every(ing => ing.estado === 'Mantener');

                            if(todosAceptados){
                                setIsTextFieldsWarehouseOrder(prev => ({
                                    ...prev,
                                    estado: 'Aceptado',
                                }))
                            }else{
                                setIsTextFieldsWarehouseOrder(prev => ({
                                    ...prev,
                                    estado: 'Rechazado',
                                }))
                            }
                            
                            resolve('¡Información verificada!');

                            setTimeout(() => {
                                return setIsCleaningSupplyOrderVerificationAdd(true);
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
    return handleWarehouseOrderVerificationAdd;
}
// Hook para editar una revisión al pedido de almacén desde el modal ✔️
export const HandleWarehouseOrderVerificationEdit = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsWarehouseOrder,setIsTextFieldsWarehouseOrder] = useContext(TextFieldsWarehouseOrderContext);
    const [isSupplyOrderVerificationEdit,setIsSupplyOrderVerificationEdit] = useContext(SupplyOrderVerificationEditContext); 
    const [isCleaningSupplyOrderVerificationEdit,setIsCleaningSupplyOrderVerificationEdit] = useContext(CleaningSupplyOrderVerificationEditContext);
    // Función del hook
    const handleWarehouseOrderVerificationEdit = (insumosOriginales,suministrosOriginales) => {
        if(currentNView === 'Pedidos de almacen' && currentSView === 'Inventario' && currentMView === 'Pedido-Almacen-Verificacion-Editar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsWarehouseOrder.tipo === 'Insumo'){
                            const indexError = isTextFieldsWarehouseOrder.insumos.findIndex((ing, index, arr) => {
                                if (ing.estado !== 'Modificar') return false;

                                const cantidadVacia = String(ing.cantidad).trim() === '';

                                return cantidadVacia;
                            });
                        
                            if (indexError !== -1) {
                                setIsActionBlock(false);
                                return reject(`¡Error en el insumo ${indexError + 1}! Verifica que cuente con una cantidad valida.`);
                            }

                            const indexErrorNumber = isTextFieldsWarehouseOrder.insumos.findIndex((ing, index, arr) => {
                                if (ing.estado !== 'Modificar') return false;

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

                            const indexErrorEliminar = insumosOriginales.findIndex(original => {
                                if (original.estado === 'Eliminar') {
                                    return isTextFieldsWarehouseOrder.insumos.some(modificado =>
                                        modificado.idpedidoindividual === original.idpedidoindividual
                                    );
                                }
                                return false;
                            });

                            if (indexErrorEliminar !== -1) {
                                setIsActionBlock(false);
                                return reject(`¡Error en el insumo ${indexErrorEliminar + 1}! Este insumo debe ser eliminado.`);
                            }

                            setIsTextFieldsWarehouseOrder(prev => ({
                                ...prev,
                                estado: 'Solicitud',
                            }))
                            
                            resolve('¡Información verificada!');
                            
                            setTimeout(() => {
                                return setIsSupplyOrderVerificationEdit(true);
                            },1000);
                        }
                        if(isTextFieldsWarehouseOrder.tipo === 'Suministro de limpieza'){
                            const indexError = isTextFieldsWarehouseOrder.suministros.findIndex((ing, index, arr) => {
                                if (ing.estado !== 'Modificar') return false;

                                const cantidadVacia = String(ing.cantidad).trim() === '';

                                return cantidadVacia;
                            });
                        
                            if (indexError !== -1) {
                                setIsActionBlock(false);
                                return reject(`¡Error en el suministro ${indexError + 1}! Verifica que cuente con una cantidad valida.`);
                            }

                            const indexErrorNumber = isTextFieldsWarehouseOrder.suministros.findIndex((ing, index, arr) => {
                                if (ing.estado !== 'Modificar') return false;

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

                            const indexErrorEliminar = suministrosOriginales.findIndex(original => {
                                if (original.estado === 'Eliminar') {
                                    return isTextFieldsWarehouseOrder.suministros.some(modificado =>
                                        modificado.idpedidoindividual === original.idpedidoindividual
                                    );
                                }
                                return false;
                            });

                            if (indexErrorEliminar !== -1) {
                                setIsActionBlock(false);
                                return reject(`¡Error en el suministro ${indexErrorEliminar + 1}! Este suministro debe ser eliminado.`);
                            }

                            setIsTextFieldsWarehouseOrder(prev => ({
                                ...prev,
                                estado: 'Solicitud',
                            }))
                            
                            resolve('¡Información verificada!');
                            
                            setTimeout(() => {
                                return setIsCleaningSupplyOrderVerificationEdit(true);
                            },1000);
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
    return handleWarehouseOrderVerificationEdit;
}
// Hook para iniciar un pedido de almacén desde el modal ✔️
export const HandleWarehouseOrderStart = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsWarehouseOrder] = useContext(TextFieldsWarehouseOrderContext);
    const [socket] = useContext(SocketContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext); 
    const [isLoggedUser] = useContext(LoggedUserContext);
    // Función del hook
    const handleWarehouseOrderStart = () => {
        if(currentNView === 'Pedidos de almacen' && currentSView === 'Inventario' && isSelectedRow !== null){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsWarehouseOrder.tipo === 'Insumo'){
                            setIsActionBlock(true);
                            setTimeout(() => {
                                socket.emit('Update-Supply-Order-Start',isLoggedUser.idusuario,isTextFieldsWarehouseOrder.idpedido,'En curso',isTextFieldsWarehouseOrder.insumos);
                                setIsActionBlock(false);
                                setIsSelectedRow(null);
                                resolve('¡Inició el proceso!');
                            },1000);
                        }
                        if(isTextFieldsWarehouseOrder.tipo === 'Suministro de limpieza'){
                            setIsActionBlock(true);
                            setTimeout(() => {
                                socket.emit('Update-Cleaning-Supply-Order-Start',isLoggedUser.idusuario,isTextFieldsWarehouseOrder.idpedido,'En curso',isTextFieldsWarehouseOrder.suministros);
                                setIsActionBlock(false);
                                setIsSelectedRow(null);
                                resolve('¡Inició el proceso!');
                            },1000);
                        }
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    setIsSelectedRow(null);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Iniciando proceso!','1');
        }
    } 
    // Retorno de la función del hook
    return handleWarehouseOrderStart;
}
// Hook para finalizar un pedido de almacén desde el modal ✔️
export const HandleWarehouseOrderEnd = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsWarehouseOrder] = useContext(TextFieldsWarehouseOrderContext);
    const [isTextFieldsObservation] = useContext(TextFieldsObservationContext);
    const [isSupplyOrderEnd,setIsSupplyOrderEnd] = useContext(SupplyOrderEndContext); 
    const [isCleaningSupplyOrderEnd,setIsCleaningSupplyOrderEnd] = useContext(CleaningSupplyOrderEndContext);
    // Función del hook
    const handleWarehouseOrderEnd = () => {
        if(currentNView === 'Pedidos de almacen' && currentSView === 'Inventario' && currentMView === 'Pedido-Almacen-Finalizar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsWarehouseOrder.tipo === 'Insumo'){
                            const indexError = isTextFieldsWarehouseOrder.insumos.findIndex((ing, index, arr) => {
                                const estadoInvalido = ing.estado === 'En curso';

                                return estadoInvalido;
                            });
                        
                            if (indexError !== -1) {
                                setIsActionBlock(false);
                                return reject(`¡Error en el insumo ${indexError + 1}! Verifica que contenga un estado.`);
                            }

                            const regexDetail = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]+$/;

                            const hayDetalleInvalido = isTextFieldsWarehouseOrder.insumos
                                .filter(insumo => insumo.estado === 'Cancelado' || insumo.estado === 'Devolución')
                                .some(insumo => !regexDetail.test(insumo.mensajes?.[0]?.mensaje?.trim() || ''));

                            if (hayDetalleInvalido) {
                                setIsActionBlock(false);
                                return reject('¡Hay detalles no válidos! Solo se permiten letras, números, espacios y los siguientes signos: punto, coma, punto y coma, dos puntos, guiones y paréntesis. Tambien no pueden estar vacios');
                            }

                            const regexPrecioUnitario = /^\d{1,6}(\.\d{1,4})?$/;

                            const hayPrecioInvalido = isTextFieldsWarehouseOrder.insumos
                                .filter(insumo => insumo.estado === 'Aceptado')
                                .some(insumo => {
                                    const precioStr = insumo.preciounitario?.trim() || '';
                                    // Validar con regex y convertir a número para > 0
                                    return !regexPrecioUnitario.test(precioStr) || Number(precioStr) <= 0;
                                });

                            if (hayPrecioInvalido) {
                                setIsActionBlock(false);
                                return reject('¡Hay precios unitarios no válidos! Deben ser números mayores a 0, con hasta 6 dígitos enteros y hasta 4 decimales.');
                            }

                            const todosAceptados = isTextFieldsWarehouseOrder.insumos.every(ing => ing.estado === 'Aceptado' || ing.estado === 'Cancelado');

                            if(todosAceptados){
                                const regexDetail = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]+$/;

                                if(!regexDetail.test(isTextFieldsObservation.observacion)){
                                    setIsActionBlock(false);
                                    return reject('¡La observación al proveedor no es válida! Solo se permiten letras, números, espacios y los siguientes signos: punto, coma, punto y coma, dos puntos, guiones y paréntesis. Tambien no puede estar vacia');
                                }

                                if(isTextFieldsObservation.calificacion === 0){
                                    setIsActionBlock(false);
                                    return reject('¡Debe contar con una calificación el proveedor!');
                                }

                                resolve('¡Información verificada!');

                                setTimeout(() => {
                                    return setIsSupplyOrderEnd(true);
                                },1000);
                            }else{
                                resolve('¡Información verificada!');

                                setTimeout(() => {
                                    return setIsSupplyOrderEnd(true);
                                },1000);
                            }
                        }
                        if(isTextFieldsWarehouseOrder.tipo === 'Suministro de limpieza'){
                            const indexError = isTextFieldsWarehouseOrder.suministros.findIndex((ing, index, arr) => {
                                const estadoInvalido = ing.estado === 'En curso';

                                return estadoInvalido;
                            });
                        
                            if (indexError !== -1) {
                                setIsActionBlock(false);
                                return reject(`¡Error en el suministro ${indexError + 1}! Verifica que contenga un estado.`);
                            }

                            const regexDetail = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]+$/;

                            const hayDetalleInvalido = isTextFieldsWarehouseOrder.suministros
                                .filter(suministro => suministro.estado === 'Cancelado' || suministro.estado === 'Devolución')
                                .some(suministro => !regexDetail.test(suministro.mensajes?.[0]?.mensaje?.trim() || ''));

                            if (hayDetalleInvalido) {
                                setIsActionBlock(false);
                                return reject('¡Hay detalles no válidos! Solo se permiten letras, números, espacios y los siguientes signos: punto, coma, punto y coma, dos puntos, guiones y paréntesis. Tambien no pueden estar vacios');
                            }

                            const regexPrecioUnitario = /^\d{1,6}(\.\d{1,4})?$/;

                            const hayPrecioInvalido = isTextFieldsWarehouseOrder.suministros
                                .filter(suministro => suministro.estado === 'Aceptado')
                                .some(suministro => {
                                    const precioStr = suministro.preciounitario?.trim() || '';
                                    // Validar con regex y convertir a número para > 0
                                    return !regexPrecioUnitario.test(precioStr) || Number(precioStr) <= 0;
                                });

                            if (hayPrecioInvalido) {
                                setIsActionBlock(false);
                                return reject('¡Hay precios unitarios no válidos! Deben ser números mayores a 0, con hasta 6 dígitos enteros y hasta 4 decimales.');
                            }

                            const todosAceptados = isTextFieldsWarehouseOrder.suministros.every(ing => ing.estado === 'Aceptado' || ing.estado === 'Cancelado');

                            if(todosAceptados){
                                const regexDetail = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]+$/;

                                if(!regexDetail.test(isTextFieldsObservation.observacion)){
                                    setIsActionBlock(false);
                                    return reject('¡La observación al proveedor no es válida! Solo se permiten letras, números, espacios y los siguientes signos: punto, coma, punto y coma, dos puntos, guiones y paréntesis. Tambien no puede estar vacia');
                                }

                                if(isTextFieldsObservation.calificacion === 0){
                                    setIsActionBlock(false);
                                    return reject('¡Debe contar con una calificación el proveedor!');
                                }

                                resolve('¡Información verificada!');

                                setTimeout(() => {
                                    return setIsCleaningSupplyOrderEnd(true);
                                },1000);
                            }else{
                                resolve('¡Información verificada!');

                                setTimeout(() => {
                                    return setIsCleaningSupplyOrderEnd(true);
                                },1000);
                            }
                        }
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    setIsSupplyOrderEnd(false);
                    setIsCleaningSupplyOrderEnd(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Verificando información!','1');
        }
    } 
    // Retorno de la función del hook
    return handleWarehouseOrderEnd;
}
// Hook para filtrar los gastos fijos sin eliminar ✔️
export const FilteredRecordsDeletedFixedExpense = () => {
    // Constantes con el valor de los contextos 
    const [isFixedExpenses] = useContext(FixedExpensesContext);
    const [isDeletedFixedExpenses] = useContext(DeletedFixedExpensesContext);
    // Función del hook
    const filtered = isFixedExpenses.filter((data) => {
        const isDeleted = isDeletedFixedExpenses.some(fixed => fixed.idgasto === data.idgasto);
        if (isDeleted) return false;
        
        return true;
    });
    // Retorno de la función del hook
    return filtered;
}
// Hook para agregar una compra de gasto fijo desde el modal ✔️
export const HandleWarehouseFixedExpenseAdd = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsWarehouseFixedExpense] = useContext(TextFieldsWarehouseFixedExpenseContext);
    const [isWarehouseFixedExpenseAdd,setIsWarehouseFixedExpenseAdd] = useContext(WarehouseFixedExpenseAddContext);
    // Función del hook
    const handleWarehouseFixedExpenseAdd = () => {
        if(currentNView === 'Compras' && currentSView === 'Inventario' && currentMView === 'Almacen-Compra-Gasto-Fijo-Agregar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsWarehouseFixedExpense.idgasto === 0 || isTextFieldsWarehouseFixedExpense.precio === ''){
                            setIsActionBlock(false);
                            return reject('¡Falta información de la compra de gasto fijo!')
                        };

                        if(Number(isTextFieldsWarehouseFixedExpense.precio) <= 0){
                            setIsActionBlock(false);
                            return reject('¡El precio no es válido, debe de ser mayor a 0!');
                        }

                        if(Number(isTextFieldsWarehouseFixedExpense.precio) > 999999.9999){
                            setIsActionBlock(false);
                            return reject('¡El precio no es válido, excede el valor máximo posible!');
                        }

                         resolve('¡Información verificada!');

                        setTimeout(() => {
                            return setIsWarehouseFixedExpenseAdd(true);
                        },1000);
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
    return handleWarehouseFixedExpenseAdd;
}
// Hook para agregar una venta de insumo desde el modal ✔️
export const HandleWarehouseSupplyAdd = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsWarehouseSupply] = useContext(TextFieldsWarehouseSupplyContext);
    const [isWarehouseSupplyAdd,setIsWarehouseSupplyAdd] = useContext(WarehouseSupplyAddContext);
    // Función del hook
    const handleWarehouseSupplyAdd = () => {
        if(currentNView === 'Ventas' && currentSView === 'Inventario' && currentMView === 'Almacen-Venta-Insumo-Agregar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsWarehouseSupply.idtipo === 0 || isTextFieldsWarehouseSupply.cantidadreal === ''){
                            setIsActionBlock(false);
                            return reject('¡Falta información de la venta rapida del insumo!');
                        };

                        if(Number(isTextFieldsWarehouseSupply.cantidadreal) <= 0){
                            setIsActionBlock(false);
                            return reject('¡La cantidad no es válida, debe de ser mayor a 0!');
                        }

                        if(Number(isTextFieldsWarehouseSupply.cantidadreal) > 999999.9999){
                            setIsActionBlock(false);
                            return reject('¡La cantidad no es válida, excede el valor máximo posible!');
                        }

                        if(isTextFieldsWarehouseSupply.unidad === 'Kilogramo' || isTextFieldsWarehouseSupply.unidad === 'Litro'){
                            const regexNumbers = /^\d+(\.\d{1,4})?$/;

                            if(!regexNumbers.test(isTextFieldsWarehouseSupply.cantidadreal)){
                                setIsActionBlock(false);
                                return reject('¡La cantidad no es válida, solo puede contener números decimales de hasta 4 dígitos decimales o enteros!');
                            }
                        }

                        if(isTextFieldsWarehouseSupply.unidad === 'Pieza'){
                            const regexNumbers = /^\d+$/;  

                            if(!regexNumbers.test(isTextFieldsWarehouseSupply.cantidadreal)){
                                setIsActionBlock(false);
                                return reject('¡La cantidad no es válida, solo puede contener números enteros!');
                            }
                        }

                        if(Number(isTextFieldsWarehouseSupply.cantidadreal) > Number(isTextFieldsWarehouseSupply.cantidadtotal)){
                            setIsActionBlock(false);
                            return reject('¡La cantidad no es válida, excede la cantidad existente en el almacén!');
                        }

                        resolve('¡Información verificada!');

                        setTimeout(() => {
                            return setIsWarehouseSupplyAdd(true);
                        },1000);
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
    return handleWarehouseSupplyAdd;
}
// Hook para agregar una venta de suministro desde el modal ✔️
export const HandleWarehouseCleaningAdd = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsWarehouseCleaning] = useContext(TextFieldsWarehouseCleaningContext);
    const [isWarehouseCleaningAdd,setIsWarehouseCleaningAdd] = useContext(WarehouseCleaningAddContext);
    // Función del hook
    const handleWarehouseCleaningAdd = () => {
        if(currentNView === 'Ventas' && currentSView === 'Inventario' && currentMView === 'Almacen-Venta-Suministro-Agregar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsWarehouseCleaning.idcategoria === 0 || isTextFieldsWarehouseCleaning.cantidadreal === ''){
                            setIsActionBlock(false);
                            return reject('¡Falta información del consumo de suministro!');
                        };

                        if(Number(isTextFieldsWarehouseCleaning.cantidadreal) <= 0){
                            setIsActionBlock(false);
                            return reject('¡La cantidad no es válida, debe de ser mayor a 0!');
                        }

                        if(Number(isTextFieldsWarehouseCleaning.cantidadreal) > 999999.9999){
                            setIsActionBlock(false);
                            return reject('¡La cantidad no es válida, excede el valor máximo posible!');
                        }

                        if(isTextFieldsWarehouseCleaning.unidad === 'Kilogramo' || isTextFieldsWarehouseCleaning.unidad === 'Litro'){
                            const regexNumbers = /^\d+(\.\d{1,4})?$/;

                            if(!regexNumbers.test(isTextFieldsWarehouseCleaning.cantidadreal)){
                                setIsActionBlock(false);
                                return reject('¡La cantidad no es válida, solo puede contener números decimales de hasta 4 dígitos decimales o enteros!');
                            }
                        }

                        if(isTextFieldsWarehouseCleaning.unidad === 'Pieza'){
                            const regexNumbers = /^\d+$/;  

                            if(!regexNumbers.test(isTextFieldsWarehouseCleaning.cantidadreal)){
                                setIsActionBlock(false);
                                return reject('¡La cantidad no es válida, solo puede contener números enteros!');
                            }
                        }

                        if(Number(isTextFieldsWarehouseCleaning.cantidadreal) > Number(isTextFieldsWarehouseCleaning.cantidadtotal)){
                            setIsActionBlock(false);
                            return reject('¡La cantidad no es válida, excede la cantidad existente en el almacén!');
                        }

                        resolve('¡Información verificada!');

                        setTimeout(() => {
                            return setIsWarehouseCleaningAdd(true);
                        },1000);
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
    return handleWarehouseCleaningAdd;
}