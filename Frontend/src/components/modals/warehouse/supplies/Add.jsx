//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
import Select from "react-select";
// Contextos
import { SocketContext } from "../../../../contexts/SocketProvider";
import { ModalContext,ThemeModeContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { TextFieldsSupplyContext } from "../../../../contexts/FormsProvider";
import { ActionBlockContext } from "../../../../contexts/VariablesProvider";
import { SearchTerm1Context,SearchTerm2Context } from "../../../../contexts/SearchsProvider";
import { SuppliersContext } from "../../../../contexts/SuppliersProvider";
import { SupplyTypesContext,SupplyAddContext,UnitsContext } from "../../../../contexts/WarehouseProvider";
// Hooks personalizados
import { ResetTextFieldsSupply,ResetSearchTerms } from "../../../../hooks/Texts";
import { HandleModalView } from "../../../../hooks/Views";
import { HandleSupplyAdd,FilteredRecordsSuppliers } from "../../../../hooks/Form";
import { TableActionsSupplyTypes } from "../../../../hooks/Table";
//__________ICONOS__________
// Icono para el buscador
import { FcSearch } from "react-icons/fc";
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { IoIosAddCircle } from "react-icons/io";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Row_100_Center,Container_Column_90_Center,Container_Row_95_Center,Container_Row_NG_95_Center } from "../../../styled/Containers";
import { Text_Title_30_Center,Text_A_16_Left,Text_Blue_16_Left,Text_A_20_Center } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Green_210 } from "../../../styled/Buttons";
import { Icon_White_22,Icon_22,Icon_Button_Blue_18 } from "../../../styled/Icons";
import { Input_Text_Black_100,Input_Text_Black_50 } from "../../../styled/Inputs";
import { Alert_Verification } from "../../../styled/Alerts";
//____________IMPORT/EXPORT____________

