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
import { TextFieldsSupplyCategoryContext } from "../../../../contexts/FormsProvider";
import { SupplyCategoryEditContext } from "../../../../contexts/SuppliersProvider";
import { RefSupplyCategoriesContext,RefKeyboardContext } from "../../../../contexts/RefsProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleModalViewSuppliers } from "../../../../hooks/suppliers/Views";
import { HandleSupplyCategoryEdit } from "../../../../hooks/suppliers/Forms";
import { ResetSelectedTables } from "../../../../hooks/Texts";
//__________ICONOS__________
import { MdCancel } from "react-icons/md";
import { MdEdit } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Column_90_Center,Container_Row_100_Center,Container_Row_95_Center,Container_Row_NG_95_Center } from "../../../styled/Containers";
import { Text_Title_32_Black,Text_Span_16_Center_Black,Text_Color_Blue_12,Text_Span_12_Justify_Black } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Red_210 } from "../../../styled/Buttons";
import { Input_Text_Black_100,Input_Group,Input_Area_Black_100 } from "../../../styled/Inputs";
import { Icon_White_22,Icon_Button_Blue_18 } from "../../../styled/Icons";
import { Alert_Verification,Alert_Warning_Sonner } from "../../../styled/Alerts";
import { Label_Total_Text_12_Center,Label_Total_Area_12_Center } from "../../../styled/Labels";
// Componentes personalizados
import Error_Edit from "../../errors/Edit";
import Keyboard_Default from "../../../keyboards/Defaullt";
//____________IMPORT/EXPORT____________

// Modal para editar categorías de insumo a su tabla
export default function Supply_Category_Edit(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSupplyCategoryEdit,setIsSupplyCategoryEdit] = useContext(SupplyCategoryEditContext);
    const [isTextFieldsSupplyCategory,setIsTextFieldsSupplyCategory] = useContext(TextFieldsSupplyCategoryContext);
    const {Modal_Supply_Categories,Form_Supply_Categories,Button_Edit_Supply_Categories,Button_Delete_Supply_Categories} = useContext(RefSupplyCategoriesContext);
    const [socket] = useContext(SocketContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const [isTouch,setIsTouch] = useContext(TouchContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewSuppliers = HandleModalViewSuppliers();
    const handleSupplyCategoryEdit = HandleSupplyCategoryEdit();
    const resetSelectedTables = ResetSelectedTables();
    // Constantes con el valor de useRef
    const lastTouchTimeRef = useRef(0);
    const isTouchRef = useRef(isTouch);
    // Constantes con el valor de useState
    const [isTotalName,setIsTotalName] = useState(0);
    const [isTotalDescription,setIsTotalDescription] = useState(0);
    // useEffect para calcular el total escrito en los campos
    useEffect(() => {
        setIsTotalName(isTextFieldsSupplyCategory.nombre.length)
        if(isTextFieldsSupplyCategory.nombre.length === 150){
            Alert_Warning_Sonner('¡MEALSYNC ha alcanzado el límite de caracteres permitido en el nombre!...')
        }
    },[isTextFieldsSupplyCategory.nombre]);
    useEffect(() => {
        setIsTotalDescription(isTextFieldsSupplyCategory.descripcion.length);
        if(isTextFieldsSupplyCategory.descripcion.length === 250){
            Alert_Warning_Sonner('¡MEALSYNC ha alcanzado el límite de caracteres permitido en la descripción!...')
        }
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
    }, [Keyboard]);
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
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isSupplyCategoryEdit){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Update-Supply-Category',isLoggedUser.idusuario,isTextFieldsSupplyCategory.idcategoria,isTextFieldsSupplyCategory.nombre.trim(),isTextFieldsSupplyCategory.descripcion.trim())

                        resolve('¡MEALSYNC editó la categoría!...');

                        setIsSupplyCategoryEdit(false);

                        const route = sessionStorage.getItem('Ruta');

                        setCurrentMView('');
                        sessionStorage.setItem('Vista del Modal','');
                        setTimeout(() => {
                            setIsModal(false);
                            sessionStorage.setItem('Estado del Modal',false);
                            setIsActionBlock(false);
                            resetSelectedTables();
                            navigate(route,{ replace: true });
                        },750);
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    setIsSupplyCategoryEdit(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'Editando una categoría!...');
        }
    },[isSupplyCategoryEdit]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <Container_Modal ref={Modal_Supply_Categories}>
                    <Container_Form_500 ref={Form_Supply_Categories} ThemeMode={themeMode} className={currentMView === 'Categoria-Editar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Row_100_Center>
                            <Text_Title_32_Black ThemeMode={themeMode}>EDITAR CATEGORÍA</Text_Title_32_Black>
                        </Container_Row_100_Center>
                        <Container_Row_NG_95_Center>
                            <Text_Color_Blue_12 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_12>
                            <Text_Span_16_Center_Black ThemeMode={themeMode}>- Datos generales...</Text_Span_16_Center_Black>
                        </Container_Row_NG_95_Center>
                        <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                            <Container_Row_100_Center>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}>Nombre:</Text_Span_16_Center_Black>
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
                                <Text_Span_16_Center_Black ThemeMode={themeMode}>Descripción:</Text_Span_16_Center_Black>
                                <Input_Group>
                                    <Input_Area_Black_100 ThemeMode={themeMode}
                                        id="Input-Description"
                                        placeholder="(Opcional)..."
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
                            <Text_Span_12_Justify_Black ThemeMode={themeMode}>Es importante recordar la modificación del nombre, ya que este se emplea para identificar los almacenes de los insumos agregados a esta categoría o para registrar nuevos insumos a su nombre.</Text_Span_12_Justify_Black>
                        </Container_Row_95_Center>
                        <Container_Row_95_Center>
                            <Tooltip title='Cancelar' placement='top'>
                                <span>
                                    <Button_Icon_Red_210 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalViewSuppliers('')}
                                        disabled={isActionBlock}    
                                    >
                                        <Icon_White_22><MdCancel/></Icon_White_22>
                                    </Button_Icon_Red_210>
                                </span>
                            </Tooltip>
                            <Tooltip title='Editar' placement='top'>
                                <span>
                                    <Button_Icon_Blue_210 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleSupplyCategoryEdit()}
                                        disabled={isActionBlock}    
                                    >
                                        <Icon_White_22><MdEdit/></Icon_White_22>
                                    </Button_Icon_Blue_210>
                                </span>
                            </Tooltip>
                        </Container_Row_95_Center>
                    </Container_Form_500>
                    {isKeyboard ? (
                        <>
                            <Keyboard_Default value={isKeyboardView === 'Name' ? isTextFieldsSupplyCategory.nombre : isTextFieldsSupplyCategory.descripcion} onChange={handleKeyboard}/>  
                        </>
                    ):(
                        <></>
                    )}
                </Container_Modal>
            ):(
                currentMView === 'Categoria-Editar' ? (
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