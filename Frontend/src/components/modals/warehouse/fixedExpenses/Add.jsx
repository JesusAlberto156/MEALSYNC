//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { ActionBlockContext,KeyboardContext,KeyboardViewContext,TouchContext } from "../../../../contexts/VariablesProvider";
import { TextFieldsWarehouseFixedExpenseContext } from "../../../../contexts/FormsProvider";
import { RefKeyboardContext,RefKeyboardTouchContext } from "../../../../contexts/RefsProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { WarehouseFixedExpenseAddContext } from "../../../../contexts/WarehouseProvider";
import { DeletedFixedExpensesContext } from "../../../../contexts/ExtrasProvider";
// Hooks personalizados
import { HandleModalViewWarehouse } from "../../../../hooks/warehouse/Views";
import { FilteredRecordsDeletedFixedExpense,HandleWarehouseFixedExpenseAdd } from "../../../../hooks/warehouse/Forms";
import { HandleKeyboard } from "../../../../hooks/Views";
//__________ICONOS__________
// Icono para realizar la función del modal
import { MdCancel } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Row_100_Left,Container_Row_NG_Auto_Center,Container_Modal_Form_White_600,Container_Modal_Form_White,Container_Modal_Form } from "../../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Title_28_Black } from "../../../styled/Text";
import { Input_Text_100_Black,Input_Group } from "../../../styled/Inputs";
import { Icon_Button_Blue_20 } from "../../../styled/Icons";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
import { Label_Text_16_Black } from "../../../styled/Labels";
// Componentes personalizados
import { Image_Modal } from "../../../styled/Imgs";
import { Modal_Form_Button_Add } from "../../../forms/Button";
import { Keyboard_Form_Warehouse_Products } from "../../../keyboards/Form";
import { Select_300 } from "../../../styled/Selects";
//____________IMPORT/EXPORT____________

