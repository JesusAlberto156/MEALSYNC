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
import { TextFieldsUnitsContext } from "../../../../contexts/FormsProvider";
import { ActionBlockContext } from "../../../../contexts/VariablesProvider";
import { SearchTerm2Context } from "../../../../contexts/SearchsProvider";
import { UnitAddContext,UnitsContext } from "../../../../contexts/WarehouseProvider";
// Hooks personalizados
import { ResetTextFieldsUnit,ResetSearchTerms } from "../../../../hooks/Texts";
import { HandleModalView } from "../../../../hooks/Views";
import { HandleUnitAdd } from "../../../../hooks/Form";
//__________ICONOS__________
// Icono para el buscador
import { FcSearch } from "react-icons/fc";
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { IoIosAddCircle } from "react-icons/io";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Row_100_Center,Container_Column_100_Center,Container_Row_100_Center,Container_Row_NG_Auto_Center } from "../../../styled/Containers";
import { Text_Title_32_Black,Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Span_20_Center_Black } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Green_210 } from "../../../styled/Buttons";
import { Icon_20,Icon_20 } from "../../../styled/Icons";
import { Input_Radio_20,Input_Text_100_Black,Input_Text_60_Black } from "../../../styled/Inputs";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
import { Label_Button_16_Black } from "../../../styled/Labels";
//____________IMPORT/EXPORT____________

