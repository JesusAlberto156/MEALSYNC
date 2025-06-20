//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useRef,useState } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,ModalContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { ActionBlockContext,TouchContext,KeyboardContext,KeyboardViewContext } from "../../../../contexts/VariablesProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { TextFieldsSupplierContext } from "../../../../contexts/FormsProvider";
import { SupplierEditContext } from "../../../../contexts/SuppliersProvider";
import { RefSuppliersContext,RefKeyboardContext } from "../../../../contexts/RefsProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleModalViewSuppliers } from "../../../../hooks/suppliers/Views";
import { HandleSupplierEdit } from "../../../../hooks/suppliers/Forms";
//__________ICONOS__________
import { MdCancel } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaStar } from "react-icons/fa";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Column_90_Center,Container_Row_100_Center,Container_Row_95_Center,Container_Row_NG_95_Center } from "../../../styled/Containers";
import { Text_Title_30_Center,Text_A_16_Center,Text_Blue_16_Center,Text_A_12_Justify } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Red_210 } from "../../../styled/Buttons";
import { Input_Text_Black_100,Input_Group } from "../../../styled/Inputs";
import { Icon_White_22,Icon_Button_Blue_18,Icon_Green_30,Icon_Lime_Green_30,Icon_Yellow_30,Icon_Orange_30,Icon_Red_30,Icon_Blue_30,Icon_Black_White_30 } from "../../../styled/Icons";
import { Alert_Verification,Alert_Warning_Sonner } from "../../../styled/Alerts";
import { Label_Total_Text_12_Center } from "../../../styled/Labels";
// Componentes personalizados
import Error_Edit from "../../errors/Edit";
import Virtual_Keyboard from "../../../forms/Keyboard";
//____________IMPORT/EXPORT____________

