//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useRef,useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,ModalContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { SearchTermContext } from "../../../../contexts/SearchsProvider";
import { ActionBlockContext,KeyboardContext,KeyboardViewContext,TouchContext } from "../../../../contexts/VariablesProvider";
import { TextFieldsSupplyTypesContext } from "../../../../contexts/FormsProvider";
import { SupplyCategoriesContext,SupplyTypeAddContext } from "../../../../contexts/SuppliersProvider";
import { RefKeyboardContext } from "../../../../contexts/RefsProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleModalViewSuppliers } from "../../../../hooks/suppliers/Views";
import { HandleSupplyTypeAdd } from "../../../../hooks/suppliers/Forms";
import { ResetSelectedTables } from "../../../../hooks/Texts";
import { TableActionsSupplyCategories } from "../../../../hooks/suppliers/Tables";
//__________ICONOS__________
// Icono para el buscador
import { FcSearch } from "react-icons/fc";
// Icono para realizar la función del modal
import { MdCancel } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Row_95_Center,Container_Column_90_Center,Container_Row_100_Center,Container_Row_NG_95_Center } from "../../../styled/Containers";
import { Text_Title_32_Black,Text_Span_16_Center_Black,Text_Color_Blue_12,Text_Span_20_Center_Black } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Green_210 } from "../../../styled/Buttons";
import { Input_Text_Black_100,Input_Area_Black_100,Input_Group,Input_Radio_16,Input_Text_Black_50 } from "../../../styled/Inputs";
import { Icon_White_22,Icon_Button_Blue_18,Icon_26 } from "../../../styled/Icons";
import { Alert_Verification,Alert_Warning_Sonner } from "../../../styled/Alerts";
import { Label_Total_Text_12_Center,Label_Total_Area_12_Center,Label_Text_16_Center } from "../../../styled/Labels";
// Componentes personalizados
import Keyboard_Default from "../../../keyboards/Defaullt";
import Keyboard_Numeric from "../../../keyboards/Numeric";
//____________IMPORT/EXPORT____________

