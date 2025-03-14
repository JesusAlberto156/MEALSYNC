import { createContext, useState } from "react"

export const toastContext = createContext(null);

export const ToastProvider = ({ children }) => {

    const [toast,setToast] = useState(false);

    return (
        <toastContext.Provider value={[toast,setToast]}>
            {children}
        </toastContext.Provider>
    );
}