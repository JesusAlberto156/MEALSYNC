//____________IMPORT/EXPORT____________
// Estilos personalizados
import { Container_Footer_Column_Black } from "../styled/Containers";
import { Text_Span_16_Center_White } from "../styled/Text";
//____________IMPORT/EXPORT____________

// Componente para navegar entre paginas en la parte inferior
export default function Footer(){
  // Estructura del componente
  return (
    <>
      <Container_Footer_Column_Black className="scale-shadow-in-dark">
        <Text_Span_16_Center_White>© {new Date().getFullYear()} - MEALSYNC Hospital Puerta de Hierro Tepic. Todos los derechos reservados.</Text_Span_16_Center_White>
      </Container_Footer_Column_Black>
    </>
  );
}