// Modal para agregar tipos de insumo a su tabla
export default function Supply_Type_Add(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(SearchTermContext);
    const [isSupplyCategories] = useContext(SupplyCategoriesContext);
    const [isSupplyTypeAdd,setIsSupplyTypeAdd] = useContext(SupplyTypeAddContext);
    const [isTextFieldsSupplyType,setIsTextFieldsSupplyType] = useContext(TextFieldsSupplyTypesContext);
    const [socket] = useContext(SocketContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const [isTouch,setIsTouch] = useContext(TouchContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewSuppliers = HandleModalViewSuppliers();
    const handleSupplyTypeAdd = HandleSupplyTypeAdd();
    const resetSelectedTables = ResetSelectedTables();
    const {filteredRecordsSupplyCategories} = TableActionsSupplyCategories();
    // Constantes con el valor de useState
    const [isTotalDescription,setIsTotalDescription] = useState(0)
    const [isTotalType,setIsTotalType] = useState(0)
    // Constantes con el valor de useRef
    const lastTouchTimeRef = useRef(0);
    const isTouchRef = useRef(isTouch);
    // useEffect para calcular el total escrito en los campos
    useEffect(() => {
        setIsTotalType(isTextFieldsSupplyType.tipo.length);
        if(isTextFieldsSupplyType.tipo.length === 150){
            Alert_Warning_Sonner('¡MEALSYNC ha alcanzado el límite de caracteres permitido en el nombre!...')
        }
    },[isTextFieldsSupplyType.tipo]);
    useEffect(() => {
        setIsTotalDescription(isTextFieldsSupplyType.descripcion.length);
        if(isTextFieldsSupplyType.descripcion.length === 250){
            Alert_Warning_Sonner('¡MEALSYNC ha alcanzado el límite de caracteres permitido en la descripción!...')
        }
    },[isTextFieldsSupplyType.descripcion]);
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
                const inputName = document.getElementById("Input-Type");
                const inputDescription = document.getElementById("Input-Description");
                const inputSearch = document.getElementById("Input-Search");
                const inputLimit = document.getElementById("Input-Limit");
                const keyboard = Keyboard.current && Keyboard.current.contains(event.target);
    
                const clickInsideInputs = 
                    (inputName && inputName.contains(event.target)) ||
                    (inputDescription && inputDescription.contains(event.target)) ||
                    (inputSearch && inputSearch.contains(event.target)) ||
                    (inputLimit && inputLimit.contains(event.target));
    
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
        if(isKeyboardView === 'Type' ){
            setIsTextFieldsSupplyType(prev => ({
                ...prev,
                tipo: newValue, 
            }));
        }
        if(isKeyboardView === 'Description' ){
            setIsTextFieldsSupplyType(prev => ({
                ...prev,
                descripcion: newValue, 
            }));
        }
        if(isKeyboardView === 'Search' ){
            setIsSearchTerm(newValue);
        }
        if(isKeyboardView === 'Limit' ){
            setIsTextFieldsSupplyType(prev => ({
                ...prev,
                limite: newValue, 
            }));
        }
    };
    useEffect(() => {
        isTouchRef.current = isTouch;
    }, [isTouch]);
    // UseEffect para agregar datos a la base de datos
    useEffect(() => {
        if(isSupplyTypeAdd){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Supply-Type',isLoggedUser.idusuario,isTextFieldsSupplyType.tipo.trim(),isTextFieldsSupplyType.descripcion.trim(),isTextFieldsSupplyType.unidad,isTextFieldsSupplyType.idcategoria,isTextFieldsSupplyType.limite);

                        resolve('¡MEALSYNC agregó al tipo de insumo!...');

                        setIsSupplyTypeAdd(false)

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
                    setIsSupplyTypeAdd(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'Agregando un tipo de insumo!...');
        }
    },[isSupplyTypeAdd]);
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <Container_Modal>
                    <Container_Form_500 ThemeMode={themeMode} className={currentMView === 'Tipo-Insumo-Agregar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Row_100_Center>
                            <Text_Title_32_Black ThemeMode={themeMode}>AGREGAR TIPO DE INSUMO</Text_Title_32_Black>
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
                                        id="Input-Type"
                                        placeholder="..."
                                        type="text"
                                        maxLength={150}
                                        disabled={isActionBlock}
                                        value={isTextFieldsSupplyType.tipo}
                                        onChange={(e) => setIsTextFieldsSupplyType(prev => ({...prev, tipo: e.target.value}))}
                                        onFocus={() => {
                                            if(isTouchRef.current){
                                                setIsKeyboard(true);
                                                setIsKeyboardView('Type');
                                            }
                                        }}
                                    />
                                    <Label_Total_Text_12_Center ThemeMode={themeMode}>{isTotalType}/150</Label_Total_Text_12_Center>
                                </Input_Group>
                                <Icon_Button_Blue_18 ThemeMode={themeMode} className="pulsate-buttom"
                                    onClick={() => {
                                        setIsTextFieldsSupplyType(prev => ({...prev, tipo: ''}))
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
                                        value={isTextFieldsSupplyType.descripcion}
                                        onChange={(e) => setIsTextFieldsSupplyType(prev => ({...prev, descripcion: e.target.value}))}
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
                                        setIsTextFieldsSupplyType(prev => ({...prev, descripcion: ''}))
                                    }}
                                    disabled={isActionBlock}
                                >
                                    <MdCancel/>
                                </Icon_Button_Blue_18>
                            </Container_Row_100_Center>
                        </Container_Column_90_Center>
                        <Container_Row_NG_95_Center>
                            <Text_Color_Blue_12 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_12>
                            <Text_Span_16_Center_Black ThemeMode={themeMode}>- Datos específicos...</Text_Span_16_Center_Black>
                        </Container_Row_NG_95_Center>
                        <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                            <Container_Row_NG_95_Center>
                                <Text_Color_Blue_12 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_12>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}>- Unidad...</Text_Span_16_Center_Black>
                            </Container_Row_NG_95_Center>
                            <Container_Row_100_Center>
                                {['Kilogramos','Litros'].map((item,index) => (
                                    <Label_Text_16_Center ThemeMode={themeMode} key={index}>
                                        <Input_Radio_16 ThemeMode={themeMode}
                                            type="radio"
                                            name="permissions"
                                            disabled={isActionBlock}
                                            value={item}
                                            checked={isTextFieldsSupplyType.unidad === item}
                                            onChange={(e) => setIsTextFieldsSupplyType(prev => ({...prev, unidad: e.target.value}))}
                                        />
                                        {item}
                                    </Label_Text_16_Center>
                                ))};
                            </Container_Row_100_Center>
                            <Container_Row_NG_95_Center>
                                <Text_Color_Blue_12 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_12>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}>- Categoría...</Text_Span_16_Center_Black>
                            </Container_Row_NG_95_Center>
                            {isSupplyCategories.length !== 0 ? (
                                <>
                                    <Container_Row_100_Center>
                                        <Icon_26><FcSearch/></Icon_26>
                                        <Input_Text_Black_50 ThemeMode={themeMode}
                                            id="Input-Search"
                                            type="text"
                                            placeholder="Buscar..."
                                            value={isSearchTerm}
                                            onChange={(e) => setIsSearchTerm(e.target.value)}
                                            onFocus={() => {
                                                if(isTouchRef.current){
                                                    setIsKeyboard(true);
                                                    setIsKeyboardView('Search');
                                                }
                                            }}
                                            disabled={isActionBlock}
                                        />
                                    </Container_Row_100_Center>
                                    {filteredRecordsSupplyCategories.length !== 0 ? (
                                        <>
                                            <Select
                                                options={filteredRecordsSupplyCategories.map((category) => ({
                                                    value: category.idcategoria,
                                                    label: category.nombre
                                                }))}
                                                styles={{
                                                    control: (provided) => ({
                                                        ...provided,
                                                        width: '300px',
                                                        padding: '6px',
                                                        border: '2px solid black',
                                                        cursor: 'pointer',
                                                        borderRadius: '20px',
                                                        fontFamily: 'Century Gothic',
                                                        fontStyle: 'normal',
                                                        fontSize: '18px',
                                                        '@media (max-width: 768px)':{
                                                            width: '250px',
                                                            padding: '4px',
                                                            fontSize: '16px',
                                                        },
                                                        '@media (max-width: 480px)':{
                                                            width: '200px',
                                                            padding: '2px',
                                                            fontSize: '14px',
                                                        },
                                                    }),
                                                    menu: (provided) => ({
                                                        ...provided,
                                                        overflow: 'hidden',
                                                        borderRadius:'15px',
                                                    }),
                                                    menuList: (provided) => ({
                                                        ...provided,
                                                        maxHeight:175,
                                                        fontFamily: 'Century Gothic',
                                                        fontStyle: 'normal',
                                                        overflowY:'auto',
                                                        scrollbarWidth: 'none',
                                                        '&::-webkit-scrollbar': {
                                                            display:'none',
                                                        },
                                                        '@media (max-width: 768px)':{
                                                            maxHeight:150,
                                                        },
                                                        '@media (max-width: 480px)':{
                                                            maxHeight:125,
                                                        },
                                                    })
                                                }}
                                                placeholder='Seleccione una...'
                                                value={filteredRecordsSupplyCategories
                                                    .map(category => ({ value: category.idcategoria, label: category.nombre }))
                                                    .find(option => option.value === isTextFieldsSupplyType.idcategoria)
                                                }
                                                onChange={(e) => setIsTextFieldsSupplyType(prev => ({...prev, idcategoria: e.value}))}
                                                isDisabled={isActionBlock}
                                            />
                                        </>
                                    ):(
                                        <>
                                            <Container_Row_95_Center>
                                                <Text_Span_20_Center_Black ThemeMode={themeMode}>No hay datos disponibles</Text_Span_20_Center_Black>
                                            </Container_Row_95_Center>
                                        </>
                                    )}
                                </>
                            ):(
                                <>
                                    <Container_Row_95_Center>
                                        <Text_Span_20_Center_Black ThemeMode={themeMode}>No hay datos disponibles</Text_Span_20_Center_Black>
                                    </Container_Row_95_Center>
                                </>
                            )}
                            <Container_Row_100_Center>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}>Cantidad Mínima (Kg/Lt):</Text_Span_16_Center_Black>
                                <Input_Group>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        id="Input-Limit"
                                        placeholder="..."
                                        type="text"
                                        disabled={isActionBlock}
                                        value={isTextFieldsSupplyType.limite}
                                        onChange={(e) => setIsTextFieldsSupplyType(prev => ({...prev, limite: e.target.value}))}
                                        onFocus={() => {
                                            if(isTouchRef.current){
                                                setIsKeyboard(true);
                                                setIsKeyboardView('Limit');
                                            }
                                        }}
                                    />
                                </Input_Group>
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
                                        onClick={() => handleSupplyTypeAdd()}
                                        disabled={isActionBlock}    
                                    >
                                        <Icon_White_22><IoIosAddCircle/></Icon_White_22>
                                    </Button_Icon_Green_210>
                                </span>
                            </Tooltip>
                        </Container_Row_95_Center>
                    </Container_Form_500>
                    {isKeyboard ? (
                        isKeyboardView === 'Type' || isKeyboardView === 'Description' || isKeyboardView === 'Search' ? (
                            <>
                                <Keyboard_Default value={isKeyboardView === 'Type' ? isTextFieldsSupplyType.tipo : isKeyboardView === 'Description' ?
                                    isTextFieldsSupplyType.descripcion : isSearchTerm} onChange={handleKeyboard}/>  
                            </>
                        ):(
                            <>
                                <Keyboard_Numeric value={isKeyboardView === 'Limit' ? isTextFieldsSupplyType.limite : ''} onChange={handleKeyboard}/>
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