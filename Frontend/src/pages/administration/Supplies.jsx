//____________IMPORT/EXPORT____________
// Estilos personalizados
import { Container_Home_Section_Title,Container_Home_Section,Container_Home_Section_Column_50_Left,Container_Home_Section_Header } from "../../components/styled/Containers";
import { Text_Title_16_Black,Text_Title_28_Black } from "../../components/styled/Text";
// Componentes personalizados
import Table_Total_Supplies from "../../components/tables/totals/Invetory/Supplies";
import Table_Total_Cleaning_Supplies from "../../components/tables/totals/Invetory/CleaningSupplies";
//____________IMPORT/EXPORT____________

// Componente para mostrar la seccion de inicio en administración por por parte de los insumos y suministros
export default function Administration_Supplies(){
    // Estructura del componente
    return(
        <> 
            <Container_Home_Section_Title>
                <Text_Title_28_Black>SECCIÓN DE INSUMOS Y SUMINISTROS</Text_Title_28_Black>
            </Container_Home_Section_Title>   
            <Container_Home_Section>
                <Container_Home_Section_Column_50_Left>
                    <Container_Home_Section_Header>
                        <Text_Title_16_Black>ALMACÉN DE INSUMOS</Text_Title_16_Black>
                    </Container_Home_Section_Header>
                    <Table_Total_Supplies/>
                </Container_Home_Section_Column_50_Left>
                <Container_Home_Section_Column_50_Left>
                    <Container_Home_Section_Header>
                        <Text_Title_16_Black>ALMACÉN DE SUMINISTROS</Text_Title_16_Black>
                    </Container_Home_Section_Header>
                    <Table_Total_Cleaning_Supplies/>
                </Container_Home_Section_Column_50_Left>
            </Container_Home_Section>
        </>
    )
}