//____________IMPORT/EXPORT____________
// Hooks de React
import { useState,useContext,useEffect,useMemo } from "react";
// Contextos
import { MenuTypesContext,DeletedMenuTypesContext,MenuTypeUbicationsContext } from "../../contexts/MenusProvider";
import { SelectedOptionOrderDirectionContext,SelectedOptionOrderContext } from "../../contexts/SelectedesProvider";
import { SearchTermContext } from "../../contexts/SearchsProvider";
import { SelectedRowContext } from "../../contexts/SelectedesProvider";
import { LoggedTypeContext } from "../../contexts/SessionProvider";
//____________IMPORT/EXPORT____________

// Hook para realizar las acciones de la tabla de tipos de menú ✔️
export const TableActionsMenuTypes = () => {
    // Constantes con el valor de los contextos 
    const [isMenuTypes] = useContext(MenuTypesContext);
    const [isDeletedMenuTypes] = useContext(DeletedMenuTypesContext); 
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isMenuTypeUbications] = useContext(MenuTypeUbicationsContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isLoggedType] = useContext(LoggedTypeContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsMenuTypes = useMemo(() => {
        const filtered = isMenuTypes.filter((data) => {
            const isDeleted = isDeletedMenuTypes.some(type => type.idtipo === data.idtipo);
            if (isDeleted) return false;
            
            if(isLoggedType == 'Nutriólogo'){
                if(isMenuTypeUbications.some(s => s.idubicacion !== 2 && s.idtipo === data.idtipo)) return false
            }

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
    }, [isMenuTypes, isMenuTypeUbications, isDeletedMenuTypes, isSearchTerm, isSelectedOptionOrderDirection, isSelectedOptionOrder]);
    // Total de registros visibles de la tabla
    const recordsPerPage = 6;
    // Indices de los registros
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // Total de páginas 
    const totalPagesMenutypes = Math.ceil(filteredRecordsMenuTypes.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsMenuTypes = filteredRecordsMenuTypes.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (menuType) => {
        setIsSelectedRow((prevSelected) => {
            return prevSelected?.idtipo === menuType.idtipo ? null : menuType;
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPageMenuTypes = () => {
        if (currentPage < totalPagesMenutypes) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesMenutypes){
            setCurrentPage(1);
        }
    },[isSearchTerm])
    // Retorno de la función del hook
    return { handleRowClick,prevPage,currentPage,nextPageMenuTypes,currentRecordsMenuTypes,filteredRecordsMenuTypes,totalPagesMenutypes }
}