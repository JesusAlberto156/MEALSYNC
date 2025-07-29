//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useState,useEffect,useContext } from "react"
// Servicios
import { decryptData } from "../services/Crypto";
// Contextos
export const SuppliersContext = createContext(null);
export const SupplierAddContext = createContext(null);
export const SupplierEditContext = createContext(null);
export const DeletedSuppliersContext = createContext(null);
export const SupplierDeleteContext = createContext(null);
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
                    <Deleted_Suppliers>
                        <Supplier_Delete>
                            <Observations>
                                {children}
                            </Observations>
                        </Supplier_Delete>
                    </Deleted_Suppliers>
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
        const handleSuppliers = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Proveedores obtenidos!')
                    setIsSuppliers(parsedData);
                }else{
                    console.log('¡Error al desencriptar los proveedores!');
                    setIsSuppliers([]);
                }
            } catch (error) {
                console.error('Error al procesar los proveedores:', error);
                setIsSuppliers([]);
            }
        }

        socket.emit('Get-Suppliers');
        socket.on('Get-Suppliers',handleSuppliers);

        return () => {
            socket.off('Get-Suppliers',handleSuppliers);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <SuppliersContext.Provider value={[isSuppliers]}>
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
// ---------- PROVEEDORES ELIMINADOS
// Función contexto para controlar los datos de la base de datos de los proveedores eliminados ✔️
export const Deleted_Suppliers = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isDeletedSuppliers,setIsDeletedSuppliers] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleDeletedSuppliers = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Proveedores eliminados obtenidos!')
                    setIsDeletedSuppliers(parsedData);
                }else{
                    console.log('¡Error al desencriptar los proveedores eliminados!');
                    setIsDeletedSuppliers([]);
                }
            } catch (error) {
                console.error('Error al procesar los proveedores eliminados:', error);
                setIsDeletedSuppliers([]);
            }
        }

        socket.emit('Get-Deleted-Suppliers');
        socket.on('Get-Deleted-Suppliers',handleDeletedSuppliers);

        return () => {
            socket.off('Get-Deleted-Suppliers',handleDeletedSuppliers);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <DeletedSuppliersContext.Provider value={[isDeletedSuppliers]}>
            {children}
        </DeletedSuppliersContext.Provider>
    );
}
// Función contexto para controlar los datos eliminados de un proveedor ✔️
export const Supplier_Delete = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSupplierDelete,setIsSupplierDelete] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <SupplierDeleteContext.Provider value={[isSupplierDelete,setIsSupplierDelete]}>
            {children}
        </SupplierDeleteContext.Provider>
    );
}
// ---------- PROVEEDORES ELIMINADOS
// ---------- OBSERVACIONES
// Función contexto para controlar los datos de la base de datos de las observaciones a los proveedores ✔️
export const Observations = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isObservations,setIsObservations] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleObservations = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Observaciones de proveedores obtenidas!')
                    setIsObservations(parsedData);
                }else{
                    console.log('¡Error al desencriptar las observaciones de proveedores!');
                    setIsObservations([]);
                }
            } catch (error) {
                console.error('Error al procesar las observaciones de proveedores:', error);
                setIsObservations([]);
            }
        }

        socket.emit('Get-Observations');
        socket.on('Get-Observations',handleObservations);

        return () => {
            socket.off('Get-Observations',handleObservations);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <ObservationsContext.Provider value={[isObservations]}>
            {children}
        </ObservationsContext.Provider>
    );
}
// ---------- OBSERVACIONES