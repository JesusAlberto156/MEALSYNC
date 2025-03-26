import { useContext } from "react";
import { enableContext } from "../contexts/SessionProvider";
import { userContext } from "../contexts/UsersProvider";
import { selectedRowContext,modalContext,optionModalContext } from "../contexts/VariablesProvider";
import { navbarContext,sidebarContext } from "../contexts/ViewsProvider";

export const useSwitchEnable = () => {

    const [isEnable,setIsEnable] = useContext(enableContext);
    const [isModal,setIsModal] = useContext(modalContext);
    const [isOptionModal,setIsOptionModal] = useContext(optionModalContext);
    const [isSelectedRow] = useContext(selectedRowContext);
    const [isUser] = useContext(userContext);
    const [isNavbar] = useContext(navbarContext);
    const [isSidebar] = useContext(sidebarContext);

    const switchEnable = () => {
        if(isSelectedRow !== null){
            if(isNavbar === 'Estatus' && isSidebar === 'Usuarios' && isOptionModal === 'Habilitar-Usuario'){
                setIsModal(false);
                setIsOptionModal('');
                if(isSelectedRow.idusuario !== isUser.idusuario) setIsEnable(isSelectedRow);
                if(isSelectedRow.idusuario === isUser.idusuario) setIsEnable(isUser);
            }
        }
    }

    return switchEnable;
}