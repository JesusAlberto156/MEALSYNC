import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image, pdf } from '@react-pdf/renderer';
import { useContext,useEffect } from 'react';
import { OrderDoctorContext } from '../contexts/OrdersProvider';
import { TextFieldsOrderDoctorContext } from '../contexts/FormsProvider';
import Logo_Hospital from '../components/imgs/Logo-Horizontal-Hospital.png'
import Logo_Platillo from '../components/imgs/Logo-Platillo.jpg';

const styles = StyleSheet.create({
  page: { paddingTop: 6, paddingLeft: 30, paddingRight: 30, paddingBottom: 15, fontSize: 11, fontFamily: "Helvetica" },
  header: { marginBottom: 2, borderBottom: "1 solid #ccc" },
  title1: { textAlign: "center", marginBottom: 10, fontSize: 12, fontWeight: "bold", textTransform: "uppercase" },
  title2: { textAlign: "center", fontSize: 10, fontWeight: "bold"},
  section1: {flexDirection: "row", justifyContent: "flex-start", marginBottom: 10},
  section: { marginBottom: 10, borderBottom: "1 solid #ccc", paddingBottom: 5 },
  label: { fontWeight: "bold" },
  row: { marginBottom: 5 },
  footer: { flexDirection: "row", justifyContent: "center",alignItems: "center", marginTop: 30, fontSize: 10 },
  signatureBlock1: {
    flexDirection: "column",
    alignItems: "center",
    width: "45%",
  },
  signatureBlock2: {
    flexDirection: "column",
    alignItems: "center",
    width: "45%",
    marginHorizontal: 15,
  },
  signatureBlock3: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  signatureBlock4: { width: "20%", alignItems: "flex-start" }, // Fecha y Hora
  signatureBlock5: { width: "60%", alignItems: "center" },     // Solicitud + Folio
  signatureBlock4_right: { width: "20%", alignItems: "flex-end" }, // Hora
  signatureBlock6: {
    flexDirection: "column",
    alignItems: "center",
  },
  signatureBlock7: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
  },
  signatureBlock8: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "45%",
  },
  line: {
    borderBottomWidth: 1,   // 🔹 crea la línea
    borderColor: "#000",    // negro
    width: "100%",          // ocupa todo el ancho del bloque
    marginBottom: 6
  },
  name: {
    fontSize: 11,
    textTransform: "uppercase", // 🔹 convierte todo a MAYÚSCULAS
    fontWeight: "bold"
  }
});

const fechaActual = (() => {
  const fecha = new Date();
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${dia}/${mes}/${año}`;
})();

const now = new Date();
let hours = now.getHours(); // 0-23
const minutes = now.getMinutes();
const ampm = hours >= 12 ? 'p.m.' : 'a.m.';

// Convertir a formato 12 horas
hours = hours % 12;
hours = hours === 0 ? 12 : hours; // 0 → 12

// Formatear minutos con dos dígitos
const formattedMinutes = String(minutes).padStart(2, '0');

const horaActual = `${hours}:${formattedMinutes} ${ampm}`;

const MyPDFDocument = ({data,orden}) => (
  <Document>
    <Page size="A4" style={{...styles.page, flexDirection: "column", justifyContent: "flex-start"}}>
      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.signatureBlock3}>
          <Image
            src={Logo_Hospital} // URL o base64
            style={{ width: 160, height: 70 }}
          />
        </View>
        <View style={styles.section1}>
          <View style={styles.signatureBlock4}>
            <View style={styles.signatureBlock6}>
              <Text>Fecha:</Text>
              <Text style={styles.title2}>{fechaActual}</Text>
            </View>
          </View>
          <View style={styles.signatureBlock5}>
            <Text style={styles.title2}>Solicitud de Comanda del Estar Médico</Text>
            <Text style={styles.title2}>Folio: {data.length + 1}</Text>
          </View>
          <View style={styles.signatureBlock4_right}>
            <View style={styles.signatureBlock6}>
              <Text>Hora:</Text>
              <Text style={styles.title2}>{horaActual}</Text>
            </View>
          </View>
        </View>
        <View style={styles.signatureBlock3}>
          <Text>Cirugía o Procedimiento:</Text>
          <Text style={styles.title1}>{orden.cirugia || 'Desconocida'}</Text>
        </View>
        <View style={styles.signatureBlock3}>
          <Text>Sala:</Text>
          <Text style={styles.title1}>{orden.sala || 'Desconocida'}</Text>
        </View>
      </View>

      {/* Lista de platillos */}
      <View style={{ flexGrow: 1,flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start", gap: 10 }}>
        {orden.pedidos.map((pedido, index) => (
          <View style={styles.signatureBlock8} key={index}>
            <Image
              src={Logo_Platillo} // URL o base64
              style={{ width: 90, height: 70, marginRight: 30 }}
            />
            <View style={{ ...styles.signatureBlock7, justifyContent: "flex-start" }}>
              <Text style={styles.row}>
                <Text style={styles.label}>Platillo: </Text>{pedido.nombreplatillo}, {pedido.nombreguarnicion}
              </Text>
              <Text style={styles.row}>
                <Text style={styles.label}>Bebida: </Text>{pedido.nombrebebida}
              </Text>
              <Text style={styles.row}>
                <Text style={styles.label}>Opciones: </Text>{pedido.comentario}
              </Text>
            </View>
          </View>
        ))}
      </View>
      {/* Calificación y comentarios */}
      <View style={{ marginTop: 10,gap: 8, marginBottom: 30}}>
        <Text>Calificación: ______________ Comentarios o sugerencias: ________________________________________</Text>
        <Text>________________________________________________________________________________________</Text>
        <Text>________________________________________________________________________________________</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.signatureBlock1}>
          <Text style={styles.line}> </Text>
          <Text style={styles.name}>{orden.solicitante || 'Desconocido'}</Text>
          <Text>Solicitante</Text>
        </View>
          <View style={styles.signatureBlock2}>
          <Text style={styles.line}> </Text>
          <Text style={styles.name}>{orden.medico || 'Desconocido'}</Text>
          <Text>Médico Tratante</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export const generatePDF = async (data,orden) => {
  const blob = await pdf(<MyPDFDocument data={data} orden={orden}/>).toBlob();
  const url = URL.createObjectURL(blob);
  window.open(url);
};

export const downloadPDF = async (data, orden, fileName = 'comanda.pdf') => {
  // 1️⃣ Crear el PDF en memoria
  const blob = await pdf(<MyPDFDocument data={data} orden={orden} />).toBlob();

  // 2️⃣ Crear una URL temporal
  const url = URL.createObjectURL(blob);

  // 3️⃣ Crear un enlace <a> temporal y forzar la descarga
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName; // nombre del archivo
  document.body.appendChild(link);
  link.click();

  // 4️⃣ Limpiar el DOM y liberar memoria
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default function App() {
  const [isOrderDoctor] = useContext(OrderDoctorContext);
  const [isTextFieldsOrderDoctor] = useContext(TextFieldsOrderDoctorContext); 

  return (
    <div>
      <h1>Generador de PDF</h1>
      <button onClick={() => downloadPDF(isOrderDoctor,isTextFieldsOrderDoctor)}>Generar PDF</button>
    </div>
  );
}