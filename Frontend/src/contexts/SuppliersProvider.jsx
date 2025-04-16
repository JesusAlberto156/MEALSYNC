//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useState,useEffect,useContext } from "react"
// Servicios
import { decryptData } from "../services/Crypto";
// Contextos
export const suppliersContext = createContext(null);
export const observationsContext = createContext(null);
// Contextos personalizados
import { socketContext } from "./SocketProvider";
//____________IMPORT/EXPORT____________

// Función contexto para controlar los datos de la base de datos de los proveedores
export const Suppliers = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(socketContext);
    // UseState para controlar el valor del contexto
    const [isSuppliers,setIsSuppliers] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        socket.emit('suppliers');

        socket.on('suppliers',(result) => {
            const decryptedData = decryptData(result);
            if(decryptedData){
                const parsedData = JSON.parse(decryptedData);
                console.log('¡Proveedores obtenidos!....')
                setIsSuppliers(parsedData);
            }else{
                console.log('¡Error al desencriptar los estatus!...');
                setIsSuppliers([]);
            }
        });

        return () => {
            socket.off('suppliers');
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <suppliersContext.Provider value={[isSuppliers,setIsSuppliers]}>
            {children}
        </suppliersContext.Provider>
    );
}

// Función contexto para controlar los datos de la base de datos de las observaciones a los proveedores
export const Observations = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(socketContext);
    // UseState para controlar el valor del contexto
    const [isObservations,setIsObservations] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        socket.emit('observations');

        socket.on('observations',(result) => {
            const decryptedData = decryptData(result);
            if(decryptedData){
                const parsedData = JSON.parse(decryptedData);
                console.log('¡Observaciones de proveedores obtenidos!....')
                setIsObservations(parsedData);
            }else{
                console.log('¡Error al desencriptar los estatus!...');
                setIsObservations([]);
            }
        });

        return () => {
            socket.off('observations');
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <observationsContext.Provider value={[isObservations,setIsObservations]}>
            {children}
        </observationsContext.Provider>
    );
}