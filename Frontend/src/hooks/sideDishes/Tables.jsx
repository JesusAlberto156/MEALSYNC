//____________IMPORT/EXPORT____________
// Hooks de React
import { useState,useContext,useEffect,useMemo } from "react";
// Contextos
import { DeletedSideDishesContext,SideDishesContext,MenuTypeSideDishesContext,SideDishSpecificationsContext } from "../../contexts/SideDishesProvider";
import { MenuTypesContext } from "../../contexts/MenusProvider";
import { SelectedRowContext,SelectedOptionSearchContext,SelectedOptionOrderDirectionContext,SelectedOptionOrderContext,SelectedOptionOrderPlusContext } from "../../contexts/SelectedesProvider";
import { SearchTermContext } from "../../contexts/SearchsProvider";
//____________IMPORT/EXPORT____________

// Hook para realizar las acciones de la tabla de las guarniciones ✔️
export const TableActionsSideDishes = () => {
    // Constantes con el valor de los contextos 
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isDeletedSideDishes] = useContext(DeletedSideDishesContext);
    const [isSideDishes] = useContext(SideDishesContext);
    const [isSideDishSpecifications] = useContext(SideDishSpecificationsContext);
    const [isMenuTypeSideDishes] = useContext(MenuTypeSideDishesContext);
    const [isMenuTypes] = useContext(MenuTypesContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const [isSelectedOptionSearch] = useContext(SelectedOptionSearchContext);
    const [isSelectedOptionOrderPlus] = useContext(SelectedOptionOrderPlusContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsSideDishes = useMemo(() => {
        const filtered = isSideDishes.filter((data) => {
            const isDeleted = isDeletedSideDishes.some(dish => dish.idguarnicion === data.idguarnicion);
            if (isDeleted) return false;

            const specifications = isSideDishSpecifications.find(specification => specification.idguarnicion === data.idguarnicion);
            const menus = isMenuTypeSideDishes.filter(menu => menu.idguarnicion === data.idguarnicion);
            const types = isMenuTypes.filter(type =>
                menus.some(menu => menu.idtipo === type.idtipo)
            );

            if (isSelectedOptionSearch === 'General') {
                
                return [
                    data.nombre,
                    specifications?.preparacion || '',
                    specifications?.precio || '',
                    ...types.map(type => type.nombre)
                ].some(value =>
                    String(value).toLowerCase().includes(isSearchTerm.toLowerCase())
                );
            }
            if(isSelectedOptionSearch === 'Nombre'){
                return data.nombre.toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Tiempo de preparación'){
                return String(specifications?.preparacion || '').toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Precio'){
                return String(specifications?.precio || '').toLowerCase().includes(isSearchTerm.toLowerCase());
            }
            if(isSelectedOptionSearch === 'Menú'){
                return types.some(type =>
                    type.nombre.toLowerCase().includes(isSearchTerm.toLowerCase())
                );
            }
        });

        return [...filtered].sort((a, b) => {
            if(isSelectedOptionOrderPlus === 'Normal'){
                return 0;
            }

            if(isSelectedOptionOrderPlus === 'Desayuno'){
                const desayuno = b.idmenu - a.idmenu
                
                if(desayuno !== 1)return desayuno
            }

            if(isSelectedOptionOrderPlus === 'Comida'){
                const comida = b.idmenu - a.idmenu
                
                if(comida !== 2)return comida
            }

            if(isSelectedOptionOrderPlus === 'Cena'){
                const cena = b.idmenu - a.idmenu
                
                if(cena !== 3)return cena
            }

            return 0
        });
    }, [isSideDishes, isDeletedSideDishes, isSideDishSpecifications, isMenuTypeSideDishes, isMenuTypes, isSearchTerm, isSelectedOptionOrderDirection, isSelectedOptionOrderPlus, isSelectedOptionOrder, isSelectedOptionSearch]);
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