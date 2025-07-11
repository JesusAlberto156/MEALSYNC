//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,ModalContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { ActionBlockContext,KeyboardContext,KeyboardViewContext,TouchContext } from "../../../../contexts/VariablesProvider";
import { TextFieldsSupplyTypesContext } from "../../../../contexts/FormsProvider";
import { SupplyCategoriesContext,SupplyTypeCountAddContext } from "../../../../contexts/SuppliersProvider";
import { RefKeyboardContext,RefSupplyTypesContext } from "../../../../contexts/RefsProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleModalViewSuppliers } from "../../../../hooks/suppliers/Views";
import { HandleCountSupplyTypeAdd } from "../../../../hooks/suppliers/Forms";
import { ResetSelectedTables } from "../../../../hooks/Texts";
//__________ICONOS__________
// Icono para realizar la función del modal
import { MdCancel } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Form_500,Container_Row_100_Center,Container_Column_100_Center,Container_Row_NG_Auto_Center } from "../../../styled/Containers";
import { Text_Title_32_Black,Text_Span_16_Center_Black,Text_Color_Blue_16 } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Green_210 } from "../../../styled/Buttons";
import { Input_Text_100_Black,Input_Group } from "../../../styled/Inputs";
import { Icon_20 } from "../../../styled/Icons";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
// Componentes personalizados
import Error_Add from "../../errors/Add";
import Keyboard_Numeric from "../../../keyboards/Numeric";
//____________IMPORT/EXPORT____________

