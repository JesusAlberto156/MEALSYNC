//____________IMPORT/EXPORT____________
// Hooks de React
import { useState,useContext,useEffect,useMemo } from "react";
// Contextos
import { SuppliersContext } from "../../contexts/SuppliersProvider";
import { UsersContext } from "../../contexts/UsersProvider";
import { OrdersContext,DeletedOrdersContext,WarehouseCleaningContext,WarehouseFixedExpensesContext,WarehouseCategoriesContext } from "../../contexts/WarehouseProvider";
import { SupplyCategoriesContext } from "../../contexts/SuppliesProvider";
import { FixedExpensesContext,CleaningCategoriesContext } from "../../contexts/ExtrasProvider";
import { SelectedRowContext,SelectedOptionSearchContext,SelectedOptionOrderDirectionContext,SelectedOptionOrderContext,SelectedOptionOrderPlusContext,SelectedOptionOrderPlusUltraContext } from "../../contexts/SelectedesProvider";
import { SearchTermContext } from "../../contexts/SearchsProvider";
import { TextFieldsSearchDateContext } from "../../contexts/FormsProvider";
// Hooks personalizados
import { Dates } from "../Dates";
//____________IMPORT/EXPORT____________

// Hook para realizar las acciones de la tabla de pedidos de almacen ✔️
export const TableActionsWarehouseOrders = () => {
    // Constantes con el valor de los contextos 
    const [isOrders] = useContext(OrdersContext);
    const [isDeletedOrders] = useContext(DeletedOrdersContext);
    const [isSuppliers] = useContext(SuppliersContext);
    const [isUsers] = useContext(UsersContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isSelectedOptionSearch] = useContext(SelectedOptionSearchContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const { getDate } = Dates();
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsWarehouseOrders = useMemo(() => {
        const filtered = isOrders.filter((data) => {
            const isDeleted = isDeletedOrders.some(order => order.idpedido === data.idpedido);
            if (isDeleted) return false;
            
            if (isSelectedOptionSearch === 'General') {
                const fecha = getDate(data.fecha);
                const proveedor = isSuppliers.find(supplier => supplier.idproveedor === data.idproveedor)?.nombre
                const usuario = isUsers.find(user => user.idusuario === data.idusuario)?.nombrecorto
                return [
                    data.idpedido,
                    fecha,
                    data.campus,
                    data.precio,
                    data.estado,
                    proveedor,
                    usuario,
                ].some(value =>
                    String(value).toLowerCase().includes(isSearchTerm.toLowerCase())
                );
            }
            if(isSelectedOptionSearch === 'ID Pedido'){
                return String(data.idpedido).toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Fecha'){
                const fecha = getDate(data.fecha);
                return fecha.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Campus'){
                return data.campus.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Estado'){
                return data.estado.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Proveedor'){
                const proveedor = isSuppliers.find(supplier => supplier.idproveedor === data.idproveedor)?.nombre
                return proveedor.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Usuario'){
                const usuario = isUsers.find(user => user.idusuario === data.idusuario)?.nombrecorto
                return usuario.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Precio Total'){
                return String(data.precio).toLowerCase().includes(isSearchTerm.toLowerCase());
            }
        });
        return [...filtered].sort((a, b) => {
            if(isSelectedOptionOrder === 'ID Pedido'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.idpedido - b.idpedido
                : b.idpedido - a.idpedido
            }
            if(isSelectedOptionOrder === 'Fecha'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? new Date(a.fecha) - new Date(b.fecha)
                : new Date(b.fecha) - new Date(a.fecha)
            }
            if(isSelectedOptionOrder === 'Campus'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.campus.localeCompare(b.campus,'es', { sensitivity: 'base' })
                : b.campus.localeCompare(a.campus,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'Estado'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.estado.localeCompare(b.estado,'es', { sensitivity: 'base' })
                : b.estado.localeCompare(a.estado,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'Proveedor'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? isSuppliers.find(supplier => supplier.idproveedor === a.idproveedor)?.nombre.localeCompare(isSuppliers.find(supplier => supplier.idproveedor === b.idproveedor)?.nombre,'es', { sensitivity: 'base' })
                : isSuppliers.find(supplier => supplier.idproveedor === b.idproveedor)?.nombre.localeCompare(isSuppliers.find(supplier => supplier.idproveedor === a.idproveedor)?.nombre,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'Usuario'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? isUsers.find(user => user.idusuario === a.idusuario)?.nombrecorto.localeCompare(isUsers.find(user => user.idusuario === b.idusuario)?.nombrecorto,'es', { sensitivity: 'base' })
                : isUsers.find(user => user.idusuario === b.idusuario)?.nombrecorto.localeCompare(isUsers.find(user => user.idusuario === a.idusuario)?.nombrecorto,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'Precio Total'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.precio - b.precio
                : b.precio - a.precio
            }

            return 0
        });
    }, [isOrders, isDeletedOrders, isSuppliers, isUsers, isSearchTerm, isSelectedOptionSearch, isSelectedOptionOrder, isSelectedOptionOrderDirection]);
    // Total de registros visibles de la tabla
    const recordsPerPage = 6;
    // Indices de los registros
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // Total de páginas 
    const totalPagesWarehouseOrders = Math.ceil(filteredRecordsWarehouseOrders.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsWarehouseOrders = filteredRecordsWarehouseOrders.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (WarehouseOrder) => {
        setIsSelectedRow((prevSelected) => {
            return prevSelected?.idpedido === WarehouseOrder.idpedido ? null : WarehouseOrder;
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPageWarehouseOrders = () => {
        if (currentPage < totalPagesWarehouseOrders) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesWarehouseOrders){
            setCurrentPage(1);
        }
    },[isSearchTerm])
    // Retorno de la función del hook
    return { handleRowClick,prevPage,currentPage,nextPageWarehouseOrders,currentRecordsWarehouseOrders,filteredRecordsWarehouseOrders,totalPagesWarehouseOrders}
}
// Hook para realizar las acciones de la tabla de compras ✔️
export const TableActionsPurchases = () => {
    // Constantes con el valor de los contextos 
    const [isWarehouseCategories] = useContext(WarehouseCategoriesContext); 
    const [isSupplyCategories] = useContext(SupplyCategoriesContext);
    const [isWarehouseCleaning] = useContext(WarehouseCleaningContext);
    const [isCleaningCategories] = useContext(CleaningCategoriesContext); 
    const [isWarehouseFixedExpenses] = useContext(WarehouseFixedExpensesContext);
    const [isFixedExpenses] = useContext(FixedExpensesContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext); 
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isSelectedOptionSearch] = useContext(SelectedOptionSearchContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const [isSelectedOptionOrderPlus] = useContext(SelectedOptionOrderPlusContext);
    const [isSelectedOptionOrderPlusUltra] = useContext(SelectedOptionOrderPlusUltraContext);
    const [isTextFieldsSearchDate] = useContext(TextFieldsSearchDateContext); 
    const { getDate } = Dates();
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsPurchases = useMemo(() => {
        if(isSelectedOptionOrderPlus === 'Insumos'){
                if(isSelectedOptionOrderPlusUltra === 'General'){
                const filtered = isWarehouseCategories.filter((data) => {
                    if(data.transaccion === 'Venta' || data.transaccion === 'Venta-Rapida') return false;
                    
                    if (isSelectedOptionSearch === 'General') {
                        const category = isSupplyCategories.find(category => category.idcategoria === data.idcategoria)?.nombre
                        const fecha = getDate(data.fecha);
                        return [
                            category,
                            fecha,
                            data.cantidadreal,
                            data.precio,
                        ].some(value =>
                            String(value).toLowerCase().includes(isSearchTerm.toLowerCase())
                        );
                    }
                    if (isSelectedOptionSearch === 'Nombre') {
                        const category = isSupplyCategories.find(category => category.idcategoria === data.idcategoria)?.nombre
                        return category?.toLowerCase().includes(isSearchTerm.toLowerCase());
                    }
                    if (isSelectedOptionSearch === 'Fecha') {
                        const date = new Date(data.fecha);
                        const year = date.getFullYear();
                        const month = date.getMonth()+1;

                        return year === isTextFieldsSearchDate?.año && month === isTextFieldsSearchDate?.mes;
                    }

                    return false;
                });

                return [...filtered].sort((a, b) => {
                    if(isSelectedOptionOrder === 'Insumo'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? isSupplyCategories.find(category => category.idcategoria === a.idcategoria)?.nombre.localeCompare(isSupplyCategories.find(category => category.idcategoria === b.idcategoria)?.nombre,'es', { sensitivity: 'base' })
                        : isSupplyCategories.find(category => category.idcategoria === b.idcategoria)?.nombre.localeCompare(isSupplyCategories.find(category => category.idcategoria === a.idcategoria)?.nombre,'es', { sensitivity: 'base' })
                    }
                    if(isSelectedOptionOrder === 'Fecha'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? new Date(a.fecha) - new Date(b.fecha)
                        : new Date(b.fecha) - new Date(a.fecha)
                    }
                    if(isSelectedOptionOrder === 'Cantidad'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? a.cantidadreal - b.cantidadreal
                        : b.cantidadreal - a.cantidadreal
                    }
                    if(isSelectedOptionOrder === 'Precio'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? a.precio - b.precio
                        : b.precio - a.precio
                    }

                    return 0
                });
            }
            if(isSelectedOptionOrderPlusUltra === 'Totales'){
                const filtered = isWarehouseCategories.filter((data) => {
                    if(data.transaccion === 'Venta' || data.transaccion === 'Venta-Rapida') return false;
                    
                    if (isSelectedOptionSearch === 'General') {
                        const category = isSupplyCategories.find(category => category.idcategoria === data.idcategoria)?.nombre
                        const fecha = getDate(data.fecha);
                        return [
                            category,
                            fecha,
                            data.cantidadreal,
                            data.precio,
                        ].some(value =>
                            String(value).toLowerCase().includes(isSearchTerm.toLowerCase())
                        );
                    }
                    if (isSelectedOptionSearch === 'Nombre') {
                        const category = isSupplyCategories.find(category => category.idcategoria === data.idcategoria)?.nombre
                        return category?.toLowerCase().includes(isSearchTerm.toLowerCase());
                    }
                    if (isSelectedOptionSearch === 'Fecha') {
                        const date = new Date(data.fecha);
                        const year = date.getFullYear();
                        const month = date.getMonth()+1;

                        return year === isTextFieldsSearchDate?.año && month === isTextFieldsSearchDate?.mes;
                    }

                    return false;
                });

                const totals = filtered.reduce((index,item) => {
                    const exist = index.find(type => type.idtipo === item.idtipo);
                    if(exist){
                        exist.cantidadreal += item.cantidadreal;
                        exist.precio += item.precio;
                    }else{
                        index.push({...item});
                    }
                    return index;
                },[]);

                return [...totals].sort((a, b) => {
                    if(isSelectedOptionOrder === 'Insumo'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? isSupplyCategories.find(category => category.idcategoria === a.idcategoria)?.nombre.localeCompare(isSupplyCategories.find(category => category.idcategoria === b.idcategoria)?.nombre,'es', { sensitivity: 'base' })
                        : isSupplyCategories.find(category => category.idcategoria === b.idcategoria)?.nombre.localeCompare(isSupplyCategories.find(category => category.idcategoria === a.idcategoria)?.nombre,'es', { sensitivity: 'base' })
                    }
                    if(isSelectedOptionOrder === 'Cantidad'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? a.cantidadreal - b.cantidadreal
                        : b.cantidadreal - a.cantidadreal
                    }
                    if(isSelectedOptionOrder === 'Precio'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? a.precio - b.precio
                        : b.precio - a.precio
                    }

                    return 0
                });
            }
            return [];
        }
        if(isSelectedOptionOrderPlus === 'Suministros'){
                if(isSelectedOptionOrderPlusUltra === 'General'){
                const filtered = isWarehouseCleaning.filter((data) => {
                    if(data.transaccion === 'Consumo') return false;
                    
                    if (isSelectedOptionSearch === 'General') {
                        const category = isCleaningCategories.find(type => type.idcategoria === data.idcategoria)?.nombre
                        const fecha = getDate(data.fecha);
                        return [
                            category,
                            fecha,
                            data.cantidadreal,
                            data.precio,
                        ].some(value =>
                            String(value).toLowerCase().includes(isSearchTerm.toLowerCase())
                        );
                    }
                    if (isSelectedOptionSearch === 'Nombre') {
                        const category = isCleaningCategories.find(type => type.idcategoria === data.idcategoria)?.nombre
                        return category?.toLowerCase().includes(isSearchTerm.toLowerCase());
                    }
                    if (isSelectedOptionSearch === 'Fecha') {
                        const date = new Date(data.fecha);
                        const year = date.getFullYear();
                        const month = date.getMonth()+1;

                        return year === isTextFieldsSearchDate?.año && month === isTextFieldsSearchDate?.mes;
                    }

                    return false;
                });

                return [...filtered].sort((a, b) => {
                    if(isSelectedOptionOrder === 'Suministro'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? isCleaningCategories.find(type => type.idcategoria === a.idcategoria)?.nombre.localeCompare(isCleaningCategories.find(type => type.idcategoria === b.idcategoria)?.nombre,'es', { sensitivity: 'base' })
                        : isCleaningCategories.find(type => type.idcategoria === b.idcategoria)?.nombre.localeCompare(isCleaningCategories.find(type => type.idcategoria === a.idcategoria)?.nombre,'es', { sensitivity: 'base' })
                    }
                    if(isSelectedOptionOrder === 'Fecha'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? new Date(a.fecha) - new Date(b.fecha)
                        : new Date(b.fecha) - new Date(a.fecha)
                    }
                    if(isSelectedOptionOrder === 'Cantidad'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? a.cantidadreal - b.cantidadreal
                        : b.cantidadreal - a.cantidadreal
                    }
                    if(isSelectedOptionOrder === 'Precio'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? a.precio - b.precio
                        : b.precio - a.precio
                    }

                    return 0
                });
            }
            if(isSelectedOptionOrderPlusUltra === 'Totales'){
                const filtered = isWarehouseCleaning.filter((data) => {
                    if(data.transaccion === 'Consumo') return false;
                    
                    if (isSelectedOptionSearch === 'General') {
                        const category = isCleaningCategories.find(type => type.idcategoria === data.idcategoria)?.nombre
                        const fecha = getDate(data.fecha);
                        return [
                            category,
                            fecha,
                            data.cantidadreal,
                            data.precio,
                        ].some(value =>
                            String(value).toLowerCase().includes(isSearchTerm.toLowerCase())
                        );
                    }
                    if (isSelectedOptionSearch === 'Nombre') {
                        const category = isCleaningCategories.find(type => type.idcategoria === data.idcategoria)?.nombre
                        return category?.toLowerCase().includes(isSearchTerm.toLowerCase());
                    }
                    if (isSelectedOptionSearch === 'Fecha') {
                        const date = new Date(data.fecha);
                        const year = date.getFullYear();
                        const month = date.getMonth()+1;

                        return year === isTextFieldsSearchDate?.año && month === isTextFieldsSearchDate?.mes;
                    }

                    return false;
                });

                const totals = filtered.reduce((index,item) => {
                    const exist = index.find(type => type.idcategoria === item.idcategoria);
                    if(exist){
                        exist.cantidadreal += item.cantidadreal;
                        exist.precio += item.precio;
                    }else{
                        index.push({...item});
                    }
                    return index;
                },[]);

                return [...totals].sort((a, b) => {
                    if(isSelectedOptionOrder === 'Suministro'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? isCleaningCategories.find(type => type.idcategoria === a.idcategoria)?.nombre.localeCompare(isCleaningCategories.find(type => type.idcategoria === b.idcategoria)?.nombre,'es', { sensitivity: 'base' })
                        : isCleaningCategories.find(type => type.idcategoria === b.idcategoria)?.nombre.localeCompare(isCleaningCategories.find(type => type.idcategoria === a.idcategoria)?.nombre,'es', { sensitivity: 'base' })
                    }
                    if(isSelectedOptionOrder === 'Cantidad'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? a.cantidadreal - b.cantidadreal
                        : b.cantidadreal - a.cantidadreal
                    }
                    if(isSelectedOptionOrder === 'Precio'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? a.precio - b.precio
                        : b.precio - a.precio
                    }

                    return 0
                });
            }
            return [];
        }
        if(isSelectedOptionOrderPlus === 'Gastos fijos'){
                if(isSelectedOptionOrderPlusUltra === 'General'){
                const filtered = isWarehouseFixedExpenses.filter((data) => {
                    if (isSelectedOptionSearch === 'General') {
                        const c = isFixedExpenses.find(type => type.idgasto === data.idgasto)?.nombre
                        const fecha = getDate(data.fecha);
                        return [
                            c,
                            fecha,
                            data.cantidadreal,
                            data.precio,
                        ].some(value =>
                            String(value).toLowerCase().includes(isSearchTerm.toLowerCase())
                        );
                    }
                    if (isSelectedOptionSearch === 'Nombre') {
                        const c = isFixedExpenses.find(type => type.idgasto === data.idgasto)?.nombre
                        return c?.toLowerCase().includes(isSearchTerm.toLowerCase());
                    }
                    if (isSelectedOptionSearch === 'Fecha') {
                        const date = new Date(data.fecha);
                        const year = date.getFullYear();
                        const month = date.getMonth()+1;

                        return year === isTextFieldsSearchDate?.año && month === isTextFieldsSearchDate?.mes;
                    }

                    return false;
                });

                return [...filtered].sort((a, b) => {
                    if(isSelectedOptionOrder === 'Gastos fijo'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? isFixedExpenses.find(type => type.idgasto === a.idgasto)?.nombre.localeCompare(isFixedExpenses.find(type => type.idgasto === b.idgasto)?.nombre,'es', { sensitivity: 'base' })
                        : isFixedExpenses.find(type => type.idgasto === b.idgasto)?.nombre.localeCompare(isFixedExpenses.find(type => type.idgasto === a.idgasto)?.nombre,'es', { sensitivity: 'base' })
                    }
                    if(isSelectedOptionOrder === 'Fecha'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? new Date(a.fecha) - new Date(b.fecha)
                        : new Date(b.fecha) - new Date(a.fecha)
                    }
                    if(isSelectedOptionOrder === 'Precio'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? a.precio - b.precio
                        : b.precio - a.precio
                    }

                    return 0
                });
            }
            if(isSelectedOptionOrderPlusUltra === 'Totales'){
                const filtered = isWarehouseFixedExpenses.filter((data) => {
                    if (isSelectedOptionSearch === 'General') {
                        const c = isFixedExpenses.find(type => type.idgasto === data.idgasto)?.nombre
                        const fecha = getDate(data.fecha);
                        return [
                            c,
                            fecha,
                            data.cantidadreal,
                            data.precio,
                        ].some(value =>
                            String(value).toLowerCase().includes(isSearchTerm.toLowerCase())
                        );
                    }
                    if (isSelectedOptionSearch === 'Nombre') {
                        const c = isFixedExpenses.find(type => type.idgasto === data.idgasto)?.nombre
                        return c?.toLowerCase().includes(isSearchTerm.toLowerCase());
                    }
                    if (isSelectedOptionSearch === 'Fecha') {
                        const date = new Date(data.fecha);
                        const year = date.getFullYear();
                        const month = date.getMonth()+1;

                        return year === isTextFieldsSearchDate?.año && month === isTextFieldsSearchDate?.mes;
                    }

                    return false;
                });

                const totals = filtered.reduce((index,item) => {
                    const exist = index.find(type => type.idgasto === item.idgasto);
                    if(exist){
                        exist.cantidadreal += item.cantidadreal;
                        exist.precio += item.precio;
                    }else{
                        index.push({...item});
                    }
                    return index;
                },[]);

                return [...totals].sort((a, b) => {
                    if(isSelectedOptionOrder === 'Gasto fijo'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? isFixedExpenses.find(type => type.idgasto === a.idgasto)?.nombre.localeCompare(isFixedExpenses.find(type => type.idgasto === b.idgasto)?.nombre,'es', { sensitivity: 'base' })
                        : isFixedExpenses.find(type => type.idgasto === b.idgasto)?.nombre.localeCompare(isFixedExpenses.find(type => type.idgasto === a.idgasto)?.nombre,'es', { sensitivity: 'base' })
                    }
                    if(isSelectedOptionOrder === 'Precio'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? a.precio - b.precio
                        : b.precio - a.precio
                    }

                    return 0
                });
            }
            return [];
        }
        return [];
    }, [isWarehouseCategories,isCleaningCategories,isWarehouseCleaning,isFixedExpenses,isWarehouseFixedExpenses, isSupplyCategories, isSearchTerm, isSelectedOptionOrderPlus, isSelectedOptionOrderPlusUltra, isSelectedOptionSearch, isSelectedOptionOrderDirection, isTextFieldsSearchDate]);
    // Total de registros visibles de la tabla
    const recordsPerPage = 6;
    // Indices de los registros
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // Total de páginas 
    const totalPagesPurchases = Math.ceil(filteredRecordsPurchases.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsPurchases = filteredRecordsPurchases.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (purchase) => {
        setIsSelectedRow((prevSelected) => {
            return prevSelected?.idalmacen === purchase.idalmacen ? null : purchase;
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPagePurchases = () => {
        if (currentPage < totalPagesPurchases) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesPurchases){
            setCurrentPage(1);
        }
    },[isSearchTerm])
    // Retorno de la función del hook
    return { handleRowClick,prevPage,currentPage,nextPagePurchases,currentRecordsPurchases,filteredRecordsPurchases,totalPagesPurchases}
}
// Hook para realizar las acciones de la tabla de ventas ✔️
export const TableActionsSales = () => {
    // Constantes con el valor de los contextos
    const [isSupplyCategories] = useContext(SupplyCategoriesContext);
    const [isWarehouseCategories] = useContext(WarehouseCategoriesContext); 
    const [isWarehouseCleaning] = useContext(WarehouseCleaningContext);
    const [isCleaningCategories] = useContext(CleaningCategoriesContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext); 
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isSelectedOptionSearch] = useContext(SelectedOptionSearchContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const [isSelectedOptionOrderPlus] = useContext(SelectedOptionOrderPlusContext);
    const [isSelectedOptionOrderPlusUltra] = useContext(SelectedOptionOrderPlusUltraContext);
    const [isTextFieldsSearchDate] = useContext(TextFieldsSearchDateContext); 
    const { getDate } = Dates();
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsSales = useMemo(() => {
        if(isSelectedOptionOrderPlus === 'Insumos'){
            if(isSelectedOptionOrderPlusUltra === 'General'){
                const filtered = isWarehouseCategories.filter((data) => {
                    if(data.transaccion === 'Compra') return false;
                    
                    if (isSelectedOptionSearch === 'General') {
                        const category = isSupplyCategories.find(c => c.idcategoria === data.idcategoria)?.nombre
                        const fecha = getDate(data.fecha);
                        return [
                            category,
                            fecha,
                            data.cantidadreal,
                            data.precio,
                        ].some(value =>
                            String(value).toLowerCase().includes(isSearchTerm.toLowerCase())
                        );
                    }
                    if (isSelectedOptionSearch === 'Nombre') {
                        const category = isSupplyCategories.find(c => c.idcategoria === data.idcategoria)?.nombre
                        return category?.toLowerCase().includes(isSearchTerm.toLowerCase());
                    }
                    if (isSelectedOptionSearch === 'Fecha') {
                        const date = new Date(data.fecha);
                        const year = date.getFullYear();
                        const month = date.getMonth()+1;

                        return year === isTextFieldsSearchDate?.año && month === isTextFieldsSearchDate?.mes;
                    }

                    return false;
                });

                return [...filtered].sort((a, b) => {
                    if(isSelectedOptionOrder === 'Tipo de insumo'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? isSupplyCategories.find(c => c.idcategoria === a.idcategoria)?.nombre.localeCompare(isSupplyCategories.find(c => c.idcategoria === b.idcategoria)?.nombre,'es', { sensitivity: 'base' })
                        : isSupplyCategories.find(c => c.idcategoria === b.idcategoria)?.nombre.localeCompare(isSupplyCategories.find(c => c.idcategoria === a.idcategoria)?.nombre,'es', { sensitivity: 'base' })
                    }
                    if(isSelectedOptionOrder === 'Fecha'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? new Date(a.fecha) - new Date(b.fecha)
                        : new Date(b.fecha) - new Date(a.fecha)
                    }
                    if(isSelectedOptionOrder === 'Cantidad'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? a.cantidadreal - b.cantidadreal
                        : b.cantidadreal - a.cantidadreal
                    }
                    if(isSelectedOptionOrder === 'Precio'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? a.precio - b.precio
                        : b.precio - a.precio
                    }

                    return 0
                });
            }
            if(isSelectedOptionOrderPlusUltra === 'Totales'){
                const filtered = isWarehouseCategories.filter((data) => {
                    if(data.transaccion === 'Compra') return false;
                    
                    if (isSelectedOptionSearch === 'General') {
                        const category = isSupplyCategories.find(c => c.idcategoria === data.idcategoria)?.nombre
                        const fecha = getDate(data.fecha);
                        return [
                            category,
                            fecha,
                            data.cantidadreal,
                            data.precio,
                        ].some(value =>
                            String(value).toLowerCase().includes(isSearchTerm.toLowerCase())
                        );
                    }
                    if (isSelectedOptionSearch === 'Nombre') {
                        const category = isSupplyCategories.find(c => c.idcategoria === data.idcategoria)?.nombre
                        return category?.toLowerCase().includes(isSearchTerm.toLowerCase());
                    }
                    if (isSelectedOptionSearch === 'Fecha') {
                        const date = new Date(data.fecha);
                        const year = date.getFullYear();
                        const month = date.getMonth()+1;

                        return year === isTextFieldsSearchDate?.año && month === isTextFieldsSearchDate?.mes;
                    }

                    return false;
                });

                const totals = filtered.reduce((index,item) => {
                    const exist = index.find(type => type.idcategoria === item.idcategoria);
                    if(exist){
                        exist.cantidadreal += item.cantidadreal;
                        exist.precio += item.precio;
                    }else{
                        index.push({...item});
                    }
                    return index;
                },[]);

                return [...totals].sort((a, b) => {
                    if(isSelectedOptionOrder === 'Tipo de insumo'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? isSupplyCategories.find(c => c.idcategoria === a.idcategoria)?.nombre.localeCompare(isSupplyCategories.find(c => c.idcategoria === b.idcategoria)?.nombre,'es', { sensitivity: 'base' })
                        : isSupplyCategories.find(c => c.idcategoria === b.idcategoria)?.nombre.localeCompare(isSupplyCategories.find(c => c.idcategoria === a.idcategoria)?.nombre,'es', { sensitivity: 'base' })
                    }
                    if(isSelectedOptionOrder === 'Cantidad'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? a.cantidadreal - b.cantidadreal
                        : b.cantidadreal - a.cantidadreal
                    }
                    if(isSelectedOptionOrder === 'Precio'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? a.precio - b.precio
                        : b.precio - a.precio
                    }

                    return 0
                });
            }
            return [];
        }
        if(isSelectedOptionOrderPlus === 'Suministros'){
            if(isSelectedOptionOrderPlusUltra === 'General'){
                const filtered = isWarehouseCleaning.filter((data) => {
                    if(data.transaccion === 'Compra') return false;
                    
                    if (isSelectedOptionSearch === 'General') {
                        const category = isCleaningCategories.find(type => type.idcategoria === data.idcategoria)?.nombre
                        const fecha = getDate(data.fecha);
                        return [
                            category,
                            fecha,
                            data.cantidadreal,
                            data.precio,
                        ].some(value =>
                            String(value).toLowerCase().includes(isSearchTerm.toLowerCase())
                        );
                    }
                    if (isSelectedOptionSearch === 'Nombre') {
                        const category = isCleaningCategories.find(type => type.idcategoria === data.idcategoria)?.nombre
                        return category?.toLowerCase().includes(isSearchTerm.toLowerCase());
                    }
                    if (isSelectedOptionSearch === 'Fecha') {
                        const date = new Date(data.fecha);
                        const year = date.getFullYear();
                        const month = date.getMonth()+1;

                        return year === isTextFieldsSearchDate?.año && month === isTextFieldsSearchDate?.mes;
                    }

                    return false;
                });
                return [...filtered].sort((a, b) => {
                    if(isSelectedOptionOrder === 'Suministro'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? isCleaningCategories.find(type => type.idcategoria === a.idcategoria)?.nombre.localeCompare(isCleaningCategories.find(type => type.idcategoria === b.idcategoria)?.nombre,'es', { sensitivity: 'base' })
                        : isCleaningCategories.find(type => type.idcategoria === b.idcategoria)?.nombre.localeCompare(isCleaningCategories.find(type => type.idcategoria === a.idcategoria)?.nombre,'es', { sensitivity: 'base' })
                    }
                    if(isSelectedOptionOrder === 'Fecha'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? new Date(a.fecha) - new Date(b.fecha)
                        : new Date(b.fecha) - new Date(a.fecha)
                    }
                    if(isSelectedOptionOrder === 'Cantidad'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? a.cantidadreal - b.cantidadreal
                        : b.cantidadreal - a.cantidadreal
                    }
                    if(isSelectedOptionOrder === 'Precio'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? a.precio - b.precio
                        : b.precio - a.precio
                    }

                    return 0
                });
            }
            if(isSelectedOptionOrderPlusUltra === 'Totales'){
                const filtered = isWarehouseCleaning.filter((data) => {
                    if(data.transaccion === 'Compra') return false;
                    
                    if (isSelectedOptionSearch === 'General') {
                        const category = isCleaningCategories.find(type => type.idcategoria === data.idcategoria)?.nombre
                        const fecha = getDate(data.fecha);
                        return [
                            category,
                            fecha,
                            data.cantidadreal,
                            data.precio,
                        ].some(value =>
                            String(value).toLowerCase().includes(isSearchTerm.toLowerCase())
                        );
                    }
                    if (isSelectedOptionSearch === 'Nombre') {
                        const category = isCleaningCategories.find(type => type.idcategoria === data.idcategoria)?.nombre
                        return category?.toLowerCase().includes(isSearchTerm.toLowerCase());
                    }
                    if (isSelectedOptionSearch === 'Fecha') {
                        const date = new Date(data.fecha);
                        const year = date.getFullYear();
                        const month = date.getMonth()+1;

                        return year === isTextFieldsSearchDate?.año && month === isTextFieldsSearchDate?.mes;
                    }

                    return false;
                });

                const totals = filtered.reduce((index,item) => {
                    const exist = index.find(type => type.idcategoria === item.idcategoria);
                    if(exist){
                        exist.cantidadreal += item.cantidadreal;
                        exist.precio += item.precio;
                    }else{
                        index.push({...item});
                    }
                    return index;
                },[]);

                return [...totals].sort((a, b) => {
                    if(isSelectedOptionOrder === 'Suministro'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? isCleaningCategories.find(type => type.idcategoria === a.idcategoria)?.nombre.localeCompare(isCleaningCategories.find(type => type.idcategoria === b.idcategoria)?.nombre,'es', { sensitivity: 'base' })
                        : isCleaningCategories.find(type => type.idcategoria === b.idcategoria)?.nombre.localeCompare(isCleaningCategories.find(type => type.idcategoria === a.idcategoria)?.nombre,'es', { sensitivity: 'base' })
                    }
                    if(isSelectedOptionOrder === 'Cantidad'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? a.cantidadreal - b.cantidadreal
                        : b.cantidadreal - a.cantidadreal
                    }
                    if(isSelectedOptionOrder === 'Precio'){
                        return isSelectedOptionOrderDirection === 'Asc'
                        ? a.precio - b.precio
                        : b.precio - a.precio
                    }

                    return 0
                });
            }
            return [];
        }
        return [];
    }, [isWarehouseCategories,isCleaningCategories,isWarehouseCleaning, isSupplyCategories, isSearchTerm, isSelectedOptionOrderPlus, isSelectedOptionOrderPlusUltra, isSelectedOptionSearch, isSelectedOptionOrderDirection, isTextFieldsSearchDate]);
    // Total de registros visibles de la tabla
    const recordsPerPage = 6;
    // Indices de los registros
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // Total de páginas 
    const totalPagesSales = Math.ceil(filteredRecordsSales.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsSales = filteredRecordsSales.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (sale) => {
        setIsSelectedRow((prevSelected) => {
            return prevSelected?.idalmacen === sale.idalmacen ? null : sale;
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPageSales = () => {
        if (currentPage < totalPagesSales) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesSales){
            setCurrentPage(1);
        }
    },[isSearchTerm])
    // Retorno de la función del hook
    return { handleRowClick,prevPage,currentPage,nextPageSales,currentRecordsSales,filteredRecordsSales,totalPagesSales}
}
// Hook para realizar las acciones de la tabla de reportes ✔️
export const TableActionsReports = () => {
    // Constantes con el valor de los contextos 
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext); 
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const [isSelectedOptionOrderPlus] = useContext(SelectedOptionOrderPlusContext);
    const [isTextFieldsSearchDate] = useContext(TextFieldsSearchDateContext); 
    const [isWarehouseFixedExpenses] = useContext(WarehouseFixedExpensesContext);
    const [isFixedExpenses] = useContext(FixedExpensesContext);
    const [isWarehouseCategories] = useContext(WarehouseCategoriesContext);
    const [isSupplyCategories] = useContext(SupplyCategoriesContext); 
    const [isWarehouseCleaning] = useContext(WarehouseCleaningContext);
    const [isCleaningCategories] = useContext(CleaningCategoriesContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsReports = useMemo(() => {
        if(isSelectedOptionOrderPlus === 'Categorías de insumos'){
            const fechaLimite = new Date(isTextFieldsSearchDate.año,isTextFieldsSearchDate.mes - 1, 1);

            const filteredComprasAnteriores = isWarehouseCategories.filter((data) => {
                if(data.transaccion === 'Venta' || data.transaccion === 'Venta-Rapida') return false;
                    
                const fecha = new Date(data.fecha);

                return fecha < fechaLimite;
            });
            const filteredVentasAnteriores = isWarehouseCategories.filter((data) => {
                if(data.transaccion === 'Compra') return false;
                    
                const fecha = new Date(data.fecha);

                return fecha < fechaLimite;
            });

            const agruparPorGasto = (arr) => {
                return Object.values(
                    arr.reduce((acc, item) => {
                        if (!acc[item.idcategoria]) {
                            acc[item.idcategoria] = { ...item, total: item.precio };
                        } else {
                            acc[item.idcategoria].total += item.precio;
                        }
                        return acc;
                    }, {})
                );
            };

            const comprasAnterioresAgrupadas = agruparPorGasto(filteredComprasAnteriores);
            const ventasAnterioresAgrupadas = agruparPorGasto(filteredVentasAnteriores);

            const gastoNetoAnteriorPorCategoria = comprasAnterioresAgrupadas.map(compra => {
                const venta = ventasAnterioresAgrupadas.find(v => v.idcategoria === compra.idcategoria);
                const totalVentas = venta ? venta.total : 0;
                return {
                    idcategoria: compra.idcategoria,
                    nombre: compra.nombre || "",
                    totalCompras: compra.total,
                    totalVentas: totalVentas,
                    gastoNeto: compra.total - totalVentas
                };
            });
            ventasAnterioresAgrupadas.forEach(venta => {
                const yaExiste = gastoNetoAnteriorPorCategoria.some(g => g.idcategoria === venta.idcategoria);
                if (!yaExiste) {
                    gastoNetoAnteriorPorCategoria.push({
                        idcategoria: venta.idcategoria,
                        nombre: venta.nombre || "",
                        totalCompras: 0,
                        totalVentas: venta.total,
                        gastoNeto: 0 - venta.total
                    });
                }
            });

            const filteredComprasActuales = isWarehouseCategories.filter((data) => {
                if (data.transaccion === 'Venta' || data.transaccion === 'Venta-Rapida') return false;

                const date = new Date(data.fecha);
                const year = date.getFullYear();
                const month = date.getMonth()+1;

                return year === isTextFieldsSearchDate?.año && month === isTextFieldsSearchDate?.mes;
            });
            const filteredVentasActuales = isWarehouseCategories.filter((data) => {
                if (data.transaccion === 'Compra') return false;

                const date = new Date(data.fecha);
                const year = date.getFullYear();
                const month = date.getMonth()+1;

                return year === isTextFieldsSearchDate?.año && month === isTextFieldsSearchDate?.mes;
            });

            const comprasActualesAgrupadas = agruparPorGasto(filteredComprasActuales);
            const ventasActualesAgrupadas = agruparPorGasto(filteredVentasActuales);

            const gastoNetoActualPorCategoria = comprasActualesAgrupadas.map(compra => {
                const venta = ventasActualesAgrupadas.find(v => v.idcategoria === compra.idcategoria);
                const totalVentas = venta ? venta.total : 0;
                return {
                    idcategoria: compra.idcategoria,
                    nombre: compra.nombre || "",
                    totalCompras: compra.total,
                    totalVentas: totalVentas,
                    gastoNeto: compra.total - totalVentas
                };
            });
            ventasActualesAgrupadas.forEach(venta => {
                const yaExiste = gastoNetoActualPorCategoria.some(g => g.idcategoria === venta.idcategoria);
                if (!yaExiste) {
                    gastoNetoActualPorCategoria.push({
                        idcategoria: venta.idcategoria,
                        nombre: venta.nombre || "",
                        totalCompras: 0,
                        totalVentas: venta.total,
                        gastoNeto: 0 - venta.total
                    });
                }
            });

            const resultadoPorCategoria = gastoNetoAnteriorPorCategoria.map(inicial => {
                //Obtener el nombre de la categoria
                const nombre = isSupplyCategories.find(c => c.idcategoria === inicial.idcategoria)?.nombre;
                // Obtener compras del mes para esa categoría
                const compraMes = comprasActualesAgrupadas.find(c => c.idcategoria === inicial.idcategoria);
                const totalComprasMes = compraMes ? compraMes.total : 0;

                // Obtener ventas del mes para esa categoría
                const ventaMes = ventasActualesAgrupadas.find(v => v.idcategoria === inicial.idcategoria);
                const totalVentasMes = ventaMes ? ventaMes.total : 0;

                // Inventario final = inventario inicial + compras - ventas
                const inventarioFinal = inicial.gastoNeto + totalComprasMes - totalVentasMes;

                const costo = (inicial.gastoNeto + totalComprasMes) - inventarioFinal;

                return {
                    idcategoria: inicial.idcategoria,
                    nombre: nombre,
                    inventarioInicial: Math.max(inicial.gastoNeto,0),
                    comprasDelMes: Math.max(totalComprasMes,0),
                    inventarioFinal: Math.max(inventarioFinal,0),
                    costo: Math.max(costo,0),
                };
            });

            // Agregar categorías que solo aparecen en el mes actual (no en inventario inicial)
            comprasActualesAgrupadas.forEach(compraMes => {
                const yaExiste = resultadoPorCategoria.some(r => r.idcategoria === compraMes.idcategoria);
                if (!yaExiste) {
                    const ventaMes = ventasActualesAgrupadas.find(v => v.idcategoria === compraMes.idcategoria);
                    const nombre = isSupplyCategories.find(c => c.idcategoria === compraMes.idcategoria)?.nombre;
                    const totalVentasMes = ventaMes ? ventaMes.total : 0;
                    const inventarioFinal = compraMes.total - totalVentasMes;
                    const costo = (0 + compraMes.total) - inventarioFinal;

                    resultadoPorCategoria.push({
                        idcategoria: compraMes.idcategoria,
                        nombre: nombre,
                        inventarioInicial: 0,
                        comprasDelMes: Math.max(compraMes.total,0),
                        inventarioFinal: Math.max(compraMes.total - totalVentasMes,0),
                        costo: Math.max(costo,0),
                    });
                }
            });

            // Agregar categorías que solo aparecen en ventas del mes (ni en inventario inicial ni en compras)
            ventasActualesAgrupadas.forEach(ventaMes => {
                const yaExiste = resultadoPorCategoria.some(r => r.idcategoria === ventaMes.idcategoria);
                if (!yaExiste) {
                    const nombre = isSupplyCategories.find(c => c.idcategoria === ventaMes.idcategoria)?.nombre;
                    const inventarioFinal = 0 - ventaMes.total;
                    const costo = (0 + 0) - inventarioFinal;

                    resultadoPorCategoria.push({
                        idcategoria: ventaMes.idcategoria,
                        nombre: nombre,
                        inventarioInicial: 0,
                        comprasDelMes: 0,
                        inventarioFinal: 0 - ventaMes.total,
                        costo: costo,
                    });
                }
            });

            return [...resultadoPorCategoria].sort((a, b) => {
                if(isSelectedOptionOrder === 'Nombre'){
                    return isSelectedOptionOrderDirection === 'Asc'
                    ? a.nombre.localeCompare(b.nombre,'es', { sensitivity: 'base' })
                    : b.nombre.localeCompare(a.nombre,'es', { sensitivity: 'base' })
                }
                if(isSelectedOptionOrder === 'Inventario inicial'){
                    return isSelectedOptionOrderDirection === 'Asc'
                    ? a.inventarioInicial - b.inventarioInicial
                    : b.inventarioInicial - a.inventarioInicial
                }
                if(isSelectedOptionOrder === 'Compras'){
                    return isSelectedOptionOrderDirection === 'Asc'
                    ? a.comprasDelMes - b.comprasDelMes
                    : b.comprasDelMes - a.comprasDelMes
                }
                if(isSelectedOptionOrder === 'Inventario final'){
                    return isSelectedOptionOrderDirection === 'Asc'
                    ? a.inventarioFinal - b.inventarioFinal
                    : b.inventarioFinal - a.inventarioFinal
                }
                if(isSelectedOptionOrder === 'Costo'){
                    return isSelectedOptionOrderDirection === 'Asc'
                    ? a.costo - b.costo
                    : b.costo - a.costo
                }

                return 0
            });
        }
        if(isSelectedOptionOrderPlus === 'Categorías de limpieza'){
            const fechaLimite = new Date(isTextFieldsSearchDate.año,isTextFieldsSearchDate.mes - 1, 1);

            const filteredComprasAnteriores = isWarehouseCleaning.filter((data) => {
                if(data.transaccion === 'Consumo') return false;
                    
                const fecha = new Date(data.fecha);

                return fecha < fechaLimite;
            });
            const filteredVentasAnteriores = isWarehouseCleaning.filter((data) => {
                if(data.transaccion === 'Compra') return false;
                    
                const fecha = new Date(data.fecha);

                return fecha < fechaLimite;
            });

            const agruparPorGasto = (arr) => {
                return Object.values(
                    arr.reduce((acc, item) => {
                        if (!acc[item.idcategoria]) {
                            acc[item.idcategoria] = { ...item, total: item.precio };
                        } else {
                            acc[item.idcategoria].total += item.precio;
                        }
                        return acc;
                    }, {})
                );
            };

            const comprasAnterioresAgrupadas = agruparPorGasto(filteredComprasAnteriores);
            const ventasAnterioresAgrupadas = agruparPorGasto(filteredVentasAnteriores);

            const gastoNetoAnteriorPorCategoria = comprasAnterioresAgrupadas.map(compra => {
                const venta = ventasAnterioresAgrupadas.find(v => v.idcategoria === compra.idcategoria);
                const totalVentas = venta ? venta.total : 0;
                return {
                    idcategoria: compra.idcategoria,
                    nombre: compra.nombre || "",
                    totalCompras: compra.total,
                    totalVentas: totalVentas,
                    gastoNeto: compra.total - totalVentas
                };
            });
            ventasAnterioresAgrupadas.forEach(venta => {
                const yaExiste = gastoNetoAnteriorPorCategoria.some(g => g.idcategoria === venta.idcategoria);
                if (!yaExiste) {
                    gastoNetoAnteriorPorCategoria.push({
                        idcategoria: venta.idcategoria,
                        nombre: venta.nombre || "",
                        totalCompras: 0,
                        totalVentas: venta.total,
                        gastoNeto: 0 - venta.total
                    });
                }
            });

            const filteredComprasActuales = isWarehouseCleaning.filter((data) => {
                if (data.transaccion === 'Consumo') return false;

                const date = new Date(data.fecha);
                const year = date.getFullYear();
                const month = date.getMonth()+1;

                return year === isTextFieldsSearchDate?.año && month === isTextFieldsSearchDate?.mes;
            });
            const filteredVentasActuales = isWarehouseCleaning.filter((data) => {
                if (data.transaccion === 'Compra') return false;

                const date = new Date(data.fecha);
                const year = date.getFullYear();
                const month = date.getMonth()+1;

                return year === isTextFieldsSearchDate?.año && month === isTextFieldsSearchDate?.mes;
            });

            const comprasActualesAgrupadas = agruparPorGasto(filteredComprasActuales);
            const ventasActualesAgrupadas = agruparPorGasto(filteredVentasActuales);

            const gastoNetoActualPorCategoria = comprasActualesAgrupadas.map(compra => {
                const venta = ventasActualesAgrupadas.find(v => v.idcategoria === compra.idcategoria);
                const totalVentas = venta ? venta.total : 0;
                return {
                    idcategoria: compra.idcategoria,
                    nombre: compra.nombre || "",
                    totalCompras: compra.total,
                    totalVentas: totalVentas,
                    gastoNeto: compra.total - totalVentas
                };
            });
            ventasActualesAgrupadas.forEach(venta => {
                const yaExiste = gastoNetoActualPorCategoria.some(g => g.idcategoria === venta.idcategoria);
                if (!yaExiste) {
                    gastoNetoActualPorCategoria.push({
                        idcategoria: venta.idcategoria,
                        nombre: venta.nombre || "",
                        totalCompras: 0,
                        totalVentas: venta.total,
                        gastoNeto: 0 - venta.total
                    });
                }
            });

            const resultadoPorCategoria = gastoNetoAnteriorPorCategoria.map(inicial => {
                //Obtener el nombre de la categoria
                const nombre = isCleaningCategories.find(c => c.idcategoria === inicial.idcategoria)?.nombre;
                // Obtener compras del mes para esa categoría
                const compraMes = comprasActualesAgrupadas.find(c => c.idcategoria === inicial.idcategoria);
                const totalComprasMes = compraMes ? compraMes.total : 0;

                // Obtener ventas del mes para esa categoría
                const ventaMes = ventasActualesAgrupadas.find(v => v.idcategoria === inicial.idcategoria);
                const totalVentasMes = ventaMes ? ventaMes.total : 0;

                // Inventario final = inventario inicial + compras - ventas
                const inventarioFinal = inicial.gastoNeto + totalComprasMes - totalVentasMes;

                const costo = (inicial.gastoNeto + totalComprasMes) - inventarioFinal;

                return {
                    idcategoria: inicial.idcategoria,
                    nombre: nombre,
                    inventarioInicial: Math.max(inicial.gastoNeto,0),
                    comprasDelMes: Math.max(totalComprasMes,0),
                    inventarioFinal: Math.max(inventarioFinal,0),
                    costo: Math.max(costo,0),
                };
            });

            // Agregar categorías que solo aparecen en el mes actual (no en inventario inicial)
            comprasActualesAgrupadas.forEach(compraMes => {
                const yaExiste = resultadoPorCategoria.some(r => r.idcategoria === compraMes.idcategoria);
                if (!yaExiste) {
                    const ventaMes = ventasActualesAgrupadas.find(v => v.idcategoria === compraMes.idcategoria);
                    const nombre = isCleaningCategories.find(c => c.idcategoria === compraMes.idcategoria)?.nombre;
                    const totalVentasMes = ventaMes ? ventaMes.total : 0;
                    const inventarioFinal = compraMes.total - totalVentasMes;
                    const costo = (0 + compraMes.total) - inventarioFinal;

                    resultadoPorCategoria.push({
                        idcategoria: compraMes.idcategoria,
                        nombre: nombre,
                        inventarioInicial: 0,
                        comprasDelMes: Math.max(compraMes.total,0),
                        inventarioFinal: Math.max(compraMes.total - totalVentasMes,0),
                        costo: Math.max(costo,0),
                    });
                }
            });

            // Agregar categorías que solo aparecen en ventas del mes (ni en inventario inicial ni en compras)
            ventasActualesAgrupadas.forEach(ventaMes => {
                const yaExiste = resultadoPorCategoria.some(r => r.idcategoria === ventaMes.idcategoria);
                if (!yaExiste) {
                    const nombre = isCleaningCategories.find(c => c.idcategoria === ventaMes.idcategoria)?.nombre;
                    const inventarioFinal = 0 - ventaMes.total;
                    const costo = (0 + 0) - inventarioFinal;

                    resultadoPorCategoria.push({
                        idcategoria: ventaMes.idcategoria,
                        nombre: nombre,
                        inventarioInicial: 0,
                        comprasDelMes: 0,
                        inventarioFinal: 0 - ventaMes.total,
                        costo: costo,
                    });
                }
            });

            return [...resultadoPorCategoria].sort((a, b) => {
                if(isSelectedOptionOrder === 'Nombre'){
                    return isSelectedOptionOrderDirection === 'Asc'
                    ? a.nombre.localeCompare(b.nombre,'es', { sensitivity: 'base' })
                    : b.nombre.localeCompare(a.nombre,'es', { sensitivity: 'base' })
                }
                if(isSelectedOptionOrder === 'Inventario inicial'){
                    return isSelectedOptionOrderDirection === 'Asc'
                    ? a.inventarioInicial - b.inventarioInicial
                    : b.inventarioInicial - a.inventarioInicial
                }
                if(isSelectedOptionOrder === 'Compras'){
                    return isSelectedOptionOrderDirection === 'Asc'
                    ? a.comprasDelMes - b.comprasDelMes
                    : b.comprasDelMes - a.comprasDelMes
                }
                if(isSelectedOptionOrder === 'Inventario final'){
                    return isSelectedOptionOrderDirection === 'Asc'
                    ? a.inventarioFinal - b.inventarioFinal
                    : b.inventarioFinal - a.inventarioFinal
                }
                if(isSelectedOptionOrder === 'Costo'){
                    return isSelectedOptionOrderDirection === 'Asc'
                    ? a.costo - b.costo
                    : b.costo - a.costo
                }

                return 0
            });
        }
        if(isSelectedOptionOrderPlus === 'Gastos fijos'){
            const filtered = isWarehouseFixedExpenses.filter((data) => {
                const date = new Date(data.fecha);
                const year = date.getFullYear();
                const month = date.getMonth()+1;

                return year === isTextFieldsSearchDate?.año && month === isTextFieldsSearchDate?.mes;
            });

            const totals = filtered.reduce((index,item) => {
                const exist = index.find(type => type.idgasto === item.idgasto);
                if(exist){
                    exist.cantidadreal += item.cantidadreal;
                    exist.precio += item.precio;
                }else{
                    index.push({...item});
                }
                return index;
            },[]);

            return [...totals].sort((a, b) => {
                if(isSelectedOptionOrder === 'Gasto fijo'){
                    return isSelectedOptionOrderDirection === 'Asc'
                    ? isFixedExpenses.find(type => type.idgasto === a.idgasto)?.nombre.localeCompare(isFixedExpenses.find(type => type.idgasto === b.idgasto)?.nombre,'es', { sensitivity: 'base' })
                    : isFixedExpenses.find(type => type.idgasto === b.idgasto)?.nombre.localeCompare(isFixedExpenses.find(type => type.idgasto === a.idgasto)?.nombre,'es', { sensitivity: 'base' })
                }
                if(isSelectedOptionOrder === 'Precio'){
                    return isSelectedOptionOrderDirection === 'Asc'
                    ? a.precio - b.precio
                    : b.precio - a.precio
                }

                return 0
            });
        }
        return [];
    }, [isWarehouseCategories,isSupplyCategories,isWarehouseFixedExpenses,isFixedExpenses,isWarehouseCleaning,isCleaningCategories,isSelectedOptionOrderPlus,isSelectedOptionOrderDirection,isTextFieldsSearchDate]);
    // Total de registros visibles de la tabla
    const recordsPerPage = 6;
    // Indices de los registros
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // Total de páginas 
    const totalPagesReports = Math.ceil(filteredRecordsReports.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsReports = filteredRecordsReports.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (report) => {
        if(isSelectedOptionOrderPlus === 'Categorías de insumos' || isSelectedOptionOrderPlus === 'Categorías de limpieza'){
            setIsSelectedRow((prevSelected) => {
                return prevSelected?.idcategoria === report.idcategoria ? null : report;
            });
        }
        if(isSelectedOptionOrderPlus === 'Gastos fijos'){
            setIsSelectedRow((prevSelected) => {
                return prevSelected?.idalmacen === report.idalmacen ? null : report;
            });
        }
    };
    // Función de siguiente de registros de la tabla
    const nextPageReports = () => {
        if (currentPage < totalPagesReports) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesReports){
            setCurrentPage(1);
        }
    },[isSearchTerm])
    // Retorno de la función del hook
    return { handleRowClick,prevPage,currentPage,nextPageReports,currentRecordsReports,filteredRecordsReports,totalPagesReports}
}