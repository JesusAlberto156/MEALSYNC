//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { SearchTermContext,SearchTerm1Context,SearchTerm2Context } from "../contexts/SearchsProvider";
import { SelectedOptionOrderContext,SelectedOptionOrderDirectionContext,SelectedOptionSearchContext,SelectedOptionOrderPlusContext } from "../contexts/SelectedesProvider";
//____________IMPORT/EXPORT____________

// Hook para reinciar los campos de texto de los buscadores ✔️
export const ResetSearchTerms = () => {
    // Constantes con el valor de los contextos 
    const [isSearchTerm,setIsSearchTerm] = useContext(SearchTermContext);
    const [isSearchTerm1,setIsSearchTerm1] = useContext(SearchTerm1Context);
    const [isSearchTerm2,setIsSearchTerm2] = useContext(SearchTerm2Context);
    // Función del hook
    const resetSearchTerms = () => {
        setIsSearchTerm('');
        setIsSearchTerm1('');
        setIsSearchTerm2('');
    }
    // Retorno de la función del hook
    return resetSearchTerms;
}
// Hook para reinciar los campos de los selected para las opciones ✔️
export const ResetSelectedOptions = () => {
    // Constantes con el valor de los contextos 
    const [isSelectedOptionSearch,setIsSelectedOptionSearch] = useContext(SelectedOptionSearchContext);
    const [isSelectedOptionOrder,setIsSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const [isSelectedOptionOrderPlus,setIsSelectedOptionOrderPlus] = useContext(SelectedOptionOrderPlusContext);
    const [isSelectedOptionOrderDirection,setIsSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    // Función del hook
    const resetSelectedOptions = () => {
        setIsSelectedOptionSearch('General');
        setIsSelectedOptionOrder('');
        setIsSelectedOptionOrderPlus('Normal')
        setIsSelectedOptionOrderDirection('Asc');
    }
    // Retorno de la función del hook
    return resetSelectedOptions;
}