//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Contextos
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider"
import { LoggedTypeContext } from "../../../../contexts/SessionProvider";
import { RefKeyboardTouchContext } from "../../../../contexts/RefsProvider";
import { TouchContext,KeyboardContext,KeyboardViewContext,ActionBlockContext } from "../../../../contexts/VariablesProvider";
import { SearchTermContext } from "../../../../contexts/SearchsProvider";
// Hooks personalizados
import { TableActionsTotalSupplies } from "../../../../hooks/supplies/Tables";
import { HandleKeyboard } from "../../../../hooks/Views";
//________ICONOS________
import { IoSearch } from "react-icons/io5";
//________ICONOS________
// Estilos personalizados
import { Table,Table_Container, Table_Head_Thead_Blue, Table_Body_Tbody_White, Table_Body_Td } from "../../../styled/Tables";
import { Table_Title_Numeric, Table_Title_Text } from "../../Titles"
import { Container_Searchbar_Row_General, Container_Searchbar_Row_General_Black, Container_Searchbar_Row_Search_Blue } from "../../../styled/Containers";
import { Input_Search_Table_White } from "../../../styled/Inputs";
import { Icon_White_20 } from "../../../styled/Icons";
// Componentes personalizados
import { Table_Pagination } from "../../Pagination"
import { Search_Bar_Button_Search, Search_Bar_Icon_Button_Search_Order } from "../../../navegation/searchbar/Buttons";
import { Keyboard_Form_Search } from "../../../keyboards/Form";
//____________IMPORT/EXPORT____________

// Tabla del total de insumos
export default function Table_Total_Supplies(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext); 
    const [isLoggedType] = useContext(LoggedTypeContext);
    const isKeyboardTouch = useContext(RefKeyboardTouchContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const [isActionBlock] = useContext(ActionBlockContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(SearchTermContext);
    const [isTouch] = useContext(TouchContext);
    // Constante con las opciones de los buscadores
    const isOptionWarehouse = ['General','Insumo','Cantidad'];
    const { KeyboardView,KeyboardClick } = HandleKeyboard();
    // UseEffets para controlar el teclado
    useEffect(() => {
        KeyboardView();
    },[]);
    useEffect(() => {
        KeyboardClick();
    },[Keyboard]);
    useEffect(() => {
        isKeyboardTouch.current = isTouch;
    },[isTouch]);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Total-Supplies");
    
            const isClickInsideTable = table && table.contains(event.target);
            
            if (!isClickInsideTable) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    },[]);
    // Constantes con la funcionalidad de los hooks
    const { handleRowClick,nextPageTotalSupplies,prevPage,currentPage,currentRecordsTotalSupplies,totalPagesTotalSupplies } = TableActionsTotalSupplies();
    // Estructura del componente
    return(
        <>
            {isLoggedType === 'Cocinero' || isLoggedType === 'Nutriólogo' ? (
                <Container_Searchbar_Row_General_Black>
                    <Icon_White_20 style={{ marginLeft: '20px'}}><IoSearch/></Icon_White_20>
                    <Input_Search_Table_White
                        className="Input-Buscador"
                        type="text"
                        placeholder="Buscar..."
                        value={isSearchTerm}
                        disabled={isActionBlock}
                        onChange={(e) => setIsSearchTerm(e.target.value)}
                        onFocus={() => {
                            if(isKeyboardTouch.current){
                                setIsKeyboard(true);
                                setIsKeyboardView('Buscador');
                            }
                        }}
                    />
                    <Container_Searchbar_Row_General>
                        <Container_Searchbar_Row_Search_Blue>
                            <Search_Bar_Button_Search
                                options={isOptionWarehouse}
                            />
                            <Search_Bar_Icon_Button_Search_Order/>
                        </Container_Searchbar_Row_Search_Blue>
                    </Container_Searchbar_Row_General>
                    <Keyboard_Form_Search/>
                </Container_Searchbar_Row_General_Black>
            ):(
                <></>
            )}
            <Table_Container>
                <Table id="Table-Total-Supplies">
                    <Table_Head_Thead_Blue>
                        <tr>
                            {isLoggedType !== 'Nutriólogo' && isLoggedType !== 'Cocinero' ? (
                                <Table_Title_Text
                                    title="Nombre"
                                    order="Nombre"
                                />
                            ):(
                                <Table_Title_Text
                                    title="Insumo"
                                    order="Nombre"
                                />
                            )}
                            <Table_Title_Numeric
                                title="Cantidad"
                                order="Cantidad"
                            />
                            {isLoggedType !== 'Nutriólogo' && isLoggedType !== 'Cocinero' ? (
                                <Table_Title_Numeric
                                    title="Cantidad Mínima"
                                    order="Cantidad minima"
                                />
                            ):(
                                <></>
                            )}
                        </tr>
                    </Table_Head_Thead_Blue>
                    <Table_Body_Tbody_White>
                        {currentRecordsTotalSupplies.map((supply) => (
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
                                {isLoggedType !== 'Nutriólogo' && isLoggedType !== 'Cocinero' ? (
                                    <Table_Body_Td style={{color: isSelectedRow === supply ? 'white' : ''}}>{supply.limite} - {supply.unidad}{supply.cantidadreal !== 1 ? 's' : ''}</Table_Body_Td>
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
                currentRecords={currentRecordsTotalSupplies}
                totalPage={totalPagesTotalSupplies}
                onNextPage={() => nextPageTotalSupplies()}
                onPrevPage={() => prevPage()}
            />
        </>
    );
}