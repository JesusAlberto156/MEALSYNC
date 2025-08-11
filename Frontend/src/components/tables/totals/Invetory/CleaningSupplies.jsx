//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Contextos
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider"
// Hooks personalizados
import { TableActionsTotalCleaningSupplies } from "../../../../hooks/extras/Tables";
// Estilos personalizados
import { Table,Table_Container, Table_Head_Thead_Blue, Table_Body_Tbody_White, Table_Body_Td } from "../../../styled/Tables";
import { Table_Title_Numeric, Table_Title_Text } from "../../Titles"
import { Table_Pagination } from "../../Pagination"
//____________IMPORT/EXPORT____________

// Tabla del total de insumos
export default function Table_Total_Cleaning_Supplies(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext); 
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Total-Cleaning-Supplies");
    
            const isClickInsideTable = table && table.contains(event.target);
            
            if (!isClickInsideTable) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    },[]);
    // Constantes con la funcionalidad de los hooks
    const { handleRowClick,nextPageTotalCleaningSupplies,prevPage,currentPage,currentRecordsTotalCleaningSupplies,totalPagesTotalCleaningSupplies } = TableActionsTotalCleaningSupplies();
    // Estructura del componente
    return(
        <>
            <Table_Container>
                <Table id="Table-Total-Cleaning-Supplies">
                    <Table_Head_Thead_Blue>
                        <tr>
                            <Table_Title_Text
                                title="Nombre"
                                order="Nombre"
                            />
                            <Table_Title_Numeric
                                title="Cantidad"
                                order="Cantidad"
                            />
                            <Table_Title_Numeric
                                title="Cantidad Mínima"
                                order="Cantidad minima"
                            />
                        </tr>
                    </Table_Head_Thead_Blue>
                    <Table_Body_Tbody_White>
                        {currentRecordsTotalCleaningSupplies.map((supply) => (
                            <tr 
                                key={supply.idtipo}
                                onClick={() => handleRowClick(supply)}
                                style={{
                                    backgroundColor: isSelectedRow === supply ? 'rgba(0, 0, 0, 0.85)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 1s ease',
                                }}
                            >
                                <Table_Body_Td style={{color: isSelectedRow === supply ? 'white' : ''}}>{supply.nombre || 'Desconocido'}</Table_Body_Td>
                                <Table_Body_Td style={{color: isSelectedRow === supply ? 'white' : ''}}>{supply.cantidadreal} - {supply.unidad}{supply.cantidadreal !== 1 ? 's' : ''}</Table_Body_Td>
                                <Table_Body_Td style={{color: isSelectedRow === supply ? 'white' : ''}}>{supply.limite} - {supply.unidad}{supply.cantidadreal !== 1 ? 's' : ''}</Table_Body_Td>
                            </tr>
                        ))}
                    </Table_Body_Tbody_White>
                </Table>
            </Table_Container>
            <Table_Pagination
                currentPage={currentPage}
                currentRecords={currentRecordsTotalCleaningSupplies}
                totalPage={totalPagesTotalCleaningSupplies}
                onNextPage={() => nextPageTotalCleaningSupplies()}
                onPrevPage={() => prevPage()}
            />
        </>
    );
}