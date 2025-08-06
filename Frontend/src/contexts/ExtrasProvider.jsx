//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useState,useEffect,useContext } from "react"
// Servicios
import { decryptData } from "../services/Crypto";
// Contextos
export const CleaningCategoriesContext = createContext(null);
export const CleaningCategoryAddContext = createContext(null);
export const CleaningCategoryEditContext = createContext(null);
export const CountCleaningCategoriesContext = createContext(null);
export const CleaningCategoryCountAddContext = createContext(null);
export const DeletedCleaningCategoriesContext = createContext(null);
export const CleaningCategoryDeleteContext = createContext(null);
export const CleaningSuppliesContext = createContext(null);
export const CleaningSupplyAddContext = createContext(null);
export const CleaningSupplyEditContext = createContext(null);
export const DeletedCleaningSuppliesContext = createContext(null);
export const CleaningSupplyDeleteContext = createContext(null);
export const FixedExpensesContext = createContext(null);
export const FixedExpenseAddContext = createContext(null);
export const FixedExpenseEditContext = createContext(null);
export const DeletedFixedExpensesContext = createContext(null);
export const FixedExpenseDeleteContext = createContext(null);
// Contextos personalizados
import { SocketContext } from "./SocketProvider";
//____________IMPORT/EXPORT____________

// Todos los contextos para las funcionalidades de las tablas de extras ✔️
export const Index_Extras = ({children}) => {
    return(
        <Cleaning_Categories>
            <Cleaning_Category_Add>
                <Cleaning_Category_Edit>
                    <Count_Cleaning_Categories>
                        <Cleaning_Category_Count_Add>
                            <Deleted_Cleaning_Categories>
                                <Cleaning_Category_Delete>
                                    <Cleaning_Supplies>
                                        <Cleaning_Supply_Add>
                                            <Cleaning_Supply_Edit>
                                                <Deleted_Cleaning_Supplies>
                                                    <Cleaning_Supply_Delete>
                                                        <Fixed_Expenses>
                                                            <Fixed_Expense_Add>
                                                                <Fixed_Expense_Edit>
                                                                    <Deleted_Fixed_Expenses>
                                                                        <Fixed_Expense_Delete>
                                                                            {children}
                                                                        </Fixed_Expense_Delete>
                                                                    </Deleted_Fixed_Expenses>
                                                                </Fixed_Expense_Edit>
                                                            </Fixed_Expense_Add>
                                                        </Fixed_Expenses>
                                                    </Cleaning_Supply_Delete>
                                                </Deleted_Cleaning_Supplies>
                                            </Cleaning_Supply_Edit>
                                        </Cleaning_Supply_Add>
                                    </Cleaning_Supplies>
                                </Cleaning_Category_Delete>
                            </Deleted_Cleaning_Categories>
                        </Cleaning_Category_Count_Add>
                    </Count_Cleaning_Categories>
                </Cleaning_Category_Edit>
            </Cleaning_Category_Add>
        </Cleaning_Categories>
    );
}

