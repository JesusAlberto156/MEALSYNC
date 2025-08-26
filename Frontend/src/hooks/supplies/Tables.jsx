//____________IMPORT/EXPORT____________
// Hooks de React
import { useState,useContext,useEffect,useMemo } from "react";
// Contextos
import { SuppliersContext } from "../../contexts/SuppliersProvider";
import { SupplyTypesContext,DeletedSupplyTypesContext,SupplyCategoriesContext,DeletedSupplyCategoriesContext,SuppliesContext,DeletedSuppliesContext,CountSupplyTypesContext } from "../../contexts/SuppliesProvider";
import { SelectedRowContext,SelectedOptionSearchContext,SelectedOptionOrderDirectionContext,SelectedOptionOrderContext } from "../../contexts/SelectedesProvider";
import { SearchTermContext } from "../../contexts/SearchsProvider";
import { WarehouseSupplyTypesContext } from "../../contexts/WarehouseProvider";
//____________IMPORT/EXPORT____________

// Hook para realizar las acciones de la tabla de categorias por insumos ✔️
export const TableActionsSupplyCategories = () => {
    // Constantes con el valor de los contextos 
    const [isSupplyCategories] = useContext(SupplyCategoriesContext);
    const [isDeletedSupplyCategories] = useContext(DeletedSupplyCategoriesContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsSupplyCategories = useMemo(() => {
        const filtered = isSupplyCategories.filter((data) => {
            const isDeleted = isDeletedSupplyCategories.some(category => category.idcategoria === data.idcategoria);
            if (isDeleted) return false;
            
            return data.nombre.toLowerCase().includes(isSearchTerm.toLowerCase());
        });
        return [...filtered].sort((a, b) => {
            if(isSelectedOptionOrder === 'Nombre'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.nombre.localeCompare(b.nombre,'es', { sensitivity: 'base' })
                : b.nombre.localeCompare(a.nombre,'es', { sensitivity: 'base' })
            }

            return 0
        });
    }, [isSupplyCategories, isDeletedSupplyCategories, isSearchTerm, isSelectedOptionOrderDirection, isSelectedOptionOrder]);
    // Total de registros visibles de la tabla
    const recordsPerPage = 6;
    // Indices de los registros
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // Total de páginas 
    const totalPagesSupplyCategories = Math.ceil(filteredRecordsSupplyCategories.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsSupplyCategories = filteredRecordsSupplyCategories.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (category) => {
        setIsSelectedRow((prevSelected) => {
            return prevSelected?.idcategoria === category.idcategoria ? null : category;
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPageSupplyCategories = () => {
        if (currentPage < totalPagesSupplyCategories) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesSupplyCategories){
            setCurrentPage(1);
        }
    },[isSearchTerm])
    // Retorno de la función del hook
    return { handleRowClick,prevPage,currentPage,nextPageSupplyCategories,currentRecordsSupplyCategories,filteredRecordsSupplyCategories,totalPagesSupplyCategories}
}
// Hook para realizar las acciones de la tabla de tipos de insumo ✔️
export const TableActionsSupplyTypes = () => {
    // Constantes con el valor de los contextos 
    const [isSupplyTypes] = useContext(SupplyTypesContext);
    const [isDeletedSupplyTypes] = useContext(DeletedSupplyTypesContext);
    const [isSupplyCategories] = useContext(SupplyCategoriesContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isSelectedOptionSearch] = useContext(SelectedOptionSearchContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsSupplyTypes = useMemo(() => {
        const filtered = isSupplyTypes.filter((data) => {
            const isDeleted = isDeletedSupplyTypes.some(type => type.idtipo === data.idtipo);
            if (isDeleted) return false;
            
            if (isSelectedOptionSearch === 'General') {
                const category = isSupplyCategories.find(category => category.idcategoria === data.idcategoria)?.nombre;
                return [
                    category,
                    data.tipo,
                    data.unidad,
                    data.limite
                ].some(value =>
                    String(value).toLowerCase().includes(isSearchTerm.toLowerCase())
                );
            }
            if(isSelectedOptionSearch === 'Nombre'){
                return data.tipo.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Unidad'){
                return data.unidad.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Categoría'){
                const category = isSupplyCategories.find(category => category.idcategoria === data.idcategoria)?.nombre;
                return category?.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Cantidad Mínima'){
                return String(data.limite).toLowerCase().includes(isSearchTerm.toLowerCase());
            }
        });
        return [...filtered].sort((a, b) => {
            if(isSelectedOptionOrder === 'Nombre'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.tipo.localeCompare(b.tipo,'es', { sensitivity: 'base' })
                : b.tipo.localeCompare(a.tipo,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'Unidad'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.unidad.localeCompare(b.unidad,'es', { sensitivity: 'base' })
                : b.unidad.localeCompare(a.unidad,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'Categoría'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? isSupplyCategories.find(category => category.idcategoria === a.idcategoria)?.nombre.localeCompare(isSupplyCategories.find(category => category.idcategoria === b.idcategoria)?.nombre,'es', { sensitivity: 'base' })
                : isSupplyCategories.find(category => category.idcategoria === b.idcategoria)?.nombre.localeCompare(isSupplyCategories.find(category => category.idcategoria === a.idcategoria)?.nombre,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'Cantidad Mínima'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.limite - b.limite
                : b.limite - a.limite
            }

            return 0
        });
    }, [isSupplyTypes, isDeletedSupplyTypes, isSupplyCategories, isSearchTerm, isSelectedOptionSearch, isSelectedOptionOrderDirection, isSelectedOptionOrder]);
    // Total de registros visibles de la tabla
    const recordsPerPage = 6;
    // Indices de los registros
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // Total de páginas 
    const totalPagesSupplyTypes = Math.ceil(filteredRecordsSupplyTypes.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsSupplyTypes = filteredRecordsSupplyTypes.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (type) => {
        setIsSelectedRow((prevSelected) => {
            return prevSelected?.idtipo === type.idtipo ? null : type;
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPageSupplyTypes = () => {
        if (currentPage < totalPagesSupplyTypes) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesSupplyTypes){
            setCurrentPage(1);
        }
    },[isSearchTerm])
    // Retorno de la función del hook
    return { handleRowClick,prevPage,currentPage,nextPageSupplyTypes,currentRecordsSupplyTypes,filteredRecordsSupplyTypes,totalPagesSupplyTypes}
}
// Hook para realizar las acciones de la tabla de insumos ✔️
export const TableActionsSupplies = () => {
    // Constantes con el valor de los contextos 
    const [isSupplies] = useContext(SuppliesContext);
    const [isDeletedSupplies] = useContext(DeletedSuppliesContext);
    const [isSuppliers] = useContext(SuppliersContext);
    const [isSupplyTypes] = useContext(SupplyTypesContext);
    const [isSupplyCategories] = useContext(SupplyCategoriesContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isSelectedOptionSearch] = useContext(SelectedOptionSearchContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const [isCountSupplyTypes] = useContext(CountSupplyTypesContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsSupplies = useMemo(() => {
        const filtered = isSupplies.filter((data) => {
            const isDeleted = isDeletedSupplies.some(supply => supply.idinsumo === data.idinsumo);
            if (isDeleted) return false;
            
            if (isSelectedOptionSearch === 'General') {
                const supplier = isSuppliers.find(supplier => supplier.idproveedor === data.idproveedor)?.nombre;
                const category = isSupplyCategories.find(category => category.idcategoria === data.idcategoria)?.nombre;
                const type = isSupplyTypes.find(type => type.idtipo === data.idtipo)?.tipo;
                const count = isCountSupplyTypes.find(count => count.idcantidad === data.idcantidad)?.cantidad;
                return [
                    supplier,
                    category,
                    type,
                    data.nombre,
                    data.codigo,
                    count
                ].some(value =>
                    String(value).toLowerCase().includes(isSearchTerm.toLowerCase())
                );
            }
            if(isSelectedOptionSearch === 'Código'){
                return data.codigo.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Nombre'){
                return data.nombre.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Proveedor'){
                const supplier = isSuppliers.find(supplier => supplier.idproveedor === data.idproveedor)?.nombre;
                return supplier?.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Categoría'){
                const category = isSupplyCategories.find(category => category.idcategoria === data.idcategoria)?.nombre;
                return category?.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Tipo'){
                const type = isSupplyTypes.find(type => type.idtipo === data.idtipo)?.tipo;
                return type?.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Cantidad'){
                const count = isCountSupplyTypes.find(count => count.idcantidad === data.idcantidad);
                return String(count.cantidad).toLowerCase().includes(isSearchTerm.toLowerCase());
            }
        });
        return [...filtered].sort((a, b) => {
            if(isSelectedOptionOrder === 'Codigo'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.codigo.localeCompare(b.codigo,'es', { sensitivity: 'base' })
                : b.codigo.localeCompare(a.codigo,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'Nombre'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.nombre.localeCompare(b.tipo,'es', { sensitivity: 'base' })
                : b.nombre.localeCompare(a.tipo,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'Proveedor'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? isSuppliers.find(supplier => supplier.idproveedor === a.idproveedor)?.nombre.localeCompare(isSuppliers.find(supplier => supplier.idproveedor === b.idproveedor)?.nombre,'es', { sensitivity: 'base' })
                : isSuppliers.find(supplier => supplier.idproveedor === b.idproveedor)?.nombre.localeCompare(isSuppliers.find(supplier => supplier.idproveedor === a.idproveedor)?.nombre,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'Categoría'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? isSupplyCategories.find(category => category.idcategoria === a.idcategoria)?.nombre.localeCompare(isSupplyCategories.find(category => category.idcategoria === b.idcategoria)?.nombre,'es', { sensitivity: 'base' })
                : isSupplyCategories.find(category => category.idcategoria === b.idcategoria)?.nombre.localeCompare(isSupplyCategories.find(category => category.idcategoria === a.idcategoria)?.nombre,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'Tipo'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? isSupplyTypes.find(type => type.idtipo === a.idtipo)?.tipo.localeCompare(isSupplyTypes.find(type => type.idtipo === b.idtipo)?.tipo,'es', { sensitivity: 'base' })
                : isSupplyTypes.find(type => type.idtipo === b.idtipo)?.tipo.localeCompare(isSupplyTypes.find(type => type.idtipo === a.idtipo)?.tipo,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'Cantidad'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? isCountSupplyTypes.find(count => count.idcantidad === a.idcantidad)?.cantidad - isCountSupplyTypes.find(count => count.idcantidad === b.idcantidad)?.cantidad
                : isCountSupplyTypes.find(count => count.idcantidad === b.idcantidad)?.cantidad - isCountSupplyTypes.find(count => count.idcantidad === a.idcantidad)?.cantidad
            }

            return 0
        });
    }, [isSupplies, isDeletedSupplies, isSuppliers, isSupplyTypes, isSupplyCategories, isCountSupplyTypes, isSearchTerm, isSelectedOptionSearch, isSelectedOptionOrderDirection, isSelectedOptionOrder]);
    // Total de registros visibles de la tabla
    const recordsPerPage = 6;
    // Indices de los registros
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // Total de páginas 
    const totalPagesSupplies = Math.ceil(filteredRecordsSupplies.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsSupplies = filteredRecordsSupplies.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (supply) => {
        setIsSelectedRow((prevSelected) => {
            return prevSelected?.idinsumo === supply.idinsumo ? null : supply;
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPageSupplies = () => {
        if (currentPage < totalPagesSupplies) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesSupplies){
            setCurrentPage(1);
        }
    },[isSearchTerm])
    // Retorno de la función del hook
    return { handleRowClick,prevPage,currentPage,nextPageSupplies,currentRecordsSupplies,filteredRecordsSupplies,totalPagesSupplies}
}
// Hook para realizar las acciones de la tabla del total insumos ✔️
export const TableActionsTotalSupplies = () => {
    // Constantes con el valor de los contextos 
    const [isSupplyTypes] = useContext(SupplyTypesContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const [isWarehouseSupplyTypes] = useContext(WarehouseSupplyTypesContext);
    const [isSelectedOptionSearch] = useContext(SelectedOptionSearchContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsTotalSupplies = useMemo(() => {
        const filteredPurchases = isWarehouseSupplyTypes.filter((data) => {
            if(data.transaccion === 'Venta' || data.transaccion === 'Venta-Rapida' || data.transaccion === 'Pedido Cancelado' || data.transaccion === 'Pedido') return false;

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
            if(data.transaccion === 'Compra') return false;

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

        const filtered = resultado.filter((data) => {
            
            if (isSelectedOptionSearch === 'General') {
                return [
                    data.nombre,
                    data.cantidadreal,
                ].some(value =>
                    String(value).toLowerCase().includes(isSearchTerm.toLowerCase())
                );
            }
            if(isSelectedOptionSearch === 'Insumo'){
                return data.nombre.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Cantidad'){
                return String(data.cantidadreal).toLowerCase().includes(isSearchTerm.toLowerCase());
            }
        });

        return [...filtered].sort((a, b) => {
            if(isSelectedOptionOrder === 'Nombre'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.nombre.localeCompare(b.nombre,'es', { sensitivity: 'base' })
                : b.nombre.localeCompare(a.nombre,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'Cantidad'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.cantidadreal - b.cantidadreal
                : b.cantidadreal - a.cantidadreal
            }
            if(isSelectedOptionOrder === 'Cantidad minima'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.limite - b.limite
                : b.limite - a.limite
            }
            
            return 0
        });
    }, [isWarehouseSupplyTypes, isSupplyTypes, isSelectedOptionOrderDirection, isSelectedOptionSearch, isSearchTerm, isSelectedOptionOrder]);
    // Total de registros visibles de la tabla
    const recordsPerPage = 6;
    // Indices de los registros
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // Total de páginas 
    const totalPagesTotalSupplies = Math.ceil(filteredRecordsTotalSupplies.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsTotalSupplies = filteredRecordsTotalSupplies.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (supply) => {
        setIsSelectedRow((prevSelected) => {
            return prevSelected?.idtipo === supply.idtipo ? null : supply;
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPageTotalSupplies = () => {
        if (currentPage < totalPagesTotalSupplies) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesTotalSupplies){
            setCurrentPage(1);
        }
    },[isSearchTerm])
    // Retorno de la función del hook
    return { handleRowClick,prevPage,currentPage,nextPageTotalSupplies,currentRecordsTotalSupplies,filteredRecordsTotalSupplies,totalPagesTotalSupplies}
}