// Modal para agregar compra de gasto fijo a su tabla
export default function Warehouse_Fixed_Expense_Add(){
    // Constantes con el valor de los contextos
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsWarehouseFixedExpense,setIsTextFieldsWarehouseFixedExpense] = useContext(TextFieldsWarehouseFixedExpenseContext);
    const [socket] = useContext(SocketContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const isKeyboardTouch = useContext(RefKeyboardTouchContext);
    const [isTouch] = useContext(TouchContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isDeletedFixedExpenses] = useContext(DeletedFixedExpensesContext); 
    const [isWarehouseFixedExpenseAdd,setIsWarehouseFixedExpenseAdd] = useContext(WarehouseFixedExpenseAddContext); 
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewWarehouse = HandleModalViewWarehouse();
    const handleWarehouseFixedExpenseAdd = HandleWarehouseFixedExpenseAdd();
    const filteredRecordsDeletedFixedExpense = FilteredRecordsDeletedFixedExpense();
    const { KeyboardView,KeyboardClick } = HandleKeyboard();
    // useEffect para comprobar la eliminación del gasto fijo 
    useEffect(() => {
        if(isDeletedFixedExpenses.length !== 0){
            if(isDeletedFixedExpenses.some(f => f.idgasto  === isTextFieldsWarehouseFixedExpense.idgasto)){
                setIsTextFieldsWarehouseFixedExpense(prev => ({
                    ...prev,
                    idgasto: 0,
                }));
            }
        }
    },[isDeletedFixedExpenses]);
    // Useffect para controlar el sidebar
    useEffect(() => {
        if(isSidebar){
            setIsSidebar(false);
        }
    },[]);
    // Funcion para formatear la fecha
    function getFormattedDateTime() {
        const now = new Date();
        const pad = (n) => n.toString().padStart(2, '0');
        const year = now.getFullYear();
        const month = pad(now.getMonth() + 1);
        const day = pad(now.getDate());
        const hours = pad(now.getHours());
        const minutes = pad(now.getMinutes());
        const seconds = pad(now.getSeconds());
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    // UseEffect para obtener la hora a tiepo real
    useEffect(() => {
        const interval = setInterval(() => {
            setIsTextFieldsWarehouseFixedExpense((prev) => ({
                ...prev,
                fecha: getFormattedDateTime()
            }));
        }, 1000);

        return () => clearInterval(interval);
    },[])
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
    // UseEffect para agregar datos a la base de datos
    useEffect(() => {
        if(isWarehouseFixedExpenseAdd){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Warehouse-Fixed-Expense',isLoggedUser.idusuario,isTextFieldsWarehouseFixedExpense.precio,isTextFieldsWarehouseFixedExpense.idgasto,'Compra');

                        resolve('¡Agregó la compra de gasto fijo!');

                        setIsWarehouseFixedExpenseAdd(false)

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
                    setIsWarehouseFixedExpenseAdd(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            Alert_Sonner_Promise(promise,'¡Agregando una compra de gasto fijo!','2');
        }
    },[isWarehouseFixedExpenseAdd]);
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <Container_Modal_Background_Black>
                    <Image_Modal/>
                    <Container_Modal_Form_White_600 className={currentMView === 'Almacen-Compra-Gasto-Fijo-Agregar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Modal_Form_White>
                            <Container_Modal_Form>
                                <Text_Title_28_Black>AGREGAR COMPRA DE GASTO FIJO</Text_Title_28_Black>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black>: Datos generales</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Select_300
                                    data={filteredRecordsDeletedFixedExpense.length}
                                    options={filteredRecordsDeletedFixedExpense.map((fixed) => ({
                                        value: fixed.idgasto,
                                        label: fixed.nombre
                                    }))}
                                    placeholder='Gastos fijos...'
                                    value={filteredRecordsDeletedFixedExpense
                                        .map(fixed => ({ value: fixed.idgasto, label: fixed.nombre }))
                                        .find(option => option.value === isTextFieldsWarehouseFixedExpense.idgasto)
                                    }
                                    onChange={(e) => {
                                        if (e) {
                                            setIsTextFieldsWarehouseFixedExpense(prev => ({
                                                ...prev,
                                                idgasto: e.value,
                                            }));
                                        } else {
                                            setIsTextFieldsWarehouseFixedExpense(prev => ({
                                                ...prev,
                                                idgasto: 0,
                                            }));
                                        }
                                    }}
                                    isDisabled={isActionBlock}
                                />  
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black>: Datos específicos</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_100_Left>
                                    <Label_Text_16_Black>Fecha de operación:</Label_Text_16_Black>
                                    <Input_Text_100_Black
                                        placeholder="..."
                                        type="text"
                                        value={isTextFieldsWarehouseFixedExpense.fecha}
                                        disabled
                                    />
                                </Container_Row_100_Left>
                                <Container_Row_100_Left>
                                    <Label_Text_16_Black>Precio:</Label_Text_16_Black>
                                    <Input_Group>
                                        <Input_Text_100_Black
                                            id="Input-Precio"
                                            placeholder="..."
                                            type="text"
                                            disabled={isActionBlock}
                                            value={isTextFieldsWarehouseFixedExpense.precio}
                                            onChange={(e) => {
                                                if(!isNaN(Number(e.target.value))){
                                                    setIsTextFieldsWarehouseFixedExpense(prev => ({...prev, precio: e.target.value}))
                                                }
                                            }}
                                            onFocus={() => {
                                                if(isKeyboardTouch.current){
                                                    setIsKeyboard(true);
                                                    setIsKeyboardView('Precio-Almacen-Gasto-Fijo');
                                                }
                                            }}
                                        />
                                    </Input_Group>
                                    <Icon_Button_Blue_20
                                        onClick={() => {
                                            setIsTextFieldsWarehouseFixedExpense(prev => ({...prev, precio: ''}))
                                        }}
                                        disabled={isActionBlock}
                                    >
                                        <MdCancel/>
                                    </Icon_Button_Blue_20>
                                </Container_Row_100_Left>
                                <Modal_Form_Button_Add
                                    onCancel={() => handleModalViewWarehouse('')}
                                    onAction={() => handleWarehouseFixedExpenseAdd()}
                                />
                            </Container_Modal_Form>
                        </Container_Modal_Form_White>
                    </Container_Modal_Form_White_600>
                    <Keyboard_Form_Warehouse_Products/>
                </Container_Modal_Background_Black>
            ):(
                <></>
            )}
        </>
    );
}