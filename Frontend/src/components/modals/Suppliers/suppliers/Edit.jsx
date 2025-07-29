//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { ActionBlockContext,TouchContext,KeyboardContext,KeyboardViewContext } from "../../../../contexts/VariablesProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { TextFieldsSupplierContext } from "../../../../contexts/FormsProvider";
import { SupplierEditContext } from "../../../../contexts/SuppliersProvider";
import { RefModalContext,RefFormContext,RefKeyboardContext,RefKeyboardTouchContext } from "../../../../contexts/RefsProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleModalViewSuppliers } from "../../../../hooks/suppliers/Views";
import { HandleSupplierEdit } from "../../../../hooks/suppliers/Forms";
import { HandleKeyboard } from "../../../../hooks/Views";
//__________ICONOS__________
import { MdCancel } from "react-icons/md";
import { FaStar } from "react-icons/fa";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Row_100_Center,Container_Row_NG_Auto_Center,Container_Modal_Form_White_600,Container_Modal_Form_White,Container_Modal_Form,Container_Row_100_Left } from "../../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Span_12_Justify_Black,Text_Title_28_Black } from "../../../styled/Text";
import { Input_Text_100_Black,Input_Group } from "../../../styled/Inputs";
import { Icon_Button_Blue_20,Icon_Green_28,Icon_Lime_Green_28,Icon_Yellow_28,Icon_Orange_28,Icon_Red_28,Icon_Blue_28,Icon_Black_28 } from "../../../styled/Icons";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
import { Label_Text_12_Black,Label_Text_16_Black } from "../../../styled/Labels";
// Componentes personalizados
import { Image_Modal } from "../../../styled/Imgs";
import Error_Edit from "../../errors/Edit";
import { Keyboard_Form_Supplier } from "../../../keyboards/Form";
import { Modal_Form_Button_Edit } from "../../../forms/Button";
//____________IMPORT/EXPORT____________

