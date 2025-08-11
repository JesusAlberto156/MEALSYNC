//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useState,useEffect,useContext } from "react"
// Servicios
import { decryptData } from "../services/Crypto";
// Contextos
export const DoctorsContext = createContext(null);
export const SurgeriesContext = createContext(null);
export const SurgeryTypesContext = createContext(null);
export const OrderKitchenContext = createContext(null);
export const CountOrderKitchenContext = createContext(null);
// Contextos personalizados
import { SocketContext } from "./SocketProvider";
//____________IMPORT/EXPORT____________

// Todos los contextos para las funcionalidades de las tablas de los pedidos ✔️
export const Index_Orders = ({children}) => {
    return(
        <Doctors>
            <Surgeries>
                <Surgery_Types>
                    <Order_Kitchen>
                        <Count_Order_Kitchen>
                            {children}
                        </Count_Order_Kitchen>
                    </Order_Kitchen>
                </Surgery_Types>
            </Surgeries>
        </Doctors>
    )
}

// ---------- MÉDICOS 
// Función contexto para controlar los datos de la base de datos de los medicos centralizados ✔️
export const Doctors = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isDoctors,setIsDoctors] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleDoctors = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Médicos centralizados obtenidos!')
                    setIsDoctors(parsedData);
                }else{
                    console.log('¡Error al desencriptar los médicos centralizados!');
                    setIsDoctors([]);
                }
            } catch (error) {
                console.error('Error al procesar los médicos centralizados:', error);
                setIsDoctors([]);
            }
        }

        socket.emit('Get-Doctors');
        socket.on('Get-Doctors',handleDoctors);

        return () => {
            socket.off('Get-Doctors',handleDoctors);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <DoctorsContext.Provider value={[isDoctors]}>
            {children}
        </DoctorsContext.Provider>
    );
}
// ---------- MÉDICOS 
// ---------- CIRUGIAS
// Función contexto para controlar los datos de la base de datos de las cirujías ✔️
export const Surgeries = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isSurgeries,setIsSurgeries] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleSurgeries = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Cirujías obtenidas!')
                    setIsSurgeries(parsedData);
                }else{
                    console.log('¡Error al desencriptar las cirujías!');
                    setIsSurgeries([]);
                }
            } catch (error) {
                console.error('Error al procesar las cirujías:', error);
                setIsSurgeries([]);
            }
        }

        socket.emit('Get-Surgeries');
        socket.on('Get-Surgeries',handleSurgeries);

        return () => {
            socket.off('Get-Surgeries',handleSurgeries);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <SurgeriesContext.Provider value={[isSurgeries]}>
            {children}
        </SurgeriesContext.Provider>
    );
}
// ---------- CIRUGIAS
// ---------- TIPOS DE CIRUGIAS
// Función contexto para controlar los datos de la base de datos de los tipos de cirujía ✔️
export const Surgery_Types = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isSurgeryTypes,setIsSurgeryTypes] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleSurgeryTypes = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Tipos de Cirujía obtenidos!')
                    setIsSurgeryTypes(parsedData);
                }else{
                    console.log('¡Error al desencriptar los tipos de cirujía!');
                    setIsSurgeryTypes([]);
                }
            } catch (error) {
                console.error('Error al procesar los tipos de cirujía:', error);
                setIsSurgeryTypes([]);
            }
        }

        socket.emit('Get-Surgery-Types');
        socket.on('Get-Surgery-Types',handleSurgeryTypes);

        return () => {
            socket.off('Get-Surgery-Types',handleSurgeryTypes);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <SurgeryTypesContext.Provider value={[isSurgeryTypes]}>
            {children}
        </SurgeryTypesContext.Provider>
    );
}
// ---------- TIPOS DE CIRUGIAS
// ---------- COCINA
// Función contexto para controlar los datos de la base de datos de los pedidos de cocina ✔️
export const Order_Kitchen = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isOrderKitchen,setIsOrderKitchen] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleOrderKitchen = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Pedidos de cocina obtenidos!')
                    setIsOrderKitchen(parsedData);
                }else{
                    console.log('¡Error al desencriptar los pedidos de cocina!');
                    setIsOrderKitchen([]);
                }
            } catch (error) {
                console.error('Error al procesar los pedidos de cocina:', error);
                setIsOrderKitchen([]);
            }
        }

        socket.emit('Get-Order-Kitchen');
        socket.on('Get-Order-Kitchen',handleOrderKitchen);

        return () => {
            socket.off('Get-Order-Kitchen',handleOrderKitchen);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <OrderKitchenContext.Provider value={[isOrderKitchen]}>
            {children}
        </OrderKitchenContext.Provider>
    );
}
// Función contexto para controlar los datos de la base de datos de las cantidades de los pedidos de cocina ✔️
export const Count_Order_Kitchen = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isCountOrderKitchen,setIsCountOrderKitchen] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleCountOrderKitchen = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Cantidades de los pedidos de cocina obtenidas!')
                    setIsCountOrderKitchen(parsedData);
                }else{
                    console.log('¡Error al desencriptar las cantidades de los pedidos de cocina!');
                    setIsCountOrderKitchen([]);
                }
            } catch (error) {
                console.error('Error al procesar las cantidades de los pedidos de cocina:', error);
                setIsCountOrderKitchen([]);
            }
        }

        socket.emit('Get-Count-Order-Kitchen');
        socket.on('Get-Count-Order-Kitchen',handleCountOrderKitchen);

        return () => {
            socket.off('Get-Count-Order-Kitchen',handleCountOrderKitchen);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <CountOrderKitchenContext.Provider value={[isCountOrderKitchen]}>
            {children}
        </CountOrderKitchenContext.Provider>
    );
}
// ---------- COCINA