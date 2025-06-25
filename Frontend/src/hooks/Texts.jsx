//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { SearchTermContext,SearchTerm1Context,SearchTerm2Context,SearchTerm3Context } from "../contexts/SearchsProvider";
import { SelectedRowContext,SelectedRow1Context,SelectedRow2Context,SelectedOptionOrderContext,SelectedOptionOrderDirectionContext,SelectedOptionSearchContext,SelectedOptionOrderPlusContext,SelectedOptionOrderPlusUltraContext } from "../contexts/SelectedesProvider";
import { TextFieldsSearchDateContext } from "../contexts/FormsProvider";
//____________IMPORT/EXPORT____________

// Hook para reinciar los campos de texto de los buscadores ✔️
export const ResetSearchTerms = () => {
    // Constantes con el valor de los contextos 
    const [isSearchTerm,setIsSearchTerm] = useContext(SearchTermContext);
    const [isSearchTerm1,setIsSearchTerm1] = useContext(SearchTerm1Context);
    const [isSearchTerm2,setIsSearchTerm2] = useContext(SearchTerm2Context);
    const [isSearchTerm3,setIsSearchTerm3] = useContext(SearchTerm3Context);
    // Función del hook
    const resetSearchTerms = () => {
        setIsSearchTerm('');
        setIsSearchTerm1('');
        setIsSearchTerm2('');
        setIsSearchTerm3('');
    }
    // Retorno de la función del hook
    return resetSearchTerms;
}
// Hook para reinciar los campos de los selected para las tablas ✔️
export const ResetSelectedTables = () => {
    // Constantes con el valor de los contextos 
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSelectedRow1,setIsSelectedRow1] = useContext(SelectedRow1Context);
    const [isSelectedRow2,setIsSelectedRow2] = useContext(SelectedRow2Context); 
    // Función del hook
    const resetSearchTerms = () => {
        setIsSelectedRow(null);
        setIsSelectedRow1(null);
        setIsSelectedRow2(null);
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
    const [isSelectedOptionOrderPlusUltra,setIsSelectedOptionOrderPlusUltra] = useContext(SelectedOptionOrderPlusUltraContext);
    const [isTextFieldsSearchDate,setIsTextFieldsSearchDate] = useContext(TextFieldsSearchDateContext); 
    // Función del hook
    const resetSelectedOptions = () => {
        setIsSelectedOptionSearch('General');
        setIsSelectedOptionOrder('');
        setIsSelectedOptionOrderPlus('Normal')
        setIsSelectedOptionOrderDirection('Asc');
        setIsSelectedOptionOrderPlusUltra('');
        setIsTextFieldsSearchDate(prev => ({ 
            ...prev,
            año: new Date().getFullYear(),
            mes: new Date().getMonth(),
        }));
    }
    // Retorno de la función del hook
    return resetSelectedOptions;
}