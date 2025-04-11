//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos

// Contextos
import { themeModeContext } from "../../contexts/ViewsProvider";
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados
import { Container_Footer,Container_100_Center } from "../styled/Containers";
import { Text_A_Center_16 } from "../styled/Text";
import { Button_Link_150 } from "../styled/Buttons";
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Componente para navegar entre paginas en la parte inferior
export default function Footer(){
  // Constantes con el valor de los contextos
  const [themeMode] = useContext(themeModeContext);
  // Estructura del componente
  return (
    <>
      <Container_Footer ThemeMode={themeMode}>
        <Text_A_Center_16 ThemeMode={themeMode}>© {new Date().getFullYear()} - MEALSYNC Hospital Puerta de Hierro Tepic. Todos los derechos reservados.</Text_A_Center_16>
          <Container_100_Center>
            <Button_Link_150 ThemeMode={themeMode}>Acerca de</Button_Link_150>
            <Button_Link_150 ThemeMode={themeMode}>Contacto</Button_Link_150>
            <Button_Link_150 ThemeMode={themeMode}>Privacidad</Button_Link_150>
          </Container_100_Center>
      </Container_Footer>
    </>
  );
}