// Modal para editar proveedores a su tabla
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
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const [isTouch,setIsTouch] = useContext(TouchContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewSuppliers = HandleModalViewSuppliers();
    const handleSupplierEdit = HandleSupplierEdit();
    // Constantes con el valor de useRef
    const lastTouchTimeRef = useRef(0);
    const isTouchRef = useRef(isTouch);
    // Constantes con el valor de useState
    const [isTotalName,setIsTotalName] = useState(0);
    const [isTotalRFC,setIsTotalRFC] = useState(0);
    const [isTotalAddress,setIsTotalAddress] = useState(0);
    const [isTotalPhone,setIsTotalPhone] = useState(0);
    const [isTotalEmail,setIsTotalEmail] = useState(0);
    // useEffect para calcular el total escrito en los campos
    useEffect(() => {
        setIsTotalName(isTextFieldsSupplier.nombre.length)
        if(isTextFieldsSupplier.nombre.length === 150){
            Alert_Warning_Sonner('¡MEALSYNC ha alcanzado el límite de caracteres permitido en el nombre!...')
        }
    },[isTextFieldsSupplier.nombre]);
    useEffect(() => {
        setIsTotalRFC(isTextFieldsSupplier.rfc.length);
        if(isTextFieldsSupplier.rfc.length === 30){
            Alert_Warning_Sonner('¡MEALSYNC ha alcanzado el límite de caracteres permitido en el RFC!...')
        }
    },[isTextFieldsSupplier.rfc]);
    useEffect(() => {
        setIsTotalAddress(isTextFieldsSupplier.domicilio.length);
        if(isTextFieldsSupplier.domicilio.length === 150){
            Alert_Warning_Sonner('¡MEALSYNC ha alcanzado el límite de caracteres permitido en el domicilio!...')
        }
    },[isTextFieldsSupplier.domicilio]);
    useEffect(() => {
        setIsTotalPhone(isTextFieldsSupplier.telefono.length);
        if(isTextFieldsSupplier.telefono.length === 20){
            Alert_Warning_Sonner('¡MEALSYNC ha alcanzado el límite de caracteres permitido en el teléfono!...')
        }
    },[isTextFieldsSupplier.telefono]);
    useEffect(() => {
        setIsTotalEmail(isTextFieldsSupplier.correo.length);
        if(isTextFieldsSupplier.correo.length === 150){
            Alert_Warning_Sonner('¡MEALSYNC ha alcanzado el límite de caracteres permitido en el correo!...')
        }
    },[isTextFieldsSupplier.correo]);
    // UseEffect que determina la visibilidad del teclado
    useEffect(() => {
        const handleTouchStart = () => {
            lastTouchTimeRef.current = Date.now();
            setIsTouch(true);
        };

        const handleMouseDown = () => {
            const now = Date.now();
            const timeSinceLastTouch = now - lastTouchTimeRef.current;

            // Solo si no hubo un touch reciente, considera que es mouse
            if (timeSinceLastTouch > 500) {
                setIsTouch(false);
            }
        };

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('mousedown', handleMouseDown);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('mousedown', handleMouseDown);
        };
    },[]);
    // UseEffect que determina que se mantenga visible del teclado
    useEffect(() => {
        const handleClickOutside = (event) => {
            setTimeout(() => {
                const inputName = document.getElementById("Input-Name");
                const inputRfc = document.getElementById("Input-Rfc");
                const inputAddress = document.getElementById("Input-Address");
                const inputPhone = document.getElementById("Input-Phone");
                const inputEmail = document.getElementById("Input-Email");
                const keyboard = Keyboard.current && Keyboard.current.contains(event.target);
    
                const clickInsideInputs = 
                    (inputName && inputName.contains(event.target)) ||
                    (inputRfc && inputRfc.contains(event.target)) ||
                    (inputAddress && inputAddress.contains(event.target)) ||
                    (inputPhone && inputPhone.contains(event.target)) ||
                    (inputEmail && inputEmail.contains(event.target));
    
                if (!clickInsideInputs && !keyboard) {
                    setIsKeyboardView('');
                    setTimeout(() => {
                        setIsKeyboard(false);
                    }, 500);
                }
            }, 0);
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
    
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [Keyboard]);
    // useEffect para escribir en los campos del login
    const handleKeyboard = (newValue) => {
        if(isKeyboardView === 'Name' ){
            setIsTextFieldsSupplier(prev => ({
                ...prev,
                nombre: newValue, 
            }));
        }
        if(isKeyboardView === 'Rfc' ){
            setIsTextFieldsSupplier(prev => ({
                ...prev,
                rfc: newValue, 
            }));
        }
        if(isKeyboardView === 'Address' ){
            setIsTextFieldsSupplier(prev => ({
                ...prev,
                domicilio: newValue, 
            }));
        }
        if(isKeyboardView === 'Phone' ){
            setIsTextFieldsSupplier(prev => ({
                ...prev,
                telefono: newValue, 
            }));
        }
        if(isKeyboardView === 'Email' ){
            setIsTextFieldsSupplier(prev => ({
                ...prev,
                correo: newValue, 
            }));
        }
    };
    useEffect(() => {
        isTouchRef.current = isTouch;
    }, [isTouch]);
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isSupplierEdit){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Update-Supplier',isLoggedUser.idusuario,isTextFieldsSupplier.idproveedor,isTextFieldsSupplier.nombre.trim(),isTextFieldsSupplier.rfc.trim(),isTextFieldsSupplier.domicilio.trim(),isTextFieldsSupplier.telefono.trim(),isTextFieldsSupplier.correo.trim())

                        resolve('¡MEALSYNC editó al proveedor!...');

                        setIsSupplierEdit(false);

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
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    setIsSupplierEdit(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'Editando un proveedor!...');
        }
    },[isSupplierEdit]);
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
                                <Input_Group>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        id="Input-Name"
                                        placeholder="..."
                                        type="text"
                                        maxLength={150}
                                        disabled={isActionBlock}
                                        value={isTextFieldsSupplier.nombre}
                                        onChange={(e) => setIsTextFieldsSupplier(prev => ({...prev, nombre: e.target.value}))}
                                        onFocus={() => {
                                            if(isTouchRef.current){
                                                setIsKeyboard(true);
                                                setIsKeyboardView('Name');
                                            }
                                        }}
                                    />
                                    <Label_Total_Text_12_Center ThemeMode={themeMode}>{isTotalName}/150</Label_Total_Text_12_Center>
                                </Input_Group>
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
                                <Input_Group>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        id="Input-Rfc"
                                        placeholder="(Opcional)..."
                                        type="text"
                                        maxLength={30}
                                        disabled={isActionBlock}
                                        value={isTextFieldsSupplier.rfc}
                                        onChange={(e) => setIsTextFieldsSupplier(prev => ({...prev, rfc: e.target.value}))}
                                        onFocus={() => {
                                            if(isTouchRef.current){
                                                setIsKeyboard(true);
                                                setIsKeyboardView('Rfc');
                                            }
                                        }}
                                    />
                                    <Label_Total_Text_12_Center ThemeMode={themeMode}>{isTotalRFC}/30</Label_Total_Text_12_Center>
                                </Input_Group>
                            </Container_Row_100_Center>
                            <Container_Row_100_Center>
                                <Text_A_16_Center ThemeMode={themeMode}>Domicilio:</Text_A_16_Center>
                                <Input_Group>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        id="Input-Address"
                                        placeholder="(Opcional)..."
                                        type="text"
                                        maxLength={150}
                                        disabled={isActionBlock}
                                        value={isTextFieldsSupplier.domicilio}
                                        onChange={(e) => setIsTextFieldsSupplier(prev => ({...prev, domicilio: e.target.value}))}
                                        onFocus={() => {
                                            if(isTouchRef.current){
                                                setIsKeyboard(true);
                                                setIsKeyboardView('Address');
                                            }
                                        }}
                                    />
                                    <Label_Total_Text_12_Center ThemeMode={themeMode}>{isTotalAddress}/150</Label_Total_Text_12_Center>
                                </Input_Group>
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
                                <Input_Group>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        id="Input-Phone"
                                        placeholder="(Opcional)..."
                                        type="text"
                                        maxLength={20}
                                        disabled={isActionBlock}
                                        value={isTextFieldsSupplier.telefono}
                                        onChange={(e) => setIsTextFieldsSupplier(prev => ({...prev, telefono: e.target.value}))}
                                        onFocus={() => {
                                            if(isTouchRef.current){
                                                setIsKeyboard(true);
                                                setIsKeyboardView('Phone');
                                            }
                                        }}
                                    />
                                    <Label_Total_Text_12_Center ThemeMode={themeMode}>{isTotalPhone}/20</Label_Total_Text_12_Center>
                                </Input_Group>
                            </Container_Row_100_Center>
                            <Container_Row_100_Center>
                                <Text_A_16_Center ThemeMode={themeMode}>Correo:</Text_A_16_Center>
                                <Input_Group>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        id="Input-Email"
                                        placeholder="..."
                                        type="text"
                                        maxLength={150}
                                        disabled={isActionBlock}
                                        value={isTextFieldsSupplier.correo}
                                        onChange={(e) => setIsTextFieldsSupplier(prev => ({...prev, correo: e.target.value}))}
                                        onFocus={() => {
                                            if(isTouchRef.current){
                                                setIsKeyboard(true);
                                                setIsKeyboardView('Email');
                                            }
                                        }}
                                    />
                                    <Label_Total_Text_12_Center ThemeMode={themeMode}>{isTotalEmail}/150</Label_Total_Text_12_Center>
                                </Input_Group>
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
                            <Text_A_12_Justify ThemeMode={themeMode}>Es importante recordar la modificación del nombre, ya que este se emplea para identificar los insumos asociados al proveedor o para registrar nuevos insumos a su nombre. La modificación del correo puede afectar la recepción de solicitudes relacionadas con los pedidos de sus insumos.</Text_A_12_Justify>
                        </Container_Row_95_Center>
                        <Container_Row_95_Center>
                            <Tooltip title='Cancelar' placement='top'>
                                <Button_Icon_Red_210 ThemeMode={themeMode} className='pulsate-buttom'
                                    onClick={() => handleModalViewSuppliers('')}
                                    disabled={isActionBlock}    
                                >
                                    <Icon_White_22><MdCancel/></Icon_White_22>
                                </Button_Icon_Red_210>
                            </Tooltip>
                            <Tooltip title='Editar' placement='top'>
                                <Button_Icon_Blue_210 ThemeMode={themeMode} className='pulsate-buttom'
                                    onClick={() => handleSupplierEdit()}
                                    disabled={isActionBlock}    
                                >
                                    <Icon_White_22><MdEdit/></Icon_White_22>
                                </Button_Icon_Blue_210>
                            </Tooltip>
                        </Container_Row_95_Center>
                    </Container_Form_500>
                    {isKeyboard ? (
                        <>
                            <Virtual_Keyboard value={isKeyboardView === 'Name' ? isTextFieldsSupplier.nombre : 
                                                        isKeyboardView === 'Rfc' ? isTextFieldsSupplier.rfc :
                                                        isKeyboardView === 'Address' ? isTextFieldsSupplier.domicilio : 
                                                        isKeyboardView === 'Phone' ? isTextFieldsSupplier.telefono : isTextFieldsSupplier.correo} onChange={handleKeyboard}/>  
                        </>
                    ):(
                        <></>
                    )}
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