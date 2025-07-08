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
import { Container_Modal_Background_Black,Container_Form_500,Container_Column_100_Center,Container_Row_100_Center,Container_Row_NG_Auto_Center } from "../../../styled/Containers";
import { Text_Title_32_Black,Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Span_20_Center_Black } from "../../../styled/Text";
import { Button_Icon_Blue_210 } from "../../../styled/Buttons";
import { Icon_20 } from "../../../styled/Icons";
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
                <Container_Modal_Background_Black ref={Modal_Supply_Types}>
                    <Container_Form_500 ref={Form_Supply_Types} ThemeMode={themeMode} className={currentMView === 'Tipo-Insumo-Detalles' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Row_100_Center>
                            <Text_Title_32_Black ThemeMode={themeMode}>DETALLES DE LAS CANTIDADES DISPONIBLES DEL TIPO DE INSUMO</Text_Title_32_Black>
                        </Container_Row_100_Center>
                        <Container_Row_NG_Auto_Center>
                            <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                            <Text_Span_16_Center_Black ThemeMode={themeMode}>- Datos generales...</Text_Span_16_Center_Black>
                        </Container_Row_NG_Auto_Center>
                        <Container_Column_100_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                            <Container_Row_NG_Auto_Center>
                                <Text_Color_Blue_16 ThemeMode={themeMode}>Tipo de insumo:</Text_Color_Blue_16>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}> {isTextFieldsSupplyType.tipo || 'Desconocido'}...</Text_Span_16_Center_Black>
                            </Container_Row_NG_Auto_Center>
                        </Container_Column_100_Center>
                        <Container_Row_NG_Auto_Center>
                            <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                            <Text_Span_16_Center_Black ThemeMode={themeMode}>- Datos específicos...</Text_Span_16_Center_Black>
                        </Container_Row_NG_Auto_Center>
                        <Container_Column_100_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                            <Container_Row_NG_Auto_Center>
                                <Text_Color_Blue_16 ThemeMode={themeMode}>Unidad:</Text_Color_Blue_16>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}> {isTextFieldsSupplyType.unidad || 'Desconocida'}...</Text_Span_16_Center_Black>
                            </Container_Row_NG_Auto_Center>
                            <Container_Row_NG_Auto_Center>
                                <Text_Color_Blue_16 ThemeMode={themeMode}>Cantidades:</Text_Color_Blue_16>
                            </Container_Row_NG_Auto_Center>
                            {isCountSupplyTypes.some(count => count.idtipo === isTextFieldsSupplyType.idtipo) ? (
                                isTextFieldsSupplyType.cantidades.map((count,index) => (
                                    <Container_Row_100_Center key={index}>
                                        <Text_Span_16_Center_Black ThemeMode={themeMode}>{count.cantidad}...</Text_Span_16_Center_Black>
                                    </Container_Row_100_Center>
                                ))
                            ):(
                                <>
                                    <Container_Row_100_Center>
                                        <Text_Span_20_Center_Black ThemeMode={themeMode}>No hay datos disponibles</Text_Span_20_Center_Black>
                                    </Container_Row_100_Center>
                                </>
                            )}
                        </Container_Column_100_Center>
                        <Container_Row_100_Center>
                            <Tooltip title='Cancelar' placement='top'>
                                <span>
                                    <Button_Icon_Blue_210 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalViewSuppliers('')}   
                                        disabled={isActionBlock}
                                    >
                                        <Icon_20><MdCancel/></Icon_20>
                                    </Button_Icon_Blue_210>
                                </span>
                            </Tooltip>
                        </Container_Row_100_Center>
                    </Container_Form_500>
                </Container_Modal_Background_Black>
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