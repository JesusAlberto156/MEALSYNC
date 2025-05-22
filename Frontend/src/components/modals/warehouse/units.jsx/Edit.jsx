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
import { ActionBlockContext,SelectedRow2Context } from "../../../../contexts/VariablesProvider";
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
import { Container_Modal,Container_Form_500,Container_Row_100_Center,Container_Column_90_Center,Container_Row_95_Center,Container_Row_NG_95_Center } from "../../../styled/Containers";
import { Text_Title_30_Center,Text_A_16_Left,Text_Blue_16_Left } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Red_210 } from "../../../styled/Buttons";
import { Icon_White_22 } from "../../../styled/Icons";
import { Input_Radio_16,Input_Text_Black_100 } from "../../../styled/Inputs";
import { Alert_Verification } from "../../../styled/Alerts";
import { Label_Text_16_Center } from "../../../styled/Labels";
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
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Unit-Update',isTextFieldsUnits.idextent,isTextFieldsUnits.extent,isTextFieldsUnits.unit,isTextFieldsUnits.amount);
                        
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
                }catch(error){
                    setIsActionBlock(false);
                    setIsUnitEdit(false);
                    return reject('¡Ocurrio un error inesperado actualizando la medida!...');
                }
            });

            Alert_Verification(promise,'actualizando una medida!...');
        }
    },[isUnitEdit]);
    // UseEffect para quitar la suscrpcion de socket
    useEffect(() => {
        const handleUnitUpdate = (message,user) => {
            console.log(message,user);
            socket.emit('Units');
        };

        socket.on('Unit-Update',handleUnitUpdate);
        
        return () => {
            socket.off('Unit-Update',handleUnitUpdate);
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
                                <Text_Title_30_Center ThemeMode={themeMode}>EDITAR MEDIDA</Text_Title_30_Center>
                            </Container_Row_100_Center>
                            <Container_Row_NG_95_Center>
                                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                <Text_A_16_Left ThemeMode={themeMode}>- Nombre...</Text_A_16_Left>
                            </Container_Row_NG_95_Center>
                            <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Container_Row_100_Center>
                                    <Text_A_16_Left ThemeMode={themeMode}>Nombre de la medición:</Text_A_16_Left>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        placeholder="..."
                                        type="text"
                                        value={isTextFieldsUnits.extent}
                                        onChange={(e) => setIsTextFieldsUnits(prev => ({...prev, extent: e.target.value}))}
                                    />
                                </Container_Row_100_Center>
                            </Container_Column_90_Center>
                            <Container_Row_NG_95_Center>
                                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                <Text_A_16_Left ThemeMode={themeMode}>- Unidad...</Text_A_16_Left>
                            </Container_Row_NG_95_Center>
                            <Container_Row_95_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                {['Kilogramos','Litros'].map((item,index) => (
                                    <Label_Text_16_Center ThemeMode={themeMode} key={index}>
                                        <Input_Radio_16 ThemeMode={themeMode}
                                            type="radio"
                                            name="group"
                                            value={item}
                                            checked={isTextFieldsUnits.unit === item}
                                            onChange={(e) => setIsTextFieldsUnits(prev => ({...prev, unit: e.target.value}))}
                                        />
                                        {item}
                                    </Label_Text_16_Center>
                                ))};
                            </Container_Row_95_Center>
                            <Container_Row_NG_95_Center>
                                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                <Text_A_16_Left ThemeMode={themeMode}>- Cantidad...</Text_A_16_Left>
                            </Container_Row_NG_95_Center>
                            <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Container_Row_100_Center>
                                    <Text_A_16_Left ThemeMode={themeMode}>Cantidad de la medición:</Text_A_16_Left>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        placeholder="..."
                                        type="number"
                                        value={isTextFieldsUnits.amount}
                                        onChange={(e) => setIsTextFieldsUnits(prev => ({...prev, amount: e.target.value}))}
                                    />
                                </Container_Row_100_Center>
                            </Container_Column_90_Center>
                            <Container_Row_95_Center>
                                <Tooltip title='Cancelar' placement='top'>
                                    <Button_Icon_Red_210 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalView('')}>
                                        <Icon_White_22><MdCancel/></Icon_White_22>
                                    </Button_Icon_Red_210>
                                </Tooltip>
                                <Tooltip title='Agregar' placement='top'>
                                    <Button_Icon_Blue_210 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                        onClick={() => handleUnitEdit()}>
                                        <Icon_White_22><MdEdit/></Icon_White_22>
                                    </Button_Icon_Blue_210>
                                </Tooltip>
                            </Container_Row_95_Center>
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