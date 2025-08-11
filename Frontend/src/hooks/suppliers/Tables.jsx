//____________IMPORT/EXPORT____________
// Hooks de React
import { useState,useContext,useEffect,useMemo } from "react";
// Contextos
import { SuppliersContext,DeletedSuppliersContext,ObservationsContext } from "../../contexts/SuppliersProvider";
import { SelectedRowContext,SelectedOptionSearchContext,SelectedOptionOrderDirectionContext,SelectedOptionOrderContext } from "../../contexts/SelectedesProvider";
import { SearchTermContext } from "../../contexts/SearchsProvider";
import { TextFieldsSearchDateContext } from "../../contexts/FormsProvider";
import { OrdersContext } from "../../contexts/WarehouseProvider";
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
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
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
    }, [isSuppliers, isDeletedSuppliers, isSearchTerm, isSelectedOptionSearch, isSelectedOptionOrderDirection, isSelectedOptionOrder]);
    // Total de registros visibles de la tabla
    const recordsPerPage = 6;
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
    return { handleRowClick,prevPage,currentPage,nextPageSuppliers,currentRecordsSuppliers,filteredRecordsSuppliers,totalPagesSuppliers}
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
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
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
                    data.idpedido
                ].some(value =>
                    String(value).toLowerCase().includes(isSearchTerm.toLowerCase())
                );
            }
            if(isSelectedOptionSearch === 'Proveedor'){
                const supplier = isSuppliers.find(type => type.idproveedor === data.idproveedor)?.nombre;
                return supplier?.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Fecha'){
                const fechaFormateada = getDate(data.fecha);
                return fechaFormateada.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Calificación'){
                return String(data.calificacion).toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'ID Pedido'){
                return String(data.idpedido).toLowerCase().includes(isSearchTerm.toLowerCase());
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
            if(isSelectedOptionOrder === 'ID Pedido'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.idpedido - b.idpedido
                : b.idpedido - a.idpedido
            }

            return 0
        });
    }, [isObservations,isSuppliers, isDeletedSuppliers, isSearchTerm, isSelectedOptionSearch, isSelectedOptionOrderDirection, isSelectedOptionOrder]);
    // Total de registros visibles de la tabla
    const recordsPerPage = 6;
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
    return { handleRowClick,prevPage,currentPage,nextPageObservations,currentRecordsObservations,filteredRecordsObservations,totalPagesObservations}
}
// Hook para realizar las acciones de la tabla de compras de proveedores ✔️
export const TableActionsPurchases = () => {
    // Constantes con el valor de los contextos 
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext); 
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const [isTextFieldsSearchDate] = useContext(TextFieldsSearchDateContext); 
    const [isOrders] = useContext(OrdersContext);
    const [isSuppliers] = useContext(SuppliersContext);
    const [isDeletedSuppliers] = useContext(DeletedSuppliersContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsPurchases = useMemo(() => {
        const filtered = isOrders.filter((data) => {
            if(data.estado !== 'Finalizado') return false;

            const date = new Date(data.fecha);
            const year = date.getFullYear();
            const month = date.getMonth()+1;

            return year === isTextFieldsSearchDate?.año && month === isTextFieldsSearchDate?.mes;
        });

        const totals = filtered.reduce((index,item) => {
            const exist = index.find(type => type.idproveedor === item.idproveedor);
            if(exist){
                exist.precio += item.precio;
            }else{
                index.push({...item});
            }
            return index;
        },[]);

        // Agregar proveedores que solo aparecen en la tabla de proveedores que no han sido eliminados
        const filteredSuppliers = isSuppliers.filter((data) => {
            const isDeleted = isDeletedSuppliers.some(supplier => supplier.idproveedor === data.idproveedor);
            if (isDeleted) return false;

            return true;
        })

        const resultadoPorProveedor = filteredSuppliers.map(supplier => {
            const compra = totals.find(pedido => pedido.idproveedor === supplier.idproveedor);
            return {
                idproveedor: supplier.idproveedor,
                nombre: supplier.nombre,
                precio: compra ? compra.precio : 0
            };
        });

        return [...resultadoPorProveedor].sort((a, b) => {
            if(isSelectedOptionOrder === 'Nombre'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.nombre.localeCompare(b.nombre,'es', { sensitivity: 'base' })
                : b.nombre.localeCompare(a.nombre,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'Compras'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.precio - b.precio
                : b.precio - a.precio
            }

            return 0
        });
    }, [isOrders, isSuppliers, isDeletedSuppliers, isSelectedOptionOrder, isSelectedOptionOrderDirection, isTextFieldsSearchDate]);
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
            return prevSelected?.idproveedor === purchase.idproveedor ? null : purchase;
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