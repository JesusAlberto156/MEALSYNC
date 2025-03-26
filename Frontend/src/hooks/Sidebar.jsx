import { useContext } from "react";
import { sidebarContext,navbarContext } from "../contexts/ViewsProvider";
import { visibleContext,searchTermContext } from "../contexts/VariablesProvider";
import { typeUserContext } from "../contexts/TypeUserProvider";

export const useToggleSidebar = () => {

    const [isVisible,setIsVisible] = useContext(visibleContext);

    const toggleSidebar = () => {
        setIsVisible(!isVisible);
    };

    return toggleSidebar;
};

export const useSidebarHome = () => {

    const [isSidebar,setIsSidebar] = useContext(sidebarContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(searchTermContext)
    const [isTypeUser] =  useContext(typeUserContext);

    const sidebarHome = (View) => {
        if(isTypeUser === 'Cocinero' || isTypeUser === 'Medico' || isTypeUser === 'Nutriologo'){
            document.title = "MEALSYNC_Menú_Inicio";
        }else{
            document.title = "MEALSYNC_Administración_Inicio";
        }
        setIsSidebar(View);
        setIsSearchTerm('');
    };

    return sidebarHome;
};

export const useSidebarOption = () => {

    const [isSidebar,setIsSidebar] = useContext(sidebarContext);
    const [isNavbar,setIsNavbar] = useContext(navbarContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(searchTermContext)

    const sidebarOption = (view,navbar) => {
        if(view === 'General'){document.title = "MEALSYNC_Menú_General";}
        if(view === 'Colaboradores'){document.title = "MEALSYNC_Menú_Colaboradores";}
        if(view === 'Nutriologo'){document.title = "MEALSYNC_Menú_Nutriologo";}
        if(view === 'Medico'){document.title = "MEALSYNC_Menú_Medico";}
        if(view === 'Usuarios'){document.title = "MEALSYNC_Administración_Usuarios";}
        if(view === 'Proveedores'){document.title = "MEALSYNC_Administración_Proveedores";}
        if(view === 'Menus'){document.title = "MEALSYNC_Administración_Menús";}
        if(view === 'Inventario'){document.title = "MEALSYNC_Administración_Inventario";}
        if(view === 'Historial'){document.title = "MEALSYNC_Administración_Historial";}
        setIsSidebar(view);
        setIsNavbar(navbar);
        setIsSearchTerm('');
    }

    return sidebarOption;
};