//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { SidebarContext,SidebarViewContext } from "../../contexts/ViewsProvider";
import { LoggedLoggedContext,LoggedTypeContext } from "../../contexts/SessionProvider";
import { ActionBlockContext } from "../../contexts/VariablesProvider";
// Hooks personalizados
import { ToggleSidebar,HandleModalView } from "../../hooks/Views";
//__________IMAGENES__________
import Logo_Hospital from '../imgs/Logo-Hospital.png'
//__________IMAGENES__________
//__________ICONOS__________
// Iconos para el toggle
import { BiSolidToggleLeft } from "react-icons/bi";
import { BiSolidToggleRight } from "react-icons/bi";
// Icono para el logout
import { ImExit } from "react-icons/im";
//__________ICONOS__________
// Estilos personalizados
import { Container_Settingbar_Row_White,Container_Row_100_Right } from "../styled/Containers";
import { Button_Icon_Blue_80,Button_Icon_Red_80 } from "../styled/Buttons";
import { Icon_20 } from "../styled/Icons";
import { Image_Navbar_Fade } from "../styled/Imgs";
//____________IMPORT/EXPORT____________

// Componente para la configuración visual de la página o cerrar sesión
export default function Setting_Bar(){
    // Constantes con el valor de los contextos
    const [isSidebar] = useContext(SidebarContext);
    const [isLogged] = useContext(LoggedLoggedContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [isTypeUser] = useContext(LoggedTypeContext);
    const [isActionBlock] = useContext(ActionBlockContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const toggleSidebar = ToggleSidebar();
    const handleModalView = HandleModalView();
    // Estructura del componente
    return(
        <>  
            {isLogged && currentSView === 'Inicio' ? (
                <>
                    <Container_Settingbar_Row_White>
                        <Image_Navbar_Fade src={Logo_Hospital}/>
                        <Container_Row_100_Right>
                            {isActionBlock ? (
                                <>
                                    <Button_Icon_Red_80 disabled>
                                        <Icon_20><ImExit/></Icon_20>
                                    </Button_Icon_Red_80>
                                    <Button_Icon_Blue_80 disabled>
                                        {isSidebar ? <Icon_20><BiSolidToggleRight/></Icon_20> : <Icon_20><BiSolidToggleLeft/></Icon_20>}
                                    </Button_Icon_Blue_80>
                                </>
                            ):(
                                <>
                                    <Tooltip title='Salir' placement="bottom">
                                        <Button_Icon_Red_80 
                                            onClick={() => {
                                                handleModalView('Cerrar-Sesión');
                                                navigate(isTypeUser === 'Cocinero' || isTypeUser === 'Nutriólogo' || isTypeUser === 'Médico' ? '/Kitchen/Out_Login' : '/Administration/Out_Login',{ replace: true });
                                            }}
                                        >
                                            <Icon_20><ImExit/></Icon_20>
                                        </Button_Icon_Red_80>
                                    </Tooltip>
                                    <Tooltip title={isSidebar ? 'Ocultar' : 'Mostrar'} placement="bottom">
                                        <Button_Icon_Blue_80 
                                            onClick={() => toggleSidebar()}
                                        >
                                            {isSidebar ? <Icon_20><BiSolidToggleRight/></Icon_20> : <Icon_20><BiSolidToggleLeft/></Icon_20>}
                                        </Button_Icon_Blue_80>
                                    </Tooltip>  
                                </>
                            )}
                        </Container_Row_100_Right>
                    </Container_Settingbar_Row_White>
                </>
            ):(
                <></>
            )}
        </>
    );
}