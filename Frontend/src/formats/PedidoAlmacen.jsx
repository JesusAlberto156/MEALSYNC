//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from 'react';
// Componentes de React externos
import { Tooltip } from '@mui/material';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
// Contextos
import { ActionBlockContext } from '../contexts/VariablesProvider';
import { RefButtonVerificationGreenContext } from '../contexts/RefsProvider';
import { SelectedRowContext } from '../contexts/SelectedesProvider';
import { TextFieldsWarehouseOrderContext } from '../contexts/FormsProvider';
import { SuppliersContext } from '../contexts/SuppliersProvider';
import { SuppliesContext,SupplyTypesContext,CountSupplyTypesContext } from '../contexts/SuppliesProvider';
import { CleaningSuppliesContext,CleaningTypesContext,CountCleaningTypesContext } from '../contexts/ExtrasProvider';
import { UsersContext } from '../contexts/UsersProvider';
// Hooks personalizados
import { HandleWarehouseOrderStart } from '../hooks/warehouse/Forms';
//_________IMAGENES__________
import Logo_Hospital from '../components/imgs/Logo-Horizontal-Hospital.png'
import Distintivo from '../components/imgs/Distintivo.png';
//_________IMAGENES__________
//__________ICONOS__________
import { IoMdDownload } from "react-icons/io";
//__________ICONOS__________
// Estilos personalizados
import { Button_Icon_Green_60 } from '../components/styled/Buttons';
import { Icon_16 } from '../components/styled/Icons';
//____________IMPORT/EXPORT____________

