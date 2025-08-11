// ExcelExportButton.jsx
import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import Logo_Hospital from '../components/imgs/Logo-Horizontal-Hospital.png'
const ExcelExportButton = () => {
  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Insumos');

    // Encabezados
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nombre', key: 'nombre', width: 30 },
      { header: 'Cantidad', key: 'cantidad', width: 15 },
    ];

    // Fila de ejemplo
    worksheet.addRow({ id: 1, nombre: 'Insumo A', cantidad: 10 });

    // 🔽 Cargar imagen (desde public/)
    const response = await fetch(Logo_Hospital); // la imagen debe estar en /public/imagen.png
    const buffer = await response.arrayBuffer();

    // Insertar imagen
    const imageId = workbook.addImage({
      buffer,
      extension: 'png',
    });

    // Posicionar la imagen
    worksheet.addImage(imageId, {
      tl: { col: 3, row: 1 }, // esquina superior izquierda
      ext: { width: 100, height: 100 }, // tamaño
    });

    // Descargar archivo
    const bufferExcel = await workbook.xlsx.writeBuffer();
    const blob = new Blob([bufferExcel], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(blob, 'InsumosConImagen.xlsx');
  };

  return (
    <button onClick={exportToExcel}>
      Generar Excel con Imagen
    </button>
  );
};

export default ExcelExportButton;