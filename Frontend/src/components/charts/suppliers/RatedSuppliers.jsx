//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from 'react';
// Componentes de React externos
import { RadialBarChart, RadialBar, Legend, Tooltip, PolarAngleAxis } from 'recharts';
// Contextos
import { ThemeModeContext } from '../../../contexts/ViewsProvider';
import { SuppliersContext } from '../../../contexts/SuppliersProvider';
// Hooks personalizados

// Estilos personalizados

//____________IMPORT/EXPORT____________

// Grafico para mostrar el total de proveedores con cierta calificación
export default function Chart_Rated_Suppliers() {
    // Constantes con el valor de los contextos 
    const [themeMode] = useContext(ThemeModeContext);
    const [isSuppliers,setIsSuppliers] = useContext(SuppliersContext);
    // Constantes para detalles de la grafica
    const data = [
        {
            name: 'Sin calificación',
            value: 2,
            fill: themeMode ? 'rgb(58,93,174)':'rgb(82, 126, 231)',
        },
        {
            name: 'Excelente',
            value: 1,
            fill: themeMode ? 'rgb(20, 165, 76)':'rgb(60, 188, 109)',
        },
        {
            name: 'Bueno',
            value: 1,
            fill: themeMode ? 'rgb(160, 187, 39)':'rgb(174, 190, 100)',
        },
        {
            name: 'Normal',
            value: 1,
            fill: themeMode ? 'rgb(250, 207, 66)':'rgb(235, 191, 71)',
        },
        {
            name: 'Preocupante',
            value: 1,
            fill: themeMode ? 'rgb(235, 108, 23)':'rgb(207, 122, 52)',
        },
        {
            name: 'Peligro',
            value: 1,
            fill: themeMode ? 'rgb(155, 9, 9)':'rgb(208, 31, 31)',
        },
    ];

    const style = {
        top: 0,
        left: 350,
        lineHeight: '24px',
    };
    // Estructura del componente
    return(
        <>
            <RadialBarChart
                width={500}
                height={300}
                cx={150}
                cy={150}
                innerRadius={30}
                outerRadius={150}
                barSize={20}
                data={data}
            >
                <PolarAngleAxis
                    type='number'
                    domain={[0,isSuppliers.lenght]}
                    angleAxisId={0}
                    tick={false}
                />
                <RadialBar
                    minAngle={15}
                    label={{ fill: '#666', position: 'insideStart' }}
                    background
                    clockWise
                    dataKey="value"
                />
                <Legend
                    iconSize={10}
                    width={120}
                    height={140}
                    layout="vertical"
                    verticalAlign="middle"
                    wrapperStyle={style}
                />
                <Tooltip />
            </RadialBarChart>
        </>
    )
}