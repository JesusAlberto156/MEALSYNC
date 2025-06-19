//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useRef,useState } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,ModalContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { ActionBlockContext,KeyboardContext,KeyboardViewContext,TouchContext } from "../../../../contexts/VariablesProvider";
import { TextFieldsSupplyCategoryContext } from "../../../../contexts/FormsProvider";
import { SupplierAddContext } from "../../../../contexts/SuppliersProvider";
import { RefKeyboardContext } from "../../../../contexts/RefsProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleModalViewSuppliers } from "../../../../hooks/suppliers/Views";
import { HandleSupplierAdd } from "../../../../hooks/suppliers/Forms";
import { ResetTextFieldsSupplier } from "../../../../hooks/suppliers/Texts";
//__________ICONOS__________
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { IoIosAddCircle } from "react-icons/io";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Row_95_Center,Container_Column_90_Center,Container_Row_100_Center,Container_Row_NG_95_Center } from "../../../styled/Containers";
import { Text_Title_30_Center,Text_A_16_Center,Text_Blue_16_Center } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Green_210 } from "../../../styled/Buttons";
import { Input_Text_Black_100,Input_Area_Black_100, Input_Group } from "../../../styled/Inputs";
import { Icon_White_22,Icon_Button_Blue_18 } from "../../../styled/Icons";
import { Alert_Verification } from "../../../styled/Alerts";
import { Label_Total_Text_12_Center,Label_Total_Area_12_Center } from "../../../styled/Labels";
// Componentes personalizados
import Virtual_Keyboard from "../../../forms/Keyboard";
//____________IMPORT/EXPORT____________

// Modal para agregar proveedores a su tabla
export default function Category_Add(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSupplierAdd,setIsSupplierAdd] = useContext(SupplierAddContext);
    const [isTextFieldsSupplyCategory,setIsTextFieldsSupplyCategory] = useContext(TextFieldsSupplyCategoryContext);
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
    const resetTextFieldsSupplier = ResetTextFieldsSupplier();
    // Constantes con el valor de useState
    const [isTotalDescription,setIsTotalDescription] = useState(0)
    const [isTotalName,setIsTotalName] = useState(0)
    // Constantes con el valor de useRef
    const lastTouchTimeRef = useRef(0);
    const isTouchRef = useRef(isTouch);
    // useEffect para calcular el total escrito en los campos
    useEffect(() => {
        setIsTotalName(isTextFieldsSupplyCategory.nombre.length)
    },[isTextFieldsSupplyCategory.nombre]);
    useEffect(() => {
        setIsTotalDescription(isTextFieldsSupplyCategory.descripcion.length)
    },[isTextFieldsSupplyCategory.descripcion]);
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
                const inputDescription = document.getElementById("Input-Description");
                const keyboard = Keyboard.current && Keyboard.current.contains(event.target);
    
                const clickInsideInputs = 
                    (inputName && inputName.contains(event.target)) ||
                    (inputDescription && inputDescription.contains(event.target));
    
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
    },[Keyboard]);
    // useEffect para escribir en los campos del login
    const handleKeyboard = (newValue) => {
        if(isKeyboardView === 'Name' ){
            setIsTextFieldsSupplyCategory(prev => ({
                ...prev,
                nombre: newValue, 
            }));
        }
        if(isKeyboardView === 'Description' ){
            setIsTextFieldsSupplyCategory(prev => ({
                ...prev,
                descripcion: newValue, 
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
                <Container_Modal>
                    <Container_Form_500 ThemeMode={themeMode} className={currentMView === 'Categoria-Agregar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Row_100_Center>
                            <Text_Title_30_Center ThemeMode={themeMode}>AGREGAR CATEGORÍA</Text_Title_30_Center>
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
                                        value={isTextFieldsSupplyCategory.nombre}
                                        onChange={(e) => setIsTextFieldsSupplyCategory(prev => ({...prev, nombre: e.target.value}))}
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
                                        setIsTextFieldsSupplyCategory(prev => ({...prev, nombre: ''}))
                                    }}
                                    disabled={isActionBlock}
                                >
                                    <MdCancel/>
                                </Icon_Button_Blue_18>
                            </Container_Row_100_Center>
                            <Container_Row_100_Center>
                                <Text_A_16_Center ThemeMode={themeMode}>Descripción:</Text_A_16_Center>
                                <Input_Group>
                                    <Input_Area_Black_100 ThemeMode={themeMode}
                                        id="Input-Description"
                                        placeholder="..."
                                        type="text"
                                        maxLength={250}
                                        disabled={isActionBlock}
                                        value={isTextFieldsSupplyCategory.descripcion}
                                        onChange={(e) => setIsTextFieldsSupplyCategory(prev => ({...prev, descripcion: e.target.value}))}
                                        onFocus={() => {
                                            if(isTouchRef.current){
                                                setIsKeyboard(true);
                                                setIsKeyboardView('Description');
                                            }
                                        }}
                                        rows={3}
                                    />
                                    <Label_Total_Area_12_Center ThemeMode={themeMode}>{isTotalDescription}/250</Label_Total_Area_12_Center>
                                </Input_Group>
                                <Icon_Button_Blue_18 ThemeMode={themeMode} className="pulsate-buttom"
                                    onClick={() => {
                                        setIsTextFieldsSupplyCategory(prev => ({...prev, descripcion: ''}))
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
                                    onClick={() => handleModalViewSuppliers('')}
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
                    {isKeyboard ? (
                        <>
                            <Virtual_Keyboard value={isKeyboardView === 'Name' ? isTextFieldsSupplyCategory.nombre : isTextFieldsSupplyCategory.descripcion} onChange={handleKeyboard}/>  
                        </>
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