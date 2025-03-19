import { useContext } from "react";
import { viewSidebarContext } from "../contexts/SwitchViewSidebarProvider";
import { activeOptionContext } from "../contexts/ActiveOptionProvider";
import { sidebarVisibleContext } from "../contexts/SidebarVisibleProvider";
import { typeUserContext } from "../contexts/TypeUserProvider";
import { viewNavbarContext } from "../contexts/SwitchViewNavbarProvider";
import { searchTermContext } from "../contexts/SearchTermProvider";

export const useToggleSidebar = () => {
    const [sidebarVisible,setSidebarVisible] = useContext(sidebarVisibleContext);
    return () => setSidebarVisible(prev => !prev);
};
export const useSidebarActions = () => {

    const [viewSidebar,setViewSidebar] = useContext(viewSidebarContext);
    const [activeOption,setActiveOption] = useContext(activeOptionContext);
    const [viewNavbar,setViewNavbar] = useContext(viewNavbarContext);
    const [searchTerm,setSearchTerm] = useContext(searchTermContext)
    
    const [typeUser] =  useContext(typeUserContext);

    const Home = (View) => {
        if(typeUser === 'Cocinero' || typeUser === 'Medico' || typeUser === 'Nutriologo'){
            document.title = "MEALSYNC_Menú_Inicio";
        }else{
            document.title = "MEALSYNC_Administración_Inicio";
        }
        setViewSidebar(View);
        setActiveOption(View);
        setSearchTerm('');
    };

    const OptionsMenu = (view,option) => {
        if(option === 'General'){document.title = "MEALSYNC_Menú_General";}
        if(option === 'Colaboradores'){document.title = "MEALSYNC_Menú_Colaboradores";}
        if(option === 'Nutriologo'){document.title = "MEALSYNC_Menú_Nutriologo";}
        if(option === 'Medico'){document.title = "MEALSYNC_Menú_Medico";}
        setViewSidebar(view);
        setActiveOption(option);
        setSearchTerm('');
    }

    const OptionsAdmnistration = (view, navbar) => {
        if(view === 'Usuarios'){document.title = "MEALSYNC_Administración_Usuarios";}
        if(view === 'Proveedores'){document.title = "MEALSYNC_Administración_Proveedores";}
        if(view === 'Menus'){document.title = "MEALSYNC_Administración_Menús";}
        if(view === 'Inventario'){document.title = "MEALSYNC_Administración_Inventario";}
        if(view === 'Historial'){document.title = "MEALSYNC_Administración_Historial";}
        setViewSidebar(view);
        setActiveOption(view);
        setViewNavbar(navbar);
        setSearchTerm('');
    };

    return { Home, OptionsMenu, OptionsAdmnistration };
};