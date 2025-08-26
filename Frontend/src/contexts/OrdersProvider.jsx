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
export const OrderKitchenAddContext = createContext(null);
export const CountOrderKitchenContext = createContext(null);
export const OrderDoctorContext = createContext(null);
export const OrderDoctorAddContext = createContext(null);
export const OrderDoctorOrderContext = createContext(null);
// Contextos personalizados
import { SocketContext } from "./SocketProvider";
//____________IMPORT/EXPORT____________

// Todos los contextos para las funcionalidades de las tablas de los pedidos ✔️
export const Index_Orders = ({children}) => {
    return(
        <Surgeries>
            <Surgery_Types>
                <Order_Kitchen>
                    <Order_Kitchen_Add>
                        <Count_Order_Kitchen>
                            <Order_Doctor>
                                <Order_Doctor_Add>
                                    <Order_Doctor_Order>
                                        {children}
                                    </Order_Doctor_Order>
                                </Order_Doctor_Add>
                            </Order_Doctor>
                        </Count_Order_Kitchen>
                    </Order_Kitchen_Add>
                </Order_Kitchen>
            </Surgery_Types>
        </Surgeries>
    )
}

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
// Función contexto para controlar los datos agregados de una orden de pedido de cocina ✔️
export const Order_Kitchen_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isOrderKitchenAdd,setIsOrderKitchenAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <OrderKitchenAddContext.Provider value={[isOrderKitchenAdd,setIsOrderKitchenAdd]}>
            {children}
        </OrderKitchenAddContext.Provider>
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
// ---------- ÁREA MÉDICA
// Función contexto para controlar los datos de la base de datos de los pedidos de estar médico ✔️
export const Order_Doctor = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isOrderDoctor,setIsOrderDoctor] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleOrderDoctor = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Pedidos de estar médico obtenidos!')
                    setIsOrderDoctor(parsedData);
                }else{
                    console.log('¡Error al desencriptar los pedidos de estar médico!');
                    setIsOrderDoctor([]);
                }
            } catch (error) {
                console.error('Error al procesar los pedidos de estar médico:', error);
                setIsOrderDoctor([]);
            }
        }

        socket.emit('Get-Order-Doctor');
        socket.on('Get-Order-Doctor',handleOrderDoctor);

        return () => {
            socket.off('Get-Order-Doctor',handleOrderDoctor);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <OrderDoctorContext.Provider value={[isOrderDoctor]}>
            {children}
        </OrderDoctorContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de una orden de pedido de medico ✔️
export const Order_Doctor_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isOrderDoctorAdd,setIsOrderDoctorAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <OrderDoctorAddContext.Provider value={[isOrderDoctorAdd,setIsOrderDoctorAdd]}>
            {children}
        </OrderDoctorAddContext.Provider>
    );
}
// Función contexto para controlar los datos de la base de datos de los pedidos de estar médico individuales ✔️
export const Order_Doctor_Order = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isOrderDoctorOrder,setIsOrderDoctorOrder] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleOrderDoctorOrder = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Pedidos de estar médico individuales obtenidos!')
                    setIsOrderDoctorOrder(parsedData);
                }else{
                    console.log('¡Error al desencriptar los pedidos de estar médico individuales!');
                    setIsOrderDoctorOrder([]);
                }
            } catch (error) {
                console.error('Error al procesar los pedidos de estar médico individuales:', error);
                setIsOrderDoctorOrder([]);
            }
        }

        socket.emit('Get-Order-Doctor-Order');
        socket.on('Get-Order-Doctor-Order',handleOrderDoctorOrder);

        return () => {
            socket.off('Get-Order-Doctor-Order',handleOrderDoctorOrder);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <OrderDoctorOrderContext.Provider value={[isOrderDoctorOrder]}>
            {children}
        </OrderDoctorOrderContext.Provider>
    );
}
// ---------- ÁREA MÉDICA