//____________IMPORT/EXPORT____________
// Hooks de React
import { useState,useContext,useEffect,useMemo } from "react";
// Contextos
import { SuppliersContext,DeletedSuppliersContext,ObservationsContext,SupplyTypesContext,DeletedSupplyTypesContext,SupplyCategoriesContext,DeletedSupplyCategoriesContext,SuppliesContext,DeletedSuppliesContext,CountSupplyTypesContext } from "../../contexts/SuppliersProvider";
import { SelectedRowContext,SelectedOptionSearchContext,SelectedOptionOrderDirectionContext,SelectedOptionOrderContext } from "../../contexts/SelectedesProvider";
import { SearchTermContext } from "../../contexts/SearchsProvider";
// Hooks personalizados
import { Dates } from "../Dates";
//____________IMPORT/EXPORT____________

// Hook para realizar las acciones de la tabla de proveedores ✔️
export const TableActionsSuppliers = () => {
    // Constantes con el valor de los contextos 
    const [isSuppliers] = useContext(SuppliersContext);
    const [isDeletedSuppliers] = useContext(DeletedSuppliersContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isSelectedOptionSearch] = useContext(SelectedOptionSearchContext);
    const [isSelectedOptionOrderDirection,setIsSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder,setIsSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsSuppliers = useMemo(() => {
        const filtered = isSuppliers.filter((data) => {
            const isDeleted = isDeletedSuppliers.some(supplier => supplier.idproveedor === data.idproveedor);
            if (isDeleted) return false;
            
            if (isSelectedOptionSearch === 'General') {
                return [
                    data.nombre,
                    data.rfc,
                    data.domiclio,
                    data.telefono,
                    data.correo,
                ].some(value =>
                    String(value).toLowerCase().includes(isSearchTerm.toLowerCase())
                );
            }
            if(isSelectedOptionSearch === 'Nombre'){
                return data.nombre.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'RFC'){
                return data.rfc.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Domicilio'){
                return data.domicilio.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Teléfono'){
                return data.telefono.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Correo'){
                return data.correo.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
        });
        return [...filtered].sort((a, b) => {
            if(isSelectedOptionOrder === 'Nombre'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.nombre.localeCompare(b.nombre,'es', { sensitivity: 'base' })
                : b.nombre.localeCompare(a.nombre,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'RFC'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.rfc.localeCompare(b.rfc,'es', { sensitivity: 'base' })
                : b.rfc.localeCompare(a.rfc,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'Domicilio'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.domicilio.localeCompare(b.domicilio,'es', { sensitivity: 'base' })
                : b.domicilio.localeCompare(a.domicilio,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'Teléfono'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? Number(a.telefono) - Number(b.telefono)
                : Number(b.telefono) - Number(a.telefono)
            }
            if(isSelectedOptionOrder === 'Correo'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.correo.localeCompare(b.correo,'es', { sensitivity: 'base' })
                : b.correo.localeCompare(a.correo,'es', { sensitivity: 'base' })
            }

            return 0
        });
    }, [isSuppliers, isDeletedSuppliers, isSearchTerm, isSelectedOptionSearch, isSelectedOptionOrderDirection]);
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
    const totalPagesSuppliers = Math.ceil(filteredRecordsSuppliers.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsSuppliers = filteredRecordsSuppliers.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (supplier) => {
        setIsSelectedRow((prevSelected) => {
            return prevSelected?.idproveedor === supplier.idproveedor ? null : supplier;
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPageSuppliers = () => {
        if (currentPage < totalPagesSuppliers) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesSuppliers){
            setCurrentPage(1);
        }
    },[isSearchTerm])
    // Retorno de la función del hook
    return { handleRowClick,prevPage,currentPage,nextPageSuppliers,currentRecordsSuppliers,filteredRecordsSuppliers,ToggleOrder,ToggleOrderDirection,totalPagesSuppliers}
}
// Hook para realizar las acciones de la tabla de las observaciones a proveedor ✔️
export const TableActionsObservations = () => {
    // Constantes con el valor de los contextos 
    const [isObservations] = useContext(ObservationsContext);
    const [isSuppliers] = useContext(SuppliersContext);
    const [isDeletedSuppliers] = useContext(DeletedSuppliersContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isSelectedOptionSearch] = useContext(SelectedOptionSearchContext);
    const [isSelectedOptionOrderDirection,setIsSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder,setIsSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Constantes con la funcion del hook
    const { getDate } = Dates();
    // Filtrado de datos
    const filteredRecordsObservations = useMemo(() => {
        const filtered = isObservations.filter((data) => {
            const isDeleted = isDeletedSuppliers.some(supplier => supplier.idproveedor === data.idproveedor);
            if (isDeleted) return false;
            
            if (isSelectedOptionSearch === 'General') {
                const supplier = isSuppliers.find(type => type.idproveedor === data.idproveedor)?.nombre;
                const fechaFormateada = getDate(data.fecha);
                return [
                    supplier,
                    fechaFormateada,
                    data.calificacion,
                ].some(value =>
                    String(value).toLowerCase().includes(isSearchTerm.toLowerCase())
                );
            }
            if(isSelectedOptionSearch === 'Proveedor'){
                const supplier = isSuppliers.find(type => type.idproveedor === data.idproveedor);
                return supplier.nombre.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Fecha'){
                const fechaFormateada = getDate(data.fecha);
                return fechaFormateada.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Calificación'){
                return String(data.calificacion).toLowerCase().includes(isSearchTerm.toLowerCase());
            }
        });
        return [...filtered].sort((a, b) => {
            if(isSelectedOptionOrder === 'Proveedor'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? isSuppliers.find(supplier => supplier.idproveedor === a.idproveedor)?.nombre.localeCompare(isSuppliers.find(supplier => supplier.idproveedor === b.idproveedor)?.nombre,'es', { sensitivity: 'base' })
                : isSuppliers.find(supplier => supplier.idproveedor === b.idproveedor)?.nombre.localeCompare(isSuppliers.find(supplier => supplier.idproveedor === a.idproveedor)?.nombre,'es', { sensitivity: 'base' })
            
            }
            if(isSelectedOptionOrder === 'Fecha'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? new Date(a.fecha) - new Date(b.fecha)
                : new Date(b.fecha) - new Date(a.fecha) 
            }
            if(isSelectedOptionOrder === 'Calificación'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.calificacion - b.calificacion
                : b.calificacion - a.calificacion
            }

            return 0
        });
    }, [isObservations,isSuppliers, isDeletedSuppliers, isSearchTerm, isSelectedOptionSearch, isSelectedOptionOrderDirection]);
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
    const totalPagesObservations = Math.ceil(filteredRecordsObservations.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsObservations = filteredRecordsObservations.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (observation) => {
        setIsSelectedRow((prevSelected) => {
            return prevSelected?.idobservacion === observation.idobservacion ? null : observation;
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPageObservations = () => {
        if (currentPage < totalPagesObservations) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesObservations){
            setCurrentPage(1);
        }
    },[isSearchTerm])
    // Retorno de la función del hook
    return { handleRowClick,prevPage,currentPage,nextPageObservations,currentRecordsObservations,filteredRecordsObservations,ToggleOrder,ToggleOrderDirection,totalPagesObservations}
}
// Hook para realizar las acciones de la tabla de categorias por insumos ✔️
export const TableActionsSupplyCategories = () => {
    // Constantes con el valor de los contextos 
    const [isSupplyCategories] = useContext(SupplyCategoriesContext);
    const [isDeletedSupplyCategories] = useContext(DeletedSupplyCategoriesContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isSelectedOptionOrderDirection,setIsSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder,setIsSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
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
    }, [isSupplyCategories, isDeletedSupplyCategories, isSearchTerm, isSelectedOptionOrderDirection]);
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
    return { handleRowClick,prevPage,currentPage,nextPageSupplyCategories,currentRecordsSupplyCategories,filteredRecordsSupplyCategories,ToggleOrder,ToggleOrderDirection,totalPagesSupplyCategories}
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
    const [isSelectedOptionOrderDirection,setIsSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder,setIsSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
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
            if(isSelectedOptionSearch === 'Tipo'){
                return data.tipo.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Unidad'){
                return data.unidad.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Categoría'){
                const category = isSupplyCategories.find(category => category.idcategoria === data.idcategoria);
                return category.nombre.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Cantidad Mínima'){
                return String(data.limite).toLowerCase().includes(isSearchTerm.toLowerCase());
            }
        });
        return [...filtered].sort((a, b) => {
            if(isSelectedOptionOrder === 'Tipo'){
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
    }, [isSupplyTypes, isDeletedSupplyTypes, isSupplyCategories, isSearchTerm, isSelectedOptionSearch, isSelectedOptionOrderDirection]);
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
    return { handleRowClick,prevPage,currentPage,nextPageSupplyTypes,currentRecordsSupplyTypes,filteredRecordsSupplyTypes,ToggleOrder,ToggleOrderDirection,totalPagesSupplyTypes}
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
    const [isSelectedOptionOrderDirection,setIsSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder,setIsSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const [isCountSupplyTypes] = useContext(CountSupplyTypesContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsSupplies = useMemo(() => {
        const filtered = isSupplies.filter((data) => {
            const isDeleted = isDeletedSupplies.some(type => type.idtipo === data.idtipo);
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
                    count
                ].some(value =>
                    String(value).toLowerCase().includes(isSearchTerm.toLowerCase())
                );
            }
            if(isSelectedOptionSearch === 'Nombre'){
                return data.nombre.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Proveedor'){
                const supplier = isSuppliers.find(supplier => supplier.idproveedor === data.idproveedor);
                return supplier.nombre.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Categoría'){
                const category = isSupplyCategories.find(category => category.idcategoria === data.idcategoria);
                return category.nombre.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Tipo'){
                const type = isSupplyTypes.find(type => type.idtipo === data.idtipo);
                return type.tipo.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Cantidad'){
                const count = isCountSupplyTypes.find(count => count.idcantidad === data.idcantidad);
                return String(count.cantidad).toLowerCase().includes(isSearchTerm.toLowerCase());
            }
        });
        return [...filtered].sort((a, b) => {
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
    }, [isSupplies, isDeletedSupplies, isSuppliers, isSupplyTypes, isSupplyCategories, isCountSupplyTypes, isSearchTerm, isSelectedOptionOrderDirection]);
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
    return { handleRowClick,prevPage,currentPage,nextPageSupplies,currentRecordsSupplies,filteredRecordsSupplies,ToggleOrder,ToggleOrderDirection,totalPagesSupplies}
}