//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { Outlet,useNavigate,Navigate } from "react-router-dom";
// Contextos
import { ModalViewContext,ModalContext } from "../contexts/ViewsProvider";
import { LoggedUserContext,LoggedLogContext,LoggedLoggedContext,LoggedPermissionsContext,LoggedStatusContext,LoggedTypeContext } from "../contexts/SessionProvider";
import { ActionBlockContext } from "../contexts/VariablesProvider";
import { TextFieldsUserContext,TextFieldsWarehouseOrderContext,TextFieldsCleaningCategoryContext,TextFieldsCleaningSupplyContext,TextFieldsFixedExpenseContext,TextFieldsSupplierContext,TextFieldsSupplyContext,TextFieldsDishContext,TextFieldsSideDishContext,TextFieldsDrinkContext,TextFieldsSupplyCategoryContext,TextFieldsSupplyTypesContext,TextFieldsMenuTypeContext } from "../contexts/FormsProvider";
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
        nombreProveedor: false,
        nombreCategoriaInsumo: false,
        nombreTipoInsumo: false,
        nombreInsumo: false,
        nombreCategoriaLimpieza: false,
        nombreSuministro: false,
        nombreGastoFijo: false,
        nombreMenu: false,
        nombrePlatillo: false,
        nombreGuarnicion: false,
        nombreBebida: false,
        nombreCorto: false,
        usuario: false,
        contrasena: false,
        rfc: false,
        domiclio: false,
        telefono: false,
        correo: false,
        descripcionCategoriaInsumo: false,
        descripcionTipoInsumo: false,
        descripcionInsumo: false,
        descripcionCategoriaLimpieza: false,
        descripcionSuministro: false,
        descripcionGastoFijo: false,
        descripcionPlatillo: false,
        descripcionGuarnicion: false,
        descripcionBebida: false,
        imagenInsumo: false,
        imagenSuministro: false,
        imagenPlatillo: false,
        imagenGuarnicion: false,
        imagenBebida: false,
        codigoInsumo: false,
        codigoSuministro: false,
        campus: false,
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
    const [isTextFieldsSupplier] = useContext(TextFieldsSupplierContext); 
    const [isTextFieldsSupplyCategory] = useContext(TextFieldsSupplyCategoryContext);
    const [isTextFieldsSupplyType] = useContext(TextFieldsSupplyTypesContext);
    const [isTextFieldsSupply] = useContext(TextFieldsSupplyContext);
    const [isTextFieldsCleaningCategory] = useContext(TextFieldsCleaningCategoryContext);
    const [isTextFieldsCleaningSupply] = useContext(TextFieldsCleaningSupplyContext); 
    const [isTextFieldsFixedExpense] = useContext(TextFieldsFixedExpenseContext);
    const [isTextFieldsWarehouseOrder] = useContext(TextFieldsWarehouseOrderContext);
    const [isTextFieldsMenuType] = useContext(TextFieldsMenuTypeContext); 
    const [isTextFieldsDish] = useContext(TextFieldsDishContext);
    const [isTextFieldsSideDish] = useContext(TextFieldsSideDishContext);
    const [isTextFieldsDrink] = useContext(TextFieldsDrinkContext);
    // useEffects para advertir en los campos de los text fields
    useEffect(() => {
        const fields = [
            // USUARIOS
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
                alertKey: 'nombreCorto',
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
            // PROVEEDORES
            {
                source: isTextFieldsSupplier,
                key: 'nombre',
                limit: 150,
                alertKey: 'nombreProveedor',
                message: '¡Ha alcanzado el límite de caracteres permitidos en el nombre!',
            },
            {
                source: isTextFieldsSupplier,
                key: 'rfc',
                limit: 30,
                alertKey: 'rfc',
                message: '¡Ha alcanzado el límite de caracteres permitidos en el RFC!',
            },
            {
                source: isTextFieldsSupplier,
                key: 'domicilio',
                limit: 150,
                alertKey: 'domicilio',
                message: '¡Ha alcanzado el límite de caracteres permitidos en el domiclio!',
            },
            {
                source: isTextFieldsSupplier,
                key: 'telefono',
                limit: 20,
                alertKey: 'telefono',
                message: '¡Ha alcanzado el límite de caracteres permitidos en el teléfono!',
            },
            {
                source: isTextFieldsSupplier,
                key: 'correo',
                limit: 150,
                alertKey: 'correo',
                message: '¡Ha alcanzado el límite de caracteres permitidos en el correo!',
            },
            // CATEGORIAS DE INSUMOS
            {
                source: isTextFieldsSupplyCategory,
                key: 'nombre',
                limit: 150,
                alertKey: 'nombreCategoriaInsumo',
                message: '¡Ha alcanzado el límite de caracteres permitidos en el nombre!',
            },
            {
                source: isTextFieldsSupplyCategory,
                key: 'descripcion',
                limit: 250,
                alertKey: 'descripcionCategoriaInsumo',
                message: '¡Ha alcanzado el límite de caracteres permitidos en la descripción!',
            },
            // TIPOS DE INSUMOS
            {
                source: isTextFieldsSupplyType,
                key: 'tipo',
                limit: 150,
                alertKey: 'nombreTipoInsumo',
                message: '¡Ha alcanzado el límite de caracteres permitidos en el nombre!',
            },
            {
                source: isTextFieldsSupplyType,
                key: 'descripcion',
                limit: 250,
                alertKey: 'descripcionTipoInsumo',
                message: '¡Ha alcanzado el límite de caracteres permitidos en la descripción!',
            },
            // INSUMOS
            {
                source: isTextFieldsSupply,
                key: 'codigo',
                limit: 20,
                alertKey: 'codigoInsumo',
                message: '¡Ha alcanzado el límite de caracteres permitidos en el código!',
            },
            {
                source: isTextFieldsSupply,
                key: 'nombre',
                limit: 150,
                alertKey: 'nombreInsumo',
                message: '¡Ha alcanzado el límite de caracteres permitidos en el nombre!',
            },
            {
                source: isTextFieldsSupply,
                key: 'descripcion',
                limit: 250,
                alertKey: 'descripcionInsumo',
                message: '¡Ha alcanzado el límite de caracteres permitidos en la descripción!',
            },
            {
                source: isTextFieldsSupply,
                key: 'imagen',
                limit: 10000,
                alertKey: 'imagenInsumo',
                message: '¡Ha alcanzado el límite de caracteres permitidos en la imagen!',
            },
            // CATEGORÍAS DE LIMPIEZA
            {
                source: isTextFieldsCleaningCategory,
                key: 'nombre',
                limit: 150,
                alertKey: 'nombreCategoriaLimpieza',
                message: '¡Ha alcanzado el límite de caracteres permitidos en el nombre!',
            },
            {
                source: isTextFieldsCleaningCategory,
                key: 'descripcion',
                limit: 250,
                alertKey: 'descripcionCategoriaLimpieza',
                message: '¡Ha alcanzado el límite de caracteres permitidos en la descripción!',
            },
            // SUMINISTROS DE LIMPIEZA
            {
                source: isTextFieldsCleaningSupply,
                key: 'codigo',
                limit: 20,
                alertKey: 'codigoSuministro',
                message: '¡Ha alcanzado el límite de caracteres permitidos en el código!',
            },
            {
                source: isTextFieldsCleaningSupply,
                key: 'nombre',
                limit: 150,
                alertKey: 'nombreSuministro',
                message: '¡Ha alcanzado el límite de caracteres permitidos en el nombre!',
            },
            {
                source: isTextFieldsCleaningSupply,
                key: 'descripcion',
                limit: 250,
                alertKey: 'descripcionSuministro',
                message: '¡Ha alcanzado el límite de caracteres permitidos en la descripción!',
            },
            {
                source: isTextFieldsCleaningSupply,
                key: 'imagen',
                limit: 10000,
                alertKey: 'imagenSuministro',
                message: '¡Ha alcanzado el límite de caracteres permitidos en la imagen!',
            },
            // GASTOS FIJOS
            {
                source: isTextFieldsFixedExpense,
                key: 'nombre',
                limit: 150,
                alertKey: 'nombreGastoFijo',
                message: '¡Ha alcanzado el límite de caracteres permitidos en el nombre!',
            },
            {
                source: isTextFieldsFixedExpense,
                key: 'descripcion',
                limit: 250,
                alertKey: 'descripcionGastoFijo',
                message: '¡Ha alcanzado el límite de caracteres permitidos en la descripción!',
            },
            // PEDIDOS DE ALMACÉN
            {
                source: isTextFieldsWarehouseOrder,
                key: 'campus',
                limit: 50,
                alertKey: 'campus',
                message: '¡Ha alcanzado el límite de caracteres permitidos en el campus!',
            },
            // MENUS
            {
                source: isTextFieldsMenuType,
                key: 'nombre',
                limit: 100,
                alertKey: 'nombreMenu',
                message: '¡Ha alcanzado el límite de caracteres permitidos en el nombre!',
            },
            // PLATILLOS
            {
                source: isTextFieldsDish,
                key: 'nombre',
                limit: 100,
                alertKey: 'nombrePlatillo',
                message: '¡Ha alcanzado el límite de caracteres permitidos en el nombre!',
            },
            {
                source: isTextFieldsDish,
                key: 'descripcion',
                limit: 500,
                alertKey: 'descripcionPlatillo',
                message: '¡Ha alcanzado el límite de caracteres permitidos en la descripción!',
            },
            {
                source: isTextFieldsDish,
                key: 'imagen',
                limit: 10000,
                alertKey: 'imagenPlatillo',
                message: '¡Ha alcanzado el límite de caracteres permitidos en la imagen!',
            },
            // GUARNICIONES
            {
                source: isTextFieldsSideDish,
                key: 'nombre',
                limit: 100,
                alertKey: 'nombreGuarnicion',
                message: '¡Ha alcanzado el límite de caracteres permitidos en el nombre!',
            },
            {
                source: isTextFieldsSideDish,
                key: 'descripcion',
                limit: 500,
                alertKey: 'descripcionGuarnicion',
                message: '¡Ha alcanzado el límite de caracteres permitidos en la descripción!',
            },
            {
                source: isTextFieldsSideDish,
                key: 'imagen',
                limit: 10000,
                alertKey: 'imagenGuarnicion',
                message: '¡Ha alcanzado el límite de caracteres permitidos en la imagen!',
            },
            // BEBIDAS
            {
                source: isTextFieldsDrink,
                key: 'nombre',
                limit: 100,
                alertKey: 'nombreBebida',
                message: '¡Ha alcanzado el límite de caracteres permitidos en el nombre!',
            },
            {
                source: isTextFieldsDrink,
                key: 'descripcion',
                limit: 500,
                alertKey: 'descripcionBebida',
                message: '¡Ha alcanzado el límite de caracteres permitidos en la descripción!',
            },
            {
                source: isTextFieldsDrink,
                key: 'imagen',
                limit: 10000,
                alertKey: 'imagenBebida',
                message: '¡Ha alcanzado el límite de caracteres permitidos en la imagen!',
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
    }, [isTextFieldsUser,isTextFieldsSupplier,isTextFieldsWarehouseOrder,isTextFieldsCleaningCategory,isTextFieldsCleaningSupply,isTextFieldsFixedExpense,isTextFieldsSupplyCategory,isTextFieldsDish,isTextFieldsSideDish,isTextFieldsDrink,isTextFieldsSupplyType,isTextFieldsSupply,isTextFieldsMenuType,alertShown]);
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