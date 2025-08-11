//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
// Componentes de React externos

// Servicios

// Rutas

// Contextos
import { LoggedPermissionsContext } from "../../contexts/SessionProvider";
import { SelectedOptionOrderPlusContext } from "../../contexts/SelectedesProvider";
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados
import { Container_Home_Section_Title } from "../../components/styled/Containers";
import { Text_Title_28_Black } from "../../components/styled/Text";
// Componentes personalizados
import Table_Total_Supplies from "../../components/tables/totals/Invetory/Supplies";
import Table_Dishes from "../../components/tables/orders/kitchen/Dishes";
import Table_Side_Dishes from "../../components/tables/orders/kitchen/SideDishes";
import Table_Drinks from "../../components/tables/orders/kitchen/Drinks";
//____________IMPORT/EXPORT____________

// Componente para mostrar la seccion de inicio en administración/cocina
export default function Kitchen_Orders(){
    // Constantes con el valor de los contextos 
    const [isLoggedPermissions] = useContext(LoggedPermissionsContext); 
    const [isSelectedOptionOrderPlus,setIsSelectedOptionOrderPlus] = useContext(SelectedOptionOrderPlusContext); 
    // Estructura del componente
    return(
        <> 
            {isSelectedOptionOrderPlus === 'Platillos' ? (
                <Table_Dishes/>
            ):(
                <></>
            )}
            {isSelectedOptionOrderPlus === 'Guarniciones' ? (
                <Table_Side_Dishes/>
            ):(
                <></>
            )}
            {isSelectedOptionOrderPlus === 'Bebidas' ? (
                <Table_Drinks/>
            ):(
                <></>
            )}
        </>
    )
}