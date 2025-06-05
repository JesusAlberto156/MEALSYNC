//____________IMPORT/EXPORT____________
// Hooks de React
import { useEffect,useContext,useState } from "react";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { SuppliersContext,ObservationsContext } from "../../../contexts/SuppliersProvider";
import { ThemeModeContext } from "../../../contexts/ViewsProvider";
import { SearchTermContext } from "../../../contexts/SearchsProvider";
import { SelectedRowContext } from "../../../contexts/SelectedesProvider";
import { TextFieldsSupplierContext } from "../../../contexts/FormsProvider";
import { RefSuppliersContext } from "../../../contexts/RefsProvider";
// Hooks personalizados
import { ResetTextFieldsSupplier } from "../../../hooks/Texts";
//__________ICONOS__________
// Iconos de la paginación
import { GrNext,GrPrevious } from "react-icons/gr";
//__________ICONOS__________
// Estilos personalizados
import { Container_Row_100_Center } from "../../styled/Containers";
import { Button_Icon_Blue_140 } from "../../styled/Buttons";
import { Icon_White_22 } from "../../styled/Icons";
import { Text_A_16_Center,Text_Black_White_40_Center } from "../../styled/Text";
import { Chart_90 } from "../../styled/Charts";
//____________IMPORT/EXPORT____________

