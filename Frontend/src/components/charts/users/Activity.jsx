//____________IMPORT/EXPORT____________
// Componentes de React externos
import { PieChart,Pie,Cell,Tooltip,Legend,ResponsiveContainer } from 'recharts';
// Hooks personalizados
import { TableActionsStatus } from '../../../hooks/users/Tables';
// Estilos personalizados
import { Text_Fade_Title_28_Black } from '../../styled/Text';
import { Chart_Container_White_45,Chart_Tooltip_Value_Black,Chart_Legend_Value } from '../../styled/Charts';
//____________IMPORT/EXPORT____________

// Grafico para mostrar la actividad de los usuarios
export default function Chart_Activity() {
    // Constantes con la funcionalidad de los hooks
    const { filteredRecordsStatus } = TableActionsStatus();
    // Constantes para detalles de la grafica
    const active = filteredRecordsStatus.filter((status) => status.activo === true).length;
    const data = [
        { name: `Activo`, value: active },
        { name: `Inactivo`, value: filteredRecordsStatus.length - active },
        { name: `Total de usuarios`, value: filteredRecordsStatus.length},
    ];
    const COLORS = ['rgb(20, 165, 76)','rgb(155, 9, 9)','rgb(58,93,174)'];
    // Estructura del componente
    return (
        <>
            <Chart_Container_White_45>
                {filteredRecordsStatus.length !== 0 ? (
                    <>
                        <ResponsiveContainer width={'100%'} height={'100%'}>
                            <PieChart >
                                <Pie
                                    data={data}
                                    cx="60%"
                                    cy="50%"
                                    innerRadius={'50%'}
                                    outerRadius={'80%'}
                                    fill="#8884d8"
                                    paddingAngle={0}
                                    dataKey="value"
                                    stroke={'rgba(0, 0, 0, 0.80)'}
                                    strokeWidth={2}
                                >
                                    {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    content={<Chart_Tooltip_Value_Black/>}
                                />
                                <Legend 
                                    content={<Chart_Legend_Value/>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </>
                ):(
                    <>
                        <Text_Fade_Title_28_Black>¡No hay datos disponibles!</Text_Fade_Title_28_Black>
                    </>
                )}
            </Chart_Container_White_45>     
        </>
    );
}
