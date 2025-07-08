//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,ModalContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { TextFieldsObservationContext } from "../../../../contexts/FormsProvider";
import { SuppliersContext } from "../../../../contexts/SuppliersProvider";
import { RefSupplierObservationsContext } from "../../../../contexts/RefsProvider";
import { ActionBlockContext } from "../../../../contexts/VariablesProvider";
// Hooks personalizados
import { HandleModalViewSuppliers } from "../../../../hooks/suppliers/Views";
import { Dates } from "../../../../hooks/Dates";
//__________ICONOS__________
import { MdCancel } from "react-icons/md";
import { FaStar } from "react-icons/fa";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Form_500,Container_Column_100_Center,Container_Row_100_Center,Container_Row_NG_Auto_Center } from "../../../styled/Containers";
import { Text_Title_32_Black,Text_Span_16_Center_Black,Text_Color_Blue_16, Text_Span_16_Justify_Black } from "../../../styled/Text";
import { Button_Icon_Blue_210 } from "../../../styled/Buttons";
import { Icon_20,Icon_Green_30,Icon_Lime_Green_30,Icon_Yellow_30,Icon_Orange_30,Icon_Red_30,Icon_Blue_30,Icon_Black_28 } from "../../../styled/Icons";
// Componentes personalizados
import Error_View from "../../errors/View";
//____________IMPORT/EXPORT____________

