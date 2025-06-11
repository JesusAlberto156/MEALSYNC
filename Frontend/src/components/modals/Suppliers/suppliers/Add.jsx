//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,ModalContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { ActionBlockContext } from "../../../../contexts/VariablesProvider";
import { TextFieldsSupplierContext } from "../../../../contexts/FormsProvider";
import { SupplierAddContext,SuppliersContext } from "../../../../contexts/SuppliersProvider";
import { RefSuppliersContext } from "../../../../contexts/RefsProvider";
import { SocketContext,LogAddContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleModalView } from "../../../../hooks/Views";
import { HandleSupplierAdd } from "../../../../hooks/Form";
import { ResetTextFieldsSupplier } from "../../../../hooks/Texts";
import { Dates } from "../../../../hooks/Dates";
//__________ICONOS__________
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { IoIosAddCircle } from "react-icons/io";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Row_95_Center,Container_Column_90_Center,Container_Row_100_Center,Container_Row_NG_95_Center } from "../../../styled/Containers";
import { Text_Title_30_Center,Text_A_16_Center,Text_Blue_16_Center } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Green_210 } from "../../../styled/Buttons";
import { Input_Text_Black_100 } from "../../../styled/Inputs";
import { Icon_White_22,Icon_Button_Blue_18 } from "../../../styled/Icons";
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
    const {Modal_Suppliers,Form_Suppliers,Button_Edit_Suppliers,Button_Delete_Suppliers} = useContext(RefSuppliersContext);
    const [socket] = useContext(SocketContext);
    const [isLogAdd,setIsLogAdd] = useContext(LogAddContext);
    const [isSuppliers] = useContext(SuppliersContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    // Constantes con los valores de useRef
    const Supplier = useRef(false);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const handleSupplierAdd = HandleSupplierAdd();
    const resetTextFieldsSupplier = ResetTextFieldsSupplier();
    const { insertDate } = Dates();
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isSupplierAdd){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Supplier',isLoggedUser.idusuario,isTextFieldsSupplier.nombre.trim(),isTextFieldsSupplier.rfc.trim(),isTextFieldsSupplier.domicilio.trim(),isTextFieldsSupplier.telefono.trim(),isTextFieldsSupplier.correo.trim())

                        resolve('¡MEALSYNC agregó al proveedor!...');

                        setIsSupplierAdd(false)

                        const route = sessionStorage.getItem('Ruta');

                        setCurrentMView('');
                        sessionStorage.setItem('Vista del Modal','');
                        setTimeout(() => {
                            setIsModal(false);
                            sessionStorage.setItem('Estado del Modal',false);
                            setIsSupplierAdd(false);
                            resetTextFieldsSupplier();
                            setIsActionBlock(false);
                            navigate(route,{ replace: true });
                        },750);
                    },2000);
                }catch(e){
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
                <Container_Modal ref={Modal_Suppliers}>
                    <Container_Form_500 ref={Form_Suppliers} ThemeMode={themeMode} className={currentMView === 'Proveedor-Agregar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Row_100_Center>
                            <Text_Title_30_Center ThemeMode={themeMode}>AGREGAR PROVEEDOR</Text_Title_30_Center>
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
                            <Tooltip title='Cancelar' placement='top'>
                                <Button_Icon_Blue_210 ThemeMode={themeMode} className='pulsate-buttom'
                                    onClick={() => handleModalView('')}
                                    disabled={isActionBlock}    
                                >
                                    <Icon_White_22><MdCancel/></Icon_White_22>
                                </Button_Icon_Blue_210>
                            </Tooltip>
                            <Tooltip title='Agregar' placement='top'>
                                <Button_Icon_Green_210 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                    onClick={() => handleSupplierAdd()}
                                    disabled={isActionBlock}    
                                >
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