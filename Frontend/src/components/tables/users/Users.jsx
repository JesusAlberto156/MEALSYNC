//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Componentes de React externos
import { Tooltip } from "@mui/material"
// Contextos
import { SelectedRowContext,SelectedOptionOrderDirectionContext,SelectedOptionOrderContext } from "../../../contexts/SelectedesProvider"
import { UsersViewPasswordContext,PermissionsContext } from "../../../contexts/UsersProvider"
import { TextFieldsUserContext } from "../../../contexts/FormsProvider"
import { RefUsersContext } from "../../../contexts/RefsProvider"
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
//__________ICONOS__________
// Iconos de las tablas
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { CgArrowsV } from "react-icons/cg";
// Iconos de la paginación
import { GrNext,GrPrevious } from "react-icons/gr";
//__________ICONOS__________
// Estilos personalizados
import { Table_Container_Auto,Table,Table_Head_Thead_Blue,Table_Head_Th,Table_Body_Tbody_White,Table_Body_Td,Table_Container_Item_Center,Table_Container_Pagination,Table_Image_Black,Table_Container_Data } from "../../styled/Tables";
import { Button_Icon_Blue_220 } from "../../styled/Buttons";
import { Text_Span_16_Center_White,Text_Span_16_Center_Black,Text_Fade_Title_32_Black } from "../../styled/Text";
import { Icon_20,Icon_Button_White_16 } from "../../styled/Icons";
import { Alert_Verification } from "../../styled/Alerts"
//____________IMPORT/EXPORT____________

