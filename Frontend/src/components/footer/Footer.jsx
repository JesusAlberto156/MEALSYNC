import { Background_Footer } from "../styled/Backgrounds";
import { Text_Footer } from "../styled/Text";
import { Link } from "../styled/Buttons";
import { Container_Button_Footer } from "../styled/Containers";

export default function Footer(){
  return (
    <>
      <Background_Footer>
        <Text_Footer>© {new Date().getFullYear()} - MEALSYNC Hospital Puerta de Hierro Tepic. Todos los derechos reservados.</Text_Footer>
          <Container_Button_Footer>
            <Link>Acerca de</Link>
            <Link>Contacto</Link>
            <Link>Privacidad</Link>
          </Container_Button_Footer>
      </Background_Footer>
    </>
  );
}