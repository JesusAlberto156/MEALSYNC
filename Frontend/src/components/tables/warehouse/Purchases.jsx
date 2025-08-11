//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Contextos
import { SelectedRowContext,SelectedOptionOrderPlusUltraContext,SelectedOptionOrderPlusContext } from "../../../contexts/SelectedesProvider"
import { SupplyCategoriesContext } from "../../../contexts/SuppliesProvider"
import { CleaningCategoriesContext,FixedExpensesContext } from "../../../contexts/ExtrasProvider"
// Hooks personalizados
import { TableActionsPurchases } from "../../../hooks/warehouse/Tables"
import { Dates } from "../../../hooks/Dates"
import { ResetTextFieldsWarehouseFixedExpense } from "../../../hooks/warehouse/Texts"
//__________ICONOS__________
// Iconos de las tablas
import { MdOutlineAttachMoney } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Table,Table_Container, Table_Head_Thead_Blue, Table_Body_Tbody_White, Table_Body_Td } from "../../styled/Tables";
import { Table_Title_Number, Table_Title_Numeric, Table_Title_Text } from "../Titles"
import { Table_Pagination } from "../Pagination"
//____________IMPORT/EXPORT____________

// Tabla de las compras
export default function Table_Purchases(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext); 
    const [isSupplyCategories] = useContext(SupplyCategoriesContext);
    const [isCleaningCategories] = useContext(CleaningCategoriesContext); 
    const [isFixedExpenses] = useContext(FixedExpensesContext);
    const [isSelectedOptionOrderPlusUltra] = useContext(SelectedOptionOrderPlusUltraContext);
    const [isSelectedOptionOrderPlus] = useContext(SelectedOptionOrderPlusContext);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Purchases");
    
            const isClickInsideTable = table && table.contains(event.target);
            
            if (!isClickInsideTable) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    },[]);
    // UseEffect que pasa el valor a un check con la selección de la tabla
    useEffect(() => {
        if(isSelectedRow === null){
            resetTextFieldsWarehouseFixedExpense();
        }
    },[isSelectedRow]);
    // Constantes con la funcionalidad de los hooks
    const { handleRowClick,nextPagePurchases,prevPage,currentPage,currentRecordsPurchases,totalPagesPurchases } = TableActionsPurchases();
    const { getDate } = Dates();
    const resetTextFieldsWarehouseFixedExpense = ResetTextFieldsWarehouseFixedExpense();
    // Estructura del componente
    return(
        <>
            <Table_Container>
                <Table id="Table-Purchases">
                    <Table_Head_Thead_Blue>
                        <tr>
                            {isSelectedOptionOrderPlus === 'Insumos' ? (
                                <Table_Title_Text
                                    title="Insumos"
                                    order="Insumo"
                                />
                            ):(
                                <></>
                            )}
                            {isSelectedOptionOrderPlus === 'Suministros' ? (
                                <Table_Title_Text
                                    title="Suministros"
                                    order="Suministro"
                                />
                            ):(
                                <></>
                            )}
                            {isSelectedOptionOrderPlus === 'Gastos fijos' ? (
                                <Table_Title_Text
                                    title="Gastos fijos"
                                    order="Gasto fijo"
                                />
                            ):(
                                <></>
                            )}
                            {isSelectedOptionOrderPlusUltra === 'General'? (
                                <Table_Title_Number
                                    title="Fecha de operación"
                                    order="Fecha"
                                />
                            ):(
                                <></>
                            )}
                            {isSelectedOptionOrderPlus !== 'Gastos fijos' ? (
                                <Table_Title_Numeric
                                    title="Cantidad (Kg/Lt/Pz)"
                                    order="Cantidad"
                                />
                            ):(
                                <></>
                            )}
                            <Table_Title_Numeric
                                title="Precio"
                                order="Precio"
                            />
                        </tr>
                    </Table_Head_Thead_Blue>
                    <Table_Body_Tbody_White>
                        {currentRecordsPurchases.map((warehouse) => (
                            <tr 
                                key={warehouse.idalmacen}
                                onClick={() => handleRowClick(warehouse)}
                                style={{
                                    backgroundColor: isSelectedRow === warehouse ? 'rgba(0, 0, 0, 0.85)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 1s ease',
                                }}
                            >
                                {isSelectedOptionOrderPlus === 'Insumos' ? (
                                    <Table_Body_Td style={{color: isSelectedRow === warehouse ? 'white' : ''}}>{isSupplyCategories.find(s => s.idcategoria === warehouse.idcategoria)?.nombre || 'Desconocido'}</Table_Body_Td>
                                ):(
                                    <></>
                                )}
                                {isSelectedOptionOrderPlus === 'Suministros' ? (
                                    <Table_Body_Td style={{color: isSelectedRow === warehouse ? 'white' : ''}}>{isCleaningCategories.find(s => s.idcategoria === warehouse.idcategoria)?.nombre || 'Desconocido'}</Table_Body_Td>
                                ):(
                                    <></>
                                )}
                                {isSelectedOptionOrderPlus === 'Gastos fijos' ? (
                                    <Table_Body_Td style={{color: isSelectedRow === warehouse ? 'white' : ''}}>{isFixedExpenses.find(s => s.idgasto === warehouse.idgasto)?.nombre || 'Desconocido'}</Table_Body_Td>
                                ):(
                                    <></>
                                )}
                                {isSelectedOptionOrderPlusUltra === 'General'? (
                                    <Table_Body_Td style={{color: isSelectedRow === warehouse ? 'white' : ''}}>{getDate(warehouse.fecha)}</Table_Body_Td>
                                ):(
                                    <></>
                                )}
                                {isSelectedOptionOrderPlus !== 'Gastos fijos' ? (
                                    <Table_Body_Td style={{color: isSelectedRow === warehouse ? 'white' : ''}}>{warehouse.cantidadreal}</Table_Body_Td>
                                ):(
                                    <></>
                                )}
                                <Table_Body_Td style={{color: isSelectedRow === warehouse ? 'white' : ''}}><MdOutlineAttachMoney/> {warehouse.precio || '0'} MXN</Table_Body_Td>
                            </tr>
                        ))}
                    </Table_Body_Tbody_White>
                </Table>
            </Table_Container>
            <Table_Pagination
                currentPage={currentPage}
                currentRecords={currentRecordsPurchases}
                totalPage={totalPagesPurchases}
                onNextPage={() => nextPagePurchases()}
                onPrevPage={() => prevPage()}
            />
        </>
    );
}