// Tabla de los usuarios
export default function Table_Users(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isUsersViewPassword,setIsUsersViewPassword] = useContext(UsersViewPasswordContext);
    const {Modal_Users,Form_Users,Button_Edit_Users,Button_Delete_Users} = useContext(RefUsersContext);
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    const [isUserTypes] = useContext(UserTypesContext);
    const [isPermissions] = useContext(PermissionsContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Users");
    
            const isClickInsideTable = table && table.contains(event.target);
            const isClickInsideModal = Modal_Users?.current?.contains(event.target);
            const isClickInsideForm = Form_Users?.current?.contains(event.target);
            const isClickInsideEdit = Button_Edit_Users?.current?.contains(event.target);
            const isClickInsideDelete = Button_Delete_Users?.current?.contains(event.target);
    
            if (!isClickInsideTable && !isClickInsideModal && !isClickInsideForm && !isClickInsideEdit && !isClickInsideDelete) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    },[Modal_Users,Form_Users,Button_Edit_Users, Button_Delete_Users]);
    // UseEffect para reiniciar la vista de contraseña
    useEffect(() => {
        let timeoutId;

        if(isUsersViewPassword){
            timeoutId = setTimeout(() => {
                const promise = new Promise((resolve,reject) => {
                    try{
                        setTimeout(() => {
                            resolve('¡Se ocultaron las contraseñas!...');
                            setTimeout(() => {
                                setIsUsersViewPassword(false);
                            },500);
                        },1000);
                    }catch(e){
                        return reject('¡Ocurrio un error inesperado!...');
                    }
                });

                Alert_Verification(promise,'¡Ocultando contraseñas!...');
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
    const {handleRowClick, nextPageUsers, prevPage, currentRecordsUsers, currentPage, totalPagesUsers, ToggleOrder, ToggleOrderDirection} = TableActionsUsers();
    const resetTextFieldsUser = ResetTextFieldsUser();
    const resetTextFieldsPermissions = ResetTextFieldsPermissions();
    const resetTextFieldsStatus = ResetTextFieldsStatus();
    // Estructura del componente
    return(
        <>
            <Table_Container_Auto>
                <Table id="Table-Users">
                    <Table_Head_Thead_Blue>
                        <tr>
                            <Table_Head_Th><Text_Span_16_Center_White>Imagen</Text_Span_16_Center_White></Table_Head_Th>
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 
                                        onClick={() => {
                                            ToggleOrder('Nombre')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Nombre' ? <FaSortAlphaDown/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Nombre' ? <FaSortAlphaDownAlt/> : <CgArrowsV/>} Nombre completo
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 
                                        onClick={() => {
                                            ToggleOrder('Nombre-Corto')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Nombre-Corto' ? <FaSortAlphaDown/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Nombre-Corto' ? <FaSortAlphaDownAlt/> : <CgArrowsV/>} Nombre corto
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 
                                        onClick={() => {
                                            ToggleOrder('Usuario')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Usuario' ? <FaSortAlphaDown/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Usuario' ? <FaSortAlphaDownAlt/> : <CgArrowsV/>} Usuario
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                            <Table_Head_Th><Text_Span_16_Center_White>Contraseña</Text_Span_16_Center_White></Table_Head_Th>
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 
                                        onClick={() => {
                                            ToggleOrder('Tipo')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Tipo' ? <FaSortAlphaDown/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Tipo' ? <FaSortAlphaDownAlt/> : <CgArrowsV/>} Tipo de usuario
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                        </tr>
                    </Table_Head_Thead_Blue>
                    <Table_Body_Tbody_White>
                        {currentRecordsUsers.map((user) => (
                            <tr
                                key={user.idusuario}
                                onClick={() => handleRowClick(user)}
                                style={{
                                    backgroundColor: isSelectedRow === user ? 'rgba(88, 88, 84, 0.8)' : 'transparent',
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
                                })()} style={{border: isSelectedRow === user ? '3px solid white' : '3px solid black'}}/></Table_Container_Item_Center></Table_Body_Td>
                                <Table_Body_Td style={{color: isSelectedRow === user ? 'white' : 'black'}}>{user.nombre || 'Desconocido...'}</Table_Body_Td>
                                <Table_Body_Td style={{color: isSelectedRow === user ? 'white' : 'black'}}>{user.nombrecorto || 'Desconocido...'}</Table_Body_Td>
                                <Table_Body_Td style={{color: isSelectedRow === user ? 'white' : 'black'}}>{user.usuario || 'Desconocido...'}</Table_Body_Td>
                                <Table_Body_Td style={{color: isSelectedRow === user ? 'white' : 'black'}}>{isUsersViewPassword ? user.contrasena || 'Desconocida...' : '•'.repeat(8)}</Table_Body_Td>
                                <Table_Body_Td style={{color: isSelectedRow === user ? 'white' : 'black'}}>{isUserTypes.find(type => type.idtipo === user.idtipo)?.tipo || 'Desconocido...'}</Table_Body_Td>
                            </tr>
                        ))}
                    </Table_Body_Tbody_White>
                </Table>
            </Table_Container_Auto>
            {currentRecordsUsers.length !== 0 ? (
                <>
                    <Table_Container_Pagination>
                        <Tooltip title='Página anterior' placement="top">
                            <span>
                                <Button_Icon_Blue_220
                                    disabled={currentPage === 1}
                                    onClick={prevPage}
                                >
                                    <Icon_20><GrPrevious/></Icon_20>
                                </Button_Icon_Blue_220>
                            </span>
                        </Tooltip>
                        <Text_Span_16_Center_Black>Página {currentPage} de {totalPagesUsers}</Text_Span_16_Center_Black>
                        <Tooltip title='Página siguiente' placement="top">
                            <span>
                                <Button_Icon_Blue_220 
                                    disabled={currentPage === totalPagesUsers || totalPagesUsers === 0}
                                    onClick={nextPageUsers}
                                >
                                    <Icon_20><GrNext/></Icon_20>
                                </Button_Icon_Blue_220>
                            </span>
                        </Tooltip>
                    </Table_Container_Pagination>
                </>
            ):(
                <>
                    <Table_Container_Data>
                        <Text_Fade_Title_32_Black>¡No hay datos disponibles!</Text_Fade_Title_32_Black>
                    </Table_Container_Data>
                </>
            )}
        </>
    );
}