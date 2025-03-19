import { createContext, useState } from "react"

export const searchTermContext = createContext(null);

export const SearchTermProvider = ({ children }) => {

    const [searchTerm,setSearchTerm] = useState('');

    return (
        <searchTermContext.Provider value={[searchTerm,setSearchTerm]}>
            {children}
        </searchTermContext.Provider>
    );
}