//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
import Select from "react-select";
// Contextos
import { SocketContext } from "../../../../contexts/SocketProvider";
import { ModalContext,ThemeModeContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { TextFieldsUnitsContext,TextFieldsWarehouseContext } from "../../../../contexts/FormsProvider";
import { ActionBlockContext,SearchTerm1Context,SearchTerm2Context } from "../../../../contexts/VariablesProvider";
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
import { Container_Modal,Container_Form_500,Container_Row_100_Center,Container_Column_100_Center,Container_Row_100_Right,Container_Column_Border_90_Center,Container_Column_90_Center,Container_Column_Blue_Width_95_Center,Container_Row_95_Center,Container_Row_NG_95_Center } from "../../../styled/Containers";
import { Text_Title_30_Center,Text_A_16_Left,Text_Blue_16_Left,Text_A_20_Center,Text_Span_24_Center,Text_A_16_Center } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Green_210,Button_Icon_Green_60,Button_Icon_Red_60 } from "../../../styled/Buttons";
import { Icon_White_22,Icon_22, Icon_White_18 } from "../../../styled/Icons";
import { Input_Text_Black_100,Input_Text_Black_50 } from "../../../styled/Inputs";
import { Alert_Verification } from "../../../styled/Alerts";
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
    const [liveDateTime,setLiveDateTime] = useState(getFormattedDateTime());
    const [isState,setIsState] = useState('');
    const [filteredUnits,setFilteredUnits] = useState(null);
    const [isListSupplies,setIsListSupplies] = useState({
        supplies: [
            {
                idsupply: 0,
                idsupplier: 0,
                amount: 0,
                unitprice: 0,
                price: 0, 
            }
        ]
    })
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

            Alert_Verification(promise,'¡Agregando una medida!...');
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
                    index === self.findIndex((t) => t.medida === item.medida)
            );
    
            const filtered = uniqueByMedida.filter((item) =>
                item.medida.toLowerCase().includes(isSearchTerm2.toLowerCase())
            );
    
            setFilteredUnits(filtered);
        }
    },[isUnits,isSearchTerm2]);
    // UseEffect para obtener la hora a tiepo real
    useEffect(() => {
        const interval = setInterval(() => {
            setIsTextFieldsWarehouse((prev) => ({
                ...prev,
                date: getFormattedDateTime()}));
        }, 1000);

        return () => clearInterval(interval);
    },[])
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
            unitprice: 0,
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
    return(
        <>
            {isModal ? (
                <>
                    <Container_Modal>
                        <Container_Form_500 ThemeMode={themeMode} className={currentMView === 'Warehouse-Add' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Row_100_Center>
                                <Text_Title_30_Center ThemeMode={themeMode}>AGREGAR PEDIDO PARA EL INVENTARIO</Text_Title_30_Center>
                            </Container_Row_100_Center>
                            <Container_Row_95_Center>
                                <Text_A_16_Left ThemeMode={themeMode}>Fecha:</Text_A_16_Left>
                                <Input_Text_Black_100 ThemeMode={themeMode}
                                    placeholder="..."
                                    type="text"
                                    value={isTextFieldsWarehouse.date}
                                    disabled
                                />
                            </Container_Row_95_Center>
                            {isTextFieldsWarehouse.supplies.map((supply,index) => (
                                <Container_Column_Border_90_Center key={index} ThemeMode={themeMode}>
                                    <Container_Row_100_Right>
                                        <Text_A_20_Center ThemeMode={themeMode}>INSUMO NO. {index+1}</Text_A_20_Center>
                                    </Container_Row_100_Right>
                                    <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                        <Container_Row_NG_95_Center>
                                            <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                            <Text_A_16_Left ThemeMode={themeMode}>- Datos generales...</Text_A_16_Left>
                                        </Container_Row_NG_95_Center>
                                        <Text_A_16_Center ThemeMode={themeMode}>Proveedores...</Text_A_16_Center>
                                        {isSuppliers.length !== 0 ? (
                                            <>
                                                <Container_Row_100_Center>
                                                    <Icon_22><FcSearch/></Icon_22>
                                                    <Input_Text_Black_50
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
                                                            <Text_A_20_Center ThemeMode={themeMode}>No hay datos disponibles</Text_A_20_Center>
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
                                                                .find(option => option.value === supply.idsupply)
                                                            }
                                                            onChange={(e) => {
                                                                const updatedSupplies = [...isTextFieldsWarehouse.supplies];
                                                                updatedSupplies[index].idsupplier = e.value
                                                                isTextFieldsWarehouse(prev => ({
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
                                                    <Text_A_20_Center ThemeMode={themeMode}>No hay datos disponibles</Text_A_20_Center>
                                                </Container_Row_100_Center>
                                            </>
                                        )}  
                                        <Text_A_16_Center ThemeMode={themeMode}>Insumos...</Text_A_16_Center>
                                        {isSupplies.length !== 0 ? (
                                            <>
                                                {isSupplies.filter(item => item.idproveedor === supply.idsupplier).length === 0 ? (
                                                    <>
                                                        <Container_Row_100_Center>
                                                            <Text_A_20_Center ThemeMode={themeMode}>No hay datos disponibles</Text_A_20_Center>
                                                        </Container_Row_100_Center>
                                                    </>
                                                ):(
                                                    <>
                                                        <Container_Row_100_Center>
                                                            <Icon_22><FcSearch/></Icon_22>
                                                            <Input_Text_Black_50
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
                                                                    <Text_A_20_Center ThemeMode={themeMode}>No hay datos disponibles</Text_A_20_Center>
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
                                                                        .find(option => option.value === supply.idsupply)
                                                                    }
                                                                    onChange={(e) => {
                                                                        const updatedSupplies = [...isTextFieldsWarehouse.supplies];
                                                                        updatedSupplies[index].idsupply = e.value
                                                                        isTextFieldsWarehouse(prev => ({
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
                                                    <Text_A_20_Center ThemeMode={themeMode}>No hay datos disponibles</Text_A_20_Center>
                                                </Container_Row_100_Center>
                                            </>
                                        )}
                                    </Container_Column_90_Center>
                                    <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                        <Container_Row_NG_95_Center>
                                            <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                            <Text_A_16_Left ThemeMode={themeMode}>- Datos especificos...</Text_A_16_Left>
                                        </Container_Row_NG_95_Center>
                                        <Container_Row_100_Center>
                                            <Text_A_16_Left ThemeMode={themeMode}>Cantidad:</Text_A_16_Left>
                                            <Input_Text_Black_100 ThemeMode={themeMode}
                                                placeholder="..."
                                                type="text"
                                                value={supply.amount}
                                                onChange={(e) => {
                                                    const updatedSupplies = [...isListSupplies.supplies];
                                                    const unitprice = updatedSupplies[index].unitprice || 0;
                                                    const quantity = e.target.value > 0 ? parseFloat(e.target.value) : 0;

                                                    updatedSupplies[index].price = quantity > 0 ? parseFloat((quantity * unitprice).toFixed(4)) : 0;
                                                    updatedSupplies[index].amount = quantity
                                                    setIsTextFieldsWarehouse(prev => ({
                                                        ...prev, 
                                                        supplies: updatedSupplies,
                                                    }));
                                                }}
                                            />
                                        </Container_Row_100_Center>
                                        <Container_Row_100_Center>
                                            <Text_A_16_Left ThemeMode={themeMode}>Precio Unitario:</Text_A_16_Left>
                                            <Input_Text_Black_100 ThemeMode={themeMode}
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
                                            <Text_A_16_Left ThemeMode={themeMode}>Precio Total:</Text_A_16_Left>
                                            <Input_Text_Black_100 ThemeMode={themeMode}
                                                placeholder="..."
                                                type="number"
                                                disabled
                                                value={supply.price}
                                            />
                                        </Container_Row_100_Center>
                                    </Container_Column_90_Center>
                                    <Container_Column_Blue_Width_95_Center ThemeMode={themeMode}>
                                        <Container_Column_100_Center>
                                            <Text_Span_24_Center>
                                                Eliminar insumo
                                            </Text_Span_24_Center>
                                            <Tooltip title='Eliminar Insumo' placement="top">
                                                <Button_Icon_Red_60 ThemeMode={themeMode}
                                                    onClick={() => deleteSupply()}>
                                                    <Icon_White_18>
                                                        <LuPackageMinus/>
                                                    </Icon_White_18>
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
                                            <Icon_White_18>
                                                <LuPackagePlus/>
                                            </Icon_White_18>
                                        </Button_Icon_Green_60>
                                    </Tooltip>
                                </Container_Column_100_Center>
                            </Container_Column_Blue_Width_95_Center>
                            <Container_Row_95_Center>
                                <Tooltip title='Cancelar' placement='top'>
                                    <Button_Icon_Blue_210 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalView('')}>
                                        <Icon_White_22><MdCancel/></Icon_White_22>
                                    </Button_Icon_Blue_210>
                                </Tooltip>
                                <Tooltip title='Agregar' placement='top'>
                                    <Button_Icon_Green_210 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                        onClick={() => handleUnitAdd(isState)}>
                                        <Icon_White_22><IoIosAddCircle/></Icon_White_22>
                                    </Button_Icon_Green_210>
                                </Tooltip>
                            </Container_Row_95_Center>
                        </Container_Form_500>
                    </Container_Modal>
                </>
            ):(
                <></>
            )}
        </>
    );
}