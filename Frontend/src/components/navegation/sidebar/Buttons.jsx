//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ActionBlockContext } from "../../../contexts/VariablesProvider";
import { SidebarViewContext } from "../../../contexts/ViewsProvider";
// Hooks personalizados
import { HandleSidebarView,HandleNavbarView } from "../../../hooks/Views";
// Estilos personalizados
import { Container_Row_100_Center } from "../../styled/Containers";
import { Button_Text_Blue_200 } from "../../styled/Buttons";
import { Icon_20 } from "../../styled/Icons";
//____________IMPORT/EXPORT____________

// Botonoes de funcionalidades
export const Side_Bar_Button = ({
    route = '',
    title = '',
    text = '',
    icon = null,
    viewSidebar = '',
    viewNavbar = '',
}) => {
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    const [currentSView] = useContext(SidebarViewContext);
    // constantes con el valor de los hooks
    const navigate = useNavigate();
    const handleSidebarView = HandleSidebarView();
    const handleNavbarView = HandleNavbarView();
    // Estructura del componente
    return(
        <>
            <Container_Row_100_Center>
                {isActionBlock ? (
                    <>
                        <Button_Text_Blue_200 disabled>
                            {text}<Icon_20>{icon}</Icon_20>
                        </Button_Text_Blue_200>
                    </>
                ):(
                    <Tooltip title={title} placement="right">
                        <Button_Text_Blue_200 
                            style={{
                                backgroundColor: currentSView === viewSidebar ? 'rgb(12, 54, 109)' : '',
                            }}
                            onClick={() => {
                                handleSidebarView(viewSidebar);
                                handleNavbarView(viewNavbar);
                                sessionStorage.setItem('Ruta',route);
                                navigate(route,{ replace: true });
                            }}
                        >
                            {text}<Icon_20>{icon}</Icon_20>
                        </Button_Text_Blue_200>
                    </Tooltip>
                )}
            </Container_Row_100_Center>
        </>
    );
}