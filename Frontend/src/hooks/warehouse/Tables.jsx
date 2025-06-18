//____________IMPORT/EXPORT____________
// Hooks de React
import { useState,useContext,useEffect,useMemo } from "react";
// Contextos
import { SuppliesContext } from "../../contexts/SuppliersProvider";
import { SupplyOrdersContext,DeletedSupplyOrdersContext,WarhouseSupplyTypesContext,WarhouseCategoriesContext } from "../../contexts/WarehouseProvider";
import { SelectedRowContext,SelectedOptionSearchContext,SelectedOptionOrderDirectionContext,SelectedOptionOrderContext } from "../../contexts/SelectedesProvider";
import { SearchTermContext } from "../../contexts/SearchsProvider";
// Hooks personalizados
import { Dates } from "../Dates";
//____________IMPORT/EXPORT____________

// Hook para realizar las acciones de la tabla de pedidos de insumo ✔️
export const TableActionsSupplyOrders = () => {
    // Constantes con el valor de los contextos 
    const [isSupplyOrders] = useContext(SupplyOrdersContext);
    const [isDeletedSupplyOrders] = useContext(DeletedSupplyOrdersContext);
    const [isSupplies] = useContext(SuppliesContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isSelectedOptionSearch] = useContext(SelectedOptionSearchContext);
    const [isSelectedOptionOrderDirection,setIsSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder,setIsSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const { getDate } = Dates();
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsSupplyOrders = useMemo(() => {
        const filtered = isSupplyOrders.filter((data) => {
            const isDeleted = isDeletedSupplyOrders.some(supplyOrder => supplyOrder.idpedido === data.idpedido);
            if (isDeleted) return false;
            
            if (isSelectedOptionSearch === 'General') {
                const insumo = isSupplies.find(supply => supply.idinsumo === data.idinsumo)?.nombre;
                const fecha = getDate(data.fecha);
                return [
                    data.numeropedido,
                    fecha,
                    insumo,
                    data.cantidad,
                    data.preciounitario,
                    data.preciototal,
                    data.estado,
                ].some(value =>
                    String(value).toLowerCase().includes(isSearchTerm.toLowerCase())
                );
            }
            if(isSelectedOptionSearch === 'Número de Pedido'){
                return data.numeropedido.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Fecha'){
                const fecha = getDate(data.fecha);
                return fecha.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Insumo'){
                const insumo = isSupplies.find(supply => supply.idinsumo === data.idinsumo)?.nombre;
                return insumo.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Cantidad'){
                return data.cantidad.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Precio Unitario'){
                return data.preciounitario.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Precio Total'){
                return data.preciototal.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Estado'){
                return data.estado.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
        });
        return [...filtered].sort((a, b) => {
            if(isSelectedOptionOrder === 'Número de Pedido'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.numeropedido.localeCompare(b.numeropedido,'es', { sensitivity: 'base' })
                : b.numeropedido.localeCompare(a.numeropedido,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'Fecha'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? new Date(a.fecha) - new Date(b.fecha)
                : new Date(b.fecha) - new Date(a.fecha)
            }
            if(isSelectedOptionOrder === 'Insumo'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? isSupplies.find(supply => supply.idinsumo === a.idinsumo)?.nombre.localeCompare(isSupplies.find(supply => supply.idinsumo === b.idinsumo)?.nombre,'es', { sensitivity: 'base' })
                : isSupplies.find(supply => supply.idinsumo === b.idinsumo)?.nombre.localeCompare(isSupplies.find(supply => supply.idinsumo === a.idinsumo)?.nombre,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'Cantidad'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.cantidad - b.cantidad
                : b.cantidad - a.cantidad
            }
            if(isSelectedOptionOrder === 'Precio Unitario'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.preciounitario - b.preciounitario
                : b.preciounitario - a.preciounitario
            }
            if(isSelectedOptionOrder === 'Precio Total'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.preciototal - b.preciototal
                : b.preciototal - a.preciototal
            }
            if(isSelectedOptionOrder === 'Estado'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.estado.localeCompare(b.estado,'es', { sensitivity: 'base' })
                : b.estado.localeCompare(a.estado,'es', { sensitivity: 'base' })
            }

            return 0
        });
    }, [isSupplies, isDeletedSupplyOrders, isSupplyOrders, isSearchTerm, isSelectedOptionSearch, isSelectedOptionOrderDirection]);
    // Cambio de direccion del ordenamiento
    const ToggleOrderDirection = () => {
        setIsSelectedOptionOrderDirection(prev => prev === 'Asc' ? 'Desc' : 'Asc');
    };
    // Cambio de lo que quiere ordenar
    const ToggleOrder = (option) => {
        setIsSelectedOptionOrder(option);
    };
    // Total de registros visibles de la tabla
    const recordsPerPage = 8;
    // Indices de los registros
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // Total de páginas 
    const totalPagesSupplyOrders = Math.ceil(filteredRecordsSupplyOrders.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsSupplyOrders = filteredRecordsSupplyOrders.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (supplyOrder) => {
        setIsSelectedRow((prevSelected) => {
            return prevSelected?.idpedido === supplyOrder.idpedido ? null : supplyOrder;
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPageSupplyOrders = () => {
        if (currentPage < totalPagesSupplyOrders) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesSupplyOrders){
            setCurrentPage(1);
        }
    },[isSearchTerm])
    // Retorno de la función del hook
    return { handleRowClick,prevPage,currentPage,nextPageSupplyOrders,currentRecordsSupplyOrders,filteredRecordsSupplyOrders,ToggleOrder,ToggleOrderDirection,totalPagesSupplyOrders}
}
// Hook para realizar las acciones de la tabla de compras ✔️
export const TableActionsPurchases = () => {
    // Constantes con el valor de los contextos 
    const [isWarehouseCategories,setIsWarehouseCategories] = useContext(WarhouseCategoriesContext);
    const [isWarehouseSupplyTypes,setIsWarehouseSupplyTypes] = useContext(WarhouseSupplyTypesContext); 
    const [isSupplyOrders] = useContext(SupplyOrdersContext);
    const [isDeletedSupplyOrders] = useContext(DeletedSupplyOrdersContext);
    const [isSupplies] = useContext(SuppliesContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isSelectedOptionSearch] = useContext(SelectedOptionSearchContext);
    const [isSelectedOptionOrderDirection,setIsSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder,setIsSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const { getDate } = Dates();
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsSupplyOrders = useMemo(() => {
        
        const filtered = isSupplyOrders.filter((data) => {
            const isDeleted = isDeletedSupplyOrders.some(supplyOrder => supplyOrder.idpedido === data.idpedido);
            if (isDeleted) return false;
            
            if (isSelectedOptionSearch === 'General') {
                const insumo = isSupplies.find(supply => supply.idinsumo === data.idinsumo)?.nombre;
                const fecha = getDate(data.fecha);
                return [
                    data.numeropedido,
                    fecha,
                    insumo,
                    data.cantidad,
                    data.preciounitario,
                    data.preciototal,
                    data.estado,
                ].some(value =>
                    String(value).toLowerCase().includes(isSearchTerm.toLowerCase())
                );
            }
            if(isSelectedOptionSearch === 'Número de Pedido'){
                return data.numeropedido.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Fecha'){
                const fecha = getDate(data.fecha);
                return fecha.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Insumo'){
                const insumo = isSupplies.find(supply => supply.idinsumo === data.idinsumo)?.nombre;
                return insumo.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Cantidad'){
                return data.cantidad.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Precio Unitario'){
                return data.preciounitario.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Precio Total'){
                return data.preciototal.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Estado'){
                return data.estado.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
        });
        return [...filtered].sort((a, b) => {
            if(isSelectedOptionOrder === 'Número de Pedido'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.numeropedido.localeCompare(b.numeropedido,'es', { sensitivity: 'base' })
                : b.numeropedido.localeCompare(a.numeropedido,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'Fecha'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? new Date(a.fecha) - new Date(b.fecha)
                : new Date(b.fecha) - new Date(a.fecha)
            }
            if(isSelectedOptionOrder === 'Insumo'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? isSupplies.find(supply => supply.idinsumo === a.idinsumo)?.nombre.localeCompare(isSupplies.find(supply => supply.idinsumo === b.idinsumo)?.nombre,'es', { sensitivity: 'base' })
                : isSupplies.find(supply => supply.idinsumo === b.idinsumo)?.nombre.localeCompare(isSupplies.find(supply => supply.idinsumo === a.idinsumo)?.nombre,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'Cantidad'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.cantidad - b.cantidad
                : b.cantidad - a.cantidad
            }
            if(isSelectedOptionOrder === 'Precio Unitario'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.preciounitario - b.preciounitario
                : b.preciounitario - a.preciounitario
            }
            if(isSelectedOptionOrder === 'Precio Total'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.preciototal - b.preciototal
                : b.preciototal - a.preciototal
            }
            if(isSelectedOptionOrder === 'Estado'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.estado.localeCompare(b.estado,'es', { sensitivity: 'base' })
                : b.estado.localeCompare(a.estado,'es', { sensitivity: 'base' })
            }

            return 0
        });
    }, [isSupplies, isDeletedSupplyOrders, isSupplyOrders, isSearchTerm, isSelectedOptionSearch, isSelectedOptionOrderDirection]);
    // Cambio de direccion del ordenamiento
    const ToggleOrderDirection = () => {
        setIsSelectedOptionOrderDirection(prev => prev === 'Asc' ? 'Desc' : 'Asc');
    };
    // Cambio de lo que quiere ordenar
    const ToggleOrder = (option) => {
        setIsSelectedOptionOrder(option);
    };
    // Total de registros visibles de la tabla
    const recordsPerPage = 8;
    // Indices de los registros
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // Total de páginas 
    const totalPagesSupplyOrders = Math.ceil(filteredRecordsSupplyOrders.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsSupplyOrders = filteredRecordsSupplyOrders.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (supplyOrder) => {
        setIsSelectedRow((prevSelected) => {
            return prevSelected?.idpedido === supplyOrder.idpedido ? null : supplyOrder;
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPageSupplyOrders = () => {
        if (currentPage < totalPagesSupplyOrders) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesSupplyOrders){
            setCurrentPage(1);
        }
    },[isSearchTerm])
    // Retorno de la función del hook
    return { handleRowClick,prevPage,currentPage,nextPageSupplyOrders,currentRecordsSupplyOrders,filteredRecordsSupplyOrders,ToggleOrder,ToggleOrderDirection,totalPagesSupplyOrders}
}