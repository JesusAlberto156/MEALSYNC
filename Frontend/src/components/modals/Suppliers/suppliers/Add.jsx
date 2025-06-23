//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useRef,useState } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,ModalContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { ActionBlockContext,KeyboardContext,KeyboardViewContext,TouchContext } from "../../../../contexts/VariablesProvider";
import { TextFieldsSupplierContext } from "../../../../contexts/FormsProvider";
import { SupplierAddContext } from "../../../../contexts/SuppliersProvider";
import { RefKeyboardContext } from "../../../../contexts/RefsProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleModalViewSuppliers } from "../../../../hooks/suppliers/Views";
import { HandleSupplierAdd } from "../../../../hooks/suppliers/Forms";
import { ResetSelectedTables } from "../../../../hooks/Texts";
//__________ICONOS__________
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { IoIosAddCircle } from "react-icons/io";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Row_95_Center,Container_Column_90_Center,Container_Row_100_Center,Container_Row_NG_95_Center } from "../../../styled/Containers";
import { Text_Title_30_Center,Text_A_16_Center,Text_Blue_16_Center } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Green_210 } from "../../../styled/Buttons";
import { Input_Group, Input_Text_Black_100 } from "../../../styled/Inputs";
import { Icon_White_22,Icon_Button_Blue_18 } from "../../../styled/Icons";
import { Alert_Verification,Alert_Warning_Sonner } from "../../../styled/Alerts";
import { Label_Total_Text_12_Center } from "../../../styled/Labels";
// Componentes personalizados
import Keyboard_Default from "../../../keyboards/Defaullt";
import Keyboard_Numeric from "../../../keyboards/Numeric";
//____________IMPORT/EXPORT____________

// Modal para agregar proveedores a su tabla
export default function Supplier_Add(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSupplierAdd,setIsSupplierAdd] = useContext(SupplierAddContext);
    const [isTextFieldsSupplier,setIsTextFieldsSupplier] = useContext(TextFieldsSupplierContext);
    const [socket] = useContext(SocketContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const [isTouch,setIsTouch] = useContext(TouchContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewSuppliers = HandleModalViewSuppliers();
    const handleSupplierAdd = HandleSupplierAdd();
    const resetSelectedTables = ResetSelectedTables();
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
    // UseEffect para agregar datos a la base de datos
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
                            resetSelectedTables();
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
                <Container_Modal>
                    <Container_Form_500 ThemeMode={themeMode} className={currentMView === 'Proveedor-Agregar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
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
                            <Tooltip title='Cancelar' placement='top'>
                                <span>
                                    <Button_Icon_Blue_210 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalViewSuppliers('')}
                                        disabled={isActionBlock}    
                                    >
                                        <Icon_White_22><MdCancel/></Icon_White_22>
                                    </Button_Icon_Blue_210>
                                </span>
                            </Tooltip>
                            <Tooltip title='Agregar' placement='top'>
                                <span>
                                    <Button_Icon_Green_210 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleSupplierAdd()}
                                        disabled={isActionBlock}    
                                    >
                                        <Icon_White_22><IoIosAddCircle/></Icon_White_22>
                                    </Button_Icon_Green_210>
                                </span>
                            </Tooltip>
                        </Container_Row_95_Center>
                    </Container_Form_500>
                    {isKeyboard ? (
                        isKeyboardView === 'Name' || isKeyboardView === 'Rfc' || isKeyboardView === 'Address' || isKeyboardView === 'Email' ? (
                            <>
                                <Keyboard_Default value={isKeyboardView === 'Name' ? isTextFieldsSupplier.nombre : 
                                                        isKeyboardView === 'Rfc' ? isTextFieldsSupplier.rfc :
                                                        isKeyboardView === 'Address' ? isTextFieldsSupplier.domicilio : isTextFieldsSupplier.correo} onChange={handleKeyboard}/>  
                        
                            </>
                        ):(
                            <>
                                <Keyboard_Numeric value={isKeyboardView === 'Phone' ? isTextFieldsSupplier.telefono : ''} onChange={handleKeyboard}/>  
                        
                            </>
                        )
                    ):(
                        <></>
                    )}
                </Container_Modal>
            ):(
                <></>
            )}
        </>
    );
}