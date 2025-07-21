//____________IMPORT/EXPORT____________
// Hooks de React
import { useState,useContext,useEffect,useMemo } from "react";
// Contextos
import { UsersContext,UserTypesContext,StatusContext,DeletedUsersContext,PermissionsContext } from "../../contexts/UsersProvider";
import { SelectedRowContext,SelectedOptionSearchContext,SelectedOptionOrderDirectionContext,SelectedOptionOrderPlusContext,SelectedOptionOrderContext } from "../../contexts/SelectedesProvider";
import { SearchTermContext } from "../../contexts/SearchsProvider";
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
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsUsers = useMemo(() => {
        const filtered = isUsers.filter((data) => {
            const isDeleted = isDeletedUsers.some(user => user.idusuario === data.idusuario);
            if (isDeleted) return false;
            
            if (isSelectedOptionSearch === 'General') {
                const type = isUserTypes.find(type => type.idtipo === data.idtipo)?.tipo;
                return [
                    data.nombre,
                    data.nombrecorto,
                    data.usuario,
                    type
                ].some(value =>
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
                const type = isUserTypes.find(type => type.idtipo === data.idtipo)?.tipo;
                return type?.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
        });

        return [...filtered].sort((a, b) => {
            if(isSelectedOptionOrder === 'Nombre'){
                return isSelectedOptionOrderDirection === 'Asc'
                ? a.nombre.localeCompare(b.nombre,'es', { sensitivity: 'base' })
                : b.nombre.localeCompare(a.nombre,'es', { sensitivity: 'base' })
            }
            if(isSelectedOptionOrder === 'Nombre corto'){
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
    }, [isUsers, isDeletedUsers, isUserTypes, isSearchTerm, isSelectedOptionSearch, isSelectedOptionOrderDirection, isSelectedOptionOrder]);
    // Total de registros visibles de la tabla
    const recordsPerPage = 6;
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
    return { handleRowClick,prevPage,currentPage,nextPageUsers,currentRecordsUsers,filteredRecordsUsers,totalPagesUsers }
}
// Hook para realizar las acciones de la tabla de permisos ✔️
export const TableActionsPermissions = () => {
    // Constantes con el valor de los contextos 
    const [isUsers] = useContext(UsersContext);
    const [isPermissions] = useContext(PermissionsContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isDeletedUsers] = useContext(DeletedUsersContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsPermissions = useMemo(() => {
        const filtered = isPermissions.filter((data) => {
            const isDeleted = isDeletedUsers.some(user => user.idusuario === data.idusuario);
            if (isDeleted) return false;

            const user = isUsers.find(user => user.idusuario === data.idusuario)?.nombre;
            return user?.toLowerCase().includes(isSearchTerm.toLowerCase());
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
    }, [isUsers, isDeletedUsers, isPermissions, isSearchTerm, isSelectedOptionOrderDirection, isSelectedOptionOrder]);
    // Total de registros visibles de la tabla
    const recordsPerPage = 6;
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
            return prevSelected?.idpermiso === permissions.idpermiso ? null : permissions
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
    return { handleRowClick,prevPage,currentPage,nextPagePermissions,currentRecordsPermissions,filteredRecordsPermissions,totalPagesPermissions }
}
// Hook para realizar las acciones de la tabla de estatus ✔️
export const TableActionsStatus = () => {
    // Constantes con el valor de los contextos
    const [isUsers] = useContext(UsersContext);
    const [isStatus] = useContext(StatusContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSelectedOptionSearch] = useContext(SelectedOptionSearchContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isDeletedUsers] = useContext(DeletedUsersContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrderPlus] = useContext(SelectedOptionOrderPlusContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsStatus = useMemo(() => {
        const filtered = isStatus.filter((data) => {
            const isDeleted = isDeletedUsers.some(user => user.idusuario === data.idusuario);
            if (isDeleted) return false;

            const name = isUsers.find(user => user.idusuario === data.idusuario)?.nombre;
            const user = isUsers.find(user => user.idusuario === data.idusuario)?.usuario;

            if (isSelectedOptionSearch === 'General') {
                
                return [
                    user,
                    name,
                ].some(value =>
                    String(value).toLowerCase().includes(isSearchTerm.toLowerCase())
                );
            }
            if(isSelectedOptionSearch === 'Nombre'){
                return name?.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Usuario'){
                return user?.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
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
    }, [isUsers, isDeletedUsers, isStatus, isSearchTerm, isSelectedOptionOrderDirection, isSelectedOptionOrderPlus, isSelectedOptionOrder, isSelectedOptionSearch]);
    // Total de registros visibles de la tabla
    const recordsPerPage = 6;
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
            return prevSelected?.idestatus === status.idestatus ? null : status
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
    return { handleRowClick,prevPage,currentPage,nextPageStatus,currentRecordsStatus,filteredRecordsStatus,totalPagesStatus }
}