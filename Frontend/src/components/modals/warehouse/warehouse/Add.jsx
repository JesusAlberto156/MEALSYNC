//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
import Select from "react-select";
import DatePicker from 'react-datepicker';
import { es } from "date-fns/locale";
// Contextos
import { SocketContext } from "../../../../contexts/SocketProvider";
import { ModalContext,ThemeModeContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { TextFieldsUnitsContext,TextFieldsWarehouseContext } from "../../../../contexts/FormsProvider";
import { ActionBlockContext } from "../../../../contexts/VariablesProvider";
import { SearchTerm1Context,SearchTerm2Context } from "../../../../contexts/SearchsProvider";
import { UnitAddContext,UnitsContext,SuppliesContext } from "../../../../contexts/WarehouseProvider";
import { SuppliersContext } from "../../../../contexts/SuppliersProvider";
// Hooks personalizados
import { ResetTextFieldsUnit,ResetSearchTerms } from "../../../../hooks/Texts";
import { HandleModalView } from "../../../../hooks/Views";
import { HandleUnitAdd,FilteredRecordsSuppliers } from "../../../../hooks/Form";
//__________ICONOS__________
// Icono para el buscador
import { FcSearch } from "react-icons/fc";
// Iconos para agregar/eliminar insumos
import { LuPackagePlus } from "react-icons/lu";
import { LuPackageMinus } from "react-icons/lu";
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { IoIosAddCircle } from "react-icons/io";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Row_100_Center,Container_Column_100_Center,Container_Row_100_Right,Container_Column_Border_90_Center,Container_Column_100_Center,Container_Column_Blue_Width_95_Center,Container_Row_100_Center,Container_Row_NG_Auto_Center, Container_Row_NG_100_Center } from "../../../styled/Containers";
import { Text_Title_32_Black,Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Span_20_Center_Black,Text_Span_24_Center,Text_Span_16_Center_Black } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Green_210,Button_Icon_Green_60,Button_Icon_Red_60 } from "../../../styled/Buttons";
import { Icon_20,Icon_20, Icon_20 } from "../../../styled/Icons";
import { Input_Text_100_Black,Input_Text_60_Black,Input_Radio_20 } from "../../../styled/Inputs";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
import { Label_Button_16_Black } from "../../../styled/Labels";
import { Calendar_Input_Custom_Black } from "../../../styled/Calendars";
//____________IMPORT/EXPORT____________

