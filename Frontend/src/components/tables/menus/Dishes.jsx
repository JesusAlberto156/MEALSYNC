//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Contextos
import { SelectedRowContext } from "../../../contexts/SelectedesProvider"
import { RefModalContext,RefFormContext,RefButtonDetailContext,RefButtonEditContext,RefButtonDeleteContext } from "../../../contexts/RefsProvider"
import { DishesContext,DishSpecificationsContext } from "../../../contexts/DishesProvider"
// Hooks personalizados
import { HandleModalViewDishes } from "../../../hooks/dishes/Views"
//____________IMAGENES______________
import Dish from '../../imgs/Meal.png'
//____________IMAGENES______________
// Estilos personalizados
import { Container_Menu_100_Center } from "../../styled/Containers";
// Componentes personalizados
import Card_Add from "../../cards/Add"
import Card_Information from "../../cards/Information"
//____________IMPORT/EXPORT____________

// Tabla de los usuarios
export default function Table_Dishes(){
    // Constantes con el valor de los contextos
    const [isDishes] = useContext(DishesContext);
    const [isDishSpecifications] = useContext(DishSpecificationsContext);
    const isModal = useContext(RefModalContext); 
    const isForm = useContext(RefFormContext);
    const isButtonDetail = useContext(RefButtonDetailContext);
    const isButtonEdit = useContext(RefButtonEditContext); 
    const isButtonDelete = useContext(RefButtonDeleteContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext); 
    // Constantes con la funcionalidad de los hooks
    const handleModalViewDishes = HandleModalViewDishes();
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const cards = document.querySelectorAll(".Card-Dish");

            const isClickInsideCard = Array.from(cards).some(card => card.contains(event.target));
            const isClickInsideModal = isModal?.current?.contains(event.target);
            const isClickInsideForm = isForm?.current?.contains(event.target);
            const isClickInsideDetail = isButtonDetail?.current?.contains(event.target);
            const isClickInsideEdit = isButtonEdit?.current?.contains(event.target);
            const isClickInsideDelete = isButtonDelete?.current?.contains(event.target);

            if (!isClickInsideCard && !isClickInsideModal && !isClickInsideForm && !isClickInsideDetail && !isClickInsideEdit && !isClickInsideDelete) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    },[isModal,isForm,isButtonDetail,isButtonEdit,isButtonDelete]);

    useEffect(() => {
        console.log(isSelectedRow);
    },[isSelectedRow])
    // Estructura del componente
    return(
        <>
            <Container_Menu_100_Center>
                <Card_Add
                    onHandleModalView={() => handleModalViewDishes('Platillo-Agregar')}
                    route="/Administration/Index/Menus/Dishes/Add"
                />
                {isDishes.map((dish) => {
                    const spec = isDishSpecifications.find(spec => spec.idplatillo === dish.idplatillo);
                    return (
                        <Card_Information
                            data={dish}
                            onHandleView={() => setIsSelectedRow(dish)}
                            id='Card-Dish'
                            key={dish.idplatillo}
                            title={dish.nombre}
                            image={spec?.imagen || Dish}
                            preparation={spec?.preparacion || 'Desconocido'}
                            price={spec?.precio || 'Desconocido'}
                            onHandleModalViewDetail={() => handleModalViewDishes('Platillo-Detalles')}
                            routeDetail="/Administration/Index/Menus/Dishes/Detail"
                            onHandleModalViewEdit={() => handleModalViewDishes('Platillo-Editar')}
                            routeEdit="/Administration/Index/Menus/Dishes/Edit"
                            onHandleModalViewDelete={() => handleModalViewDishes('Platillo-Eliminar')}
                            routeDelete="/Administration/Index/Menus/Dishes/Delete"
                        />
                    )
                })}
            </Container_Menu_100_Center>
        </>
    );
}