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
import { SocketContext } from "../../../../contexts/SocketProvider";
// Hooks personalizados
import { HandleModalView } from "../../../../hooks/Views";
import { HandleSupplierEdit } from "../../../../hooks/Form";
//__________ICONOS__________
import { MdCancel } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaStar } from "react-icons/fa";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Column_90_Center,Container_Row_100_Center,Container_Row_95_Center,Container_Row_NG_95_Left } from "../../../styled/Containers";
import { Text_Title_30_Center,Text_A_16_Left,Text_Blue_16_Left } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Red_210 } from "../../../styled/Buttons";
import { Input_Text_Black_100 } from "../../../styled/Inputs";
import { Icon_White_22,Icon_Green_30,Icon_Lime_Green_30,Icon_Yellow_30,Icon_Orange_30,Icon_Red_30,Icon_Blue_30,Icon_Black_White_30 } from "../../../styled/Icons";
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
    const {Modal,Form,Button_Edit_S,Button_Delete_S,Button_Details_S} = useContext(RefSuppliersContext);
    const [socket] = useContext(SocketContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const handleSupplierEdit = HandleSupplierEdit();
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isSupplierEdit){
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Supplier-Update',isSelectedRow.idproveedor,isTextFieldsSupplier.name,isTextFieldsSupplier.rfc,isTextFieldsSupplier.address,isTextFieldsSupplier.phone,isTextFieldsSupplier.email)
                    
                        socket.on('Supplier-Update',(message,user) => {
                            console.log(message,user);
                            socket.emit('Suppliers');
                        });

                        resolve('¡MEALSYNC actualizo al proveedor!...');

                        const route = sessionStorage.getItem('Route');

                        setCurrentMView('');
                        sessionStorage.setItem('Modal-View','');
                        setTimeout(() => {
                            setIsModal(false);
                            sessionStorage.setItem('Modal',false);
                            setIsActionBlock(false);
                            setIsSupplierEdit(false);
                            setIsSelectedRow(null);
                            navigate(route,{ replace: true });
                        },750);

                        return () => {
                            socket.off('Supplier-Update');
                        }
                    },1000);
                }catch(error){
                    setIsActionBlock(false);
                    setIsSupplierEdit(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'¡Actualizado un proveedor!...');
        }
    },[isSupplierEdit]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <Container_Modal ref={Modal}>
                    <Container_Form_500 ref={Form} ThemeMode={themeMode} className={currentMView === 'Supplier-Edit' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Text_Title_30_Center ThemeMode={themeMode}>EDITAR PROVEEDOR</Text_Title_30_Center>
                        <Container_Row_NG_95_Left>
                            <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                            <Text_A_16_Left ThemeMode={themeMode}>- Datos del proveedor...</Text_A_16_Left>
                        </Container_Row_NG_95_Left>
                        <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                            <Container_Row_100_Center>
                                <Text_A_16_Left ThemeMode={themeMode}>Nombre:</Text_A_16_Left>
                                <Input_Text_Black_100 ThemeMode={themeMode}
                                    id="Input-Name"
                                    placeholder="Nombre del proveedor..."
                                    type="text"
                                    value={isTextFieldsSupplier.name}
                                    onChange={(e) => setIsTextFieldsSupplier(prev => ({...prev, name: e.target.value}))}
                                />
                            </Container_Row_100_Center>
                            <Container_Row_100_Center>
                                <Text_A_16_Left ThemeMode={themeMode}>RFC:</Text_A_16_Left>
                                <Input_Text_Black_100 ThemeMode={themeMode}
                                    id="Input-Rfc"
                                    placeholder="RFC del proveedor..."
                                    type="text"
                                    value={isTextFieldsSupplier.rfc}
                                    onChange={(e) => setIsTextFieldsSupplier(prev => ({...prev, rfc: e.target.value}))}
                                />
                            </Container_Row_100_Center>
                            <Container_Row_100_Center>
                                <Text_A_16_Left ThemeMode={themeMode}>Domicilio:</Text_A_16_Left>
                                <Input_Text_Black_100 ThemeMode={themeMode}
                                    id="Input-Address"
                                    placeholder="Domicilio del proveedor..."
                                    type="text"
                                    value={isTextFieldsSupplier.address}
                                    onChange={(e) => setIsTextFieldsSupplier(prev => ({...prev, address: e.target.value}))}
                                />
                            </Container_Row_100_Center>
                            <Container_Row_100_Center>
                                <Text_A_16_Left ThemeMode={themeMode}>Teléfono:</Text_A_16_Left>
                                <Input_Text_Black_100 ThemeMode={themeMode}
                                    id="Input-Phone"
                                    placeholder="Telefono del proveedor..."
                                    type="tel"
                                    value={isTextFieldsSupplier.phone}
                                    onChange={(e) => setIsTextFieldsSupplier(prev => ({...prev, phone: e.target.value}))}
                                />
                            </Container_Row_100_Center>
                            <Container_Row_100_Center>
                                <Text_A_16_Left ThemeMode={themeMode}>Correo:</Text_A_16_Left>
                                <Input_Text_Black_100 ThemeMode={themeMode}
                                    id="Input-Email"
                                    placeholder="Correo del proveedor..."
                                    type="email"
                                    value={isTextFieldsSupplier.email}
                                    onChange={(e) => setIsTextFieldsSupplier(prev => ({...prev, email: e.target.value}))}
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
                                <Button_Icon_Red_210 ThemeMode={themeMode} className='pulsate-buttom'
                                    onClick={() => handleModalView('')}>
                                    <Icon_White_22><MdCancel/></Icon_White_22>
                                </Button_Icon_Red_210>
                            </Tooltip>
                            <Tooltip title='Editar' placement='top'>
                                <Button_Icon_Blue_210 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                    onClick={() => handleSupplierEdit()}>
                                    <Icon_White_22><MdEdit/></Icon_White_22>
                                </Button_Icon_Blue_210>
                            </Tooltip>
                        </Container_Row_95_Center>
                    </Container_Form_500>
                </Container_Modal>
            ):(
                currentMView === 'Supplier-Edit' ? (
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