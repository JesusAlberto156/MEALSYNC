//____________IMPORT/EXPORT____________
// Hooks de React
import { useState,useContext,useEffect,useMemo } from "react";
// Contextos
import { SuppliersContext } from "../../contexts/SuppliersProvider";
import { CleaningCategoriesContext,DeletedCleaningCategoriesContext,CleaningTypesContext,DeletedCleaningTypesContext,CountCleaningTypesContext,FixedExpensesContext,DeletedFixedExpensesContext,CleaningSuppliesContext,DeletedCleaningSuppliesContext } from "../../contexts/ExtrasProvider";
import { SelectedRowContext,SelectedOptionSearchContext,SelectedOptionOrderDirectionContext,SelectedOptionOrderContext } from "../../contexts/SelectedesProvider";
import { SearchTermContext } from "../../contexts/SearchsProvider";
import { WarehouseCleaningTypesContext } from "../../contexts/WarehouseProvider";
//____________IMPORT/EXPORT____________

// Hook para realizar las acciones de la tabla de categorias de limpieza ✔️
export const TableActionsCleaningCategories = () => {
    // Constantes con el valor de los contextos 
    const [isCleaningCategories] = useContext(CleaningCategoriesContext);
    const [isDeletedCleaningCategories] = useContext(DeletedCleaningCategoriesContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isSelectedOptionSearch] = useContext(SelectedOptionSearchContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsCleaningCategories = useMemo(() => {
        const filtered = isCleaningCategories.filter((data) => {
            const isDeleted = isDeletedCleaningCategories.some(category => category.idcategoria === data.idcategoria);
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
    }, [isCleaningCategories, isDeletedCleaningCategories, isSearchTerm, isSelectedOptionSearch, isSelectedOptionOrderDirection, isSelectedOptionOrder]);
    // Total de registros visibles de la tabla
    const recordsPerPage = 6;
    // Indices de los registros
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // Total de páginas 
    const totalPagesCleaningCategories = Math.ceil(filteredRecordsCleaningCategories.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsCleaningCategories = filteredRecordsCleaningCategories.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (category) => {
        setIsSelectedRow((prevSelected) => {
            return prevSelected?.idcategoria === category.idcategoria ? null : category;
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPageCleaningCategories = () => {
        if (currentPage < totalPagesCleaningCategories) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesCleaningCategories){
            setCurrentPage(1);
        }
    },[isSearchTerm])
    // Retorno de la función del hook
    return { handleRowClick,prevPage,currentPage,nextPageCleaningCategories,currentRecordsCleaningCategories,filteredRecordsCleaningCategories,totalPagesCleaningCategories}
}
// Hook para realizar las acciones de la tabla de tipos de limpieza ✔️
export const TableActionsCleaningTypes = () => {
    // Constantes con el valor de los contextos 
    const [isCleaningTypes] = useContext(CleaningTypesContext);
    const [isDeletedCleaningTypes] = useContext(DeletedCleaningTypesContext);
    const [isCleaningCategories] = useContext(CleaningCategoriesContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isSelectedOptionSearch] = useContext(SelectedOptionSearchContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsCleaningTypes = useMemo(() => {
        const filtered = isCleaningTypes.filter((data) => {
            const isDeleted = isDeletedCleaningTypes.some(type => type.idtipo === data.idtipo);
            if (isDeleted) return false;
            
            if (isSelectedOptionSearch === 'General') {
                const category = isCleaningCategories.find(category => category.idcategoria === data.idcategoria)?.nombre;
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
                const category = isCleaningCategories.find(category => category.idcategoria === data.idcategoria)?.nombre;
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
                ? isCleaningCategories.find(category => category.idcategoria === a.idcategoria)?.nombre.localeCompare(isCleaningCategories.find(category => category.idcategoria === b.idcategoria)?.nombre,'es', { sensitivity: 'base' })
                : isCleaningCategories.find(category => category.idcategoria === b.idcategoria)?.nombre.localeCompare(isCleaningCategories.find(category => category.idcategoria === a.idcategoria)?.nombre,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'Cantidad Mínima'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.limite - b.limite
                : b.limite - a.limite
            }

            return 0
        });
    }, [isCleaningTypes, isDeletedCleaningTypes, isCleaningCategories, isSearchTerm, isSelectedOptionSearch, isSelectedOptionOrderDirection, isSelectedOptionOrder]);
    // Total de registros visibles de la tabla
    const recordsPerPage = 6;
    // Indices de los registros
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // Total de páginas 
    const totalPagesCleaningTypes = Math.ceil(filteredRecordsCleaningTypes.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsCleaningTypes = filteredRecordsCleaningTypes.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (type) => {
        setIsSelectedRow((prevSelected) => {
            return prevSelected?.idtipo === type.idtipo ? null : type;
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPageCleaningTypes = () => {
        if (currentPage < totalPagesCleaningTypes) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesCleaningTypes){
            setCurrentPage(1);
        }
    },[isSearchTerm])
    // Retorno de la función del hook
    return { handleRowClick,prevPage,currentPage,nextPageCleaningTypes,currentRecordsCleaningTypes,filteredRecordsCleaningTypes,totalPagesCleaningTypes}
}
// Hook para realizar las acciones de la tabla de suministros de limpieza ✔️
export const TableActionsCleaningSupplies = () => {
    // Constantes con el valor de los contextos 
    const [isCleaningSupplies] = useContext(CleaningSuppliesContext);
    const [isDeletedCleaningSupplies] = useContext(DeletedCleaningSuppliesContext);
    const [isCleaningCategories] = useContext(CleaningCategoriesContext);
    const [isCountCleaningTypes] = useContext(CountCleaningTypesContext);
    const [isSuppliers] = useContext(SuppliersContext);
    const [isCleaningTypes] = useContext(CleaningTypesContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isSelectedOptionSearch] = useContext(SelectedOptionSearchContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsCleaningSupplies = useMemo(() => {
        const filtered = isCleaningSupplies.filter((data) => {
            const isDeleted = isDeletedCleaningSupplies.some(supply => supply.idsuministro === data.idsuministro);
            if (isDeleted) return false;
            
            if (isSelectedOptionSearch === 'General') {
                const category = isCleaningCategories.find(category => category.idcategoria === data.idcategoria)?.nombre;
                const count = isCountCleaningTypes.find(count => count.idcantidad === data.idcantidad)?.cantidad;
                const supplier = isSuppliers.find(supplier => supplier.idproveedor === data.idproveedor)?.nombre;
                return [
                    category,
                    data.nombre,
                    data.codigo,
                    count,
                    supplier,
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
                return supplier.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Categoría'){
                const category = isCleaningCategories.find(category => category.idcategoria === data.idcategoria)?.nombre;
                return category?.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Tipo'){
                const type = isCleaningTypes.find(type => type.idtipo === data.idtipo)?.tipo;
                return type?.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Cantidad'){
                const count = isCountCleaningTypes.find(count => count.idcantidad === data.idcantidad)?.cantidad;
                return String(count).toLowerCase().includes(isSearchTerm.toLowerCase());
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
                ? a.nombre.localeCompare(b.nombre,'es', { sensitivity: 'base' })
                : b.nombre.localeCompare(a.nombre,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'Proveedor'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? isSuppliers.find(supplier => supplier.idproveedor === a.idproveedor)?.nombre.localeCompare(isSuppliers.find(supplier => supplier.idproveedor === b.idproveedor)?.nombre,'es', { sensitivity: 'base' })
                : isSuppliers.find(supplier => supplier.idproveedor === b.idproveedor)?.nombre.localeCompare(isSuppliers.find(supplier => supplier.idproveedor === a.idproveedor)?.nombre,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'Categoría'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? isCleaningCategories.find(category => category.idcategoria === a.idcategoria)?.nombre.localeCompare(isCleaningCategories.find(category => category.idcategoria === b.idcategoria)?.nombre,'es', { sensitivity: 'base' })
                : isCleaningCategories.find(category => category.idcategoria === b.idcategoria)?.nombre.localeCompare(isCleaningCategories.find(category => category.idcategoria === a.idcategoria)?.nombre,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'Tipo'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? isCleaningTypes.find(type => type.idtipo === a.idtipo)?.tipo.localeCompare(isCleaningTypes.find(type => type.idtipo === b.idtipo)?.tipo,'es', { sensitivity: 'base' })
                : isCleaningTypes.find(type => type.idtipo === b.idtipo)?.tipo.localeCompare(isCleaningTypes.find(type => type.idtipo === a.idtipo)?.tipo,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'Cantidad'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? isCountCleaningTypes.find(count => count.idcantidad === a.idcantidad)?.cantidad - isCountCleaningTypes.find(count => count.idcantidad === b.idcantidad)?.cantidad
                : isCountCleaningTypes.find(count => count.idcantidad === b.idcantidad)?.cantidad - isCountCleaningTypes.find(count => count.idcantidad === a.idcantidad)?.cantidad
            }

            return 0
        });
    }, [isCleaningSupplies, isDeletedCleaningSupplies, isCleaningCategories, isCountCleaningTypes, isCleaningTypes, isSuppliers, isSearchTerm, isSelectedOptionSearch, isSelectedOptionOrderDirection, isSelectedOptionOrder]);
    // Total de registros visibles de la tabla
    const recordsPerPage = 6;
    // Indices de los registros
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // Total de páginas 
    const totalPagesCleaningSupplies = Math.ceil(filteredRecordsCleaningSupplies.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsCleaningSupplies = filteredRecordsCleaningSupplies.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (supply) => {
        setIsSelectedRow((prevSelected) => {
            return prevSelected?.idsuministro === supply.idsuministro ? null : supply;
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPageCleaningSupplies = () => {
        if (currentPage < totalPagesCleaningSupplies) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesCleaningSupplies){
            setCurrentPage(1);
        }
    },[isSearchTerm])
    // Retorno de la función del hook
    return { handleRowClick,prevPage,currentPage,nextPageCleaningSupplies,currentRecordsCleaningSupplies,filteredRecordsCleaningSupplies,totalPagesCleaningSupplies}
}
// Hook para realizar las acciones de la tabla de gastos fijos ✔️
export const TableActionsFixedExpenses = () => {
    // Constantes con el valor de los contextos 
    const [isFixedExpenses] = useContext(FixedExpensesContext);
    const [isDeletedFixedExpenses] = useContext(DeletedFixedExpensesContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isSelectedOptionSearch] = useContext(SelectedOptionSearchContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsFixedExpenses = useMemo(() => {
        const filtered = isFixedExpenses.filter((data) => {
            const isDeleted = isDeletedFixedExpenses.some(expense => expense.idgasto === data.idgasto);
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
    }, [isFixedExpenses, isDeletedFixedExpenses, isSearchTerm, isSelectedOptionSearch, isSelectedOptionOrderDirection, isSelectedOptionOrder]);
    // Total de registros visibles de la tabla
    const recordsPerPage = 6;
    // Indices de los registros
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // Total de páginas 
    const totalPagesFixedExpenses = Math.ceil(filteredRecordsFixedExpenses.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsFixedExpenses = filteredRecordsFixedExpenses.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (expense) => {
        setIsSelectedRow((prevSelected) => {
            return prevSelected?.idgasto === expense.idgasto ? null : expense;
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPageFixedExpenses = () => {
        if (currentPage < totalPagesFixedExpenses) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesFixedExpenses){
            setCurrentPage(1);
        }
    },[isSearchTerm])
    // Retorno de la función del hook
    return { handleRowClick,prevPage,currentPage,nextPageFixedExpenses,currentRecordsFixedExpenses,filteredRecordsFixedExpenses,totalPagesFixedExpenses}
}
// Hook para realizar las acciones de la tabla del total suministros ✔️
export const TableActionsTotalCleaningSupplies = () => {
    // Constantes con el valor de los contextos 
    const [isCleaningTypes] = useContext(CleaningTypesContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const [isWarehouseCleaningTypes] = useContext(WarehouseCleaningTypesContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsTotalCleaningSupplies = useMemo(() => {
        const filteredPurchases = isWarehouseCleaningTypes.filter((data) => {
            if(data.transaccion === 'Consumo') return false;

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
        const filteredSales = isWarehouseCleaningTypes.filter((data) => {
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

            const supplyData = isCleaningTypes.find(s => s.idtipo === idtipo);
            resultado.push({
                idtipo,
                nombre: supplyData?.tipo || '',
                cantidadreal: cantidadFinal,
                limite: supplyData?.limite || 0,
                unidad: supplyData?.unidad || '',
            });
        });

        return [...resultado].sort((a, b) => {
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
    }, [isWarehouseCleaningTypes, isCleaningTypes, isSelectedOptionOrderDirection, isSelectedOptionOrder]);
    // Total de registros visibles de la tabla
    const recordsPerPage = 6;
    // Indices de los registros
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // Total de páginas 
    const totalPagesTotalCleaningSupplies = Math.ceil(filteredRecordsTotalCleaningSupplies.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsTotalCleaningSupplies = filteredRecordsTotalCleaningSupplies.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (supply) => {
        setIsSelectedRow((prevSelected) => {
            return prevSelected?.idtipo === supply.idtipo ? null : supply;
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPageTotalCleaningSupplies = () => {
        if (currentPage < totalPagesTotalCleaningSupplies) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesTotalCleaningSupplies){
            setCurrentPage(1);
        }
    },[isSearchTerm])
    // Retorno de la función del hook
    return { handleRowClick,prevPage,currentPage,nextPageTotalCleaningSupplies,currentRecordsTotalCleaningSupplies,filteredRecordsTotalCleaningSupplies,totalPagesTotalCleaningSupplies}
}