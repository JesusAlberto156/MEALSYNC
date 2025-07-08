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
import { TextFieldsSupplyTypesContext } from "../../../../contexts/FormsProvider";
import { ActionBlockContext } from "../../../../contexts/VariablesProvider";
import { SelectedRow1Context } from "../../../../contexts/SelectedesProvider";
import { SearchTerm2Context } from "../../../../contexts/SearchsProvider";
import { UnitsContext,SupplyTypeEditContext } from "../../../../contexts/WarehouseProvider";
// Hooks personalizados
import { HandleModalView } from "../../../../hooks/Views";
import { HandleSupplyTypeEdit } from "../../../../hooks/Form";
import { TableActionsUnits } from "../../../../hooks/Table";
import { ResetSearchTerms } from "../../../../hooks/Texts";
//__________ICONOS__________
// Icono para el buscador
import { FcSearch } from "react-icons/fc";
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { MdEdit } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Row_100_Center,Container_Column_100_Center,Container_Row_100_Center,Container_Row_NG_Auto_Center } from "../../../styled/Containers";
import { Text_Title_32_Black,Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Span_12_Justify_Black,Text_Span_20_Center_Black } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Red_210 } from "../../../styled/Buttons";
import { Icon_20,Icon_20,Icon_Button_Blue_16 } from "../../../styled/Icons";
import { Input_Text_100_Black,Input_Text_60_Black } from "../../../styled/Inputs";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
// Componentes personalizados
import Error_Edit from "../../errors/Edit";
//____________IMPORT/EXPORT____________

