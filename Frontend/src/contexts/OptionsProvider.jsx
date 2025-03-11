import { createContext, useState } from "react"

export const optionsContext = createContext(null);

export const OptionsProvider = ({ children }) => {

    const [loadingOption,isLoadingOption] = useState(true);
    const [loadingAdministration,isLoadingAdministration] = useState(false);
    const [loadingKitchen,isLoadingKitchen] = useState(false);
    const [loadingLogin,isLoadingLogin] = useState(false);
    const [loadingLoginAdministration,isLoadingLoginAdministration] = useState(false);
    const [loadingLoginKitchen,isLoadingLoginKitchen] = useState(false);

    return (
        <optionsContext.Provider value={
            {loadingOption,isLoadingOption,
            loadingAdministration,isLoadingAdministration,
            loadingKitchen,isLoadingKitchen,
            loadingLogin,isLoadingLogin,
            loadingLoginAdministration,isLoadingLoginAdministration,
            loadingLoginKitchen,isLoadingLoginKitchen}
        }>
            {children}
        </optionsContext.Provider>
    );
}