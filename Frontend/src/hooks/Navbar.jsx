import { useContext } from "react";
import { navbarContext } from "../contexts/ViewsProvider";
import { searchTermContext } from "../contexts/VariablesProvider";

export const useNavbarViews = () => {
    const [isNavbar,setIsNavbar] = useContext(navbarContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(searchTermContext);

    const navbarViews = (View) => {
        setIsNavbar(View);
        setIsSearchTerm('');
    };

    return navbarViews;
}