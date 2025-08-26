//____________IMPORT/EXPORT____________
// Hook de react
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { LoggedLoggedContext,LoggedTypeContext,LoggedPermissionsContext } from "../../contexts/SessionProvider";
import { ActionBlockContext } from "../../contexts/VariablesProvider";
// Hooks personalizados
import { HandleModalView } from "../../hooks/Views";
// Estilos personalizados
import { Container_Footer_Column_Black } from "../styled/Containers";
import { Text_Span_16_Center_White } from "../styled/Text";
import { Button_Link_White_Auto } from "../styled/Buttons";
//____________IMPORT/EXPORT____________

// Componente para navegar entre paginas en la parte inferior
export default function Footer(){
  //Constantes con el valor de los contextos
  const [isLoggedType] = useContext(LoggedTypeContext);
  const [isLoggedLogged] = useContext(LoggedLoggedContext);
  const [isLoggedPermissions] = useContext(LoggedPermissionsContext);
  const [isActionBlock] = useContext(ActionBlockContext);
  // constantes con el valor de los hooks
  const navigate = useNavigate();
  const handleModalView = HandleModalView();
  // Estructura del componente
  return (
    <>
      <Container_Footer_Column_Black className="scale-shadow-in-dark">
        <Text_Span_16_Center_White>© {new Date().getFullYear()} - MEALSYNC Hospital Puerta de Hierro Tepic. Todos los derechos reservados.</Text_Span_16_Center_White>
        {(isLoggedLogged && isLoggedType === 'Chef') || (isLoggedLogged && isLoggedType === 'Administrador' && isLoggedPermissions.superadministrador) ? (
          <>
            <Button_Link_White_Auto
              disabled={isActionBlock}
              onClick={() => {
                handleModalView('Clave-Secreta');
                navigate('/Administration/Authorization_Key',{ replace: true });
              }}
            >
              Ver clave de autorización...
            </Button_Link_White_Auto>
          </> 
        ):(
          <></>
        )}
      </Container_Footer_Column_Black>
    </>
  );
}