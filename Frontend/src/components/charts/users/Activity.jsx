import { useContext } from 'react';
import { PieChart,Pie,Cell,Tooltip,Legend,ResponsiveContainer } from 'recharts';
import { Container_Row_90_Center } from '../../styled/Containers';
import { Text_Fade_A_30_Center,Text_Blue_24_Center } from '../../styled/Text';
import { ThemeModeContext } from '../../../contexts/ViewsProvider';
import { TableActionsStatus } from '../../../hooks/Table';
import { Chart_Container_White_800x500,Chart_Tooltip_Custom_Name_Value } from '../../styled/Charts';
export default function Chart_Activity() {

    const { filteredRecordsStatus } = TableActionsStatus();
    const [themeMode] = useContext(ThemeModeContext);
    const active = filteredRecordsStatus.filter((status) => status.activo === true).length;

    const data = [
        { name: `Activo`, value: active },
        { name: `Inactivo`, value: filteredRecordsStatus.length - active },
        { name: `Total de usuarios`, value: filteredRecordsStatus.length},
    ];
    
    const COLORS = [themeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)', themeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)',  themeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)'];
    
    return (
        <>
            <Chart_Container_White_800x500 ThemeMode={themeMode}>
                <Text_Blue_24_Center ThemeMode={themeMode}>ACTIVIDAD DE USUARIOS</Text_Blue_24_Center>
                {filteredRecordsStatus.length !== 0 ? (
                    <>
                        <ResponsiveContainer width={'100%'} height={'80%'}>
                            <PieChart >
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={'45%'}
                                    outerRadius={'85%'}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke={themeMode ? 'rgb(0, 0, 0)':'rgb(255, 255, 255)'}
                                    strokeWidth={2}
                                >
                                    {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    wrapperStyle={{
                                        fontFamily:'Century Gothic',
                                        fontSize: '1.2vw',
                                    }}
                                    content={<Chart_Tooltip_Custom_Name_Value themeMode={themeMode}/>}
                                />
                                <Legend 
                                    wrapperStyle={{
                                        fontFamily:'Century Gothic',
                                        fontSize: '1.8vw',
                                        fontWeight: 'bold'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </>
                ):(
                    <>
                        <Container_Row_90_Center>
                            <Text_Fade_A_30_Center ThemeMode={themeMode}>No hay datos disponibles</Text_Fade_A_30_Center>
                        </Container_Row_90_Center>
                    </>
                )}
            </Chart_Container_White_800x500>     
        </>
    );
}
