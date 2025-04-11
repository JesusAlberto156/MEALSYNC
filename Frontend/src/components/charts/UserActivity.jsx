import { useEffect } from "react";

export default function User_Activity_Chart(){
  useEffect(() => {
    // Cargar el paquete y dibujar el gráfico
    window.google.charts.load("current", { packages: ["corechart"] });
    window.google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      const data = window.google.visualization.arrayToDataTable([
        ["Task", "Hours per Day"],
        ["Work", 11],
        ["Eat", 2],
        ["Commute", 2],
        ["Watch TV", 2],
        ["Sleep", 7],
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
  }, []);

  return (
    <div>
      <div id="piechart_3d" style={{ width: "900px", height: "500px" ,backgroundColor:'transparent'}}></div>
    </div>
  );
};