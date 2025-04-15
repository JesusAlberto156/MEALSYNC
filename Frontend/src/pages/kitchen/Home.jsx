//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
// Componentes de React externos

// Servicios

// Rutas

// Contextos

// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados
import { Container_Row_90_Left,Container_Row_90_Center } from "../../components/styled/Containers";
import { Img_Logo_Hospital_60 } from "../../components/styled/Imgs";
import { Text_Title_Fade_50 } from "../../components/styled/Text";
// Componentes personalizados
import User_Activity_Chart from "../../components/charts/UserActivity";
//____________IMPORT/EXPORT____________

// Componente para mostrar la seccion de inicio en administración/cocina
export default function Home_Kitchen(){
    // Constantes con el valor de los contextos 

    // Estructura del componente
    return(
        <> 
            <Container_Row_90_Left>
                <Img_Logo_Hospital_60/>
                <Container_Row_90_Center>
                    <Text_Title_Fade_50>BIENVENIDO(A) A MEALSYNC</Text_Title_Fade_50>
                </Container_Row_90_Center>
            </Container_Row_90_Left>
            <Container_Row_90_Left>
                <User_Activity_Chart/>
            </Container_Row_90_Left>    
        </>
    )
}