// Grafica con los datos de los proveedores
export default function Chart_Suppliers(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSuppliers] = useContext(SuppliersContext);
    const [isObservations] = useContext(ObservationsContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isTextFieldsSupplier,setIsTextFieldsSupplier] = useContext(TextFieldsSupplierContext);
    const {Modal,Form,Button_Edit_S,Button_Delete_S,Button_Details_S} = useContext(RefSuppliersContext);
    // Constantes con el valor de useState
    const [qualification, setQualification] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    // UseEffect para obtener la calificacion de los proveedores
    useEffect(() => {
        if(isObservations.length !== 0 || isSuppliers.length !== 0){
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
    // Total de datos por página
    const itemsPerPage = 5;
    // Cambio de pagina
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    // Filtrado de datos de la grafica
    const filteredEntries = Object.entries(qualification).filter(([id, data]) =>
        data.nombre.toLowerCase().includes(isSearchTerm.toLowerCase())
    );
    // Calculo del total de paginas con los datos filtrados
    const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);
    // Indices
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedEntries = filteredEntries.slice(startIndex, startIndex + itemsPerPage);
    // UseEffect para corregir la paginacion con el buscador
    useEffect(() => {
        if(currentPage > totalPages){
            setCurrentPage (1);
        }
    },[isSearchTerm]);
    // UseEffect que se encarga de dibujar la grafica
    useEffect(() => {
        window.google.charts.load("current", { packages: ["corechart"] });
        window.google.charts.setOnLoadCallback(() => {
            const container = document.getElementById("Chart-Suppliers");
    
            if (!container || paginatedEntries.length === 0) return;
    
            drawChart();

            window.addEventListener("resize", drawChart);
        });

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
                            color = 'rgb(235, 108, 23)';
                        }else{
                            color = 'rgb(207, 122, 52)';
                        }
                    }else if(promedio <= 3){
                        if(themeMode){
                            color = 'rgb(250, 207, 66)';
                        }else{
                            color = 'rgb(235, 191, 71)';
                        }
                    }else if(promedio <= 4){
                        if(themeMode){
                            color = 'rgb(160, 187, 39)';
                        }else{
                            color = 'rgb(174, 190, 100)';
                        }
                    }else if(promedio <= 5){
                        if(themeMode){
                            color = 'rgb(20, 165, 76)';
                        }else{
                            color = 'rgb(60, 188, 109)';
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
    
            const container = document.getElementById("Chart-Suppliers");
            const width = container?.offsetWidth || window.innerWidth;
            const fontSize = Math.max(12, Math.floor(width / 60));
            
            var options = {
                title: "Listado de prooveedores",
                titleTextStyle: {
                    color: color,
                    fontSize: fontSize,
                    fontName: "Century Gothic",
                },
                bar: {groupWidth: "80%"},
                chartArea: {
                    left: '25%',
                    top: '18%',
                    width: '70%',
                    height: '70%',
                },
                width: '100%',
                height: '100%',
                legend: { position: "none" },
                backgroundColor: 'transparent',
                hAxis: {
                    minValue: 0,
                    maxValue: 5,
                    textStyle: {
                        color: color,
                        fontName: "Century Gothic",
                        fontSize: fontSize - 2,
                    }
                },
                vAxis: {
                    textStyle: {
                        color: color,
                        fontName: "Century Gothic",
                        fontSize: fontSize - 2,
                    }
                },
                animation: {
                    duration: 500,
                    easing: 'out',
                },
                isStacked: false,
            };

            if (paginatedEntries.length === 1) {
                options.bar.groupWidth = "20%";  // Asegura que la barra no sea demasiado delgada
                options.chartArea.height = "50%";  // Asegura que la barra no ocupe todo el gráfico
            }

            var chart = new google.visualization.BarChart(document.getElementById("Chart-Suppliers"));
            chart.draw(view, options);
        
            google.visualization.events.addListener(chart, 'select', () => {
                var selection = chart.getSelection();
                if (selection.length > 0) {
                    var selectedItem = selection[0];
                    var selectedRow = selectedItem.row;
                    var selectedData = paginatedEntries[selectedRow];
                    
                    const supplier = isSuppliers.find(suppliers => suppliers.idproveedor === selectedData[1].idProveedor);

                    if(supplier){
                        if(selectedData[1].cantidad === 0){
                            setIsSelectedRow({
                                idproveedor: selectedData[1].idProveedor,
                                calificacion: selectedData[1].suma,
                                cantidad: selectedData[1].cantidad,
                                nombre: supplier.nombre,
                                rfc: supplier.rfc,
                                domicilio: supplier.domicilio,
                                telefono: supplier.telefono,
                                correo: supplier.correo,
                            });
                        }else{
                            setIsSelectedRow({
                                idproveedor: selectedData[1].idProveedor,
                                calificacion: selectedData[1].suma / selectedData[1].cantidad,
                                cantidad: selectedData[1].cantidad,
                                nombre: supplier.nombre,
                                rfc: supplier.rfc,
                                domicilio: supplier.domicilio,
                                telefono: supplier.telefono,
                                correo: supplier.correo,
                            });
                        }
                    }
                }
            });
        }

        return () => {
            window.removeEventListener("resize", drawChart);
        };
    },[qualification,isSearchTerm,currentPage,themeMode]);
    // UseEffect que se encarga de matener la seleccion en la grafica
    useEffect(() => {
        const handleClickOutside = (event) => {
            const chart = document.getElementById("Chart-Suppliers");
            const isClickInsideChart = chart && chart.contains(event.target);
            const isClickInsideModal = Modal?.current?.contains(event.target);
            const isClickInsideForm = Form?.current?.contains(event.target);
            const isClickInsideEdit = Button_Edit_S?.current?.contains(event.target);
            const isClickInsideDelete = Button_Delete_S?.current?.contains(event.target);
            const isClickInsideDetails = Button_Details_S?.current?.contains(event.target);

            if (!isClickInsideChart && !isClickInsideModal && !isClickInsideForm && !isClickInsideEdit && !isClickInsideDelete && !isClickInsideDetails) {
                setIsSelectedRow(null);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    },[Modal,Form,Button_Edit_S,Button_Delete_S,Button_Details_S]);
    // UseEffect que se encarga de manejar las variables cuando se selecciona una opcion de la grafica
    useEffect(() => {
        if(isSelectedRow !== null){
            setIsTextFieldsSupplier(prev => ({
                ...prev,
                name: isSelectedRow.nombre,
                rfc: isSelectedRow.rfc,
                address: isSelectedRow.domicilio,
                phone: isSelectedRow.telefono,
                email: isSelectedRow.correo,
            }))
        }else{
            resetTextFieldsSupplier();
        }
    },[isSelectedRow]);
    // Constantes con la funcionalidad de los hooks
    const resetTextFieldsSupplier = ResetTextFieldsSupplier();
    // Estructura del componente
    return(
        <>
            <Container_Row_100_Center>
                {paginatedEntries.length === 0 ? (
                    <>
                        <Text_Black_White_40_Center ThemeMode={themeMode}>NO SE ENCONTRARON PROVEEDORES CON ESE NOMBRE</Text_Black_White_40_Center>
                    </>
                ):(
                    <>
                        <Chart_90 ThemeMode={themeMode} id="Chart-Suppliers"/>  
                    </>
                )}
            </Container_Row_100_Center>
            <Container_Row_100_Center>
                <Tooltip title='Anterior' placement='top'>
                    <Button_Icon_Blue_140 ThemeMode={themeMode} className={currentPage === 1 ? 'roll-out-button-left' : 'roll-in-button-left'}
                        onClick={() => currentPage > 1 ? handlePageChange(currentPage - 1) : null}>
                        <Icon_White_22>
                            <GrPrevious/>
                        </Icon_White_22>
                    </Button_Icon_Blue_140>
                </Tooltip>
                <Text_A_16_Center ThemeMode={themeMode}>Página {currentPage} de {totalPages}</Text_A_16_Center>
                <Tooltip title='Siguiente' placement='top'>
                    <Button_Icon_Blue_140 ThemeMode={themeMode} className={currentPage * itemsPerPage >= Object.entries(qualification).filter(([id, data]) =>
                                                                                data.nombre.toLowerCase().includes(isSearchTerm.toLowerCase())
                                                                            ).length ? 'roll-out-button-left' : 'roll-in-button-left'}   
                        onClick={() => currentPage < totalPages ? handlePageChange(currentPage + 1) : null}>
                        <Icon_White_22>
                            <GrNext/>
                        </Icon_White_22>
                    </Button_Icon_Blue_140>
                </Tooltip>
            </Container_Row_100_Center>
        </>
    );
};