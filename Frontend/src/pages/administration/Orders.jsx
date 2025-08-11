//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { LoggedTypeContext } from "../../contexts/SessionProvider";
// Estilos personalizados
import { Container_Home_Section_Title } from "../../components/styled/Containers";
import { Text_Title_28_Black } from "../../components/styled/Text";
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Componente para mostrar la seccion de inicio en administración por por parte de los pedidos
export default function Administration_Orders(){
    // Constantes con el valor de los contextos 
    const [isLoggedType] = useContext(LoggedTypeContext);
    // Estructura del componente
    return(
        <> 
            {isLoggedType !== 'Almacenista' ? (
                <>        
                    <Container_Home_Section_Title>
                        <Text_Title_28_Black>SECCIÓN DE ORDENES</Text_Title_28_Black>
                    </Container_Home_Section_Title>   
                </>
            ):(
                <></>
            )}  
        </>
    )
}