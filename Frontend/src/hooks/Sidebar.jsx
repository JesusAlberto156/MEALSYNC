import { useContext } from "react";
import { viewSidebarContext } from "../contexts/SwitchViewSidebarProvider";
import { activeOptionContext } from "../contexts/ActiveOptionProvider";
import { sidebarVisibleContext } from "../contexts/SidebarVisibleProvider";

export const useToggleSidebar = () => {
    const [sidebarVisible,setSidebarVisible] = useContext(sidebarVisibleContext);
    return () => setSidebarVisible(prev => !prev);
};
export const useSidebarActions = () => {

    const [viewSidebar,setViewSidebar] = useContext(viewSidebarContext);
    const [activeOption,setActiveOption] = useContext(activeOptionContext);

    const HomeMenu = (View) => {
        document.title = "MEALSYNC_Menú_Inicio";
        setViewSidebar(View);
        setActiveOption(View);
    };

    const General = (View, Option) => {
        document.title = "MEALSYNC_Menú_General";
        setViewSidebar(View);
        setActiveOption(Option);
    };

    const Colaboradores = (View, Option) => {
        document.title = "MEALSYNC_Menú_Colaboradores";
        setViewSidebar(View);
        setActiveOption(Option);
    };

    const Nutriologo = (View, Option) => {
        document.title = "MEALSYNC_Menú_Nutriologo";
        setViewSidebar(View);
        setActiveOption(Option);
    };

    const Medico = (View, Option) => {
        document.title = "MEALSYNC_Menú_Medico";
        setViewSidebar(View);
        setActiveOption(Option);
    };

    return { HomeMenu, General, Colaboradores, Nutriologo, Medico };
};