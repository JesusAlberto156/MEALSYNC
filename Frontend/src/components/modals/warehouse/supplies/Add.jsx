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
import { SuppliersContext } from "../../../../contexts/SuppliersProvider";
import { SupplyTypesContext,SupplyAddContext } from "../../../../contexts/WarehouseProvider";
// Hooks personalizados
import { ResetTextFieldsSupply } from "../../../../hooks/Texts";
import { HandleModalView } from "../../../../hooks/Views";
import { HandleSupplyAdd } from "../../../../hooks/Form";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { IoIosAddCircle } from "react-icons/io";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Row_100_Center,Container_Column_90_Center,Container_Row_95_Center,Container_Row_NG_95_Center } from "../../../styled/Containers";
import { Text_Title_30_Center,Text_A_16_Left,Text_Blue_16_Left } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Green_210 } from "../../../styled/Buttons";
import { Icon_White_22 } from "../../../styled/Icons";
import { Input_Text_Black_100 } from "../../../styled/Inputs";
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
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const handleSupplyAdd = HandleSupplyAdd();
    const resetTextFieldsSupply = ResetTextFieldsSupply();
    // UseEffect para agregar datos a la base de datos
    useEffect(() => {
        if(isSupplyAdd){
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Supply-Insert',isTextFieldsSupply.name,isTextFieldsSupply.description,isTextFieldsSupply.image,isTextFieldsSupply.supplier,isTextFieldsSupply.type);
                        
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
                                <Text_A_16_Left ThemeMode={themeMode}>- Datos del insumo...</Text_A_16_Left>
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
                                </Container_Row_100_Center>
                                <Container_Row_100_Center>
                                    <Text_A_16_Left ThemeMode={themeMode}>Imagen (URL):</Text_A_16_Left>
                                    <Input_Text_Black_100 ThemeMode={themeMode}
                                        placeholder="..."
                                        type="text"
                                        value={isTextFieldsSupply.image}
                                        onChange={(e) => setIsTextFieldsSupply(prev => ({...prev, image: e.target.value}))}
                                    />
                                </Container_Row_100_Center>
                            </Container_Column_90_Center>
                            <Container_Row_NG_95_Center>
                                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                <Text_A_16_Left ThemeMode={themeMode}>- Proveedor...</Text_A_16_Left>
                            </Container_Row_NG_95_Center>
                            <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Select
                                    options={isSuppliers.map((supplier) => ({
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
                                    value={isSuppliers
                                        .map(supplier => ({ value: supplier.idproveedor, label: supplier.nombre }))
                                        .find(option => option.value === isTextFieldsSupply.supplier)
                                    }
                                    onChange={(e) => setIsTextFieldsSupply(prev => ({...prev, supplier: e.value}))}
                                />
                            </Container_Column_90_Center>
                            <Container_Row_NG_95_Center>
                                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                <Text_A_16_Left ThemeMode={themeMode}>- Tipo de insumo...</Text_A_16_Left>
                            </Container_Row_NG_95_Center>
                            <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Select
                                    options={isSupplyTypes.map((type) => ({
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
                                    placeholder='Seleccione uno...'
                                    value={isSupplyTypes
                                        .map(type => ({ value: type.idtipo, label: type.tipo }))
                                        .find(option => option.value === isTextFieldsSupply.type)
                                    }
                                    onChange={(e) => setIsTextFieldsSupply(prev => ({...prev, type: e.value}))}
                                />
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