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
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { SearchTerm1Context,SearchTerm2Context } from "../../../../contexts/SearchsProvider";
import { SupplyEditContext,UnitsContext,SupplyTypesContext } from "../../../../contexts/WarehouseProvider";
import { SuppliersContext } from "../../../../contexts/SuppliersProvider";
// Hooks personalizados
import { HandleModalView } from "../../../../hooks/Views";
import { HandleSupplyEdit,FilteredRecordsSuppliers } from "../../../../hooks/Form";
import { TableActionsSupplyTypes } from "../../../../hooks/Table";
import { ResetSearchTerms } from "../../../../hooks/Texts";
//__________ICONOS__________
// Icon del buscador
import { FcSearch } from "react-icons/fc";
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { MdEdit } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Row_100_Center,Container_Column_100_Center,Container_Row_100_Center,Container_Row_NG_Auto_Center } from "../../../styled/Containers";
import { Text_Title_32_Black,Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Span_20_Center_Black,Text_Span_12_Justify_Black } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Red_210 } from "../../../styled/Buttons";
import { Icon_20,Icon_Button_Blue_16,Icon_20 } from "../../../styled/Icons";
import { Input_Text_100_Black,Input_Text_60_Black } from "../../../styled/Inputs";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
// Componentes personalizados
import Error_Edit from "../../errors/Edit";
//____________IMPORT/EXPORT____________

