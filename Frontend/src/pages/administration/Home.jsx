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
import { Button_Icon_Blue_120 } from "../../components/styled/Buttons";
// Componentes personalizados
//____________IMPORT/EXPORT____________

// Componente para mostrar la seccion de inicio en administración/cocina
export default function Home_Administration(){
    // Constantes con el valor de los contextos 

    // Abrir pestaña
    const OpenPage = () => {
        if (window.electronAPI) {  // Asegúrate de que electronAPI esté definido
            window.electronAPI.openWindow(); // Llama a la función en preload.js
          } else {
            console.error('electronAPI no está disponible');
          }
    }
    // Estructura del componente
    return(
        <> 
            <Container_Row_90_Left>
                <Container_Row_90_Center>
                    <Button_Icon_Blue_120 onClick={() => OpenPage()}>
                        Abrir pestaña
                    </Button_Icon_Blue_120>
                </Container_Row_90_Center>
            </Container_Row_90_Left>
            <Container_Row_90_Left>
            </Container_Row_90_Left>    
        </>
    )
}