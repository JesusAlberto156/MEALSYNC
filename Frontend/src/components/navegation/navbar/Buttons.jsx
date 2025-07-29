//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ActionBlockContext } from "../../../contexts/VariablesProvider";
import { NavbarViewContext } from "../../../contexts/ViewsProvider";
// Hooks personalizados
import { HandleNavbarView } from "../../../hooks/Views";
// Estilos personalizados
import { Button_Icon_White_100 } from "../../styled/Buttons";
import { Icon_24 } from "../../styled/Icons";
//____________IMPORT/EXPORT____________

// Botonoes de funcionalidades
export const Nav_Bar_Button_White = ({
    route = '',
    view = '',
    title = 'Editar',
    icon = null,
}) => {
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    const [currentNView] = useContext(NavbarViewContext);
    // constantes con el valor de los hooks
    const navigate = useNavigate();
    const handleNavbarView = HandleNavbarView();
    // Estructura del componente
    return(
        <>
            {isActionBlock ? (
                <>
                    <Button_Icon_White_100 disabled>
                        <Icon_24>{icon}</Icon_24>
                    </Button_Icon_White_100>
                </>
            ):(
                <Tooltip title={title} placement="bottom">
                    <Button_Icon_White_100 
                        style={{ 
                            backgroundColor: currentNView === view ? 'rgba(0, 0, 0, 1)' : '',
                            borderColor: currentNView === view ? 'white' : '',
                            color: currentNView === view ? 'white' : '',
                        }}
                        onClick={() => {
                            handleNavbarView(view);
                            sessionStorage.setItem('Ruta',route);
                            navigate(route,{ replace: true });
                        }}
                    >
                        <Icon_24>{icon}</Icon_24>
                    </Button_Icon_White_100>
                </Tooltip>
            )}
        </>
    );
}