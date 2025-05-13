//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Componentes de React externos
import { Tooltip } from "@mui/material"
// Contextos
import { SelectedRowContext,ViewPasswordContext } from "../../../contexts/VariablesProvider"
import { ThemeModeContext } from "../../../contexts/ViewsProvider"
import { TextFieldsUserContext } from "../../../contexts/FormsProvider"
import { RefUsersContext } from "../../../contexts/RefsProvider"
import { SupplyTypesContext,UnitsContext } from "../../../contexts/WarehouseProvider"
import { SuppliersContext } from "../../../contexts/SuppliersProvider"
// Hooks personalizados
import { ResetTextFieldsUser } from "../../../hooks/Texts"
import { TableActionsSupplies } from "../../../hooks/Table"
//__________ICONOS__________
// Iconos de la paginación
import { GrNext,GrPrevious } from "react-icons/gr";
//__________ICONOS__________
// Estilos personalizados
import { Container_Row_90_Center } from "../../styled/Containers";
import { Table,Thead,Th,Tbody,Td } from "../../styled/Tables";
import { Button_Icon_Blue_180 } from "../../styled/Buttons";
import { Text_A_16_Center } from "../../styled/Text";
import { Icon_White_18,Icon_Image_Black_60 } from "../../styled/Icons";
import { Alert_Verification } from "../../styled/Alerts"
//____________IMPORT/EXPORT____________

// Tabla de los insumos
export default function Table_Supplies(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isViewPassword,setIsViewPassword] = useContext(ViewPasswordContext);
    const {Modal,Form,Button_Edit_U,Button_Delete_U} = useContext(RefUsersContext);
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    const [isSupplyTypes] = useContext(SupplyTypesContext);
    const [isUnits] = useContext(UnitsContext);
    const [isSuppliers] = useContext(SuppliersContext);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Supplies");
    
            const isClickInsideTable = table && table.contains(event.target);
            const isClickInsideModal = Modal?.current?.contains(event.target);
            const isClickInsideForm = Form?.current?.contains(event.target);
            const isClickInsideEdit = Button_Edit_U?.current?.contains(event.target);
            const isClickInsideDelete = Button_Delete_U?.current?.contains(event.target);
    
            if (!isClickInsideTable && !isClickInsideModal && !isClickInsideForm && !isClickInsideEdit && !isClickInsideDelete) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    },[Modal,Form,Button_Edit_U, Button_Delete_U]);
    // UseEffect para reiniciar la vista de contraseña
    useEffect(() => {
        if(isViewPassword){
            setTimeout(() => {
                const promise = new Promise(async (resolve,reject) => {
                    try{
                        setTimeout(() => {
                            resolve('¡Se ocultaron las contraseñas!...');
                            setTimeout(() => {
                                setIsViewPassword(false);
                            },500);
                        },1000);
                    }catch(error){
                        return reject('¡Ocurrio un error inesperado!...');
                    }
                });

                Alert_Verification(promise,'¡Ocultando contraseñas!...');
            },30000);            
        }
    },[isViewPassword])
    // UseEfect para pasar el valor del renglon seleccionado a los input
    useEffect(() => {
        if(isSelectedRow !== null){
            setIsTextFieldsUser(prev => ({
                ...prev,
                name: isSelectedRow.nombre,
                shortName: isSelectedRow.nombrecorto,
                user: isSelectedRow.usuario,
                password: isSelectedRow.contrasena,
                userTypes: isSelectedRow.idtipo,
            }))
        }else{
            resetTextFieldsUser();
        }
    },[isSelectedRow])
    // Constantes con la funcionalidad de los hooks
    const {handleRowClick, nextPageSupplies, prevPage, currentRecordsSupplies, currentPage, totalPagesSupplies} = TableActionsSupplies();
    const resetTextFieldsUser = ResetTextFieldsUser();
    // Estructura del componente
    return(
        <>
            <Table id="Table-Supplies">
                <Thead ThemeMode={themeMode}>
                    <tr>
                        <Th>Nombre</Th>
                        <Th>Descripción</Th>
                        <Th>Imagen</Th>
                        <Th>Tipo</Th>
                        <Th>Proveedor</Th>
                        <Th>Tipo de Medición</Th>
                    </tr>
                </Thead>
                <Tbody ThemeMode={themeMode}>
                    {currentRecordsSupplies.map((supply) => (
                        <tr 
                            key={supply.idinsumo}
                            onClick={() => handleRowClick(supply)}
                            style={{
                                backgroundColor:  isSelectedRow === supply ? 'rgba(255, 255, 255, 0.7)' : 'transparent',
                                cursor: 'pointer',
                                transition: 'background-color 0.5s ease',
                            }}
                        >
                            <Td ThemeMode={themeMode}>{supply.nombre}</Td>
                            <Td ThemeMode={themeMode}>{supply.descripcion}</Td>
                            <Td ThemeMode={themeMode}><Icon_Image_Black_60 ThemeMode={themeMode} src={supply.imagen}/></Td>
                            <Td ThemeMode={themeMode}>{isSupplyTypes.find(type => type.idtipo === supply.idtipo)?.tipo||'Desconocido'}</Td>
                            <Td ThemeMode={themeMode}>{isSuppliers.find(supplier => supplier.idproveedor === supply.idproveedor)?.nombre || 'Desconocido'}</Td>
                            <Td ThemeMode={themeMode}>
                                {(() => {
                                    const supplyType = isSupplyTypes.find(type => type.idtipo === supply.idtipo);
                                    const unit = isUnits.find(unit => unit.idmedida === supplyType?.idmedida);
                                    return unit?.medida || 'Desconocido';
                                })()}
                            </Td>
                        </tr>
                    ))}
                </Tbody>
            </Table>
            <Container_Row_90_Center>
                <Tooltip title='Página anterior' placement="top">
                    <Button_Icon_Blue_180 ThemeMode={themeMode} className={currentPage === 1 ? 'roll-out-button-left' : 'roll-in-button-left'}
                        onClick={prevPage}>
                        <Icon_White_18><GrPrevious/></Icon_White_18>
                    </Button_Icon_Blue_180>
                </Tooltip>
                <Text_A_16_Center ThemeMode={themeMode}>Página {currentPage} de {totalPagesSupplies}</Text_A_16_Center>
                <Tooltip title='Página siguiente' placement="top">
                    <Button_Icon_Blue_180 ThemeMode={themeMode} className={currentPage === totalPagesSupplies || totalPagesSupplies === 0 ? 'roll-out-button-left' : 'roll-in-button-left'}
                        onClick={nextPageSupplies}>
                        <Icon_White_18><GrNext/></Icon_White_18>
                    </Button_Icon_Blue_180>
                </Tooltip>
            </Container_Row_90_Center>
        </>
    );
}