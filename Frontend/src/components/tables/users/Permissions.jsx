//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Contextos
import { SelectedRowContext } from "../../../contexts/SelectedesProvider"
import { UsersContext } from "../../../contexts/UsersProvider"
import { LoggedPermissionsContext } from "../../../contexts/SessionProvider"
import { TextFieldsPermissionsContext } from "../../../contexts/FormsProvider"
import { RefModalContext,RefFormContext,RefButtonEditContext,RefButtonEnableContext,RefButtonDisableContext } from "../../../contexts/RefsProvider"
// Hooks personalizados
import { TableActionsPermissions } from "../../../hooks/users/Tables"
import { ResetTextFieldsPermissions,ResetTextFieldsUser,ResetTextFieldsStatus } from "../../../hooks/users/Texts"
//__________IMAGENES__________
import User from '../../imgs/User-Disable.png';
import Super_Administrator from '../../imgs/Super-Administrator.jpg';
import Administrator from '../../imgs/Administrator.jpg';
import Chef from '../../imgs/Chef.avif';
import Storekeeper from '../../imgs/Storekeeper.jpg';
import Cook from '../../imgs/Cook.jpg';
import Nutritionist from '../../imgs/Nutritionist.jpg';
import Doctor from '../../imgs/Doctor.webp';
//__________IMAGENES__________
// Estilos personalizados
import { Table_Container,Table,Table_Head_Thead_Blue,Table_Container_Item_Center,Table_Body_Tbody_White,Table_Body_Td,Table_Image_Black } from "../../styled/Tables"
// Componentes personalizados
import { Table_Title_Text,Table_Title_Number } from "../Titles"
import { Table_Pagination } from "../Pagination"
//____________IMPORT/EXPORT____________

// Tabla de los permisos de usuarios
export default function Table_Permissions(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isPermission] = useContext(LoggedPermissionsContext);
    const [isUsers] = useContext(UsersContext);
    const [isTextFieldsPermissions,setIsTextFieldsPermissions] = useContext(TextFieldsPermissionsContext);
    const isModal = useContext(RefModalContext);
    const isForm = useContext(RefFormContext);
    const isButtonEdit = useContext(RefButtonEditContext);
    const isButtonEnable = useContext(RefButtonEnableContext);
    const isButtonDisable = useContext(RefButtonDisableContext);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Permissions");

            const isClickInsideTable = table && table.contains(event.target);
            const isClickInsideModal = isModal?.current?.contains(event.target);
            const isClickInsideForm = isForm?.current?.contains(event.target);
            const isClickInsideEdit = isButtonEdit?.current?.contains(event.target);
            const isClickInsideEnable = isButtonEnable?.current?.contains(event.target);
            const isClickInsideDisable = isButtonDisable?.current?.contains(event.target);

            if (!isClickInsideTable && !isClickInsideModal && !isClickInsideForm && !isClickInsideEdit && !isClickInsideEnable && !isClickInsideDisable) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    },[isModal,isForm,isButtonEdit,isButtonEnable,isButtonDisable]);
    // UseEffect que pasa el valor a un check con la selección de la tabla
    useEffect(() => {
        if(isSelectedRow !== null){
            setIsTextFieldsPermissions(prev => ({
                ...prev,
                idpermiso: isSelectedRow.idpermiso,
                idusuario: isSelectedRow.idusuario,
                usuario: isUsers.find(user => user.idusuario === isSelectedRow.idusuario)?.usuario || 'Desconocido',
                administrador: isSelectedRow.administrador,
                chef: isSelectedRow.chef,
                almacenista: isSelectedRow.almacenista,
                cocinero: isSelectedRow.cocinero,
                nutriologo: isSelectedRow.nutriologo,
                medico: isSelectedRow.medico,
                superadministrador: isSelectedRow.superadministrador,
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
    const {handleRowClick, nextPagePermissions,prevPage,currentRecordsPermissions,currentPage,totalPagesPermissions} = TableActionsPermissions();
    // Estructura del componente
    return(
        <>
            <Table_Container>
                <Table id="Table-Permissions">
                    <Table_Head_Thead_Blue>
                        <tr>
                            <Table_Title_Text
                                title="Nombre completo"
                                order="Nombre"
                            />
                            <Table_Title_Number
                                title="Administrador"
                                order="Administrador"
                            />
                            <Table_Title_Number
                                title="Chef"
                                order="Chef"
                            />
                            <Table_Title_Number
                                title="Almacenista"
                                order="Almacenista"
                            />
                            <Table_Title_Number
                                title="Cocinero"
                                order="Cocinero"
                            />
                            <Table_Title_Number
                                title="Nutriólogo"
                                order="Nutriologo"
                            />
                            <Table_Title_Number
                                title="Médico"
                                order="Medico"
                            />
                            {isPermission.superadministrador ? (
                                <Table_Title_Number
                                    title="Super Administrador"
                                    order="Super-Administrador"
                                />
                            ):(
                                <></>
                            )}
                        </tr>
                    </Table_Head_Thead_Blue>
                    <Table_Body_Tbody_White>
                        {currentRecordsPermissions.map((permission) => (
                            <tr
                                key={permission.idpermiso}
                                onClick={() => handleRowClick(permission)}
                                style={{
                                    backgroundColor: isSelectedRow === permission ? 'rgba(0, 0, 0, 0.85)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 1s ease',
                                }}
                            >
                                <Table_Body_Td style={{color: isSelectedRow === permission ? 'white' : ''}}>{isUsers.find(user => user.idusuario === permission.idusuario)?.nombre || 'Desconocido'}</Table_Body_Td>
                                <Table_Body_Td><Table_Container_Item_Center><Table_Image_Black src={permission.administrador ? Administrator : User} style={{border: isSelectedRow === permission ? '2px solid white' : ''}}/></Table_Container_Item_Center></Table_Body_Td>
                                <Table_Body_Td><Table_Container_Item_Center><Table_Image_Black src={permission.chef ? Chef : User} style={{border: isSelectedRow === permission ? '2px solid white' : ''}}/></Table_Container_Item_Center></Table_Body_Td>
                                <Table_Body_Td><Table_Container_Item_Center><Table_Image_Black src={permission.almacenista ? Storekeeper : User} style={{border: isSelectedRow === permission ? '2px solid white' : ''}}/></Table_Container_Item_Center></Table_Body_Td>
                                <Table_Body_Td><Table_Container_Item_Center><Table_Image_Black src={permission.cocinero ? Cook : User} style={{border: isSelectedRow === permission ? '2px solid white' : ''}}/></Table_Container_Item_Center></Table_Body_Td>
                                <Table_Body_Td><Table_Container_Item_Center><Table_Image_Black src={permission.nutriologo ? Nutritionist : User} style={{border: isSelectedRow === permission ? '2px solid white' : ''}}/></Table_Container_Item_Center></Table_Body_Td>
                                <Table_Body_Td><Table_Container_Item_Center><Table_Image_Black src={permission.medico ? Doctor : User} style={{border: isSelectedRow === permission ? '2px solid white' : ''}}/></Table_Container_Item_Center></Table_Body_Td>
                                {isPermission.superadministrador ? (
                                    <Table_Body_Td><Table_Container_Item_Center><Table_Image_Black src={permission.superadministrador ? Super_Administrator : User} style={{border: isSelectedRow === permission ? '2px solid white' : ''}}/></Table_Container_Item_Center></Table_Body_Td>
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
                totalPage={totalPagesPermissions}
                currentRecords={currentRecordsPermissions}
                onNextPage={() => nextPagePermissions()}
                onPrevPage={() => prevPage()}
            />
        </>
    );
}