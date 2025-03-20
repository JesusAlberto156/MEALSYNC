import { useContext } from "react";
import { navbarContext } from "../contexts/ViewsProvider";
import { searchTermContext } from "../contexts/VariablesProvider";

export const useNavbarViews = () => {
    const [navbar,setNavbar] = useContext(navbarContext);
    const [searchTerm,setSearchTerm] = useContext(searchTermContext);

    const Switch = (View) => {
        setNavbar(View);
        setSearchTerm('');
    };

    return { Switch };
}