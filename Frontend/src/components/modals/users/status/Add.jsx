//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { TextFieldsStatusContext } from "../../../../contexts/FormsProvider";
import { ActionBlockContext } from "../../../../contexts/VariablesProvider";
import { StatusAddContext } from "../../../../contexts/UsersProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
// Hooks personalizados
import { HandleModalViewUsers } from "../../../../hooks/users/Views";
import { HandleStatusSAdd,FilteredRecordsHasStatus } from "../../../../hooks/users/Forms";
//__________IMAGENES__________
import Logo_Hospital from '../../../imgs/Logo-Hospital.png'
//__________IMAGENES__________
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Modal_Image,Container_Row_100_Center,Container_Row_NG_Auto_Center,Container_Modal_Form_White_600,Container_Modal_Form_White,Container_Modal_Form } from "../../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Title_28_Black,Text_Color_Green_16 } from "../../../styled/Text";
import { Label_Button_16_Black } from "../../../styled/Labels";
import { Icon_Button_Blue_20 } from "../../../styled/Icons";
import { Input_Radio_20 } from "../../../styled/Inputs";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
import { Select_300 } from "../../../styled/Selects";
import { Modal_Form_Button_Add } from "../../../forms/Button";
import { Image_Modal_Fixed } from "../../../styled/Imgs";
//____________IMPORT/EXPORT____________

// Modal para agregar estatus al usuario
export default function Status_Add(){
    // Constantes con el valor de los contextos
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isStatusAdd,setIsStatusAdd] = useContext(StatusAddContext);
    const [socket] = useContext(SocketContext);
    const [isTextFieldsStatus,setIsTextFieldsStatus] = useContext(TextFieldsStatusContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewUsers = HandleModalViewUsers();
    const filteredRecordsHasStatus = FilteredRecordsHasStatus();
    const handleStatusSAdd = HandleStatusSAdd();
    // Useffect para controlar el sidebar
    useEffect(() => {
        if(isSidebar){
            setIsSidebar(false);
        }
    },[]);
    // UseEffect para agregar datos a la base de datos
    useEffect(() => {
        if(isStatusAdd){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Status',isLoggedUser.idusuario,isTextFieldsStatus.estatus === 'Habilitado' ? 1:0,isTextFieldsStatus.idusuario);

                        resolve('¡Agregó el estatus al usuario!');

                        setIsStatusAdd(false);

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
                            setIsActionBlock(false);
                            setIsSelectedRow(null);
                            return navigate(route,{ replace: true });
                        },750);
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    setIsStatusAdd(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Agregando estatus al usuario!','2');
        }
    },[isStatusAdd]);
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <>
                    <Container_Modal_Background_Black>
                        <Container_Modal_Image>
                            <Image_Modal_Fixed src={Logo_Hospital}/>
                        </Container_Modal_Image>
                        <Container_Modal_Form_White_600 className={currentMView === 'Estatus-Agregar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Modal_Form_White>
                                <Container_Modal_Form>
                                    <Text_Title_28_Black>AGREGAR ESTATUS</Text_Title_28_Black>
                                    <Container_Row_NG_Auto_Center>
                                        <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                        <Text_Span_16_Center_Black>: Datos generales</Text_Span_16_Center_Black>
                                    </Container_Row_NG_Auto_Center>
                                    <Select_300
                                        data={filteredRecordsHasStatus}
                                        options={filteredRecordsHasStatus.map((user) => ({
                                            value: user.idusuario,
                                            label: user.usuario
                                        }))}
                                        placeholder='Usuarios...'
                                        value={filteredRecordsHasStatus
                                            .map(user => ({ value: user.idusuario, label: user.usuario }))
                                            .find(option => option.value === isTextFieldsStatus.idusuario)
                                        }
                                        onChange={(e) => {
                                            if (e) {
                                                setIsTextFieldsStatus(prev => ({
                                                    ...prev,
                                                    idusuario: e.value,
                                                    usuario: e.label
                                                }));
                                            } else {
                                                setIsTextFieldsStatus(prev => ({
                                                    ...prev,
                                                    idusuario: 0,
                                                    usuario: ''
                                                }));
                                            }
                                        }}
                                        isDisabled={isActionBlock}
                                    />
                                    <Container_Row_NG_Auto_Center>
                                        <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                        <Text_Span_16_Center_Black>: Datos específicos</Text_Span_16_Center_Black>
                                    </Container_Row_NG_Auto_Center>
                                    <Container_Row_100_Center>
                                        <Text_Color_Green_16>Estatus</Text_Color_Green_16>
                                        <Icon_Button_Blue_20
                                            onClick={() => {
                                                setIsTextFieldsStatus(prev => ({...prev, estatus: ''}))
                                            }}
                                            disabled={isActionBlock}
                                        >
                                            <MdCancel/>
                                        </Icon_Button_Blue_20>
                                    </Container_Row_100_Center>
                                    <Container_Row_100_Center>
                                        {['Habilitado','Deshabilitado'].map((item,index) => (
                                            <Label_Button_16_Black key={index}>
                                                <Input_Radio_20
                                                    type="radio"
                                                    name="group"
                                                    value={item}
                                                    checked={isTextFieldsStatus.estatus === item}
                                                    disabled={isActionBlock}
                                                    onChange={(e) => setIsTextFieldsStatus(prev => ({...prev, estatus: e.target.value}))}
                                                />
                                                {item}
                                            </Label_Button_16_Black>
                                        ))}
                                    </Container_Row_100_Center>
                                    <Modal_Form_Button_Add
                                        onCancel={() => handleModalViewUsers('')}
                                        onAction={() => handleStatusSAdd()}
                                    />
                                </Container_Modal_Form>
                            </Container_Modal_Form_White>
                        </Container_Modal_Form_White_600>
                    </Container_Modal_Background_Black>
                </>
            ):(
                <></>
            )}
        </>
    );
}