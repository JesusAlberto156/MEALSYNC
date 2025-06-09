//____________IMPORT/EXPORT____________
// Hooks de React
import { useState,useContext,useEffect,useMemo } from "react";
// Contextos
import { UsersContext,UserTypesContext,StatusContext,DeletedUsersContext,PermissionsContext } from "../contexts/UsersProvider";
import { SuppliersContext,DeletedSuppliersContext,ObservationsContext } from "../contexts/SuppliersProvider";
import { SuppliesContext,SupplyTypesContext,UnitsContext } from "../contexts/WarehouseProvider";
import { SelectedRowContext,SelectedRow1Context,SelectedRow2Context,SelectedOptionSearchContext,SelectedOptionOrderDirectionContext,SelectedOptionOrderPlusContext,SelectedOptionOrderContext } from "../contexts/SelectedesProvider";
import { SearchTermContext,SearchTerm1Context,SearchTerm2Context } from "../contexts/SearchsProvider";
//____________IMPORT/EXPORT____________

// Hook para realizar las acciones de la tabla de usuarios ✔️
export const TableActionsUsers = () => {
    // Constantes con el valor de los contextos 
    const [isUsers] = useContext(UsersContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isSelectedOptionSearch] = useContext(SelectedOptionSearchContext);
    const [isUserTypes] = useContext(UserTypesContext);
    const [isDeletedUsers] = useContext(DeletedUsersContext);
    const [isSelectedOptionOrderDirection,setIsSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder,setIsSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsUsers = useMemo(() => {
        const filtered = isUsers.filter((data) => {
            const isDeleted = isDeletedUsers.some(user => user.idusuario === data.idusuario);
            if (isDeleted) return false;
            
            if(isSelectedOptionSearch === 'General'){
                const type = isUserTypes.find(type => type.idtipo === data.idtipo );
                return type && Object.values(data).some(value =>
                    String(value).toLowerCase().includes(isSearchTerm.toLowerCase())
                );
            }
            if(isSelectedOptionSearch === 'Nombre'){
                return data.nombre.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Nombre corto'){
                return data.nombrecorto.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Usuario'){
                return data.usuario.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Tipo de usuario'){
                const type = isUserTypes.find(type => type.idtipo === data.idtipo);
                return type && type.tipo.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
        });

        return [...filtered].sort((a, b) => {
            if(isSelectedOptionOrder === 'Nombre'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.nombre.localeCompare(b.nombre,'es', { sensitivity: 'base' })
                : b.nombre.localeCompare(a.nombre,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'Nombre-Corto'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.nombrecorto.localeCompare(b.nombrecorto,'es', { sensitivity: 'base' })
                : b.nombrecorto.localeCompare(a.nombrecorto,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'Usuario'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.usuario.localeCompare(b.usuario,'es', { sensitivity: 'base' })
                : b.usuario.localeCompare(a.usuario,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'Tipo'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? isUserTypes.find(type => type.idtipo === a.idtipo)?.tipo.localeCompare(isUserTypes.find(type => type.idtipo === b.idtipo)?.tipo,'es', { sensitivity: 'base' })
                : isUserTypes.find(type => type.idtipo === b.idtipo)?.tipo.localeCompare(isUserTypes.find(type => type.idtipo === a.idtipo)?.tipo,'es', { sensitivity: 'base' })
            }

            return 0
        });
    }, [isUsers, isDeletedUsers, isUserTypes, isSearchTerm, isSelectedOptionSearch, isSelectedOptionOrderDirection]);
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
    const totalPagesUsers = Math.ceil(filteredRecordsUsers.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsUsers = filteredRecordsUsers.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (user) => {
        setIsSelectedRow((prevSelected) => {
            return prevSelected?.idusuario === user.idusuario ? null : user;
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPageUsers = () => {
        if (currentPage < totalPagesUsers) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesUsers){
            setCurrentPage(1);
        }
    },[isSearchTerm])
    // Retorno de la función del hook
    return { handleRowClick, prevPage, currentPage,
             nextPageUsers,
             currentRecordsUsers,filteredRecordsUsers,ToggleOrder,ToggleOrderDirection,
             totalPagesUsers}
}
// Hook para realizar las acciones de la tabla de permisos ✔️
export const TableActionsPermissions = () => {
    // Constantes con el valor de los contextos 
    const [isUsers] = useContext(UsersContext);
    const [isPermissions] = useContext(PermissionsContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isDeletedUsers] = useContext(DeletedUsersContext);
    const [isSelectedOptionOrderDirection,setIsSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder,setIsSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    // Filtrado de datos
    const filteredRecordsPermissions = useMemo(() => {
        const filtered = isPermissions.filter((data) => {
            const isDeleted = isDeletedUsers.some(user => user.idusuario === data.idusuario);
            if (isDeleted) return false;

            const user = isUsers.find(user => user.idusuario === data.idusuario);
            return user && user.nombre.toLowerCase().includes(isSearchTerm.toLowerCase());
        });

        return [...filtered].sort((a, b) => {
            if(isSelectedOptionOrder === 'Nombre'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? isUsers.find(user => user.idusuario === a.idusuario)?.nombre.localeCompare(isUsers.find(user => user.idusuario === b.idusuario)?.nombre, 'es', { sensitivity: 'base' })
                : isUsers.find(user => user.idusuario === b.idusuario)?.nombre.localeCompare(isUsers.find(user => user.idusuario === a.idusuario)?.nombre, 'es', { sensitivity: 'base' });
            }
            
            if(isSelectedOptionOrder === 'Administrador'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? b.administrador - a.administrador
                : a.administrador - b.administrador
            }

            if(isSelectedOptionOrder === 'Chef'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? b.chef - a.chef
                : a.chef - b.chef
            }

            if(isSelectedOptionOrder === 'Almacenista'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? b.almacenista - a.almacenista
                : a.almacenista - b.almacenista
            }

            if(isSelectedOptionOrder === 'Cocinero'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? b.cocinero - a.cocinero
                : a.cocinero - b.cocinero
            }

            if(isSelectedOptionOrder === 'Nutriologo'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? b.nutriologo - a.nutriologo
                : a.nutriologo - b.nutriologo
            }

            if(isSelectedOptionOrder === 'Medico'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? b.medico - a.medico
                : a.medico - b.medico
            }

            if(isSelectedOptionOrder === 'Super-Administrador'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? b.superadministrador - a.superadministrador
                : a.superadministrador - b.superadministrador
            }

            return 0
        });
    }, [isUsers, isDeletedUsers, isPermissions, isSearchTerm, isSelectedOptionOrderDirection]);
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
    const totalPagesPermissions = Math.ceil(filteredRecordsPermissions.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsPermissions = filteredRecordsPermissions.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (permissions) => {
        setIsSelectedRow((prevSelected) => {
            return prevSelected?.idusuario === permissions.idusuario ? null : permissions
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPagePermissions = () => {
        if (currentPage < totalPagesPermissions) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesPermissions){
            setCurrentPage(1);
        }
    },[isSearchTerm])
    // Retorno de la función del hook
    return { handleRowClick, prevPage, currentPage,
             nextPagePermissions,
             currentRecordsPermissions,ToggleOrderDirection,ToggleOrder,filteredRecordsPermissions,
             totalPagesPermissions }
}
// Hook para realizar las acciones de la tabla de estatus ✔️
export const TableActionsStatus = () => {
    // Constantes con el valor de los contextos
    const [isUsers] = useContext(UsersContext);
    const [isStatus] = useContext(StatusContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isDeletedUsers] = useContext(DeletedUsersContext);
    const [isSelectedOptionOrder,setIsSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const [isSelectedOptionOrderDirection,setIsSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrderPlus] = useContext(SelectedOptionOrderPlusContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsStatus = useMemo(() => {
        const filtered = isStatus.filter((data) => {
            const isDeleted = isDeletedUsers.some(user => user.idusuario === data.idusuario);
            if (isDeleted) return false;

            const user = isUsers.find(user => user.idusuario === data.idusuario);
            return user && user.nombre.toLowerCase().includes(isSearchTerm.toLowerCase());
        });

        return [...filtered].sort((a, b) => {
            if(isSelectedOptionOrderPlus === 'Normal'){
                if(isSelectedOptionOrder === 'Nombre'){
                    return isSelectedOptionOrderDirection === 'Asc'
                    ? isUsers.find(user => user.idusuario === a.idusuario)?.nombre.localeCompare(isUsers.find(user => user.idusuario === b.idusuario)?.nombre, 'es', { sensitivity: 'base' })
                    : isUsers.find(user => user.idusuario === b.idusuario)?.nombre.localeCompare(isUsers.find(user => user.idusuario === a.idusuario)?.nombre, 'es', { sensitivity: 'base' });
                }

                if(isSelectedOptionOrder === 'Habilitado'){
                    return isSelectedOptionOrderDirection === 'Asc'
                    ? b.habilitado - a.habilitado
                    : a.habilitado - b.habilitado
                }
            }

            if(isSelectedOptionOrderPlus === 'Activo'){
                const active = b.activo - a.activo
                
                if(active !== 0)return active

                if(isSelectedOptionOrder === 'Nombre'){
                    return isSelectedOptionOrderDirection === 'Asc'
                    ? isUsers.find(user => user.idusuario === a.idusuario)?.nombre.localeCompare(isUsers.find(user => user.idusuario === b.idusuario)?.nombre, 'es', { sensitivity: 'base' })
                    : isUsers.find(user => user.idusuario === b.idusuario)?.nombre.localeCompare(isUsers.find(user => user.idusuario === a.idusuario)?.nombre, 'es', { sensitivity: 'base' });
                }

                if(isSelectedOptionOrder === 'Habilitado'){
                    return isSelectedOptionOrderDirection === 'Asc'
                    ? b.habilitado - a.habilitado
                    : a.habilitado - b.habilitado
                }
            }

            if(isSelectedOptionOrderPlus === 'Inactivo'){
                const active = a.activo - b.activo
                
                if(active !== 0)return active

                if(isSelectedOptionOrder === 'Nombre'){
                    return isSelectedOptionOrderDirection === 'Asc'
                    ? isUsers.find(user => user.idusuario === a.idusuario)?.nombre.localeCompare(isUsers.find(user => user.idusuario === b.idusuario)?.nombre, 'es', { sensitivity: 'base' })
                    : isUsers.find(user => user.idusuario === b.idusuario)?.nombre.localeCompare(isUsers.find(user => user.idusuario === a.idusuario)?.nombre, 'es', { sensitivity: 'base' });
                }

                if(isSelectedOptionOrder === 'Habilitado'){
                    return isSelectedOptionOrderDirection === 'Asc'
                    ? b.habilitado - a.habilitado
                    : a.habilitado - b.habilitado
                }
            }

            return 0
        });
    }, [isUsers, isDeletedUsers, isStatus, isSearchTerm, isSelectedOptionOrderDirection, isSelectedOptionOrderPlus]);
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
    const totalPagesStatus = Math.ceil(filteredRecordsStatus.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsStatus = filteredRecordsStatus.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (status) => {
        setIsSelectedRow((prevSelected) => {
            return prevSelected?.idusuario === status.idusuario ? null : status
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPageStatus = () => {
        if (currentPage < totalPagesStatus) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesStatus){
            setCurrentPage(1);
        }
    },[isSearchTerm])
    // Retorno de la función del hook
    return { handleRowClick, prevPage, currentPage,
             nextPageStatus,
             currentRecordsStatus,filteredRecordsStatus,ToggleOrderDirection,ToggleOrder,
             totalPagesStatus}
}
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
            
            if(isSelectedOptionSearch === 'General'){
                return [data.nombre, data.rfc, data.domicilio, data.telefono, data.correo].some(value =>
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
    const nextPageUsers = () => {
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
    return { handleRowClick, prevPage, currentPage,
             nextPageUsers,
             currentRecordsSuppliers,filteredRecordsSuppliers,ToggleOrder,ToggleOrderDirection,
             totalPagesSuppliers}
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
    // Funcion para dar formato a la fecha
    function formatoCompletoLegible(fechaInput) {
        const fecha = new Date(fechaInput);

        fecha.setHours(fecha.getHours() + 7);
        
        const opcionesFecha = { day: '2-digit', month: 'long', year: 'numeric' };
        const opcionesHora = { hour: '2-digit', minute: '2-digit', hour12: false };

        const fechaLegible = fecha.toLocaleDateString('es-MX', opcionesFecha);
        const horaLegible = fecha.toLocaleTimeString('es-MX', opcionesHora);

        return `${fechaLegible}, ${horaLegible}`;
    }
    // Filtrado de datos
    const filteredRecordsObservations = useMemo(() => {
        const filtered = isObservations.filter((data) => {
            const isDeleted = isDeletedSuppliers.some(supplier => supplier.idproveedor === data.idproveedor);
            if (isDeleted) return false;
            
            if(isSelectedOptionSearch === 'Proveedor' || isSelectedOptionSearch === 'General'){
                const supplier = isSuppliers.find(type => type.idproveedor === data.idproveedor);
                return supplier && supplier.nombre.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Fecha'){
                const fechaFormateada = formatoCompletoLegible(data.fecha);
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
    const handleRowClick = (supplier) => {
        setIsSelectedRow((prevSelected) => {
            return prevSelected?.idproveedor === supplier.idproveedor ? null : supplier;
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPageUsers = () => {
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
    return { handleRowClick, prevPage, currentPage,
             nextPageUsers,
             currentRecordsObservations,filteredRecordsObservations,ToggleOrder,ToggleOrderDirection,
             totalPagesObservations}
}

// Hook para realizar las acciones de la tabla de insumos
export const TableActionsSupplies = () => {
    // Constantes con el valor de los contextos
    const [isSupplies,setIsSupplies] = useContext(SuppliesContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsSupplies = isSupplies.filter((data) => {
        const supplies = isSupplies.find(supply => supply.idinsumo === data.idinsumo);
        return supplies && supplies.nombre.toLowerCase().includes(isSearchTerm.toLowerCase());
    });
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
            if (prevSelected === supply) {
                // Retrasa el deseleccionado
                setTimeout(() => setIsSelectedRow(null), 700);
                return prevSelected; // mantener el estado actual mientras tanto
            } else {
                // Selección inmediata
                return supply;
            }
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
    return { handleRowClick, prevPage, currentPage,
             nextPageSupplies,
             currentRecordsSupplies,
             totalPagesSupplies}
}
// Hook para realizar las acciones de la tabla de tipos de insumos
export const TableActionsSupplyTypes = () => {
    // Constantes con el valor de los contextos
    const [isSelectedRow1,setIsSelectedRow1] = useContext(SelectedRow1Context);
    const [isSupplyTypes] = useContext(SupplyTypesContext);
    const [isSearchTerm1] = useContext(SearchTerm1Context);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsSupplyTypes = isSupplyTypes.filter((data) => {
        return data.tipo.toLowerCase().includes(isSearchTerm1.toLowerCase());
    });
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
    const handleRowClick = (supplyType) => {
        setIsSelectedRow1((prevSelected) => {
            if (prevSelected === supplyType) {
                // Retrasa el deseleccionado
                setTimeout(() => setIsSelectedRow1(null), 700);
                return prevSelected; // mantener el estado actual mientras tanto
            } else {
                // Selección inmediata
                return supplyType;
            }
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
    },[isSearchTerm1])
    // Retorno de la función del hook
    return { handleRowClick, prevPage, currentPage,
             nextPageSupplyTypes,
             currentRecordsSupplyTypes,
             totalPagesSupplyTypes}
}
// Hook para realizar las acciones de la tabla de mediciones
export const TableActionsUnits = () => {
    // Constantes con el valor de los contextos
    const [isSelectedRow2,setIsSelectedRow2] = useContext(SelectedRow2Context);
    const [isUnits] = useContext(UnitsContext);
    const [isSearchTerm2] = useContext(SearchTerm2Context);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsUnits = isUnits.filter((data) => {
        return data.nombre.toLowerCase().includes(isSearchTerm2.toLowerCase());
    });
    // Total de registros visibles de la tabla
    const recordsPerPage = 8;
    // Indices de los registros
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // Total de páginas
    const totalPagesUnits = Math.ceil(filteredRecordsUnits.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsUnits = filteredRecordsUnits.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (unit) => {
        setIsSelectedRow2((prevSelected) => {
            if (prevSelected === unit) {
                // Retrasa el deseleccionado
                setTimeout(() => setIsSelectedRow2(null), 700);
                return prevSelected; // mantener el estado actual mientras tanto
            } else {
                // Selección inmediata
                return unit;
            }
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPageUnits = () => {
        if (currentPage < totalPagesUnits) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesUnits){
            setCurrentPage(1);
        }
    },[isSearchTerm2])
    // Retorno de la función del hook
    return { handleRowClick, prevPage, currentPage,
             nextPageUnits,
             currentRecordsUnits,
             totalPagesUnits}
}