// Modal para agregar insumos
export default function Supply_Edit(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isTextFieldsSupply,setIsTextFieldsSupply] = useContext(TextFieldsSupplyContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSupplyEdit,setIsSupplyEdit] = useContext(SupplyEditContext);
    const [socket] = useContext(SocketContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isUnits] = useContext(UnitsContext);
    const [isSupplyTypes] = useContext(SupplyTypesContext);
    const [isSearchTerm1,setIsSearchTerm1] = useContext(SearchTerm1Context);
    const [isSearchTerm2,setIsSearchTerm2] = useContext(SearchTerm2Context);
    const [isSuppliers] = useContext(SuppliersContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const handleSupplyEdit = HandleSupplyEdit();
    const {currentRecordsSupplyTypes} = TableActionsSupplyTypes();
    const resetSearchTerms = ResetSearchTerms();
    const filteredRecordsSuppliers = FilteredRecordsSuppliers();
    // UseEffect para agregar datos a la base de datos
    useEffect(() => {
        if(isSupplyEdit){
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Supply-Update',isTextFieldsSupply.idsupply,isTextFieldsSupply.name.trim(),isTextFieldsSupply.description.trim(),isTextFieldsSupply.image.trim(),isTextFieldsSupply.supplier,isTextFieldsSupply.type);
                        
                        resolve('¡MEALSYNC actualizo el insumo!...');

                        const route = sessionStorage.getItem('Route');

                        setCurrentMView('');
                        sessionStorage.setItem('Modal-View','');
                        setTimeout(() => {
                            setIsModal(false);
                            sessionStorage.setItem('Modal',false);
                            setIsSelectedRow(null);
                            setIsActionBlock(false);
                            setIsSupplyEdit(false);
                            resetSearchTerms();
                            navigate(route,{ replace: true });
                        },750);
                    },2000);
                }catch(error){
                    setIsActionBlock(false);
                    setIsSupplyEdit(false);
                    return reject('¡Ocurrio un error inesperado actualizando el insumo!...');
                }
            });

            Alert_Sonner_Promise(promise,'¡Actualizando un insumo!...');
        }
    },[isSupplyEdit]);
    // UseEffect para quitar la suscrpcion de socket
    useEffect(() => {
        const handleSupplyUpdate = (message,user) => {
            console.log(message,user);
            socket.emit('Supplies');
        };

        socket.on('Supply-Update',handleSupplyUpdate);
        
        return () => {
            socket.off('Supply-Update',handleSupplyUpdate);
        }
    },[socket])
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <>
                    <Container_Modal>
                        <Container_Form_500 ThemeMode={themeMode} className={currentMView === 'Supply-Edit' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Row_100_Center>
                                <Text_Title_32_Black ThemeMode={themeMode}>EDITAR INSUMO</Text_Title_32_Black>
                            </Container_Row_100_Center>
                            <Container_Row_NG_Auto_Center>
                                <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}>- Datos generales...</Text_Span_16_Center_Black>
                            </Container_Row_NG_Auto_Center>
                            <Container_Column_100_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Container_Row_100_Center>
                                    <Text_Span_16_Center_Black ThemeMode={themeMode}>Nombre:</Text_Span_16_Center_Black>
                                    <Input_Text_100_Black ThemeMode={themeMode}
                                        placeholder="..."
                                        type="text"
                                        value={isTextFieldsSupply.name}
                                        onChange={(e) => setIsTextFieldsSupply(prev => ({...prev, name: e.target.value}))}
                                    />
                                </Container_Row_100_Center>
                                <Container_Row_100_Center>
                                    <Text_Span_16_Center_Black ThemeMode={themeMode}>Descripción:</Text_Span_16_Center_Black>
                                    <Input_Text_100_Black ThemeMode={themeMode}
                                        placeholder="..."
                                        type="text"
                                        value={isTextFieldsSupply.description}
                                        onChange={(e) => setIsTextFieldsSupply(prev => ({...prev, description: e.target.value}))}
                                    />
                                    <Icon_Button_Blue_16 ThemeMode={themeMode} className="pulsate-buttom"
                                        onClick={() => {
                                            setIsTextFieldsSupply(prev => ({...prev, description: ''}))
                                        }}>
                                        <MdCancel/>
                                    </Icon_Button_Blue_16>
                                </Container_Row_100_Center>
                                <Container_Row_100_Center>
                                    <Text_Span_16_Center_Black ThemeMode={themeMode}>Imagen (URL):</Text_Span_16_Center_Black>
                                    <Input_Text_100_Black ThemeMode={themeMode}
                                        placeholder="..."
                                        type="text"
                                        value={isTextFieldsSupply.image}
                                        onChange={(e) => setIsTextFieldsSupply(prev => ({...prev, image: e.target.value}))}
                                    />
                                    <Icon_Button_Blue_16 ThemeMode={themeMode} className="pulsate-buttom"
                                        onClick={() => {
                                            setIsTextFieldsSupply(prev => ({...prev, image: ''}))
                                        }}>
                                        <MdCancel/>
                                    </Icon_Button_Blue_16>
                                </Container_Row_100_Center>
                            </Container_Column_100_Center>
                            <Container_Row_NG_Auto_Center>
                                <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}>- Datos especificos...</Text_Span_16_Center_Black>
                            </Container_Row_NG_Auto_Center>
                            <Container_Column_100_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black ThemeMode={themeMode}>- Proveedor...</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
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
                                            <Text_Span_20_Center_Black ThemeMode={themeMode}>No hay datos disponibles</Text_Span_20_Center_Black>
                                        </Container_Row_100_Center>
                                    </>
                                )}
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black ThemeMode={themeMode}>- Tipo de insumo...</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                {isSupplyTypes.length !== 0 && isUnits.length !== 0 ? (
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
                                        {currentRecordsSupplyTypes.length === 0 ? (
                                            <>
                                                <Container_Row_100_Center>
                                                    <Text_Span_20_Center_Black ThemeMode={themeMode}>No hay datos disponibles</Text_Span_20_Center_Black>
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
                                            <Text_Span_20_Center_Black ThemeMode={themeMode}>No hay datos disponibles</Text_Span_20_Center_Black>
                                        </Container_Row_100_Center>
                                    </>
                                )}
                            </Container_Column_100_Center>
                            <Container_Row_100_Center>
                                <Text_Span_12_Justify_Black ThemeMode={themeMode}>Si edita los datos especificos, puede afectar al inventario directemente.</Text_Span_12_Justify_Black>
                            </Container_Row_100_Center>
                            <Container_Row_100_Center>
                                <Tooltip title='Cancelar' placement='top'>
                                    <Button_Icon_Red_210 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalView('')}>
                                        <Icon_20><MdCancel/></Icon_20>
                                    </Button_Icon_Red_210>
                                </Tooltip>
                                <Tooltip title='Agregar' placement='top'>
                                    <Button_Icon_Blue_210 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                        onClick={() => handleSupplyEdit()}>
                                        <Icon_20><MdEdit/></Icon_20>
                                    </Button_Icon_Blue_210>
                                </Tooltip>
                            </Container_Row_100_Center>
                        </Container_Form_500>
                    </Container_Modal>
                </>
            ):(
                currentMView === 'Supply-Edit' ? (
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