// Modal para editar proveedores a su tabla
export default function Supplier_Edit(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSupplierEdit,setIsSupplierEdit] = useContext(SupplierEditContext);
    const [isTextFieldsSupplier,setIsTextFieldsSupplier] = useContext(TextFieldsSupplierContext);
    const Modal = useContext(RefModalContext); 
    const isForm = useContext(RefFormContext);
    const [socket] = useContext(SocketContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const isKeyboardTouch = useContext(RefKeyboardTouchContext);
    const [isTouch] = useContext(TouchContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewSuppliers = HandleModalViewSuppliers();
    const handleSupplierEdit = HandleSupplierEdit();
    const { KeyboardView,KeyboardClick } = HandleKeyboard();
    // Constantes con el valor de useState
    const [isTotalName,setIsTotalName] = useState(0);
    const [isTotalRFC,setIsTotalRFC] = useState(0);
    const [isTotalAddress,setIsTotalAddress] = useState(0);
    const [isTotalPhone,setIsTotalPhone] = useState(0);
    const [isTotalEmail,setIsTotalEmail] = useState(0);
    // UseEffects para el limite de caracteres de los campos del formulario
    useEffect(() => {
        setIsTotalName(isTextFieldsSupplier.nombre.length)
    },[isTextFieldsSupplier.nombre]);
    useEffect(() => {
        setIsTotalRFC(isTextFieldsSupplier.rfc.length);
    },[isTextFieldsSupplier.rfc]);
    useEffect(() => {
        setIsTotalAddress(isTextFieldsSupplier.domicilio.length);
    },[isTextFieldsSupplier.domicilio]);
    useEffect(() => {
        setIsTotalPhone(isTextFieldsSupplier.telefono.length);
    },[isTextFieldsSupplier.telefono]);
    useEffect(() => {
        setIsTotalEmail(isTextFieldsSupplier.correo.length);
    },[isTextFieldsSupplier.correo]);
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
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isSupplierEdit){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Update-Supplier',isLoggedUser.idusuario,isTextFieldsSupplier.idproveedor,isTextFieldsSupplier.nombre.trim(),isTextFieldsSupplier.rfc.trim(),isTextFieldsSupplier.domicilio.trim(),isTextFieldsSupplier.telefono.trim(),isTextFieldsSupplier.correo.trim())

                        resolve('¡Editó al proveedor!');

                        setIsSupplierEdit(false);

                        const route = sessionStorage.getItem('Ruta');
                        const sidebar = sessionStorage.getItem('Estado del Sidebar');

                        setCurrentMView('');
                        sessionStorage.setItem('Vista del Modal','');
                        setTimeout(() => {
                            if(sidebar === 'true'){
                                setIsSidebar(true);
                            }
                            setIsModal(false);
                            sessionStorage.setItem('Estado del Modal',false);
                            setIsSelectedRow(null);
                            setIsActionBlock(false);
                            return navigate(route,{ replace: true });
                        },750);
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    setIsSupplierEdit(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Editando un proveedor!','2');
        }
    },[isSupplierEdit]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <Container_Modal_Background_Black ref={Modal}>
                    <Image_Modal/>
                    <Container_Modal_Form_White_600 ref={isForm} className={currentMView === 'Proveedor-Editar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Modal_Form_White>
                            <Container_Modal_Form>
                                <Text_Title_28_Black>EDITAR PROVEEDOR</Text_Title_28_Black>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black>: Datos generales</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_100_Left>
                                    <Label_Text_16_Black>Nombre:</Label_Text_16_Black>
                                    <Input_Group>
                                        <Input_Text_100_Black
                                            id="Input-Nombre"
                                            placeholder="..."
                                            type="text"
                                            maxLength={150}
                                            disabled={isActionBlock}
                                            value={isTextFieldsSupplier.nombre}
                                            onChange={(e) => setIsTextFieldsSupplier(prev => ({...prev, nombre: e.target.value}))}
                                            onFocus={() => {
                                                if(isKeyboardTouch.current){
                                                    setIsKeyboard(true);
                                                    setIsKeyboardView('Nombre-Proveedor');
                                                }
                                            }}
                                        />
                                        <Label_Text_12_Black>{isTotalName}/150</Label_Text_12_Black>
                                    </Input_Group>
                                    <Icon_Button_Blue_20
                                        onClick={() => {
                                            setIsTextFieldsSupplier(prev => ({...prev, nombre: ''}))
                                        }}
                                        disabled={isActionBlock}
                                    >
                                        <MdCancel/>
                                    </Icon_Button_Blue_20>
                                </Container_Row_100_Left>
                                <Container_Row_100_Left>
                                    <Label_Text_16_Black>RFC:</Label_Text_16_Black>
                                    <Input_Group>
                                        <Input_Text_100_Black
                                            id="Input-RFC"
                                            placeholder="..."
                                            type="text"
                                            maxLength={30}
                                            disabled={isActionBlock}
                                            value={isTextFieldsSupplier.rfc}
                                            onChange={(e) => setIsTextFieldsSupplier(prev => ({...prev, rfc: e.target.value}))}
                                            onFocus={() => {
                                                if(isKeyboardTouch.current){
                                                    setIsKeyboard(true);
                                                    setIsKeyboardView('RFC');
                                                }
                                            }}
                                        />
                                        <Label_Text_12_Black>{isTotalRFC}/30</Label_Text_12_Black>
                                    </Input_Group>
                                    <Icon_Button_Blue_20
                                        onClick={() => {
                                            setIsTextFieldsSupplier(prev => ({...prev, rfc: ''}))
                                        }}
                                        disabled={isActionBlock}
                                    >
                                        <MdCancel/>
                                    </Icon_Button_Blue_20>
                                </Container_Row_100_Left>
                                <Container_Row_100_Left>
                                    <Label_Text_16_Black>Domicilio:</Label_Text_16_Black>
                                    <Input_Group>
                                        <Input_Text_100_Black
                                            id="Input-Domicilio"
                                            placeholder="..."
                                            type="text"
                                            maxLength={150}
                                            disabled={isActionBlock}
                                            value={isTextFieldsSupplier.domicilio}
                                            onChange={(e) => setIsTextFieldsSupplier(prev => ({...prev, domicilio: e.target.value}))}
                                            onFocus={() => {
                                                if(isKeyboardTouch.current){
                                                    setIsKeyboard(true);
                                                    setIsKeyboardView('Domicilio');
                                                }
                                            }}
                                        />
                                        <Label_Text_12_Black>{isTotalAddress}/150</Label_Text_12_Black>
                                    </Input_Group>
                                    <Icon_Button_Blue_20
                                        onClick={() => {
                                            setIsTextFieldsSupplier(prev => ({...prev, domicilio: ''}))
                                        }}
                                        disabled={isActionBlock}
                                    >
                                        <MdCancel/>
                                    </Icon_Button_Blue_20>
                                </Container_Row_100_Left>
                                <Container_Row_100_Left>
                                    <Label_Text_16_Black>Teléfono:</Label_Text_16_Black>
                                    <Input_Group>
                                        <Input_Text_100_Black
                                            id="Input-Telefono"
                                            placeholder="..."
                                            type="text"
                                            maxLength={20}
                                            disabled={isActionBlock}
                                            value={isTextFieldsSupplier.telefono}
                                            onChange={(e) => {
                                                if(!isNaN(Number(e.target.value))){
                                                    setIsTextFieldsSupplier(prev => ({...prev, telefono: e.target.value}))
                                                }
                                            }}
                                            onFocus={() => {
                                                if(isKeyboardTouch.current){
                                                    setIsKeyboard(true);
                                                    setIsKeyboardView('Telefono');
                                                }
                                            }}
                                        />
                                        <Label_Text_12_Black>{isTotalPhone}/20</Label_Text_12_Black>
                                    </Input_Group>
                                    <Icon_Button_Blue_20
                                        onClick={() => {
                                            setIsTextFieldsSupplier(prev => ({...prev, telefono: ''}))
                                        }}
                                        disabled={isActionBlock}
                                    >
                                        <MdCancel/>
                                    </Icon_Button_Blue_20>
                                </Container_Row_100_Left>
                                <Container_Row_100_Left>
                                    <Label_Text_16_Black>Correo:</Label_Text_16_Black>
                                    <Input_Group>
                                        <Input_Text_100_Black
                                            id="Input-Correo"
                                            placeholder="..."
                                            type="text"
                                            maxLength={150}
                                            disabled={isActionBlock}
                                            value={isTextFieldsSupplier.correo}
                                            onChange={(e) => setIsTextFieldsSupplier(prev => ({...prev, correo: e.target.value}))}
                                            onFocus={() => {
                                                if(isKeyboardTouch.current){
                                                    setIsKeyboard(true);
                                                    setIsKeyboardView('Correo');
                                                }
                                            }}
                                        />
                                        <Label_Text_12_Black>{isTotalEmail}/150</Label_Text_12_Black>
                                    </Input_Group>
                                    <Icon_Button_Blue_20
                                        onClick={() => {
                                            setIsTextFieldsSupplier(prev => ({...prev, correo: ''}))
                                        }}
                                        disabled={isActionBlock}
                                    >
                                        <MdCancel/>
                                    </Icon_Button_Blue_20>
                                </Container_Row_100_Left>
                                <Container_Row_100_Center>
                                    {isTextFieldsSupplier.calificacion === 0 ? (
                                        <>
                                            <Icon_Blue_28 className='pulsate-icon-fwd-0'><FaStar/></Icon_Blue_28>
                                            <Icon_Blue_28 className='pulsate-icon-fwd-1'><FaStar/></Icon_Blue_28>
                                            <Icon_Blue_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Blue_28>
                                            <Icon_Black_28 className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_28>
                                            <Icon_Black_28 className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                        </>
                                    ):(
                                        isTextFieldsSupplier.calificacion <= 1 ? (
                                            <>
                                                <Icon_Red_28 className='pulsate-icon-fwd-0'><FaStar/></Icon_Red_28>
                                                <Icon_Black_28 className='pulsate-icon-fwd-1'><FaStar/></Icon_Black_28>
                                                <Icon_Black_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Black_28>
                                                <Icon_Black_28 className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_28>
                                                <Icon_Black_28 className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                            </>
                                        ):(
                                            isTextFieldsSupplier.calificacion <=2 ? (
                                                <>
                                                    <Icon_Orange_28 className='pulsate-icon-fwd-0'><FaStar/></Icon_Orange_28>
                                                    <Icon_Orange_28 className='pulsate-icon-fwd-1'><FaStar/></Icon_Orange_28>
                                                    <Icon_Black_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Black_28>
                                                    <Icon_Black_28 className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_28>
                                                    <Icon_Black_28 className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                                </>
                                            ):(
                                                isTextFieldsSupplier.calificacion <=3 ? (
                                                    <>
                                                        <Icon_Yellow_28 className='pulsate-icon-fwd-0'><FaStar/></Icon_Yellow_28>
                                                        <Icon_Yellow_28 className='pulsate-icon-fwd-1'><FaStar/></Icon_Yellow_28>
                                                        <Icon_Yellow_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Yellow_28>
                                                        <Icon_Black_28 className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_28>
                                                        <Icon_Black_28 className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                                    </>
                                                ):(
                                                    isTextFieldsSupplier.calificacion <=4 ? (
                                                        <>
                                                            <Icon_Lime_Green_28 className='pulsate-icon-fwd-0'><FaStar/></Icon_Lime_Green_28>
                                                            <Icon_Lime_Green_28 className='pulsate-icon-fwd-1'><FaStar/></Icon_Lime_Green_28>
                                                            <Icon_Lime_Green_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Lime_Green_28>
                                                            <Icon_Lime_Green_28 className='pulsate-icon-fwd-3'><FaStar/></Icon_Lime_Green_28>
                                                            <Icon_Black_28 className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                                        </>
                                                    ):(
                                                        isTextFieldsSupplier.calificacion <=5 ? (
                                                            <>
                                                                <Icon_Green_28 className='pulsate-icon-fwd-0'><FaStar/></Icon_Green_28>
                                                                <Icon_Green_28 className='pulsate-icon-fwd-1'><FaStar/></Icon_Green_28>
                                                                <Icon_Green_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Green_28>
                                                                <Icon_Green_28 className='pulsate-icon-fwd-3'><FaStar/></Icon_Green_28>
                                                                <Icon_Green_28 className='pulsate-icon-fwd-4'><FaStar/></Icon_Green_28>
                                                            </>
                                                        ):(
                                                            <></>
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    )}
                                </Container_Row_100_Center>
                                <Text_Span_12_Justify_Black>Es importante recordar la modificación del nombre, ya que este se emplea para identificar los insumos asociados al proveedor, para registrar nuevos insumos a su nombre o realizar solicitudes de insumos a su nombre.</Text_Span_12_Justify_Black>
                                <Modal_Form_Button_Edit
                                    onCancel={() => handleModalViewSuppliers('')}
                                    onAction={() => handleSupplierEdit()}
                                />
                            </Container_Modal_Form>
                        </Container_Modal_Form_White>
                    </Container_Modal_Form_White_600>
                    <Keyboard_Form_Supplier/>
                </Container_Modal_Background_Black>
            ):(
                currentMView === 'Proveedor-Editar' ? (
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