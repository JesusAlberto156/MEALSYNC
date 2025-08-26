//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { Tooltip } from "@mui/material";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../contexts/ViewsProvider";
import { ActionBlockContext,TouchContext,KeyboardContext,KeyboardViewContext } from "../../../contexts/VariablesProvider";
import { TextFieldsOrderDoctorContext } from "../../../contexts/FormsProvider";
import { RefKeyboardContext,RefKeyboardTouchContext } from "../../../contexts/RefsProvider";
import { LoggedLogContext } from "../../../contexts/SessionProvider";
import { SurgeriesContext,SurgeryTypesContext } from "../../../contexts/OrdersProvider";
import { SocketContext } from "../../../contexts/SocketProvider";
// Hooks personalizados
import { HandleKeyboard } from "../../../hooks/Views";
import { FilteredRecordsSurgeryDoctor,FilteredRecordsSurgeryDoctorDoctor,HandleDoctorVerification } from "../../../hooks/orders/Forms";
//__________ICONOS__________
import { MdCancel } from "react-icons/md";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { IoReloadCircle } from "react-icons/io5";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Row_NG_Auto_Center,Container_Modal_Form_White_600,Container_Modal_Form_White,Container_Modal_Form,Container_Row_100_Left, Container_Row_100_Center, Container_Modal_Form_Button } from "../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Title_28_Black, Text_Color_Green_16 } from "../../styled/Text";
import { Input_Text_100_Black,Input_Group } from "../../styled/Inputs";
import { Icon_16, Icon_Button_Blue_20 } from "../../styled/Icons";
import { Label_Text_12_Black,Label_Text_16_Black } from "../../styled/Labels";
import { Button_Icon_Blue_Auto_40, Button_Icon_Red_Auto_40 } from "../../styled/Buttons";
// Componentes personalizados
import { Image_Modal } from "../../styled/Imgs";
import { Select_300 } from "../../styled/Selects";
import { Keyboard_Form_Surgeries } from "../../keyboards/Form";
//____________IMPORT/EXPORT____________

