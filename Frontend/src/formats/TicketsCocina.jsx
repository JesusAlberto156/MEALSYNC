import { useEffect,useState,useContext } from "react";
import { Image_Modal_100 } from "../components/styled/Imgs";
import Logo_Hospital from '../components/imgs/Logo-Horizontal-Hospital.png';
import { Text_Color_Blue_16,Text_Color_Red_16,Text_Span_16_Center_Black,Text_Title_16_Black } from "../components/styled/Text";
import { Container_Row_100_Center,Container_Row_100_Left,Container_Row_100_Right } from "../components/styled/Containers";
import { TextFieldsOrderKitchenContext } from "../contexts/FormsProvider";
import { OrderKitchenContext } from "../contexts/OrdersProvider";
import { SideDishesContext,SideDishSpecificationsContext } from "../contexts/SideDishesProvider";
import { DishesContext,DishSpecificationsContext } from "../contexts/DishesProvider";
import { DrinksContext,DrinkSpecificationsContext } from "../contexts/DrinksProvider";

function TicketPrinter() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [fecha,setFecha] = useState('');

  const [isTextFieldsOrderKitchen] = useContext(TextFieldsOrderKitchenContext); 
  const [isOrderKitchen] = useContext(OrderKitchenContext);
  const [isDishes] = useContext(DishesContext); 
  const [isDishSpecifications] = useContext(DishSpecificationsContext); 
  const [isDrinks] = useContext(DrinksContext);
  const [isDrinkSpecifications] = useContext(DrinkSpecificationsContext);
  const [isSideDishes] = useContext(SideDishesContext); 
  const [isSideDishSpecifications] = useContext(SideDishSpecificationsContext);

  const printTicket = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("http://localhost:3000/api/print-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          logo: Logo_Hospital,   // o en base64
          fecha,
          ubicacion: isTextFieldsOrderKitchen.tipoubicacion === 'OTRO' ? isTextFieldsOrderKitchen.ubicacion : isTextFieldsOrderKitchen.tipoubicacion === 'PISO 2' || isTextFieldsOrderKitchen.tipoubicacion === 'PISO 3' ? `HAB. ${isTextFieldsOrderKitchen.ubicacion}` : isTextFieldsOrderKitchen.tipoubicacion === 'UTI' ? `${isTextFieldsOrderKitchen.ubicacion}` : 'Desconocida',
          numero: isOrderKitchen.length+1,
          encargado: isTextFieldsOrderKitchen.encargado || 'Desconocido',
          pedidos: isTextFieldsOrderKitchen.pedidos.map(pedido => ({
            cantidad: pedido.cantidad,
            nombre: pedido.idplatillo !== 0 ? isDishes.find(d => d.idplatillo === pedido.idplatillo)?.nombre : pedido.idguarnicion !== 0 ? isSideDishes.find(d => d.idguarnicion === pedido.idguarnicion)?.nombre : pedido.idbebida !== 0 ? isDrinks.find(d => d.idbebida === pedido.idbebida)?.nombre : '',   // función que busca nombre según id
            precio: pedido.idplatillo !== 0 ? isDishSpecifications.find(d => d.idplatillo === pedido.idplatillo)?.precio || 0 : pedido.idguarnicion !== 0 ? isSideDishSpecifications.find(d => d.idguarnicion === pedido.idguarnicion)?.precio || 0 : pedido.idbebida !== 0 ? isDrinkSpecifications.find(d => d.idbebida === pedido.idbebida)?.precio || 0 : '',   // función que busca precio según id
          })),
          propina: 0,
          total: Number(isTextFieldsOrderKitchen.precio).toFixed(2),
        }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error al imprimir ticket:", error);
      setMessage("Error al imprimir ticket");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");

    setFecha(`${dia}/${mes}/${año}`);
  },[]);

  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px", maxWidth: "400px", justifyContent: 'center',alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
      <Image_Modal_100 src={Logo_Hospital}/>
      <Container_Row_100_Center>
        <Text_Title_16_Black>Restaurant COMANDA</Text_Title_16_Black>
        <Text_Span_16_Center_Black>FECHA: {fecha}</Text_Span_16_Center_Black>
      </Container_Row_100_Center>
      <Container_Row_100_Center>
        <Container_Row_100_Left>
          <Text_Span_16_Center_Black>UBICACIÓN: {isTextFieldsOrderKitchen.tipoubicacion === 'OTRO' ? isTextFieldsOrderKitchen.ubicacion : isTextFieldsOrderKitchen.tipoubicacion === 'PISO 2' || isTextFieldsOrderKitchen.tipoubicacion === 'PISO 3' ? `HAB. ${isTextFieldsOrderKitchen.ubicacion}` : isTextFieldsOrderKitchen.tipoubicacion === 'UTI' ? `${isTextFieldsOrderKitchen.ubicacion}` : 'Desconocida'}</Text_Span_16_Center_Black>
        </Container_Row_100_Left>
        <Container_Row_100_Right>
          <Text_Title_16_Black>N°</Text_Title_16_Black>
          <Text_Color_Red_16>{isOrderKitchen.length+1}</Text_Color_Red_16>
        </Container_Row_100_Right>
      </Container_Row_100_Center>
      <Container_Row_100_Center>
        <Text_Span_16_Center_Black>ENCARGADO: {isTextFieldsOrderKitchen.encargado || 'Desconocido'}</Text_Span_16_Center_Black>
      </Container_Row_100_Center>
      {isTextFieldsOrderKitchen.pedidos.map((pedido,index)=> (
        <Container_Row_100_Left key={index}>
          <Text_Span_16_Center_Black>{pedido.cantidad || '0'}</Text_Span_16_Center_Black>
          {pedido.idplatillo !== 0 ?(
            <>
              <Text_Span_16_Center_Black>{isDishes.find(d => d.idplatillo === pedido.idplatillo)?.nombre || 'Desconocido'}</Text_Span_16_Center_Black>
              <Text_Span_16_Center_Black>{isDishSpecifications.find(d => d.idplatillo === pedido.idplatillo)?.precio || 'Desconocido'}</Text_Span_16_Center_Black>
            </>
          ):(
            <></>
          )}
          {pedido.idguarnicion !== 0 ?(
            <>
              <Text_Span_16_Center_Black>{isSideDishes.find(d => d.idguarnicion === pedido.idguarnicion)?.nombre || 'Desconocido'}</Text_Span_16_Center_Black>
              <Text_Span_16_Center_Black>{isSideDishSpecifications.find(d => d.idguarnicion === pedido.idguarnicion)?.precio || 'Desconocido'}</Text_Span_16_Center_Black>
            </>
          ):(
            <></>
          )}
          {pedido.idbebida !== 0 ?(
            <>
              <Text_Span_16_Center_Black>{isDrinks.find(d => d.idbebida === pedido.idbebida)?.nombre || 'Desconocido'}</Text_Span_16_Center_Black>
              <Text_Span_16_Center_Black>{isDrinkSpecifications.find(d => d.idbebida === pedido.idbebida)?.precio || 'Desconocido'}</Text_Span_16_Center_Black>
            </>
          ):(
            <></>
          )}
        </Container_Row_100_Left>
      ))}
      <Container_Row_100_Right style={{marginRight: '140px'}}>
        <Text_Color_Blue_16>PROPINA:</Text_Color_Blue_16>
      </Container_Row_100_Right>
      <Container_Row_100_Right>
        <Text_Color_Blue_16>TOTAL:</Text_Color_Blue_16>
        <Text_Span_16_Center_Black>$ {Number(isTextFieldsOrderKitchen.precio).toFixed(2) || '0'}</Text_Span_16_Center_Black>
      </Container_Row_100_Right>

      <button onClick={printTicket} disabled={loading}>
        {loading ? "Imprimiendo..." : "Imprimir Ticket"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default function App() {
  return <TicketPrinter/>;
}
