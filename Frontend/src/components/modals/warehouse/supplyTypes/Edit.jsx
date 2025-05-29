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
import { ActionBlockContext,SelectedRow1Context,SearchTerm2Context } from "../../../../contexts/VariablesProvider";
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
import { Container_Modal,Container_Form_500,Container_Row_100_Center,Container_Column_90_Center,Container_Row_95_Center,Container_Row_NG_95_Center } from "../../../styled/Containers";
import { Text_Title_30_Center,Text_A_16_Left,Text_Blue_16_Left,Text_A_12_Justify,Text_A_20_Center } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Red_210 } from "../../../styled/Buttons";
import { Icon_White_22,Icon_22,Icon_Button_Blue_18 } from "../../../styled/Icons";
import { Input_Text_Black_100,Input_Text_Black_50 } from "../../../styled/Inputs";
import { Alert_Verification } from "../../../styled/Alerts";
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

            Alert_Verification(promise,'Actualizando un tipo de insumo!...');
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
                                <Text_Title_30_Center ThemeMode={themeMode}>EDITAR TIPO DE INSUMO</Text_Title_30_Center>
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
                            </Container_Column_90_Center>
                            <Container_Row_100_Center>
                                <Text_A_12_Justify ThemeMode={themeMode}>Si editas los datos generales, se modificarán para todos los tipos de insumo que compartan el mismo nombre, incluso si cambias el nombre en uno de ellos.</Text_A_12_Justify>
                            </Container_Row_100_Center>
                            <Container_Row_NG_95_Center>
                                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                <Text_A_16_Left ThemeMode={themeMode}>- Datos especificos...</Text_A_16_Left>
                            </Container_Row_NG_95_Center>
                            <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Container_Row_NG_95_Center>
                                    <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                    <Text_A_16_Left ThemeMode={themeMode}>- Medidas...</Text_A_16_Left>
                                </Container_Row_NG_95_Center>
                                {isUnits.length !== 0 ? (
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
                                    <Button_Icon_Red_210 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalView('')}>
                                        <Icon_White_22><MdCancel/></Icon_White_22>
                                    </Button_Icon_Red_210>
                                </Tooltip>
                                <Tooltip title='Editar' placement='top'>
                                    <Button_Icon_Blue_210 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                        onClick={() => handleSupplyTypeEdit()}>
                                        <Icon_White_22><MdEdit/></Icon_White_22>
                                    </Button_Icon_Blue_210>
                                </Tooltip>
                            </Container_Row_95_Center>
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