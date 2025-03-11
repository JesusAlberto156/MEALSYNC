import { useEffect } from "react";

import { Alert_Blue } from "../components/styled/Notifications";

export default function Administrator(){
    
    useEffect(() => {
        document.title = "MEALSYNC_Administración_Inicio"
        Alert_Blue("¡Bienvenido(a) a MEALSYNC!");
    },[]);
    return(
        <><h1>Modulo de administrador</h1></>
    );
}