import { useEffect, useState,useContext } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend
} from 'recharts';
import { Container_Column_100_Center, Container_Row_90_Center } from '../../styled/Containers';
import { Text_Fade_A_30_Center,Text_Blue_24_Center } from '../../styled/Text';
import { ThemeModeContext } from '../../../contexts/ViewsProvider';
import { TableActionsStatus } from '../../../hooks/Table';
export default function Chart_Activity() {

    const { filteredRecordsStatus } = TableActionsStatus();
    const [themeMode] = useContext(ThemeModeContext);
    const active = filteredRecordsStatus.filter((status) => status.activo === true).length;

    const data = [
        { name: 'Activo', value: active },
        { name: 'Inactivo', value: filteredRecordsStatus.length - active },
    ];
    
    const COLORS = [themeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)', themeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)'];
    
    return (
        <>
            {filteredRecordsStatus.length !== 0 ? (
                <>
                    <Container_Column_100_Center>
                        <Text_Blue_24_Center ThemeMode={themeMode}>ACTIVIDAD DE USUARIOS</Text_Blue_24_Center>
                        <PieChart width={400} height={400}>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={120}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend 
                                wrapperStyle={{
                                    fontFamily:'Century Gothic',
                                    fontSize: 20,
                                    fontWeight: 'bold'
                                }}
                            />
                        </PieChart>
                    </Container_Column_100_Center>     
                </>
            ):(
                <>
                    <Container_Row_90_Center>
                        <Text_Fade_A_30_Center ThemeMode={themeMode}>No hay datos disponibles</Text_Fade_A_30_Center>
                    </Container_Row_90_Center>
                </>
            )}
        </>
    );
}
