//____________IMPORT/EXPORT____________
// Estilos personalizados
import { Container_Row_90_Center,Container_Column_Black_Width_100_Center } from "../styled/Containers";
import { Text_Span_16 } from "../styled/Text";
import { Button_Link_Blue } from "../styled/Buttons";
//____________IMPORT/EXPORT____________

// Componente para navegar entre paginas en la parte inferior
export default function Footer(){
  // Estructura del componente
  return (
    <>
      <Container_Column_Black_Width_100_Center className="scale-shadow-in-dark">
        <Text_Span_16>© {new Date().getFullYear()} - MEALSYNC Hospital Puerta de Hierro Tepic. Todos los derechos reservados.</Text_Span_16>
          <Container_Row_90_Center>
            <Button_Link_Blue>
              <Text_Span_16>Acerca de</Text_Span_16>
            </Button_Link_Blue>
            <Button_Link_Blue>
              <Text_Span_16>Contacto</Text_Span_16>
            </Button_Link_Blue>
            <Button_Link_Blue>
              <Text_Span_16>Privacidad</Text_Span_16>
            </Button_Link_Blue>
          </Container_Row_90_Center>
      </Container_Column_Black_Width_100_Center>
    </>
  );
}