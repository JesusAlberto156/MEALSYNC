import { useEffect,useContext } from "react";
import { statusAllContext } from "../../contexts/StatusProvider";
export default function User_Activity_Chart(){
  const [isStatusAll,setIsStatusAll] = useContext(statusAllContext);

  useEffect(() => {

    const active = isStatusAll.filter((status) => status.activo === true).length;
    // Cargar el paquete y dibujar el gráfico
    window.google.charts.load("current", { packages: ["corechart"] });
    window.google.charts.setOnLoadCallback(drawChart);


    function drawChart() {
      const data = window.google.visualization.arrayToDataTable([
        ["Task", "Hours per Day"],
        ["Activos",active],
        ["Inactivos", isStatusAll.length - active],
      ]);

      const options = {
        title: "Usuarios ACTIVOS",
        fontName: 'Prompt, sans-serif',
        is3D: true,
        backgroundColor: 'transparent',
      };

      const chart = new window.google.visualization.PieChart(
        document.getElementById("piechart_3d")
      );
      chart.draw(data, options);
    }
  }, [isStatusAll]);

  return (
    <div>
      <div id="piechart_3d" style={{ width: "600px", height: "300px" ,backgroundColor:'transparent'}}></div>
    </div>
  );
};