//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { Outlet,useNavigate,Navigate } from "react-router-dom";
// Contextos
import { ModalViewContext,ModalContext } from "../contexts/ViewsProvider";
import { LoggedUserContext,LoggedLogContext,LoggedLoggedContext,LoggedPermissionsContext,LoggedStatusContext,LoggedTypeContext } from "../contexts/SessionProvider";
import { ActionBlockContext } from "../contexts/VariablesProvider";
// Hooks personalizados
import { DeleteSessionStorage,ResetViews,ResetVariables } from "../hooks/Session";
// Estilos personalizados
import { Alert_Sonner_Promise } from "../components/styled/Alerts";
//____________IMPORT/EXPORT____________

// Componente para proteger las rutas de la pagina
export const PrivateRouteKitchen = () => {
    // Constantes con el valor de los contextos
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isLoggedLog,setIsLoggedLog] = useContext(LoggedLogContext);
    const [isLoggedLogged,setIsLoggedLogged] = useContext(LoggedLoggedContext);
    const [isLoggedType,setIsLoggedType] = useContext(LoggedTypeContext);
    const [isLoggedUser,setIsLoggedUser] = useContext(LoggedUserContext);
    const [isLoggedPermissions,setIsLoggedPermissions] = useContext(LoggedPermissionsContext);
    const [isLoggedStatus,setIsLoggedStatus] = useContext(LoggedStatusContext);
    // useEffect con el cerrado de sesión
    useEffect(() => {
        if(isLoggedLog && isLoggedLogged){
            const promise = new Promise((resolve,reject) => {
                try{               
                    setTimeout(() => {
                        resolve('¡Le agradece su estancia!');

                        setCurrentMView('');
                        setTimeout(() => {
                            deleteSessionStorage();
                            resetViews();
                            resetVariables();
                            setIsLoggedPermissions([]);
                            setIsLoggedLog(false);
                            setIsLoggedLogged(false);

                            setTimeout(() => {
                                setIsLoggedUser([]);
                                setIsLoggedStatus([]);
                                setIsLoggedType('');
                                setIsActionBlock(false);
                                setIsModal(false);
                                return navigate("/",{replace: true});
                            },2500);
                        },750)
                    },1000);
                }catch(e){
                    setIsLoggedLog(false);
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });
            
            return Alert_Sonner_Promise(promise,'¡Cerrando sesión!','1');
        }
    },[isLoggedLog]);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const deleteSessionStorage = DeleteSessionStorage();
    const resetViews = ResetViews();
    const resetVariables = ResetVariables();
    // Función del componente
    if(!isLoggedLogged) return <Navigate to={'/'}/>;
    return isLoggedType==='Cocinero' || isLoggedType==='Nutriólogo' || isLoggedType==='Médico' ? <Outlet/> : <Navigate to={'/'}/>;
}