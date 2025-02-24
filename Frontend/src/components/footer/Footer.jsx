import "./Footer.css"; 
import { Background,Whitespace,Label } from "../styled/Footer";

export default function Footer(){
  return (
    <>
      <Whitespace/>
      <Background>
        <Label>© {new Date().getFullYear()} - MEALSYNC Hospital Puerta de Hierro Tepic. Todos los derechos reservados.</Label>
        <div className="footer-links">
          <a href="/Productos">Acerca de</a>
          <a href="/Inventarios">Contacto</a>
          <a href="/Ventas">Privacidad</a>
        </div>
      </Background>
    </>
  );
}