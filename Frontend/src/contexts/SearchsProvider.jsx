//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useState } from "react"
// Contextos
export const SearchTermContext = createContext(null);
export const SearchTerm1Context = createContext(null);
export const SearchTerm2Context = createContext(null);
export const SearchTerm3Context = createContext(null);
//____________IMPORT/EXPORT____________

// Todos los contextos para lo que se escriba en los buscadores  ✔️
export const Index_Searchs = ({children}) => {
    return(
        <Search_Term>
            <Search_Term_1>
                <Search_Term_2>
                    <Search_Term_3>
                        {children}
                    </Search_Term_3>
                </Search_Term_2>
            </Search_Term_1>
        </Search_Term>
    );
}

// Función Contexto para controlar el buscador ✔️
export const Search_Term = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSearchTerm,setIsSearchTerm] = useState('');
    // Return para darle valor al contexto y heredarlo
    return (
        <SearchTermContext.Provider value={[isSearchTerm,setIsSearchTerm]}>
            {children}
        </SearchTermContext.Provider>
    );
}
// Función Contexto para controlar el buscador 1 ✔️
export const Search_Term_1 = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSearchTerm1,setIsSearchTerm1] = useState('');
    // Return para darle valor al contexto y heredarlo
    return (
        <SearchTerm1Context.Provider value={[isSearchTerm1,setIsSearchTerm1]}>
            {children}
        </SearchTerm1Context.Provider>
    );
}
// Función Contexto para controlar el buscador 2 ✔️
export const Search_Term_2 = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSearchTerm2,setIsSearchTerm2] = useState('');
    // Return para darle valor al contexto y heredarlo
    return (
        <SearchTerm2Context.Provider value={[isSearchTerm2,setIsSearchTerm2]}>
            {children}
        </SearchTerm2Context.Provider>
    );
}
// Función Contexto para controlar el buscador 3 ✔️
export const Search_Term_3 = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSearchTerm3,setIsSearchTerm3] = useState('');
    // Return para darle valor al contexto y heredarlo
    return (
        <SearchTerm3Context.Provider value={[isSearchTerm3,setIsSearchTerm3]}>
            {children}
        </SearchTerm3Context.Provider>
    );
}