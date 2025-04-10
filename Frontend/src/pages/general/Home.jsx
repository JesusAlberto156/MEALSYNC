//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
// Componentes de React externos
import { Toaster } from "sonner";
// Servicios

// Rutas

// Contextos
import { themeModeContext } from "../../contexts/ViewsProvider";
import { userContext } from "../../contexts/UsersProvider"; 
import { typeUserContext } from "../../contexts/VariablesProvider";
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados
import { Alert_Styles,Alert_Greeting } from "../../components/styled/Alerts";
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Componente para mostrar la seccion de inicio en administración/cocina
export default function Home(){
    // Constantes con el valor de los contextos 
    const [themeMode] = useContext(themeModeContext);
    const [isUser] = useContext(userContext);
    const [isTypeUser] = useContext(typeUserContext);
    // useEffect con el titulo de la página
    useEffect(() => {
        if(isTypeUser === 'Cook' || isTypeUser === 'Nutritionist' || isTypeUser === 'Doctor'){
            document.title = "MEALSYNC_Cocina"
            Alert_Greeting("MEALSYNC",'¡Le ofrece las siguientes opciones de menú!...');
        }
        if(isTypeUser==='Administrator' || isTypeUser==='Chef' || isTypeUser==='Storekeeper'){
            document.title = "MEALSYNC_Administración"
            Alert_Greeting("MEALSYNC",'¡Le ofrece las siguientes opciones de administración!...');
        }
        Alert_Greeting('Bienvenido(a)',`¡${isUser.nombrecorto}!...`);
    },[]);
    // Estructura del componente
    return(
        <> 
            <h1>Modulo de Inicio</h1>      
        </>
    )
}