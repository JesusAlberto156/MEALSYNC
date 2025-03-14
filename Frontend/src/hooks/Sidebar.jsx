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

    const Collaborators = (View, Option) => {
        document.title = "MEALSYNC_Menú_Colaboradores";
        setViewSidebar(View);
        setActiveOption(Option);
    };

    const Nutritionist = (View, Option) => {
        document.title = "MEALSYNC_Menú_Nutriologo";
        setViewSidebar(View);
        setActiveOption(Option);
    };

    const Doctor = (View, Option) => {
        document.title = "MEALSYNC_Menú_Medico";
        setViewSidebar(View);
        setActiveOption(Option);
    };

    const HomeAdministration = (View) => {
        document.title = "MEALSYNC_Administración_Inicio";
        setViewSidebar(View);
        setActiveOption(View);
    };

    const Users = (View, Option) => {
        document.title = "MEALSYNC_Administración_Usuarios";
        setViewSidebar(View);
        setActiveOption(Option);
    };

    const Suppliers = (View, Option) => {
        document.title = "MEALSYNC_Administración_Proveedores";
        setViewSidebar(View);
        setActiveOption(Option);
    };

    const Menus = (View, Option) => {
        document.title = "MEALSYNC_Administración_Menús";
        setViewSidebar(View);
        setActiveOption(Option);
    };

    const Inventory = (View, Option) => {
        document.title = "MEALSYNC_Administración_Inventarios";
        setViewSidebar(View);
        setActiveOption(Option);
    };

    return { HomeMenu, General, Collaborators, Nutritionist, Doctor, HomeAdministration, Users, Suppliers, Menus, Inventory };
};