//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,ModalContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { ActionBlockContext } from "../../../../contexts/VariablesProvider";
import { TextFieldsSupplierContext } from "../../../../contexts/FormsProvider";
import { SupplierAddContext } from "../../../../contexts/SuppliersProvider";
import { RefSuppliersContext } from "../../../../contexts/RefsProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
// Hooks personalizados
import { HandleModalView } from "../../../../hooks/Views";
import { HandleSupplierAdd } from "../../../../hooks/Form";
import { ResetTextFieldsSupplier } from "../../../../hooks/Texts";
//__________ICONOS__________
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { IoIosAddCircle } from "react-icons/io";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Row_95_Center,Container_Column_90_Center,Container_Row_100_Center,Container_Row_NG_95_Left } from "../../../styled/Containers";
import { Text_Title_30_Center,Text_A_16_Left,Text_Blue_16_Left } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Green_210 } from "../../../styled/Buttons";
import { Input_Text_Black_100 } from "../../../styled/Inputs";
import { Icon_White_22 } from "../../../styled/Icons";
import { Alert_Verification } from "../../../styled/Alerts";
//____________IMPORT/EXPORT____________

export default function Suppliers_Add(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSupplierAdd,setIsSupplierAdd] = useContext(SupplierAddContext);
    const [isTextFieldsSupplier,setIsTextFieldsSupplier] = useContext(TextFieldsSupplierContext);
    const {Modal,Form,Button_Edit_S,Button_Delete_S,Button_Details_S} = useContext(RefSuppliersContext);
    const [socket] = useContext(SocketContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const handleSupplierAdd = HandleSupplierAdd();
    const resetTextFieldsSupplier = ResetTextFieldsSupplier();
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isSupplierAdd){
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Supplier-Insert',isTextFieldsSupplier.name,isTextFieldsSupplier.rfc,isTextFieldsSupplier.address,isTextFieldsSupplier.phone,isTextFieldsSupplier.email)

                        resolve('¡MEALSYNC agrego al proveedor!...');

                        const route = sessionStorage.getItem('Route');

                        setCurrentMView('');
                        sessionStorage.setItem('Modal-View','');
                        setTimeout(() => {
                            setIsModal(false);
                            sessionStorage.setItem('Modal',false);
                            setIsActionBlock(false);
                            setIsSupplierAdd(false);
                            resetTextFieldsSupplier();
                            navigate(route,{ replace: true });
                        },750);
                    },2000);
                }catch(error){
                    setIsActionBlock(false);
                    setIsSupplierAdd(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'Agregando un proveedor!...');
        }
    },[isSupplierAdd]);
    // UseEffect para quitar la suscrpcion de socket
    useEffect(() => {
        const handleSupplierInsert = (message,user) => {
            console.log(message,user);
            socket.emit('Suppliers');
        };

        socket.on('Supplier-Insert',handleSupplierInsert);
        
        return () => {
            socket.off('Supplier-Insert',handleSupplierInsert);
        }
    },[socket])
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <Container_Modal ref={Modal}>
                    <Container_Form_500 ref={Form} ThemeMode={themeMode} className={currentMView === 'Supplier-Add' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Text_Title_30_Center ThemeMode={themeMode}>AGREGAR PROVEEDOR</Text_Title_30_Center>
                        <Container_Row_NG_95_Left>
                            <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                            <Text_A_16_Left ThemeMode={themeMode}>- Datos del proveedor...</Text_A_16_Left>
                        </Container_Row_NG_95_Left>
                        <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                            <Container_Row_100_Center>
                                <Text_A_16_Left ThemeMode={themeMode}>Nombre:</Text_A_16_Left>
                                <Input_Text_Black_100 ThemeMode={themeMode}
                                    id="Input-Name"
                                    placeholder="..."
                                    type="text"
                                    value={isTextFieldsSupplier.name}
                                    onChange={(e) => setIsTextFieldsSupplier(prev => ({...prev, name: e.target.value}))}
                                />
                            </Container_Row_100_Center>
                            <Container_Row_100_Center>
                                <Text_A_16_Left ThemeMode={themeMode}>RFC:</Text_A_16_Left>
                                <Input_Text_Black_100 ThemeMode={themeMode}
                                    id="Input-Rfc"
                                    placeholder="..."
                                    type="text"
                                    value={isTextFieldsSupplier.rfc}
                                    onChange={(e) => setIsTextFieldsSupplier(prev => ({...prev, rfc: e.target.value}))}
                                />
                            </Container_Row_100_Center>
                            <Container_Row_100_Center>
                                <Text_A_16_Left ThemeMode={themeMode}>Domicilio:</Text_A_16_Left>
                                <Input_Text_Black_100 ThemeMode={themeMode}
                                    id="Input-Address"
                                    placeholder="..."
                                    type="text"
                                    value={isTextFieldsSupplier.address}
                                    onChange={(e) => setIsTextFieldsSupplier(prev => ({...prev, address: e.target.value}))}
                                />
                            </Container_Row_100_Center>
                            <Container_Row_100_Center>
                                <Text_A_16_Left ThemeMode={themeMode}>Teléfono:</Text_A_16_Left>
                                <Input_Text_Black_100 ThemeMode={themeMode}
                                    id="Input-Phone"
                                    placeholder="..."
                                    type="tel"
                                    value={isTextFieldsSupplier.phone}
                                    onChange={(e) => setIsTextFieldsSupplier(prev => ({...prev, phone: e.target.value}))}
                                />
                            </Container_Row_100_Center>
                            <Container_Row_100_Center>
                                <Text_A_16_Left ThemeMode={themeMode}>Correo:</Text_A_16_Left>
                                <Input_Text_Black_100 ThemeMode={themeMode}
                                    id="Input-Email"
                                    placeholder="..."
                                    type="email"
                                    value={isTextFieldsSupplier.email}
                                    onChange={(e) => setIsTextFieldsSupplier(prev => ({...prev, email: e.target.value}))}
                                />
                            </Container_Row_100_Center>
                        </Container_Column_90_Center>
                        <Container_Row_95_Center>
                            <Tooltip title='Cancelar' placement='top'>
                                <Button_Icon_Blue_210 ThemeMode={themeMode} className='pulsate-buttom'
                                    onClick={() => handleModalView('')}>
                                    <Icon_White_22><MdCancel/></Icon_White_22>
                                </Button_Icon_Blue_210>
                            </Tooltip>
                            <Tooltip title='Agregar' placement='top'>
                                <Button_Icon_Green_210 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                    onClick={() => handleSupplierAdd()}>
                                    <Icon_White_22><IoIosAddCircle/></Icon_White_22>
                                </Button_Icon_Green_210>
                            </Tooltip>
                        </Container_Row_95_Center>
                    </Container_Form_500>
                </Container_Modal>
            ):(
                <></>
            )}
        </>
    );
}