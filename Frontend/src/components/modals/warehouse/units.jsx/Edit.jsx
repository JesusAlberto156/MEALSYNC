//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { SocketContext } from "../../../../contexts/SocketProvider";
import { ModalContext,ThemeModeContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { TextFieldsUnitsContext } from "../../../../contexts/FormsProvider";
import { ActionBlockContext } from "../../../../contexts/VariablesProvider";
import { SelectedRow2Context } from "../../../../contexts/SelectedesProvider";
import { UnitEditContext } from "../../../../contexts/WarehouseProvider";
// Hooks personalizados
import { HandleModalView } from "../../../../hooks/Views";
import { HandleUnitEdit } from "../../../../hooks/Form";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { MdEdit } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Row_100_Center,Container_Column_100_Center,Container_Row_100_Center,Container_Row_NG_Auto_Center } from "../../../styled/Containers";
import { Text_Title_32_Black,Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Span_12_Justify_Black } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Red_210 } from "../../../styled/Buttons";
import { Icon_20 } from "../../../styled/Icons";
import { Input_Radio_20,Input_Text_100_Black } from "../../../styled/Inputs";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
import { Label_Button_16_Black } from "../../../styled/Labels";
// Componentes personalizados
import Error_Edit from "../../errors/Edit";
//____________IMPORT/EXPORT____________

// Modal para editar mediciones
export default function Unit_Edit(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isTextFieldsUnits,setIsTextFieldsUnits] = useContext(TextFieldsUnitsContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isUnitEdit,setIsUnitEdit] = useContext(UnitEditContext);
    const [isSelectedRow2,setIsSelectedRow2] = useContext(SelectedRow2Context);
    const [socket] = useContext(SocketContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const handleUnitEdit = HandleUnitEdit();
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isUnitEdit){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Unit-Update',isTextFieldsUnits.idextent,isTextFieldsUnits.extent.trim(),isTextFieldsUnits.unit,parseFloat(isTextFieldsUnits.amount));
                        
                        if(isSelectedRow2.medida !== isTextFieldsUnits.extent || isSelectedRow2.unidad !== isTextFieldsUnits.unit){
                            socket.emit('Units-Update',isSelectedRow2.medida,isTextFieldsUnits.extent.trim(),isTextFieldsUnits.unit);
                        }
                        
                        resolve('¡MEALSYNC actualizo la medida!...');

                        const route = sessionStorage.getItem('Route');

                        setCurrentMView('');
                        sessionStorage.setItem('Modal-View','');
                        setTimeout(() => {
                            setIsModal(false);
                            sessionStorage.setItem('Modal',false);
                            setIsSelectedRow2(null);
                            setIsActionBlock(false);
                            setIsUnitEdit(false);
                            navigate(route,{ replace: true });
                        },750);
                    },2000);
                }catch(e){
                    setIsActionBlock(false);
                    setIsUnitEdit(false);
                    return reject('¡Ocurrio un error inesperado actualizando la medida!...');
                }
            });

            Alert_Sonner_Promise(promise,'actualizando una medida!...');
        }
    },[isUnitEdit]);
    // UseEffect para quitar la suscrpcion de socket
    useEffect(() => {
        const handleUnitUpdate = (message,user) => {
            console.log(message,user);
            socket.emit('Units');
        };

        const handleUnitsUpdate = (message,user) => {
            console.log(message,user);
            socket.emit('Units');
        };

        socket.on('Unit-Update',handleUnitUpdate);
        socket.on('Units-Update',handleUnitsUpdate);
        
        return () => {
            socket.off('Unit-Update',handleUnitUpdate);
            socket.off('Units-Update',handleUnitsUpdate);
        }
    },[socket])
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow2 !== null ? (
                <>
                    <Container_Modal>
                        <Container_Form_500 ThemeMode={themeMode} className={currentMView === 'Unit-Edit' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Row_100_Center>
                                <Text_Title_32_Black ThemeMode={themeMode}>EDITAR MEDIDA</Text_Title_32_Black>
                            </Container_Row_100_Center>
                            <Container_Row_NG_Auto_Center>
                                <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}>- Datos generales...</Text_Span_16_Center_Black>
                            </Container_Row_NG_Auto_Center>
                            <Container_Column_100_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Container_Row_100_Center>
                                    <Text_Span_16_Center_Black ThemeMode={themeMode}>Nombre:</Text_Span_16_Center_Black>
                                    <Input_Text_100_Black ThemeMode={themeMode}
                                        placeholder="..."
                                        type="text"
                                        value={isTextFieldsUnits.extent}
                                        onChange={(e) => setIsTextFieldsUnits(prev => ({...prev, extent: e.target.value}))}
                                    />
                                </Container_Row_100_Center>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black ThemeMode={themeMode}>- Unidad...</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_100_Center>
                                    {['Kilogramos','Litros'].map((item,index) => (
                                        <Label_Button_16_Black ThemeMode={themeMode} key={index}>
                                            <Input_Radio_20 ThemeMode={themeMode}
                                                type="radio"
                                                name="group"
                                                value={item}
                                                checked={isTextFieldsUnits.unit === item}
                                                onChange={(e) => setIsTextFieldsUnits(prev => ({...prev, unit: e.target.value}))}
                                            />
                                            {item}
                                        </Label_Button_16_Black>
                                    ))};
                                </Container_Row_100_Center>
                            </Container_Column_100_Center>
                            <Container_Row_100_Center>
                                <Text_Span_12_Justify_Black ThemeMode={themeMode}>Si editas los datos generales, se modificarán para todas las medidas que compartan el mismo nombre, incluso si cambias el nombre en una de ellas.</Text_Span_12_Justify_Black>
                            </Container_Row_100_Center>
                            <Container_Row_NG_Auto_Center>
                                <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}>- Datos especificos...</Text_Span_16_Center_Black>
                            </Container_Row_NG_Auto_Center>
                            <Container_Column_100_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Container_Row_100_Center>
                                    <Text_Span_16_Center_Black ThemeMode={themeMode}>Cantidad:</Text_Span_16_Center_Black>
                                    <Input_Text_100_Black ThemeMode={themeMode}
                                        placeholder="..."
                                        type="text"
                                        value={isTextFieldsUnits.amount}
                                        onChange={(e) => setIsTextFieldsUnits(prev => ({...prev, amount: e.target.value}))}
                                    />
                                </Container_Row_100_Center>
                            </Container_Column_100_Center>
                            <Container_Row_100_Center>
                                <Tooltip title='Cancelar' placement='top'>
                                    <Button_Icon_Red_210 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalView('')}>
                                        <Icon_20><MdCancel/></Icon_20>
                                    </Button_Icon_Red_210>
                                </Tooltip>
                                <Tooltip title='Agregar' placement='top'>
                                    <Button_Icon_Blue_210 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                        onClick={() => handleUnitEdit()}>
                                        <Icon_20><MdEdit/></Icon_20>
                                    </Button_Icon_Blue_210>
                                </Tooltip>
                            </Container_Row_100_Center>
                        </Container_Form_500>
                    </Container_Modal>
                </>
            ):(
                currentMView === 'Unit-Edit' ? (
                    <>
                        <Error_Edit/>
                    </>
                ):(
                    <></>
                )
            )}
        </>
    );
}