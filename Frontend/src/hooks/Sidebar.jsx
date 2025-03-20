import { useContext } from "react";
import { sidebarContext,navbarContext } from "../contexts/ViewsProvider";
import { visibleContext,searchTermContext } from "../contexts/VariablesProvider";
import { typeUserContext } from "../contexts/TypeUserProvider";

export const useToggleSidebar = () => {
    const [visible,setVisible] = useContext(visibleContext);
    return () => setVisible(prev => !prev);
};

export const useSidebarViews = () => {

    const [sidebar,setSidebar] = useContext(sidebarContext);
    const [navbar,setNavbar] = useContext(navbarContext);
    const [searchTerm,setSearchTerm] = useContext(searchTermContext)
    const [typeUser] =  useContext(typeUserContext);

    const Home = (View) => {
        if(typeUser === 'Cocinero' || typeUser === 'Medico' || typeUser === 'Nutriologo'){
            document.title = "MEALSYNC_Menú_Inicio";
        }else{
            document.title = "MEALSYNC_Administración_Inicio";
        }
        setSidebar(View);
        setSearchTerm('');
    };

    const Options = (view,navbar) => {
        if(view === 'General'){document.title = "MEALSYNC_Menú_General";}
        if(view === 'Colaboradores'){document.title = "MEALSYNC_Menú_Colaboradores";}
        if(view === 'Nutriologo'){document.title = "MEALSYNC_Menú_Nutriologo";}
        if(view === 'Medico'){document.title = "MEALSYNC_Menú_Medico";}
        if(view === 'Usuarios'){document.title = "MEALSYNC_Administración_Usuarios";}
        if(view === 'Proveedores'){document.title = "MEALSYNC_Administración_Proveedores";}
        if(view === 'Menus'){document.title = "MEALSYNC_Administración_Menús";}
        if(view === 'Inventario'){document.title = "MEALSYNC_Administración_Inventario";}
        if(view === 'Historial'){document.title = "MEALSYNC_Administración_Historial";}
        setSidebar(view);
        setNavbar(navbar);
        setSearchTerm('');
    }

    return { Home,Options };
};