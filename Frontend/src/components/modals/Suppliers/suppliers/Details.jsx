//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,ModalContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { TextFieldsSupplierContext } from "../../../../contexts/FormsProvider";
import { RefSuppliersContext } from "../../../../contexts/RefsProvider";
// Hooks personalizados
import { HandleModalView } from "../../../../hooks/Views";
//__________ICONOS__________
import { MdCancel } from "react-icons/md";
import { FaStar } from "react-icons/fa";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Column_90_Center,Container_Row_100_Center,Container_Row_NG_95_Left,Container_Row_95_Center } from "../../../styled/Containers";
import { Text_Title_30_Center,Text_A_16_Left,Text_Blue_16_Left } from "../../../styled/Text";
import { Button_Icon_Blue_210 } from "../../../styled/Buttons";
import { Input_Text_White_100 } from "../../../styled/Inputs";
import { Icon_White_22,Icon_Green_30,Icon_Lime_Green_30,Icon_Yellow_30,Icon_Orange_30,Icon_Red_30,Icon_Blue_30,Icon_Black_White_30 } from "../../../styled/Icons";
// Componentes personalizados
import Error_View from "../../errors/View";
//____________IMPORT/EXPORT____________

export default function Suppliers_Details(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isModal] = useContext(ModalContext);
    const [isTextFieldsSupplier] = useContext(TextFieldsSupplierContext);
    const {Modal,Form,Button_Edit_S,Button_Delete_S,Button_Details_S} = useContext(RefSuppliersContext);
    // Constantes con la funcionalidad de los hooks
    const handleModalView = HandleModalView();
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <Container_Modal ref={Modal}>
                    <Container_Form_500 ref={Form} ThemeMode={themeMode} className={currentMView === 'Supplier-Details' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Text_Title_30_Center ThemeMode={themeMode}>DETALLES DEL PROVEEDOR</Text_Title_30_Center>
                        <Container_Row_NG_95_Left>
                            <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                            <Text_A_16_Left ThemeMode={themeMode}>Datos del proveedor...</Text_A_16_Left>
                        </Container_Row_NG_95_Left>
                        <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                            <Container_Row_100_Center>
                                <Text_A_16_Left ThemeMode={themeMode}>Nombre:</Text_A_16_Left>
                                <Input_Text_White_100 ThemeMode={themeMode}
                                    id="Input-Name"
                                    defaultValue={isTextFieldsSupplier.name}
                                    disabled
                                />
                            </Container_Row_100_Center>
                            <Container_Row_100_Center>
                                <Text_A_16_Left ThemeMode={themeMode}>RFC:</Text_A_16_Left>
                                <Input_Text_White_100 ThemeMode={themeMode}
                                    id="Input-Rfc"
                                    defaultValue={isTextFieldsSupplier.rfc}
                                    disabled
                                />
                            </Container_Row_100_Center>
                            <Container_Row_100_Center>
                                <Text_A_16_Left ThemeMode={themeMode}>Domicilio:</Text_A_16_Left>
                                <Input_Text_White_100 ThemeMode={themeMode}
                                    id="Input-Address"
                                    defaultValue={isTextFieldsSupplier.address}
                                    disabled
                                />
                            </Container_Row_100_Center>
                            <Container_Row_100_Center>
                                <Text_A_16_Left ThemeMode={themeMode}>Teléfono:</Text_A_16_Left>
                                <Input_Text_White_100 ThemeMode={themeMode}
                                    id="Input-Phone"
                                    defaultValue={isTextFieldsSupplier.phone}
                                    disabled
                                />
                            </Container_Row_100_Center>
                            <Container_Row_100_Center>
                                <Text_A_16_Left ThemeMode={themeMode}>Correo:</Text_A_16_Left>
                                <Input_Text_White_100 ThemeMode={themeMode}
                                    id="Input-Email"
                                    defaultValue={isTextFieldsSupplier.email}
                                    disabled
                                />
                            </Container_Row_100_Center>
                        </Container_Column_90_Center>
                        <Container_Row_95_Center>
                            {isSelectedRow.calificacion <= 1 ? (
                                <>
                                    <Icon_Red_30 ThemeMode={themeMode} className='pulsate-icon-fwd-0'><FaStar/></Icon_Red_30>
                                    <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-1'><FaStar/></Icon_Black_White_30>
                                    <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-2'><FaStar/></Icon_Black_White_30>
                                    <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_White_30>
                                    <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_White_30>
                                </>
                            ):(
                                isSelectedRow.calificacion <=2 ? (
                                    <>
                                        <Icon_Orange_30 ThemeMode={themeMode} className='pulsate-icon-fwd-0'><FaStar/></Icon_Orange_30>
                                        <Icon_Orange_30 ThemeMode={themeMode} className='pulsate-icon-fwd-1'><FaStar/></Icon_Orange_30>
                                        <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-2'><FaStar/></Icon_Black_White_30>
                                        <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_White_30>
                                        <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_White_30>
                                    </>
                                ):(
                                    isSelectedRow.calificacion <=3 ? (
                                        isSelectedRow.calificacion === 3 && isSelectedRow.cantidad === 0 ? (
                                            <>
                                                <Icon_Blue_30 ThemeMode={themeMode} className='pulsate-icon-fwd-0'><FaStar/></Icon_Blue_30>
                                                <Icon_Blue_30 ThemeMode={themeMode} className='pulsate-icon-fwd-1'><FaStar/></Icon_Blue_30>
                                                <Icon_Blue_30 ThemeMode={themeMode} className='pulsate-icon-fwd-2'><FaStar/></Icon_Blue_30>
                                                <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_White_30>
                                                <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_White_30>
                                            </>
                                        ):(
                                            <>
                                                <Icon_Yellow_30 ThemeMode={themeMode} className='pulsate-icon-fwd-0'><FaStar/></Icon_Yellow_30>
                                                <Icon_Yellow_30 ThemeMode={themeMode} className='pulsate-icon-fwd-1'><FaStar/></Icon_Yellow_30>
                                                <Icon_Yellow_30 ThemeMode={themeMode} className='pulsate-icon-fwd-2'><FaStar/></Icon_Yellow_30>
                                                <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_White_30>
                                                <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_White_30>
                                            </>
                                        )
                                    ):(
                                        isSelectedRow.calificacion <=4 ? (
                                            <>
                                                <Icon_Lime_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-0'><FaStar/></Icon_Lime_Green_30>
                                                <Icon_Lime_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-1'><FaStar/></Icon_Lime_Green_30>
                                                <Icon_Lime_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-2'><FaStar/></Icon_Lime_Green_30>
                                                <Icon_Lime_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-3'><FaStar/></Icon_Lime_Green_30>
                                                <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_White_30>
                                            </>
                                        ):(
                                            isSelectedRow.calificacion <=5 ? (
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
                            )}
                        </Container_Row_95_Center>
                        <Container_Row_95_Center>
                            <Tooltip title='Cancelar' placement='top'>
                                <Button_Icon_Blue_210 ThemeMode={themeMode} className='pulsate-buttom'
                                    onClick={() => handleModalView('')}>
                                    <Icon_White_22><MdCancel/></Icon_White_22>
                                </Button_Icon_Blue_210>
                            </Tooltip>
                        </Container_Row_95_Center>
                    </Container_Form_500>
                </Container_Modal>
            ):(
                currentMView === 'Supplier-Details' ? (
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