//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Contextos
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider"
import { TextFieldsSideDishContext } from "../../../../contexts/FormsProvider"
import { RefModalContext,RefFormContext,RefButtonDetailContext,RefButtonEditContext,RefButtonDeleteContext } from "../../../../contexts/RefsProvider"
import { SideDishSpecificationsContext,WarehouseSideDishesContext,MenuTypeSideDishesContext } from "../../../../contexts/SideDishesProvider"
import { WarehouseSupplyTypesContext } from "../../../../contexts/WarehouseProvider"
import { SupplyTypesContext } from "../../../../contexts/SuppliesProvider"
import { LoggedTypeContext } from "../../../../contexts/SessionProvider"
// Hooks personalizados
import { HandleModalViewSideDishes } from "../../../../hooks/sideDishes/Views"
import { ResetTextFieldsUser } from "../../../../hooks/users/Texts"
import { ResetTextFieldsSideDish } from "../../../../hooks/sideDishes/Texts"
import { TableActionsSideDishes } from "../../../../hooks/orders/Tables"
//____________IMAGENES______________
import SideDish from '../../../imgs/Side-Dish.jpg'
//____________IMAGENES______________
// Estilos personalizados
import { Container_Menu_100_Center } from "../../../styled/Containers";
// Componentes personalizados
import Card_Information from "../../../cards/Information"
import { Table_Pagination, Table_Pagination_Top } from "../../Pagination"
//____________IMPORT/EXPORT____________

// Tabla de las guarniciones
export default function Table_Side_Dishes(){
    // Constantes con el valor de los contextos
    const [isWarehouseSideDishes] = useContext(WarehouseSideDishesContext);
    const [isMenuTypeSideDishes] = useContext(MenuTypeSideDishesContext);
    const [isSideDishSpecifications] = useContext(SideDishSpecificationsContext);
    const [isWarehouseSupplyTypes] = useContext(WarehouseSupplyTypesContext);
    const [isSupplyTypes] = useContext(SupplyTypesContext); 
    const isModal = useContext(RefModalContext); 
    const isForm = useContext(RefFormContext);
    const isButtonDetail = useContext(RefButtonDetailContext);
    const isButtonEdit = useContext(RefButtonEditContext); 
    const isButtonDelete = useContext(RefButtonDeleteContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isTextFieldsSideDish,setIsTextFieldsSideDish] = useContext(TextFieldsSideDishContext); 
    const [isLoggedType] = useContext(LoggedTypeContext); 
    // Constantes con la funcionalidad de los hooks
    const handleModalViewSideDishes = HandleModalViewSideDishes();
    const resetTextFieldsSideDish = ResetTextFieldsSideDish();
    const resetTextFieldsUser = ResetTextFieldsUser();
    const {currentRecordsSideDishes,handleRowClick,prevPage,nextPageSideDishes,currentPage,totalPagesSideDishes} = TableActionsSideDishes();
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const cards = document.querySelectorAll(".Card-Side-Dish");

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
            
            const specification = isSideDishSpecifications.find(specification => specification.idguarnicion === isSelectedRow.idguarnicion);
            const types = isMenuTypeSideDishes.filter(type => type.idguarnicion === isSelectedRow.idguarnicion);
            const ingredients = isWarehouseSideDishes.filter(warehouse => warehouse.idguarnicion === isSelectedRow.idguarnicion);

            setIsTextFieldsSideDish(prev => ({
                ...prev,
                idguarnicion: isSelectedRow.idguarnicion,
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
                            idguarnicion: ingredient.idguarnicion,
                            cantidad: ingredient.cantidad,
                            idtipo: isWarehouseSupplyTypes.find(warehouse => warehouse.idalmacen === ingredient.idalmacen)?.idtipo,
                            unidad: isSupplyTypes.find(type => type.idtipo === isWarehouseSupplyTypes.find(warehouse => warehouse.idalmacen === ingredient.idalmacen)?.idtipo)?.unidad,
                            buscador: '',
                        }))
                    : []
            }))
        }else{
            resetTextFieldsSideDish();
            resetTextFieldsUser();
        }
    },[isSelectedRow]);
    // Estructura del componente
    return(
        <>
            <Table_Pagination_Top
                onNextPage={() => nextPageSideDishes()}
                onPrevPage={() => prevPage()}
                currentPage={currentPage}
                currentRecords={currentRecordsSideDishes}
                totalPage={totalPagesSideDishes}
            />
            <Container_Menu_100_Center>
                {currentRecordsSideDishes.map((sideDish) => {
                    const spec = isSideDishSpecifications.find(spec => spec.idguarnicion === sideDish.idguarnicion);
                    return (
                        <Card_Information
                            data={sideDish}
                            onHandleView={() => handleRowClick(sideDish)}
                            id='Card-Side-Dish'
                            key={sideDish.idguarnicion}
                            title={sideDish.nombre}
                            image={spec?.imagen || SideDish}
                            preparation={spec?.preparacion || 'Desconocido'}
                            price={spec?.precio || 'Desconocido'}
                            onHandleModalViewDetail={() => handleModalViewSideDishes('Guarnicion-Detalles')}
                            routeDetail={isLoggedType === 'Nutriólogo' ? "/Kitchen/Index/Menus/Side/Dishes/Detail" : "/Administration/Index/Menus/Side/Dishes/Detail"}
                            onHandleModalViewEdit={() => handleModalViewSideDishes('Guarnicion-Editar')}
                            routeEdit={isLoggedType === 'Nutriólogo' ? "/Kitchen/Index/Menus/Side/Dishes/Edit" : "/Administration/Index/Menus/Side/Dishes/Edit"}
                            onHandleModalViewDelete={() => handleModalViewSideDishes('Guarnicion-Eliminar')}
                            routeDelete={isLoggedType === 'Nutriólogo' ? "/Kitchen/Index/Menus/Side/Dishes/Delete" : "/Administration/Index/Menus/Side/Dishes/Delete"}
                        />
                    )
                })}
            </Container_Menu_100_Center>
            <Table_Pagination
                onNextPage={() => nextPageSideDishes()}
                onPrevPage={() => prevPage()}
                currentPage={currentPage}
                currentRecords={currentRecordsSideDishes}
                totalPage={totalPagesSideDishes}
            />
        </>
    );
}