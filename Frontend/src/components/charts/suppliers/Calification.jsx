//____________IMPORT/EXPORT____________
// Hooks de React
import { useEffect, useState, useContext } from "react";
// Hooks distintos de React
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
// Contextos
import { DeletedSuppliersContext } from "../../../contexts/SuppliersProvider";
// Estilos personalizados
import { Chart_Container_White_45 } from "../../styled/Charts";
//____________IMPORT/EXPORT____________

// Grafico de top 5 de provedores con mejor calificación
export default function Chart_Calification({ isSuppliers, isObservations }) {
    // Constantes con el valor de los contextos 
    const [isDeletedSuppliers] = useContext(DeletedSuppliersContext);
    // Constantes con el valor de los useState
    const [calification, setCalification] = useState([]);
    // Calcular promedios
    useEffect(() => {
        const filteredSuppliers = isSuppliers.filter((data) => {
            const isDeleted = isDeletedSuppliers.some(supplier => supplier.idproveedor === data.idproveedor);
            if (isDeleted) return false;

            return true;
        })

        const totalCalificaciones = filteredSuppliers.map((supplier) => {
            const proveedorObservaciones = isObservations.filter(
                obs => obs.idproveedor === supplier.idproveedor
            );

            const suma = proveedorObservaciones.reduce(
                (sum, obs) => sum + Number(obs.calificacion), 0
            );

            const promedio = proveedorObservaciones.length > 0
                ? suma / proveedorObservaciones.length
                : 0;

            return {
                name: supplier.nombre,
                calificacion: Number(promedio.toFixed(2))
            };
        })

        // Ordenar de mayor a menor
        .sort((a, b) => b.calificacion - a.calificacion)
        // Tomar solo los primeros 5
        .slice(0, 5);

        setCalification(totalCalificaciones);
    }, [isObservations, isSuppliers, isDeletedSuppliers]);
    // Colores dependiendo su calificacion
    const getColor = (value) => {
        if (value <= 1) return "rgb(155, 9, 9)"; 
        if (value <= 2) return "rgb(235, 108, 23)";
        if (value <= 3) return "rgb(255, 193, 10)";
        if (value <= 4) return "rgb(160, 187, 39)";  
        return "rgb(20, 165, 76)";                   
    };
    // Estructura del componente
    return (
        <Chart_Container_White_45>
            <ResponsiveContainer width="85%" height={150}>
                <BarChart data={calification}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" style={{ fontFamily: 'Century Gothic' , fontSize: 10, color: 'black' }} />
                    <YAxis domain={[0, 5]} style={{ fontFamily: 'Century Gothic' , fontSize: 12 }} />
                    <Tooltip
                        contentStyle={{ fontFamily: 'Century Gothic' }}
                        itemStyle={{ fontFamily: 'Century Gothic' }}
                        labelStyle={{ fontFamily: 'Century Gothic', fontWeight: 'bold' }}
                    />
                    <Bar dataKey="calificacion">
                        {calification.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getColor(entry.calificacion)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Chart_Container_White_45>
    );
}