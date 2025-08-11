//____________IMPORT/EXPORT____________
// Hooks de React
import { useState,useContext,useEffect,useMemo } from "react";
// Contextos
import { DeletedDrinksContext,DrinksContext,MenuTypeDrinksContext,DrinkSpecificationsContext } from "../../contexts/DrinksProvider";
import { MenuTypesContext,MenuTypeUbicationsContext } from "../../contexts/MenusProvider";
import { SelectedRowContext,SelectedOptionSearchContext,SelectedOptionOrderDirectionContext,SelectedOptionOrderContext,SelectedOptionOrderPlusContext } from "../../contexts/SelectedesProvider";
import { SearchTermContext } from "../../contexts/SearchsProvider";
import { LoggedTypeContext } from "../../contexts/SessionProvider";
//____________IMPORT/EXPORT____________

// Hook para realizar las acciones de la tabla de las bebidas ✔️
export const TableActionsDrinks = () => {
    // Constantes con el valor de los contextos 
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isDeletedDrinks] = useContext(DeletedDrinksContext);
    const [isDrinks] = useContext(DrinksContext);
    const [isDrinkSpecifications] = useContext(DrinkSpecificationsContext);
    const [isMenuTypeDrinks] = useContext(MenuTypeDrinksContext);
    const [isMenuTypes] = useContext(MenuTypesContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const [isSelectedOptionSearch] = useContext(SelectedOptionSearchContext);
    const [isSelectedOptionOrderPlus] = useContext(SelectedOptionOrderPlusContext);
    const [isLoggedType] = useContext(LoggedTypeContext);
    const [isMenuTypeUbications] = useContext(MenuTypeUbicationsContext); 
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsDrinks = useMemo(() => {
        const filtered = isDrinks.filter((data) => {
            const isDeleted = isDeletedDrinks.some(dish => dish.idbebida === data.idbebida);
            if (isDeleted) return false;

            const specifications = isDrinkSpecifications.find(specification => specification.idbebida === data.idbebida);
            const menus = isMenuTypeDrinks.filter(menu => menu.idbebida === data.idbebida);
            const types = isMenuTypes.filter(type =>
                menus.some(menu => menu.idtipo === type.idtipo)
            );

            if(isLoggedType == 'Nutriólogo'){
                const tieneUbicacionDistinta = types.some(type =>
                    isMenuTypeUbications.some(s => s.idtipo === type.idtipo && s.idubicacion === 2)
                );
                if (!tieneUbicacionDistinta) return false;
            }

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
            
        return TimeFiltered;
    }, [isDrinks, isDeletedDrinks, isDrinkSpecifications, isMenuTypeDrinks, isMenuTypeUbications, isMenuTypes, isSearchTerm, isSelectedOptionOrderDirection, isSelectedOptionOrderPlus, isSelectedOptionOrder, isSelectedOptionSearch]);
    // Total de registros visibles de la tabla
    const recordsPerPage = 12;
    // Indices de los registros
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // Total de páginas 
    const totalPagesDrinks = Math.ceil(filteredRecordsDrinks.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsDrinks = filteredRecordsDrinks.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (drink) => {
        setIsSelectedRow((prevSelected) => {
            return prevSelected?.idbebida === drink.idbebida ? null : drink;
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPageDrinks = () => {
        if (currentPage < totalPagesDrinks) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesDrinks){
            setCurrentPage(1);
        }
    },[isSearchTerm])
    // Retorno de la función del hook
    return { handleRowClick,prevPage,currentPage,nextPageDrinks,currentRecordsDrinks,filteredRecordsDrinks,totalPagesDrinks}
}