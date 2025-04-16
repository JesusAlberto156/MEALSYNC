import { useEffect,useContext,useState } from "react";
import { Tooltip } from "@mui/material";

import { suppliersContext,observationsContext } from "../../contexts/SuppliersProvider";
import { themeModeContext } from "../../contexts/ViewsProvider";
import { searchTermContext } from "../../contexts/VariablesProvider";

// Iconos de la paginación
import { GrNext,GrPrevious } from "react-icons/gr";
//__________ICONOS__________
import { Container_Row_100_Center } from "../styled/Containers";
import { Button_Icon_Blue_140 } from "../styled/Buttons";
import { Icon_White_22 } from "../styled/Icons";
import { Text_A_16 } from "../styled/Text";
import { Chart_850x500 } from "../styled/Charts";

export default function Suppliers_Chart(){

    const [themeMode] = useContext(themeModeContext);
    const [isSuppliers] = useContext(suppliersContext);
    const [isObservations] = useContext(observationsContext);
    const [isSearchTerm] = useContext(searchTermContext);
    const [qualification, setQualification] = useState({});

    useEffect(() => {
        if(isObservations.length !== 0 && isSuppliers.length !== 0){
            const updatedQualification = {};

            isSuppliers.forEach(supplier => {
                updatedQualification[supplier.idproveedor] = {
                    idProveedor: supplier.idproveedor,
                    nombre: supplier.nombre,
                    suma: 3,
                    cantidad: 0,
                }
            })

            isObservations.forEach(observation => {
                if (updatedQualification[observation.idproveedor].cantidad === 0) {
                    updatedQualification[observation.idproveedor].suma -= 3;
                }
                updatedQualification[observation.idproveedor].suma += observation.calificacion;
                updatedQualification[observation.idproveedor].cantidad += 1;
            });

            setQualification(updatedQualification);
        }
    },[isObservations,isSuppliers]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        const filteredEntries = Object.entries(qualification).filter(([id, data]) =>
            data.nombre.toLowerCase().includes(isSearchTerm.toLowerCase())
        );

        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedEntries = filteredEntries.slice(startIndex, startIndex + itemsPerPage);

        window.google.charts.load("current", { packages: ["corechart"] });
        window.google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable([
                ['Proveedor', 'Calificación', { role: 'style' }],
                ...paginatedEntries.map(([id,data]) => {
                    let promedio = 0;
                    if(data.cantidad === 0){
                        promedio = data.suma;
                    }else{
                        promedio = (data.suma / data.cantidad).toFixed(1);
                    }
                    let color = '';
                    if(promedio <= 1){
                        if(themeMode){
                            color = 'rgb(155, 9, 9)';
                        }else{
                            color = 'rgb(208, 31, 31)';
                        }
                    }else if(promedio <= 2){
                        if(themeMode){
                            color = 'rgb(155, 75, 9)';
                        }else{
                            color = 'rgb(199, 103, 24)';
                        }
                    }else if(promedio <= 3){
                        if(themeMode){
                            color = 'rgb(155, 133, 9)';
                        }else{
                            color = 'rgb(211, 182, 17)';
                        }
                    }else if(promedio <= 4){
                        if(themeMode){
                            color = 'rgb(116, 155, 9)';
                        }else{
                            color = 'rgb(164, 218, 17)';
                        }
                    }else if(promedio <= 5){
                        if(themeMode){
                            color = 'rgb(50, 155, 9)';
                        }else{
                            color = 'rgb(71, 209, 16)';
                        }
                    }

                    if(promedio === 3 && data.cantidad === 0){
                        if(themeMode){
                            color = 'rgb(58,93,174)';
                        }else{
                            color = 'rgb(82, 126, 231)';
                        }
                    }

                    return [
                        data.nombre,
                        parseFloat(promedio),
                        color,
                    ];
                })
            ]);

            let color = '';

            if(themeMode){
                color = 'black'
            }else{
                color = 'white'
            }
            var view = new google.visualization.DataView(data);
            view.setColumns([0, 1,
                            { calc: "stringify",
                                sourceColumn: 1,
                                type: "string",
                                role: "annotation" },
                            2]);
    
            var options = {
                title: "Listado de prooveedores",
                titleTextStyle: {
                    color: color,
                    fontSize: 20,
                },
                bar: {groupWidth: "95%"},
                width: '100%',
                height: '100%',
                legend: { position: "none" },
                backgroundColor: 'transparent',
                hAxis: {
                    minValue: 0,
                    maxValue: 5,
                    textStyle: {
                        color: color,
                    }
                },
                vAxis: {
                    textStyle: {
                        color: color,
                    }
                },
            };
            var chart = new google.visualization.BarChart(document.getElementById("Suppliers"));
            chart.draw(view, options);
        }
    },[qualification,isSearchTerm,currentPage,themeMode]);

    return (
        <>
            <Container_Row_100_Center>
                <Chart_850x500 ThemeMode={themeMode} id="Suppliers"/>
            </Container_Row_100_Center>
            <Container_Row_100_Center>
                <Tooltip title='Anterior' placement='top'>
                    <Button_Icon_Blue_140 ThemeMode={themeMode} className={currentPage === 1 ? 'roll-out-left' : 'roll-in-left'}
                        onClick={() => handlePageChange(currentPage - 1)}>
                        <Icon_White_22>
                            <GrPrevious/>
                        </Icon_White_22>
                    </Button_Icon_Blue_140>
                </Tooltip>
                <Text_A_16 ThemeMode={themeMode} className={themeMode ? 'text-shadow-drop-infinite-light' : 'text-shadow-drop-infinite-dark'}>Página {currentPage}</Text_A_16>
                <Tooltip title='Siguiente' placement='top'>
                    <Button_Icon_Blue_140 ThemeMode={themeMode} className={currentPage * itemsPerPage >= Object.entries(qualification).filter(([id, data]) =>
                                                                                data.nombre.toLowerCase().includes(isSearchTerm.toLowerCase())
                                                                            ).length ? 'roll-out-left' : 'roll-in-left'}   
                        onClick={() => handlePageChange(currentPage + 1)}>
                        <Icon_White_22>
                            <GrNext/>
                        </Icon_White_22>
                    </Button_Icon_Blue_140>
                </Tooltip>
            </Container_Row_100_Center>
        </>
    );
};