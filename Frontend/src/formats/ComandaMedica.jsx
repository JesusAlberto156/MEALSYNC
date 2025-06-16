import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useContext } from 'react';

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
});

const MyPDFDocument = ({ name }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text>Hola, {name}!</Text>
        <Text>Este es tu PDF dinámico generado con React.</Text>
        <Text></Text>
      </View>
    </Page>
  </Document>
);

export default function App() {

  

  return (
    <div>
      <h1>Generador de PDF</h1>
      <PDFDownloadLink
        document={<MyPDFDocument name="Usuario" 
        ></MyPDFDocument>}
        fileName="ejemplo.pdf"
      >
        {({ loading }) => (loading ? 'Generando PDF...' : 'Descargar PDF')}
      </PDFDownloadLink>
    </div>
  );
}