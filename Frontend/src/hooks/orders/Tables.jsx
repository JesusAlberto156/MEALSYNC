//____________IMPORT/EXPORT____________
// Hooks de React
import { useState,useContext,useEffect,useMemo } from "react";
// Contextos
import { DeletedDishesContext,DishesContext,MenuTypeDishesContext,WarehouseDishesContext } from "../../contexts/DishesProvider";
import { SideDishesContext,DeletedSideDishesContext,MenuTypeSideDishesContext,WarehouseSideDishesContext } from "../../contexts/SideDishesProvider";
import { DrinksContext,DeletedDrinksContext,MenuTypeDrinksContext,WarehouseDrinksContext } from "../../contexts/DrinksProvider";
import { TextFieldsSearchOrdersContext } from "../../contexts/FormsProvider";
import { SelectedRowContext } from "../../contexts/SelectedesProvider";
import { SearchTermContext } from "../../contexts/SearchsProvider";
import { WarehouseSupplyTypesContext } from "../../contexts/WarehouseProvider";
import { SupplyTypesContext } from "../../contexts/SuppliesProvider";
//____________IMPORT/EXPORT____________

// Hook para realizar las acciones de la tabla de los platillos ✔️
export const TableActionsDishes = () => {
    // Constantes con el valor de los contextos 
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isDeletedDishes] = useContext(DeletedDishesContext);
    const [isDishes] = useContext(DishesContext);
    const [isMenuTypeDishes] = useContext(MenuTypeDishesContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isTextFieldsSearchOrders] = useContext(TextFieldsSearchOrdersContext);
    const [isWarehouseSupplyTypes] = useContext(WarehouseSupplyTypesContext); 
    const [isSupplyTypes] = useContext(SupplyTypesContext);
    const [isWarehouseDishes] = useContext(WarehouseDishesContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsTotalSupplies = useMemo(() => {
        const filteredPurchases = isWarehouseSupplyTypes.filter((data) => {
            if(data.transaccion === 'Venta' || data.transaccion === 'Venta-Rapida' || data.transaccion === 'Pedido') return false;

            return true;
        });
        const totalsPurchases = filteredPurchases.reduce((index,item) => {
            const exist = index.find(type => type.idtipo === item.idtipo);
            if(exist){
                exist.cantidadreal += item.cantidadreal;
                exist.precio += item.precio;
            }else{
                index.push({...item});
            }
            return index;
        },[]);
        const filteredSales = isWarehouseSupplyTypes.filter((data) => {
            if(data.transaccion === 'Compra' || data.transaccion === 'Pedido Cancelado') return false;

            return true;;
        });
        const totalsSales = filteredSales.reduce((index,item) => {
            const exist = index.find(type => type.idtipo === item.idtipo);
            if(exist){
                exist.cantidadreal += item.cantidadreal;
                exist.precio += item.precio;
            }else{
                index.push({...item});
            }
            return index;
        },[]);

        const resultado = [];

        // Obtenemos todos los idtipo únicos de compras y ventas
        const allTypes = [
            ...new Set([
                ...totalsPurchases.map(item => item.idtipo),
                ...totalsSales.map(item => item.idtipo)
            ])
        ];

        allTypes.forEach(idtipo => {
            const compra = totalsPurchases.find(item => item.idtipo === idtipo);
            const venta = totalsSales.find(item => item.idtipo === idtipo);

            const cantidadFinal = (compra?.cantidadreal || 0) - (venta?.cantidadreal || 0);

            const supplyData = isSupplyTypes.find(s => s.idtipo === idtipo);
            resultado.push({
                idtipo,
                nombre: supplyData?.tipo || '',
                cantidadreal: cantidadFinal,
                limite: supplyData?.limite || 0,
                unidad: supplyData?.unidad || '',
            });
        });

        return resultado;
    }, [isWarehouseSupplyTypes, isSupplyTypes]);
    const filteredRecordsDishes = useMemo(() => {
        const filtered = isDishes.filter((data) => {
            const isDeleted = isDeletedDishes.some(dish => dish.idplatillo === data.idplatillo);
            if (isDeleted) return false;

            const menus = isMenuTypeDishes.filter(menu => menu.idplatillo === data.idplatillo);
            
            if(!menus.some(m => m.idtipo === isTextFieldsSearchOrders.idtipo)) return false;

            if(data.idmenu === null) return data.nombre.toLowerCase().includes(isSearchTerm.toLowerCase());

            if(isTextFieldsSearchOrders.tiempo === 'Desayuno' && data.idmenu !== 1) return false;
            if(isTextFieldsSearchOrders.tiempo === 'Comida' && data.idmenu !== 2) return false;
            if(isTextFieldsSearchOrders.tiempo === 'Cena' && data.idmenu !== 3) return false;

            const counts = isWarehouseDishes.filter(d => d.idplatillo === data.idplatillo);

            const puedePrepararse = counts.every((c) => {
                const warehouse = isWarehouseSupplyTypes.find(w => w.idalmacen === c.idalmacen);
                if(!warehouse) return false;
                const stock = filteredRecordsTotalSupplies.find(s => s.idtipo === warehouse.idtipo);
                return stock && stock.cantidadreal >= c.cantidad;
            });

            if (!puedePrepararse) return false;

            return data.nombre.toLowerCase().includes(isSearchTerm.toLowerCase());
        });

        return filtered;
    }, [isDishes, isDeletedDishes, isWarehouseDishes, filteredRecordsTotalSupplies, isMenuTypeDishes, isTextFieldsSearchOrders, isSearchTerm]);
    // Total de registros visibles de la tabla
    const recordsPerPage = 12;
    // Indices de los registros
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // Total de páginas 
    const totalPagesDishes = Math.ceil(filteredRecordsDishes.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsDishes = filteredRecordsDishes.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (dish) => {
        setIsSelectedRow((prevSelected) => {
            return prevSelected?.idplatillo === dish.idplatillo ? null : dish;
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPageDishes = () => {
        if (currentPage < totalPagesDishes) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesDishes){
            setCurrentPage(1);
        }
    },[isSearchTerm])
    // Retorno de la función del hook
    return { handleRowClick,prevPage,currentPage,nextPageDishes,currentRecordsDishes,filteredRecordsDishes,totalPagesDishes}
}
// Hook para realizar las acciones de la tabla de las guarniciones ✔️
export const TableActionsSideDishes = () => {
    // Constantes con el valor de los contextos 
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isDeletedSideDishes] = useContext(DeletedSideDishesContext);
    const [isSideDishes] = useContext(SideDishesContext);
    const [isMenuTypeSideDishes] = useContext(MenuTypeSideDishesContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isTextFieldsSearchOrders] = useContext(TextFieldsSearchOrdersContext);
    const [isWarehouseSupplyTypes] = useContext(WarehouseSupplyTypesContext); 
    const [isSupplyTypes] = useContext(SupplyTypesContext);
    const [isWarehouseSideDishes] = useContext(WarehouseSideDishesContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsTotalSupplies = useMemo(() => {
        const filteredPurchases = isWarehouseSupplyTypes.filter((data) => {
            if(data.transaccion === 'Venta' || data.transaccion === 'Venta-Rapida' || data.transaccion === 'Pedido') return false;

            return true;
        });
        const totalsPurchases = filteredPurchases.reduce((index,item) => {
            const exist = index.find(type => type.idtipo === item.idtipo);
            if(exist){
                exist.cantidadreal += item.cantidadreal;
                exist.precio += item.precio;
            }else{
                index.push({...item});
            }
            return index;
        },[]);
        const filteredSales = isWarehouseSupplyTypes.filter((data) => {
            if(data.transaccion === 'Compra' || data.transaccion === 'Pedido Cancelado') return false;

            return true;;
        });
        const totalsSales = filteredSales.reduce((index,item) => {
            const exist = index.find(type => type.idtipo === item.idtipo);
            if(exist){
                exist.cantidadreal += item.cantidadreal;
                exist.precio += item.precio;
            }else{
                index.push({...item});
            }
            return index;
        },[]);

        const resultado = [];

        // Obtenemos todos los idtipo únicos de compras y ventas
        const allTypes = [
            ...new Set([
                ...totalsPurchases.map(item => item.idtipo),
                ...totalsSales.map(item => item.idtipo)
            ])
        ];

        allTypes.forEach(idtipo => {
            const compra = totalsPurchases.find(item => item.idtipo === idtipo);
            const venta = totalsSales.find(item => item.idtipo === idtipo);

            const cantidadFinal = (compra?.cantidadreal || 0) - (venta?.cantidadreal || 0);

            const supplyData = isSupplyTypes.find(s => s.idtipo === idtipo);
            resultado.push({
                idtipo,
                nombre: supplyData?.tipo || '',
                cantidadreal: cantidadFinal,
                limite: supplyData?.limite || 0,
                unidad: supplyData?.unidad || '',
            });
        });

        return resultado;
    }, [isWarehouseSupplyTypes, isSupplyTypes]);
    const filteredRecordsSideDishes = useMemo(() => {
        const filtered = isSideDishes.filter((data) => {
            const isDeleted = isDeletedSideDishes.some(dish => dish.idguarnicion === data.idguarnicion);
            if (isDeleted) return false;

            const menus = isMenuTypeSideDishes.filter(menu => menu.idguarnicion === data.idguarnicion);
            
            if(!menus.some(m => m.idtipo === isTextFieldsSearchOrders.idtipo)) return false;

            if(data.idmenu === null) return data.nombre.toLowerCase().includes(isSearchTerm.toLowerCase());

            if(isTextFieldsSearchOrders.tiempo === 'Desayuno' && data.idmenu !== 1) return false;
            if(isTextFieldsSearchOrders.tiempo === 'Comida' && data.idmenu !== 2) return false;
            if(isTextFieldsSearchOrders.tiempo === 'Cena' && data.idmenu !== 3) return false;

            const counts = isWarehouseSideDishes.filter(d => d.idguarnicion === data.idguarnicion);

            const puedePrepararse = counts.every((c) => {
                const warehouse = isWarehouseSupplyTypes.find(w => w.idalmacen === c.idalmacen);
                if(!warehouse) return false;
                const stock = filteredRecordsTotalSupplies.find(s => s.idtipo === warehouse.idtipo);
                return stock && stock.cantidadreal >= c.cantidad;
            });

            if (!puedePrepararse) return false;

            return data.nombre.toLowerCase().includes(isSearchTerm.toLowerCase());
        });

        return filtered;
    }, [isSideDishes, isDeletedSideDishes, isWarehouseSideDishes, filteredRecordsTotalSupplies, isMenuTypeSideDishes, isTextFieldsSearchOrders, isSearchTerm]);
    // Total de registros visibles de la tabla
    const recordsPerPage = 12;
    // Indices de los registros
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // Total de páginas 
    const totalPagesSideDishes = Math.ceil(filteredRecordsSideDishes.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsSideDishes = filteredRecordsSideDishes.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (sideDish) => {
        setIsSelectedRow((prevSelected) => {
            return prevSelected?.idguarnicion === sideDish.idguarnicion ? null : sideDish;
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPageSideDishes = () => {
        if (currentPage < totalPagesSideDishes) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesSideDishes){
            setCurrentPage(1);
        }
    },[isSearchTerm])
    // Retorno de la función del hook
    return { handleRowClick,prevPage,currentPage,nextPageSideDishes,currentRecordsSideDishes,filteredRecordsSideDishes,totalPagesSideDishes}
}
// Hook para realizar las acciones de la tabla de las bebidas ✔️
export const TableActionsDrinks = () => {
    // Constantes con el valor de los contextos 
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isDeletedDrinks] = useContext(DeletedDrinksContext);
    const [isDrinks] = useContext(DrinksContext);
    const [isMenuTypeDrinks] = useContext(MenuTypeDrinksContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isTextFieldsSearchOrders] = useContext(TextFieldsSearchOrdersContext);
    const [isWarehouseSupplyTypes] = useContext(WarehouseSupplyTypesContext); 
    const [isSupplyTypes] = useContext(SupplyTypesContext);
    const [isWarehouseDrinks] = useContext(WarehouseDrinksContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsTotalSupplies = useMemo(() => {
        const filteredPurchases = isWarehouseSupplyTypes.filter((data) => {
            if(data.transaccion === 'Venta' || data.transaccion === 'Venta-Rapida' || data.transaccion === 'Pedido') return false;

            return true;
        });
        const totalsPurchases = filteredPurchases.reduce((index,item) => {
            const exist = index.find(type => type.idtipo === item.idtipo);
            if(exist){
                exist.cantidadreal += item.cantidadreal;
                exist.precio += item.precio;
            }else{
                index.push({...item});
            }
            return index;
        },[]);
        const filteredSales = isWarehouseSupplyTypes.filter((data) => {
            if(data.transaccion === 'Compra' || data.transaccion === 'Pedido Cancelado') return false;

            return true;;
        });
        const totalsSales = filteredSales.reduce((index,item) => {
            const exist = index.find(type => type.idtipo === item.idtipo);
            if(exist){
                exist.cantidadreal += item.cantidadreal;
                exist.precio += item.precio;
            }else{
                index.push({...item});
            }
            return index;
        },[]);

        const resultado = [];

        // Obtenemos todos los idtipo únicos de compras y ventas
        const allTypes = [
            ...new Set([
                ...totalsPurchases.map(item => item.idtipo),
                ...totalsSales.map(item => item.idtipo)
            ])
        ];

        allTypes.forEach(idtipo => {
            const compra = totalsPurchases.find(item => item.idtipo === idtipo);
            const venta = totalsSales.find(item => item.idtipo === idtipo);

            const cantidadFinal = (compra?.cantidadreal || 0) - (venta?.cantidadreal || 0);

            const supplyData = isSupplyTypes.find(s => s.idtipo === idtipo);
            resultado.push({
                idtipo,
                nombre: supplyData?.tipo || '',
                cantidadreal: cantidadFinal,
                limite: supplyData?.limite || 0,
                unidad: supplyData?.unidad || '',
            });
        });

        return resultado;
    }, [isWarehouseSupplyTypes, isSupplyTypes]);
    const filteredRecordsDrinks = useMemo(() => {
        const filtered = isDrinks.filter((data) => {
            const isDeleted = isDeletedDrinks.some(dish => dish.idbebida === data.idbebida);
            if (isDeleted) return false;
            
            const menus = isMenuTypeDrinks.filter(menu => menu.idbebida === data.idbebida);
            
            if(!menus.some(m => m.idtipo === isTextFieldsSearchOrders.idtipo)) return false;

            if(data.idmenu === null) return data.nombre.toLowerCase().includes(isSearchTerm.toLowerCase());

            if(isTextFieldsSearchOrders.tiempo === 'Desayuno' && data.idmenu !== 1) return false;
            if(isTextFieldsSearchOrders.tiempo === 'Comida' && data.idmenu !== 2) return false;
            if(isTextFieldsSearchOrders.tiempo === 'Cena' && data.idmenu !== 3) return false;

            const counts = isWarehouseDrinks.filter(d => d.idbebida === data.idbebida);

            const puedePrepararse = counts.every((c) => {
                const warehouse = isWarehouseSupplyTypes.find(w => w.idalmacen === c.idalmacen);
                if(!warehouse) return false;
                const stock = filteredRecordsTotalSupplies.find(s => s.idtipo === warehouse.idtipo);
                return stock && stock.cantidadreal >= c.cantidad;
            });

            if (!puedePrepararse) return false;
            
            return data.nombre.toLowerCase().includes(isSearchTerm.toLowerCase());
        });

        return filtered;
    }, [isDrinks, isDeletedDrinks, isWarehouseDrinks, filteredRecordsTotalSupplies, isMenuTypeDrinks, isTextFieldsSearchOrders, isSearchTerm]);
    // Total de registros visibles de la tabla
    const recordsPerPage = 12;
    // Indices de los registros
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // Total de páginas 
    const totalPagesDrinks = Math.ceil(filteredRecordsDrinks.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsDrinks = filteredRecordsDrinks.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (drink) => {
        setIsSelectedRow((prevSelected) => {
            return prevSelected?.idbebida === drink.idbebida ? null : drink;
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPageDrinks = () => {
        if (currentPage < totalPagesDrinks) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesDrinks){
            setCurrentPage(1);
        }
    },[isSearchTerm])
    // Retorno de la función del hook
    return { handleRowClick,prevPage,currentPage,nextPageDrinks,currentRecordsDrinks,filteredRecordsDrinks,totalPagesDrinks}
}