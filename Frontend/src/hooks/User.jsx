import { useContext } from "react";
import { enableUserContext } from "../contexts/SessionProvider";
import { userContext } from "../contexts/UsersProvider";
import { selectedRowContext } from "../contexts/VariablesProvider";
import { navbarContext,sidebarContext } from "../contexts/ViewsProvider";
import { modalUserEnableContext } from "../contexts/ModalsProvider";

export const useEnable = () => {

    const [enableUser,setEnableUser] = useContext(enableUserContext);
    const [isModal,setIsModal] = useContext(modalUserEnableContext);
    const [selectedRow] = useContext(selectedRowContext);
    const [user] = useContext(userContext);
    const [navbar] = useContext(navbarContext);
    const [sidebar] = useContext(sidebarContext);

    const switchEnable = async () => {
        if(selectedRow !== null){
            if(navbar === 'Estatus' && sidebar === 'Usuarios'){
                setIsModal(false);
                if(selectedRow.idusuario !== user.idusuario) setEnableUser(selectedRow);
                if(selectedRow.idusuario === user.idusuario) setEnableUser(user);
            }
        }
    }

    return switchEnable;
}