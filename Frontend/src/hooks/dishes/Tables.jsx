//____________IMPORT/EXPORT____________
// Hooks de React
import { useState,useContext,useEffect,useMemo } from "react";
// Contextos
import { SuppliersContext } from "../../contexts/SuppliersProvider";
import { SupplyTypesContext,DeletedSupplyTypesContext,SupplyCategoriesContext,DeletedSupplyCategoriesContext,SuppliesContext,DeletedSuppliesContext,CountSupplyTypesContext } from "../../contexts/SuppliesProvider";
import { SelectedRowContext,SelectedOptionSearchContext,SelectedOptionOrderDirectionContext,SelectedOptionOrderContext } from "../../contexts/SelectedesProvider";
import { SearchTermContext } from "../../contexts/SearchsProvider";
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
    const filteredRecordsDishes = useMemo(() => {
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