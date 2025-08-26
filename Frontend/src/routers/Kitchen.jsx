//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useRef,useState } from "react";
import { Outlet,useNavigate,Navigate } from "react-router-dom";
// Contextos
import { ModalViewContext,ModalContext } from "../contexts/ViewsProvider";
import { LoggedUserContext,LoggedLogContext,LoggedLoggedContext,LoggedPermissionsContext,LoggedStatusContext,LoggedTypeContext } from "../contexts/SessionProvider";
import { ActionBlockContext } from "../contexts/VariablesProvider";
import { TextFieldsOrderDoctorContext,TextFieldsOrderKitchenContext } from "../contexts/FormsProvider";
// Hooks personalizados
import { DeleteSessionStorage,ResetViews,ResetVariables } from "../hooks/Session";
import { ResetTextFieldsOrderKitchen,ResetTextFieldsOrderDoctor } from "../hooks/orders/Texts";
// Estilos personalizados
import { Alert_Sonner_Promise,Alert_Sonner_Warning,Alert_Swal_Error } from "../components/styled/Alerts";
//____________IMPORT/EXPORT____________

// Componente para proteger las rutas de la pagina
export const PrivateRouteKitchen = () => {
    const [timeLeft, setTimeLeft] = useState(900);
    const lastActivityRef = useRef(Date.now());

    const resetTimer = () => {
        lastActivityRef.current = Date.now();
        setTimeLeft(900);
    };

    useEffect(() => {
        const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];
        events.forEach((event) => window.addEventListener(event, resetTimer));

        return () => {
            events.forEach((event) => window.removeEventListener(event, resetTimer));
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - lastActivityRef.current) / 1000);
            const remaining = 900 - elapsed;
            if (remaining <= 0) {
                clearInterval(interval);
                Alert_Swal_Error('¡Sesión expirada por inactividad!');
                setTimeout(() => setIsLoggedLog(true), 5000);
                setTimeLeft(0);
            } else {
                setTimeLeft(remaining);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    // Contantes con el valor de los usestate
    const [alertShown, setAlertShown] = useState({
        solicitante: false,
        clave: false,
        ubicacion: false,
        encargado: false,
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
    const [isTextFieldsOrderDoctor] = useContext(TextFieldsOrderDoctorContext);
    const [isTextFieldsOrderKitchen] = useContext(TextFieldsOrderKitchenContext);  
    // useEffects para advertir en los campos de los text fields
    useEffect(() => {
        const fields = [
            // ORDENES DE COCINA
            {
                source: isTextFieldsOrderKitchen,
                key: 'ubicacion',
                limit: 250,
                alertKey: 'ubicacion',
                message: '¡Ha alcanzado el límite de caracteres permitidos en la ubicación exacta!',
            },
            {
                source: isTextFieldsOrderKitchen,
                key: 'encargado',
                limit: 150,
                alertKey: 'encargado',
                message: '¡Ha alcanzado el límite de caracteres permitidos con el encargado!',
            },
            // ORDENES DE DOCTOR
            {
                source: isTextFieldsOrderDoctor,
                key: 'solicitante',
                limit: 150,
                alertKey: 'solicitante',
                message: '¡Ha alcanzado el límite de caracteres permitidos en el solicitante!',
            },
            {
                source: isTextFieldsOrderDoctor,
                key: 'clavesecreta',
                limit: 20,
                alertKey: 'clave',
                message: '¡Ha alcanzado el límite de caracteres permitidos en la clave de autorización!',
            },
        ];

        function getNestedValue(obj, path) {
            return path.split('.').reduce((acc, part) => {
                if (acc === undefined || acc === null) return undefined;
                const arrayMatch = part.match(/^(\w+)\[(\d+)\]$/);
                if (arrayMatch) {
                    const [, key, index] = arrayMatch;
                    return acc[key]?.[parseInt(index, 10)];
                }
                return acc[part];
            }, obj);
        }

        fields.forEach(({ source, key, limit, alertKey, message }) => {
            const value = getNestedValue(source, key);

            if (typeof value === 'string') {
                if (value.length === limit && !alertShown[alertKey]) {
                    Alert_Sonner_Warning(message);
                    setAlertShown(prev => ({ ...prev, [alertKey]: true }));
                }

                if (value.length < limit && alertShown[alertKey]) {
                    setAlertShown(prev => ({ ...prev, [alertKey]: false }));
                }
            }
        });
    }, [isTextFieldsOrderDoctor,isTextFieldsOrderKitchen,alertShown]);
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
                            resetTextFieldsOrderKitchen();
                            resetTextFieldsOrderDoctor();
                            
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
    const resetTextFieldsOrderKitchen = ResetTextFieldsOrderKitchen();
    const resetTextFieldsOrderDoctor = ResetTextFieldsOrderDoctor();
    // Función del componente
    if(!isLoggedLogged) return <Navigate to={'/'}/>;
    return isLoggedType==='Cocinero' || isLoggedType==='Nutriólogo' || isLoggedType==='Médico' ? <Outlet/> : <Navigate to={'/'}/>;
}