//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { Outlet,useNavigate,Navigate } from "react-router-dom";
// Contextos
import { ModalViewContext,ModalContext } from "../contexts/ViewsProvider";
import { LoggedUserContext,LoggedLogContext,LoggedLoggedContext,LoggedPermissionsContext,LoggedStatusContext,LoggedTypeContext } from "../contexts/SessionProvider";
import { ActionBlockContext } from "../contexts/VariablesProvider";
import { TextFieldsUserContext,TextFieldsMenuTypeContext } from "../contexts/FormsProvider";
// Hooks personalizados
import { DeleteSessionStorage,ResetViews,ResetVariables } from "../hooks/Session";
// Estilos personalizados
import { Alert_Sonner_Warning,Alert_Sonner_Promise } from "../components/styled/Alerts";
//____________IMPORT/EXPORT____________

// Componente para proteger las rutas de la pagina
export const PrivateRouteAdministration = () => {
    // Contantes con el valor de los usestate
    const [alertShown, setAlertShown] = useState({
        nombreUsuario: false,
        nombreCortoUsuario: false,
        usuario: false,
        contrasena: false,
    });
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
    const [isTextFieldsUser] = useContext(TextFieldsUserContext);
    const [isTextFieldsMenuType] = useContext(TextFieldsMenuTypeContext); 
    // useEffects para advertir en los campos de los text fields
    useEffect(() => {
        const fields = [
            {
                source: isTextFieldsUser,
                key: 'nombre',
                limit: 150,
                alertKey: 'nombreUsuario',
                message: '¡Ha alcanzado el límite de caracteres permitidos en el nombre!',
            },
            {
                source: isTextFieldsUser,
                key: 'nombrecorto',
                limit: 50,
                alertKey: 'nombreCortoUsuario',
                message: '¡Ha alcanzado el límite de caracteres permitidos en el nombre corto!',
            },
            {
                source: isTextFieldsUser,
                key: 'usuario',
                limit: 25,
                alertKey: 'usuario',
                message: '¡Ha alcanzado el límite de caracteres permitidos en el usuario!',
            },
            {
                source: isTextFieldsUser,
                key: 'contrasena',
                limit: 15,
                alertKey: 'contrasena',
                message: '¡Ha alcanzado el límite de caracteres permitidos en la contraseña!',
            },
            {
                source: isTextFieldsMenuType,
                key: 'nombre',
                limit: 100,
                alertKey: 'nombreMenu',
                message: '¡Ha alcanzado el límite de caracteres permitidos en el nombre!',
            },
            // Puedes seguir agregando más campos y objetos aquí...
        ];

        fields.forEach(({ source, key, limit, alertKey, message }) => {
            const value = source[key] || '';

            if (value.length === limit && !alertShown[alertKey]) {
                Alert_Sonner_Warning(message);
                setAlertShown(prev => ({ ...prev, [alertKey]: true }));
            }

            if (value.length < limit && alertShown[alertKey]) {
                setAlertShown(prev => ({ ...prev, [alertKey]: false }));
            }
        });
    }, [isTextFieldsUser,isTextFieldsMenuType,alertShown]);
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
    return isLoggedType==='Administrador' || isLoggedType==='Chef' || isLoggedType==='Almacenista' ? <Outlet/> : <Navigate to={'/'}/>;
}