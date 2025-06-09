//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,ModalContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { ActionBlockContext } from "../../../../contexts/VariablesProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { TextFieldsSupplierContext } from "../../../../contexts/FormsProvider";
import { SupplierEditContext } from "../../../../contexts/SuppliersProvider";
import { RefSuppliersContext } from "../../../../contexts/RefsProvider";
import { SocketContext,LogAddContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleModalView } from "../../../../hooks/Views";
import { HandleSupplierEdit } from "../../../../hooks/Form";
//__________ICONOS__________
import { MdCancel } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaStar } from "react-icons/fa";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Column_90_Center,Container_Row_100_Center,Container_Row_95_Center,Container_Row_NG_95_Center } from "../../../styled/Containers";
import { Text_Title_30_Center,Text_A_16_Center,Text_Blue_16_Center } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Red_210 } from "../../../styled/Buttons";
import { Input_Text_Black_100 } from "../../../styled/Inputs";
import { Icon_White_22,Icon_Button_Blue_18,Icon_Green_30,Icon_Lime_Green_30,Icon_Yellow_30,Icon_Orange_30,Icon_Red_30,Icon_Blue_30,Icon_Black_White_30 } from "../../../styled/Icons";
import { Alert_Verification } from "../../../styled/Alerts";
// Componentes personalizados
import Error_Edit from "../../errors/Edit";
//____________IMPORT/EXPORT____________

