import { useEffect,useContext,useState } from "react";

import format from 'date-fns/format'
import { ThemeModeContext } from "../../../contexts/ViewsProvider";
import { SuppliersContext,ObservationsContext } from "../../../contexts/SuppliersProvider";
import { ItemDateContext } from "../../../contexts/ChartsProvider";

import { HandleModalView } from "../../../hooks/Views";
import { Container_Row_100_Center } from "../../styled/Containers";
import { Chart_90 } from "../../styled/Charts";
export default function Chart_Observations(){

    const [themeMode] = useContext(ThemeModeContext);
    const [isSuppliers,setIsSuppliers] = useContext(SuppliersContext);
    const [isObservations,setIsObservations] = useContext(ObservationsContext);
    const [isItemDate,setIsItemDate] = useContext(ItemDateContext);

    const [Dates,setDates] = useState([]);

    const handleChangeModal = HandleModalView();

    useEffect(() => {
        if(isObservations.length !== 0 && isSuppliers.length !== 0){
            const dateMap = {};

            isObservations.forEach((observation) => {
                const fecha = new Date(observation.fecha);
    
                const year = fecha.getFullYear();
                const month = fecha.getMonth();
                const day = fecha.getDate();
                const key = `${year}-${month}-${day}`;
    
                if (!dateMap[key]) {
                    dateMap[key] = {
                        year,
                        month,
                        day,
                        calificacion: observation.calificacion,
                    };
                }else{
                    dateMap[key].calificacion = 6;
                }
            });
    
            const dates = Object.values(dateMap).map(item => ({
                year: item.year,
                month: item.month,
                day: item.day,
                calificacion: item.calificacion,
            }));    
            
            setDates(dates);
        }
    },[isObservations,isSuppliers])

    useEffect(() => {
        google.charts.load("current", {packages:["calendar"]});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var dataTable = new google.visualization.DataTable();
            dataTable.addColumn({ type: 'date', id: 'Date' });
            dataTable.addColumn({ type: 'number', id: 'Won/Loss' });
            if(Dates.length !== 0){
                    dataTable.addRows(
                    Dates.map((date) => [
                        new Date(date.year,date.month,date.day),
                        date.calificacion,
                    ])
                );
            }
     
            var chart = new google.visualization.Calendar(document.getElementById('Chart-Observations'));
     
            var options = {
                title: "Observaciones de proveedores",
                height: '100%',
                width: '100%',
                colorAxis: {
                    values:[1,2,3,4,5,6],
                    colors: ['rgb(155, 9, 9)','rgb(190, 126, 30)','rgb(185, 155, 20)','rgb(178, 196, 17)','rgb(20, 165, 76)','rgb(58,93,174)'],
                }
            };
     
            chart.draw(dataTable, options);

            google.visualization.events.addListener(chart, 'select', () => {
                const selection = chart.getSelection();
                if (selection.length > 0) {
                    const rowIndex = selection[0].row;
                    
                    if (rowIndex != null && rowIndex < dataTable.getNumberOfRows()) {
                        const rowDate = dataTable.getValue(rowIndex, 0);
            
                        const dateItem = Dates.find(date =>
                            date.year === rowDate.getFullYear() &&
                            date.month === rowDate.getMonth() &&
                            date.day === rowDate.getDate()
                        );
            
                        if (dateItem) {
                            setIsItemDate({
                                year: dateItem.year,
                                month: dateItem.month,
                                day: dateItem.day,
                            });
                            handleChangeModal('Suppliers-Observations');
                        }
                    }
                }
            });
        }

        window.addEventListener('resize', drawChart);

        return () => {
            window.removeEventListener('resize', drawChart);
        };
    },[Dates]);

    return(
        <>
            <Container_Row_100_Center>
                <Chart_90 id="Chart-Observations" ThemeMode={themeMode}/>
            </Container_Row_100_Center>
        </>
    );
}