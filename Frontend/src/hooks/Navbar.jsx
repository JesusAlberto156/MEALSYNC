import { useContext } from "react";
import { viewNavbarContext } from "../contexts/SwitchViewNavbarProvider";
import { searchTermContext } from "../contexts/SearchTermProvider";

export const useNavbarActions = () => {
    const [viewNavbar,setViewNavbar] = useContext(viewNavbarContext);
    const [searchTerm,setSearchTerm] = useContext(searchTermContext);

    const Switch = (View) => {
        setViewNavbar(View);
        setSearchTerm('');
    };

    return { Switch };
}