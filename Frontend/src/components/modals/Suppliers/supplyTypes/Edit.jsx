//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useRef,useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,ModalContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { SearchTermContext } from "../../../../contexts/SearchsProvider";
import { ActionBlockContext,KeyboardContext,KeyboardViewContext,TouchContext } from "../../../../contexts/VariablesProvider";
import { TextFieldsSupplyTypesContext } from "../../../../contexts/FormsProvider";
import { SupplyCategoriesContext,SupplyTypeEditContext,DeletedSupplyCategoriesContext } from "../../../../contexts/SuppliersProvider";
import { RefKeyboardContext,RefSupplyTypesContext } from "../../../../contexts/RefsProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleModalViewSuppliers } from "../../../../hooks/suppliers/Views";
import { HandleSupplyTypeEdit } from "../../../../hooks/suppliers/Forms";
import { ResetSelectedTables } from "../../../../hooks/Texts";
import { TableActionsSupplyCategories } from "../../../../hooks/suppliers/Tables";
//__________ICONOS__________
// Icono para el buscador
import { FcSearch } from "react-icons/fc";
// Icono para realizar la función del modal
import { MdCancel } from "react-icons/md";
import { MdEdit } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Form_500,Container_Row_100_Center,Container_Column_100_Center,Container_Row_NG_Auto_Center } from "../../../styled/Containers";
import { Text_Title_32_Black,Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Span_20_Center_Black,Text_Span_12_Justify_Black } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Red_210 } from "../../../styled/Buttons";
import { Input_Text_100_Black,Input_Area_Black_100,Input_Group,Input_Radio_20,Input_Text_60_Black } from "../../../styled/Inputs";
import { Icon_20,Icon_Button_Blue_16,Icon_24 } from "../../../styled/Icons";
import { Alert_Sonner_Promise,Alert_Sonner_Warning } from "../../../styled/Alerts";
import { Label_Text_12_Black,Label_Total_Area_12_Center,Label_Button_16_Black } from "../../../styled/Labels";
// Componentes personalizados
import Error_Edit from "../../errors/Edit";
import Keyboard_Default from "../../../keyboards/Defaullt";
import Keyboard_Numeric from "../../../keyboards/Numeric";
//____________IMPORT/EXPORT____________

