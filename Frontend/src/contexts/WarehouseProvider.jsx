//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useContext,useState,useEffect } from "react"
// Servicios
import { decryptData,encryptData } from "../services/Crypto";
// Contextos
export const SuppliesContext = createContext(null);
export const SupplyTypesContext = createContext(null);
export const UnitsContext = createContext(null);
export const SupplyPricesContext = createContext(null);
export const WarehouseContext = createContext(null);
//__________IMAGES____________
import Logo_Warning_Light from '../components/imgs/Logo-Warning-Light.png';
import Logo_Warning_Dark from '../components/imgs/Logo-Warning-Dark.webp';
//__________IMAGES____________
// Contextos personalizados
import { SocketContext } from "./SocketProvider";
// Estilos personalizados
import { Alert_Warning } from "../components/styled/Alerts";
//____________IMPORT/EXPORT____________

// ---------- INSUMOS
// Función contexto para controlar los datos de la base de datos de insumos
export const Supplies = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isSupplies,setIsSupplies] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        socket.emit('Supplies');

        socket.on('Supplies',(result) => {
            const decryptedData = decryptData(result);
            if(decryptedData){
                const parsedData = JSON.parse(decryptedData);
                console.log('¡Insumos obtenidos!...')
                setIsSupplies(parsedData);
                
            }else{
                console.log('¡Error al desencriptar los insumos!...');
                setIsSupplies([]);
            }
        });

        return () => {
            socket.off('Supplies');
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <SuppliesContext.Provider value={[isSupplies,setIsSupplies]}>
            {children}
        </SuppliesContext.Provider>
    );
}
// ---------- INSUMOS
// ---------- TIPOS DE INSUMOS
// Función contexto para controlar los datos de la base de datos de tipos de insumos
export const Supply_Types = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isSupplyTypes,setIsSupplyTypes] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        socket.emit('Supply-Types');

        socket.on('Supply-Types',(result) => {
            const decryptedData = decryptData(result);
            if(decryptedData){
                const parsedData = JSON.parse(decryptedData);
                console.log('¡Tipos de Insumos obtenidos!...')
                setIsSupplyTypes(parsedData);
                
            }else{
                console.log('¡Error al desencriptar los tipos de insumos!...');
                setIsSupplyTypes([]);
            }
        });

        return () => {
            socket.off('Supply-Types');
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <SupplyTypesContext.Provider value={[isSupplyTypes,setIsSupplyTypes]}>
            {children}
        </SupplyTypesContext.Provider>
    );
}
// ---------- TIPOS DE INSUMOS
// ---------- MEDIDA
// Función contexto para controlar los datos de la base de datos de medidas
export const Units = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isUnits,setIsUnits] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        socket.emit('Units');

        socket.on('Units',(result) => {
            const decryptedData = decryptData(result);
            if(decryptedData){
                const parsedData = JSON.parse(decryptedData);
                console.log('¡Medidas obtenidas!...')
                setIsUnits(parsedData);
                
            }else{
                console.log('¡Error al desencriptar las medidas!...');
                setIsUnits([]);
            }
        });

        return () => {
            socket.off('Units');
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <UnitsContext.Provider value={[isUnits,setIsUnits]}>
            {children}
        </UnitsContext.Provider>
    );
}
// ---------- MEDIDA
// ---------- PRECIO DE INSUMOS
export const Supply_Prices = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isSupplyPrices,setIsSupplyPrices] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        socket.emit('Supply-Prices');

        socket.on('Supply-Prices',(result) => {
            const decryptedData = decryptData(result);
            if(decryptedData){
                const parsedData = JSON.parse(decryptedData);
                console.log('Precios de Insumos obtenidos!...')
                setIsSupplyPrices(parsedData);
                
            }else{
                console.log('¡Error al desencriptar los precios de los insumos!...');
                setIsSupplyPrices([]);
            }
        });

        return () => {
            socket.off('Supply-Prices');
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <SupplyPricesContext.Provider value={[isSupplyPrices,setIsSupplyPrices]}>
            {children}
        </SupplyPricesContext.Provider>
    );
}
// ---------- PRECIO DE INSUMOS
// ---------- ALMACEN
export const Warehouse = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isWarehouse,setIsWarehouse] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        socket.emit('Warehouse');

        socket.on('Warehouse',(result) => {
            const decryptedData = decryptData(result);
            if(decryptedData){
                const parsedData = JSON.parse(decryptedData);
                console.log('Almacén obtenido!...')
                setIsWarehouse(parsedData);
                
            }else{
                console.log('¡Error al desencriptar el almacén!...');
                setIsWarehouse([]);
            }
        });

        return () => {
            socket.off('Warehouse');
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <WarehouseContext.Provider value={[isWarehouse,setIsWarehouse]}>
            {children}
        </WarehouseContext.Provider>
    );
}
// ---------- ALMACEN