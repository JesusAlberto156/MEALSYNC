//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { themeModeContext,navbarViewContext,sidebarViewContext } from "../../contexts/ViewsProvider";
// Hooks personalizados
import { useChangeNavbarView } from "../../hooks/Views";
//__________ICONOS__________
// Iconos para la opcion de usuarios del navbar
import { FaUserTag } from "react-icons/fa6";
import { FaUserLock } from "react-icons/fa6";
import { FaUserClock } from "react-icons/fa6";
//__________ICONOS__________
// Estilos personalizados
import { Container_Nav_Bar,Container_Nav_Bar_Button } from "../styled/Containers";
import { Img_Logo_Hospital_60 } from '../styled/Imgs';
import { Button_Icon_White_100 } from '../styled/Buttons';
import { Text_Title_Fade_30 } from '../styled/Text';

// Componentes personalizados

//____________IMPORT/EXPORT____________

// Componente para navegar entre las paginas en la parte superior 
export default function Nav_Bar(){
    // Constantes con el valor de los contextos 
    const [themeMode] = useContext(themeModeContext);
    const [currentNView] = useContext(navbarViewContext);
    const [currentSView] = useContext(sidebarViewContext);
    // Constantes con la funcionalidad de los hooks
    const changeNavbarView = useChangeNavbarView();
    const navigate = useNavigate();
    // Estructura del componente
    return(
        <>
            <Container_Nav_Bar ThemeMode={themeMode}> 
                <Img_Logo_Hospital_60 ThemeMode={themeMode}/> 
                <Container_Nav_Bar_Button ThemeMode={themeMode}>
                    {currentSView === 'Users' ? (
                        <>
                            <Tooltip title='Principal' placement="top">
                                <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                    changeNavbarView('Principal');
                                    navigate('/Administration/Users/Principal',{ replace: true });
                                }}>
                                    <FaUserTag/>
                                </Button_Icon_White_100>
                            </Tooltip>
                            <Tooltip title='Permisos' placement="top">
                                <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                    changeNavbarView('Permissions')
                                    navigate('/Administration/Users/Permissions',{ replace: true });
                                }}>
                                    <FaUserLock/>
                                </Button_Icon_White_100>
                            </Tooltip>
                            <Tooltip title='Estatus' placement="top">
                                <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                    changeNavbarView('Status')
                                    navigate('/Administration/Users/Status',{ replace: true });
                                }}>
                                    <FaUserClock/>
                                </Button_Icon_White_100>
                            </Tooltip>
                            {currentNView === 'Principal' ? (
                                <Text_Title_Fade_30 ThemeMode={themeMode}>USUARIOS</Text_Title_Fade_30>
                            ):(
                                <></>
                                
                            )}
                            {currentNView === 'Permissions' ? (
                                <Text_Title_Fade_30 ThemeMode={themeMode}>PERMISOS</Text_Title_Fade_30>
                            ):(
                                <></>
                            )}
                            {currentNView === 'Status' ? (
                                <Text_Title_Fade_30 ThemeMode={themeMode}>ESTATUS</Text_Title_Fade_30>
                            ):(
                                <></>
                            )}
                        </>
                    ):(
                        <></>
                    )}
                </Container_Nav_Bar_Button>
            </Container_Nav_Bar>  
        </>
    );
}