// Creación del pedido de almacén
const ExcelExportButton = () => {

  // Obtención del no. de semana
  function getISOWeekNumber(date) {
    const tempDate = new Date(date.getTime());
    tempDate.setHours(0, 0, 0, 0);
    // Jueves de la semana actual
    tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));
    const firstThursday = new Date(tempDate.getFullYear(), 0, 4);
    const weekNumber = 1 + Math.round(((tempDate - firstThursday) / 86400000 - 3 + ((firstThursday.getDay() + 6) % 7)) / 7);
    return weekNumber;
  }
  const exportToExcel = async () => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Bitácora");
  // Ajustar ancho columnas
  sheet.columns = [
    { width: 5 }, // Col A
    { width: 32 }, // Col B
    { width: 10 },
    { width: 10 },
    { width: 15 },
    { width: 10 },
    { width: 10 },
    { width: 10 },
    { width: 10 },
    { width: 20 },
    { width: 11 },
  ];
  // Insertar logo y distintivo
  const imgBufferLogo = await (await fetch(Logo_Hospital)).arrayBuffer();
  const imgBufferDistintivo = await (await fetch(Distintivo)).arrayBuffer();
  const imageLogo = workbook.addImage({ buffer: imgBufferLogo, extension: "png" });
  const imageIdDistintivo = workbook.addImage({ buffer: imgBufferDistintivo, extension: "png" });
  sheet.addImage(imageLogo, {
    tl: { col: 1, row: 1 },
    ext: { width: 230, height: 65 },
  });
  sheet.addImage(imageIdDistintivo, {
    tl: { col: 10, row: 1 },
    ext: { width: 80, height: 65 },
  });
  // Margenes de imagen logo
  const l1Cell = sheet.getCell("B2");
  l1Cell.value = " ";
  l1Cell.alignment = { horizontal: "center", vertical: "middle" };
  l1Cell.font = { bold: true, size: 14, color: { argb: "FFFFFFFF" } };
  l1Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" },
  };
  l1Cell.border = {
    top: { style: "thick", color: { argb: "FF000000" } },
    left: { style: "thick", color: { argb: "FF000000" } },
  };
  const l2Cell = sheet.getCell("B3");
  l2Cell.value = " ";
  l2Cell.alignment = { horizontal: "center", vertical: "middle" };
  l2Cell.font = { bold: true, size: 14, color: { argb: "FFFFFFFF" } };
  l2Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" },
  };
  l2Cell.border = {
    left: { style: "thick", color: { argb: "FF000000" } },
  };
  const l3Cell = sheet.getCell("B4");
  l3Cell.value = " ";
  l3Cell.alignment = { horizontal: "center", vertical: "middle" };
  l3Cell.font = { bold: true, size: 14, color: { argb: "FFFFFFFF" } };
  l3Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" },
  };
  l3Cell.border = {
    left: { style: "thick", color: { argb: "FF000000" } },
    right: { style: "medium", color: { argb: "FF000000" } },
  };
  // Margenes de imagen distintivo
  const d1Cell = sheet.getCell("K2");
  d1Cell.value = " ";
  d1Cell.alignment = { horizontal: "center", vertical: "middle" };
  d1Cell.font = { bold: true, size: 14, color: { argb: "FFFFFFFF" } };
  d1Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" },
  };
  d1Cell.border = {
    top: { style: "thick", color: { argb: "FF000000" } },
    right: { style: "thick", color: { argb: "FF000000" } },
  };
  const d2Cell = sheet.getCell("K3");
  d2Cell.value = " ";
  d2Cell.alignment = { horizontal: "center", vertical: "middle" };
  d2Cell.font = { bold: true, size: 14, color: { argb: "FFFFFFFF" } };
  d2Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" },
  };
  d2Cell.border = {
    right: { style: "thick", color: { argb: "FF000000" } },
  };
  const d3Cell = sheet.getCell("K4");
  d3Cell.value = " ";
  d3Cell.alignment = { horizontal: "center", vertical: "middle" };
  d3Cell.font = { bold: true, size: 14, color: { argb: "FFFFFFFF" } };
  d3Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" },
  };
  d3Cell.border = {
    left: { style: "medium", color: { argb: "FF000000" } },
    right: { style: "thick", color: { argb: "FF000000" } },
  };
  // Título
  sheet.mergeCells("C2:J2");
  const titleCell = sheet.getCell("C2");
  titleCell.value = `BITÁCORA DE RECEPCIÓN DE ${isSuppliers.find(s => s.idproveedor === isTextFieldsWarehouseOrder.idproveedor)?.nombre}`;
  titleCell.alignment = { horizontal: "center", vertical: "middle" };
  titleCell.font = { bold: true, size: 14 };
  titleCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" },
  };
  titleCell.border = {
    top: { style: "thick", color: { argb: "FF000000" } },
    left: { style: "medium", color: { argb: "FF000000" } },
    right: { style: "medium", color: { argb: "FF000000" } },
    bottom: { style: "medium", color: { argb: "FF000000" } },
  };

  // Encabezado de fechas y datos
  const headers = [
    { range: "C3:D3", text: "Fecha de Solicitud" },
    { range: "E3:F3", text: "SEMANA" },
    { range: "G3:H3", text: "Campus" },
    { range: "I3:J3", text: "Fecha de Recepción" },
  ];
  headers.forEach(({ range, text }) => {
    sheet.mergeCells(range);
    const cell = sheet.getCell(range.split(":")[0]); // toma la celda inicial
    cell.value = text;
    cell.font = { bold: true, size: 11 }; // negritas
    cell.alignment = { horizontal: "center", vertical: "middle" }; // centrado
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // Blanco
    };
    cell.border = {
      top: { style: "medium", color: { argb: "FF000000" } },
      left: { style: "medium", color: { argb: "FF000000" } },
      bottom: { style: "medium", color: { argb: "FF000000" } },
      right: { style: "medium", color: { argb: "FF000000" } },
    };
  });
  // Fecha de solicitud
  const fecha = new Date(isSelectedRow?.fecha);
  sheet.mergeCells("C4:D4");
  const fsCell = sheet.getCell('C4');
  fsCell.value = `${fecha.getDay() < 10 ? '0' : ''}${fecha.getDay()}/${fecha.getMonth() < 10 ? '0' : ''}${fecha.getMonth()}/${fecha.getFullYear()}`;
  fsCell.alignment = { horizontal: "center", vertical: "middle" };
  fsCell.font = { bold: false, size: 14 };
  fsCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" },
  };
  fsCell.border = {
    right: { style: "medium", color: { argb: "FF000000" } },
  };
  // Semana
  sheet.mergeCells("E4:F4");
  const sCell = sheet.getCell('E4');
  sCell.value = `${getISOWeekNumber(fecha)}`;
  sCell.alignment = { horizontal: "center", vertical: "middle" };
  sCell.font = { bold: false, size: 14 };
  sCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" },
  };
  sCell.border = {
    right: { style: "medium", color: { argb: "FF000000" } },
  };
  // Campus
  sheet.mergeCells("G4:H4");
  const cCell = sheet.getCell('G4');
  cCell.value = `${isTextFieldsWarehouseOrder?.campus}`;
  cCell.alignment = { horizontal: "center", vertical: "middle" };
  cCell.font = { bold: false, size: 14 };
  cCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" },
  };
  cCell.border = {
    right: { style: "medium", color: { argb: "FF000000" } },
  };
  // Fecha de recepcion 
  sheet.mergeCells("I4:J4");
  const frCell = sheet.getCell('I4');
  frCell.value = ` `;
  frCell.alignment = { horizontal: "center", vertical: "middle" };
  frCell.font = { bold: false, size: 14 };
  frCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" },
  };
  // Encabezado de registro de inspeccion
  sheet.mergeCells("B5:K5");
  const iCell = sheet.getCell("B5");
  iCell.value = "Registro de inspección de materias primas en recepción";
  iCell.alignment = { horizontal: "center", vertical: "middle" };
  iCell.font = { bold: true, size: 14, color: { argb: "FFFFFFFF" } };
  iCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF3A5DAE" },
  };
  iCell.border = {
    top: { style: "thick", color: { argb: "FF000000" } },
    left: { style: "thick", color: { argb: "FF000000" } },
    right: { style: "thick", color: { argb: "FF000000" } },
    bottom: { style: "thick", color: { argb: "FF000000" } },
  };
  // Instrucciones
  sheet.mergeCells("F6:K6");
  const i1Cell = sheet.getCell("F6");
  i1Cell.value = "Instrucciones de llenado: escribir ü si el requerimiento se cumple. En caso de no";
  i1Cell.alignment = { horizontal: "center", vertical: "middle" };
  i1Cell.font = { bold: false, size: 11 };
  i1Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" },
  };
  i1Cell.border = {
    left: { style: "medium", color: { argb: "FF000000" } },
    right: { style: "thick", color: { argb: "FF000000" } },
  };
  sheet.mergeCells("F7:K7");
  const i2Cell = sheet.getCell("F7");
  i2Cell.value = "cumplir, marcar con una X; si el requerimiento no aplica, se debe escribir NA. El";
  i2Cell.alignment = { horizontal: "center", vertical: "middle" };
  i2Cell.font = { bold: false, size: 11 };
  i2Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" },
  };
  i2Cell.border = {
    left: { style: "medium", color: { argb: "FF000000" } },
    right: { style: "thick", color: { argb: "FF000000" } },
  };
  sheet.mergeCells("F8:K8");
  const i3Cell = sheet.getCell("F8");
  i3Cell.value = "transporte debe estar limpio, sin plagas y en buenas condiciones, el chofer que";
  i3Cell.alignment = { horizontal: "center", vertical: "middle" };
  i3Cell.font = { bold: false, size: 11 };
  i3Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" },
  };
  i3Cell.border = {
    left: { style: "medium", color: { argb: "FF000000" } },
    right: { style: "thick", color: { argb: "FF000000" } },
  };
  sheet.mergeCells("F9:K9");
  const i4Cell = sheet.getCell("F9");
  i4Cell.value = "entrega debe de tener uniforme limpio, cubrepelo y uñas cortasy manos limpias,";
  i4Cell.alignment = { horizontal: "center", vertical: "middle" };
  i4Cell.font = { bold: false, size: 11 };
  i4Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" },
  };
  i4Cell.border = {
    left: { style: "medium", color: { argb: "FF000000" } },
    right: { style: "thick", color: { argb: "FF000000" } },
  };
  sheet.mergeCells("F10:K10");
  const i5Cell = sheet.getCell("F10");
  i5Cell.value = "en caso de no cumplir hacer la anotación en el apartado de observaciones. Si el";
  i5Cell.alignment = { horizontal: "center", vertical: "middle" };
  i5Cell.font = { bold: false, size: 11 };
  i5Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" },
  };
  i5Cell.border = {
    left: { style: "medium", color: { argb: "FF000000" } },
    right: { style: "thick", color: { argb: "FF000000" } },
  };
  sheet.mergeCells("F11:K11");
  const i6Cell = sheet.getCell("F11");
  i6Cell.value = "producto no cumple con las especificaciones, rechazarlo y notificar al encargado";
  i6Cell.alignment = { horizontal: "center", vertical: "middle" };
  i6Cell.font = { bold: false, size: 11 };
  i6Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" },
  };
  i6Cell.border = {
    left: { style: "medium", color: { argb: "FF000000" } },
    right: { style: "thick", color: { argb: "FF000000" } },
  };
  sheet.mergeCells("F12:K12");
  const i7Cell = sheet.getCell("F12");
  i7Cell.value = "del área y al encargado de cocina.";
  i7Cell.alignment = { horizontal: "center", vertical: "middle" };
  i7Cell.font = { bold: false, size: 11 };
  i7Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" },
  };
  i7Cell.border = {
    left: { style: "medium", color: { argb: "FF000000" } },
    right: { style: "thick", color: { argb: "FF000000" } },
  };
  sheet.mergeCells("F13:K13");
  const i8Cell = sheet.getCell("F13");
  i8Cell.value = "";
  i8Cell.alignment = { horizontal: "center", vertical: "middle" };
  i8Cell.font = { bold: false, size: 11 };
  i8Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" },
  };
  i8Cell.border = {
    left: { style: "medium", color: { argb: "FF000000" } },
    right: { style: "thick", color: { argb: "FF000000" } },
    bottom: { style: "medium", color: { argb: "FF000000" } },
  };
  // Observaciones
  sheet.mergeCells("B6:E6");
  const o1Cell = sheet.getCell("B6");
  o1Cell.value = " Alimentos refrigerados a una temperatura máxima de 4°C";
  o1Cell.alignment = { horizontal: "left", vertical: "middle" };
  o1Cell.font = { bold: false, size: 11 };
  o1Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" },
  };
  o1Cell.border = {
    left: { style: "thick", color: { argb: "FF000000" } },
    bottom: { style: "thin", color: { argb: "FF000000" } },
  };
  sheet.mergeCells("B7:E7");
  const o2Cell = sheet.getCell("B7");
  o2Cell.value = " Alimentos congelados a una temperatura máxima de -18°C";
  o2Cell.alignment = { horizontal: "left", vertical: "middle" };
  o2Cell.font = { bold: false, size: 11 };
  o2Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" },
  };
  o2Cell.border = {
    left: { style: "thick", color: { argb: "FF000000" } },
    bottom: { style: "thin", color: { argb: "FF000000" } },
  };
  sheet.mergeCells("B8:E8");
  const o3Cell = sheet.getCell("B8");
  o3Cell.value = " Revisar características organolépticas de alimentos perecederos.";
  o3Cell.alignment = { horizontal: "left", vertical: "middle" };
  o3Cell.font = { bold: false, size: 11 };
  o3Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" },
  };
  o3Cell.border = {
    left: { style: "thick", color: { argb: "FF000000" } },
    bottom: { style: "thin", color: { argb: "FF000000" } },
  };
  sheet.mergeCells("B9:E9");
  const o4Cell = sheet.getCell("B9");
  o4Cell.value = " Color y olor característicos; Textura firme Color y Olor caraterísticos.";
  o4Cell.alignment = { horizontal: "left", vertical: "middle" };
  o4Cell.font = { bold: false, size: 11 };
  o4Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" },
  };
  o4Cell.border = {
    left: { style: "thick", color: { argb: "FF000000" } },
    bottom: { style: "thin", color: { argb: "FF000000" } },
  };
  sheet.mergeCells("B10:E10");
  const o5Cell = sheet.getCell("B10");
  o5Cell.value = " Revisar fechas de caducidad vigentes.";
  o5Cell.alignment = { horizontal: "left", vertical: "middle" };
  o5Cell.font = { bold: false, size: 11 };
  o5Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" },
  };
  o5Cell.border = {
    left: { style: "thick", color: { argb: "FF000000" } },
    bottom: { style: "thin", color: { argb: "FF000000" } },
  };
  sheet.mergeCells("B11:E11");
  const o6Cell = sheet.getCell("B11");
  o6Cell.value = " Lácteos a base de leche pasteurizada.";
  o6Cell.alignment = { horizontal: "left", vertical: "middle" };
  o6Cell.font = { bold: false, size: 11 };
  o6Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" },
  };
  o6Cell.border = {
    left: { style: "thick", color: { argb: "FF000000" } },
    bottom: { style: "thin", color: { argb: "FF000000" } },
  };
  sheet.mergeCells("B12:E12");
  const o7Cell = sheet.getCell("B12");
  o7Cell.value = " Granos y semillas libres de plagas.";
  o7Cell.alignment = { horizontal: "left", vertical: "middle" };
  o7Cell.font = { bold: false, size: 11 };
  o7Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" },
  };
  o7Cell.border = {
    left: { style: "thick", color: { argb: "FF000000" } },
    bottom: { style: "thin", color: { argb: "FF000000" } },
  };
  sheet.mergeCells("B13:E13");
  const o8Cell = sheet.getCell("B13");
  o8Cell.value = "Folio Factura:";
  o8Cell.alignment = { horizontal: "left", vertical: "middle" };
  o8Cell.font = { bold: true, italic: true, size: 11 };
  o8Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" },
  };
  o8Cell.border = {
    left: { style: "thick", color: { argb: "FF000000" } },
    bottom: { style: "medium", color: { argb: "FF000000" } },
  };

  const cellB1 = sheet.getCell(`B14`);
  cellB1.value = 'Proveedor:'; // ejemplo de dato
  
  // Aplicas estilos a esa celda
  cellB1.font = { bold: true, size: 11 };
  cellB1.alignment = { horizontal: "center", vertical: "middle" };
  cellB1.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" }, // fondo blanco
  };
  cellB1.border = {
    left: { style: "medium", color: { argb: "FF000000" } },
    right: { style: "thick", color: { argb: "FF000000" } },
  };

  const cellB2 = sheet.getCell(`B15`);
  cellB2.value = isSuppliers.find(s => s.idproveedor === isTextFieldsWarehouseOrder.idproveedor)?.nombre; // ejemplo de dato
  
  // Aplicas estilos a esa celda
  cellB2.font = { bold: false, size: 11 };
  cellB2.alignment = { horizontal: "center", vertical: "middle" };
  cellB2.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" }, // fondo blanco
  };
  cellB2.border = {
    left: { style: "medium", color: { argb: "FF000000" } },
    right: { style: "thick", color: { argb: "FF000000" } },
  };
  // Asignas valores a las celdas de la fila
  sheet.mergeCells("C14:E14");
  const cellC1 = sheet.getCell(`C14`);
  cellC1.value = 'Observaciones'; // ejemplo de dato
  
  // Aplicas estilos a esa celda
  cellC1.font = { bold: true, size: 11 };
  cellC1.alignment = { horizontal: "center", vertical: "middle" };
  cellC1.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" }, // fondo blanco
  };
  cellC1.border = {
    left: { style: "medium", color: { argb: "FF000000" } },
    right: { style: "thick", color: { argb: "FF000000" } },
  };
  // Asignas valores a las celdas de la fila
  sheet.mergeCells("C15:E15");
  const cellC2 = sheet.getCell(`C15`);
  cellC2.value = 'del Vehículo:'; // ejemplo de dato
  
  // Aplicas estilos a esa celda
  cellC2.font = { bold: true, size: 11 };
  cellC2.alignment = { horizontal: "center", vertical: "middle" };
  cellC2.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" }, // fondo blanco
  };
  cellC2.border = {
    left: { style: "medium", color: { argb: "FF000000" } },
    right: { style: "thick", color: { argb: "FF000000" } },
  };
  // Asignas valores a las celdas de la fila
  sheet.mergeCells("F14:K14");
  const cellF1 = sheet.getCell(`F14`);
  cellF1.value = ' '; // ejemplo de dato
  
  // Aplicas estilos a esa celda
  cellF1.font = { bold: false, size: 11 };
  cellF1.alignment = { horizontal: "left", vertical: "middle" };
  cellF1.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" }, // fondo blanco
  };
  cellF1.border = {
    left: { style: "medium", color: { argb: "FF000000" } },
    right: { style: "thick", color: { argb: "FF000000" } },
  };
  // Asignas valores a las celdas de la fila
  sheet.mergeCells("F15:K15");
  const cellF2 = sheet.getCell(`F15`);
  cellF2.value = ' '; // ejemplo de dato
  
  // Aplicas estilos a esa celda
  cellF2.font = { bold: false, size: 11 };
  cellF2.alignment = { horizontal: "left", vertical: "middle" };
  cellF2.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" }, // fondo blanco
  };
  cellF2.border = {
    left: { style: "medium", color: { argb: "FF000000" } },
    right: { style: "thick", color: { argb: "FF000000" } },
  };
  //  Titulos de los productos
  const t1Cell = sheet.getCell("B16");
  t1Cell.value = " ";
  t1Cell.alignment = { horizontal: "left", vertical: "middle" };
  t1Cell.font = { bold: false, italic: true, size: 11 };
  t1Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFB0C4DE" },
  };
  t1Cell.border = {
    left: { style: "thick", color: { argb: "FF000000" } },
    right: { style: "medium", color: { argb: "FF000000" } },
    top: { style: "medium", color: { argb: "FF000000" } },
  };
  const t2Cell = sheet.getCell("C16");
  t2Cell.value = " ";
  t2Cell.alignment = { horizontal: "left", vertical: "middle" };
  t2Cell.font = { bold: false, italic: true, size: 11 };
  t2Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFB0C4DE" },
  };
  t2Cell.border = {
    right: { style: "medium", color: { argb: "FF000000" } },
    top: { style: "medium", color: { argb: "FF000000" } },
  };
  const t3Cell = sheet.getCell("D16");
  t3Cell.value = " ";
  t3Cell.alignment = { horizontal: "left", vertical: "middle" };
  t3Cell.font = { bold: false, italic: true, size: 11 };
  t3Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFB0C4DE" },
  };
  t3Cell.border = {
    right: { style: "medium", color: { argb: "FF000000" } },
    top: { style: "medium", color: { argb: "FF000000" } },
  };
  const t4Cell = sheet.getCell("E16");
  t4Cell.value = " ";
  t4Cell.alignment = { horizontal: "left", vertical: "middle" };
  t4Cell.font = { bold: false, italic: true, size: 11 };
  t4Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFB0C4DE" },
  };
  t4Cell.border = {
    right: { style: "medium", color: { argb: "FF000000" } },
    top: { style: "medium", color: { argb: "FF000000" } },
  };
  const t5Cell = sheet.getCell("F16");
  t5Cell.value = " ";
  t5Cell.alignment = { horizontal: "left", vertical: "middle" };
  t5Cell.font = { bold: false, italic: true, size: 11 };
  t5Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFB0C4DE" },
  };
  t5Cell.border = {
    right: { style: "medium", color: { argb: "FF000000" } },
    top: { style: "medium", color: { argb: "FF000000" } },
  };
  const t6Cell = sheet.getCell("G16");
  t6Cell.value = " ";
  t6Cell.alignment = { horizontal: "left", vertical: "middle" };
  t6Cell.font = { bold: false, italic: true, size: 11 };
  t6Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFB0C4DE" },
  };
  t6Cell.border = {
    right: { style: "medium", color: { argb: "FF000000" } },
    top: { style: "medium", color: { argb: "FF000000" } },
  };
  const t7Cell = sheet.getCell("H16");
  t7Cell.value = " ";
  t7Cell.alignment = { horizontal: "left", vertical: "middle" };
  t7Cell.font = { bold: false, italic: true, size: 11 };
  t7Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFB0C4DE" },
  };
  t7Cell.border = {
    right: { style: "medium", color: { argb: "FF000000" } },
    top: { style: "medium", color: { argb: "FF000000" } },
  };
  const t8Cell = sheet.getCell("I16");
  t8Cell.value = " ";
  t8Cell.alignment = { horizontal: "left", vertical: "middle" };
  t8Cell.font = { bold: false, italic: true, size: 11 };
  t8Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFB0C4DE" },
  };
  t8Cell.border = {
    right: { style: "medium", color: { argb: "FF000000" } },
    top: { style: "medium", color: { argb: "FF000000" } },
  };
  const t9Cell = sheet.getCell("J16");
  t9Cell.value = " ";
  t9Cell.alignment = { horizontal: "left", vertical: "middle" };
  t9Cell.font = { bold: false, italic: true, size: 11 };
  t9Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFB0C4DE" },
  };
  t9Cell.border = {
    right: { style: "medium", color: { argb: "FF000000" } },
    top: { style: "medium", color: { argb: "FF000000" } },
  };
  const t10Cell = sheet.getCell("K16");
  t10Cell.value = " ";
  t10Cell.alignment = { horizontal: "left", vertical: "middle" };
  t10Cell.font = { bold: false, italic: true, size: 11 };
  t10Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFB0C4DE" },
  };
  t10Cell.border = {
    right: { style: "thick", color: { argb: "FF000000" } },
    top: { style: "medium", color: { argb: "FF000000" } },
  };
  const t11Cell = sheet.getCell("B18");
  t11Cell.value = " ";
  t11Cell.alignment = { horizontal: "left", vertical: "middle" };
  t11Cell.font = { bold: false, italic: true, size: 11 };
  t11Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFB0C4DE" },
  };
  t11Cell.border = {
    left: { style: "thick", color: { argb: "FF000000" } },
    right: { style: "medium", color: { argb: "FF000000" } },
  };
  const t12Cell = sheet.getCell("C18");
  t12Cell.value = " ";
  t12Cell.alignment = { horizontal: "left", vertical: "middle" };
  t12Cell.font = { bold: false, italic: true, size: 11 };
  t12Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFB0C4DE" },
  };
  t12Cell.border = {
    right: { style: "medium", color: { argb: "FF000000" } },
  };
  const t13Cell = sheet.getCell("D18");
  t13Cell.value = " ";
  t13Cell.alignment = { horizontal: "left", vertical: "middle" };
  t13Cell.font = { bold: false, italic: true, size: 11 };
  t13Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFB0C4DE" },
  };
  t13Cell.border = {
    right: { style: "medium", color: { argb: "FF000000" } },
  };
  const t14Cell = sheet.getCell("E18");
  t14Cell.value = " ";
  t14Cell.alignment = { horizontal: "left", vertical: "middle" };
  t14Cell.font = { bold: false, italic: true, size: 11 };
  t14Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFB0C4DE" },
  };
  t14Cell.border = {
    right: { style: "medium", color: { argb: "FF000000" } },
  };
  const t15Cell = sheet.getCell("F18");
  t15Cell.value = " ";
  t15Cell.alignment = { horizontal: "left", vertical: "middle" };
  t15Cell.font = { bold: false, italic: true, size: 11 };
  t15Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFB0C4DE" },
  };
  t15Cell.border = {
    right: { style: "medium", color: { argb: "FF000000" } },
  };
  const t16Cell = sheet.getCell("G18");
  t16Cell.value = " ";
  t16Cell.alignment = { horizontal: "left", vertical: "middle" };
  t16Cell.font = { bold: false, italic: true, size: 11 };
  t16Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFB0C4DE" },
  };
  t16Cell.border = {
    right: { style: "medium", color: { argb: "FF000000" } },
  };
  const t17Cell = sheet.getCell("H18");
  t17Cell.value = " ";
  t17Cell.alignment = { horizontal: "left", vertical: "middle" };
  t17Cell.font = { bold: false, italic: true, size: 11 };
  t17Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFB0C4DE" },
  };
  t17Cell.border = {
    right: { style: "medium", color: { argb: "FF000000" } },
  };
  const t18Cell = sheet.getCell("I18");
  t18Cell.value = " ";
  t18Cell.alignment = { horizontal: "left", vertical: "middle" };
  t18Cell.font = { bold: false, italic: true, size: 11 };
  t18Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFB0C4DE" },
  };
  t18Cell.border = {
    right: { style: "medium", color: { argb: "FF000000" } },
  };
  const t19Cell = sheet.getCell("J18");
  t19Cell.value = " ";
  t19Cell.alignment = { horizontal: "left", vertical: "middle" };
  t19Cell.font = { bold: false, italic: true, size: 11 };
  t19Cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFB0C4DE" },
  };
  const headersProducts = [
    { range: "B17", text: "Descripción" },
    { range: "C17", text: 'CÓDIGO' },
    { range: "D17", text: "UNIDAD" },
    { range: "E17", text: "PROVEEDOR" },
    { range: "F17", text: "C.S" },
    { range: "G17", text: "C.R" },
    { range: "H17", text: "C.D" },
    { range: "I17", text: "C.O" },
    { range: "J17", text: "Temp. (0 - 43°C)" },
    { range: "K17", text: "Caducidad" },
    { range: "K18", text: "Vigente" },
  ];
  headersProducts.forEach(({ range, text }) => {
    sheet.mergeCells(range);
    const cell = sheet.getCell(range.split(":")[0]); // toma la celda inicial
    cell.value = text;
    cell.font = { bold: true, size: 11 }; // negritas
    cell.alignment = { horizontal: "center", vertical: "middle" }; // centrado
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFB0C4DE" }, // Blanco
    };
    if(text === 'Descripción'){
      cell.border = {
        left: { style: "thick", color: { argb: "FF000000" } },
        right: { style: "medium", color: { argb: "FF000000" } },
      };
    }else if(text === 'Caducidad'){
      cell.border = {
        left: { style: "medium", color: { argb: "FF000000" } },
        right: { style: "thick", color: { argb: "FF000000" } },
      };
    }else if(text === 'Vigente'){
      cell.border = {
        left: { style: "medium", color: { argb: "FF000000" } },
        right: { style: "thick", color: { argb: "FF000000" } },
        bottom: { style: "medium", color: { argb: "FF000000" } },
      };
    }else{
      cell.border = {
        left: { style: "medium", color: { argb: "FF000000" } },
        right: { style: "medium", color: { argb: "FF000000" } },
      };
    }
  });
  // Parte de productos
  isTextFieldsWarehouseOrder.insumos.map((supply, index) => {
    const rowNumber = 19 + index; // ejemplo: empiezas en la fila 14 y bajas
    const s = isSupplies.find(s => s.idinsumo === supply.idinsumo);
    const t = isSupplyTypes.find(t => t.idtipo === s.idtipo);
    const c = isCountSupplyTypes.find(c => c.idcantidad === s.idcantidad);

    // Asignas valores a las celdas de la fila
    const cellB = sheet.getCell(`B${rowNumber}`);
    cellB.value = s?.nombre; // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellB.font = { bold: false, size: 11 };
    cellB.alignment = { horizontal: "left", vertical: "middle" };
    cellB.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFADD8E6" }, // fondo blanco
    };
    cellB.border = {
      top: { style: "thin", color: { argb: "FF000000" } },
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "medium", color: { argb: "FF000000" } },
      bottom: { style: "thin", color: { argb: "FF000000" } },
    };
    // Asignas valores a las celdas de la fila
    const cellC = sheet.getCell(`C${rowNumber}`);
    cellC.value = s?.codigo // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellC.font = { bold: false, size: 11 };
    cellC.alignment = { horizontal: "center", vertical: "middle" };
    cellC.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFADD8E6" }, // fondo blanco
    };
    cellC.border = {
      top: { style: "thin", color: { argb: "FF000000" } },
      right: { style: "medium", color: { argb: "FF000000" } },
      bottom: { style: "thin", color: { argb: "FF000000" } },
    };

    // Asignas valores a las celdas de la fila
    const cellD = sheet.getCell(`D${rowNumber}`);
    cellD.value = `${c.cantidad} ${t.unidad == 'Kilogramo' ? 'KG' : t.unidad == 'Litro' ? 'LT' : 'PZ'}` // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellD.font = { bold: false, size: 11 };
    cellD.alignment = { horizontal: "center", vertical: "middle" };
    cellD.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFADD8E6" }, // fondo blanco
    };
    cellD.border = {
      top: { style: "thin", color: { argb: "FF000000" } },
      right: { style: "medium", color: { argb: "FF000000" } },
      bottom: { style: "thin", color: { argb: "FF000000" } },
    };

    // Asignas valores a las celdas de la fila
    const cellE = sheet.getCell(`E${rowNumber}`);
    cellE.value = `${isSuppliers.find(s => s.idproveedor === isTextFieldsWarehouseOrder.idproveedor)?.nombre}` // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellE.font = { bold: false, size: 11 };
    cellE.alignment = { horizontal: "center", vertical: "middle" };
    cellE.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFADD8E6" }, // fondo blanco
    };
    cellE.border = {
      top: { style: "thin", color: { argb: "FF000000" } },
      right: { style: "medium", color: { argb: "FF000000" } },
      bottom: { style: "thin", color: { argb: "FF000000" } },
    };
    
    // Asignas valores a las celdas de la fila
    const cellF = sheet.getCell(`F${rowNumber}`);
    cellF.value = `${supply.cantidad}` // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellF.font = { bold: false, size: 11 };
    cellF.alignment = { horizontal: "center", vertical: "middle" };
    cellF.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFADD8E6" }, // fondo blanco
    };
    cellF.border = {
      top: { style: "thin", color: { argb: "FF000000" } },
      right: { style: "medium", color: { argb: "FF000000" } },
      bottom: { style: "thin", color: { argb: "FF000000" } },
    };

    // Asignas valores a las celdas de la fila
    const cellG = sheet.getCell(`G${rowNumber}`);
    cellG.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellG.font = { bold: false, size: 11 };
    cellG.alignment = { horizontal: "center", vertical: "middle" };
    cellG.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellG.border = {
      top: { style: "thin", color: { argb: "FF000000" } },
      right: { style: "medium", color: { argb: "FF000000" } },
      bottom: { style: "thin", color: { argb: "FF000000" } },
    };

    // Asignas valores a las celdas de la fila
    const cellH = sheet.getCell(`H${rowNumber}`);
    cellH.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellH.font = { bold: false, size: 11 };
    cellH.alignment = { horizontal: "center", vertical: "middle" };
    cellH.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellH.border = {
      top: { style: "thin", color: { argb: "FF000000" } },
      right: { style: "medium", color: { argb: "FF000000" } },
      bottom: { style: "thin", color: { argb: "FF000000" } },
    };

    // Asignas valores a las celdas de la fila
    const cellI = sheet.getCell(`I${rowNumber}`);
    cellI.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellI.font = { bold: false, size: 11 };
    cellI.alignment = { horizontal: "center", vertical: "middle" };
    cellI.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellI.border = {
      top: { style: "thin", color: { argb: "FF000000" } },
      right: { style: "medium", color: { argb: "FF000000" } },
      bottom: { style: "thin", color: { argb: "FF000000" } },
    };

    // Asignas valores a las celdas de la fila
    const cellJ = sheet.getCell(`J${rowNumber}`);
    cellJ.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellJ.font = { bold: false, size: 11 };
    cellJ.alignment = { horizontal: "center", vertical: "middle" };
    cellJ.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellJ.border = {
      top: { style: "thin", color: { argb: "FF000000" } },
      right: { style: "medium", color: { argb: "FF000000" } },
      bottom: { style: "thin", color: { argb: "FF000000" } },
    };

    // Asignas valores a las celdas de la fila
    const cellK = sheet.getCell(`K${rowNumber}`);
    cellK.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellK.font = { bold: false, size: 11 };
    cellK.alignment = { horizontal: "center", vertical: "middle" };
    cellK.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellK.border = {
      top: { style: "thin", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thin", color: { argb: "FF000000" } },
    };
  });
  isTextFieldsWarehouseOrder.suministros.map((supply, index) => {
    const rowNumber = 19 + index; // ejemplo: empiezas en la fila 14 y bajas
    const s = isCleaningSupplies.find(s => s.idsuministro === supply.idsuministro);
    const t = isCleaningTypes.find(t => t.idtipo === s.idtipo);
    const c = isCountCleaningTypes.find(c => c.idcantidad === s.idcantidad);

    // Asignas valores a las celdas de la fila
    const cellB = sheet.getCell(`B${rowNumber}`);
    cellB.value = s?.nombre; // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellB.font = { bold: false, size: 11 };
    cellB.alignment = { horizontal: "left", vertical: "middle" };
    cellB.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFADD8E6" }, // fondo blanco
    };
    cellB.border = {
      top: { style: "thin", color: { argb: "FF000000" } },
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "medium", color: { argb: "FF000000" } },
      bottom: { style: "thin", color: { argb: "FF000000" } },
    };
    // Asignas valores a las celdas de la fila
    const cellC = sheet.getCell(`C${rowNumber}`);
    cellC.value = s?.codigo // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellC.font = { bold: false, size: 11 };
    cellC.alignment = { horizontal: "center", vertical: "middle" };
    cellC.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFADD8E6" }, // fondo blanco
    };
    cellC.border = {
      top: { style: "thin", color: { argb: "FF000000" } },
      right: { style: "medium", color: { argb: "FF000000" } },
      bottom: { style: "thin", color: { argb: "FF000000" } },
    };

    // Asignas valores a las celdas de la fila
    const cellD = sheet.getCell(`D${rowNumber}`);
    cellD.value = `${c.cantidad} ${t.unidad == 'Kilogramo' ? 'KG' : t.unidad == 'Litro' ? 'LT' : 'PZ'}` // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellD.font = { bold: false, size: 11 };
    cellD.alignment = { horizontal: "center", vertical: "middle" };
    cellD.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFADD8E6" }, // fondo blanco
    };
    cellD.border = {
      top: { style: "thin", color: { argb: "FF000000" } },
      right: { style: "medium", color: { argb: "FF000000" } },
      bottom: { style: "thin", color: { argb: "FF000000" } },
    };

    // Asignas valores a las celdas de la fila
    const cellE = sheet.getCell(`E${rowNumber}`);
    cellE.value = `${isSuppliers.find(s => s.idproveedor === isTextFieldsWarehouseOrder.idproveedor)?.nombre}` // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellE.font = { bold: false, size: 11 };
    cellE.alignment = { horizontal: "center", vertical: "middle" };
    cellE.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFADD8E6" }, // fondo blanco
    };
    cellE.border = {
      top: { style: "thin", color: { argb: "FF000000" } },
      right: { style: "medium", color: { argb: "FF000000" } },
      bottom: { style: "thin", color: { argb: "FF000000" } },
    };
    
    // Asignas valores a las celdas de la fila
    const cellF = sheet.getCell(`F${rowNumber}`);
    cellF.value = `${supply.cantidad}` // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellF.font = { bold: false, size: 11 };
    cellF.alignment = { horizontal: "center", vertical: "middle" };
    cellF.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFADD8E6" }, // fondo blanco
    };
    cellF.border = {
      top: { style: "thin", color: { argb: "FF000000" } },
      right: { style: "medium", color: { argb: "FF000000" } },
      bottom: { style: "thin", color: { argb: "FF000000" } },
    };

    // Asignas valores a las celdas de la fila
    const cellG = sheet.getCell(`G${rowNumber}`);
    cellG.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellG.font = { bold: false, size: 11 };
    cellG.alignment = { horizontal: "center", vertical: "middle" };
    cellG.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellG.border = {
      top: { style: "thin", color: { argb: "FF000000" } },
      right: { style: "medium", color: { argb: "FF000000" } },
      bottom: { style: "thin", color: { argb: "FF000000" } },
    };

    // Asignas valores a las celdas de la fila
    const cellH = sheet.getCell(`H${rowNumber}`);
    cellH.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellH.font = { bold: false, size: 11 };
    cellH.alignment = { horizontal: "center", vertical: "middle" };
    cellH.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellH.border = {
      top: { style: "thin", color: { argb: "FF000000" } },
      right: { style: "medium", color: { argb: "FF000000" } },
      bottom: { style: "thin", color: { argb: "FF000000" } },
    };

    // Asignas valores a las celdas de la fila
    const cellI = sheet.getCell(`I${rowNumber}`);
    cellI.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellI.font = { bold: false, size: 11 };
    cellI.alignment = { horizontal: "center", vertical: "middle" };
    cellI.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellI.border = {
      top: { style: "thin", color: { argb: "FF000000" } },
      right: { style: "medium", color: { argb: "FF000000" } },
      bottom: { style: "thin", color: { argb: "FF000000" } },
    };

    // Asignas valores a las celdas de la fila
    const cellJ = sheet.getCell(`J${rowNumber}`);
    cellJ.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellJ.font = { bold: false, size: 11 };
    cellJ.alignment = { horizontal: "center", vertical: "middle" };
    cellJ.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellJ.border = {
      top: { style: "thin", color: { argb: "FF000000" } },
      right: { style: "medium", color: { argb: "FF000000" } },
      bottom: { style: "thin", color: { argb: "FF000000" } },
    };

    // Asignas valores a las celdas de la fila
    const cellK = sheet.getCell(`K${rowNumber}`);
    cellK.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellK.font = { bold: false, size: 11 };
    cellK.alignment = { horizontal: "center", vertical: "middle" };
    cellK.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellK.border = {
      top: { style: "thin", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thin", color: { argb: "FF000000" } },
    };
  });
  // FOOTER
  if(isTextFieldsWarehouseOrder.insumos.length > 0){
    const index = 19 + isTextFieldsWarehouseOrder.insumos.length;
    //  EVALUACION
    // Asignas valores a las celdas de la fila
    sheet.mergeCells(`B${index}:K${index}`);
    const cellB1 = sheet.getCell(`B${index}`);
    cellB1.value = 'EVALUACIÓN DEL PROVEEDOR EN LA ENTREGA DEL PRODUCTO' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellB1.font = { bold: false, size: 11 , color :{ argb: 'FFFFFFFF' }};
    cellB1.alignment = { horizontal: "center", vertical: "middle" };
    cellB1.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF6495ED" }, // fondo blanco
    };
    cellB1.border = {
      top: { style: "thick", color: { argb: "FF000000" } },
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };
    
    const cellB221 = sheet.getCell(`B${index+1}`);
    cellB221.value = 'TRANSPORTE LIMPIO Y CAJAS' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellB221.font = { bold: false, size: 11 };
    cellB221.alignment = { horizontal: "center", vertical: "middle" };
    cellB221.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellB221.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    const cellB222 = sheet.getCell(`B${index+2}`);
    cellB222.value = 'USO DE COPIAS' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellB222.font = { bold: false, size: 11 };
    cellB222.alignment = { horizontal: "center", vertical: "middle" };
    cellB222.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellB222.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    const cellC221 = sheet.getCell(`C${index+1}`);
    cellC221.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellC221.font = { bold: false, size: 11 };
    cellC221.alignment = { horizontal: "center", vertical: "middle" };
    cellC221.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellC221.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    const cellC222 = sheet.getCell(`C${index+2}`);
    cellC222.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellC222.font = { bold: false, size: 11 };
    cellC222.alignment = { horizontal: "center", vertical: "middle" };
    cellC222.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellC222.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`D${index+1}:E${index+1}`);
    const cellD221 = sheet.getCell(`D${index+1}`);
    cellD221.value = 'UNIFORME LIMPIO' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellD221.font = { bold: false, size: 11 };
    cellD221.alignment = { horizontal: "center", vertical: "middle" };
    cellD221.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellD221.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`D${index+2}:E${index+2}`);
    const cellD222 = sheet.getCell(`D${index+2}`);
    cellD222.value = 'USO DE CUBREBOCAS' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellD222.font = { bold: false, size: 11 };
    cellD222.alignment = { horizontal: "center", vertical: "middle" };
    cellD222.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellD222.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`F${index+1}:G${index+1}`);
    const cellF222 = sheet.getCell(`F${index+1}`);
    cellF222.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellF222.font = { bold: false, size: 11 };
    cellF222.alignment = { horizontal: "center", vertical: "middle" };
    cellF222.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellF222.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`F${index+2}:G${index+2}`);
    const cellF221 = sheet.getCell(`F${index+2}`);
    cellF221.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellF221.font = { bold: false, size: 11 };
    cellF221.alignment = { horizontal: "center", vertical: "middle" };
    cellF221.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellF221.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`H${index+1}:I${index+1}`);
    const cellH221 = sheet.getCell(`H${index+1}`);
    cellH221.value = 'Código CLF - 05' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellH221.font = { bold: false, size: 11 };
    cellH221.alignment = { horizontal: "center", vertical: "middle" };
    cellH221.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellH221.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`H${index+2}:I${index+2}`);
    const cellH222 = sheet.getCell(`H${index+2}`);
    cellH222.value = 'Rcv. 0' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellH222.font = { bold: false, size: 11 };
    cellH222.alignment = { horizontal: "center", vertical: "middle" };
    cellH222.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellH222.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`J${index+1}:K${index+1}`);
    const cellJ212 = sheet.getCell(`J${index+1}`);
    cellJ212.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellJ212.font = { bold: false, size: 11 };
    cellJ212.alignment = { horizontal: "center", vertical: "middle" };
    cellJ212.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellJ212.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`J${index+2}:K${index+2}`);
    const cellJ221 = sheet.getCell(`J${index+2}`);
    cellJ221.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellJ221.font = { bold: false, size: 11 };
    cellJ221.alignment = { horizontal: "center", vertical: "middle" };
    cellJ221.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellJ221.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    // CODIFICACION
    // Asignas valores a las celdas de la fila
    sheet.mergeCells(`B${index+3}:K${index+3}`);
    const cellB2 = sheet.getCell(`B${index+3}`);
    cellB2.value = 'CODIFICACIÓN' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellB2.font = { bold: false, size: 11 , color :{ argb: 'FFFFFFFF' }};
    cellB2.alignment = { horizontal: "center", vertical: "middle" };
    cellB2.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF6495ED" }, // fondo blanco
    };
    cellB2.border = {
      top: { style: "thick", color: { argb: "FF000000" } },
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`B${index+4}:C${index+4}`);
    const cellB21 = sheet.getCell(`B${index+4}`);
    cellB21.value = 'C.S Cantidad Solicitada' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellB21.font = { bold: false, size: 11 };
    cellB21.alignment = { horizontal: "center", vertical: "middle" };
    cellB21.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellB21.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`B${index+5}:C${index+5}`);
    const cellB22 = sheet.getCell(`B${index+5}`);
    cellB22.value = 'C.R Cantidad Recibida' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellB22.font = { bold: false, size: 11 };
    cellB22.alignment = { horizontal: "center", vertical: "middle" };
    cellB22.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellB22.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`D${index+4}:E${index+4}`);
    const cellD21 = sheet.getCell(`D${index+4}`);
    cellD21.value = 'C.D Cantidad Devuelta' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellD21.font = { bold: false, size: 11 };
    cellD21.alignment = { horizontal: "center", vertical: "middle" };
    cellD21.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellD21.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`D${index+5}:E${index+5}`);
    const cellD22 = sheet.getCell(`D${index+5}`);
    cellD22.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellD22.font = { bold: false, size: 11 };
    cellD22.alignment = { horizontal: "center", vertical: "middle" };
    cellD22.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellD22.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`F${index+4}:G${index+4}`);
    const cellF21 = sheet.getCell(`F${index+4}`);
    cellF21.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellF21.font = { bold: false, size: 11 };
    cellF21.alignment = { horizontal: "center", vertical: "middle" };
    cellF21.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellF21.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`H${index+4}:I${index+4}`);
    const cellH21 = sheet.getCell(`H${index+4}`);
    cellH21.value = 'C.V Caducidad Vigente' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellH21.font = { bold: false, size: 11 };
    cellH21.alignment = { horizontal: "center", vertical: "middle" };
    cellH21.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellH21.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`H${index+5}:I${index+5}`);
    const cellH22 = sheet.getCell(`H${index+5}`);
    cellH22.value = 'NA No Aplica' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellH22.font = { bold: false, size: 11 };
    cellH22.alignment = { horizontal: "center", vertical: "middle" };
    cellH22.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellH22.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`J${index+4}:K${index+4}`);
    const cellJ21 = sheet.getCell(`J${index+4}`);
    cellJ21.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellJ21.font = { bold: false, size: 11 };
    cellJ21.alignment = { horizontal: "center", vertical: "middle" };
    cellJ21.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellJ21.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`J${index+5}:K${index+5}`);
    const cellJ22 = sheet.getCell(`J${index+5}`);
    cellJ22.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellJ22.font = { bold: false, size: 11 };
    cellJ22.alignment = { horizontal: "center", vertical: "middle" };
    cellJ22.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellJ22.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    // SOLICITUD
    const cellB3 = sheet.getCell(`B${index+6}`);
    cellB3.value = 'SOLICITADO POR:' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellB3.font = { bold: false, size: 11 , color :{ argb: 'FFFFFFFF' }};
    cellB3.alignment = { horizontal: "center", vertical: "middle" };
    cellB3.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF6495ED" }, // fondo blanco
    };
    cellB3.border = {
      top: { style: "thick", color: { argb: "FF000000" } },
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    const cellB4 = sheet.getCell(`B${index+7}`);
    cellB4.value = isUsers.find(u => u.idusuario === isTextFieldsWarehouseOrder.idusuario)?.nombre // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellB4.font = { bold: false, size: 11};
    cellB4.alignment = { horizontal: "center", vertical: "middle" };
    cellB4.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellB4.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`C${index+6}:E${index+6}`);
    const cellC1 = sheet.getCell(`C${index+6}`);
    cellC1.value = 'RECIBIDO POR ALMACÉN' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellC1.font = { bold: false, size: 11 , color :{ argb: 'FFFFFFFF' }};
    cellC1.alignment = { horizontal: "center", vertical: "middle" };
    cellC1.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF6495ED" }, // fondo blanco
    };
    cellC1.border = {
      top: { style: "thick", color: { argb: "FF000000" } },
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };
    // Aplicas estilos a esa celda
    cellB3.font = { bold: false, size: 11 , color :{ argb: 'FFFFFFFF' }};
    cellB3.alignment = { horizontal: "center", vertical: "middle" };
    cellB3.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF6495ED" }, // fondo blanco
    };
    cellB3.border = {
      top: { style: "thick", color: { argb: "FF000000" } },
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };
    
    sheet.mergeCells(`C${index+7}:E${index+7}`);
    const cellC2 = sheet.getCell(`C${index+7}`);
    cellC2.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellC2.font = { bold: false, size: 11 };
    cellC2.alignment = { horizontal: "center", vertical: "middle" };
    cellC2.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellC2.border = {
      right: { style: "medium", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`F${index+6}:I${index+6}`);
    const cellF1 = sheet.getCell(`F${index+6}`);
    cellF1.value = 'COMPRAS' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellF1.font = { bold: false, size: 11 , color :{ argb: 'FFFFFFFF' }};
    cellF1.alignment = { horizontal: "center", vertical: "middle" };
    cellF1.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF6495ED" }, // fondo blanco
    };
    cellF1.border = {
      top: { style: "thick", color: { argb: "FF000000" } },
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`F${index+7}:I${index+7}`);
    const cellF2 = sheet.getCell(`F${index+7}`);
    cellF2.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellF2.font = { bold: false, size: 11 };
    cellF2.alignment = { horizontal: "center", vertical: "middle" };
    cellF2.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellF2.border = {
      right: { style: "medium", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`J${index+6}:K${index+6}`);
    const cellJ1 = sheet.getCell(`J${index+6}`);
    cellJ1.value = 'AUTORIZO' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellJ1.font = { bold: false, size: 11 , color :{ argb: 'FFFFFFFF' }};
    cellJ1.alignment = { horizontal: "center", vertical: "middle" };
    cellJ1.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF6495ED" }, // fondo blanco
    };
    cellJ1.border = {
      top: { style: "thick", color: { argb: "FF000000" } },
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };
    sheet.mergeCells(`J${index+7}:K${index+7}`);
    const cellJ2 = sheet.getCell(`J${index+7}`);
    cellJ2.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellJ2.font = { bold: false, size: 11 };
    cellJ2.alignment = { horizontal: "center", vertical: "middle" };
    cellJ2.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellJ2.border = {
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };
  }
  if(isTextFieldsWarehouseOrder.suministros.length > 0){
    const index = 19 + isTextFieldsWarehouseOrder.suministros.length;
    //  EVALUACION
    // Asignas valores a las celdas de la fila
    sheet.mergeCells(`B${index}:K${index}`);
    const cellB1 = sheet.getCell(`B${index}`);
    cellB1.value = 'EVALUACIÓN DEL PROVEEDOR EN LA ENTREGA DEL PRODUCTO' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellB1.font = { bold: false, size: 11 , color :{ argb: 'FFFFFFFF' }};
    cellB1.alignment = { horizontal: "center", vertical: "middle" };
    cellB1.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF6495ED" }, // fondo blanco
    };
    cellB1.border = {
      top: { style: "thick", color: { argb: "FF000000" } },
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };
    
    const cellB221 = sheet.getCell(`B${index+1}`);
    cellB221.value = 'TRANSPORTE LIMPIO Y CAJAS' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellB221.font = { bold: false, size: 11 };
    cellB221.alignment = { horizontal: "center", vertical: "middle" };
    cellB221.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellB221.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    const cellB222 = sheet.getCell(`B${index+2}`);
    cellB222.value = 'USO DE COPIAS' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellB222.font = { bold: false, size: 11 };
    cellB222.alignment = { horizontal: "center", vertical: "middle" };
    cellB222.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellB222.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    const cellC221 = sheet.getCell(`C${index+1}`);
    cellC221.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellC221.font = { bold: false, size: 11 };
    cellC221.alignment = { horizontal: "center", vertical: "middle" };
    cellC221.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellC221.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    const cellC222 = sheet.getCell(`C${index+2}`);
    cellC222.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellC222.font = { bold: false, size: 11 };
    cellC222.alignment = { horizontal: "center", vertical: "middle" };
    cellC222.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellC222.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`D${index+1}:E${index+1}`);
    const cellD221 = sheet.getCell(`D${index+1}`);
    cellD221.value = 'UNIFORME LIMPIO' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellD221.font = { bold: false, size: 11 };
    cellD221.alignment = { horizontal: "center", vertical: "middle" };
    cellD221.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellD221.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`D${index+2}:E${index+2}`);
    const cellD222 = sheet.getCell(`D${index+2}`);
    cellD222.value = 'USO DE CUBREBOCAS' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellD222.font = { bold: false, size: 11 };
    cellD222.alignment = { horizontal: "center", vertical: "middle" };
    cellD222.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellD222.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`F${index+1}:G${index+1}`);
    const cellF222 = sheet.getCell(`F${index+1}`);
    cellF222.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellF222.font = { bold: false, size: 11 };
    cellF222.alignment = { horizontal: "center", vertical: "middle" };
    cellF222.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellF222.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`F${index+2}:G${index+2}`);
    const cellF221 = sheet.getCell(`F${index+2}`);
    cellF221.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellF221.font = { bold: false, size: 11 };
    cellF221.alignment = { horizontal: "center", vertical: "middle" };
    cellF221.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellF221.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`H${index+1}:I${index+1}`);
    const cellH221 = sheet.getCell(`H${index+1}`);
    cellH221.value = 'Código CLF - 05' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellH221.font = { bold: false, size: 11 };
    cellH221.alignment = { horizontal: "center", vertical: "middle" };
    cellH221.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellH221.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`H${index+2}:I${index+2}`);
    const cellH222 = sheet.getCell(`H${index+2}`);
    cellH222.value = 'Rcv. 0' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellH222.font = { bold: false, size: 11 };
    cellH222.alignment = { horizontal: "center", vertical: "middle" };
    cellH222.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellH222.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`J${index+1}:K${index+1}`);
    const cellJ212 = sheet.getCell(`J${index+1}`);
    cellJ212.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellJ212.font = { bold: false, size: 11 };
    cellJ212.alignment = { horizontal: "center", vertical: "middle" };
    cellJ212.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellJ212.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`J${index+2}:K${index+2}`);
    const cellJ221 = sheet.getCell(`J${index+2}`);
    cellJ221.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellJ221.font = { bold: false, size: 11 };
    cellJ221.alignment = { horizontal: "center", vertical: "middle" };
    cellJ221.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellJ221.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    // CODIFICACION
    // Asignas valores a las celdas de la fila
    sheet.mergeCells(`B${index+3}:K${index+3}`);
    const cellB2 = sheet.getCell(`B${index+3}`);
    cellB2.value = 'CODIFICACIÓN' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellB2.font = { bold: false, size: 11 , color :{ argb: 'FFFFFFFF' }};
    cellB2.alignment = { horizontal: "center", vertical: "middle" };
    cellB2.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF6495ED" }, // fondo blanco
    };
    cellB2.border = {
      top: { style: "thick", color: { argb: "FF000000" } },
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`B${index+4}:C${index+4}`);
    const cellB21 = sheet.getCell(`B${index+4}`);
    cellB21.value = 'C.S Cantidad Solicitada' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellB21.font = { bold: false, size: 11 };
    cellB21.alignment = { horizontal: "center", vertical: "middle" };
    cellB21.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellB21.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`B${index+5}:C${index+5}`);
    const cellB22 = sheet.getCell(`B${index+5}`);
    cellB22.value = 'C.R Cantidad Recibida' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellB22.font = { bold: false, size: 11 };
    cellB22.alignment = { horizontal: "center", vertical: "middle" };
    cellB22.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellB22.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`D${index+4}:E${index+4}`);
    const cellD21 = sheet.getCell(`D${index+4}`);
    cellD21.value = 'C.D Cantidad Devuelta' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellD21.font = { bold: false, size: 11 };
    cellD21.alignment = { horizontal: "center", vertical: "middle" };
    cellD21.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellD21.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`D${index+5}:E${index+5}`);
    const cellD22 = sheet.getCell(`D${index+5}`);
    cellD22.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellD22.font = { bold: false, size: 11 };
    cellD22.alignment = { horizontal: "center", vertical: "middle" };
    cellD22.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellD22.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`F${index+4}:G${index+4}`);
    const cellF21 = sheet.getCell(`F${index+4}`);
    cellF21.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellF21.font = { bold: false, size: 11 };
    cellF21.alignment = { horizontal: "center", vertical: "middle" };
    cellF21.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellF21.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`H${index+4}:I${index+4}`);
    const cellH21 = sheet.getCell(`H${index+4}`);
    cellH21.value = 'C.V Caducidad Vigente' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellH21.font = { bold: false, size: 11 };
    cellH21.alignment = { horizontal: "center", vertical: "middle" };
    cellH21.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellH21.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`H${index+5}:I${index+5}`);
    const cellH22 = sheet.getCell(`H${index+5}`);
    cellH22.value = 'NA No Aplica' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellH22.font = { bold: false, size: 11 };
    cellH22.alignment = { horizontal: "center", vertical: "middle" };
    cellH22.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellH22.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`J${index+4}:K${index+4}`);
    const cellJ21 = sheet.getCell(`J${index+4}`);
    cellJ21.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellJ21.font = { bold: false, size: 11 };
    cellJ21.alignment = { horizontal: "center", vertical: "middle" };
    cellJ21.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellJ21.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`J${index+5}:K${index+5}`);
    const cellJ22 = sheet.getCell(`J${index+5}`);
    cellJ22.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellJ22.font = { bold: false, size: 11 };
    cellJ22.alignment = { horizontal: "center", vertical: "middle" };
    cellJ22.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellJ22.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    // SOLICITUD
    const cellB3 = sheet.getCell(`B${index+6}`);
    cellB3.value = 'SOLICITADO POR:' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellB3.font = { bold: false, size: 11 , color :{ argb: 'FFFFFFFF' }};
    cellB3.alignment = { horizontal: "center", vertical: "middle" };
    cellB3.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF6495ED" }, // fondo blanco
    };
    cellB3.border = {
      top: { style: "thick", color: { argb: "FF000000" } },
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    const cellB4 = sheet.getCell(`B${index+7}`);
    cellB4.value = isUsers.find(u => u.idusuario === isTextFieldsWarehouseOrder.idusuario)?.nombre // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellB4.font = { bold: false, size: 11};
    cellB4.alignment = { horizontal: "center", vertical: "middle" };
    cellB4.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellB4.border = {
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`C${index+6}:E${index+6}`);
    const cellC1 = sheet.getCell(`C${index+6}`);
    cellC1.value = 'RECIBIDO POR ALMACÉN' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellC1.font = { bold: false, size: 11 , color :{ argb: 'FFFFFFFF' }};
    cellC1.alignment = { horizontal: "center", vertical: "middle" };
    cellC1.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF6495ED" }, // fondo blanco
    };
    cellC1.border = {
      top: { style: "thick", color: { argb: "FF000000" } },
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };
    // Aplicas estilos a esa celda
    cellB3.font = { bold: false, size: 11 , color :{ argb: 'FFFFFFFF' }};
    cellB3.alignment = { horizontal: "center", vertical: "middle" };
    cellB3.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF6495ED" }, // fondo blanco
    };
    cellB3.border = {
      top: { style: "thick", color: { argb: "FF000000" } },
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };
    
    sheet.mergeCells(`C${index+7}:E${index+7}`);
    const cellC2 = sheet.getCell(`C${index+7}`);
    cellC2.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellC2.font = { bold: false, size: 11 };
    cellC2.alignment = { horizontal: "center", vertical: "middle" };
    cellC2.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellC2.border = {
      right: { style: "medium", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`F${index+6}:I${index+6}`);
    const cellF1 = sheet.getCell(`F${index+6}`);
    cellF1.value = 'COMPRAS' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellF1.font = { bold: false, size: 11 , color :{ argb: 'FFFFFFFF' }};
    cellF1.alignment = { horizontal: "center", vertical: "middle" };
    cellF1.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF6495ED" }, // fondo blanco
    };
    cellF1.border = {
      top: { style: "thick", color: { argb: "FF000000" } },
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`F${index+7}:I${index+7}`);
    const cellF2 = sheet.getCell(`F${index+7}`);
    cellF2.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellF2.font = { bold: false, size: 11 };
    cellF2.alignment = { horizontal: "center", vertical: "middle" };
    cellF2.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellF2.border = {
      right: { style: "medium", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };

    sheet.mergeCells(`J${index+6}:K${index+6}`);
    const cellJ1 = sheet.getCell(`J${index+6}`);
    cellJ1.value = 'AUTORIZO' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellJ1.font = { bold: false, size: 11 , color :{ argb: 'FFFFFFFF' }};
    cellJ1.alignment = { horizontal: "center", vertical: "middle" };
    cellJ1.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF6495ED" }, // fondo blanco
    };
    cellJ1.border = {
      top: { style: "thick", color: { argb: "FF000000" } },
      left: { style: "thick", color: { argb: "FF000000" } },
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };
    sheet.mergeCells(`J${index+7}:K${index+7}`);
    const cellJ2 = sheet.getCell(`J${index+7}`);
    cellJ2.value = ' ' // ejemplo de dato
    
    // Aplicas estilos a esa celda
    cellJ2.font = { bold: false, size: 11 };
    cellJ2.alignment = { horizontal: "center", vertical: "middle" };
    cellJ2.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // fondo blanco
    };
    cellJ2.border = {
      right: { style: "thick", color: { argb: "FF000000" } },
      bottom: { style: "thick", color: { argb: "FF000000" } },
    };
  }

  // Descargar
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(
    new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
    "Bitacora.xlsx"
  );
};

  // Constantes con el valor de los contextos
  const [isActionBlock] = useContext(ActionBlockContext); 
  const isButtonVerificationGreen = useContext(RefButtonVerificationGreenContext);
  const [isSelectedRow] = useContext(SelectedRowContext);
  const [isTextFieldsWarehouseOrder] = useContext(TextFieldsWarehouseOrderContext);
  const [isSuppliers] = useContext(SuppliersContext);
  const [isSupplies] = useContext(SuppliesContext);
  const [isCleaningSupplies] = useContext(CleaningSuppliesContext); 
  const [isCleaningTypes] = useContext(CleaningTypesContext);
  const [isCountSupplyTypes] = useContext(CountSupplyTypesContext);
  const [isCountCleaningTypes] = useContext(CountCleaningTypesContext);
  const [isSupplyTypes] = useContext(SupplyTypesContext);
  const [isUsers] = useContext(UsersContext);
  // Constantes con la funcionalidad de los hooks
  const handleWarehouseOrderStart = HandleWarehouseOrderStart();
  // Estructura del componente
  return (
    <>
      {isActionBlock  ? (
        <Button_Icon_Green_60 disabled>
          <Icon_16><IoMdDownload/></Icon_16>
        </Button_Icon_Green_60>
      ):(
        isSelectedRow !== null && isSelectedRow?.estado === 'Aceptado' ? (
          <Tooltip title='Iniciar Operación' placement='top'>
            <Button_Icon_Green_60
              ref={isButtonVerificationGreen}
              onClick={() => {
                exportToExcel
                handleWarehouseOrderStart()
              }}
            >
              <Icon_16><IoMdDownload/></Icon_16>
            </Button_Icon_Green_60>
          </Tooltip>
        ):(
          <Button_Icon_Green_60  disabled>
            <Icon_16><IoMdDownload/></Icon_16>
          </Button_Icon_Green_60>
        )
      )}
    </>
  );
};

export default ExcelExportButton;