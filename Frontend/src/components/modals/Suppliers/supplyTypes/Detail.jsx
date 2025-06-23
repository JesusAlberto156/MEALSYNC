//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,ModalContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { TextFieldsSupplyTypesContext } from "../../../../contexts/FormsProvider";
import { RefSupplyTypesContext } from "../../../../contexts/RefsProvider";
import { ActionBlockContext } from "../../../../contexts/VariablesProvider";
import { CountSupplyTypesContext } from "../../../../contexts/SuppliersProvider";
// Hooks personalizados
import { HandleModalViewSuppliers } from "../../../../hooks/suppliers/Views";
//__________ICONOS__________
import { MdCancel } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Column_90_Center,Container_Row_100_Center,Container_Row_95_Center,Container_Row_NG_95_Center, Container_Row_90_Center } from "../../../styled/Containers";
import { Text_Title_30_Center,Text_A_16_Center,Text_Blue_16_Center,Text_A_20_Center } from "../../../styled/Text";
import { Button_Icon_Blue_210 } from "../../../styled/Buttons";
import { Icon_White_22 } from "../../../styled/Icons";
// Componentes personalizados
import Error_View from "../../errors/View";
//____________IMPORT/EXPORT____________

// Modal para visualizar las cantidades disponibles de los tipos de insumo de su tabla
export default function Supply_Type_Details(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isActionBlock] = useContext(ActionBlockContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isModal] = useContext(ModalContext);
    const [isCountSupplyTypes] = useContext(CountSupplyTypesContext);
    const [isTextFieldsSupplyType] = useContext(TextFieldsSupplyTypesContext);
    const {Modal_Supply_Types,Form_Supply_Types,Button_Edit_Supply_Types,Button_Add_Supply_Types,Button_Delete_Supply_Types,Button_Count_Supply_Types} = useContext(RefSupplyTypesContext);
    // Constantes con la funcionalidad de los hooks
    const handleModalViewSuppliers = HandleModalViewSuppliers();
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <Container_Modal ref={Modal_Supply_Types}>
                    <Container_Form_500 ref={Form_Supply_Types} ThemeMode={themeMode} className={currentMView === 'Tipo-Insumo-Detalles' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Row_100_Center>
                            <Text_Title_30_Center ThemeMode={themeMode}>DETALLES DE LAS CANTIDADES DISPONIBLES DEL TIPO DE INSUMO</Text_Title_30_Center>
                        </Container_Row_100_Center>
                        <Container_Row_NG_95_Center>
                            <Text_Blue_16_Center ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Center>
                            <Text_A_16_Center ThemeMode={themeMode}>- Datos generales...</Text_A_16_Center>
                        </Container_Row_NG_95_Center>
                        <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                            <Container_Row_NG_95_Center>
                                <Text_Blue_16_Center ThemeMode={themeMode}>Tipo de insumo:</Text_Blue_16_Center>
                                <Text_A_16_Center ThemeMode={themeMode}> {isTextFieldsSupplyType.tipo || 'Desconocido'}...</Text_A_16_Center>
                            </Container_Row_NG_95_Center>
                        </Container_Column_90_Center>
                        <Container_Row_NG_95_Center>
                            <Text_Blue_16_Center ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Center>
                            <Text_A_16_Center ThemeMode={themeMode}>- Datos específicos...</Text_A_16_Center>
                        </Container_Row_NG_95_Center>
                        <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                            <Container_Row_NG_95_Center>
                                <Text_Blue_16_Center ThemeMode={themeMode}>Unidad:</Text_Blue_16_Center>
                                <Text_A_16_Center ThemeMode={themeMode}> {isTextFieldsSupplyType.unidad || 'Desconocida'}...</Text_A_16_Center>
                            </Container_Row_NG_95_Center>
                            <Container_Row_NG_95_Center>
                                <Text_Blue_16_Center ThemeMode={themeMode}>Cantidades:</Text_Blue_16_Center>
                            </Container_Row_NG_95_Center>
                            {isCountSupplyTypes.some(count => count.idtipo === isTextFieldsSupplyType.idtipo) ? (
                                isTextFieldsSupplyType.cantidades.map((count,index) => (
                                    <Container_Row_90_Center key={index}>
                                        <Text_A_16_Center ThemeMode={themeMode}>{count.cantidad}...</Text_A_16_Center>
                                    </Container_Row_90_Center>
                                ))
                            ):(
                                <>
                                    <Container_Row_100_Center>
                                        <Text_A_20_Center ThemeMode={themeMode}>No hay datos disponibles</Text_A_20_Center>
                                    </Container_Row_100_Center>
                                </>
                            )}
                        </Container_Column_90_Center>
                        <Container_Row_95_Center>
                            <Tooltip title='Cancelar' placement='top'>
                                <span>
                                    <Button_Icon_Blue_210 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalViewSuppliers('')}   
                                        disabled={isActionBlock}
                                    >
                                        <Icon_White_22><MdCancel/></Icon_White_22>
                                    </Button_Icon_Blue_210>
                                </span>
                            </Tooltip>
                        </Container_Row_95_Center>
                    </Container_Form_500>
                </Container_Modal>
            ):(
                currentMView === 'Tipo-Insumo-Detalles' ? (
                    <>
                        <Error_View/>
                    </>
                ):(
                    <></>
                )
            )}
        </>
    );
}