// Modal para agregar insumos
export default function Supply_Add(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isTextFieldsSupply,setIsTextFieldsSupply] = useContext(TextFieldsSupplyContext);
    const [isSuppliers] = useContext(SuppliersContext);
    const [isSupplyTypes] = useContext(SupplyTypesContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSupplyAdd,setIsSupplyAdd] = useContext(SupplyAddContext);
    const [socket] = useContext(SocketContext);
    const [isUnits] = useContext(UnitsContext);
    const [isSearchTerm1,setIsSearchTerm1] = useContext(SearchTerm1Context);
    const [isSearchTerm2,setIsSearchTerm2] = useContext(SearchTerm2Context);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const handleSupplyAdd = HandleSupplyAdd();
    const resetTextFieldsSupply = ResetTextFieldsSupply();
    const resetSearchTerms = ResetSearchTerms();
    const {currentRecordsSupplyTypes} = TableActionsSupplyTypes();
    const filteredRecordsSuppliers = FilteredRecordsSuppliers();
    // UseEffect para agregar datos a la base de datos
    useEffect(() => {
        if(isSupplyAdd){
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Supply-Insert',isTextFieldsSupply.name.trim(),isTextFieldsSupply.description.trim(),isTextFieldsSupply.image.trim(),isTextFieldsSupply.supplier,isTextFieldsSupply.type);
                        
                        resolve('¡MEALSYNC agregó el insumo!...');

                        const route = sessionStorage.getItem('Route');

                        setCurrentMView('');
                        sessionStorage.setItem('Modal-View','');
                        setTimeout(() => {
                            setIsModal(false);
                            sessionStorage.setItem('Modal',false);
                            resetTextFieldsSupply();
                            setIsActionBlock(false);
                            setIsSupplyAdd(false);
                            resetSearchTerms();
                            navigate(route,{ replace: true });
                        },750);
                    },2000);
                }catch(error){
                    setIsActionBlock(false);
                    setIsSupplyAdd(false);
                    return reject('¡Ocurrio un error inesperado agregando el insumo!...');
                }
            });

            Alert_Verification(promise,'¡Agregando un insumo!...');
        }
    },[isSupplyAdd]);
    // UseEffect para quitar la suscrpcion de socket
    useEffect(() => {
        const handleSupplyInsert = (message,user) => {
            console.log(message,user);
            socket.emit('Supplies');
        };

        socket.on('Supply-Insert',handleSupplyInsert);
        
        return () => {
            socket.off('Supply-Insert',handleSupplyInsert);
        }
    },[socket])
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <>
                    <Container_Modal>
                        <Container_Form_500 ThemeMode={themeMode} className={currentMView === 'Supply-Add' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Row_100_Center>
                                <Text_Title_30_Center ThemeMode={themeMode}>AGREGAR INSUMO</Text_Title_30_Center>
                            </Container_Row_100_Center>
                            <Container_Row_NG_95_Center>
                                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                <Text_A_16_Left ThemeMode={themeMode}>- Datos generales...</Text_A_16_Left>
                            </Container_Row_NG_95_Center>
                            <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Container_Row_100_Center>
                                    <Text_A_16_Left ThemeMode={themeMode}>Nombre:</Text_A_16_Left>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        placeholder="..."
                                        type="text"
                                        value={isTextFieldsSupply.name}
                                        onChange={(e) => setIsTextFieldsSupply(prev => ({...prev, name: e.target.value}))}
                                    />
                                </Container_Row_100_Center>
                                <Container_Row_100_Center>
                                    <Text_A_16_Left ThemeMode={themeMode}>Descripción:</Text_A_16_Left>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        placeholder="..."
                                        type="text"
                                        value={isTextFieldsSupply.description}
                                        onChange={(e) => setIsTextFieldsSupply(prev => ({...prev, description: e.target.value}))}
                                    />
                                    <Icon_Button_Blue_18 ThemeMode={themeMode} className="pulsate-buttom"
                                        onClick={() => {
                                            setIsTextFieldsSupply(prev => ({...prev, description: ''}))
                                        }}>
                                        <MdCancel/>
                                    </Icon_Button_Blue_18>
                                </Container_Row_100_Center>
                                <Container_Row_100_Center>
                                    <Text_A_16_Left ThemeMode={themeMode}>Imagen (URL):</Text_A_16_Left>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        placeholder="..."
                                        type="text"
                                        value={isTextFieldsSupply.image}
                                        onChange={(e) => setIsTextFieldsSupply(prev => ({...prev, image: e.target.value}))}
                                    />
                                    <Icon_Button_Blue_18 ThemeMode={themeMode} className="pulsate-buttom"
                                        onClick={() => {
                                            setIsTextFieldsSupply(prev => ({...prev, image: ''}))
                                        }}>
                                        <MdCancel/>
                                    </Icon_Button_Blue_18>
                                </Container_Row_100_Center>
                            </Container_Column_90_Center>
                            <Container_Row_NG_95_Center>
                                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                <Text_A_16_Left ThemeMode={themeMode}>- Datos especificos...</Text_A_16_Left>
                            </Container_Row_NG_95_Center>
                            <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Container_Row_NG_95_Center>
                                    <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                    <Text_A_16_Left ThemeMode={themeMode}>- Proveedor...</Text_A_16_Left>
                                </Container_Row_NG_95_Center>
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
                                                        .find(option => option.value === isTextFieldsSupply.supplier)
                                                    }
                                                    onChange={(e) => setIsTextFieldsSupply(prev => ({...prev, supplier: e.value}))}
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
                                <Container_Row_NG_95_Center>
                                    <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                    <Text_A_16_Left ThemeMode={themeMode}>- Tipo de insumo...</Text_A_16_Left>
                                </Container_Row_NG_95_Center>
                                {isSupplyTypes.length !== 0 && isUnits.length !== 0 ? (
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
                                        {currentRecordsSupplyTypes.length === 0 ? (
                                            <>
                                                <Container_Row_100_Center>
                                                    <Text_A_20_Center ThemeMode={themeMode}>No hay datos disponibles</Text_A_20_Center>
                                                </Container_Row_100_Center>
                                            </>
                                        ):(
                                            <>
                                                <Select
                                                    options={currentRecordsSupplyTypes.map((type) => {
                                                            const unit = isUnits.find(unit => unit.idmedida === type.idmedida);
                                                            const label = `${type.tipo} - ${unit?.medida} - ${unit?.cantidad} ${unit?.unidad}` || 'Desconocido';
                                                            
                                                        return{
                                                            value: type.idtipo,
                                                            label: label
                                                        }
                                                    })}
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
                                                    value={currentRecordsSupplyTypes
                                                        .map(type => ({ value: type.idtipo, label: type.tipo }))
                                                        .find(option => option.value === isTextFieldsSupply.type)
                                                    }
                                                    onChange={(e) => setIsTextFieldsSupply(prev => ({...prev, type: e.value}))}
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
                                        onClick={() => handleSupplyAdd()}>
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