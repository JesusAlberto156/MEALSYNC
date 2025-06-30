//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Componentes de React externos
import { Tooltip } from "@mui/material"
// Contextos
import { SelectedRowContext,SelectedOptionOrderDirectionContext,SelectedOptionOrderContext } from "../../../contexts/SelectedesProvider"
import { UsersContext } from "../../../contexts/UsersProvider"
import { LoggedPermissionsContext } from "../../../contexts/SessionProvider"
import { ThemeModeContext } from "../../../contexts/ViewsProvider"
import { TextFieldsPermissionsContext } from "../../../contexts/FormsProvider"
import { RefPermissionsContext } from "../../../contexts/RefsProvider"
// Hooks personalizados
import { TableActionsPermissions } from "../../../hooks/users/Tables"
import { ResetTextFieldsPermissions,ResetTextFieldsUser,ResetTextFieldsStatus } from "../../../hooks/users/Texts"
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
// Iconos utilizados en las tablas
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import { CgArrowsV } from "react-icons/cg";
// Iconos de la sección de Administración del login
import { FaShieldAlt,FaUserTie } from "react-icons/fa";
// Iconos de la paginación
import { GrNext,GrPrevious } from "react-icons/gr";
//__________ICONOS__________
// Estilos personalizados
import { Table_Container_Auto,Table,Table_Head_Thead_Blue,Table_Head_Th,Table_Container_Item_Center,Table_Body_Tbody_White,Table_Body_Td,Table_Image_Black,Table_Container_Pagination,Table_Container_Data } from "../../styled/Tables"
import { Thead,Th,Tbody,Td } from "../../styled/Tables";
import { Button_Icon_Blue_220 } from "../../styled/Buttons";
import { Text_Span_16_Center_Black,Text_Fade_Title_32_Black } from "../../styled/Text";
import { Icon_Green_14,Icon_Red_14,Icon_Button_White_16,Icon_20 } from "../../styled/Icons";
//____________IMPORT/EXPORT____________