export default function Suppliers_Edit(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSupplierEdit,setIsSupplierEdit] = useContext(SupplierEditContext);
    const [isTextFieldsSupplier,setIsTextFieldsSupplier] = useContext(TextFieldsSupplierContext);
    const {Modal_Suppliers,Form_Suppliers,Button_Edit_Suppliers,Button_Delete_Suppliers} = useContext(RefSuppliersContext);
    const [socket] = useContext(SocketContext);
    const [isLogAdd,setIsLogAdd] = useContext(LogAddContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const handleSupplierEdit = HandleSupplierEdit();
    // Función para obtener la hora exacta del sistema
    function getLocalDateTimeOffset(hoursOffset = -7) {
        const now = new Date();
        now.setHours(now.getHours() + hoursOffset); // Restar 7 horas
        const pad = (n) => n.toString().padStart(2, '0');
        const year = now.getFullYear();
        const month = pad(now.getMonth() + 1);
        const day = pad(now.getDate());
        const hours = pad(now.getHours());
        const minutes = pad(now.getMinutes());
        const seconds = pad(now.getSeconds());
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isSupplierEdit){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Update-Supplier',isLoggedUser.usuario,isTextFieldsSupplier.idproveedor,isTextFieldsSupplier.nombre.trim(),isTextFieldsSupplier.rfc.trim(),isTextFieldsSupplier.domicilio.trim(),isTextFieldsSupplier.telefono.trim(),isTextFieldsSupplier.correo.trim())

                        resolve('¡MEALSYNC editó al proveedor!...');

                        setIsSupplierEdit(false);
                        setIsLogAdd(true);
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    setIsSupplierEdit(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'Editando un proveedor!...');
        }
        if(isLogAdd){
            socket.emit('Insert-Log-Supplier',isLoggedUser.usuario,getLocalDateTimeOffset(),'UPDATE',isTextFieldsSupplier.idproveedor,isLoggedUser.idusuario,isTextFieldsSupplier.nombre.trim(),isTextFieldsSupplier.rfc.trim(),isTextFieldsSupplier.domicilio.trim(),isTextFieldsSupplier.telefono.trim(),isTextFieldsSupplier.correo.trim());
            setIsLogAdd(false);

            const route = sessionStorage.getItem('Ruta');

            setCurrentMView('');
            sessionStorage.setItem('Vista del Modal','');
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Estado del Modal',false);
                setIsActionBlock(false);
                setIsSelectedRow(null);
                navigate(route,{ replace: true });
            },750);
        }
    },[isSupplierEdit,isLogAdd]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <Container_Modal ref={Modal_Suppliers}>
                    <Container_Form_500 ref={Form_Suppliers} ThemeMode={themeMode} className={currentMView === 'Proveedor-Editar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Row_100_Center>
                            <Text_Title_30_Center ThemeMode={themeMode}>EDITAR PROVEEDOR</Text_Title_30_Center>
                        </Container_Row_100_Center>
                        <Container_Row_NG_95_Center>
                            <Text_Blue_16_Center ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Center>
                            <Text_A_16_Center ThemeMode={themeMode}>- Datos generales...</Text_A_16_Center>
                        </Container_Row_NG_95_Center>
                        <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                            <Container_Row_100_Center>
                                <Text_A_16_Center ThemeMode={themeMode}>Nombre:</Text_A_16_Center>
                                <Input_Text_Black_100 ThemeMode={themeMode}
                                    id="Input-Name"
                                    placeholder="..."
                                    type="text"
                                    disabled={isActionBlock}
                                    value={isTextFieldsSupplier.nombre}
                                    onChange={(e) => setIsTextFieldsSupplier(prev => ({...prev, nombre: e.target.value}))}
                                />
                                <Icon_Button_Blue_18 ThemeMode={themeMode} className="pulsate-buttom"
                                    onClick={() => {
                                        setIsTextFieldsSupplier(prev => ({...prev, nombre: ''}))
                                    }}
                                    disabled={isActionBlock}
                                >
                                    <MdCancel/>
                                </Icon_Button_Blue_18>
                            </Container_Row_100_Center>
                            <Container_Row_100_Center>
                                <Text_A_16_Center ThemeMode={themeMode}>RFC:</Text_A_16_Center>
                                <Input_Text_Black_100 ThemeMode={themeMode}
                                    id="Input-Rfc"
                                    placeholder="..."
                                    type="text"
                                    disabled={isActionBlock}
                                    value={isTextFieldsSupplier.rfc}
                                    onChange={(e) => setIsTextFieldsSupplier(prev => ({...prev, rfc: e.target.value}))}
                                />
                            </Container_Row_100_Center>
                            <Container_Row_100_Center>
                                <Text_A_16_Center ThemeMode={themeMode}>Domicilio:</Text_A_16_Center>
                                <Input_Text_Black_100 ThemeMode={themeMode}
                                    id="Input-Address"
                                    placeholder="..."
                                    type="text"
                                    disabled={isActionBlock}
                                    value={isTextFieldsSupplier.domicilio}
                                    onChange={(e) => setIsTextFieldsSupplier(prev => ({...prev, domicilio: e.target.value}))}
                                />
                                <Icon_Button_Blue_18 ThemeMode={themeMode} className="pulsate-buttom"
                                    onClick={() => {
                                        setIsTextFieldsSupplier(prev => ({...prev, domicilio: ''}))
                                    }}
                                    disabled={isActionBlock}
                                >
                                    <MdCancel/>
                                </Icon_Button_Blue_18>
                            </Container_Row_100_Center>
                            <Container_Row_100_Center>
                                <Text_A_16_Center ThemeMode={themeMode}>Teléfono:</Text_A_16_Center>
                                <Input_Text_Black_100 ThemeMode={themeMode}
                                    id="Input-Phone"
                                    placeholder="..."
                                    type="text"
                                    disabled={isActionBlock}
                                    value={isTextFieldsSupplier.telefono}
                                    onChange={(e) => setIsTextFieldsSupplier(prev => ({...prev, telefono: e.target.value}))}
                                />
                            </Container_Row_100_Center>
                            <Container_Row_100_Center>
                                <Text_A_16_Center ThemeMode={themeMode}>Correo:</Text_A_16_Center>
                                <Input_Text_Black_100 ThemeMode={themeMode}
                                    id="Input-Email"
                                    placeholder="..."
                                    type="text"
                                    disabled={isActionBlock}
                                    value={isTextFieldsSupplier.correo}
                                    onChange={(e) => setIsTextFieldsSupplier(prev => ({...prev, correo: e.target.value}))}
                                />
                                <Icon_Button_Blue_18 ThemeMode={themeMode} className="pulsate-buttom"
                                    onClick={() => {
                                        setIsTextFieldsSupplier(prev => ({...prev, correo: ''}))
                                    }}
                                    disabled={isActionBlock}
                                >
                                    <MdCancel/>
                                </Icon_Button_Blue_18>
                            </Container_Row_100_Center>
                        </Container_Column_90_Center>
                        <Container_Row_95_Center>
                            {isTextFieldsSupplier.calificacion === 0 ? (
                                <>
                                    <Icon_Blue_30 ThemeMode={themeMode} className='pulsate-icon-fwd-0'><FaStar/></Icon_Blue_30>
                                    <Icon_Blue_30 ThemeMode={themeMode} className='pulsate-icon-fwd-1'><FaStar/></Icon_Blue_30>
                                    <Icon_Blue_30 ThemeMode={themeMode} className='pulsate-icon-fwd-2'><FaStar/></Icon_Blue_30>
                                    <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_White_30>
                                    <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_White_30>
                                </>
                            ):(
                                isTextFieldsSupplier.calificacion <= 1 ? (
                                    <>
                                        <Icon_Red_30 ThemeMode={themeMode} className='pulsate-icon-fwd-0'><FaStar/></Icon_Red_30>
                                        <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-1'><FaStar/></Icon_Black_White_30>
                                        <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-2'><FaStar/></Icon_Black_White_30>
                                        <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_White_30>
                                        <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_White_30>
                                    </>
                                ):(
                                    isTextFieldsSupplier.calificacion <=2 ? (
                                        <>
                                            <Icon_Orange_30 ThemeMode={themeMode} className='pulsate-icon-fwd-0'><FaStar/></Icon_Orange_30>
                                            <Icon_Orange_30 ThemeMode={themeMode} className='pulsate-icon-fwd-1'><FaStar/></Icon_Orange_30>
                                            <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-2'><FaStar/></Icon_Black_White_30>
                                            <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_White_30>
                                            <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_White_30>
                                        </>
                                    ):(
                                        isTextFieldsSupplier.calificacion <=3 ? (
                                            <>
                                                <Icon_Yellow_30 ThemeMode={themeMode} className='pulsate-icon-fwd-0'><FaStar/></Icon_Yellow_30>
                                                <Icon_Yellow_30 ThemeMode={themeMode} className='pulsate-icon-fwd-1'><FaStar/></Icon_Yellow_30>
                                                <Icon_Yellow_30 ThemeMode={themeMode} className='pulsate-icon-fwd-2'><FaStar/></Icon_Yellow_30>
                                                <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_White_30>
                                                <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_White_30>
                                            </>
                                        ):(
                                            isTextFieldsSupplier.calificacion <=4 ? (
                                                <>
                                                    <Icon_Lime_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-0'><FaStar/></Icon_Lime_Green_30>
                                                    <Icon_Lime_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-1'><FaStar/></Icon_Lime_Green_30>
                                                    <Icon_Lime_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-2'><FaStar/></Icon_Lime_Green_30>
                                                    <Icon_Lime_Green_30 ThemeMode={themeMode} className='pulsate-icon-fwd-3'><FaStar/></Icon_Lime_Green_30>
                                                    <Icon_Black_White_30 ThemeMode={themeMode} className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_White_30>
                                                </>
                                            ):(
                                                isTextFieldsSupplier.calificacion <=5 ? (
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
                        </Container_Row_95_Center>
                        <Container_Row_95_Center>
                            <Tooltip title='Cancelar' placement='top'>
                                <Button_Icon_Red_210 ThemeMode={themeMode} className='pulsate-buttom'
                                    onClick={() => handleModalView('')}
                                    disabled={isActionBlock}    
                                >
                                    <Icon_White_22><MdCancel/></Icon_White_22>
                                </Button_Icon_Red_210>
                            </Tooltip>
                            <Tooltip title='Editar' placement='top'>
                                <Button_Icon_Blue_210 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                    onClick={() => handleSupplierEdit()}
                                    disabled={isActionBlock}    
                                >
                                    <Icon_White_22><MdEdit/></Icon_White_22>
                                </Button_Icon_Blue_210>
                            </Tooltip>
                        </Container_Row_95_Center>
                    </Container_Form_500>
                </Container_Modal>
            ):(
                currentMView === 'Proveedor-Editar' ? (
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