// Modal para verificar cirugias disponibles
export default function Alert_Medico(){
    // Constantes con el valor de los contextos
    const [currentMView] = useContext(ModalViewContext);
    const [isModal] = useContext(ModalContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const Keyboard = useContext(RefKeyboardContext);
    const isKeyboardTouch = useContext(RefKeyboardTouchContext);
    const [isTouch] = useContext(TouchContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isSurgeries] = useContext(SurgeriesContext);
    const [isSurgeryTypes] = useContext(SurgeryTypesContext);
    const [isLoggedLog,setIsLoggedLog] = useContext(LoggedLogContext);
    const [socket] = useContext(SocketContext);
    const [isTextFieldsOrderDoctor,setIsTextFieldsOrderDoctor] = useContext(TextFieldsOrderDoctorContext); 
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    // Constantes con la funcionalidad de los hooks
    const { KeyboardView,KeyboardClick } = HandleKeyboard();
    const filteredRecordsSurgeryDoctor = FilteredRecordsSurgeryDoctor();
    const filteredRecordsSurgeryDoctorDoctor = FilteredRecordsSurgeryDoctorDoctor();
    const handleDoctorVerification = HandleDoctorVerification();
    // Constantes con el valor de useState
    const [isTotal,setIsTotal] = useState(0)
    // UseEffects para el limite de caracteres de los campos del formulario
    useEffect(() => {
        setIsTotal(isTextFieldsOrderDoctor.solicitante.length);
    },[isTextFieldsOrderDoctor.solicitante]);
    useEffect(() => {
        setIsTextFieldsOrderDoctor(prev => ({
            ...prev,
            idcirugia: 0,
            cirugia: '',
            sala: '',
        }))
    },[isTextFieldsOrderDoctor.medico])
    // Useffect para controlar el sidebar
    useEffect(() => {
        if(isSidebar){
            setIsSidebar(false);
        }
    },[]);
    // UseEffets para controlar el teclado
    useEffect(() => {
        KeyboardView();
    },[]);
    useEffect(() => {
        KeyboardClick();
    },[Keyboard]);
    useEffect(() => {
        isKeyboardTouch.current = isTouch;
    },[isTouch]);
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <Container_Modal_Background_Black>
                    <Image_Modal/>
                    <Container_Modal_Form_White_600 className={currentMView === 'Alerta-Médico' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Modal_Form_White>
                            <Container_Modal_Form>
                                <Text_Title_28_Black>VERIFICACIÓN DE CIRUGÍA</Text_Title_28_Black>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black>: Datos generales</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_100_Center>
                                    <Select_300
                                        data={filteredRecordsSurgeryDoctor.length}
                                        options={filteredRecordsSurgeryDoctor.map((surgery) => ({
                                            value: surgery.IDE,
                                            label: surgery.Cirujano,
                                        }))}
                                        placeholder='Cirujanos...'
                                        value={filteredRecordsSurgeryDoctor
                                            .map(surgery => ({ value: surgery.IDE, label: surgery.Cirujano,}))
                                            .find(option => option.label === isTextFieldsOrderDoctor.medico)
                                        }
                                        onChange={(e) => {
                                            if (e) {
                                                setIsTextFieldsOrderDoctor(prev => ({
                                                    ...prev,
                                                    medico: e.label,
                                                }));
                                            } else {
                                                setIsTextFieldsOrderDoctor(prev => ({
                                                    ...prev,
                                                    medico: '',
                                                }));
                                            }
                                        }}
                                        isDisabled={isActionBlock}
                                    />
                                    <Icon_Button_Blue_20 
                                        disabled={isActionBlock}
                                        onClick={() => {
                                            socket.emit('Get-Surgeries');
                                            socket.emit('Get-Surgery-Types');
                                        }}
                                    >
                                        <IoReloadCircle/>
                                    </Icon_Button_Blue_20>
                                </Container_Row_100_Center>
                                {isTextFieldsOrderDoctor.medico !== '' ? (
                                    <Select_300
                                        data={filteredRecordsSurgeryDoctorDoctor.length}
                                        options={filteredRecordsSurgeryDoctorDoctor.map((surgery) => ({
                                            value: surgery.IDE,
                                            label: `${isSurgeryTypes.find(s => s.ID === surgery.ID_Cirugia)?.NombreCirugia}`
                                        }))}
                                        placeholder='Cirugías...'
                                        value={filteredRecordsSurgeryDoctorDoctor
                                            .map(surgery => ({ value: surgery.IDE, label: `${isSurgeryTypes.find(s => s.ID === surgery.ID_Cirugia)?.NombreCirugia}` }))
                                            .find(option => option.label === isTextFieldsOrderDoctor.cirugia)
                                        }
                                        onChange={(e) => {
                                            if (e) {
                                                setIsTextFieldsOrderDoctor(prev => ({
                                                    ...prev,
                                                    idcirugia: e.value,
                                                    cirugia: e.label,
                                                    sala: isSurgeries.find(s => s.IDE === e.value)?.Sala,
                                                }));
                                            } else {
                                                setIsTextFieldsOrderDoctor(prev => ({
                                                    ...prev,
                                                    idcirugia: 0,
                                                    cirugia: '',
                                                    sala: '',
                                                }));
                                            }
                                        }}
                                        isDisabled={isActionBlock}
                                    />
                                ):(
                                    <Container_Row_100_Center>
                                        <Text_Span_16_Center_Black>¡No hay selección de cirujano!</Text_Span_16_Center_Black>
                                    </Container_Row_100_Center>
                                )}
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Ubicación</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>:</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_100_Left>
                                    <Label_Text_16_Black>Sala:</Label_Text_16_Black>
                                    <Input_Group>
                                        <Input_Text_100_Black
                                            id="Input-Nombre"
                                            placeholder="..."
                                            type="text"
                                            disabled
                                            value={isTextFieldsOrderDoctor.sala}
                                        />
                                        <Label_Text_12_Black>{isTextFieldsOrderDoctor.sala.length}/10</Label_Text_12_Black>
                                    </Input_Group>
                                </Container_Row_100_Left>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black>: Datos específicos</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_100_Left>
                                    <Label_Text_16_Black>Solicitante:</Label_Text_16_Black>
                                    <Input_Group>
                                        <Input_Text_100_Black
                                            id="Input-Solicitante"
                                            placeholder="..."
                                            type="text"
                                            maxLength={150}
                                            disabled={isActionBlock}
                                            value={isTextFieldsOrderDoctor.solicitante}
                                            onChange={(e) => setIsTextFieldsOrderDoctor(prev => ({...prev, solicitante: e.target.value}))}
                                            onFocus={() => {
                                                if(isKeyboardTouch.current){
                                                    setIsKeyboard(true);
                                                    setIsKeyboardView('Solicitante');
                                                }
                                            }}
                                        />
                                        <Label_Text_12_Black>{isTotal}/150</Label_Text_12_Black>
                                    </Input_Group>
                                    <Icon_Button_Blue_20
                                        onClick={() => {
                                            setIsTextFieldsOrderDoctor(prev => ({...prev, solicitante: ''}))
                                        }}
                                        disabled={isActionBlock}
                                    >
                                        <MdCancel/>
                                    </Icon_Button_Blue_20>
                                </Container_Row_100_Left>
                                <Container_Row_100_Left>
                                    <Label_Text_16_Black>Clave de autorización:</Label_Text_16_Black>
                                    <Input_Group>
                                        <Input_Text_100_Black
                                            id="Input-Clave"
                                            placeholder="..."
                                            type="text"
                                            maxLength={20}
                                            disabled={isActionBlock}
                                            value={isTextFieldsOrderDoctor.clavesecreta}
                                            onChange={(e) => setIsTextFieldsOrderDoctor(prev => ({...prev, clavesecreta: e.target.value}))}
                                            onFocus={() => {
                                                if(isKeyboardTouch.current){
                                                    setIsKeyboard(true);
                                                    setIsKeyboardView('Clave');
                                                }
                                            }}
                                        />
                                        <Label_Text_12_Black>{isTextFieldsOrderDoctor.clavesecreta.length}/20</Label_Text_12_Black>
                                    </Input_Group>
                                    <Icon_Button_Blue_20
                                        onClick={() => {
                                            setIsTextFieldsOrderDoctor(prev => ({...prev, clavesecreta: ''}))
                                        }}
                                        disabled={isActionBlock}
                                    >
                                        <MdCancel/>
                                    </Icon_Button_Blue_20>
                                </Container_Row_100_Left>
                                <Container_Modal_Form_Button>
                                    {isActionBlock ? (
                                        <>
                                            <Button_Icon_Red_Auto_40 disabled>
                                                <Icon_16><ImExit/></Icon_16>
                                            </Button_Icon_Red_Auto_40>
                                            <Button_Icon_Blue_Auto_40 disabled>
                                                <Icon_16><FaArrowAltCircleRight/></Icon_16>
                                            </Button_Icon_Blue_Auto_40>
                                        </>
                                    ):(
                                        <>
                                            <Tooltip title='Cerrar sesión' placement="bottom">
                                                <Button_Icon_Red_Auto_40 
                                                    onClick={() => {
                                                        setIsActionBlock(true);
                                                        setIsLoggedLog(true);
                                                    }}
                                                >
                                                    <Icon_16><ImExit/></Icon_16>
                                                </Button_Icon_Red_Auto_40>
                                            </Tooltip>
                                            <Tooltip title='Avanzar' placement="bottom">
                                                <Button_Icon_Blue_Auto_40 
                                                    onClick={() => {
                                                        handleDoctorVerification();
                                                    }}
                                                >
                                                    <Icon_16><FaArrowAltCircleRight/></Icon_16>
                                                </Button_Icon_Blue_Auto_40>
                                            </Tooltip>
                                        </>
                                    )}
                                </Container_Modal_Form_Button>
                            </Container_Modal_Form>
                        </Container_Modal_Form_White>
                    </Container_Modal_Form_White_600>
                    <Keyboard_Form_Surgeries/>
                </Container_Modal_Background_Black>
            ):(
                <></>
            )}
        </>
    );
}