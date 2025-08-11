//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { TextFieldsDishContext } from "../../../../contexts/FormsProvider";
import { RefModalContext,RefFormContext } from "../../../../contexts/RefsProvider";
import { DeletedDishesContext } from "../../../../contexts/DishesProvider";
import { SupplyTypesContext } from "../../../../contexts/SuppliesProvider";
import { MenusContext,MenuUbicationsContext,MenuTypesContext,MenuTypeUbicationsContext } from "../../../../contexts/MenusProvider";
import { LoggedTypeContext } from "../../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleModalViewDishes } from "../../../../hooks/dishes/Views";
//____________IMAGENES______________
import Dish from '../../../imgs/Dish.png'
//____________IMAGENES______________
//____________ICONOS____________
import { MdOutlineMenuBook } from "react-icons/md";
import { MdOutlineRestaurantMenu } from "react-icons/md";
//____________ICONOS____________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Row_NG_Auto_Center,Container_Modal_Form_White,Container_Modal_Form,Container_Modal_Form_White_600, Container_Row_100_Center, Container_Row_100_Left } from "../../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Title_28_Black,Text_Color_Green_16,Text_Span_16_Justify_Black,Text_Title_20_Black } from "../../../styled/Text";
import { Image_Modal_150 } from "../../../styled/Imgs";
// Componentes personalizados
import Error_View from "../../errors/View";
import { Modal_Form_Button_Return } from "../../../forms/Button";
import { Image_Modal } from "../../../styled/Imgs";
//____________IMPORT/EXPORT____________

