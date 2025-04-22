//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
import { Toaster } from "sonner";
// Servicios

// Contextos
import { ThemeModeContext,LoginViewContext,NavbarViewContext,SidebarViewContext,SidebarContext,ModalViewContext,ModalContext } from "../../../contexts/ViewsProvider";
import { ActionBlockContext,AnimationContext,SearchTermContext } from "../../../contexts/VariablesProvider";
import { LoggedLogContext,LoggedLoggedContext,LoggedTypeContext,LoggedUserContext,LoggedPermissionsContext,LoggedStatusContext } from "../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleChangeModal } from "../../../hooks/Views";
import { HandleChangeLog } from "../../../hooks/Form";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { ImExit } from "react-icons/im";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_400,Container_Row_100_Center,Container_Row_90_Left,Container_Row_Border_90_Center } from "../../styled/Containers";
import { Text_Title_30_Center, Text_P_16_Left } from "../../styled/Text";
import { Button_Icon_Blue_150,Button_Icon_Red_150 } from "../../styled/Buttons";
import { Icon_White_26 } from "../../styled/Icons";
import { Alert_Styles,Alert_Verification } from "../../styled/Alerts";
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Modal para cerrar sesión
export default function Out_Login(){
    // Constantes con el valor de los contextos 
    const [themeMode] = useContext(ThemeModeContext);
    const [isAnimation] = useContext(AnimationContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [currentLView,setCurrentLView] = useContext(LoginViewContext);
    const [currentNView,setCurrentNView] = useContext(NavbarViewContext);
    const [currentSView,setCurrentSView] = useContext(SidebarViewContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isLog,setIsLog] = useContext(LoggedLogContext);
    const [isLogged,setIsLogged] = useContext(LoggedLoggedContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(SearchTermContext);
    const [isTypeUser,setIsTypeUser] = useContext(LoggedTypeContext);
    const [isUser,setIsUser] = useContext(LoggedUserContext);
    const [isPermission,setIsPermission] = useContext(LoggedPermissionsContext);
    const [isStatusUser,setIsStatusUser] = useContext(LoggedStatusContext);
    // useEffect con el cerrado de sesión
    useEffect(() => {
        if(isLog && isLogged){
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
                            setIsTypeUser('');
                            setIsSearchTerm('');
                            setIsPermission([]);
                            setIsStatusUser([]);
                            setIsLog(false);
                            setIsLogged(false);

                            setTimeout(() => {
                                sessionStorage.clear();
                                setIsUser([]);
                                setIsActionBlock(false);
                                setIsModal(false);
                                navigate("/",{replace: true});
                            },500);
                        },1500)
                    },2000);
                }catch(error){
                    setIsLog(false);
                    setIsActionBlock(false);
                    reject('¡Ocurrio un error inesperado!...');
                }
            });
            
            Alert_Verification(promise,'¡Cerrando sesión!...');
        }
    },[isLog]);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleChangeModal = HandleChangeModal();
    const handleChangeLog = HandleChangeLog();
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <>
                    <Container_Modal>
                        <Container_Form_400 className={currentMView === 'Out-Login' ? themeMode ? 'roll-in-left-shadow-pop-light' : 'roll-in-left-shadow-pop-dark' : 'roll-out-left'} ThemeMode={themeMode}>
                                <Container_Row_100_Center>
                                    <Text_Title_30_Center ThemeMode={themeMode} className={themeMode ? 'text-shadow-drop-infinite-light' : 'text-shadow-drop-infinite-dark'}>¿ESTAS SEGURO?</Text_Title_30_Center>
                                </Container_Row_100_Center>
                                <Container_Row_90_Left>
                                    <Text_P_16_Left ThemeMode={themeMode} className={themeMode ? 'text-shadow-drop-infinite-light' : 'text-shadow-drop-infinite-dark'}>Cerrará la sesión...</Text_P_16_Left>
                                </Container_Row_90_Left>
                                <Container_Row_Border_90_Center className={themeMode ? 'shadow-out-infinite-light' : 'shadow-out-infinite-dark'} ThemeMode={themeMode}>
                                    <Tooltip title="Cancelar" placement="top">
                                        <Button_Icon_Blue_150 ThemeMode={themeMode} className={isAnimation ? 'roll-out-left' : 'roll-in-left'}
                                            onClick={() => handleChangeModal('')}>
                                            <Icon_White_26><MdCancel/></Icon_White_26>
                                        </Button_Icon_Blue_150>
                                    </Tooltip>
                                    <Tooltip title="Cerrar sesión" placement="top">
                                        <Button_Icon_Red_150 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-left' : 'roll-in-left'}
                                            onClick={() => handleChangeLog()}>
                                            <Icon_White_26><ImExit/></Icon_White_26>
                                        </Button_Icon_Red_150>
                                    </Tooltip>
                                </Container_Row_Border_90_Center>
                        </Container_Form_400>
                        <Alert_Styles ThemeMode={themeMode}>
                            <Toaster
                                visibleToasts={3}
                                richColors
                                theme='light'
                                position='top-right'
                            />
                        </Alert_Styles> 
                    </Container_Modal>  
                </>
            ):(
                <></>
            )}
        </>
    );
}