// Modal para agregar cantidades a los tipos de insumo a su tabla
export default function Count_Supply_Type_Add(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [isSupplyCategories] = useContext(SupplyCategoriesContext);
    const [isSupplyTypeCountAdd,setIsSupplyTypeCountAdd] = useContext(SupplyTypeCountAddContext);
    const [isTextFieldsSupplyType,setIsTextFieldsSupplyType] = useContext(TextFieldsSupplyTypesContext);
    const [socket] = useContext(SocketContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const [isTouch,setIsTouch] = useContext(TouchContext);
    const {Modal_Supply_Types,Form_Supply_Types,Button_Edit_Supply_Types,Button_Add_Supply_Types,Button_Delete_Supply_Types,Button_Count_Supply_Types} = useContext(RefSupplyTypesContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewSuppliers = HandleModalViewSuppliers();
    const handleCountSupplyTypeAdd = HandleCountSupplyTypeAdd();
    const resetSelectedTables = ResetSelectedTables();
    // Constantes con el valor de useRef
    const lastTouchTimeRef = useRef(0);
    const isTouchRef = useRef(isTouch);
    // UseEffect para limpiar la cantidad
    useEffect(() => {
        setIsTextFieldsSupplyType(prev => ({
            ...prev,
            cantidades: [{ cantidad:0}]
        }))
    },[])
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
                const inputCount = document.getElementById("Input-Count");
                const keyboard = Keyboard.current && Keyboard.current.contains(event.target);
    
                const clickInsideInputs = 
                    (inputCount && inputCount.contains(event.target));
    
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
        if(isKeyboardView === 'Count' ){
            setIsTextFieldsSupplyType(prev => ({
                ...prev,
                cantidades: [{cantidad: parseFloat(newValue)}], 
            }));
        }
    };
    useEffect(() => {
        isTouchRef.current = isTouch;
    }, [isTouch]);
    // UseEffect para agregar datos a la base de datos
    useEffect(() => {
        if(isSupplyTypeCountAdd){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Count-Supply-Type',isLoggedUser.idusuario,parseFloat(isTextFieldsSupplyType.cantidades[0].cantidad),isTextFieldsSupplyType.idtipo);

                        resolve('¡MEALSYNC agregó una cantidad al tipo de insumo!...');

                        setIsSupplyTypeCountAdd(false)

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
                    setIsSupplyTypeCountAdd(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Sonner_Promise(promise,'Agregando una cantidad al tipo de insumo!...');
        }
    },[isSupplyTypeCountAdd]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <Container_Modal_Background_Black ref={Modal_Supply_Types}>
                    <Container_Form_500 ref={Form_Supply_Types} ThemeMode={themeMode} className={currentMView === 'Tipo-Insumo-Cantidad-Agregar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Row_100_Center>
                            <Text_Title_32_Black ThemeMode={themeMode}>AGREGAR CANTIDAD AL TIPO DE INSUMO</Text_Title_32_Black>
                        </Container_Row_100_Center>
                        <Container_Row_NG_Auto_Center>
                            <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                            <Text_Span_16_Center_Black ThemeMode={themeMode}>- Datos generales...</Text_Span_16_Center_Black>
                        </Container_Row_NG_Auto_Center>
                        <Container_Column_100_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                            <Container_Row_NG_Auto_Center>
                                <Text_Color_Blue_16 ThemeMode={themeMode}>Tipo de insumo:</Text_Color_Blue_16>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}> {isTextFieldsSupplyType.tipo || 'Desconocido'}...</Text_Span_16_Center_Black>
                            </Container_Row_NG_Auto_Center>
                        </Container_Column_100_Center>
                        <Container_Row_NG_Auto_Center>
                            <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                            <Text_Span_16_Center_Black ThemeMode={themeMode}>- Datos específicos...</Text_Span_16_Center_Black>
                        </Container_Row_NG_Auto_Center>
                        <Container_Column_100_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                            <Container_Row_NG_Auto_Center>
                                <Text_Color_Blue_16 ThemeMode={themeMode}>Unidad:</Text_Color_Blue_16>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}> {isTextFieldsSupplyType.unidad || 'Desconocida'}...</Text_Span_16_Center_Black>
                            </Container_Row_NG_Auto_Center>
                            <Container_Row_NG_Auto_Center>
                                <Text_Color_Blue_16 ThemeMode={themeMode}>Categoría:</Text_Color_Blue_16>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}> {isSupplyCategories.find(category => category.idcategoria === isTextFieldsSupplyType.idcategoria)?.nombre || 'Desconocida'}...</Text_Span_16_Center_Black>
                            </Container_Row_NG_Auto_Center>
                            <Container_Row_100_Center>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}>Cantidad:</Text_Span_16_Center_Black>
                                <Input_Group>
                                    <Input_Text_100_Black ThemeMode={themeMode}
                                        id="Input-Count"
                                        placeholder="..."
                                        type="text"
                                        disabled={isActionBlock}
                                        value={isTextFieldsSupplyType.cantidades[0].cantidad}
                                        onChange={(e) => setIsTextFieldsSupplyType(prev => ({...prev, cantidades: [{ cantidad: e.target.value }]}))}
                                        onFocus={() => {
                                            if(isTouchRef.current){
                                                setIsKeyboard(true);
                                                setIsKeyboardView('Count');
                                            }
                                        }}
                                    />
                                </Input_Group>
                            </Container_Row_100_Center>
                        </Container_Column_100_Center>
                        <Container_Row_100_Center>
                            <Tooltip title='Cancelar' placement='top'>
                                <span>
                                    <Button_Icon_Blue_210 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalViewSuppliers('')}
                                        disabled={isActionBlock}    
                                    >
                                        <Icon_20><MdCancel/></Icon_20>
                                    </Button_Icon_Blue_210>
                                </span>
                            </Tooltip>
                            <Tooltip title='Agregar' placement='top'>
                                <span>
                                    <Button_Icon_Green_210 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleCountSupplyTypeAdd()}
                                        disabled={isActionBlock}    
                                    >
                                        <Icon_20><IoIosAddCircle/></Icon_20>
                                    </Button_Icon_Green_210>
                                </span>
                            </Tooltip>
                        </Container_Row_100_Center>
                    </Container_Form_500>
                    {isKeyboard ? (
                        <>
                            <Keyboard_Numeric value={isKeyboardView === 'Count' ? isTextFieldsSupplyType.cantidades.cantidad : ''} onChange={handleKeyboard}/>
                        </>
                    ):(
                        <></>
                    )}
                </Container_Modal_Background_Black>
            ):(
                currentMView === 'Tipo-Insumo-Cantidad-Agregar' ? (
                    <>
                        <Error_Add/>
                    </>
                ):(
                    <></>
                )
            )}
        </>
    );
}