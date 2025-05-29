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
import { TextFieldsSupplyTypesContext } from "../../../../contexts/FormsProvider";
import { ActionBlockContext,SearchTerm1Context,SearchTerm2Context } from "../../../../contexts/VariablesProvider";
import { UnitsContext,SupplyTypesContext,SupplyTypeAddContext } from "../../../../contexts/WarehouseProvider";
// Hooks personalizados
import { ResetTextFieldsSupplyType,ResetSearchTerms } from "../../../../hooks/Texts";
import { HandleModalView } from "../../../../hooks/Views";
import { HandleSupplyTypeAdd } from "../../../../hooks/Form";
import { TableActionsUnits } from "../../../../hooks/Table";
//__________ICONOS__________
// Icono para cerrar el modal
// Icono para el buscador
import { FcSearch } from "react-icons/fc";
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { IoIosAddCircle } from "react-icons/io";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Row_100_Center,Container_Column_90_Center,Container_Row_95_Center,Container_Row_NG_95_Center } from "../../../styled/Containers";
import { Text_Title_30_Center,Text_A_16_Left,Text_Blue_16_Left,Text_A_20_Center } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Green_210 } from "../../../styled/Buttons";
import { Icon_White_22,Icon_22,Icon_Button_Blue_18 } from "../../../styled/Icons";
import { Input_Text_Black_100,Input_Radio_16,Input_Text_Black_50 } from "../../../styled/Inputs";
import { Alert_Verification } from "../../../styled/Alerts";
import { Label_Text_16_Center } from "../../../styled/Labels";
//____________IMPORT/EXPORT____________

