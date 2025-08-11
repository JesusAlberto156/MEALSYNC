//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { TextFieldsSearchDateContext } from "../../contexts/FormsProvider";
import { LoggedTypeContext } from "../../contexts/SessionProvider";
import { SuppliersContext,ObservationsContext } from "../../contexts/SuppliersProvider";
import { ActionBlockContext } from "../../contexts/VariablesProvider";
// Hooks personalizados
import { HandleNavbarView } from "../../hooks/Views";
import { HandleSidebarView } from "../../hooks/Views";
// Estilos personalizados
import { Container_Home_Section_Title,Container_Home_Section,Container_Home_Section_Column_50_Left,Container_Home_Section_Header,Container_Home_Section_Column_Scroll_Left,Container_Column_NG_100_Left,Container_Home_Section_Footer_Left } from "../../components/styled/Containers";
import { Text_Title_16_Black,Text_Title_28_Black } from "../../components/styled/Text";
import { Button_Link_Blue_Auto } from "../../components/styled/Buttons";
// Componentes personalizados
import Chart_Calification from "../../components/charts/suppliers/Calification";
import Table_Purchases from "../../components/tables/totals/suppliers/Purchases";
//____________IMPORT/EXPORT____________

// Componente para mostrar la seccion de inicio en administración/cocina
export default function Administration_Suppliers(){
    // Constantes con el valor de los contextos 
    const [isLoggedType] = useContext(LoggedTypeContext);
    const [isSuppliers] = useContext(SuppliersContext);
    const [isObservations] = useContext(ObservationsContext);
    const [isActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsSearchDate,setIsTextFieldsSearchDate] = useContext(TextFieldsSearchDateContext); 
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleSidebarView = HandleSidebarView();
    const handleNavbarView = HandleNavbarView();
    // UseEffect para cargar la fecha actual 
    useEffect(() => {
        setIsTextFieldsSearchDate(prev => ({
            ...prev,
            año: new Date().getFullYear(),
            mes: new Date().getMonth() + 1,
        }))
    },[])
    // Estructura del componente
    return(
        <> 
            <Container_Home_Section_Title>
                <Text_Title_28_Black>SECCIÓN DE PROVEEDORES</Text_Title_28_Black>
            </Container_Home_Section_Title>
            <Container_Home_Section>
                <Container_Home_Section_Column_50_Left>
                    <Container_Home_Section_Header>
                        <Text_Title_16_Black>CALIFICACIÓN</Text_Title_16_Black>
                    </Container_Home_Section_Header>
                    <Container_Home_Section_Column_Scroll_Left>
                        <Chart_Calification
                            isSuppliers={isSuppliers}
                            isObservations={isObservations}
                        />
                    </Container_Home_Section_Column_Scroll_Left>
                    <Container_Column_NG_100_Left>
                        <Container_Home_Section_Footer_Left>
                            <Button_Link_Blue_Auto
                                disabled={isActionBlock}
                                onClick={() => {
                                    handleSidebarView('Proveedores');
                                    handleNavbarView('Proveedores')
                                    sessionStorage.setItem('Ruta','/Administration/Index/Suppliers/Suppliers');
                                    navigate('/Administration/Index/Suppliers/Suppliers',{ replace: true });
                                }}
                            >
                                Ver información de proveedores...
                            </Button_Link_Blue_Auto>
                        </Container_Home_Section_Footer_Left>
                    </Container_Column_NG_100_Left>
                </Container_Home_Section_Column_50_Left>
                <Container_Home_Section_Column_50_Left>
                    <Container_Home_Section_Header>
                        <Text_Title_16_Black>GASTO FINANCIERO DEL MES DE -</Text_Title_16_Black>
                        <select
                            value={isTextFieldsSearchDate.mes}
                            onChange={({ target: { value } }) => setIsTextFieldsSearchDate(prev => ({ ...prev, mes: parseInt(value) }))}
                            style={{
                                fontFamily: 'Century Gothic',
                                fontSize: '16px',
                                borderRadius: '15px',
                                border: '2px solid black',
                                padding:'5px',
                                background: 'white',
                            }}
                        >
                            {Array.from({ length: isTextFieldsSearchDate.año === new Date().getFullYear() ? new Date().getMonth() + 1 : 12 }, (_, i) => (
                                <option key={i} value={i+1}>
                                    {new Date(0, i).toLocaleString("es", { month: "long" }).toUpperCase()}
                                </option>
                            ))}
                        </select>
                        <Text_Title_16_Black>- DEL -</Text_Title_16_Black>
                        <select
                            value={isTextFieldsSearchDate.año}
                            onChange={({ target: { value } }) => setIsTextFieldsSearchDate(prev => ({ ...prev, año: parseInt(value) }))}
                            style={{
                                fontFamily: 'Century Gothic',
                                fontSize: '16px',
                                borderRadius: '15px',
                                border: '2px solid black',
                                padding:'5px',
                                background: 'white',
                            }}
                        >
                            {Array.from({ length: 51 }, (_, i) => {
                                const year = new Date().getFullYear() - i;
                                return <option key={year} value={year}>{year}</option>;
                            })}
                        </select>
                        <Text_Title_16_Black>-</Text_Title_16_Black>
                    </Container_Home_Section_Header>
                    <Table_Purchases/>
                </Container_Home_Section_Column_50_Left>
            </Container_Home_Section>   
        </>
    )
}