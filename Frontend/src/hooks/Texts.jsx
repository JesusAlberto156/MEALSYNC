//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { LoggedTypeContext } from "../contexts/SessionProvider";
import { LoginViewContext } from "../contexts/ViewsProvider";
import { SearchTermContext,SearchTerm1Context,SearchTerm2Context,SearchTerm3Context } from "../contexts/SearchsProvider";
import { SelectedRowContext,SelectedRow1Context,SelectedRow2Context,SelectedOptionOrderContext,SelectedOptionOrderDirectionContext,SelectedOptionSearchContext,SelectedOptionOrderPlusContext,SelectedOptionOrderPlusUltraContext } from "../contexts/SelectedesProvider";
import { TextFieldsSearchDateContext } from "../contexts/FormsProvider";
// Hooks personalizados
import { ResetTextFieldsUser } from "./users/Texts";
//____________IMPORT/EXPORT____________

// Hook para reinciar las variables que controlan el login ✔️
export const ResetLogin = () => {
    // Constantes con el valor de los contextos 
    const [currentLView,setCurrentLView] = useContext(LoginViewContext);
    const [isLoggedType,setIsLoggedType] = useContext(LoggedTypeContext);
    // Constantes con el valor de los hooks
    const resetTextFieldsUser = ResetTextFieldsUser();
    // Función del hook
    const resetLogin = () => {
        setIsLoggedType('');
        setCurrentLView('');
        resetTextFieldsUser();
    }
    // Retorno de la función del hook
    return resetLogin;
}
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
            año: 0,
            mes: 0,
        }));
    }
    // Retorno de la función del hook
    return resetSelectedOptions;
}
// Hook para reinciar las selecciones de busqueda de las tablas ✔️
export const ResetFilteredSearch = () => {
    // Constantes con el valor de los contextos 
    const [isSearchTerm,setIsSearchTerm] = useContext(SearchTermContext);
    const [isSearchTerm1,setIsSearchTerm1] = useContext(SearchTerm1Context);
    const [isSearchTerm2,setIsSearchTerm2] = useContext(SearchTerm2Context);
    const [isSearchTerm3,setIsSearchTerm3] = useContext(SearchTerm3Context);
    const [isSelectedOptionSearch,setIsSelectedOptionSearch] = useContext(SelectedOptionSearchContext);
    const [isTextFieldsSearchDate,setIsTextFieldsSearchDate] = useContext(TextFieldsSearchDateContext); 
    // Función del hook
    const resetSearch = () => {
        setIsSearchTerm('');
        setIsSearchTerm1('');
        setIsSearchTerm2('');
        setIsSearchTerm3('');
        setIsSelectedOptionSearch('General');
        setIsTextFieldsSearchDate(prev => ({ 
            ...prev,
            año: 0,
            mes: 0,
        }));
    }
    // Retorno de la función del hook
    return resetSearch;
}
// Hook para reinciar las selecciones de ordenamiento de las tablas ✔️
export const ResetFilteredOrder = () => {
    // Constantes con el valor de los contextos 
    const [isSelectedOptionOrder,setIsSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const [isSelectedOptionOrderPlus,setIsSelectedOptionOrderPlus] = useContext(SelectedOptionOrderPlusContext);
    const [isSelectedOptionOrderDirection,setIsSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrderPlusUltra,setIsSelectedOptionOrderPlusUltra] = useContext(SelectedOptionOrderPlusUltraContext);
    // Función del hook
    const resetSelected = () => {
        setIsSelectedOptionOrder('');
        setIsSelectedOptionOrderPlus('Normal')
        setIsSelectedOptionOrderDirection('Asc');
        setIsSelectedOptionOrderPlusUltra('');
    }
    // Retorno de la función del hook
    return resetSelected;
}