// Modal para visualizar las observaciones de proveedores de su tabla
export default function Supplier_Observation_View(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isActionBlock] = useContext(ActionBlockContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isModal] = useContext(ModalContext);
    const [isTextFieldsObservation] = useContext(TextFieldsObservationContext);
    const {Modal_Supplier_Observations,Form_Supplier_Observations,Button_Detail_Supplier_Observations} = useContext(RefSupplierObservationsContext);
    const [isSuppliers] = useContext(SuppliersContext);
    // Constantes con la funcionalidad de los hooks
    const handleModalViewSuppliers = HandleModalViewSuppliers();
    const { getDate } = Dates();
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <Container_Modal_Background_Black ref={Modal_Supplier_Observations}>
                    <Container_Form_500 ref={Form_Supplier_Observations} ThemeMode={themeMode} className={currentMView === 'Observacion-Detalles' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Row_100_Center>
                            <Text_Title_32_Black ThemeMode={themeMode}>DETALLES DE LA OBSERVACIÓN</Text_Title_32_Black>
                        </Container_Row_100_Center>
                        <Container_Row_NG_Auto_Center>
                            <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                            <Text_Span_16_Center_Black ThemeMode={themeMode}>- Datos generales...</Text_Span_16_Center_Black>
                        </Container_Row_NG_Auto_Center>
                        <Container_Column_100_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                            <Container_Row_NG_Auto_Center>
                                <Text_Color_Blue_16 ThemeMode={themeMode}>Proveedor</Text_Color_Blue_16>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}>- {isSuppliers.find(supplier => supplier.idproveedor === isTextFieldsObservation.idproveedor)?.nombre || 'Desconocido'}...</Text_Span_16_Center_Black>
                            </Container_Row_NG_Auto_Center>
                            <Container_Row_NG_Auto_Center>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}>{getDate(isTextFieldsObservation.fecha)}</Text_Span_16_Center_Black>
                            </Container_Row_NG_Auto_Center>
                            <Container_Row_100_Center>
                                {isTextFieldsObservation.calificacion === 0 ? (
                                    <>
                                        <Icon_Blue_30 ThemeMode={themeMode} className='pulsate-icon-fwd-0'><FaStar/></Icon_Blue_30>
                                        <Icon_Blue_30 ThemeMode={themeMode} className='pulsate-icon-fwd-1'><FaStar/></Icon_Blue_30>
                                        <Icon_Blue_30 ThemeMode={themeMode} className='pulsate-icon-fwd-2'><FaStar/></Icon_Blue_30>
                                        <Icon_Black_28 ThemeMode={themeMode} className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_28>
                                        <Icon_Black_28 ThemeMode={themeMode} className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                    </>
                                ):(
                                    isTextFieldsObservation.calificacion <= 1 ? (
                                        <>
                                            <Icon_Red_30 ThemeMode={themeMode} className='pulsate-icon-fwd-0'><FaStar/></Icon_Red_30>
                                            <Icon_Black_28 ThemeMode={themeMode} className='pulsate-icon-fwd-1'><FaStar/></Icon_Black_28>
                                            <Icon_Black_28 ThemeMode={themeMode} className='pulsate-icon-fwd-2'><FaStar/></Icon_Black_28>
                                            <Icon_Black_28 ThemeMode={themeMode} className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_28>
                                            <Icon_Black_28 ThemeMode={themeMode} className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                        </>
                                    ):(
                                        isTextFieldsObservation.calificacion <=2 ? (
                                            <>
                                                <Icon_Orange_30 ThemeMode={themeMode} className='pulsate-icon-fwd-0'><FaStar/></Icon_Orange_30>
                                                <Icon_Orange_30 ThemeMode={themeMode} className='pulsate-icon-fwd-1'><FaStar/></Icon_Orange_30>
                                                <Icon_Black_28 ThemeMode={themeMode} className='pulsate-icon-fwd-2'><FaStar/></Icon_Black_28>
                                                <Icon_Black_28 ThemeMode={themeMode} className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_28>
                                                <Icon_Black_28 ThemeMode={themeMode} className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                            </>
                                        ):(
                                            isTextFieldsObservation.calificacion <=3 ? (
                                                <>
                                                    <Icon_Yellow_30 ThemeMode={themeMode} className='pulsate-icon-fwd-0'><FaStar/></Icon_Yellow_30>
                                                    <Icon_Yellow_30 ThemeMode={themeMode} className='pulsate-icon-fwd-1'><FaStar/></Icon_Yellow_30>
                                                    <Icon_Yellow_30 ThemeMode={themeMode} className='pulsate-icon-fwd-2'><FaStar/></Icon_Yellow_30>
                                                    <Icon_Black_28 ThemeMode={themeMode} className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_28>
                                                    <Icon_Black_28 ThemeMode={themeMode} className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                                </>
                                            ):(
                                                isTextFieldsObservation.calificacion <=4 ? (
                                                    <>
                                                        <Icon_Lime_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-0'><FaStar/></Icon_Lime_Green_30>
                                                        <Icon_Lime_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-1'><FaStar/></Icon_Lime_Green_30>
                                                        <Icon_Lime_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-2'><FaStar/></Icon_Lime_Green_30>
                                                        <Icon_Lime_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-3'><FaStar/></Icon_Lime_Green_30>
                                                        <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_White_30>
                                                    </>
                                                ):(
                                                    isTextFieldsObservation.calificacion <=5 ? (
                                                        <>
                                                            <Icon_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-0'><FaStar/></Icon_Green_30>
                                                            <Icon_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-1'><FaStar/></Icon_Green_30>
                                                            <Icon_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-2'><FaStar/></Icon_Green_30>
                                                            <Icon_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-3'><FaStar/></Icon_Green_30>
                                                            <Icon_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-4'><FaStar/></Icon_Green_30>
                                                        </>
                                                    ):(
                                                        <></>
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )}
                            </Container_Row_100_Center>
                        </Container_Column_100_Center>
                        <Container_Row_NG_Auto_Center>
                            <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                            <Text_Span_16_Center_Black ThemeMode={themeMode}>- Datos especificos...</Text_Span_16_Center_Black>
                        </Container_Row_NG_Auto_Center>
                        <Container_Row_100_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                            <Text_Span_16_Justify_Black ThemeMode={themeMode}>{isTextFieldsObservation.observacion}</Text_Span_16_Justify_Black>
                        </Container_Row_100_Center>
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
                currentMView === 'Observacion-Detalles' ? (
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