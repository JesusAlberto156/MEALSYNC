//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { LoggedTypeContext } from "../../contexts/SessionProvider";
import { ThemeModeContext } from "../../contexts/ViewsProvider";
// Hooks personalizados
import { HandleNavbarView } from "../../hooks/Views";
import { HandleSidebarView } from "../../hooks/Views";
// Estilos personalizados
import { Container_Column_100_Center,Container_Row_100_Center,Container_Row_NG_100_Center,Container_Column_NG_100_Center } from "../../components/styled/Containers";
import { Text_Title_30_Center,Text_P_16_Center,Text_P_12_Center,Text_16_Center } from "../../components/styled/Text";
import { Img_Logo_Horizontal_Hospital_400 } from "../../components/styled/Imgs";
import { Button_Link_Blue } from "../../components/styled/Buttons";
// Componentes personalizados
import Chart_Activity from "../../components/charts/users/Activity";
import Table_Permissions_Super_Administrators from "../../components/tables/totals/users/SuperAdministrators";
import Table_Permissions_Administrators from "../../components/tables/totals/users/Administrators";
import Table_Permissions_Chefs from "../../components/tables/totals/users/Chefs";
import Table_Permissions_Storekeepers from "../../components/tables/totals/users/Storekeepers";
import Table_Permissions_Cooks from "../../components/tables/totals/users/Cooks";
import Table_Permissions_Nutritionists from "../../components/tables/totals/users/Nutritionists";
import Table_Permissions_Doctors from "../../components/tables/totals/users/Doctors";
//____________IMPORT/EXPORT____________

// Componente para mostrar la seccion de inicio en administración/cocina
export default function Administration_Users(){
    // Constantes con el valor de los contextos 
    const [isLoggedType] = useContext(LoggedTypeContext);
    const [themeMode] = useContext(ThemeModeContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleSidebarView = HandleSidebarView();
    const handleNavbarView = HandleNavbarView();
    // Estructura del componente
    return(
        <> 
            {isLoggedType === 'Administrator' ? (
                <Container_Column_100_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                    <Container_Row_100_Center>
                        <Text_Title_30_Center ThemeMode={themeMode}>SECCIÓN DE USUARIOS</Text_Title_30_Center>
                    </Container_Row_100_Center>
                    <Container_Row_NG_100_Center>
                        <Container_Column_NG_100_Center>
                            <Chart_Activity/>
                            <Container_Row_100_Center>
                                <Button_Link_Blue ThemeMode={themeMode}
                                    onClick={() => {
                                        handleSidebarView('Users');
                                        handleNavbarView('Status')
                                        sessionStorage.setItem('Route','/Administration/Index/Status');
                                        navigate('/Administration/Index/Status',{ replace: true });
                                    }}
                                >
                                    <Text_16_Center>Ver activos/inactivos...</Text_16_Center>
                                </Button_Link_Blue>
                                <Button_Link_Blue ThemeMode={themeMode}
                                    onClick={() => {
                                        handleSidebarView('Users');
                                        handleNavbarView('Users')
                                        sessionStorage.setItem('Route','/Administration/Index/Users');
                                        navigate('/Administration/Index/Users',{ replace: true });
                                    }}
                                >
                                    <Text_16_Center>Ver usuarios...</Text_16_Center>
                                </Button_Link_Blue>
                            </Container_Row_100_Center>
                            <Img_Logo_Horizontal_Hospital_400/>
                            
                        </Container_Column_NG_100_Center>
                        <Container_Column_NG_100_Center>
                            <Text_P_16_Center ThemeMode={themeMode}>REPORTE DE PERMISOS</Text_P_16_Center>
                            <Table_Permissions_Super_Administrators/>
                            <Container_Row_NG_100_Center>
                                <Container_Column_NG_100_Center>
                                    <Text_P_12_Center ThemeMode={themeMode}>Área de administración</Text_P_12_Center>
                                    <Table_Permissions_Administrators/>
                                    <Table_Permissions_Chefs/>
                                    <Table_Permissions_Storekeepers/>
                                </Container_Column_NG_100_Center>
                                <Container_Column_NG_100_Center>
                                    <Text_P_12_Center ThemeMode={themeMode}>Área de cocina</Text_P_12_Center>
                                    <Table_Permissions_Cooks/>
                                    <Table_Permissions_Nutritionists/>
                                    <Table_Permissions_Doctors/>
                                </Container_Column_NG_100_Center>
                            </Container_Row_NG_100_Center>
                            <Button_Link_Blue ThemeMode={themeMode}
                                onClick={() => {
                                    handleSidebarView('Users');
                                    handleNavbarView('Permissions')
                                    sessionStorage.setItem('Route','/Administration/Index/Permissions');
                                    navigate('/Administration/Index/Permissions',{ replace: true });
                                }}
                            >
                                <Text_16_Center>Mas detalles...</Text_16_Center>
                            </Button_Link_Blue>
                        </Container_Column_NG_100_Center>
                    </Container_Row_NG_100_Center>
                </Container_Column_100_Center>  
            ):(
                <></>
            )}   
        </>
    )
}