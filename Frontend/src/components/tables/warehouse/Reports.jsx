//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Contextos
import { SelectedRowContext,SelectedOptionOrderPlusContext } from "../../../contexts/SelectedesProvider"
import { FixedExpensesContext } from "../../../contexts/ExtrasProvider"
// Hooks personalizados
import { TableActionsReports } from "../../../hooks/warehouse/Tables"
import { ResetTextFieldsWarehouseSupply,ResetTextFieldsWarehouseCleaning } from "../../../hooks/warehouse/Texts"
//__________ICONOS__________
// Iconos de las tablas
import { MdOutlineAttachMoney } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Table,Table_Container, Table_Head_Thead_Blue, Table_Body_Tbody_White, Table_Body_Td } from "../../styled/Tables";
import { Table_Title_Number, Table_Title_Numeric, Table_Title_Text } from "../Titles"
import { Table_Pagination } from "../Pagination"
//____________IMPORT/EXPORT____________

// Tabla de los reportes
export default function Table_Reports(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext); 
    const [isFixedExpenses] = useContext(FixedExpensesContext);
    const [isSelectedOptionOrderPlus] = useContext(SelectedOptionOrderPlusContext);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Reports");
    
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
            resetTextFieldsWarehouseSupply();
            resetTextFieldsWarehouseCleaning();
        }
    },[isSelectedRow]);
    // Constantes con la funcionalidad de los hooks
    const { handleRowClick,nextPageReports,prevPage,currentPage,currentRecordsReports,totalPagesReports } = TableActionsReports();
    const resetTextFieldsWarehouseSupply = ResetTextFieldsWarehouseSupply();
    const resetTextFieldsWarehouseCleaning = ResetTextFieldsWarehouseCleaning();
    // Estructura del componente
    return(
        <>
            <Table_Container>
                <Table id="Table-Reports">
                    <Table_Head_Thead_Blue>
                        <tr>
                            {isSelectedOptionOrderPlus === 'Categorías de limpieza' || isSelectedOptionOrderPlus === 'Categorías de insumos' ? (
                                <>
                                    <Table_Title_Text
                                        title="Nombre"
                                        order="Nombre"
                                    />
                                    <Table_Title_Number
                                        title="INVENTARIO INICIAL"
                                        order="Inventario inicial"
                                    />
                                    <Table_Title_Number
                                        title="COMPRAS"
                                        order="Compras"
                                    />
                                    <Table_Title_Number
                                        title="INVENTARIO FINAL"
                                        order="Inventario final"
                                    />
                                    <Table_Title_Number
                                        title="COSTO"
                                        order="Costo"
                                    />
                                </>
                            ):(
                                <></>
                            )}
                            {isSelectedOptionOrderPlus === 'Gastos fijos' ? (
                                <>
                                    <Table_Title_Text
                                        title="Gastos fijos"
                                        order="Gasto fijo"
                                    />
                                    <Table_Title_Numeric
                                        title="Precio"
                                        order="Precio"
                                    />
                                </>
                            ):(
                                <></>
                            )}
                        </tr>
                    </Table_Head_Thead_Blue>
                    <Table_Body_Tbody_White>
                        {currentRecordsReports.map((warehouse) => (
                            <tr 
                                key={`${warehouse.idcategoria || warehouse.idalmacen}`}
                                onClick={() => handleRowClick(warehouse)}
                                style={{
                                    backgroundColor: isSelectedRow === warehouse ? 'rgba(0, 0, 0, 0.85)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 1s ease',
                                }}
                            >
                                {isSelectedOptionOrderPlus === 'Categorías de limpieza' || isSelectedOptionOrderPlus === 'Categorías de insumos' ? (
                                    <>
                                        <Table_Body_Td style={{color: isSelectedRow === warehouse ? 'white' : ''}}>{warehouse.nombre}</Table_Body_Td>
                                        <Table_Body_Td style={{color: isSelectedRow === warehouse ? 'white' : ''}}><MdOutlineAttachMoney/> {warehouse.inventarioInicial} MXN</Table_Body_Td>
                                        <Table_Body_Td style={{color: isSelectedRow === warehouse ? 'white' : ''}}><MdOutlineAttachMoney/> {warehouse.comprasDelMes} MXN</Table_Body_Td>
                                        <Table_Body_Td style={{color: isSelectedRow === warehouse ? 'white' : ''}}><MdOutlineAttachMoney/> {warehouse.inventarioFinal} MXN</Table_Body_Td>
                                        <Table_Body_Td style={{color: isSelectedRow === warehouse ? 'white' : ''}}><MdOutlineAttachMoney/> {warehouse.costo} MXN</Table_Body_Td>
                                    </>
                                ):(
                                    <></>
                                )}
                                {isSelectedOptionOrderPlus === 'Gastos fijos' ? (
                                    <>
                                        <Table_Body_Td style={{color: isSelectedRow === warehouse ? 'white' : ''}}>{isFixedExpenses.find(s => s.idgasto === warehouse.idgasto)?.nombre || 'Desconocido'}</Table_Body_Td> 
                                        <Table_Body_Td style={{color: isSelectedRow === warehouse ? 'white' : ''}}><MdOutlineAttachMoney/> {warehouse.precio || '0'} MXN</Table_Body_Td> 
                                    </>
                                ):(
                                    <></>
                                )}
                            </tr>
                        ))}
                    </Table_Body_Tbody_White>
                </Table>
            </Table_Container>
            <Table_Pagination
                currentPage={currentPage}
                currentRecords={currentRecordsReports}
                totalPage={totalPagesReports}
                onNextPage={() => nextPageReports()}
                onPrevPage={() => prevPage()}
            />
        </>
    );
}