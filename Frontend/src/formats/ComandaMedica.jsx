import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useContext } from 'react';
import { TextFieldsWarehouseContext } from '../contexts/FormsProvider';

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
});

const MyPDFDocument = ({ name,supplies = [] }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text>Hola, {name}!</Text>
        <Text>Este es tu PDF dinámico generado con React.</Text>
        {supplies.map((supply,index) => (
          <Text key={index}>  Prueba de cantidad {supply.amount}</Text>          
      ))}
        <Text></Text>
      </View>
    </Page>
  </Document>
);

export default function App() {

  const [isTextFieldsWarehouse,setIsTextFieldsWarehouse] = useContext(TextFieldsWarehouseContext);

  return (
    <div>
      <h1>Generador de PDF</h1>
      <PDFDownloadLink
        document={<MyPDFDocument name="Usuario" 
          supplies={isTextFieldsWarehouse?.supplies || []}/>}
        fileName="ejemplo.pdf"
      >
        {({ loading }) => (loading ? 'Generando PDF...' : 'Descargar PDF')}
      </PDFDownloadLink>
    </div>
  );
}