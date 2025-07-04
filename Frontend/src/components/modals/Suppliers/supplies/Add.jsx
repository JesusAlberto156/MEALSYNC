//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useRef,useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,ModalContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { SearchTerm1Context,SearchTerm2Context,SearchTerm3Context } from "../../../../contexts/SearchsProvider";
import { ActionBlockContext,KeyboardContext,KeyboardViewContext,TouchContext } from "../../../../contexts/VariablesProvider";
import { TextFieldsSupplyContext } from "../../../../contexts/FormsProvider";
import { SuppliersContext,SupplyCategoriesContext,SupplyTypesContext,SupplyAddContext } from "../../../../contexts/SuppliersProvider";
import { RefKeyboardContext } from "../../../../contexts/RefsProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleModalViewSuppliers } from "../../../../hooks/suppliers/Views";
import { HandleSupplyAdd,FilteredRecordsSuppliers,FilteredRecordsSupplyCategories,FilteredRecordsSupplyTypes,FilteredRecordsCountSupplyTypes } from "../../../../hooks/suppliers/Forms";
import { ResetSelectedTables } from "../../../../hooks/Texts";
//__________ICONOS__________
// Icono para el buscador
import { FcSearch } from "react-icons/fc";
// Icono para realizar la función del modal
import { MdCancel } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Row_95_Center,Container_Column_90_Center,Container_Row_100_Center,Container_Row_NG_95_Center } from "../../../styled/Containers";
import { Text_Title_32_Black,Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Span_20_Center_Black } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Green_210 } from "../../../styled/Buttons";
import { Input_Text_Black_100,Input_Area_Black_100,Input_Group,Input_Text_Black_50 } from "../../../styled/Inputs";
import { Icon_White_22,Icon_Button_Blue_16,Icon_26 } from "../../../styled/Icons";
import { Alert_Verification,Alert_Sonner_Warning } from "../../../styled/Alerts";
import { Label_Text_12_Black,Label_Total_Area_12_Center } from "../../../styled/Labels";
// Componentes personalizados
import Keyboard_Default from "../../../keyboards/Defaullt";
//____________IMPORT/EXPORT____________

