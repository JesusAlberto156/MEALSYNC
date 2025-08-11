//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { MenuTypesContext,DeletedMenuTypesContext,MenuTypeUbicationsContext } from "../../contexts/MenusProvider";
//____________IMPORT/EXPORT____________

// Hook para filtrar los menus agregados en cocina ✔️
export const FilteredRecordsMenuTypesKitchen = () => {
    // Constantes con el valor de los contextos 
    const [isMenuTypes] = useContext(MenuTypesContext);
    const [isDeletedMenuTypes] = useContext(DeletedMenuTypesContext); 
    const [isMenuTypeUbications] = useContext(MenuTypeUbicationsContext);
    // Función del hook
    const filteredRecordsMenuTypes = isMenuTypes.filter((data) => {
        const isDeleted = isDeletedMenuTypes.some(type => type.idtipo === data.idtipo);
        if (isDeleted) return false;
        
        return isMenuTypeUbications.some(type => type.idtipo === data.idtipo && type.idubicacion === 1) ? true : false;
    });
    // Retorno de la función del hook
    return filteredRecordsMenuTypes;
}
// Hook para filtrar los menus agregados en el nutriologia ✔️
export const FilteredRecordsMenuTypesNutritionist = () => {
    // Constantes con el valor de los contextos 
    const [isMenuTypes] = useContext(MenuTypesContext);
    const [isDeletedMenuTypes] = useContext(DeletedMenuTypesContext); 
    const [isMenuTypeUbications] = useContext(MenuTypeUbicationsContext);
    // Función del hook
    const filteredRecordsMenuTypes = isMenuTypes.filter((data) => {
        const isDeleted = isDeletedMenuTypes.some(type => type.idtipo === data.idtipo);
        if (isDeleted) return false;
        
        return isMenuTypeUbications.some(type => type.idtipo === data.idtipo && type.idubicacion === 2) ? true : false;
    });
    // Retorno de la función del hook
    return filteredRecordsMenuTypes;
}
// Hook para filtrar los menus agregados en el area medica ✔️
export const FilteredRecordsMenuTypesDoctor = () => {
    // Constantes con el valor de los contextos 
    const [isMenuTypes] = useContext(MenuTypesContext);
    const [isDeletedMenuTypes] = useContext(DeletedMenuTypesContext); 
    const [isMenuTypeUbications] = useContext(MenuTypeUbicationsContext);
    // Función del hook
    const filteredRecordsMenuTypes = isMenuTypes.filter((data) => {
        const isDeleted = isDeletedMenuTypes.some(type => type.idtipo === data.idtipo);
        if (isDeleted) return false;
        
        return isMenuTypeUbications.some(type => type.idtipo === data.idtipo && type.idubicacion === 3) ? true : false;
    });
    // Retorno de la función del hook
    return filteredRecordsMenuTypes;
}