// Modal para editar tipos de insumo a su tabla
export default function Supply_Type_Edit(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(SearchTermContext);
    const [isSupplyCategories] = useContext(SupplyCategoriesContext);
    const [isDeletedSupplyCategories] = useContext(DeletedSupplyCategoriesContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [isSupplyTypeEdit,setIsSupplyTypeEdit] = useContext(SupplyTypeEditContext);
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
    const handleSupplyTypeEdit = HandleSupplyTypeEdit();
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
            Alert_Sonner_Warning('¡MEALSYNC ha alcanzado el límite de caracteres permitido en el nombre!...')
        }
    },[isTextFieldsSupplyType.tipo]);
    useEffect(() => {
        setIsTotalDescription(isTextFieldsSupplyType.descripcion.length);
        if(isTextFieldsSupplyType.descripcion.length === 250){
            Alert_Sonner_Warning('¡MEALSYNC ha alcanzado el límite de caracteres permitido en la descripción!...')
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
        if(isSupplyTypeEdit){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Update-Supply-Type',isLoggedUser.idusuario,isTextFieldsSupplyType.idtipo,isTextFieldsSupplyType.tipo.trim(),isTextFieldsSupplyType.descripcion.trim(),isTextFieldsSupplyType.unidad,isTextFieldsSupplyType.idcategoria,isTextFieldsSupplyType.limite);

                        resolve('¡MEALSYNC editó al tipo de insumo!...');

                        setIsSupplyTypeEdit(false)

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
                    setIsSupplyTypeEdit(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Sonner_Promise(promise,'Editando un tipo de insumo!...');
        }
    },[isSupplyTypeEdit]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <Container_Modal_Background_Black ref={Modal_Supply_Types}>
                    <Container_Form_500 ref={Form_Supply_Types} ThemeMode={themeMode} className={currentMView === 'Tipo-Insumo-Editar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Row_100_Center>
                            <Text_Title_32_Black ThemeMode={themeMode}>EDITAR TIPO DE INSUMO</Text_Title_32_Black>
                        </Container_Row_100_Center>
                        <Container_Row_NG_Auto_Center>
                            <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                            <Text_Span_16_Center_Black ThemeMode={themeMode}>- Datos generales...</Text_Span_16_Center_Black>
                        </Container_Row_NG_Auto_Center>
                        <Container_Column_100_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                            <Container_Row_100_Center>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}>Nombre:</Text_Span_16_Center_Black>
                                <Input_Group>
                                    <Input_Text_100_Black ThemeMode={themeMode}
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
                                    <Label_Text_12_Black ThemeMode={themeMode}>{isTotalType}/150</Label_Text_12_Black>
                                </Input_Group>
                                <Icon_Button_Blue_16 ThemeMode={themeMode} className="pulsate-buttom"
                                    onClick={() => {
                                        setIsTextFieldsSupplyType(prev => ({...prev, tipo: ''}))
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
                                <Icon_Button_Blue_16 ThemeMode={themeMode} className="pulsate-buttom"
                                    onClick={() => {
                                        setIsTextFieldsSupplyType(prev => ({...prev, descripcion: ''}))
                                    }}
                                    disabled={isActionBlock}
                                >
                                    <MdCancel/>
                                </Icon_Button_Blue_16>
                            </Container_Row_100_Center>
                        </Container_Column_100_Center>
                        <Container_Row_NG_Auto_Center>
                            <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                            <Text_Span_16_Center_Black ThemeMode={themeMode}>- Datos específicos...</Text_Span_16_Center_Black>
                        </Container_Row_NG_Auto_Center>
                        <Container_Column_100_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                            <Container_Row_NG_Auto_Center>
                                <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}>- Unidad...</Text_Span_16_Center_Black>
                            </Container_Row_NG_Auto_Center>
                            <Container_Row_100_Center>
                                {['Kilogramos','Litros'].map((item,index) => (
                                    <Label_Button_16_Black ThemeMode={themeMode} key={index}>
                                        <Input_Radio_20 ThemeMode={themeMode}
                                            type="radio"
                                            name="permissions"
                                            disabled={isActionBlock}
                                            value={item}
                                            checked={isTextFieldsSupplyType.unidad === item}
                                            onChange={(e) => setIsTextFieldsSupplyType(prev => ({...prev, unidad: e.target.value}))}
                                        />
                                        {item}
                                    </Label_Button_16_Black>
                                ))};
                            </Container_Row_100_Center>
                            <Container_Row_NG_Auto_Center>
                                <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}>- Categoría...</Text_Span_16_Center_Black>
                            </Container_Row_NG_Auto_Center>
                            {isSupplyCategories.length !== 0 ? (
                                isDeletedSupplyCategories.some(category => category.idcategoria === isTextFieldsSupplyType.idcategoria) ? (
                                    <>
                                        <Container_Row_100_Center>
                                            <Text_Span_16_Center_Black ThemeMode={themeMode}>{isSupplyCategories.find(category => category.idcategoria === isTextFieldsSupplyType.idcategoria)?.nombre || 'Desconocida...'}</Text_Span_16_Center_Black>
                                        </Container_Row_100_Center>
                                    </>
                                ):(
                                        <>
                                        <Container_Row_100_Center>
                                            <Icon_24><FcSearch/></Icon_24>
                                            <Input_Text_60_Black ThemeMode={themeMode}
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
                                                <Container_Row_100_Center>
                                                    <Text_Span_20_Center_Black ThemeMode={themeMode}>No hay datos disponibles</Text_Span_20_Center_Black>
                                                </Container_Row_100_Center>
                                            </>
                                        )}
                                    </>
                                )
                            ):(
                                <>
                                    <Container_Row_100_Center>
                                        <Text_Span_20_Center_Black ThemeMode={themeMode}>No hay datos disponibles</Text_Span_20_Center_Black>
                                    </Container_Row_100_Center>
                                </>
                            )}
                            <Container_Row_100_Center>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}>Cantidad Mínima (Kg/Lt):</Text_Span_16_Center_Black>
                                <Input_Group>
                                    <Input_Text_100_Black ThemeMode={themeMode}
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
                        </Container_Column_100_Center>
                        <Container_Row_100_Center>
                            <Text_Span_12_Justify_Black ThemeMode={themeMode}>Es importante recordar la modificación del nombre, ya que este se emplea para identificar los almacenes de los insumos agregados a este tipo, agregarle cantidades o para registrar nuevos insumos a su nombre. La modificación de la categoría puede afectar los resultados finales del inventario. La modificación de la cantidad mínima puede afectar las alertas de pocos insumos de este tipo.</Text_Span_12_Justify_Black>
                        </Container_Row_100_Center>
                        <Container_Row_100_Center>
                            <Tooltip title='Cancelar' placement='top'>
                                <span>
                                    <Button_Icon_Red_210 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalViewSuppliers('')}
                                        disabled={isActionBlock}    
                                    >
                                        <Icon_20><MdCancel/></Icon_20>
                                    </Button_Icon_Red_210>
                                </span>
                            </Tooltip>
                            <Tooltip title='Editar' placement='top'>
                                <span>
                                    <Button_Icon_Blue_210 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleSupplyTypeEdit()}
                                        disabled={isActionBlock}    
                                    >
                                        <Icon_20><MdEdit/></Icon_20>
                                    </Button_Icon_Blue_210>
                                </span>
                            </Tooltip>
                        </Container_Row_100_Center>
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
                </Container_Modal_Background_Black>
            ):(
                currentMView === 'Tipo-Insumo-Editar' ? (
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