// Modal para agregar mediciones
export default function Supply_Type_Edit(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isTextFieldsSupplyTypes,setIsTextFieldsSupplyTypes] = useContext(TextFieldsSupplyTypesContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSupplyTypeEdit,setIsSupplyTypeEdit] = useContext(SupplyTypeEditContext);
    const [isUnits] = useContext(UnitsContext);
    const [isSelectedRow1,setIsSelectedRow1] = useContext(SelectedRow1Context);
    const [socket] = useContext(SocketContext);
    const [isSearchTerm2,setIsSearchTerm2] = useContext(SearchTerm2Context);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const handleSupplyTypeEdit = HandleSupplyTypeEdit();
    const resetSearchTerms = ResetSearchTerms();
    const { currentRecordsUnits } = TableActionsUnits();
    // UseEffect para agregar datos a la base de datos
    useEffect(() => {
        if(isSupplyTypeEdit){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Supply-Type-Update',isTextFieldsSupplyTypes.idtype,isTextFieldsSupplyTypes.type.trim(),isTextFieldsSupplyTypes.description.trim(),isTextFieldsSupplyTypes.idunits);
                        
                        if(isTextFieldsSupplyTypes.type !== isSelectedRow1.tipo || isTextFieldsSupplyTypes.description !== isSelectedRow1.descripcion){
                            socket.emit('Supply-Type-Update-Type',isTextFieldsSupplyTypes.type.trim(),isTextFieldsSupplyTypes.description.trim(),isSelectedRow1.tipo);
                        }
                        
                        resolve('¡MEALSYNC actualizo el tipo de insumo!...');

                        const route = sessionStorage.getItem('Route');

                        setCurrentMView('');
                        sessionStorage.setItem('Modal-View','');
                        setTimeout(() => {
                            setIsModal(false);
                            sessionStorage.setItem('Modal',false);
                            setIsActionBlock(false);
                            setIsSelectedRow1(null);
                            setIsSupplyTypeEdit(false);
                            resetSearchTerms();
                            navigate(route,{ replace: true });
                        },750);
                    },2000);
                }catch(e){
                    setIsActionBlock(false);
                    setIsSupplyTypeEdit(false);
                    return reject('¡Ocurrio un error inesperado actualizando el tipo de insumo!...');
                }
            });

            Alert_Sonner_Promise(promise,'Actualizando un tipo de insumo!...');
        }
    },[isSupplyTypeEdit]);
    // UseEffect para quitar la suscrpcion de socket
    useEffect(() => {
        const handleSupplyTypeUpdate = (message,user) => {
            console.log(message,user);
            socket.emit('Supply-Types');
        };

        const handleSupplyTypeTypeUpdate = (message,user) => {
            console.log(message,user);
            socket.emit('Supply-Types');
        };

        socket.on('Supply-Type-Update',handleSupplyTypeUpdate);
        socket.on('Supply-Type-Update-Type',handleSupplyTypeTypeUpdate);
        
        return () => {
            socket.off('Supply-Type-Update',handleSupplyTypeUpdate);
            socket.off('Supply-Type-Update-Type',handleSupplyTypeTypeUpdate);
        }
    },[socket])
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow1 !== null ? (
                <>
                    <Container_Modal>
                        <Container_Form_500 ThemeMode={themeMode} className={currentMView === 'Supply-Type-Edit' ? 'slide-in-container-top' : 'slide-out-container-top'}>
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
                                    <Input_Text_100_Black ThemeMode={themeMode}
                                        placeholder="..."
                                        type="text"
                                        value={isTextFieldsSupplyTypes.type}
                                        onChange={(e) => setIsTextFieldsSupplyTypes(prev => ({...prev, type: e.target.value}))}
                                    />
                                </Container_Row_100_Center>
                                <Container_Row_100_Center>
                                    <Text_Span_16_Center_Black ThemeMode={themeMode}>Descripción:</Text_Span_16_Center_Black>
                                    <Input_Text_100_Black ThemeMode={themeMode}
                                        placeholder="..."
                                        type="text"
                                        value={isTextFieldsSupplyTypes.description}
                                        onChange={(e) => setIsTextFieldsSupplyTypes(prev => ({...prev, description: e.target.value}))}
                                    />
                                    <Icon_Button_Blue_16 ThemeMode={themeMode} className="pulsate-buttom"
                                        onClick={() => {
                                            setIsTextFieldsSupplyTypes(prev => ({...prev, description: ''}))
                                        }}>
                                        <MdCancel/>
                                    </Icon_Button_Blue_16>
                                </Container_Row_100_Center>
                            </Container_Column_100_Center>
                            <Container_Row_100_Center>
                                <Text_Span_12_Justify_Black ThemeMode={themeMode}>Si editas los datos generales, se modificarán para todos los tipos de insumo que compartan el mismo nombre, incluso si cambias el nombre en uno de ellos.</Text_Span_12_Justify_Black>
                            </Container_Row_100_Center>
                            <Container_Row_NG_Auto_Center>
                                <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}>- Datos especificos...</Text_Span_16_Center_Black>
                            </Container_Row_NG_Auto_Center>
                            <Container_Column_100_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black ThemeMode={themeMode}>- Medidas...</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                {isUnits.length !== 0 ? (
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
                                        {currentRecordsUnits.length === 0 ? (
                                            <>
                                                <Container_Row_100_Center>
                                                    <Text_Span_20_Center_Black ThemeMode={themeMode}>No hay datos disponibles</Text_Span_20_Center_Black>
                                                </Container_Row_100_Center>
                                            </>
                                        ):(
                                            <>
                                                <Select
                                                    options={currentRecordsUnits.map((unit) => ({
                                                        value: unit.idmedida,
                                                        label: `${unit.nombre} - ${unit.cantidad} - ${unit.unidad}`
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
                                                        .map(unit => ({ value: unit.idmedida, label: `${unit.nombre} - ${unit.cantidad} - ${unit.unidad}`}))
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
                                            <Text_Span_20_Center_Black ThemeMode={themeMode}>No hay datos disponibles</Text_Span_20_Center_Black>
                                        </Container_Row_100_Center>
                                    </>
                                )}
                            </Container_Column_100_Center>
                            <Container_Row_100_Center>
                                <Tooltip title='Cancelar' placement='top'>
                                    <Button_Icon_Red_210 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalView('')}>
                                        <Icon_20><MdCancel/></Icon_20>
                                    </Button_Icon_Red_210>
                                </Tooltip>
                                <Tooltip title='Editar' placement='top'>
                                    <Button_Icon_Blue_210 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                        onClick={() => handleSupplyTypeEdit()}>
                                        <Icon_20><MdEdit/></Icon_20>
                                    </Button_Icon_Blue_210>
                                </Tooltip>
                            </Container_Row_100_Center>
                        </Container_Form_500>
                    </Container_Modal>
                </>
            ):(
                currentMView === 'Supply-Type-Edit' ? (
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