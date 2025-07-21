//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Contextos
import { SelectedRowContext } from "../../../contexts/SelectedesProvider"
import { UsersContext } from "../../../contexts/UsersProvider"
import { RefModalContext,RefFormContext,RefButtonEnableContext,RefButtonDisableContext } from "../../../contexts/RefsProvider"
import { TextFieldsStatusContext } from "../../../contexts/FormsProvider"
// Hooks personalizados
import { TableActionsStatus } from "../../../hooks/users/Tables"
import { ResetTextFieldsStatus,ResetTextFieldsUser,ResetTextFieldsPermissions } from "../../../hooks/users/Texts"
//__________IMAGENES__________
import User_Enable from '../../imgs/User-Enable.png';
import User_Disable from '../../imgs/User-Disable.png';
//__________IMAGENES__________
// Estilos personalizados
import { Table_Container,Table,Table_Head_Thead_Blue,Table_Container_Item_Center,Table_Image_Black,Table_Body_Tbody_White,Table_Body_Td } from "../../styled/Tables"
import { Text_Background_Green_12,Text_Background_Red_12 } from "../../styled/Text";
// Componentes personalizados
import { Table_Title_Text,Table_Title_Number } from "../Titles"
import { Table_Pagination } from "../Pagination"
//____________IMPORT/EXPORT____________

// Tabla de los estatus de usuarios
export default function Table_Status(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isUsers] = useContext(UsersContext);
    const isModal = useContext(RefModalContext);
    const isForm = useContext(RefFormContext);
    const isButtonEnable = useContext(RefButtonEnableContext);
    const isButtonDisable = useContext(RefButtonDisableContext);
    const [isTextFieldsStatus,setIsTextFieldsStatus] = useContext(TextFieldsStatusContext);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Status");

            const isClickInsideTable = table && table.contains(event.target);
            const isClickInsideModal = isModal?.current?.contains(event.target);
            const isClickInsideForm = isForm?.current?.contains(event.target);
            const isClickInsideEnable = isButtonEnable?.current?.contains(event.target);
            const isClickInsideDisable = isButtonDisable?.current?.contains(event.target);

            if (!isClickInsideTable && !isClickInsideModal && !isClickInsideForm && !isClickInsideEnable && !isClickInsideDisable) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    },[isModal,isForm,isButtonEnable,isButtonDisable]);
    // UseEffect que pasa el valor a un check con la selección de la tabla
    useEffect(() => {
        if(isSelectedRow !== null){
            setIsTextFieldsStatus(prev => ({
                ...prev,
                idusuario: isSelectedRow.idusuario,
                usuario: isUsers.find(user => user.idusuario === isSelectedRow.idusuario)?.usuario || 'Desconocido',
                idestatus: isSelectedRow.idestatus,
                estatus: isSelectedRow.habilitado ? 'Habilitado' : 'Deshabilitado',
            }));

        }else{
            resetTextFieldsUser();
            resetTextFieldsPermissions();
            resetTextFieldsStatus();
        }
    },[isSelectedRow])
    // Constantes con la funcionalidad de los hooks
    const resetTextFieldsUser = ResetTextFieldsUser();
    const resetTextFieldsPermissions = ResetTextFieldsPermissions();
    const resetTextFieldsStatus = ResetTextFieldsStatus();
    const {handleRowClick,nextPageStatus,prevPage,currentRecordsStatus,currentPage,totalPagesStatus} = TableActionsStatus();
    // Estructura del componente
    return(
        <>
            <Table_Container>
                <Table id="Table-Status">
                    <Table_Head_Thead_Blue>
                        <tr>
                            <Table_Title_Text
                                order="Nombre"
                                title="Nombre completo"
                            />
                            <Table_Title_Text
                                order="Usuario"
                                title="Usuario"
                            />
                            <Table_Title_Number
                                order="Habilitado"
                                title="Habilitado"
                            />
                        </tr>
                    </Table_Head_Thead_Blue>
                    <Table_Body_Tbody_White>
                        {currentRecordsStatus.map((status) => (
                            <tr
                                key={status.idestatus}
                                onClick={() => handleRowClick(status)}
                                style={{
                                    backgroundColor: isSelectedRow === status ? 'rgba(0, 0, 0, 0.85)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 1s ease',
                                }}
                            >
                                <Table_Body_Td style={{color: isSelectedRow === status ? 'white' : ''}}>{isUsers.find((user) => user.idusuario === status.idusuario)?.nombre || 'Desconocido'}</Table_Body_Td>
                                <Table_Body_Td><Table_Container_Item_Center>{status.activo ? <Text_Background_Green_12 style={{border: isSelectedRow === status ? '2px solid white' : ''}}>{isUsers.find((user) => user.idusuario === status.idusuario)?.usuario || 'Desconocido'}</Text_Background_Green_12>:<Text_Background_Red_12  style={{border: isSelectedRow === status ? '2px solid white' : ''}}>{isUsers.find((user) => user.idusuario === status.idusuario)?.usuario || 'Desconocido'}</Text_Background_Red_12>}</Table_Container_Item_Center></Table_Body_Td>
                                <Table_Body_Td><Table_Container_Item_Center><Table_Image_Black src={status.habilitado ? User_Enable : User_Disable} style={{border: isSelectedRow === status ? '2px solid white' : ''}}/></Table_Container_Item_Center></Table_Body_Td>
                            </tr>
                        ))}
                    </Table_Body_Tbody_White>
                </Table>
            </Table_Container>
            <Table_Pagination
                currentRecords={currentRecordsStatus}
                currentPage={currentPage}
                totalPage={totalPagesStatus}
                onPrevPage={() => prevPage()}
                onNextPage={() => nextPageStatus()}
            />
        </>
    );
}