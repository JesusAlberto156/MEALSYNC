import { createContext, useState } from "react"

export const activeOptionContext = createContext(null);

export const ActiveOptionProvider = ({ children }) => {

    const [activeOption,setActiveOption] = useState('');

    return (
        <activeOptionContext.Provider value={[activeOption,setActiveOption]}>
            {children}
        </activeOptionContext.Provider>
    );
}