// Modal para visualizar los detalles de los platillos de su tabla
export default function Dish_Details(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isModal] = useContext(ModalContext);
    const [isTextFieldsDish] = useContext(TextFieldsDishContext); 
    const Modal = useContext(RefModalContext);
    const isForm = useContext(RefFormContext); 
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isDeletedDishes] = useContext(DeletedDishesContext);
    const [isMenus] = useContext(MenusContext);
    const [isLoggedType] = useContext(LoggedTypeContext);
    const [isMenuTypeUbications] = useContext(MenuTypeUbicationsContext);
    const [isMenuUbications] = useContext(MenuUbicationsContext);
    const [isMenuTypes] = useContext(MenuTypesContext);
    const [isSupplyTypes] = useContext(SupplyTypesContext);
    // Constantes con la funcionalidad de los hooks
    const handleModalViewDishes = HandleModalViewDishes();
    // UseEffct para verificar la eliminacion del platillo
    useEffect(() => {
        if(isDeletedDishes.length !== 0){
            if(isDeletedDishes.some(dish => dish.idplatillo === isTextFieldsDish.idplatillo)){
                setIsSelectedRow(null);
            }
        }
    },[isDeletedDishes]);
    // Useffect para controlar el sidebar
    useEffect(() => {
        if(isSidebar){
            setIsSidebar(false);
        }
    },[]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <Container_Modal_Background_Black ref={Modal}>
                    <Image_Modal/>
                    <Container_Modal_Form_White_600 ref={isForm} className={currentMView === 'Platillo-Detalles' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Modal_Form_White>
                            <Container_Modal_Form>
                                <Text_Title_28_Black>DETALLES DE PLATILLO</Text_Title_28_Black>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black>: Datos generales</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Text_Title_20_Black>{isTextFieldsDish.nombre || 'Desconocido'}</Text_Title_20_Black>
                                <Image_Modal_150 src={isTextFieldsDish.imagen || Dish}/>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Preparación</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>:</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Text_Span_16_Justify_Black>{isTextFieldsDish.descripcion || 'Desconocida'}</Text_Span_16_Justify_Black>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Tiempo de platillo</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>: {isMenus.find(menu => menu.idmenu === isTextFieldsDish.idmenu)?.nombre || 'Desconocido'}</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black>: Datos específicos</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                {isLoggedType === 'Chef' ? (
                                    <>
                                        <Container_Row_NG_Auto_Center>
                                            <Text_Color_Green_16>Menús</Text_Color_Green_16>
                                            <Text_Span_16_Center_Black>:</Text_Span_16_Center_Black>
                                        </Container_Row_NG_Auto_Center>
                                        {isTextFieldsDish.tipos.length !==0 ? (
                                            isTextFieldsDish.tipos.map((type,index) => (
                                                <Container_Row_100_Left key={index}>
                                                    <Text_Span_16_Center_Black>
                                                        <MdOutlineMenuBook/> -- {isMenuTypes.find(t => t.idtipo === type.idtipo)?.nombre || 'Desconocido'} ---------- {
                                                            isMenuTypeUbications.some(t => t.idtipo === type.idtipo && t.idubicacion === 1) && isMenuTypeUbications.some(t => t.idtipo === type.idtipo && t.idubicacion === 2) && isMenuTypeUbications.some(t => t.idtipo === type.idtipo && t.idubicacion === 3) ?
                                                            `${isMenuUbications.find(ubication => ubication.idubicacion === 1)?.nombre}, ${isMenuUbications.find(ubication => ubication.idubicacion === 2)?.nombre}, ${isMenuUbications.find(ubication => ubication.idubicacion === 3)?.nombre}` :

                                                            isMenuTypeUbications.some(t => t.idtipo === type.idtipo && t.idubicacion === 1) && isMenuTypeUbications.some(t => t.idtipo === type.idtipo && t.idubicacion === 2) ?
                                                            `${isMenuUbications.find(ubication => ubication.idubicacion === 1)?.nombre}, ${isMenuUbications.find(ubication => ubication.idubicacion === 2)?.nombre}` :
                                                            isMenuTypeUbications.some(t => t.idtipo === type.idtipo && t.idubicacion === 1) && isMenuTypeUbications.some(t => t.idtipo === type.idtipo && t.idubicacion === 3) ?
                                                            `${isMenuUbications.find(ubication => ubication.idubicacion === 1)?.nombre}, ${isMenuUbications.find(ubication => ubication.idubicacion === 3)?.nombre}` :
                                                            isMenuTypeUbications.some(t => t.idtipo === type.idtipo && t.idubicacion === 2) && isMenuTypeUbications.some(t => t.idtipo === type.idtipo && t.idubicacion === 3) ?
                                                            `${isMenuUbications.find(ubication => ubication.idubicacion === 2)?.nombre}, ${isMenuUbications.find(ubication => ubication.idubicacion === 3)?.nombre}` :

                                                            isMenuTypeUbications.some(t => t.idtipo === type.idtipo && t.idubicacion === 1) ? `${isMenuUbications.find(ubication => ubication.idubicacion === 1)?.nombre}` :
                                                            isMenuTypeUbications.some(t => t.idtipo === type.idtipo && t.idubicacion === 2) ? `${isMenuUbications.find(ubication => ubication.idubicacion === 2)?.nombre}` :
                                                            isMenuTypeUbications.some(t => t.idtipo === type.idtipo && t.idubicacion === 3) ? `${isMenuUbications.find(ubication => ubication.idubicacion === 3)?.nombre}` : 'Desconocidas'
                                                        }
                                                    </Text_Span_16_Center_Black>
                                                </Container_Row_100_Left>
                                            ))
                                        ):(
                                            <Container_Row_100_Center>
                                                <Text_Span_16_Center_Black>¡No cuenta con menús!</Text_Span_16_Center_Black>
                                            </Container_Row_100_Center>
                                        )}
                                    </>
                                ):(
                                    <></>
                                )}
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Ingredientes</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>:</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                {isTextFieldsDish.ingredientes.length !==0 ? (
                                    isTextFieldsDish.ingredientes.map((ingredient,index) => (
                                        <Container_Row_100_Left key={index}>
                                            <Text_Span_16_Center_Black>
                                                <MdOutlineRestaurantMenu/> -- {isSupplyTypes.find(type => type.idtipo === ingredient.idtipo)?.tipo || 'Desconocido'} ---------- {ingredient.cantidad} - {ingredient.unidad}{ingredient.cantidad !== 1 ? 's' : ''}
                                            </Text_Span_16_Center_Black>
                                        </Container_Row_100_Left>
                                    ))
                                ):(
                                    <Container_Row_100_Center>
                                        <Text_Span_16_Center_Black>¡Sin ingredientes!</Text_Span_16_Center_Black>
                                    </Container_Row_100_Center>
                                )}
                                <Modal_Form_Button_Return
                                    onHandleModalView={() => handleModalViewDishes('')}
                                />
                            </Container_Modal_Form>
                        </Container_Modal_Form_White>
                    </Container_Modal_Form_White_600>
                </Container_Modal_Background_Black>
            ):(
                currentMView === 'Platillo-Detalles' ? (
                    <>
                        <Error_View/>
                    </>
                ):(
                    <></>
                )
            )}
        </>
    );
}