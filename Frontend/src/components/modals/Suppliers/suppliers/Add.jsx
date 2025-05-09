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
import { ImUserPlus } from "react-icons/im";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Row_90_Left,Container_Row_90_Center,Container_Column_90_Center,Container_Row_100_Center } from "../../../styled/Containers";
import { Text_Title_30_Center,Text_A_16_Left } from "../../../styled/Text";
import { Button_Icon_Blue_180,Button_Icon_Green_180 } from "../../../styled/Buttons";
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
                    
                        socket.on('Supplier-Insert',(message,user) => {
                            console.log(message,user);
                            socket.emit('Suppliers');
                        });

                        resolve('¡MEALSYNC agrego al proveedor!...');

                        setCurrentMView('');
                        sessionStorage.setItem('Modal-View','');
                        setTimeout(() => {
                            setIsModal(false);
                            sessionStorage.setItem('Modal',false);
                            setIsActionBlock(false);
                            setIsSupplierAdd(false);
                            resetTextFieldsSupplier();
                            navigate('/Administration/Suppliers/Suppliers',{ replace: true });
                        },750);

                        return () => {
                            socket.off('Supplier-Insert');
                        }
                    },1000);
                }catch(error){
                    setIsActionBlock(false);
                    setIsSupplierAdd(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'Agregando un proveedor!...');
        }
    },[isSupplierAdd]);
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <Container_Modal ref={Modal}>
                    <Container_Form_500 ref={Form} ThemeMode={themeMode} className={currentMView === 'Supplier-Add' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Text_Title_30_Center ThemeMode={themeMode}>AGREGAR PROVEEDOR</Text_Title_30_Center>
                        <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                            <Container_Row_90_Left>
                                <Text_A_16_Left ThemeMode={themeMode}>Datos del proveedor...</Text_A_16_Left>
                            </Container_Row_90_Left>
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
                        <Container_Row_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                            <Tooltip title='Cancelar' placement='top'>
                                <Button_Icon_Blue_180 ThemeMode={themeMode} className='pulsate-buttom'
                                    onClick={() => handleModalView('')}>
                                    <Icon_White_22><MdCancel/></Icon_White_22>
                                </Button_Icon_Blue_180>
                            </Tooltip>
                            <Tooltip title='Agregar' placement='top'>
                                <Button_Icon_Green_180 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                    onClick={() => handleSupplierAdd()}>
                                    <Icon_White_22><ImUserPlus/></Icon_White_22>
                                </Button_Icon_Green_180>
                            </Tooltip>
                        </Container_Row_90_Center>
                    </Container_Form_500>
                </Container_Modal>
            ):(
                <></>
            )}
        </>
    );
}