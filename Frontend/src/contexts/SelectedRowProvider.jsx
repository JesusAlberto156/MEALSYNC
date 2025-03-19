import { createContext, useState } from "react"

export const selectedRowContext = createContext(null);

export const SelectedRowProvider = ({ children }) => {

    const [selectedRow,setSelectedRow] = useState(null);

    return (
        <selectedRowContext.Provider value={[selectedRow,setSelectedRow]}>
            {children}
        </selectedRowContext.Provider>
    );
}