// Tabla de los permisos de usuarios
export default function Table_Permissions(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isPermission] = useContext(LoggedPermissionsContext);
    const [isUsers] = useContext(UsersContext);
    const [isTextFieldsPermissions,setIsTextFieldsPermissions] = useContext(TextFieldsPermissionsContext);
    const {Modal_Permissions,Form_Permissions,Button_Edit_Permissions,Button_Enable_Permissions} = useContext(RefPermissionsContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Permissions");

            const isClickInsideTable = table && table.contains(event.target);
            const isClickInsideModal = Modal_Permissions?.current?.contains(event.target);
            const isClickInsideForm = Form_Permissions?.current?.contains(event.target);
            const isClickInsideEdit = Button_Edit_Permissions?.current?.contains(event.target);
            const isClickInsideEnable = Button_Enable_Permissions?.current?.contains(event.target);

            if (!isClickInsideTable && !isClickInsideModal && !isClickInsideForm && !isClickInsideEdit && !isClickInsideEnable) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    },[Modal_Permissions,Form_Permissions,Button_Edit_Permissions,Button_Enable_Permissions]);
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
    const {handleRowClick, nextPagePermissions, prevPage, currentRecordsPermissions, currentPage, totalPagesPermissions, ToggleOrder, ToggleOrderDirection} = TableActionsPermissions();
    // Estructura del componente
    return(
        <>
            <Table_Container_Auto>
                <Table id="Table-Permissions">
                    <Table_Head_Thead_Blue>
                        <tr>
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 onClick={() => {
                                            ToggleOrder('Nombre')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Nombre' ? <FaSortAlphaDown/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Nombre' ? <FaSortAlphaDownAlt/> : <CgArrowsV/>} Usuario
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 onClick={() => {
                                            ToggleOrder('Administrador')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Administrador' ? <FaLongArrowAltUp/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Administrador' ? <FaLongArrowAltDown/> : <CgArrowsV/>} Administrador
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 onClick={() => {
                                            ToggleOrder('Chef')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Chef' ? <FaLongArrowAltUp/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Chef' ? <FaLongArrowAltDown/> : <CgArrowsV/>} Chef
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 onClick={() => {
                                            ToggleOrder('Almacenista')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Almacenista' ? <FaLongArrowAltUp/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Almacenista' ? <FaLongArrowAltDown/> : <CgArrowsV/>} Almacenista
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 onClick={() => {
                                            ToggleOrder('Cocinero')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Cocinero' ? <FaLongArrowAltUp/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Cocinero' ? <FaLongArrowAltDown/> : <CgArrowsV/>} Cocinero
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 onClick={() => {
                                            ToggleOrder('Nutriologo')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Nutriologo' ? <FaLongArrowAltUp/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Nutriologo' ? <FaLongArrowAltDown/> : <CgArrowsV/>} Nutriólogo
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 onClick={() => {
                                            ToggleOrder('Medico')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Medico' ? <FaLongArrowAltUp/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Medico' ? <FaLongArrowAltDown/> : <CgArrowsV/>} Médico
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                            {isPermission.superadministrador ? (
                                <Table_Head_Th>
                                    <Table_Container_Item_Center>
                                        <Icon_Button_White_16 onClick={() => {
                                                ToggleOrder('Super-Administrador')
                                                ToggleOrderDirection()
                                            }}
                                        >
                                            {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Super-Administrador' ? <FaLongArrowAltUp/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Super-Administrador' ? <FaLongArrowAltDown/> : <CgArrowsV/>} Super Administrador
                                        </Icon_Button_White_16>
                                    </Table_Container_Item_Center>
                                </Table_Head_Th>
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
                                    backgroundColor: isSelectedRow === permission ? 'rgba(88, 88, 84, 0.8)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 1s ease',
                                }}
                            >
                                <Td ThemeMode={themeMode}>{isUsers.find(user => user.idusuario === permission.idusuario)?.nombre || 'Desconocido'}</Td>
                                <Td ThemeMode={themeMode}>{permission.administrador ? <Icon_Green_14 ThemeMode={themeMode} className="pulsate-icon"><FaShieldAlt/></Icon_Green_14>:<Icon_Red_14 ThemeMode={themeMode} className="pulsate-icon"><FaShieldAlt/></Icon_Red_14>}</Td>
                                <Td ThemeMode={themeMode}>{permission.chef ? <Icon_Green_14 ThemeMode={themeMode} className="pulsate-icon"><FaShieldAlt/></Icon_Green_14>:<Icon_Red_14 ThemeMode={themeMode} className="pulsate-icon"><FaShieldAlt/></Icon_Red_14>}</Td>
                                <Td ThemeMode={themeMode}>{permission.almacenista ? <Icon_Green_14 ThemeMode={themeMode} className="pulsate-icon"><FaShieldAlt/></Icon_Green_14>:<Icon_Red_14 ThemeMode={themeMode} className="pulsate-icon"><FaShieldAlt/></Icon_Red_14>}</Td>
                                <Td ThemeMode={themeMode}>{permission.cocinero ? <Icon_Green_14 ThemeMode={themeMode} className="pulsate-icon"><FaShieldAlt/></Icon_Green_14>:<Icon_Red_14 ThemeMode={themeMode} className="pulsate-icon"><FaShieldAlt/></Icon_Red_14>}</Td>
                                <Td ThemeMode={themeMode}>{permission.nutriologo ? <Icon_Green_14 ThemeMode={themeMode} className="pulsate-icon"><FaShieldAlt/></Icon_Green_14>:<Icon_Red_14 ThemeMode={themeMode} className="pulsate-icon"><FaShieldAlt/></Icon_Red_14>}</Td>
                                <Td ThemeMode={themeMode}>{permission.medico ? <Icon_Green_14 ThemeMode={themeMode} className="pulsate-icon"><FaShieldAlt/></Icon_Green_14>:<Icon_Red_14 ThemeMode={themeMode} className="pulsate-icon"><FaShieldAlt/></Icon_Red_14>}</Td>
                                {isPermission.superadministrador ? (
                                    <Td ThemeMode={themeMode}>{permission.superadministrador ? <Icon_Green_14 ThemeMode={themeMode} className="pulsate-icon"><FaUserTie/></Icon_Green_14>:<Icon_Red_14 ThemeMode={themeMode} className="pulsate-icon"><FaUserTie/></Icon_Red_14>}</Td>
                                ):(
                                    <></>
                                )}
                            </tr>
                        ))}
                    </Table_Body_Tbody_White>
                </Table>
            </Table_Container_Auto>
            {currentRecordsPermissions.length !== 0 ? (
                <>
                    <Table_Container_Pagination>
                        <Tooltip title='Página anterior' placement="top">
                            <span>
                                <Button_Icon_Blue_220
                                    disabled={currentPage === 1}
                                    onClick={() => prevPage}
                                >
                                    <Icon_20><GrPrevious/></Icon_20>
                                </Button_Icon_Blue_220>
                            </span>
                        </Tooltip>
                        <Text_Span_16_Center_Black>Página {currentPage} de {totalPagesPermissions}</Text_Span_16_Center_Black>
                        <Tooltip title='Página siguiente' placement="top">
                            <span>
                                <Button_Icon_Blue_220
                                    disabled={currentPage === totalPagesPermissions || totalPagesPermissions === 0}
                                    onClick={() => nextPagePermissions}
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