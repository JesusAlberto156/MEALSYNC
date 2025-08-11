//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Contextos
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider"
// Hooks personalizados
import { TableActionsPurchases } from "../../../../hooks/suppliers/Tables"
//__________ICONOS__________
// Iconos de las tablas
import { MdOutlineAttachMoney } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Table,Table_Container, Table_Head_Thead_Blue, Table_Body_Tbody_White, Table_Body_Td } from "../../../styled/Tables";
import { Table_Title_Numeric, Table_Title_Text } from "../../Titles"
import { Table_Pagination } from "../../Pagination"
//____________IMPORT/EXPORT____________

// Tabla de las compras de proveedores por mes 
export default function Table_Purchases(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext); 
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
    // Constantes con la funcionalidad de los hooks
    const { handleRowClick,nextPagePurchases,prevPage,currentPage,currentRecordsPurchases,totalPagesPurchases } = TableActionsPurchases();
    // Estructura del componente
    return(
        <>
            <Table_Container>
                <Table id="Table-Purchases">
                    <Table_Head_Thead_Blue>
                        <tr>
                            <Table_Title_Text
                                title="Proveedor"
                                order="Proveedor"
                            />
                            <Table_Title_Numeric
                                title="Compras"
                                order="Compras"
                            />
                        </tr>
                    </Table_Head_Thead_Blue>
                    <Table_Body_Tbody_White>
                        {currentRecordsPurchases.map((supplier) => (
                            <tr 
                                key={supplier.idproveedor}
                                onClick={() => handleRowClick(supplier)}
                                style={{
                                    backgroundColor: isSelectedRow === supplier ? 'rgba(0, 0, 0, 0.85)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 1s ease',
                                }}
                            >
                                <Table_Body_Td style={{color: isSelectedRow === supplier ? 'white' : ''}}>{supplier.nombre || 'Desconocido'}</Table_Body_Td>
                                <Table_Body_Td style={{color: isSelectedRow === supplier ? 'white' : ''}}><MdOutlineAttachMoney/> {supplier.precio || '0'} MXN</Table_Body_Td>
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