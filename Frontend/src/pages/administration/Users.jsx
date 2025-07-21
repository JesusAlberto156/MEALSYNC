//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { LoggedTypeContext } from "../../contexts/SessionProvider";
import { ActionBlockContext } from "../../contexts/VariablesProvider";
// Hooks personalizados
import { HandleNavbarView } from "../../hooks/Views";
import { HandleSidebarView } from "../../hooks/Views";
// Estilos personalizados
import { Container_Home_Section,Container_Home_Section_Title,Container_Home_Section_Header,Container_Home_Section_Footer_Left,Container_Row_100_Center,Container_Home_Section_Column_50_Left,Container_Home_Section_Body,Container_Home_Section_Column_Scroll_Left,Container_Home_Section_Footer_Right,Container_Row_100_Right,Container_Column_NG_100_Left } from "../../components/styled/Containers";
import { Text_Title_16_Black,Text_Title_28_Black,Text_Span_12_Center_Black } from "../../components/styled/Text";
import { Button_Link_Blue_Auto } from "../../components/styled/Buttons";
// Componentes personalizados
import Chart_Activity from "../../components/charts/users/Activity";
import Table_Permissions_Super_Administrators from "../../components/tables/totals/users/SuperAdministrators";
import Table_Permissions_Administration from "../../components/tables/totals/users/Administration";
import Table_Permissions_Kitchen from "../../components/tables/totals/users/Kitchen";
//____________IMPORT/EXPORT____________

// Componente para mostrar la seccion de inicio en administración/cocina
export default function Administration_Users(){
    // Constantes con el valor de los contextos 
    const [isLoggedType] = useContext(LoggedTypeContext);
    const [isActionBlock] = useContext(ActionBlockContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleSidebarView = HandleSidebarView();
    const handleNavbarView = HandleNavbarView();
    // Estructura del componente
    return(
        <> 
            {isLoggedType === 'Administrador' ? (
                <>
                    <Container_Home_Section_Title>
                        <Text_Title_28_Black>SECCIÓN DE USUARIOS</Text_Title_28_Black>
                    </Container_Home_Section_Title>
                    <Container_Home_Section>
                        <Container_Home_Section_Column_50_Left>
                            <Container_Home_Section_Header>
                                <Text_Title_16_Black>ACTIVIDAD DE USUARIOS</Text_Title_16_Black>
                            </Container_Home_Section_Header>
                            <Container_Home_Section_Column_Scroll_Left>
                                <Chart_Activity/>
                            </Container_Home_Section_Column_Scroll_Left>
                            <Container_Column_NG_100_Left>
                                <Container_Home_Section_Footer_Left>
                                    <Button_Link_Blue_Auto
                                        disabled={isActionBlock}
                                        onClick={() => {
                                            handleSidebarView('Usuarios');
                                            handleNavbarView('Estatus')
                                            sessionStorage.setItem('Ruta','/Administration/Index/Users/Status');
                                            navigate('/Administration/Index/Users/Status',{ replace: true });
                                        }}
                                    >
                                        Ver activos/inactivos...
                                    </Button_Link_Blue_Auto>
                                    <Button_Link_Blue_Auto
                                        disabled={isActionBlock}
                                        onClick={() => {
                                            handleSidebarView('Usuarios');
                                            handleNavbarView('Usuarios')
                                            sessionStorage.setItem('Ruta','/Administration/Index/Users/Users');
                                            navigate('/Administration/Index/Users/Users',{ replace: true });
                                        }}
                                    >
                                        Ver usuarios...
                                    </Button_Link_Blue_Auto>
                                </Container_Home_Section_Footer_Left>
                            </Container_Column_NG_100_Left>
                        </Container_Home_Section_Column_50_Left>
                        <Container_Home_Section_Column_50_Left>
                            <Container_Home_Section_Header>
                                <Text_Title_16_Black>REPORTE DE PERMISOS</Text_Title_16_Black>
                            </Container_Home_Section_Header>
                            <Container_Home_Section_Column_Scroll_Left>
                                <Table_Permissions_Super_Administrators/>
                                <Container_Row_100_Center>
                                    <Container_Home_Section_Body>
                                        <Text_Span_12_Center_Black>Área de administración</Text_Span_12_Center_Black>
                                    </Container_Home_Section_Body>
                                </Container_Row_100_Center>
                                <Table_Permissions_Administration/>
                                <Container_Row_100_Center>
                                    <Container_Home_Section_Body>
                                        <Text_Span_12_Center_Black>Área de cocina</Text_Span_12_Center_Black>
                                    </Container_Home_Section_Body>
                                </Container_Row_100_Center>
                                <Table_Permissions_Kitchen/>
                            </Container_Home_Section_Column_Scroll_Left>
                            <Container_Row_100_Right>
                                <Container_Home_Section_Footer_Right>
                                    <Button_Link_Blue_Auto
                                        disabled={isActionBlock}
                                        onClick={() => {
                                            handleSidebarView('Usuarios');
                                            handleNavbarView('Permisos')
                                            sessionStorage.setItem('Ruta','/Administration/Index/Users/Permissions');
                                            navigate('/Administration/Index/Users/Permissions',{ replace: true });
                                        }}
                                    >
                                        Ver permisos...
                                    </Button_Link_Blue_Auto>
                                </Container_Home_Section_Footer_Right>
                            </Container_Row_100_Right>
                        </Container_Home_Section_Column_50_Left>
                    </Container_Home_Section>
                </>
            ):(
                <></>
            )}   
        </>
    )
}