//---------- CATEGORÍAS DE LIMPIEZA
// Función contexto para controlar los datos de la base de datos de las categorías de limpieza ✔️
export const Cleaning_Categories = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isCleaningCategories,setIsCleaningCategories] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleCleaningCategories = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Categorías de limpieza obtenidas!')
                    setIsCleaningCategories(parsedData);
                }else{
                    console.log('¡Error al desencriptar las categorías de limpieza!');
                    setIsCleaningCategories([]);
                }
            } catch (error) {
                console.error('Error al procesar las categorías de limpieza:', error);
                setIsCleaningCategories([]);
            }
        }

        socket.emit('Get-Cleaning-Categories');
        socket.on('Get-Cleaning-Categories',handleCleaningCategories);

        return () => {
            socket.off('Get-Cleaning-Categories',handleCleaningCategories);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <CleaningCategoriesContext.Provider value={[isCleaningCategories]}>
            {children}
        </CleaningCategoriesContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de una categoría de limpieza ✔️
export const Cleaning_Category_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isCleaningCategoryAdd,setIsCleaningCategoryAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <CleaningCategoryAddContext.Provider value={[isCleaningCategoryAdd,setIsCleaningCategoryAdd]}>
            {children}
        </CleaningCategoryAddContext.Provider>
    );
}
// Función contexto para controlar los datos editados de una categoría de limpieza ✔️
export const Cleaning_Category_Edit = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isCleaningCategoryEdit,setIsCleaningCategoryEdit] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <CleaningCategoryEditContext.Provider value={[isCleaningCategoryEdit,setIsCleaningCategoryEdit]}>
            {children}
        </CleaningCategoryEditContext.Provider>
    );
}
//---------- CATEGORÍAS DE LIMPIEZA
//---------- CANTIDADES DE CATEGORÍAS DE LIMPIEZA
// Función contexto para controlar los datos de la base de datos de las cantidades de las categorías de limpieza ✔️
export const Count_Cleaning_Categories = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isCountCleaningCategories,setIsCountCleaningCategories] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleCountCleaningCategories = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Cantidades de las categorías de limpieza obtenidas!')
                    setIsCountCleaningCategories(parsedData);
                }else{
                    console.log('¡Error al desencriptar las cantidades de las categorías de limpieza!');
                    setIsCountCleaningCategories([]);
                }
            } catch (error) {
                console.error('Error al procesar las cantidades de las categorías de limpieza:', error);
                setIsCountCleaningCategories([]);
            }
        }

        socket.emit('Get-Count-Cleaning-Categories');
        socket.on('Get-Count-Cleaning-Categories',handleCountCleaningCategories);

        return () => {
            socket.off('Get-Count-Cleaning-Categories',handleCountCleaningCategories);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <CountCleaningCategoriesContext.Provider value={[isCountCleaningCategories]}>
            {children}
        </CountCleaningCategoriesContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de una cantidad de una categoría de limpieza ✔️
export const Cleaning_Category_Count_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isCleaningCategoryCountAdd,setIsCleaningCategoryCountAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <CleaningCategoryCountAddContext.Provider value={[isCleaningCategoryCountAdd,setIsCleaningCategoryCountAdd]}>
            {children}
        </CleaningCategoryCountAddContext.Provider>
    );
}
//---------- CANTIDADES DE CATEGORÍAS DE LIMPIEZA
//---------- CATEGORÍAS DE LIMPIEZA ELIMINADAS
// Función contexto para controlar los datos de la base de datos de las categorías de limpieza eliminadas ✔️
export const Deleted_Cleaning_Categories = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isDeletedCleaningCategories,setIsDeletedCleaningCategories] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleDeletedCleaningCategories = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Categorías de limpieza eliminadas obtenidas!')
                    setIsDeletedCleaningCategories(parsedData);
                }else{
                    console.log('¡Error al desencriptar las categorías de limpieza eliminadas!');
                    setIsDeletedCleaningCategories([]);
                }
            } catch (error) {
                console.error('Error al procesar las categorías de limpieza eliminadas:', error);
                setIsDeletedCleaningCategories([]);
            }
        }

        socket.emit('Get-Deleted-Cleaning-Categories');
        socket.on('Get-Deleted-Cleaning-Categories',handleDeletedCleaningCategories);

        return () => {
            socket.off('Get-Deleted-Cleaning-Categories',handleDeletedCleaningCategories);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <DeletedCleaningCategoriesContext.Provider value={[isDeletedCleaningCategories]}>
            {children}
        </DeletedCleaningCategoriesContext.Provider>
    );
}
// Función contexto para controlar los datos eliminados de una categoría de limpieza ✔️
export const Cleaning_Category_Delete = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isCleaningCategoryDelete,setIsCleaningCategoryDelete] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <CleaningCategoryDeleteContext.Provider value={[isCleaningCategoryDelete,setIsCleaningCategoryDelete]}>
            {children}
        </CleaningCategoryDeleteContext.Provider>
    );
}
//---------- CATEGORÍAS DE LIMPIEZA ELIMINADAS
//---------- SUMINISTROS DE LIMPIEZA
// Función contexto para controlar los datos de la base de datos de los suministros de limpieza ✔️
export const Cleaning_Supplies = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isCleaningSupplies,setIsCleaningSupplies] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleCleaningSupplies = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Suministros de limpieza obtenidos!')
                    setIsCleaningSupplies(parsedData);
                }else{
                    console.log('¡Error al desencriptar los suministros de limpieza!');
                    setIsCleaningSupplies([]);
                }
            } catch (error) {
                console.error('Error al procesar los suministros de limpieza:', error);
                setIsCleaningSupplies([]);
            }
        }

        socket.emit('Get-Cleaning-Supplies');
        socket.on('Get-Cleaning-Supplies',handleCleaningSupplies);

        return () => {
            socket.off('Get-Cleaning-Supplies',handleCleaningSupplies);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <CleaningSuppliesContext.Provider value={[isCleaningSupplies]}>
            {children}
        </CleaningSuppliesContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de un suministro de limpieza ✔️
export const Cleaning_Supply_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isCleaningSupplyAdd,setIsCleaningSupplyAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <CleaningSupplyAddContext.Provider value={[isCleaningSupplyAdd,setIsCleaningSupplyAdd]}>
            {children}
        </CleaningSupplyAddContext.Provider>
    );
}
// Función contexto para controlar los datos editados de un suministro de limpieza ✔️
export const Cleaning_Supply_Edit = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isCleaningSupplyEdit,setIsCleaningSupplyEdit] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <CleaningSupplyEditContext.Provider value={[isCleaningSupplyEdit,setIsCleaningSupplyEdit]}>
            {children}
        </CleaningSupplyEditContext.Provider>
    );
}
//---------- SUMINISTROS DE LIMPIEZA
//---------- SUMINISTROS DE LIMPIEZA ELIMINADOS
// Función contexto para controlar los datos de la base de datos de los suministros de limpieza eliminados ✔️
export const Deleted_Cleaning_Supplies = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isDeletedCleaningSupplies,setIsDeletedCleaningSupplies] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleDeletedCleaningSupplies = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Suministros de limpieza eliminados obtenidos!')
                    setIsDeletedCleaningSupplies(parsedData);
                }else{
                    console.log('¡Error al desencriptar los suministros de limpieza eliminados!');
                    setIsDeletedCleaningSupplies([]);
                }
            } catch (error) {
                console.error('Error al procesar los suministros de limpieza eliminados:', error);
                setIsDeletedCleaningSupplies([]);
            }
        }

        socket.emit('Get-Deleted-Cleaning-Supplies');
        socket.on('Get-Deleted-Cleaning-Supplies',handleDeletedCleaningSupplies);

        return () => {
            socket.off('Get-Deleted-Cleaning-Supplies',handleDeletedCleaningSupplies);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <DeletedCleaningSuppliesContext.Provider value={[isDeletedCleaningSupplies]}>
            {children}
        </DeletedCleaningSuppliesContext.Provider>
    );
}
// Función contexto para controlar los datos eliminados de un suministro de limpieza ✔️
export const Cleaning_Supply_Delete = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isCleaningSupplyDelete,setIsCleaningSupplyDelete] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <CleaningSupplyDeleteContext.Provider value={[isCleaningSupplyDelete,setIsCleaningSupplyDelete]}>
            {children}
        </CleaningSupplyDeleteContext.Provider>
    );
}
//---------- SUMINISTROS DE LIMPIEZA ELIMINADOS
//---------- GASTOS FIJOS 
// Función contexto para controlar los datos de la base de datos de los gastos fijos ✔️
export const Fixed_Expenses = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isFixedExpenses,setIsFixedExpenses] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleFixedExpenses = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Gastos fijos obtenidos!')
                    setIsFixedExpenses(parsedData);
                }else{
                    console.log('¡Error al desencriptar los gastos fijos!');
                    setIsFixedExpenses([]);
                }
            } catch (error) {
                console.error('Error al procesar los gastos fijos:', error);
                setIsFixedExpenses([]);
            }
        }

        socket.emit('Get-Fixed-Expenses');
        socket.on('Get-Fixed-Expenses',handleFixedExpenses);

        return () => {
            socket.off('Get-Fixed-Expenses',handleFixedExpenses);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <FixedExpensesContext.Provider value={[isFixedExpenses]}>
            {children}
        </FixedExpensesContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de un gasto fijo ✔️
export const Fixed_Expense_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isFixedExpenseAdd,setIsFixedExpenseAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <FixedExpenseAddContext.Provider value={[isFixedExpenseAdd,setIsFixedExpenseAdd]}>
            {children}
        </FixedExpenseAddContext.Provider>
    );
}
// Función contexto para controlar los datos editados de un gasto fijo ✔️
export const Fixed_Expense_Edit = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isFixedExpenseEdit,setIsFixedExpenseEdit] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <FixedExpenseEditContext.Provider value={[isFixedExpenseEdit,setIsFixedExpenseEdit]}>
            {children}
        </FixedExpenseEditContext.Provider>
    );
}
//---------- GASTOS FIJOS 
//---------- GASTOS FIJOS ELIMINADOS
// Función contexto para controlar los datos de la base de datos de los gastos fijos eliminados ✔️
export const Deleted_Fixed_Expenses = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isDeletedFixedExpenses,setIsDeletedFixedExpenses] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleDeletedFixedExpenses = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Gastos fijos eliminados obtenidos!')
                    setIsDeletedFixedExpenses(parsedData);
                }else{
                    console.log('¡Error al desencriptar los gastos fijos eliminados!');
                    setIsDeletedFixedExpenses([]);
                }
            } catch (error) {
                console.error('Error al procesar los gastos fijos eliminados:', error);
                setIsDeletedFixedExpenses([]);
            }
        }

        socket.emit('Get-Deleted-Fixed-Expenses');
        socket.on('Get-Deleted-Fixed-Expenses',handleDeletedFixedExpenses);

        return () => {
            socket.off('Get-Deleted-Fixed-Expenses',handleDeletedFixedExpenses);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <DeletedFixedExpensesContext.Provider value={[isDeletedFixedExpenses]}>
            {children}
        </DeletedFixedExpensesContext.Provider>
    );
}
// Función contexto para controlar los datos eliminados de un gasto fijo ✔️
export const Fixed_Expense_Delete = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isFixedExpenseDelete,setIsFixedExpenseDelete] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <FixedExpenseDeleteContext.Provider value={[isFixedExpenseDelete,setIsFixedExpenseDelete]}>
            {children}
        </FixedExpenseDeleteContext.Provider>
    );
}
//---------- GASTOS FIJOS ELIMINADOS