// Modal para agregar mediciones
export default function Unit_Add(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isTextFieldsUnits,setIsTextFieldsUnits] = useContext(TextFieldsUnitsContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isUnitAdd,setIsUnitAdd] = useContext(UnitAddContext);
    const [socket] = useContext(SocketContext);
    const [isUnits] = useContext(UnitsContext);
    const [isSearchTerm2,setIsSearchTerm2] = useContext(SearchTerm2Context);
    // Constantes con el valor de los useState
    const [isState,setIsState] = useState('');
    const [filteredUnits,setFilteredUnits] = useState(null);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const handleUnitAdd = HandleUnitAdd();
    const resetTextFieldsUnit = ResetTextFieldsUnit();
    const resetSearchTerms = ResetSearchTerms();
    // UseEffect para agregar datos a la base de datos
    useEffect(() => {
        if(isUnitAdd){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Unit-Insert',isTextFieldsUnits.extent.trim(),isTextFieldsUnits.unit,parseFloat(isTextFieldsUnits.amount));
                        
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
                }catch(e){
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
                    index === self.findIndex((t) => t.medida === item.medida)
            );
    
            const filtered = uniqueByMedida.filter((item) =>
                item.nombre.toLowerCase().includes(isSearchTerm2.toLowerCase())
            );
    
            setFilteredUnits(filtered);
        }
    },[isUnits,isSearchTerm2]);
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <>
                    <Container_Modal>
                        <Container_Form_500 ThemeMode={themeMode} className={currentMView === 'Unit-Add' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Row_100_Center>
                                <Text_Title_32_Black ThemeMode={themeMode}>AGREGAR MEDIDA</Text_Title_32_Black>
                            </Container_Row_100_Center>
                            <Container_Row_NG_Auto_Center>
                                <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}>- Datos generales...</Text_Span_16_Center_Black>
                            </Container_Row_NG_Auto_Center>
                            <Container_Column_100_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Container_Row_100_Center>
                                    {['Nuevo','Existente'].map((item,index) => (
                                        <Label_Button_16_Black ThemeMode={themeMode} key={index}>
                                            <Input_Radio_20 ThemeMode={themeMode}
                                                type="radio"
                                                name="state"
                                                value={item}
                                                checked={isState === item}
                                                onChange={(e) => setIsState(e.target.value)}
                                            />
                                            {item}
                                        </Label_Button_16_Black>
                                    ))};
                                </Container_Row_100_Center>
                                {isState === 'Nuevo' ? (
                                    <>
                                        <Container_Row_100_Center>
                                            <Text_Span_16_Center_Black ThemeMode={themeMode}>Nombre:</Text_Span_16_Center_Black>
                                            <Input_Text_100_Black ThemeMode={themeMode}
                                                placeholder="..."
                                                type="text"
                                                value={isTextFieldsUnits.extent}
                                                onChange={(e) => setIsTextFieldsUnits(prev => ({...prev, extent: e.target.value}))}
                                            />
                                        </Container_Row_100_Center>
                                        <Container_Row_NG_Auto_Center>
                                            <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                            <Text_Span_16_Center_Black ThemeMode={themeMode}>- Unidad...</Text_Span_16_Center_Black>
                                        </Container_Row_NG_Auto_Center>
                                        <Container_Row_100_Center>
                                            {['Kilogramos','Litros'].map((item,index) => (
                                                <Label_Button_16_Black ThemeMode={themeMode} key={index}>
                                                    <Input_Radio_20 ThemeMode={themeMode}
                                                        type="radio"
                                                        name="group"
                                                        value={item}
                                                        checked={isTextFieldsUnits.unit === item}
                                                        onChange={(e) => setIsTextFieldsUnits(prev => ({...prev, unit: e.target.value}))}
                                                    />
                                                    {item}
                                                </Label_Button_16_Black>
                                            ))};
                                        </Container_Row_100_Center>  
                                    </>
                                ):(
                                    <></>
                                )}
                                {isState === 'Existente' ? (
                                    isUnits.length !== 0 ? (
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
                                            {filteredUnits.length === 0 ? (
                                                <>
                                                    <Container_Row_100_Center>
                                                        <Text_Span_20_Center_Black ThemeMode={themeMode}>No hay datos disponibles</Text_Span_20_Center_Black>
                                                    </Container_Row_100_Center>
                                                </>
                                            ):(
                                                <>
                                                    <Select
                                                        options={filteredUnits.map((type) => ({
                                                            value: type.idmedida,
                                                            label: type.nombre,
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
                                                        value={filteredUnits
                                                            .map(type => ({ value: type.idmedida, label: type.nombre}))
                                                            .find(option => option.value === isTextFieldsUnits.idextent)
                                                        }
                                                        onChange={(e) => setIsTextFieldsUnits(prev => ({...prev, extent: e.label, unit: isUnits.find((unit) => unit.idmedida === e.value)?.unidad || 'Desnocido'}))}
                                                    />
                                                    <Container_Row_100_Center>
                                                        <Text_Span_16_Center_Black ThemeMode={themeMode}>Nombre:</Text_Span_16_Center_Black>
                                                        <Input_Text_100_Black ThemeMode={themeMode}
                                                            placeholder="..."
                                                            type="text"
                                                            value={isTextFieldsUnits.extent}
                                                            onChange={(e) => setIsTextFieldsUnits(prev => ({...prev, extent: e.target.value}))}
                                                            disabled={isState === 'Existente'}
                                                        />
                                                    </Container_Row_100_Center>
                                                    <Container_Row_NG_Auto_Center>
                                                        <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                                        <Text_Span_16_Center_Black ThemeMode={themeMode}>- Unidad...</Text_Span_16_Center_Black>
                                                    </Container_Row_NG_Auto_Center>
                                                    <Container_Row_100_Center>
                                                        {['Kilogramos','Litros'].map((item,index) => (
                                                            <Label_Button_16_Black ThemeMode={themeMode} key={index}>
                                                                <Input_Radio_20 ThemeMode={themeMode}
                                                                    type="radio"
                                                                    name="group"
                                                                    value={item}
                                                                    checked={isTextFieldsUnits.unit === item}
                                                                    onChange={(e) => setIsTextFieldsUnits(prev => ({...prev, unit: e.target.value}))}
                                                                    disabled={isState === 'Existente'}
                                                                />
                                                                {item}
                                                            </Label_Button_16_Black>
                                                        ))};
                                                    </Container_Row_100_Center>  
                                                </>
                                            )}
                                        </>
                                    ):(
                                        <>
                                            <Container_Row_100_Center>
                                                <Text_Span_20_Center_Black ThemeMode={themeMode}>No hay datos disponibles</Text_Span_20_Center_Black>
                                            </Container_Row_100_Center>
                                        </>
                                    )
                                ):(
                                    <></>
                                )}
                            </Container_Column_100_Center>
                            <Container_Row_NG_Auto_Center>
                                <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}>- Datos especificos...</Text_Span_16_Center_Black>
                            </Container_Row_NG_Auto_Center>
                            <Container_Column_100_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Container_Row_100_Center>
                                    <Text_Span_16_Center_Black ThemeMode={themeMode}>Cantidad:</Text_Span_16_Center_Black>
                                    <Input_Text_100_Black ThemeMode={themeMode}
                                        placeholder="..."
                                        type="text"
                                        value={isTextFieldsUnits.amount}
                                        onChange={(e) => setIsTextFieldsUnits(prev => ({...prev, amount: e.target.value}))}
                                    />
                                </Container_Row_100_Center>
                            </Container_Column_100_Center>
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