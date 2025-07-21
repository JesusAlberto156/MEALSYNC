//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Contextos
import { SelectedRowContext } from "../../../contexts/SelectedesProvider"
import { UsersViewPasswordContext,PermissionsContext } from "../../../contexts/UsersProvider"
import { TextFieldsUserContext } from "../../../contexts/FormsProvider"
import { RefModalContext,RefFormContext,RefButtonEditContext,RefButtonDeleteContext } from "../../../contexts/RefsProvider"
import { UserTypesContext } from "../../../contexts/UsersProvider"
// Hooks personalizados
import { ResetTextFieldsUser,ResetTextFieldsPermissions,ResetTextFieldsStatus } from "../../../hooks/users/Texts"
import { TableActionsUsers } from "../../../hooks/users/Tables"
//__________IMAGENES__________
import User from '../../imgs/User.png';
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
import { Alert_Sonner_Promise } from "../../styled/Alerts"
// Componentes personalizados
import { Table_Title_Normal,Table_Title_Text } from "../Titles"
import { Table_Pagination } from "../Pagination"
//____________IMPORT/EXPORT____________

// Tabla de los usuarios
export default function Table_Users(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isUsersViewPassword,setIsUsersViewPassword] = useContext(UsersViewPasswordContext);
    const isModal = useContext(RefModalContext);
    const isForm = useContext(RefFormContext);
    const isButtonEdit = useContext(RefButtonEditContext);
    const isButtonDelete = useContext(RefButtonDeleteContext);
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    const [isUserTypes] = useContext(UserTypesContext);
    const [isPermissions] = useContext(PermissionsContext);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Users");
    
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
        return () => document.removeEventListener("click", handleClickOutside);
    },[isModal,isForm,isButtonEdit,isButtonDelete]);
    // UseEffect para reiniciar la vista de contraseña
    useEffect(() => {
        let timeoutId;

        if(isUsersViewPassword){
            timeoutId = setTimeout(() => {
                const promise = new Promise((resolve,reject) => {
                    try{
                        setTimeout(() => {
                            resolve('¡Se ocultaron las contraseñas!');
                            setTimeout(() => {
                                setIsUsersViewPassword(false);
                            },500);
                        },1000);
                    }catch(e){
                        return reject('¡Ocurrio un error inesperado!');
                    }
                });

                Alert_Sonner_Promise(promise,'¡Ocultando contraseñas!','1');
            },30000);            
        }

        return () => clearTimeout(timeoutId);
    },[isUsersViewPassword])
    // UseEfect para pasar el valor del renglon seleccionado a los input
    useEffect(() => {
        if(isSelectedRow !== null){
            setIsTextFieldsUser(prev => ({
                ...prev,
                idusuario: isSelectedRow.idusuario,
                nombre: isSelectedRow.nombre,
                nombrecorto: isSelectedRow.nombrecorto,
                usuario: isSelectedRow.usuario,
                contrasena: isSelectedRow.contrasena,
                idtipo: isSelectedRow.idtipo,
            }))
        }else{
            resetTextFieldsUser();
            resetTextFieldsPermissions();
            resetTextFieldsStatus();
        }
    },[isSelectedRow])
    // Constantes con la funcionalidad de los hooks
    const {handleRowClick,nextPageUsers,prevPage,currentRecordsUsers,currentPage,totalPagesUsers} = TableActionsUsers();
    const resetTextFieldsUser = ResetTextFieldsUser();
    const resetTextFieldsPermissions = ResetTextFieldsPermissions();
    const resetTextFieldsStatus = ResetTextFieldsStatus();
    // Estructura del componente
    return(
        <>
            <Table_Container>
                <Table id="Table-Users">
                    <Table_Head_Thead_Blue>
                        <tr>
                            <Table_Title_Normal 
                                title="Imagen"
                            />
                            <Table_Title_Text
                                title="Nombre completo"
                                order="Nombre"
                            />
                            <Table_Title_Text
                                title="Nombre corto"
                                order="Nombre corto"
                            />
                            <Table_Title_Text
                                title="Usuario"
                                order="Usuario"
                            />
                            <Table_Title_Normal 
                                title="Contraseña"
                            />
                            <Table_Title_Text
                                title="Tipo de usuario"
                                order="Tipo de usuario"
                            />
                        </tr>
                    </Table_Head_Thead_Blue>
                    <Table_Body_Tbody_White>
                        {currentRecordsUsers.map((user) => (
                            <tr
                                key={user.idusuario}
                                onClick={() => handleRowClick(user)}
                                style={{
                                    backgroundColor: isSelectedRow === user ? 'rgba(0, 0, 0, 0.85)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 1s ease',
                                }}
                            >
                                <Table_Body_Td><Table_Container_Item_Center><Table_Image_Black src={(() => {
                                    const permission = isPermissions.find(permission => permission.idusuario === user.idusuario);
                                    return permission?.superadministrador ? Super_Administrator : 
                                           permission?.administrador ? Administrator :
                                           permission?.chef ? Chef : 
                                           permission?.almacenista ? Storekeeper :
                                           permission?.cocinero ? Cook :
                                           permission?.nutriologo ? Nutritionist : 
                                           permission?.medico ? Doctor : User
                                })()} style={{border: isSelectedRow === user ? '2px solid white' : ''}}/></Table_Container_Item_Center></Table_Body_Td>
                                <Table_Body_Td style={{color: isSelectedRow === user ? 'white' : ''}}>{user.nombre || 'Desconocido'}</Table_Body_Td>
                                <Table_Body_Td style={{color: isSelectedRow === user ? 'white' : ''}}>{user.nombrecorto || 'Desconocido'}</Table_Body_Td>
                                <Table_Body_Td style={{color: isSelectedRow === user ? 'white' : ''}}>{user.usuario || 'Desconocido'}</Table_Body_Td>
                                <Table_Body_Td style={{color: isSelectedRow === user ? 'white' : ''}}>{isUsersViewPassword ? user.contrasena || 'Desconocida' : '•'.repeat(8)}</Table_Body_Td>
                                <Table_Body_Td style={{color: isSelectedRow === user ? 'white' : ''}}>{isUserTypes.find(type => type.idtipo === user.idtipo)?.tipo || 'Desconocido'}</Table_Body_Td>
                            </tr>
                        ))}
                    </Table_Body_Tbody_White>
                </Table>
            </Table_Container>
            <Table_Pagination
                currentRecords={currentRecordsUsers}
                totalPage={totalPagesUsers}
                currentPage={currentPage}
                onPrevPage={() => prevPage()}
                onNextPage={() => nextPageUsers()}
            />
        </>
    );
}