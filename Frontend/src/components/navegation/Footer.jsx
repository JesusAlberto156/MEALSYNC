//____________IMPORT/EXPORT____________
// Estilos personalizados
import { Container_Column_Black_Width_100_Center } from "../styled/Containers";
import { Text_Span_16_Center } from "../styled/Text";
//____________IMPORT/EXPORT____________

// Componente para navegar entre paginas en la parte inferior
export default function Footer(){
  // Estructura del componente
  return (
    <>
      <Container_Column_Black_Width_100_Center className="scale-shadow-in-dark">
        <Text_Span_16_Center>© {new Date().getFullYear()} - MEALSYNC Hospital Puerta de Hierro Tepic. Todos los derechos reservados.</Text_Span_16_Center>
      </Container_Column_Black_Width_100_Center>
    </>
  );
}