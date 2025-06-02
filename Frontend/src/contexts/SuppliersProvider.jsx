//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useState,useEffect,useContext } from "react"
// Servicios
import { decryptData } from "../services/Crypto";
// Contextos
export const SuppliersContext = createContext(null);
export const SupplierAddContext = createContext(null);
export const SupplierEditContext = createContext(null);
export const ObservationsContext = createContext(null);
// Contextos personalizados
import { SocketContext } from "./SocketProvider";
//____________IMPORT/EXPORT____________

// Todos los contextos para las funcionalidades de las tablas de proveedores ✔️
export const Index_Suppliers = ({children}) => {
    return(
        <Suppliers>
            <Supplier_Add>
                <Supplier_Edit>
                    <Observations>
                        {children}
                    </Observations>
                </Supplier_Edit>
            </Supplier_Add>
        </Suppliers>
    );
}

// ---------- PROVEEDORES
// Función contexto para controlar los datos de la base de datos de los proveedores ✔️
export const Suppliers = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isSuppliers,setIsSuppliers] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        socket.emit('Suppliers');

        socket.on('Suppliers',(result) => {
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
            socket.off('Suppliers');
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <SuppliersContext.Provider value={[isSuppliers,setIsSuppliers]}>
            {children}
        </SuppliersContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de un proveedor ✔️
export const Supplier_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSupplierAdd,setIsSupplierAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <SupplierAddContext.Provider value={[isSupplierAdd,setIsSupplierAdd]}>
            {children}
        </SupplierAddContext.Provider>
    );
}
// Función contexto para controlar los datos editados de un proveedor ✔️
export const Supplier_Edit = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSupplierEdit,setIsSupplierEdit] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <SupplierEditContext.Provider value={[isSupplierEdit,setIsSupplierEdit]}>
            {children}
        </SupplierEditContext.Provider>
    );
}
// ---------- PROVEEDORES
// ---------- OBSERVACIONES
// Función contexto para controlar los datos de la base de datos de las observaciones a los proveedores ✔️
export const Observations = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isObservations,setIsObservations] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        socket.emit('Observations');

        socket.on('Observations',(result) => {
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
            socket.off('Observations');
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <ObservationsContext.Provider value={[isObservations,setIsObservations]}>
            {children}
        </ObservationsContext.Provider>
    );
}
// ---------- OBSERVACIONES