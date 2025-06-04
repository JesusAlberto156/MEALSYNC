import { useEffect,useContext } from "react";
import { StatusContext } from "../../../contexts/UsersProvider";
import { ThemeModeContext } from "../../../contexts/ViewsProvider";

import { Chart_400 } from "../../styled/Charts";

export default function Chart_Activity(){
  const [isStatusAll] = useContext(StatusContext);
  const [themeMode] = useContext(ThemeModeContext);

  useEffect(() => {
    const active = isStatusAll.filter((status) => status.activo === true).length;
    
    const container = document.getElementById("Chart-Activity");
    const drawChart = () => {
      const data = window.google.visualization.arrayToDataTable([
        ["Task", "Hours per Day"],
        ["Activos",active],
        ["Inactivos", isStatusAll.length - active],
      ]);

      let color = '';

      if(themeMode){
          color = 'black'
      }else{
          color = 'white'
      }
      
      const width = container?.offsetWidth || window.innerWidth;
      const fontSize = Math.max(12, Math.floor(width / 60));

      const options = {
        title: "Usuarios ACTIVOS",
        fontName: 'Century Gothic',
        backgroundColor: 'transparent',
        pieHole: 0.4,
        titleTextStyle: {
          color: color,
          fontSize: fontSize,
          fontName: "Century Gothic",
        }
      };

      const chart = new window.google.visualization.PieChart(container);
      chart.draw(data, options);
    }

    window.google.charts.load("current", { packages: ["corechart"] });
    window.google.charts.setOnLoadCallback(drawChart);

    const observer = new ResizeObserver(() => {
      drawChart();
    });

    observer.observe(container);

    return () => {
      observer.disconnect(); // 👈 importante limpiar
    };
  }, [isStatusAll,themeMode]);

  return (
    <>
      <Chart_400 ThemeMode={themeMode} id="Chart-Activity"/>
    </>
  );
};