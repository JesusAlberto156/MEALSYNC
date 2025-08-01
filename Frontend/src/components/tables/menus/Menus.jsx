//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Contextos
import { SelectedRowContext } from "../../../contexts/SelectedesProvider"
import { MenuTypeUbicationsContext,MenuUbicationsContext } from "../../../contexts/MenusProvider"
import { RefModalContext,RefFormContext,RefButtonEditContext,RefButtonDeleteContext } from "../../../contexts/RefsProvider"
import { TextFieldsMenuTypeContext } from "../../../contexts/FormsProvider"
import { LoggedTypeContext } from "../../../contexts/SessionProvider"
// Hooks personalizados
import { TableActionsMenuTypes } from "../../../hooks/menus/Tables"
import { ResetTextFieldsMenuType } from "../../../hooks/menus/Texts"
import { ResetTextFieldsUser } from "../../../hooks/users/Texts"
// Estilos personalizados
import { Table_Container,Table,Table_Head_Thead_Blue,Table_Body_Tbody_White,Table_Body_Td } from "../../styled/Tables"
// Componentes personalizados
import { Table_Title_Text,Table_Title_Normal } from "../Titles"
import { Table_Pagination } from "../Pagination"
//____________IMPORT/EXPORT____________

// Tabla de los menús
export default function Table_Menus(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const isModal = useContext(RefModalContext);
    const isForm = useContext(RefFormContext);
    const isButtonEdit = useContext(RefButtonEditContext);
    const isButtonDelete = useContext(RefButtonDeleteContext);
    const [isMenuTypeUbications] = useContext(MenuTypeUbicationsContext);
    const [isMenuUbications] = useContext(MenuUbicationsContext);
    const [isTextFieldsMenuType,setIsTextFieldsMenuType] = useContext(TextFieldsMenuTypeContext);
    const [isLoggedType] = useContext(LoggedTypeContext);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Menu-Types");

            const isClickInsideTable = table && table.contains(event.target);
            const isClickInsideModal = isModal?.current?.contains(event.target);
            const isClickInsideForm = isForm?.current?.contains(event.target);
            const isClickInsideEdit = isButtonEdit?.current?.contains(event.target);
            const isClickInsideDelete = isButtonDelete?.current?.contains(event.target);

            if (!isClickInsideTable && !isClickInsideModal && !isClickInsideForm && !isClickInsideEdit && !isClickInsideDelete) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    },[isModal,isForm,isButtonEdit,isButtonDelete]);
    // UseEffect que pasa el valor a un check con la selección de la tabla
    useEffect(() => {
        if(isSelectedRow !== null){
            setIsTextFieldsMenuType(prev => ({
                ...prev,
                idtipo: isSelectedRow.idtipo,
                nombre: isSelectedRow.nombre,
                cocina: isMenuTypeUbications.some(type => type.idtipo === isSelectedRow.idtipo && type.idubicacion === 1) ? 1 : 0,
                nutriologia: isMenuTypeUbications.some(type => type.idtipo === isSelectedRow.idtipo && type.idubicacion === 2) ? 1 : 0,
                areaMedica: isMenuTypeUbications.some(type => type.idtipo === isSelectedRow.idtipo && type.idubicacion === 3) ? 1 : 0,
            }));

        }else{
            resetTextFieldsMenuType();
            resetTextFieldsUser();
        }
    },[isSelectedRow])
    // Constantes con la funcionalidad de los hooks
    const resetTextFieldsMenuType = ResetTextFieldsMenuType();
    const resetTextFieldsUser = ResetTextFieldsUser();
    const {handleRowClick,nextPageMenuTypes,prevPage,currentRecordsMenuTypes,currentPage,totalPagesMenutypes} = TableActionsMenuTypes();
    // Estructura del componente
    return(
        <>
            <Table_Container>
                <Table id="Table-Menu-Types">
                    <Table_Head_Thead_Blue>
                        <tr>
                            <Table_Title_Text
                                order="Nombre"
                                title="Nombre"
                            />
                            <Table_Title_Normal
                                title="Ubicaciones"
                            />
                        </tr>
                    </Table_Head_Thead_Blue>
                    <Table_Body_Tbody_White>
                        {currentRecordsMenuTypes.map((type) => (
                            <tr
                                key={type.idtipo}
                                onClick={() => handleRowClick(type)}
                                style={{
                                    backgroundColor: isSelectedRow === type ? 'rgba(0, 0, 0, 0.85)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 1s ease',
                                }}
                            >
                                <Table_Body_Td style={{color: isSelectedRow === type ? 'white' : ''}}>{type.nombre || 'Desconocido'}</Table_Body_Td>
                                <Table_Body_Td style={{color: isSelectedRow === type ? 'white' : ''}}>
                                    {isLoggedType === 'Nutriólogo' ? (
                                        <>
                                            {
                                                isMenuTypeUbications.some(t => t.idtipo === type.idtipo && t.idubicacion === 2) ?
                                                `${isMenuUbications.find(ubication => ubication.idubicacion === 2)?.nombre}` : 'Desconocida'
                                            }
                                        </>
                                    ):(
                                        <>
                                            {
                                                isMenuTypeUbications.some(t => t.idtipo === type.idtipo && t.idubicacion === 1) && isMenuTypeUbications.some(t => t.idtipo === type.idtipo && t.idubicacion === 2) && isMenuTypeUbications.some(t => t.idtipo === type.idtipo && t.idubicacion === 3) ?
                                                `${isMenuUbications.find(ubication => ubication.idubicacion === 1)?.nombre}, ${isMenuUbications.find(ubication => ubication.idubicacion === 2)?.nombre}, ${isMenuUbications.find(ubication => ubication.idubicacion === 3)?.nombre}` :

                                                isMenuTypeUbications.some(t => t.idtipo === type.idtipo && t.idubicacion === 1) && isMenuTypeUbications.some(t => t.idtipo === type.idtipo && t.idubicacion === 2) ?
                                                `${isMenuUbications.find(ubication => ubication.idubicacion === 1)?.nombre}, ${isMenuUbications.find(ubication => ubication.idubicacion === 2)?.nombre}` :
                                                isMenuTypeUbications.some(t => t.idtipo === type.idtipo && t.idubicacion === 1) && isMenuTypeUbications.some(t => t.idtipo === type.idtipo && t.idubicacion === 3) ?
                                                `${isMenuUbications.find(ubication => ubication.idubicacion === 1)?.nombre}, ${isMenuUbications.find(ubication => ubication.idubicacion === 3)?.nombre}` :
                                                isMenuTypeUbications.some(t => t.idtipo === type.idtipo && t.idubicacion === 2) && isMenuTypeUbications.some(t => t.idtipo === type.idtipo && t.idubicacion === 3) ?
                                                `${isMenuUbications.find(ubication => ubication.idubicacion === 2)?.nombre}, ${isMenuUbications.find(ubication => ubication.idubicacion === 3)?.nombre}` :

                                                isMenuTypeUbications.some(t => t.idtipo === type.idtipo && t.idubicacion === 1) ? `${isMenuUbications.find(ubication => ubication.idubicacion === 1)?.nombre}` :
                                                isMenuTypeUbications.some(t => t.idtipo === type.idtipo && t.idubicacion === 2) ? `${isMenuUbications.find(ubication => ubication.idubicacion === 2)?.nombre}` :
                                                isMenuTypeUbications.some(t => t.idtipo === type.idtipo && t.idubicacion === 3) ? `${isMenuUbications.find(ubication => ubication.idubicacion === 3)?.nombre}` : 'Desconocidas'
                                            }
                                        </>
                                    )}
                                </Table_Body_Td>    
                            </tr>
                        ))}
                    </Table_Body_Tbody_White>
                </Table>
            </Table_Container>
            <Table_Pagination
                currentRecords={currentRecordsMenuTypes}
                currentPage={currentPage}
                totalPage={totalPagesMenutypes}
                onPrevPage={() => prevPage()}
                onNextPage={() => nextPageMenuTypes()}
            />
        </>
    );
}