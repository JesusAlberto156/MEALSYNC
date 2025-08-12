//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { SelectedOptionOrderPlusContext } from "../../contexts/SelectedesProvider";
// Componentes personalizados
import Table_Dishes from "../../components/tables/orders/kitchen/Dishes";
import Table_Side_Dishes from "../../components/tables/orders/kitchen/SideDishes";
import Table_Drinks from "../../components/tables/orders/kitchen/Drinks";
//____________IMPORT/EXPORT____________

// Componente para mostrar la seccion de inicio en administración/cocina
export default function Kitchen_Orders(){
    // Constantes con el valor de los contextos  
    const [isSelectedOptionOrderPlus] = useContext(SelectedOptionOrderPlusContext); 
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