// Modal para agregar mediciones
export default function Supply_Type_Add(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isTextFieldsSupplyTypes,setIsTextFieldsSupplyTypes] = useContext(TextFieldsSupplyTypesContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSupplyTypeAdd,setIsSupplyTypeAdd] = useContext(SupplyTypeAddContext);
    const [isSupplyTypes] = useContext(SupplyTypesContext);
    const [isUnits] = useContext(UnitsContext);
    const [socket] = useContext(SocketContext);
    const [isSearchTerm1,setIsSearchTerm1] = useContext(SearchTerm1Context);
    const [isSearchTerm2,setIsSearchTerm2] = useContext(SearchTerm2Context);
    // Constantes con el valor de los useState
    const [isState,setIsState] = useState('');
    const [filteredSupplyTypes,setFilteredSupplyTypes] = useState(null);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const handleSupplyTypeAdd = HandleSupplyTypeAdd();
    const resetTextFieldsSupplyType = ResetTextFieldsSupplyType();
    const resetSearchTerms = ResetSearchTerms();
    const { currentRecordsUnits } = TableActionsUnits();
    // UseEffect para agregar datos a la base de datos
    useEffect(() => {
        if(isSupplyTypeAdd){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Supply-Type-Insert',isTextFieldsSupplyTypes.type.trim(),isTextFieldsSupplyTypes.description.trim(),isTextFieldsSupplyTypes.idunits);
                        
                        resolve('¡MEALSYNC agregó el tipo de insumo!...');

                        const route = sessionStorage.getItem('Route');

                        setCurrentMView('');
                        sessionStorage.setItem('Modal-View','');
                        setTimeout(() => {
                            setIsModal(false);
                            sessionStorage.setItem('Modal',false);
                            resetTextFieldsSupplyType();
                            setIsActionBlock(false);
                            setIsSupplyTypeAdd(false);
                            resetSearchTerms();
                            navigate(route,{ replace: true });
                        },750);
                    },2000);
                }catch(e){
                    setIsActionBlock(false);
                    setIsSupplyTypeAdd(false);
                    return reject('¡Ocurrio un error inesperado agregando el tipo de insumo!...');
                }
            });

            Alert_Verification(promise,'¡Agregando un tipo de insumo!...');
        }
    },[isSupplyTypeAdd]);
    // UseEffect para quitar la suscrpcion de socket
    useEffect(() => {
        const handleSupplyTypeInsert = (message,user) => {
            console.log(message,user);
            socket.emit('Supply-Types');
        };

        socket.on('Supply-Type-Insert',handleSupplyTypeInsert);
        
        return () => {
            socket.off('Supply-Type-Insert',handleSupplyTypeInsert);
        }
    },[socket])
    // UseEffect para ver el estado de los datos generales
    useEffect(() => {
        if(isState === 'Nuevo'){
            setIsTextFieldsSupplyTypes(prev => ({
                ...prev, 
                type: '',
                description: '',
            }));
        }
    },[isState])
    // UseEffect para filtrar datos de los tipos de insumos 
    useEffect(() => {
        if(isSupplyTypes.length !== 0){
            const uniqueByTipo = isSupplyTypes.filter(
                (item, index, self) =>
                    index === self.findIndex((t) => t.tipo === item.tipo)
            );
    
            const filtered = uniqueByTipo.filter((item) =>
                item.tipo.toLowerCase().includes(isSearchTerm1.toLowerCase())
            );
    
            setFilteredSupplyTypes(filtered);
        }
    },[isSupplyTypes,isSearchTerm1])
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <>
                    <Container_Modal>
                        <Container_Form_500 ThemeMode={themeMode} className={currentMView === 'Supply-Type-Add' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Row_100_Center>
                                <Text_Title_30_Center ThemeMode={themeMode}>AGREGAR TIPO DE INSUMO</Text_Title_30_Center>
                            </Container_Row_100_Center>
                            <Container_Row_NG_95_Center>
                                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                <Text_A_16_Left ThemeMode={themeMode}>- Datos generales...</Text_A_16_Left>
                            </Container_Row_NG_95_Center>
                            <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Container_Row_100_Center>
                                    {['Nuevo','Existente'].map((item,index) => (
                                        <Label_Text_16_Center ThemeMode={themeMode} key={index}>
                                            <Input_Radio_16 ThemeMode={themeMode}
                                                type="radio"
                                                name="state"
                                                value={item}
                                                checked={isState === item}
                                                onChange={(e) => setIsState(e.target.value)}
                                            />
                                            {item}
                                        </Label_Text_16_Center>
                                    ))};
                                </Container_Row_100_Center>
                                {isState === 'Nuevo' ? (
                                    <>
                                        <Container_Row_100_Center>
                                            <Text_A_16_Left ThemeMode={themeMode}>Nombre:</Text_A_16_Left>
                                            <Input_Text_Black_100 ThemeMode={themeMode}
                                                placeholder="..."
                                                type="text"
                                                value={isTextFieldsSupplyTypes.type}
                                                onChange={(e) => setIsTextFieldsSupplyTypes(prev => ({...prev, type: e.target.value}))}
                                            />
                                        </Container_Row_100_Center>
                                        <Container_Row_100_Center>
                                            <Text_A_16_Left ThemeMode={themeMode}>Descripción:</Text_A_16_Left>
                                            <Input_Text_Black_100 ThemeMode={themeMode}
                                                placeholder="..."
                                                type="text"
                                                value={isTextFieldsSupplyTypes.description}
                                                onChange={(e) => setIsTextFieldsSupplyTypes(prev => ({...prev, description: e.target.value}))}
                                            />
                                            <Icon_Button_Blue_18 ThemeMode={themeMode} className="pulsate-buttom"
                                                onClick={() => {
                                                    setIsTextFieldsSupplyTypes(prev => ({...prev, description: ''}))
                                                }}>
                                                <MdCancel/>
                                            </Icon_Button_Blue_18>
                                        </Container_Row_100_Center>  
                                    </>
                                ):(
                                    <></>
                                )}
                                {isState === 'Existente' ? (
                                    isSupplyTypes.length !== 0 ? (
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
                                            {filteredSupplyTypes.length === 0 ? (
                                                <>
                                                    <Container_Row_100_Center>
                                                        <Text_A_20_Center ThemeMode={themeMode}>No hay datos disponibles</Text_A_20_Center>
                                                    </Container_Row_100_Center>
                                                </>
                                            ):(
                                                <>
                                                    <Select
                                                        options={filteredSupplyTypes.map((type) => ({
                                                            value: type.idtipo,
                                                            label: type.tipo,
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
                                                        value={filteredSupplyTypes
                                                            .map(type => ({ value: type.idtipo, label: type.tipo}))
                                                            .find(option => option.value === isTextFieldsSupplyTypes.idtipo)
                                                        }
                                                        onChange={(e) => setIsTextFieldsSupplyTypes(prev => ({...prev, type: e.label, description: isSupplyTypes.find((type) => type.idtipo === e.value)?.descripcion || 'Desconocido'}))}
                                                    />
                                                    <Container_Row_100_Center>
                                                        <Text_A_16_Left ThemeMode={themeMode}>Nombre:</Text_A_16_Left>
                                                        <Input_Text_Black_100 ThemeMode={themeMode}
                                                            placeholder="..."
                                                            type="text"
                                                            disabled={isState === 'Existente'}
                                                            value={isTextFieldsSupplyTypes.type}
                                                            onChange={(e) => setIsTextFieldsSupplyTypes(prev => ({...prev, type: e.target.value}))}
                                                        />
                                                    </Container_Row_100_Center>
                                                    <Container_Row_100_Center>
                                                        <Text_A_16_Left ThemeMode={themeMode}>Descripción:</Text_A_16_Left>
                                                        <Input_Text_Black_100 ThemeMode={themeMode}
                                                            placeholder="..."
                                                            type="text"
                                                            disabled={isState === 'Existente'}
                                                            value={isTextFieldsSupplyTypes.description}
                                                            onChange={(e) => setIsTextFieldsSupplyTypes(prev => ({...prev, description: e.target.value}))}
                                                        />
                                                    </Container_Row_100_Center>  
                                                </>
                                            )}
                                        </>
                                    ):(
                                        <>
                                            <Container_Row_100_Center>
                                                <Text_A_20_Center ThemeMode={themeMode}>No hay datos disponibles</Text_A_20_Center>
                                            </Container_Row_100_Center>
                                        </>
                                    )
                                ):(
                                    <></>
                                )}
                            </Container_Column_90_Center>
                            <Container_Row_NG_95_Center>
                                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                <Text_A_16_Left ThemeMode={themeMode}>- Datos especificos...</Text_A_16_Left>
                            </Container_Row_NG_95_Center>
                            <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                {isUnits.length !== 0 ? (
                                    <>
                                        <Container_Row_NG_95_Center>
                                            <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                            <Text_A_16_Left ThemeMode={themeMode}>- Medidas...</Text_A_16_Left>
                                        </Container_Row_NG_95_Center>
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
                                        {currentRecordsUnits.length === 0 ? (
                                            <>
                                                <Container_Row_100_Center>
                                                    <Text_A_20_Center ThemeMode={themeMode}>No hay datos disponibles</Text_A_20_Center>
                                                </Container_Row_100_Center>
                                            </>
                                        ):(
                                            <>
                                                <Select
                                                    options={currentRecordsUnits.map((unit) => ({
                                                        value: unit.idmedida,
                                                        label: `${unit.medida} - ${unit.cantidad} - ${unit.unidad}`
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
                                                    value={currentRecordsUnits
                                                        .map(unit => ({ value: unit.idmedida, label: `${unit.medida} - ${unit.cantidad} - ${unit.unidad}`}))
                                                        .find(option => option.value === isTextFieldsSupplyTypes.idunits)
                                                    }
                                                    onChange={(e) => setIsTextFieldsSupplyTypes(prev => ({...prev, idunits: e.value}))}
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
                            </Container_Column_90_Center>
                            <Container_Row_95_Center>
                                <Tooltip title='Cancelar' placement='top'>
                                    <Button_Icon_Blue_210 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalView('')}>
                                        <Icon_White_22><MdCancel/></Icon_White_22>
                                    </Button_Icon_Blue_210>
                                </Tooltip>
                                <Tooltip title='Agregar' placement='top'>
                                    <Button_Icon_Green_210 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                        onClick={() => handleSupplyTypeAdd(isState)}>
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