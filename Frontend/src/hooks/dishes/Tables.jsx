//____________IMPORT/EXPORT____________
// Hooks de React
import { useState,useContext,useEffect,useMemo } from "react";
// Contextos
import { DeletedDishesContext,DishesContext,MenuTypeDishesContext,DishSpecificationsContext } from "../../contexts/DishesProvider";
import { MenuTypesContext } from "../../contexts/MenusProvider";
import { SelectedRowContext,SelectedOptionSearchContext,SelectedOptionOrderDirectionContext,SelectedOptionOrderContext,SelectedOptionOrderPlusContext } from "../../contexts/SelectedesProvider";
import { SearchTermContext } from "../../contexts/SearchsProvider";
import { LoggedTypeContext } from "../../contexts/SessionProvider";
//____________IMPORT/EXPORT____________

// Hook para realizar las acciones de la tabla de los platillos ✔️
export const TableActionsDishes = () => {
    // Constantes con el valor de los contextos 
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isDeletedDishes] = useContext(DeletedDishesContext);
    const [isDishes] = useContext(DishesContext);
    const [isDishSpecifications] = useContext(DishSpecificationsContext);
    const [isMenuTypeDishes] = useContext(MenuTypeDishesContext);
    const [isMenuTypes] = useContext(MenuTypesContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const [isSelectedOptionSearch] = useContext(SelectedOptionSearchContext);
    const [isSelectedOptionOrderPlus] = useContext(SelectedOptionOrderPlusContext);
    const [isLoggedType] = useContext(LoggedTypeContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsDishes = useMemo(() => {
        const filtered = isDishes.filter((data) => {
            const isDeleted = isDeletedDishes.some(dish => dish.idplatillo === data.idplatillo);
            if (isDeleted) return false;

            const specifications = isDishSpecifications.find(specification => specification.idplatillo === data.idplatillo);
            const menus = isMenuTypeDishes.filter(menu => menu.idplatillo === data.idplatillo);
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

        const TimeFiltered = filtered.filter(item => {
            if (isSelectedOptionOrderPlus === 'Normal') {
                return true; // No filtra nada, muestra todo
            }

            if (isSelectedOptionOrderPlus === 'Desayuno') {
                return item.idmenu === 1;
            }

            if (isSelectedOptionOrderPlus === 'Comida') {
                return item.idmenu === 2;
            }

            if (isSelectedOptionOrderPlus === 'Cena') {
                return item.idmenu === 3;
            }

            return false
        });

        if(isLoggedType === 'Nutriólogo'){
            

            return TimeFiltered;
        }else{
            return TimeFiltered;
        }
    }, [isDishes, isDeletedDishes, isDishSpecifications, isMenuTypeDishes, isMenuTypes, isSearchTerm, isSelectedOptionOrderDirection, isSelectedOptionOrderPlus, isSelectedOptionOrder, isSelectedOptionSearch]);
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