//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,LoginViewContext,NavbarViewContext,SidebarViewContext,SidebarContext,ModalViewContext,ModalContext } from "../../../contexts/ViewsProvider";
import { ActionBlockContext,AnimationContext,SearchTermContext } from "../../../contexts/VariablesProvider";
import { LoggedLogContext,LoggedLoggedContext,LoggedTypeContext,LoggedUserContext,LoggedPermissionsContext,LoggedStatusContext } from "../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleChangeModal } from "../../../hooks/Views";
import { HandleLoggedLog } from "../../../hooks/Form";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { ImExit } from "react-icons/im";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_350,Container_Row_100_Center,Container_Row_90_Left,Container_Row_90_Center } from "../../styled/Containers";
import { Text_Title_30_Center, Text_P_16_Left } from "../../styled/Text";
import { Button_Icon_Blue_120,Button_Icon_Red_120 } from "../../styled/Buttons";
import { Icon_White_26 } from "../../styled/Icons";
import { Alert_Verification } from "../../styled/Alerts";
//____________IMPORT/EXPORT____________

// Modal para cerrar sesión
export default function Out_Login(){
    // Constantes con el valor de los contextos 
    const [themeMode] = useContext(ThemeModeContext);
    const [isAnimation] = useContext(AnimationContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [currentLView,setCurrentLView] = useContext(LoginViewContext);
    const [currentNView,setCurrentNView] = useContext(NavbarViewContext);
    const [currentSView,setCurrentSView] = useContext(SidebarViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isLoggedLog,setIsLoggedLog] = useContext(LoggedLogContext);
    const [isLoggedLogged,setIsLoggedLogged] = useContext(LoggedLoggedContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(SearchTermContext);
    const [isLoggedType,setIsLoggedType] = useContext(LoggedTypeContext);
    const [isLoggedUser,setIsLoggedUser] = useContext(LoggedUserContext);
    const [isLoggedPermissions,setIsLoggedPermissions] = useContext(LoggedPermissionsContext);
    const [isLoggedStatus,setIsLoggedStatus] = useContext(LoggedStatusContext);
    // useEffect con el cerrado de sesión
    useEffect(() => {
        if(isLoggedLog && isLoggedLogged){
            document.title = "Cargando...";
            const promise = new Promise(async (resolve,reject) => {
                try{       
                    setIsActionBlock(true);         
                    setTimeout(() => {
                        resolve('¡MEALSYNC le agradece su estancia!...');
                        setCurrentMView('');

                        setTimeout(() => {
                            setCurrentLView('');
                            setCurrentNView('');
                            setCurrentSView('');
                            setIsSidebar(true);
                            setIsLoggedType('');
                            setIsSearchTerm('');
                            setIsLoggedPermissions([]);
                            setIsLoggedStatus([]);
                            setIsLoggedLog(false);

                            setTimeout(() => {
                                sessionStorage.clear();
                                setIsLoggedUser([]);
                                setIsActionBlock(false);
                                setIsModal(false);
                                setIsLoggedLogged(false);
                                navigate("/",{replace: true});
                            },800);
                        },500)
                    },2000);
                }catch(error){
                    setIsLoggedLog(false);
                    setIsActionBlock(false);
                    reject('¡Ocurrio un error inesperado!...');
                }
            });
            
            Alert_Verification(promise,'¡Cerrando sesión!...');
        }
    },[isLoggedLog]);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleChangeModal();
    const handleLoggedLog = HandleLoggedLog();
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <>
                    <Container_Modal>
                        <Container_Form_350 className={currentMView === 'Out-Login' ? 'slide-in-container-top' : 'slide-out-container-top'} ThemeMode={themeMode}>
                                <Container_Row_100_Center>
                                    <Text_Title_30_Center ThemeMode={themeMode}>¿ESTAS SEGURO?</Text_Title_30_Center>
                                </Container_Row_100_Center>
                                <Container_Row_90_Left>
                                    <Text_P_16_Left ThemeMode={themeMode}>Cerrará la sesión...</Text_P_16_Left>
                                </Container_Row_90_Left>
                                <Container_Row_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                    <Tooltip title="Cancelar" placement="top">
                                        <Button_Icon_Blue_120 ThemeMode={themeMode} className={isAnimation ? 'roll-out-button-left' : 'roll-in-button-left'}
                                            onClick={() => handleModalView('')}>
                                            <Icon_White_26><MdCancel/></Icon_White_26>
                                        </Button_Icon_Blue_120>
                                    </Tooltip>
                                    <Tooltip title="Cerrar sesión" placement="top">
                                        <Button_Icon_Red_120 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                            onClick={() => handleLoggedLog()}>
                                            <Icon_White_26><ImExit/></Icon_White_26>
                                        </Button_Icon_Red_120>
                                    </Tooltip>
                                </Container_Row_90_Center>
                        </Container_Form_350>
                    </Container_Modal>  
                </>
            ):(
                <></>
            )}
        </>
    );
}