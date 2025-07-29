//____________IMPORT/EXPORT____________
// Hooks de React
import { useState,useContext,useEffect,useMemo } from "react";
// Contextos
import { MenuTypesContext,DeletedMenuTypesContext,MenuTypeUbicationsContext } from "../../contexts/MenusProvider";
import { SearchTerm1Context,SearchTerm2Context } from "../../contexts/SearchsProvider";
import { SupplyTypesContext,DeletedSupplyTypesContext,SupplyCategoriesContext,DeletedSupplyCategoriesContext } from "../../contexts/SuppliesProvider";
import { TextFieldsCustomizedContext } from "../../contexts/FormsProvider";
//____________IMPORT/EXPORT____________

// Hook para realizar las acciones de la tabla de tipos de menú ✔️
export const NutritionistData = () => {
    // Constantes con el valor de los contextos 
    const [isMenuTypes] = useContext(MenuTypesContext);
    const [isDeletedMenuTypes] = useContext(DeletedMenuTypesContext); 
    const [isMenuTypeUbications] = useContext(MenuTypeUbicationsContext);
    const [isSupplyTypes] = useContext(SupplyTypesContext);  
    const [isDeletedSupplyTypes] = useContext(DeletedSupplyTypesContext);
    const [isDeletedSupplyCategories] = useContext(DeletedSupplyCategoriesContext);  
    const [isSupplyCategories] = useContext(SupplyCategoriesContext);
    // Filtrado de datos
    const filteredRecordsMenuTypes = isMenuTypes.filter((data) => {
        const isDeleted = isDeletedMenuTypes.some(type => type.idtipo === data.idtipo);
        if (isDeleted) return false;
        
        return isMenuTypeUbications.some(type => type.idtipo === data.idtipo && type.idubicacion === 2) ? true : false;
    });
    const getFilteredCategories = (searchTerm) => {
        return isSupplyCategories.filter((data) => {
            const isDeleted = isDeletedSupplyCategories.some(category => category.idcategoria === data.idcategoria);
            if (isDeleted) return false;
            return data.nombre.toLowerCase().includes(searchTerm.toLowerCase());
        });
    };
    const getFilteredTypes = (searchTerm, idcategoria) => {
        return isSupplyTypes.filter((data) => {
            const isDeleted = isDeletedSupplyTypes.some(type => type.idtipo === data.idtipo);
            if (isDeleted) return false;
            return data.idcategoria === idcategoria && data.tipo.toLowerCase().includes(searchTerm.toLowerCase());
        });
    };
    // Retorno de la función del hook
    return { filteredRecordsMenuTypes,getFilteredCategories,getFilteredTypes }
}