// Modal para agregar mediciones
export default function Warehouse_Add(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isTextFieldsUnits,setIsTextFieldsUnits] = useContext(TextFieldsUnitsContext);
    const [isTextFieldsWarehouse,setIsTextFieldsWarehouse] = useContext(TextFieldsWarehouseContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isUnitAdd,setIsUnitAdd] = useContext(UnitAddContext);
    const [socket] = useContext(SocketContext);
    const [isUnits] = useContext(UnitsContext);
    const [isSupplies] = useContext(SuppliesContext);
    const [isSuppliers] = useContext(SuppliersContext);
    const [isSearchTerm1,setIsSearchTerm1] = useContext(SearchTerm1Context);
    const [isSearchTerm2,setIsSearchTerm2] = useContext(SearchTerm2Context);
    // Constantes con el valor de los useState
    const [isStateDate,setIsStateDate] = useState('');
    const [isState,setIsState] = useState('');
    const [filteredUnits,setFilteredUnits] = useState(null);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const handleUnitAdd = HandleUnitAdd();
    const resetTextFieldsUnit = ResetTextFieldsUnit();
    const resetSearchTerms = ResetSearchTerms();
    const filteredRecordsSuppliers = FilteredRecordsSuppliers();
    // UseEffect para agregar datos a la base de datos
    useEffect(() => {
        if(isUnitAdd){
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Unit-Insert',isTextFieldsUnits.extent.trim(),isTextFieldsUnits.unit,isTextFieldsUnits.amount);
                        
                        resolve('¡MEALSYNC agregó la medida!...');

                        const route = sessionStorage.getItem('Route');

                        setCurrentMView('');
                        sessionStorage.setItem('Modal-View','');
                        setTimeout(() => {
                            setIsModal(false);
                            sessionStorage.setItem('Modal',false);
                            resetTextFieldsUnit();
                            setIsActionBlock(false);
                            setIsUnitAdd(false);
                            resetSearchTerms();
                            navigate(route,{ replace: true });
                        },750);
                    },2000);
                }catch(error){
                    setIsActionBlock(false);
                    setIsUnitAdd(false);
                    return reject('¡Ocurrio un error inesperado agregando la medida!...');
                }
            });

            Alert_Sonner_Promise(promise,'¡Agregando una medida!...');
        }
    },[isUnitAdd]);
    // UseEffect para quitar la suscrpcion de socket
    useEffect(() => {
        const handleUnitInsert = (message,user) => {
            console.log(message,user);
            socket.emit('Units');
        };

        socket.on('Unit-Insert',handleUnitInsert);
        
        return () => {
            socket.off('Unit-Insert',handleUnitInsert);
        }
    },[socket])
    // UseEffect para ver el estado de los datos generales
    useEffect(() => {
        if(isState === 'Nuevo' || isState === 'Existente'){
            setIsTextFieldsUnits(prev => ({
                ...prev, 
                extent: '',
                unit: '',
            }));
        }
    },[isState])
    // UseEffect para filtrar datos de los tipos de insumos 
    useEffect(() => {
        if(isUnits.length !== 0){
            const uniqueByMedida = isUnits.filter(
                (item, index, self) =>
                    index === self.findIndex((t) => t.nombre === item.medida)
            );
    
            const filtered = uniqueByMedida.filter((item) =>
                item.nombre.toLowerCase().includes(isSearchTerm2.toLowerCase())
            );
    
            setFilteredUnits(filtered);
        }
    },[isUnits,isSearchTerm2]);
    // UseEffect para obtener la hora a tiepo real
    useEffect(() => {
        if(isStateDate === 'Automática'){
            const interval = setInterval(() => {
                setIsTextFieldsWarehouse((prev) => ({
                    ...prev,
                    dateA: getFormattedDateTime()
                }));
            }, 1000);

            return () => clearInterval(interval);
        }
    },[isStateDate])
    // UseEffect para reiniciar los campos de las fechas
    useEffect(() => {
        if(isStateDate === 'Automática'){
            setIsTextFieldsWarehouse((prev) => ({
                ...prev,
                dateP: null,
                hour: '',
                minutes: '',
            }));
        }
        if(isStateDate === 'Personalizada'){
            setIsTextFieldsWarehouse((prev) => ({
                ...prev,
                dateA: ''
            }));
        }
    },[isStateDate])
    // Funcion para formatear la fecha
    function getFormattedDateTime() {
        const now = new Date();
        const pad = (n) => n.toString().padStart(2, '0');
        const year = now.getFullYear();
        const month = pad(now.getMonth() + 1);
        const day = pad(now.getDate());
        const hours = pad(now.getHours());
        const minutes = pad(now.getMinutes());
        const seconds = pad(now.getSeconds());
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    // Funcion para agregar un nuevo insumo
    const addSupply = () => {
        const newSupply = {
            idsupply: 0,
            idsupplier: 0,
            amount: 0,
            unitprice: '',
            price: 0,
        }
        setIsTextFieldsWarehouse({
            ...isTextFieldsWarehouse,
            supplies: [...isTextFieldsWarehouse.supplies, newSupply],
        })
    }
    // Funcion para eliminar un insumo de la lista
    const deleteSupply = (index) => {
        const updatedSupplies = [...isTextFieldsWarehouse.supplies];
        updatedSupplies.splice(index,1);
        setIsTextFieldsWarehouse({
            ...isTextFieldsWarehouse,
            supplies: updatedSupplies,
        })
    }
    // Estructura del componente
    return (
        <>
            {isModal ? (
                <>
                    <Container_Modal>
                        <Container_Form_500 ThemeMode={themeMode} className={currentMView === 'Warehouse-Add' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Row_100_Center>
                                <Text_Title_32_Black ThemeMode={themeMode}>AGREGAR PEDIDO PARA EL INVENTARIO</Text_Title_32_Black>
                            </Container_Row_100_Center>
                            <Container_Column_100_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black ThemeMode={themeMode}>- Selección de fecha...</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_100_Center>
                                    {['Automática','Personalizada'].map((item,index) => (
                                        <Label_Button_16_Black ThemeMode={themeMode} key={index}>
                                            <Input_Radio_20 ThemeMode={themeMode}
                                                type="radio"
                                                name="state"
                                                value={item}
                                                checked={isStateDate === item}
                                                onChange={(e) => setIsStateDate(e.target.value)}
                                            />
                                            {item}
                                        </Label_Button_16_Black>
                                    ))};
                                </Container_Row_100_Center>
                                {isStateDate === 'Automática' ? (
                                    <>
                                        <Container_Row_100_Center>
                                            <Input_Text_100_Black ThemeMode={themeMode}
                                                placeholder="..."
                                                type="text"
                                                value={isTextFieldsWarehouse.dateA}
                                                disabled
                                            />
                                        </Container_Row_100_Center>
                                    </>
                                ):(
                                    <></>
                                )}
                                {isStateDate === 'Personalizada' ? (
                                    <>
                                        <Container_Row_NG_100_Center>
                                            <DatePicker
                                                selected={isTextFieldsWarehouse.dateP instanceof Date ? isTextFieldsWarehouse.dateP : null}
                                                onChange={(date) => {
                                                    if(isStateDate === 'Personalizada'){
                                                        setIsTextFieldsWarehouse((prev) => ({
                                                            ...prev,
                                                            dateP: date,
                                                        }))
                                                    }
                                                }}
                                                dateFormat={'dd/MM/yyyy'}
                                                locale={es}
                                                placeholderText="Seleccione una fecha"
                                                timeIntervals={15}
                                                isClearable={true}
                                                popperPlacement="bottom-center"
                                                customInput={<Calendar_Input_Custom_Black/>}
                                                renderCustomHeader={({
                                                    date,
                                                    changeYear,
                                                    changeMonth,
                                                }) => (
                                                    <div style={{
                                                        background:'rgb(58,93,174)',
                                                        border: '4px solid white',
                                                        borderRadius: '30px',
                                                    }}>
                                                        <Container_Column_100_Center>
                                                            <Text_Span_24_Center>Selecciona Año y Mes</Text_Span_24_Center>
                                                            <Container_Row_100_Center>
                                                                <select
                                                                    value={date.getFullYear()}
                                                                    onChange={({ target: { value } }) => changeYear(value)}
                                                                    style={{
                                                                        fontFamily: 'Century Gothic',
                                                                        fontSize: '16px',
                                                                        borderRadius: '15px',
                                                                        padding:'5px',
                                                                        background: 'white',
                                                                        border: '1px solid black',
                                                                    }}
                                                                >
                                                                    {Array.from({ length: 100 }, (_, i) => {
                                                                    const year = new Date().getFullYear() - 50 + i;
                                                                    return <option key={year} value={year}>{year}</option>;
                                                                    })}
                                                                </select>
                                                                <select
                                                                    value={date.getMonth()}
                                                                    onChange={({ target: { value } }) => changeMonth(value)}
                                                                    style={{
                                                                        fontFamily: 'Century Gothic',
                                                                        fontSize: '16px',
                                                                        borderRadius: '15px',
                                                                        padding:'5px',
                                                                        background: 'white',
                                                                        border: '1px solid black',
                                                                    }}
                                                                >
                                                                    {Array.from({ length: 12 }, (_, i) => (
                                                                    <option key={i} value={i}>
                                                                        {new Date(0, i).toLocaleString("es", { month: "long" }).toUpperCase()}
                                                                    </option>
                                                                    ))}
                                                                </select>
                                                            </Container_Row_100_Center>
                                                        </Container_Column_100_Center>
                                                    </div>
                                                )}
                                            />
                                            <Text_Span_16_Center_Black ThemeMode={themeMode}>Hora: </Text_Span_16_Center_Black>
                                            <select
                                                style={{
                                                    padding: '10px',
                                                    borderRadius: '15px',
                                                    border: themeMode ? '1px solid black' : '1px solid white',
                                                    borderBottom: themeMode ? '3px solid black' : '3px solid white',
                                                    fontFamily: 'Century Gothic',
                                                    fontSize: '16px',
                                                }}
                                                value={isTextFieldsWarehouse.hour}
                                                onChange={(e) => {
                                                    setIsTextFieldsWarehouse((prev) => ({
                                                        ...prev,
                                                        hour: e.target.value,
                                                    }));
                                                }}
                                            >
                                                {Array.from({ length: 24 }, (_, i) => {
                                                    const hour = i.toString().padStart(2, '0');
                                                    return (
                                                        <option key={i} value={hour}>
                                                            {hour}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            <Text_Span_16_Center_Black ThemeMode={themeMode}>:</Text_Span_16_Center_Black>
                                            <select
                                                style={{
                                                    padding: '10px',
                                                    borderRadius: '15px',
                                                    border: themeMode ? '1px solid black' : '1px solid white',
                                                    borderBottom: themeMode ? '3px solid black' : '3px solid white',
                                                    fontFamily: 'Century Gothic',
                                                    fontSize: '16px',
                                                }}
                                                value={isTextFieldsWarehouse.minutes}
                                                onChange={(e) => {
                                                    setIsTextFieldsWarehouse((prev) => ({
                                                        ...prev,
                                                        minutes: e.target.value,
                                                    }));
                                                }}
                                            >
                                                {Array.from({ length: 60 }, (_, i) => {
                                                    const hour = i.toString().padStart(2, '0');
                                                    return (
                                                        <option key={i} value={hour}>
                                                            {hour}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </Container_Row_NG_100_Center>
                                        
                                    </>
                                ):(
                                    <></>
                                )}
                            </Container_Column_100_Center>
                            {isTextFieldsWarehouse.supplies.map((supply,index) => (
                                <Container_Column_Border_90_Center key={index} ThemeMode={themeMode}>
                                    <Container_Row_100_Right>
                                        <Text_Span_20_Center_Black ThemeMode={themeMode}>INSUMO NO. {index+1}</Text_Span_20_Center_Black>
                                    </Container_Row_100_Right>
                                    <Container_Column_100_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                        <Container_Row_NG_Auto_Center>
                                            <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                            <Text_Span_16_Center_Black ThemeMode={themeMode}>- Datos generales...</Text_Span_16_Center_Black>
                                        </Container_Row_NG_Auto_Center>
                                        <Text_Span_16_Center_Black ThemeMode={themeMode}>Proveedores...</Text_Span_16_Center_Black>
                                        {isSuppliers.length !== 0 ? (
                                            <>
                                                <Container_Row_100_Center>
                                                    <Icon_20><FcSearch/></Icon_20>
                                                    <Input_Text_60_Black
                                                        ThemeMode={themeMode}
                                                        type="text"
                                                        placeholder="Buscar..."
                                                        value={isSearchTerm2}
                                                        onChange={(e) => setIsSearchTerm2(e.target.value)}
                                                    />
                                                </Container_Row_100_Center>
                                                {filteredRecordsSuppliers.length === 0 ? (
                                                    <>
                                                        <Container_Row_100_Center>
                                                            <Text_Span_20_Center_Black ThemeMode={themeMode}>No hay datos disponibles</Text_Span_20_Center_Black>
                                                        </Container_Row_100_Center>
                                                    </>
                                                ):(
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
                                                            placeholder='Seleccione uno...'
                                                            value={filteredRecordsSuppliers
                                                                .map(supplier => ({ value: supplier.idproveedor, label: supplier.nombre }))
                                                                .find(option => option.value === filteredRecordsSuppliers.idproveedor)
                                                            }
                                                            onChange={(e) => {
                                                                const updatedSupplies = [...isTextFieldsWarehouse.supplies];
                                                                updatedSupplies[index].idsupplier = e.value
                                                                setIsTextFieldsWarehouse(prev => ({
                                                                    ...prev, 
                                                                    supplies: updatedSupplies,
                                                                }));
                                                            }}
                                                        />    
                                                    </>
                                                )}
                                            </>
                                        ):(
                                            <>
                                                <Container_Row_100_Center>
                                                    <Text_Span_20_Center_Black ThemeMode={themeMode}>No hay datos disponibles</Text_Span_20_Center_Black>
                                                </Container_Row_100_Center>
                                            </>
                                        )}  
                                        <Text_Span_16_Center_Black ThemeMode={themeMode}>Insumos...</Text_Span_16_Center_Black>
                                        {isSupplies.length !== 0 ? (
                                            <>
                                                {isSupplies.filter(item => item.idproveedor === supply.idsupplier).length === 0 ? (
                                                    <>
                                                        <Container_Row_100_Center>
                                                            <Text_Span_20_Center_Black ThemeMode={themeMode}>No hay datos disponibles</Text_Span_20_Center_Black>
                                                        </Container_Row_100_Center>
                                                    </>
                                                ):(
                                                    <>
                                                        <Container_Row_100_Center>
                                                            <Icon_20><FcSearch/></Icon_20>
                                                            <Input_Text_60_Black
                                                                ThemeMode={themeMode}
                                                                type="text"
                                                                placeholder="Buscar..."
                                                                value={isSearchTerm1}
                                                                onChange={(e) => setIsSearchTerm1(e.target.value)}
                                                            />
                                                        </Container_Row_100_Center>
                                                        {isSupplies.filter(item => item.idproveedor === supply.idsupplier && item.nombre.toLowerCase().includes(isSearchTerm1.toLowerCase())).length === 0 ? (
                                                            <>
                                                                <Container_Row_100_Center>
                                                                    <Text_Span_20_Center_Black ThemeMode={themeMode}>No hay datos disponibles</Text_Span_20_Center_Black>
                                                                </Container_Row_100_Center>
                                                            </>
                                                        ):(
                                                            <>
                                                                <Select
                                                                    options={isSupplies
                                                                        .filter(item => item.idproveedor === supply.idsupplier &&
                                                                                item.nombre.toLowerCase().includes(isSearchTerm1.toLowerCase())
                                                                        )
                                                                        .map((item) => ({
                                                                        value: item.idinsumo,
                                                                        label: item.nombre
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
                                                                    placeholder='Seleccione uno...'
                                                                    value={isSupplies
                                                                        .filter(item => item.idproveedor === supply.idsupplier && item.nombre.toLowerCase().includes(isSearchTerm1.toLowerCase()))
                                                                        .map(item => ({ value: item.idinsumo, label: item.nombre }))
                                                                        .find(option => option.value === isSupplies.idinsumo)
                                                                    }
                                                                    onChange={(e) => {
                                                                        const updatedSupplies = [...isTextFieldsWarehouse.supplies];
                                                                        updatedSupplies[index].idsupply = e.value
                                                                        setIsTextFieldsWarehouse(prev => ({
                                                                            ...prev, 
                                                                            supplies: updatedSupplies,
                                                                        }));
                                                                    }}
                                                                />  
                                                            </>
                                                        )}  
                                                    </>
                                                )}
                                            </>
                                        ):(
                                            <>
                                                <Container_Row_100_Center>
                                                    <Text_Span_20_Center_Black ThemeMode={themeMode}>No hay datos disponibles</Text_Span_20_Center_Black>
                                                </Container_Row_100_Center>
                                            </>
                                        )}
                                    </Container_Column_100_Center>
                                    <Container_Column_100_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                        <Container_Row_NG_Auto_Center>
                                            <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                            <Text_Span_16_Center_Black ThemeMode={themeMode}>- Datos especificos...</Text_Span_16_Center_Black>
                                        </Container_Row_NG_Auto_Center>
                                        <Container_Row_100_Center>
                                            <Text_Span_16_Center_Black ThemeMode={themeMode}>Cantidad:</Text_Span_16_Center_Black>
                                            <Input_Text_100_Black ThemeMode={themeMode}
                                                placeholder="..."
                                                type="text"
                                                value={supply.amount}
                                                onChange={(e) => {
                                                    const updatedSupplies = [...isTextFieldsWarehouse.supplies];
                                                    const unitprice = updatedSupplies[index].unitprice;
                                                    const quantity = e.target.value > 0 ? parseFloat(e.target.value) : 0;

                                                    updatedSupplies[index].price = quantity > 0 && unitprice > 0 ? parseFloat((quantity * unitprice).toFixed(4)) : 0;
                                                    updatedSupplies[index].amount = quantity
                                                    setIsTextFieldsWarehouse(prev => ({
                                                        ...prev, 
                                                        supplies: updatedSupplies,
                                                    }));
                                                }}
                                            />
                                        </Container_Row_100_Center>
                                        <Container_Row_100_Center>
                                            <Text_Span_16_Center_Black ThemeMode={themeMode}>Precio Unitario:</Text_Span_16_Center_Black>
                                            <Input_Text_100_Black ThemeMode={themeMode}
                                                placeholder="..."
                                                type="text"
                                                value={supply.unitprice}
                                                onChange={(e) => {
                                                    const updatedSupplies = [...isTextFieldsWarehouse.supplies];
                                                    const unitprice = e.target.value;
                                                    const quantity = updatedSupplies[index].amount || 0;

                                                    updatedSupplies[index].unitprice = unitprice;
                                                    updatedSupplies[index].price = unitprice > 0 ? parseFloat((quantity * unitprice).toFixed(4)) : 0;

                                                    setIsTextFieldsWarehouse(prev => ({
                                                        ...prev, 
                                                        supplies: updatedSupplies,
                                                    }));
                                                }}
                                            />
                                        </Container_Row_100_Center>
                                        <Container_Row_100_Center>
                                            <Text_Span_16_Center_Black ThemeMode={themeMode}>Precio Total:</Text_Span_16_Center_Black>
                                            <Input_Text_100_Black ThemeMode={themeMode}
                                                placeholder="..."
                                                type="number"
                                                disabled
                                                value={supply.price}
                                            />
                                        </Container_Row_100_Center>
                                    </Container_Column_100_Center>
                                    <Container_Column_Blue_Width_95_Center ThemeMode={themeMode}>
                                        <Container_Column_100_Center>
                                            <Text_Span_24_Center>
                                                Eliminar insumo
                                            </Text_Span_24_Center>
                                            <Tooltip title='Eliminar Insumo' placement="top">
                                                <Button_Icon_Red_60 ThemeMode={themeMode}
                                                    onClick={() => deleteSupply(index)}>
                                                    <Icon_20>
                                                        <LuPackageMinus/>
                                                    </Icon_20>
                                                </Button_Icon_Red_60>
                                            </Tooltip>
                                        </Container_Column_100_Center>
                                    </Container_Column_Blue_Width_95_Center>
                                </Container_Column_Border_90_Center>
                            ))}
                            <Container_Column_Blue_Width_95_Center ThemeMode={themeMode}>
                                <Container_Column_100_Center>
                                    <Text_Span_24_Center>
                                        Nuevo insumo
                                    </Text_Span_24_Center>
                                    <Tooltip title='Agregar Insumo' placement="top">
                                        <Button_Icon_Green_60 ThemeMode={themeMode}
                                            onClick={() => addSupply()}>
                                            <Icon_20>
                                                <LuPackagePlus/>
                                            </Icon_20>
                                        </Button_Icon_Green_60>
                                    </Tooltip>
                                </Container_Column_100_Center>
                            </Container_Column_Blue_Width_95_Center>
                            <Container_Row_100_Center>
                                <Tooltip title='Cancelar' placement='top'>
                                    <Button_Icon_Blue_210 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalView('')}>
                                        <Icon_20><MdCancel/></Icon_20>
                                    </Button_Icon_Blue_210>
                                </Tooltip>
                                <Tooltip title='Agregar' placement='top'>
                                    <Button_Icon_Green_210 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                        onClick={() => handleUnitAdd(isState)}>
                                        <Icon_20><IoIosAddCircle/></Icon_20>
                                    </Button_Icon_Green_210>
                                </Tooltip>
                            </Container_Row_100_Center>
                        </Container_Form_500>
                    </Container_Modal>
                </>
            ):(
                <></>
            )}
        </>
    );
}