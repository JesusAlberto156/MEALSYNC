//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Contextos
import { SelectedRowContext } from "../../../contexts/SelectedesProvider"
import { TextFieldsDishContext } from "../../../contexts/FormsProvider"
import { RefModalContext,RefFormContext,RefButtonDetailContext,RefButtonEditContext,RefButtonDeleteContext } from "../../../contexts/RefsProvider"
import { DishSpecificationsContext,WarehouseDishesContext,MenuTypeDishesContext } from "../../../contexts/DishesProvider"
import { WarehouseSupplyTypesContext } from "../../../contexts/WarehouseProvider"
import { SupplyTypesContext } from "../../../contexts/SuppliesProvider"
// Hooks personalizados
import { HandleModalViewDishes } from "../../../hooks/dishes/Views"
import { ResetTextFieldsUser } from "../../../hooks/users/Texts"
import { ResetTextFieldsDish } from "../../../hooks/dishes/Texts"
import { TableActionsDishes } from "../../../hooks/dishes/Tables"
//____________IMAGENES______________
import Dish from '../../imgs/Meal.png'
//____________IMAGENES______________
// Estilos personalizados
import { Container_Menu_100_Center } from "../../styled/Containers";
// Componentes personalizados
import Card_Add from "../../cards/Add"
import Card_Information from "../../cards/Information"
import { Table_Pagination } from "../Pagination"
//____________IMPORT/EXPORT____________

// Tabla de los usuarios
export default function Table_Dishes(){
    // Constantes con el valor de los contextos
    const [isWarehouseDishes] = useContext(WarehouseDishesContext);
    const [isMenuTypeDishes] = useContext(MenuTypeDishesContext);
    const [isDishSpecifications] = useContext(DishSpecificationsContext);
    const [isWarehouseSupplyTypes] = useContext(WarehouseSupplyTypesContext);
    const [isSupplyTypes] = useContext(SupplyTypesContext); 
    const isModal = useContext(RefModalContext); 
    const isForm = useContext(RefFormContext);
    const isButtonDetail = useContext(RefButtonDetailContext);
    const isButtonEdit = useContext(RefButtonEditContext); 
    const isButtonDelete = useContext(RefButtonDeleteContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isTextFieldsDish,setIsTextFieldsDish] = useContext(TextFieldsDishContext); 
    // Constantes con la funcionalidad de los hooks
    const handleModalViewDishes = HandleModalViewDishes();
    const resetTextFieldsDish = ResetTextFieldsDish();
    const resetTextFieldsUser = ResetTextFieldsUser();
    const {currentRecordsDishes,handleRowClick,prevPage,nextPageDishes,currentPage,totalPagesDishes} = TableActionsDishes();
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
    // UseEffect que pasa el valor a un check con la selección de la tabla
    useEffect(() => {
        if(isSelectedRow !== null){
            
            const specification = isDishSpecifications.find(specification => specification.idplatillo === isSelectedRow.idplatillo);
            const types = isMenuTypeDishes.filter(type => type.idplatillo === isSelectedRow.idplatillo);
            const ingredients = isWarehouseDishes.filter(warehouse => warehouse.idplatillo === isSelectedRow.idplatillo);

            setIsTextFieldsDish(prev => ({
                ...prev,
                idplatillo: isSelectedRow.idplatillo,
                nombre: isSelectedRow.nombre,
                idmenu: isSelectedRow.idmenu,
                idespecifiacion: specification?.idespecifiacion || 0,
                descripcion: specification?.descripcion || '',
                precio: specification?.precio || '',
                preparacion: specification?.preparacion || '',
                imagen: specification?.imagen || '',
                tipos: types.length > 0 
                    ? types.map(type => ({ idtipo: type.idtipo }))
                    : [],
                ingredientes: ingredients.length > 0 
                    ? ingredients.map(ingredient => ({ 
                            idalmacen: ingredient.idalmacen,
                            idplatillo: ingredient.idplatillo,
                            cantidad: ingredient.cantidad,
                            idtipo: isWarehouseSupplyTypes.find(warehouse => warehouse.idalmacen === ingredient.idalmacen)?.idtipo,
                            unidad: isSupplyTypes.find(type => type.idtipo === isWarehouseSupplyTypes.find(warehouse => warehouse.idalmacen === ingredient.idalmacen)?.idtipo)?.unidad,
                            buscador: '',
                        }))
                    : []
            }))
        }else{
            resetTextFieldsDish();
            resetTextFieldsUser();
        }
    },[isSelectedRow]);
    // Estructura del componente
    return(
        <>
            <Container_Menu_100_Center>
                <Card_Add
                    onHandleModalView={() => handleModalViewDishes('Platillo-Agregar')}
                    route="/Administration/Index/Menus/Dishes/Add"
                />
                {currentRecordsDishes.map((dish) => {
                    const spec = isDishSpecifications.find(spec => spec.idplatillo === dish.idplatillo);
                    return (
                        <Card_Information
                            data={dish}
                            onHandleView={() => handleRowClick(dish)}
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
            <Table_Pagination
                onNextPage={() => nextPageDishes()}
                onPrevPage={() => prevPage()}
                currentPage={currentPage}
                currentRecords={currentRecordsDishes}
                totalPage={totalPagesDishes}
            />
        </>
    );
}