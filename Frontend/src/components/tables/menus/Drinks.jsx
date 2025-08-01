//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Contextos
import { SelectedRowContext } from "../../../contexts/SelectedesProvider"
import { TextFieldsDrinkContext } from "../../../contexts/FormsProvider"
import { RefModalContext,RefFormContext,RefButtonDetailContext,RefButtonEditContext,RefButtonDeleteContext } from "../../../contexts/RefsProvider"
import { DrinkSpecificationsContext,WarehouseDrinksContext,MenuTypeDrinksContext } from "../../../contexts/DrinksProvider"
import { WarehouseSupplyTypesContext } from "../../../contexts/WarehouseProvider"
import { SupplyTypesContext } from "../../../contexts/SuppliesProvider"
import { LoggedTypeContext } from "../../../contexts/SessionProvider"
// Hooks personalizados
import { HandleModalViewDrinks } from "../../../hooks/drinks/Views"
import { ResetTextFieldsUser } from "../../../hooks/users/Texts"
import { ResetTextFieldsDrink } from "../../../hooks/drinks/Texts"
import { TableActionsDrinks } from "../../../hooks/drinks/Tables"
//____________IMAGENES______________
import Drink from '../../imgs/Drink.jpg'
//____________IMAGENES______________
// Estilos personalizados
import { Container_Menu_100_Center } from "../../styled/Containers";
// Componentes personalizados
import Card_Add from "../../cards/Add"
import Card_Information from "../../cards/Information"
import { Table_Pagination,Table_Pagination_Top } from "../Pagination"
//____________IMPORT/EXPORT____________

// Tabla de las bebidas
export default function Table_Drinks(){
    // Constantes con el valor de los contextos
    const [isWarehouseDrinks] = useContext(WarehouseDrinksContext);
    const [isMenuTypeDrinks] = useContext(MenuTypeDrinksContext);
    const [isDrinkSpecifications] = useContext(DrinkSpecificationsContext);
    const [isWarehouseSupplyTypes] = useContext(WarehouseSupplyTypesContext);
    const [isSupplyTypes] = useContext(SupplyTypesContext); 
    const isModal = useContext(RefModalContext); 
    const isForm = useContext(RefFormContext);
    const isButtonDetail = useContext(RefButtonDetailContext);
    const isButtonEdit = useContext(RefButtonEditContext); 
    const isButtonDelete = useContext(RefButtonDeleteContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isTextFieldsDrink,setIsTextFieldsDrink] = useContext(TextFieldsDrinkContext); 
    const [isLoggedType] = useContext(LoggedTypeContext); 
    // Constantes con la funcionalidad de los hooks
    const handleModalViewDrinks = HandleModalViewDrinks();
    const resetTextFieldsDrink = ResetTextFieldsDrink();
    const resetTextFieldsUser = ResetTextFieldsUser();
    const {currentRecordsDrinks,handleRowClick,prevPage,nextPageDrinks,currentPage,totalPagesDrinks} = TableActionsDrinks();
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const cards = document.querySelectorAll(".Card-Drink");

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
            
            const specification = isDrinkSpecifications.find(specification => specification.idbebida === isSelectedRow.idbebida);
            const types = isMenuTypeDrinks.filter(type => type.idbebida === isSelectedRow.idbebida);
            const ingredients = isWarehouseDrinks.filter(warehouse => warehouse.idbebida === isSelectedRow.idbebida);

            setIsTextFieldsDrink(prev => ({
                ...prev,
                idbebida: isSelectedRow.idbebida,
                nombre: isSelectedRow.nombre,
                idmenu: isSelectedRow.idmenu,
                idespecificacion: specification?.idespecificacion || 0,
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
                            idbebida: ingredient.idbebida,
                            cantidad: ingredient.cantidad,
                            idtipo: isWarehouseSupplyTypes.find(warehouse => warehouse.idalmacen === ingredient.idalmacen)?.idtipo,
                            unidad: isSupplyTypes.find(type => type.idtipo === isWarehouseSupplyTypes.find(warehouse => warehouse.idalmacen === ingredient.idalmacen)?.idtipo)?.unidad,
                            buscador: '',
                        }))
                    : []
            }))
        }else{
            resetTextFieldsDrink();
            resetTextFieldsUser();
        }
    },[isSelectedRow]);
    // Estructura del componente
    return(
        <>
            <Table_Pagination_Top
                onNextPage={() => nextPageDrinks()}
                onPrevPage={() => prevPage()}
                currentPage={currentPage}
                currentRecords={currentRecordsDrinks}
                totalPage={totalPagesDrinks}
            />
            <Container_Menu_100_Center>
                {isLoggedType !== 'Almacenista' && isLoggedType !== 'Administrador' ? (
                    <Card_Add
                        onHandleModalView={() => handleModalViewDrinks('Bebida-Agregar')}
                        route={isLoggedType === 'Nutriólogo' ? "/Kitchen/Index/Menus/Drinks/Add" : "/Administration/Index/Menus/Drinks/Add"}
                    />
                ):(
                    <></>
                )}
                {currentRecordsDrinks.map((drink) => {
                    const spec = isDrinkSpecifications.find(spec => spec.idbebida === drink.idbebida);
                    return (
                        <Card_Information
                            data={drink}
                            onHandleView={() => handleRowClick(drink)}
                            id='Card-Drink'
                            key={drink.idbebida}
                            title={drink.nombre}
                            image={spec?.imagen || Drink}
                            preparation={spec?.preparacion || 'Desconocido'}
                            price={spec?.precio || 'Desconocido'}
                            onHandleModalViewDetail={() => handleModalViewDrinks('Bebida-Detalles')}
                            routeDetail={isLoggedType === 'Nutriólogo' ? "/Kitchen/Index/Menus/Drinks/Detail" : "/Administration/Index/Menus/Drinks/Detail"}
                            onHandleModalViewEdit={() => handleModalViewDrinks('Bebida-Editar')}
                            routeEdit={isLoggedType === 'Nutriólogo' ? "/Kitchen/Index/Menus/Drinks/Edit" : "/Administration/Index/Menus/Drinks/Edit"}
                            onHandleModalViewDelete={() => handleModalViewDrinks('Bebida-Eliminar')}
                            routeDelete={isLoggedType === 'Nutriólogo' ? "/Kitchen/Index/Menus/Drinks/Delete" : "/Administration/Index/Menus/Drinks/Delete"}
                        />
                    )
                })}
            </Container_Menu_100_Center>
            <Table_Pagination
                onNextPage={() => nextPageDrinks()}
                onPrevPage={() => prevPage()}
                currentPage={currentPage}
                currentRecords={currentRecordsDrinks}
                totalPage={totalPagesDrinks}
            />
        </>
    );
}