// Modal para agregar insumos a su tabla
export default function Supply_Add(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSearchTerm1,setIsSearchTerm1] = useContext(SearchTerm1Context);
    const [isSearchTerm2,setIsSearchTerm2] = useContext(SearchTerm2Context);
    const [isSearchTerm3,setIsSearchTerm3] = useContext(SearchTerm3Context);
    const [isSuppliers] = useContext(SuppliersContext);
    const [isSupplyCategories] = useContext(SupplyCategoriesContext);
    const [isSupplyTypes] = useContext(SupplyTypesContext); 
    const [isSupplyAdd,setIsSupplyAdd] = useContext(SupplyAddContext);
    const [isTextFieldsSupply,setIsTextFieldsSupply] = useContext(TextFieldsSupplyContext);
    const [socket] = useContext(SocketContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const [isTouch,setIsTouch] = useContext(TouchContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewSuppliers = HandleModalViewSuppliers();
    const handleSupplyAdd = HandleSupplyAdd();
    const resetSelectedTables = ResetSelectedTables();
    const filteredRecordsSuppliers = FilteredRecordsSuppliers();
    const filteredRecordsSupplyCategories = FilteredRecordsSupplyCategories();
    const filteredRecordsSupplyTypes = FilteredRecordsSupplyTypes();
    const filteredRecordsCountSupplyTypes = FilteredRecordsCountSupplyTypes();
    // Constantes con el valor de useState
    const [isTotalDescription,setIsTotalDescription] = useState(0)
    const [isTotalName,setIsTotalName] = useState(0)
    const [isTotalImage,setIsTotalImage] = useState(0)
    // Constantes con el valor de useRef
    const lastTouchTimeRef = useRef(0);
    const isTouchRef = useRef(isTouch);
    // useEffect para resetiar los select
    useEffect(() => {
        setIsTextFieldsSupply(prev => ({
            ...prev,
            idtipo: 0,
            idcantidad: 0,
        }))
    },[isTextFieldsSupply.idcategoria]);
    useEffect(() => {
        setIsTextFieldsSupply(prev => ({
            ...prev,
            idcantidad: 0,
        }))
    },[isTextFieldsSupply.idtipo]);
    // useEffect para calcular el total escrito en los campos
    useEffect(() => {
        setIsTotalName(isTextFieldsSupply.nombre.length);
        if(isTextFieldsSupply.nombre.length === 150){
            Alert_Sonner_Warning('¡MEALSYNC ha alcanzado el límite de caracteres permitido en el nombre!...')
        }
    },[isTextFieldsSupply.nombre]);
    useEffect(() => {
        setIsTotalDescription(isTextFieldsSupply.descripcion.length);
        if(isTextFieldsSupply.descripcion.length === 250){
            Alert_Sonner_Warning('¡MEALSYNC ha alcanzado el límite de caracteres permitido en la descripción!...')
        }
    },[isTextFieldsSupply.descripcion]);
    useEffect(() => {
        setIsTotalImage(isTextFieldsSupply.imagen.length);
        if(isTextFieldsSupply.imagen.length === 10000){
            Alert_Sonner_Warning('¡MEALSYNC ha alcanzado el límite de caracteres permitido en la imagen!...')
        }
    },[isTextFieldsSupply.imagen]);
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
                const inputImage = document.getElementById("Input-Image");
                const inputSearch1 = document.getElementById("Input-Search-1");
                const inputSearch2 = document.getElementById("Input-Search-2");
                const inputSearch3 = document.getElementById("Input-Search-3");
                const keyboard = Keyboard.current && Keyboard.current.contains(event.target);
    
                const clickInsideInputs = 
                    (inputName && inputName.contains(event.target)) ||
                    (inputDescription && inputDescription.contains(event.target)) ||
                    (inputImage && inputImage.contains(event.target)) ||
                    (inputSearch1 && inputSearch1.contains(event.target)) ||
                    (inputSearch2 && inputSearch2.contains(event.target)) ||
                    (inputSearch3 && inputSearch3.contains(event.target));
    
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
            setIsTextFieldsSupply(prev => ({
                ...prev,
                nombre: newValue, 
            }));
        }
        if(isKeyboardView === 'Description' ){
            setIsTextFieldsSupply(prev => ({
                ...prev,
                descripcion: newValue, 
            }));
        }
        if(isKeyboardView === 'Image' ){
            setIsTextFieldsSupply(prev => ({
                ...prev,
                imagen: newValue, 
            }));
        }
        if(isKeyboardView === 'Search 1' ){
            setIsSearchTerm1(newValue);
        }
        if(isKeyboardView === 'Search 2' ){
            setIsSearchTerm2(newValue);
        }
        if(isKeyboardView === 'Search 3' ){
            setIsSearchTerm3(newValue);
        }
    };
    useEffect(() => {
        isTouchRef.current = isTouch;
    }, [isTouch]);
    // UseEffect para agregar datos a la base de datos
    useEffect(() => {
        if(isSupplyAdd){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Supply',isLoggedUser.idusuario,isTextFieldsSupply.nombre.trim(),isTextFieldsSupply.descripcion.trim(),isTextFieldsSupply.imagen,isTextFieldsSupply.idproveedor,isTextFieldsSupply.idtipo,isTextFieldsSupply.idcategoria,isTextFieldsSupply.idcantidad);

                        resolve('¡MEALSYNC agregó al insumo!...');

                        setIsSupplyAdd(false)

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
                    setIsSupplyAdd(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'Agregando un insumo!...');
        }
    },[isSupplyAdd]);
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <Container_Modal>
                    <Container_Form_500 ThemeMode={themeMode} className={currentMView === 'Insumo-Agregar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Row_100_Center>
                            <Text_Title_32_Black ThemeMode={themeMode}>AGREGAR INSUMO</Text_Title_32_Black>
                        </Container_Row_100_Center>
                        <Container_Row_NG_95_Center>
                            <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
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
                                        value={isTextFieldsSupply.nombre}
                                        onChange={(e) => setIsTextFieldsSupply(prev => ({...prev, nombre: e.target.value}))}
                                        onFocus={() => {
                                            if(isTouchRef.current){
                                                setIsKeyboard(true);
                                                setIsKeyboardView('Name');
                                            }
                                        }}
                                    />
                                    <Label_Text_12_Black ThemeMode={themeMode}>{isTotalName}/150</Label_Text_12_Black>
                                </Input_Group>
                                <Icon_Button_Blue_16 ThemeMode={themeMode} className="pulsate-buttom"
                                    onClick={() => {
                                        setIsTextFieldsSupply(prev => ({...prev, nombre: ''}))
                                    }}
                                    disabled={isActionBlock}
                                >
                                    <MdCancel/>
                                </Icon_Button_Blue_16>
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
                                        value={isTextFieldsSupply.descripcion}
                                        onChange={(e) => setIsTextFieldsSupply(prev => ({...prev, descripcion: e.target.value}))}
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
                                <Icon_Button_Blue_16 ThemeMode={themeMode} className="pulsate-buttom"
                                    onClick={() => {
                                        setIsTextFieldsSupply(prev => ({...prev, descripcion: ''}))
                                    }}
                                    disabled={isActionBlock}
                                >
                                    <MdCancel/>
                                </Icon_Button_Blue_16>
                            </Container_Row_100_Center>
                            <Container_Row_100_Center>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}>Imagen (URL):</Text_Span_16_Center_Black>
                                <Input_Group>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        id="Input-Image"
                                        placeholder="(Opcional)..."
                                        type="text"
                                        maxLength={10000}
                                        disabled={isActionBlock}
                                        value={isTextFieldsSupply.imagen}
                                        onChange={(e) => setIsTextFieldsSupply(prev => ({...prev, imagen: e.target.value}))}
                                        onFocus={() => {
                                            if(isTouchRef.current){
                                                setIsKeyboard(true);
                                                setIsKeyboardView('Image');
                                            }
                                        }}
                                    />
                                    <Label_Text_12_Black ThemeMode={themeMode}>{isTotalImage}/10000</Label_Text_12_Black>
                                </Input_Group>
                                <Icon_Button_Blue_16 ThemeMode={themeMode} className="pulsate-buttom"
                                    onClick={() => {
                                        setIsTextFieldsSupply(prev => ({...prev, imagen: ''}))
                                    }}
                                    disabled={isActionBlock}
                                >
                                    <MdCancel/>
                                </Icon_Button_Blue_16>
                            </Container_Row_100_Center>
                        </Container_Column_90_Center>
                        <Container_Row_NG_95_Center>
                            <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                            <Text_Span_16_Center_Black ThemeMode={themeMode}>- Datos específicos...</Text_Span_16_Center_Black>
                        </Container_Row_NG_95_Center>
                        <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                            <Container_Row_NG_95_Center>
                                <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}>- Proveedor...</Text_Span_16_Center_Black>
                            </Container_Row_NG_95_Center>
                            {isSuppliers.length !== 0 ? (
                                <>
                                    <Container_Row_100_Center>
                                        <Icon_26><FcSearch/></Icon_26>
                                        <Input_Text_Black_50 ThemeMode={themeMode}
                                            id="Input-Search-1"
                                            type="text"
                                            placeholder="Buscar..."
                                            value={isSearchTerm1}
                                            onChange={(e) => setIsSearchTerm1(e.target.value)}
                                            onFocus={() => {
                                                if(isTouchRef.current){
                                                    setIsKeyboard(true);
                                                    setIsKeyboardView('Search 1');
                                                }
                                            }}
                                            disabled={isActionBlock}
                                        />
                                    </Container_Row_100_Center>
                                    {filteredRecordsSuppliers.length !== 0 ? (
                                        <>
                                            <Select
                                                options={filteredRecordsSuppliers.map((supplier) => ({
                                                    value: supplier.idproveedor,
                                                    label: supplier.nombre
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
                                                value={filteredRecordsSuppliers
                                                    .map(supplier => ({ value: supplier.idproveedor, label: supplier.nombre }))
                                                    .find(option => option.value === isTextFieldsSupply.idproveedor)
                                                }
                                                onChange={(e) => setIsTextFieldsSupply(prev => ({...prev, idproveedor: e.value}))}
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
                            <Container_Row_NG_95_Center>
                                <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}>- Categoría...</Text_Span_16_Center_Black>
                            </Container_Row_NG_95_Center>
                            {isSupplyCategories.length !== 0 ? (
                                <>
                                    <Container_Row_100_Center>
                                        <Icon_26><FcSearch/></Icon_26>
                                        <Input_Text_Black_50 ThemeMode={themeMode}
                                            id="Input-Search-2"
                                            type="text"
                                            placeholder="Buscar..."
                                            value={isSearchTerm2}
                                            onChange={(e) => setIsSearchTerm2(e.target.value)}
                                            onFocus={() => {
                                                if(isTouchRef.current){
                                                    setIsKeyboard(true);
                                                    setIsKeyboardView('Search 2');
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
                                                    .find(option => option.value === isTextFieldsSupply.idcategoria)
                                                }
                                                onChange={(e) => setIsTextFieldsSupply(prev => ({...prev, idcategoria: e.value}))}
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
                            <Container_Row_NG_95_Center>
                                <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}>- Tipo de insumo...</Text_Span_16_Center_Black>
                            </Container_Row_NG_95_Center>
                            {isTextFieldsSupply.idcategoria !== 0 ? (
                                <>
                                    <Container_Row_100_Center>
                                        <Icon_26><FcSearch/></Icon_26>
                                        <Input_Text_Black_50 ThemeMode={themeMode}
                                            id="Input-Search-3"
                                            type="text"
                                            placeholder="Buscar..."
                                            value={isSearchTerm3}
                                            onChange={(e) => setIsSearchTerm3(e.target.value)}
                                            onFocus={() => {
                                                if(isTouchRef.current){
                                                    setIsKeyboard(true);
                                                    setIsKeyboardView('Search 3');
                                                }
                                            }}
                                            disabled={isActionBlock}
                                        />
                                    </Container_Row_100_Center>
                                    {filteredRecordsSupplyTypes.length !== 0 ? (
                                        <>
                                            <Select
                                                options={filteredRecordsSupplyTypes.map((type) => ({
                                                    value: type.idtipo,
                                                    label: type.tipo
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
                                                placeholder='Seleccione un...'
                                                value={filteredRecordsSupplyTypes
                                                    .map(type => ({ value: type.idtipo, label: type.tipo }))
                                                    .find(option => option.value === isTextFieldsSupply.idtipo) || null
                                                }
                                                onChange={(e) => setIsTextFieldsSupply(prev => ({...prev, idtipo: e.value}))}
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
                            <Container_Row_NG_95_Center>
                                <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}>- Cantidad...</Text_Span_16_Center_Black>
                            </Container_Row_NG_95_Center>
                            {isTextFieldsSupply.idtipo !== 0 ? (
                                filteredRecordsCountSupplyTypes.length !== 0 ? (
                                    <>
                                        <Select
                                            options={filteredRecordsCountSupplyTypes.map((count) => ({
                                                value: count.idcantidad,
                                                label: `${count.cantidad} ${isSupplyTypes.find(type => type.idtipo === isTextFieldsSupply.idtipo)?.unidad}`
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
                                                    maxHeight:125,
                                                    fontFamily: 'Century Gothic',
                                                    fontStyle: 'normal',
                                                    overflowY:'auto',
                                                    scrollbarWidth: 'none',
                                                    '&::-webkit-scrollbar': {
                                                        display:'none',
                                                    },
                                                    '@media (max-width: 768px)':{
                                                        maxHeight:100,
                                                    },
                                                    '@media (max-width: 480px)':{
                                                        maxHeight:75,
                                                    },
                                                })
                                            }}
                                            placeholder='Seleccione una...'
                                            value={filteredRecordsCountSupplyTypes.filter(count => count.idtipo === isTextFieldsSupply.idtipo)
                                                .map(c => ({ value: c.idcantidad, label: `${c.cantidad} ${isSupplyTypes.find(type => type.idtipo === isTextFieldsSupply.idtipo)?.unidad}` }))
                                                .find(option => option.value === isTextFieldsSupply.idcantidad) || null
                                            }
                                            onChange={(e) => setIsTextFieldsSupply(prev => ({...prev, idcantidad: e.value}))}
                                            isDisabled={isActionBlock}
                                        />
                                    </>
                                ):(
                                    <>
                                        <Container_Row_95_Center>
                                            <Text_Span_20_Center_Black ThemeMode={themeMode}>No hay datos disponibles</Text_Span_20_Center_Black>
                                        </Container_Row_95_Center>
                                    </>
                                )
                            ):(
                                <>
                                    <Container_Row_95_Center>
                                        <Text_Span_20_Center_Black ThemeMode={themeMode}>No hay datos disponibles</Text_Span_20_Center_Black>
                                    </Container_Row_95_Center>
                                </>
                            )}
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
                                        onClick={() => handleSupplyAdd()}
                                        disabled={isActionBlock}    
                                    >
                                        <Icon_White_22><IoIosAddCircle/></Icon_White_22>
                                    </Button_Icon_Green_210>
                                </span>
                            </Tooltip>
                        </Container_Row_95_Center>
                    </Container_Form_500>
                    {isKeyboard ? (
                        <>
                            <Keyboard_Default value={isKeyboardView === 'Name' ? isTextFieldsSupply.nombre : 
                                                    isKeyboardView === 'Description' ? isTextFieldsSupply.descripcion : 
                                                    isKeyboardView === 'Image' ? isTextFieldsSupply.imagen : 
                                                    isKeyboardView === 'Search 1' ? isSearchTerm1 :
                                                    isKeyboardView === 'Search 2' ? isSearchTerm2 : 
                                                    isSearchTerm3} onChange={handleKeyboard}/>  
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